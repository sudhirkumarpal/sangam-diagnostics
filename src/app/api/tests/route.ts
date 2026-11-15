import { NextResponse } from 'next/server';
import { getAllTests } from '@/lib/storage';

export async function GET() {
  try {
    const tests = getAllTests();
    return NextResponse.json({ success: true, tests });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
