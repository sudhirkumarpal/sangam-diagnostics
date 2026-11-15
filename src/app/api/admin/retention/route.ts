import { NextRequest, NextResponse } from 'next/server';
import {
  getAllRetentionRecalls,
  dispatchRecallNotification,
  triggerBatchRecallAutomation,
} from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const type = searchParams.get('type') || undefined;

    const recalls = getAllRetentionRecalls({ status, type });
    return NextResponse.json({ success: true, recalls });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, recallId, channel } = body;

    if (action === 'batch_dispatch') {
      const result = triggerBatchRecallAutomation();
      return NextResponse.json({
        success: true,
        message: `Successfully executed batch retention recall: ${result.dispatchedCount} notifications dispatched.`,
        dispatchedCount: result.dispatchedCount,
        recalls: result.recalls,
      });
    }

    if (action === 'dispatch_single' && recallId) {
      const updated = dispatchRecallNotification(recallId, channel || 'whatsapp');
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Recall record not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: `Automated recall notification dispatched via ${channel || 'whatsapp'}.`,
        recall: updated,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
