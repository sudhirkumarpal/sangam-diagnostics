import { NextRequest, NextResponse } from 'next/server';
import { addCallbackRequest, getAllCallbacks, updateCallbackStatus, createLead } from '@/lib/storage';

export async function GET() {
  try {
    const callbacks = getAllCallbacks();
    return NextResponse.json({ success: true, callbacks });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, preferredTime, testOfInterest, notes } = body;

    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, error: 'Name and mobile number are required.' },
        { status: 400 }
      );
    }

    const callback = addCallbackRequest({
      name: name.trim(),
      mobile: mobile.replace(/\D/g, ''),
      preferredTime,
      testOfInterest,
      notes,
    });

    // Ingest automatically into CRM Lead Pipeline
    try {
      createLead({
        patientName: name.trim(),
        mobile: mobile.replace(/\D/g, ''),
        source: 'web_callback',
        interestDescription: testOfInterest || notes || 'Home collection callback request',
        notes: `Preferred time: ${preferredTime || 'Not specified'}. Notes: ${notes || 'None'}`,
      });
    } catch (leadErr) {
      console.error('Lead auto-creation error:', leadErr);
    }

    return NextResponse.json({
      success: true,
      callback,
      message: 'Callback request registered successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    const updated = updateCallbackStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Callback request not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, callback: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
