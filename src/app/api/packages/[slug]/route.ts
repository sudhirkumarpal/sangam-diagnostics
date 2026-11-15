import { NextRequest, NextResponse } from 'next/server';
import { getPackageBySlug, updatePackage } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const pkg = getPackageBySlug(slug);
    if (!pkg) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, package: pkg });
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
    const updated = updatePackage(slug, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, package: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
