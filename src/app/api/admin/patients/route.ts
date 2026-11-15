import { NextRequest, NextResponse } from 'next/server';
import { getAllPatients, getPatientById, getPatientByMobile } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const risk = searchParams.get('risk') || undefined;
    const condition = searchParams.get('condition') || undefined;
    const uhid = searchParams.get('uhid') || undefined;
    const mobile = searchParams.get('mobile') || undefined;

    if (uhid) {
      const patient = getPatientById(uhid);
      return NextResponse.json({ success: true, patient });
    }

    if (mobile) {
      const patient = getPatientByMobile(mobile);
      return NextResponse.json({ success: true, patient });
    }

    const patients = getAllPatients({ search, risk, condition });
    return NextResponse.json({ success: true, patients });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
