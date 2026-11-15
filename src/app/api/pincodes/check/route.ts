import { NextRequest, NextResponse } from 'next/server';
import { checkPincodeServiceability, getAllServiceAreas } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { pincode } = await request.json();
    if (!pincode) {
      return NextResponse.json({ serviceable: false, message: 'Please enter a PIN code.' });
    }
    const area = checkPincodeServiceability(String(pincode));
    if (area) {
      return NextResponse.json({
        serviceable: true,
        area,
        message: `Home collection available in ${area.areaName}, ${area.city}.`,
      });
    }
    return NextResponse.json({
      serviceable: false,
      message: `PIN code ${pincode} is currently outside our direct home collection zone. Please request a callback.`,
    });
  } catch (err: any) {
    return NextResponse.json({ serviceable: false, message: err.message }, { status: 500 });
  }
}

export async function GET() {
  const areas = getAllServiceAreas();
  return NextResponse.json({ success: true, serviceAreas: areas });
}
