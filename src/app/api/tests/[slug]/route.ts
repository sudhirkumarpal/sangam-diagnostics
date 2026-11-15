import { NextRequest, NextResponse } from 'next/server';
import { getTestBySlug, updateTest } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const test = getTestBySlug(slug);
    if (!test) {
      return NextResponse.json({ success: false, error: 'Test not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, test });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const updated = updateTest(slug, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Test not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, test: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
