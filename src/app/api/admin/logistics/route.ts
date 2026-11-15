import { NextRequest, NextResponse } from 'next/server';
import {
  getAllSpecimens,
  updateSpecimenStatus,
  autoAssignCollectorForBooking,
  getDatabase,
} from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const bookingId = searchParams.get('bookingId') || undefined;

    const db = getDatabase();
    const specimens = getAllSpecimens({ status, bookingId });
    const collectors = db.collectors || [];

    return NextResponse.json({
      success: true,
      specimens,
      collectors,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, bookingId, specimenId, newStatus, updates } = body;

    if (action === 'auto_assign' && bookingId) {
      const updatedBooking = autoAssignCollectorForBooking(bookingId);
      if (!updatedBooking) {
        return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: `Phlebotomist ${updatedBooking.collector?.name} auto-assigned and barcodes generated.`,
        booking: updatedBooking,
      });
    }

    if (action === 'update_specimen' && specimenId && newStatus) {
      const sp = updateSpecimenStatus(specimenId, newStatus, updates);
      if (!sp) {
        return NextResponse.json({ success: false, error: 'Specimen not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: `Specimen ${sp.barcode} status updated to ${newStatus}.`,
        specimen: sp,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid logistics action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
