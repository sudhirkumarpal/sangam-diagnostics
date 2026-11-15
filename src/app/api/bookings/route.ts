import { NextRequest, NextResponse } from 'next/server';
import {
  createBooking,
  getAllBookings,
  getAllPackages,
  getAllTests,
  checkPincodeServiceability,
  validateCoupon,
  getSettings,
  createOrUpdatePatientFromBooking,
  autoAssignCollectorForBooking,
  addAutomationLog,
} from '@/lib/storage';
import { BookingItem, PaymentMethod } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mobile = searchParams.get('mobile');
    const all = getAllBookings();

    if (mobile) {
      const cleanMobile = mobile.replace(/\D/g, '');
      const filtered = all.filter((b) => b.patient.mobile.includes(cleanMobile));
      return NextResponse.json({ success: true, bookings: filtered });
    }

    return NextResponse.json({ success: true, bookings: all });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patient,
      collectionAddress,
      selectedDate,
      selectedSlot,
      items,
      couponCode,
      paymentMethod,
    } = body;

    // 1. Validate patient fields
    if (!patient?.fullName || !patient?.mobile) {
      return NextResponse.json(
        { success: false, error: 'Patient full name and mobile number are mandatory.' },
        { status: 400 }
      );
    }

    // 2. Validate Address & Pincode serviceability
    if (!collectionAddress?.pincode) {
      return NextResponse.json(
        { success: false, error: 'Valid PIN code is required for home collection.' },
        { status: 400 }
      );
    }

    const serviceArea = checkPincodeServiceability(collectionAddress.pincode);
    if (!serviceArea) {
      return NextResponse.json(
        {
          success: false,
          error: `PIN code ${collectionAddress.pincode} is currently outside our direct home collection zone. Please request a callback or contact 7982348151.`,
        },
        { status: 400 }
      );
    }

    // 3. Server-side Price Recalculation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one diagnostic test or health package must be selected.' },
        { status: 400 }
      );
    }

    const dbPackages = getAllPackages();
    const dbTests = getAllTests();
    const validatedItems: BookingItem[] = [];
    let serverSubtotal = 0;

    for (const rawItem of items) {
      if (rawItem.type === 'package') {
        const found = dbPackages.find((p) => p.slug === rawItem.slug || p.id === rawItem.id);
        if (!found || !found.isActive) {
          return NextResponse.json(
            { success: false, error: `Package "${rawItem.name || rawItem.slug}" is not currently available.` },
            { status: 400 }
          );
        }
        const unitPrice = found.offerPrice;
        const qty = Math.max(1, parseInt(rawItem.quantity || 1, 10));
        validatedItems.push({
          type: 'package',
          id: found.id,
          slug: found.slug,
          name: found.name,
          price: unitPrice,
          quantity: qty,
        });
        serverSubtotal += unitPrice * qty;
      } else {
        const found = dbTests.find((t) => t.slug === rawItem.slug || t.id === rawItem.id);
        if (!found || !found.isActive) {
          return NextResponse.json(
            { success: false, error: `Test "${rawItem.name || rawItem.slug}" is not currently available.` },
            { status: 400 }
          );
        }
        const unitPrice = found.discountedPrice ?? found.price;
        const qty = Math.max(1, parseInt(rawItem.quantity || 1, 10));
        validatedItems.push({
          type: 'test',
          id: found.id,
          slug: found.slug,
          name: found.name,
          price: unitPrice,
          quantity: qty,
        });
        serverSubtotal += unitPrice * qty;
      }
    }

    // 4. Server-side Coupon Validation
    let serverDiscount = 0;
    let validCouponCode: string | undefined = undefined;

    if (couponCode) {
      const couponResult = validateCoupon(couponCode, serverSubtotal);
      if (couponResult.valid) {
        serverDiscount = couponResult.discount;
        validCouponCode = couponCode.trim().toUpperCase();
      }
    }

    // 5. Server-side Collection Fee
    const settings = getSettings();
    const collectionFee =
      settings.freeCollectionAvailable && serverSubtotal >= settings.freeCollectionMinOrder
        ? 0
        : settings.defaultCollectionFee;

    const totalAmount = Math.max(0, serverSubtotal - serverDiscount + collectionFee);

    // 6. Payment status logic
    const resolvedPaymentMethod: PaymentMethod = paymentMethod || 'cash_on_collection';
    const initialPaymentStatus = resolvedPaymentMethod === 'cash_on_collection' ? 'pending' : 'paid';

    // 7. Persist Booking
    const newBooking = createBooking({
      patient: {
        fullName: patient.fullName.trim(),
        age: Number(patient.age) || 30,
        gender: patient.gender || 'male',
        mobile: patient.mobile.replace(/\D/g, ''),
        email: patient.email?.trim() || undefined,
        relationship: patient.relationship || 'self',
        doctorNotes: patient.doctorNotes?.trim(),
      },
      collectionAddress: {
        houseNumber: collectionAddress.houseNumber?.trim() || '',
        street: collectionAddress.street?.trim() || '',
        landmark: collectionAddress.landmark?.trim(),
        area: collectionAddress.area?.trim() || serviceArea.areaName,
        city: collectionAddress.city?.trim() || serviceArea.city,
        state: collectionAddress.state?.trim() || serviceArea.state,
        pincode: collectionAddress.pincode.trim(),
        accessInstructions: collectionAddress.accessInstructions?.trim(),
      },
      selectedDate: selectedDate || new Date().toISOString().split('T')[0],
      selectedSlot: selectedSlot || '07:30 AM - 09:00 AM',
      items: validatedItems,
      subtotal: serverSubtotal,
      couponCode: validCouponCode,
      discount: serverDiscount,
      collectionFee,
      totalAmount,
      paymentMethod: resolvedPaymentMethod,
      paymentStatus: initialPaymentStatus,
      bookingStatus: 'received',
      paymentId: resolvedPaymentMethod !== 'cash_on_collection' ? `PAY-SANDBOX-${Date.now()}` : undefined,
    });

    // 8. Automated Vertical Operations Trigger (Zero Manual Work)
    try {
      // a. Update Master Patient Index (UHID & Loyalty Points)
      createOrUpdatePatientFromBooking(newBooking);

      // b. Smart Phlebotomist Auto-dispatch & Vacutainer Barcode Generation
      autoAssignCollectorForBooking(newBooking.id);

      // c. Automated WhatsApp Confirmation Notice
      addAutomationLog({
        triggerType: 'lead_followup',
        targetName: newBooking.patient.fullName,
        targetPhone: newBooking.patient.mobile,
        channel: 'whatsapp',
        actionSummary: `Automated Booking Confirmation & Instructions`,
        details: `Dispatched booking reference ${newBooking.bookingReference} with fasting guidelines for ${newBooking.selectedSlot} at ${newBooking.collectionAddress.area}. Assigned phlebotomist notified.`,
        status: 'sent',
      });
    } catch (autoErr) {
      console.error('Non-blocking automation trigger error:', autoErr);
    }

    return NextResponse.json({
      success: true,
      booking: newBooking,
      reference: newBooking.bookingReference,
      message: 'Booking successfully confirmed and registered in laboratory queue.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
