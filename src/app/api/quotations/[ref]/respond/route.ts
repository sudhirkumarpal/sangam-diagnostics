import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import {
  getQuotationByReference,
  updateQuotation,
  getPrescriptionById,
  createBooking,
  getBookingByReference,
} from '@/lib/storage';
import { INITIAL_TESTS, INITIAL_PACKAGES } from '@/lib/data';
import { BookingItem } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    const quotation = getQuotationByReference(ref);

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: 'Quotation reference not found.' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      decision,
      quotationVersion,
      patientDetails,
      collectionAddress,
      selectedDate,
      selectedSlot,
      paymentMethod = 'cash_on_collection',
      deletePrescriptionFile = false,
    } = body;

    // -------------------------------------------------------------
    // Handling NO, CANCEL
    // -------------------------------------------------------------
    if (decision === 'NO' || decision === 'declined') {
      updateQuotation(quotation.id, {
        status: 'declined',
        patientDecision: 'declined',
        patientDecisionAt: new Date().toISOString(),
      });

      // Handle user preference to delete uploaded prescription file
      if (deletePrescriptionFile) {
        const presc = getPrescriptionById(quotation.prescriptionId);
        if (presc && presc.filePath && fs.existsSync(presc.filePath)) {
          try {
            fs.unlinkSync(presc.filePath);
          } catch (e) {
            console.warn('Failed removing prescription file on cancel:', e);
          }
        }
      }

      return NextResponse.json({
        success: true,
        decision: 'declined',
        message:
          'Quotation has been cancelled. No booking was created. If you have any questions, our team is available at 7982348151.',
      });
    }

    // -------------------------------------------------------------
    // Handling YES, PROCEED WITH BOOKING
    // -------------------------------------------------------------
    if (decision !== 'YES' && decision !== 'accepted') {
      return NextResponse.json(
        { success: false, error: 'Invalid decision. Must be "YES" or "NO".' },
        { status: 400 }
      );
    }

    // 1. Concurrency & Idempotency Check: Prevent duplicate bookings on double-click
    if (quotation.status === 'converted_to_booking' && quotation.bookingReference) {
      const existingBooking = getBookingByReference(quotation.bookingReference);
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        bookingReference: quotation.bookingReference,
        booking: existingBooking,
        message: 'This quotation has already been converted to booking.',
      });
    }

    // 2. Version Validation: Ensure quotation hasn't materially changed
    if (quotationVersion && quotationVersion !== quotation.currentVersion) {
      return NextResponse.json(
        {
          success: false,
          versionMismatch: true,
          error:
            'This quotation was updated by laboratory staff. Please review the updated test list and charges before confirming.',
        },
        { status: 409 }
      );
    }

    // 3. Address & Patient Details Validation
    if (!patientDetails?.fullName || !patientDetails?.mobile) {
      return NextResponse.json(
        { success: false, error: 'Patient full name and mobile number are required.' },
        { status: 400 }
      );
    }

    if (!collectionAddress?.houseNumber || !collectionAddress?.pincode) {
      return NextResponse.json(
        { success: false, error: 'Complete collection address and PIN code are required.' },
        { status: 400 }
      );
    }

    // 4. Server-Side Price & Catalogue Revalidation
    // Extract valid booking items from the approved quotation items
    const bookingItems: BookingItem[] = [];
    let serverSubtotal = 0;

    for (const item of quotation.items) {
      if (item.matchStatus === 'unavailable' || item.price <= 0) {
        continue; // skip unavailable items
      }

      if (item.type === 'package') {
        const pkg = INITIAL_PACKAGES.find((p) => p.id === item.itemId || p.slug === item.slug);
        const itemPrice = pkg ? pkg.offerPrice : item.price;
        bookingItems.push({
          type: 'package',
          id: item.itemId || 'pkg-custom',
          slug: item.slug || 'custom-package',
          name: item.name,
          price: itemPrice,
          quantity: item.quantity || 1,
        });
        serverSubtotal += itemPrice * (item.quantity || 1);
      } else {
        const test = INITIAL_TESTS.find((t) => t.id === item.itemId || t.slug === item.slug);
        const itemPrice = test ? (test.discountedPrice ?? test.price) : item.price;
        bookingItems.push({
          type: 'test',
          id: item.itemId || 'test-custom',
          slug: item.slug || 'custom-test',
          name: item.name,
          price: itemPrice,
          quantity: item.quantity || 1,
        });
        serverSubtotal += itemPrice * (item.quantity || 1);
      }
    }

    if (bookingItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No confirmed diagnostic tests available in this quotation to book.',
        },
        { status: 400 }
      );
    }

    // Collection fee rule
    const collectionFee = serverSubtotal >= 500 ? 0 : 100;
    const totalAmount = serverSubtotal + collectionFee;

    // 5. Create Booking in database
    const booking = createBooking({
      patient: {
        fullName: patientDetails.fullName.trim(),
        age: Number(patientDetails.age) || quotation.patientAge || 30,
        gender: patientDetails.gender || quotation.patientGender || 'other',
        mobile: patientDetails.mobile.replace(/\D/g, ''),
        email: patientDetails.email?.trim() || undefined,
        relationship: 'self',
        doctorNotes: `Booked via AI Prescription Quotation Ref: ${quotation.quotationReference}`,
      },
      collectionAddress: {
        houseNumber: collectionAddress.houseNumber.trim(),
        street: collectionAddress.street?.trim() || '',
        landmark: collectionAddress.landmark?.trim() || undefined,
        area: collectionAddress.area?.trim() || 'Delhi NCR',
        city: collectionAddress.city?.trim() || 'Delhi',
        state: collectionAddress.state?.trim() || 'Delhi',
        pincode: collectionAddress.pincode.trim(),
      },
      selectedDate: selectedDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      selectedSlot: selectedSlot || '07:00 AM - 08:30 AM',
      items: bookingItems,
      subtotal: serverSubtotal,
      discount: 0,
      collectionFee,
      totalAmount,
      paymentMethod,
      paymentStatus: 'pending',
      bookingStatus: 'received',
    });

    // 6. Transition Quotation Status to Converted
    updateQuotation(quotation.id, {
      status: 'converted_to_booking',
      patientDecision: 'accepted',
      patientDecisionAt: new Date().toISOString(),
      bookingReference: booking.bookingReference,
      bookingId: booking.id,
    });

    return NextResponse.json({
      success: true,
      decision: 'accepted',
      bookingReference: booking.bookingReference,
      bookingId: booking.id,
      booking,
      message: 'Prescription quotation confirmed and home collection booked successfully!',
    });
  } catch (err: any) {
    console.error('Error confirming prescription quotation:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to process quotation confirmation.' },
      { status: 500 }
    );
  }
}
