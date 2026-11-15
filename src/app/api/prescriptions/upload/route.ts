import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import {
  createPrescription,
  createQuotation,
  getSettings,
  createLead,
} from '@/lib/storage';
import {
  extractCandidatePhrases,
  matchPhraseToCatalogue,
  buildQuotationFromMatches,
  simulatePrescriptionOcr,
} from '@/lib/prescriptionMatcher';

// Maximum allowed prescription file size: 10MB
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const mobile = (formData.get('mobile') as string | null)?.trim() || '';
    const fullName = (formData.get('fullName') as string | null)?.trim() || '';
    const ageStr = formData.get('age') as string | null;
    const gender = (formData.get('gender') as string | null)?.trim() || 'unspecified';
    const consent = formData.get('consentGiven');
    const ocrHintText = (formData.get('ocrHintText') as string | null)?.trim() || '';

    // 1. Consent Validation
    const consentGiven = consent === 'true';
    if (!consentGiven) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Explicit patient consent is required to process sensitive medical prescriptions.',
        },
        { status: 400 }
      );
    }

    // 2. Mobile Number Validation
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid 10-digit mobile number for quotation delivery.',
        },
        { status: 400 }
      );
    }

    // 3. File Validation
    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json(
        { success: false, error: 'Please select a valid prescription image or PDF file.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 10MB limit. Uploaded file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
        },
        { status: 400 }
      );
    }

    const mimeType = file.type || 'image/jpeg';
    if (!ALLOWED_MIME_TYPES.includes(mimeType) && !file.name.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported file format. Please upload JPG, PNG, WebP image or PDF document.',
        },
        { status: 400 }
      );
    }

    // 4. Secure File Storage
    // Store in private server directory outside of public web root
    const uploadDir = path.join(process.cwd(), '.data', 'prescriptions');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeFileExt = path.extname(file.name) || (mimeType === 'application/pdf' ? '.pdf' : '.jpg');
    const safeBaseName = `presc-${Date.now()}-${Math.random().toString(36).substring(7)}${safeFileExt}`;
    const destinationPath = path.join(uploadDir, safeBaseName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destinationPath, buffer);

    // 5. OCR & AI Test Extraction
    const extractedText = simulatePrescriptionOcr(file.name, ocrHintText);
    const candidatePhrases = extractCandidatePhrases(extractedText);

    // 6. Catalogue Matching & Price Engine
    const matches = candidatePhrases.map((phrase) => matchPhraseToCatalogue(phrase));
    const settings = getSettings();
    const quotationCalc = buildQuotationFromMatches(
      matches,
      settings.defaultCollectionFee,
      settings.freeCollectionMinOrder
    );

    // Determine initial quotation status:
    // If any items are unclear or unavailable, route to manual_review_required
    const status = quotationCalc.requiresStaffReview
      ? 'manual_review_required'
      : 'ready_for_patient';

    // 7. Persist Prescription Record
    const prescriptionRecord = createPrescription({
      fileName: file.name,
      fileSize: file.size,
      mimeType,
      filePath: destinationPath,
      patientMobile: cleanMobile,
      patientName: fullName || undefined,
      consentGiven: true,
      consentTimestamp: new Date().toISOString(),
      extractedRawText: extractedText,
      ocrConfidence: 0.92,
    });

    // 8. Persist Quotation Record
    const quotation = createQuotation({
      prescriptionId: prescriptionRecord.id,
      prescriptionFileName: file.name,
      patientMobile: cleanMobile,
      patientName: fullName || undefined,
      patientAge: ageStr ? Number(ageStr) : undefined,
      patientGender: gender,
      status,
      items: quotationCalc.items,
      subtotal: quotationCalc.subtotal,
      discount: quotationCalc.discount,
      collectionFee: quotationCalc.collectionFee,
      totalAmount: quotationCalc.totalAmount,
      isProvisional: quotationCalc.isProvisional,
      requiresStaffReview: quotationCalc.requiresStaffReview,
      hasUnavailableItems: quotationCalc.hasUnavailableItems,
      initialNotes: quotationCalc.requiresStaffReview
        ? 'Some handwritten or specialized items require pathologist review.'
        : 'All prescribed tests automatically matched with Sangam Diagnostics catalogue.',
    });

    // Ingest automatically into CRM Lead Pipeline as HOT Lead
    try {
      createLead({
        patientName: fullName || `Patient (${cleanMobile.slice(-4)})`,
        mobile: cleanMobile,
        source: 'prescription_upload',
        temperature: 'hot',
        score: 95,
        estimatedValue: quotationCalc.totalAmount || 1200,
        interestDescription: `Prescription Upload ${quotation.quotationReference} (${quotationCalc.items.map((it) => it.name).join(', ')})`,
        notes: `AI OCR processed with confidence ${(prescriptionRecord.ocrConfidence || 0.9) * 100}%. Quotation generated.`,
      });
    } catch (leadErr) {
      console.error('Lead auto-creation from prescription error:', leadErr);
    }

    return NextResponse.json({
      success: true,
      quotationReference: quotation.quotationReference,
      quotationId: quotation.id,
      status: quotation.status,
      isProvisional: quotation.isProvisional,
      requiresStaffReview: quotation.requiresStaffReview,
      totalAmount: quotation.totalAmount,
      itemsCount: quotation.items.length,
      redirectUrl: `/quotation/${quotation.quotationReference}`,
    });
  } catch (error: any) {
    console.error('Prescription upload processing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred while analyzing the prescription.',
      },
      { status: 500 }
    );
  }
}
