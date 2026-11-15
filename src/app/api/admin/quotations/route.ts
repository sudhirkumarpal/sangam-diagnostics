import { NextRequest, NextResponse } from 'next/server';
import { listQuotations } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const quotations = listQuotations({ status, search });
    return NextResponse.json({ success: true, quotations });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to list quotations.' },
      { status: 500 }
    );
  }
}
