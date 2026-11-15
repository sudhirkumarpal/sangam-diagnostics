'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Calendar,
  Truck,
  ArrowRight,
  X,
  Phone,
  HelpCircle,
  Sparkles,
  MapPin,
  User,
  CreditCard,
  Trash2,
} from 'lucide-react';
import { Quotation, QuotationItem } from '@/types';
import { CallbackModal } from '@/components/common/CallbackModal';

interface QuotationClientProps {
  initialQuotation: Quotation;
}

export function QuotationClient({ initialQuotation }: QuotationClientProps) {
  const router = useRouter();
  const [quotation, setQuotation] = useState<Quotation>(initialQuotation);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successBookingRef, setSuccessBookingRef] = useState<string | null>(
    initialQuotation.bookingReference || null
  );

  // YES Flow: Interactive Address & Scheduling State
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    fullName: initialQuotation.patientName || '',
    age: initialQuotation.patientAge?.toString() || '',
    gender: (initialQuotation.patientGender || 'male') as 'male' | 'female' | 'other',
    mobile: initialQuotation.patientMobile || '',
    email: '',
  });

  const [address, setAddress] = useState({
    houseNumber: '',
    street: '',
    landmark: '',
    area: 'Kamla Nagar / Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110007',
  });

  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [minDate, setMinDate] = useState('2026-10-24');
  const [selectedSlot, setSelectedSlot] = useState('07:00 AM - 08:30 AM');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_collection' | 'upi_qr' | 'online_gateway'>('cash_on_collection');

  // NO Flow: Cancel Modal State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [deletePrescriptionChecked, setDeletePrescriptionChecked] = useState(false);
  const [isCancelled, setIsCancelled] = useState(initialQuotation.status === 'declined');

  // Callback Modal
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
    setMinDate(today.toISOString().split('T')[0]);
  }, []);

  // Handle Patient Response: YES
  const handleProceedWithBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientDetails.fullName.trim()) {
      setErrorMessage('Please provide patient full name.');
      return;
    }
    if (!address.houseNumber.trim() || !address.street.trim() || !address.pincode.trim()) {
      setErrorMessage('Please provide complete collection address and PIN code.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`/api/quotations/${quotation.quotationReference}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: 'YES',
          quotationVersion: quotation.currentVersion,
          patientDetails,
          collectionAddress: address,
          selectedDate,
          selectedSlot,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to confirm booking.');
      }

      setSuccessBookingRef(data.bookingReference);
      setQuotation((prev) => ({
        ...prev,
        status: 'converted_to_booking',
        bookingReference: data.bookingReference,
      }));
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while confirming your booking.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Patient Response: NO
  const handleCancelQuotation = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`/api/quotations/${quotation.quotationReference}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: 'NO',
          deletePrescriptionFile: deletePrescriptionChecked,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to cancel quotation.');
      }

      setIsCancelled(true);
      setShowCancelModal(false);
      setQuotation((prev) => ({ ...prev, status: 'declined' }));
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to cancel quotation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0b3866]">Home</Link>
          <span>/</span>
          <Link href="/prescription-upload" className="hover:text-[#0b3866]">Prescription Upload</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Quotation {quotation.quotationReference}</span>
        </nav>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0b3866]">
                Quotation Ref: {quotation.quotationReference}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                Version {quotation.currentVersion}
              </span>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                quotation.status === 'converted_to_booking'
                  ? 'bg-emerald-100 text-emerald-800'
                  : quotation.status === 'declined'
                  ? 'bg-slate-100 text-slate-600'
                  : quotation.status === 'manual_review_required'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-teal-100 text-teal-800'
              }`}
            >
              {quotation.status.replace(/_/g, ' ')}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#0b3866]">
            Prescription Diagnostic Quotation
          </h1>

          {/* Mandated Review Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-900 leading-relaxed font-medium">
            &ldquo;These tests have been identified from your prescription. Please review the test list and estimated charges.&rdquo;
          </div>

          {quotation.isProvisional && (
            <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Provisional Estimate Notice:</strong> Some prescribed tests require clinical pathologist manual verification. Prices for unverified or specialized tests will be confirmed upon laboratory review.
              </span>
            </div>
          )}
        </div>

        {/* Booking Converted Success Banner */}
        {successBookingRef && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 mb-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-black text-emerald-900">
              Booking Confirmed Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800">
              Your prescription quotation has been converted to an official diagnostic home collection order.
            </p>
            <div className="inline-block p-3 bg-white rounded-xl border border-emerald-200 text-xs font-bold text-[#0b3866]">
              Booking Reference: <span className="text-emerald-700">{successBookingRef}</span>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                href={`/track?ref=${successBookingRef}`}
                className="px-6 py-2.5 bg-[#0b3866] text-white rounded-xl text-xs font-bold shadow hover:bg-[#082848] transition-colors flex items-center gap-1.5"
              >
                <span>Track Live Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Cancellation Message */}
        {isCancelled && !successBookingRef && (
          <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 mb-8 text-center space-y-2">
            <h3 className="text-base font-bold text-slate-800">Quotation Cancelled</h3>
            <p className="text-xs text-slate-500">
              This quotation was cancelled. No booking was created. If you need any assistance, our clinical team is available.
            </p>
            <button
              onClick={() => setIsCallbackOpen(true)}
              className="mt-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-[#0b3866] hover:bg-slate-50 shadow-sm"
            >
              Request Free Callback (7982348151)
            </button>
          </div>
        )}

        {/* Line Items Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-[#0b3866]">
              Identified Tests & Charges Breakdown
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {quotation.items.length} {quotation.items.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Identified Diagnostic Test</th>
                  <th className="pb-3 font-bold">Prescription Text</th>
                  <th className="pb-3 font-bold">Match Status</th>
                  <th className="pb-3 font-bold text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotation.items.map((item: QuotationItem) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 pr-3">
                      <div className="font-bold text-slate-800 text-xs sm:text-sm">
                        {item.name}
                      </div>
                      {item.notes && (
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.notes}</div>
                      )}
                    </td>
                    <td className="py-3.5 pr-3 font-mono text-slate-500 text-[11px]">
                      &ldquo;{item.originalPrescriptionText}&rdquo;
                    </td>
                    <td className="py-3.5 pr-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.matchStatus === 'auto_matched'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : item.matchStatus === 'staff_verified'
                            ? 'bg-blue-50 text-blue-700 border border-blue-100'
                            : item.matchStatus === 'unavailable'
                            ? 'bg-red-50 text-red-700 border border-red-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}
                      >
                        {item.matchStatus === 'auto_matched'
                          ? 'Auto Matched'
                          : item.matchStatus === 'staff_verified'
                          ? 'Staff Verified'
                          : item.matchStatus === 'unavailable'
                          ? 'Unavailable'
                          : 'Provisional'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-black text-slate-800 text-xs sm:text-sm">
                      {item.price > 0 ? (
                        <>₹{item.price}</>
                      ) : (
                        <span className="text-slate-400 font-semibold text-[11px]">
                          {item.matchStatus === 'unavailable' ? 'N/A' : 'TBD'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Box */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-2 max-w-xs ml-auto text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Tests Subtotal:</span>
              <span className="font-bold text-slate-800">₹{quotation.subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Home Sample Collection:</span>
              <span className="font-bold text-emerald-600">
                {quotation.collectionFee === 0 ? 'FREE' : `₹${quotation.collectionFee}`}
              </span>
            </div>
            {quotation.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount Applied:</span>
                <span className="font-bold">-₹{quotation.discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-[#0b3866]">
              <span>Estimated Total:</span>
              <span className="text-xl">₹{quotation.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* DECISION ACTION SECTION: YES OR NO */}
        {!successBookingRef && !isCancelled && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Patient Confirmation
              </span>
              <h3 className="text-lg font-black text-slate-800">
                Would you like to proceed with this quotation?
              </h3>
              <p className="text-xs text-slate-500">
                Confirm your booking or cancel with zero obligation.
              </p>
            </div>

            {/* Two Explicit Buttons: YES or NO */}
            {!showBookingForm ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(true)}
                  className="w-full py-4 bg-[#00a896] hover:bg-[#009383] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>A. YES, PROCEED WITH BOOKING</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5 text-slate-500" />
                  <span>B. NO, CANCEL</span>
                </button>
              </div>
            ) : (
              /* Expanded YES Booking Details Form */
              <form onSubmit={handleProceedWithBooking} className="space-y-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00a896]" />
                    <span>Provide Home Collection Address & Schedule</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                  >
                    Cancel
                  </button>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      value={patientDetails.fullName}
                      onChange={(e) =>
                        setPatientDetails({ ...patientDetails, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={patientDetails.mobile}
                      onChange={(e) =>
                        setPatientDetails({ ...patientDetails, mobile: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={patientDetails.age}
                      onChange={(e) =>
                        setPatientDetails({ ...patientDetails, age: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={patientDetails.gender}
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          gender: e.target.value as 'male' | 'female' | 'other',
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Address Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">
                      House / Flat / Building *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 302, Green Tower"
                      value={address.houseNumber}
                      onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Street / Colony *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kamla Nagar Market Road"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 110007"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                </div>

                {/* Preferred Schedule Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Collection Date</label>
                    <input
                      type="date"
                      min={minDate}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Time Window</label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-[#00a896] outline-none"
                    >
                      <option value="06:30 AM - 08:00 AM">06:30 AM - 08:00 AM (Fasting Ideal)</option>
                      <option value="08:00 AM - 09:30 AM">08:00 AM - 09:30 AM (Fasting)</option>
                      <option value="09:30 AM - 11:00 AM">09:30 AM - 11:00 AM</option>
                      <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Payment Option</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_collection')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 ${
                        paymentMethod === 'cash_on_collection'
                          ? 'bg-blue-50/50 border-[#0b3866] text-[#0b3866]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#00a896]" />
                      <div className="font-bold">Pay on Collection (Cash/UPI)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi_qr')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 ${
                        paymentMethod === 'upi_qr'
                          ? 'bg-blue-50/50 border-[#0b3866] text-[#0b3866]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#00a896]" />
                      <div className="font-bold">UPI QR at Sample Pickup</div>
                    </button>
                  </div>
                </div>

                {/* Final Confirm Submit */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-[#0b3866] hover:bg-[#082848] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-60"
                  >
                    <span>Confirm Home Collection Booking (₹{quotation.totalAmount})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Cancellation Modal Dialog */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
              <h3 className="text-base font-black text-slate-800">
                Cancel Prescription Quotation?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to cancel this quotation? No diagnostic booking will be created. You can also request a free callback if you have questions regarding the prices or tests.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                <input
                  id="delete-file-cb"
                  type="checkbox"
                  checked={deletePrescriptionChecked}
                  onChange={(e) => setDeletePrescriptionChecked(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="delete-file-cb" className="text-xs text-slate-700 cursor-pointer">
                  Delete my uploaded prescription document from laboratory private storage.
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Keep Quotation
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleCancelQuotation}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow disabled:opacity-60"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <CallbackModal
          isOpen={isCallbackOpen}
          onClose={() => setIsCallbackOpen(false)}
          defaultPackageName={`Prescription Quotation ${quotation.quotationReference}`}
        />
      </div>
    </div>
  );
}
