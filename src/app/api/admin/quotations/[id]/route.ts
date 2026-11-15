import { NextRequest, NextResponse } from 'next/server';
import {
  getQuotationById,
  updateQuotation,
  addQuotationVersion,
  getSettings,
} from '@/lib/storage';
import { QuotationItem } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quotation = getQuotationById(id);

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: 'Quotation not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, quotation });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch quotation.' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quotation = getQuotationById(id);

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: 'Quotation not found.' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      action,
      updatedItems,
      reviewerName = 'Dr. Staff Pathologist',
      reviewNotes = 'Clinical prescription verification and test matching update.',
      clarificationQuestion,
    } = body;

    // Action 1: Staff Question / Clarification Request
    if (action === 'send_clarification') {
      if (!clarificationQuestion?.trim()) {
        return NextResponse.json(
          { success: false, error: 'Please enter clarification question for the patient.' },
          { status: 400 }
        );
      }

      const clarificationRecord = {
        id: `clar-${Date.now()}`,
        question: clarificationQuestion.trim(),
        sentAt: new Date().toISOString(),
        status: 'pending' as const,
      };

      const updatedClarifications = [
        ...(quotation.clarifications || []),
        clarificationRecord,
      ];

      updateQuotation(quotation.id, {
        status: 'clarification_required',
        clarifications: updatedClarifications,
      });

      return NextResponse.json({
        success: true,
        message: 'Clarification request recorded and dispatched to patient.',
        clarification: clarificationRecord,
      });
    }

    // Action 2: Update Quotation Items and Issue New Version
    if (action === 'update_quotation_version') {
      if (!Array.isArray(updatedItems)) {
        return NextResponse.json(
          { success: false, error: 'updatedItems must be an array of QuotationItem.' },
          { status: 400 }
        );
      }

      const settings = getSettings();
      const subtotal = updatedItems.reduce(
        (acc: number, item: QuotationItem) =>
          acc + (item.price > 0 ? item.price * (item.quantity || 1) : 0),
        0
      );

      const discount = 0;
      const collectionFee = subtotal >= settings.freeCollectionMinOrder ? 0 : settings.defaultCollectionFee;
      const totalAmount = subtotal + collectionFee;

      const changesSummary = [
        `Updated test item list: ${updatedItems.length} items configured.`,
        `Recalculated subtotal: ₹${subtotal}, Total: ₹${totalAmount}`,
      ];

      const updated = addQuotationVersion(
        quotation.id,
        updatedItems,
        subtotal,
        discount,
        collectionFee,
        totalAmount,
        {
          reviewerName,
          notes: reviewNotes,
          changesSummary,
        }
      );

      return NextResponse.json({
        success: true,
        message: `Quotation updated to Version ${updated?.currentVersion} and marked Ready for Patient.`,
        quotation: updated,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown review action.' },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('Error reviewing quotation:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to review quotation.' },
      { status: 500 }
    );
  }
}
