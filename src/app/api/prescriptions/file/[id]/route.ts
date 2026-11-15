import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPrescriptionById } from '@/lib/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prescription = getPrescriptionById(id);

    if (!prescription) {
      return NextResponse.json(
        { error: 'Prescription document not found or access expired.' },
        { status: 404 }
      );
    }

    if (!fs.existsSync(prescription.filePath)) {
      // If file was deleted per retention policy
      return NextResponse.json(
        { error: 'Document has been removed per patient privacy retention policy.' },
        { status: 410 }
      );
    }

    const fileBuffer = fs.readFileSync(prescription.filePath);
    const contentType = prescription.mimeType || 'image/jpeg';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${prescription.fileName}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to access prescription file.' },
      { status: 500 }
    );
  }
}
