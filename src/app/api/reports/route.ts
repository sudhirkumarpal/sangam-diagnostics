import { NextRequest, NextResponse } from 'next/server';
import {
  createReport,
  getAllReports,
  getReportByBookingId,
  updateBooking,
  detectPanicValues,
  dispatchAutomatedReportDelivery,
} from '@/lib/storage';
import { LaboratoryReport } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingRef = searchParams.get('ref');
    const all = getAllReports();

    if (bookingRef) {
      const report = getReportByBookingId(bookingRef);
      if (!report) {
        return NextResponse.json({ success: false, error: 'No report found for this booking reference' }, { status: 404 });
      }
      return NextResponse.json({ success: true, report });
    }

    return NextResponse.json({ success: true, reports: all });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LaboratoryReport = await request.json();

    if (!body.patientName || !body.bookingReference) {
      return NextResponse.json(
        { success: false, error: 'Patient name and booking reference are required.' },
        { status: 400 }
      );
    }

    const reportId = body.id || `rep-${Date.now()}`;
    const report: LaboratoryReport = {
      ...body,
      id: reportId,
      uhid: body.uhid || `ANDA.${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      barcodeNo: body.barcodeNo || `AA${Math.floor(100000 + Math.random() * 900000)}`,
      visitId: body.visitId || `MNDA${Math.floor(100000 + Math.random() * 900000)}`,
      downloadToken: `token-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      reportDate: body.reportDate || new Date().toLocaleString('en-IN'),
      specimenDrawnOn: body.specimenDrawnOn || new Date(Date.now() - 3600000 * 2).toLocaleString('en-IN'),
      specimenReceivedOn: body.specimenReceivedOn || new Date(Date.now() - 3600000).toLocaleString('en-IN'),
      nablCertNo: 'MC-7078',
      seniorPathologist: 'DR. ANIL GUPTA\nM.B.B.S., M.D. (PATH)\nSR. CONSULTANT PATHOLOGIST\nREGD. NO. 5015',
      labManager: 'MR. ARYAN SAINI\nLAB MANAGER\nSANGAM DIAGNOSTICS',
    };

    const saved = createReport(report);

    // Also update booking status to report_ready and associate reportId
    if (body.bookingId) {
      updateBooking(body.bookingId, {
        reportId: saved.id,
        bookingStatus: 'report_ready',
      });
    }

    // Automated Clinical Checks & Multi-Channel Delivery (Zero Manual Delay)
    try {
      // 1. Check for Critical Panic Values
      if (saved.parameters && saved.parameters.length > 0) {
        detectPanicValues(saved.parameters, saved.patientName, saved.bookingReference);
      }

      // 2. Instant Automated Multi-Channel Report Delivery
      dispatchAutomatedReportDelivery(saved.id, 'all');
    } catch (err) {
      console.error('Automated report dispatch error:', err);
    }

    return NextResponse.json({
      success: true,
      report: saved,
      message: 'Official laboratory report successfully generated and attached.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
