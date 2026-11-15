import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();
    if (!code) {
      return NextResponse.json({ valid: false, message: 'Coupon code is required.' });
    }
    const result = validateCoupon(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ valid: false, message: err.message }, { status: 500 });
  }
}
