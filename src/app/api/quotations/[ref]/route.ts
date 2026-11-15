import { NextRequest, NextResponse } from 'next/server';
import { getQuotationByReference, getPrescriptionById } from '@/lib/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    const quotation = getQuotationByReference(ref);

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: 'Quotation not found. Please check your reference number.' },
        { status: 404 }
      );
    }

    const prescription = getPrescriptionById(quotation.prescriptionId);

    return NextResponse.json({
      success: true,
      quotation: {
        ...quotation,
        prescriptionDetails: prescription
          ? {
              id: prescription.id,
              fileName: prescription.fileName,
              mimeType: prescription.mimeType,
              uploadedAt: prescription.uploadedAt,
              extractedRawText: prescription.extractedRawText,
            }
          : undefined,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to retrieve quotation.' },
      { status: 500 }
    );
  }
}
