import { NextResponse } from 'next/server';
import { getAllPackages } from '@/lib/storage';

export async function GET() {
  try {
    const packages = getAllPackages();
    return NextResponse.json({ success: true, packages });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
