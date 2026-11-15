import { NextRequest, NextResponse } from 'next/server';
import { getAllAutomationLogs, addAutomationLog } from '@/lib/storage';

export async function GET() {
  try {
    const logs = getAllAutomationLogs();
    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const log = addAutomationLog(body);
    return NextResponse.json({ success: true, log });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
