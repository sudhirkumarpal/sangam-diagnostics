'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Plus,
  ShieldCheck,
  ArrowRight,
  Phone,
  QrCode,
  Banknote,
  Percent,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { INITIAL_TESTS, INITIAL_PACKAGES } from '@/lib/data';
import { Booking } from '@/types';

export default function BookingPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    couponCode,
    discount,
    collectionFee,
    total,
    applyCoupon,
    removeCoupon,
    addItem,
  } = useCart();

  // Wizard Steps: 1: Services, 2: Patient, 3: Address, 4: Schedule, 5: Payment, 6: Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [patient, setPatient] = useState({
    fullName: '',
    age: '',
    gender: 'male',
    mobile: '',
    email: '',
    relationship: 'self',
    doctorNotes: '',
  });

  const [address, setAddress] = useState({
    houseNumber: '',
    street: '',
    landmark: '',
    area: '',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110007',
    accessInstructions: '',
  });

  const [pincodeServiceable, setPincodeServiceable] = useState<boolean | null>(null);
  const [pincodeMessage, setPincodeMessage] = useState('');
  const [checkingPincode, setCheckingPincode] = useState(false);

  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [minDate, setMinDate] = useState('2026-10-24');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
    setMinDate(today.toISOString().split('T')[0]);
  }, []);
  const [selectedSlot, setSelectedSlot] = useState('07:00 AM - 08:30 AM');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_collection' | 'upi_qr' | 'online_gateway'>('cash_on_collection');

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Validate pincode on change
  useEffect(() => {
    if (address.pincode.length === 6) {
      checkPincode(address.pincode);
    }
  }, [address.pincode]);

  const checkPincode = async (code: string) => {
    setCheckingPincode(true);
    try {
      const res = await fetch('/api/pincodes/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode: code }),
      });
      const data = await res.json();
      setPincodeServiceable(data.serviceable);
      setPincodeMessage(data.message);
      if (data.serviceable && data.area) {
        setAddress((prev) => ({
          ...prev,
          city: data.area.city,
          state: data.area.state,
          area: prev.area || data.area.areaName,
        }));
      }
    } catch {
      setPincodeServiceable(false);
      setPincodeMessage('Failed to verify pincode.');
    } finally {
      setCheckingPincode(false);
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput.trim());
    setCouponFeedback(res);
  };

  const handleStepValidation = (step: number) => {
    setErrorMessage('');
    if (step === 1) {
      if (items.length === 0) {
        setErrorMessage('Please select at least one test or health package to continue.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!patient.fullName.trim()) {
        setErrorMessage('Please provide patient full name.');
        return false;
      }
      const cleanMobile = patient.mobile.replace(/\D/g, '');
      if (cleanMobile.length < 10) {
        setErrorMessage('Please provide a valid 10-digit mobile number.');
        return false;
      }
      if (!patient.age || Number(patient.age) <= 0 || Number(patient.age) > 120) {
        setErrorMessage('Please provide a valid patient age.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!address.houseNumber.trim() || !address.street.trim()) {
        setErrorMessage('Please enter complete street and house address.');
        return false;
      }
      if (!pincodeServiceable) {
        setErrorMessage(
          pincodeMessage || 'The entered PIN code is not in our serviceable area.'
        );
        return false;
      }
      return true;
    }

    return true;
  };

  const nextStep = () => {
    if (handleStepValidation(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        patient: {
          fullName: patient.fullName.trim(),
          age: Number(patient.age),
          gender: patient.gender,
          mobile: patient.mobile.replace(/\D/g, ''),
          email: patient.email.trim() || undefined,
          relationship: patient.relationship,
          doctorNotes: patient.doctorNotes.trim() || undefined,
        },
        collectionAddress: {
          houseNumber: address.houseNumber.trim(),
          street: address.street.trim(),
          landmark: address.landmark.trim() || undefined,
          area: address.area.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          pincode: address.pincode.trim(),
          accessInstructions: address.accessInstructions.trim() || undefined,
        },
        selectedDate,
        selectedSlot,
        items,
        couponCode: couponCode || undefined,
        paymentMethod,
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete booking.');
      }

      setConfirmedBooking(data.booking);
      clearCart();
      setCurrentStep(6); // Step 6: Confirmation
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while saving your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Wizard Progress Bar */}
        {currentStep < 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span className={currentStep >= 1 ? 'text-[#0b3866]' : ''}>1. Services</span>
              <span className={currentStep >= 2 ? 'text-[#0b3866]' : ''}>2. Patient</span>
              <span className={currentStep >= 3 ? 'text-[#0b3866]' : ''}>3. Address</span>
              <span className={currentStep >= 4 ? 'text-[#0b3866]' : ''}>4. Schedule</span>
              <span className={currentStep >= 5 ? 'text-[#0b3866]' : ''}>5. Payment</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0b3866] to-[#00a896] h-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-xs font-medium rounded-2xl border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: SERVICE SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Have a prescription banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-teal-100 text-[#00a896] font-bold flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="font-bold text-slate-800">Have a Doctor&apos;s Prescription Slip?</span>
                  <p className="text-slate-600 mt-0.5">
                    Skip searching! Upload your prescription and get an automatic price quotation.
                  </p>
                </div>
              </div>
              <Link
                href="/prescription-upload"
                className="px-4 py-2 bg-[#00a896] hover:bg-[#008f80] text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Upload Prescription & Get Price</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h2 className="text-xl font-black text-[#0b3866]">Your Selected Diagnostic Services</h2>
                <span className="text-xs text-slate-500 font-semibold">{items.length} items</span>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-blue-50 text-[#0b3866] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-base text-slate-800">Your Booking Tray is Empty</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                    Select a health package or individual blood test to proceed with booking.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        addItem({
                          type: 'package',
                          id: 'pkg-basic-health',
                          slug: 'basic-health-package',
                          name: 'Basic Health Package',
                          price: 999,
                        })
                      }
                      className="px-4 py-2 bg-[#0b3866] text-white text-xs font-bold rounded-xl"
                    >
                      Add Basic Health Package (₹999)
                    </button>
                    <Link
                      href="/tests"
                      className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl"
                    >
                      Browse Tests
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#00a896] uppercase block">
                          {item.type === 'package' ? 'Health Package' : 'Diagnostic Test'}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                        <span className="text-xs text-slate-500">₹{item.price} each</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-slate-600 hover:text-black font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-slate-600 hover:text-black font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-black text-sm text-[#0b3866] w-16 text-right">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Add Featured Packages */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Popular Additions for Comprehensive Screen:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INITIAL_PACKAGES.filter((p) => !items.some((i) => i.slug === p.slug)).slice(0, 2).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-800">{p.name}</div>
                        <div className="text-[11px] text-[#00a896] font-extrabold">₹{p.offerPrice}</div>
                      </div>
                      <button
                        onClick={() =>
                          addItem({
                            type: 'package',
                            id: p.id,
                            slug: p.slug,
                            name: p.name,
                            price: p.offerPrice,
                          })
                        }
                        className="px-3 py-1 bg-blue-50 text-[#0b3866] hover:bg-[#0b3866] hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            {items.length > 0 && (
              <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <span className="text-xs text-slate-500">Subtotal</span>
                  <div className="text-2xl font-black text-[#0b3866]">₹{subtotal}</div>
                </div>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-sm rounded-xl shadow transition-all flex items-center gap-2"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PATIENT DETAILS */}
        {currentStep === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-[#0b3866]">Patient Information</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Please enter the details of the person whose blood sample will be collected.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={patient.fullName}
                  onChange={(e) => setPatient({ ...patient, fullName: e.target.value })}
                  placeholder="e.g. Mrs. Bharti Pal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">10-Digit Mobile Number *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={patient.mobile}
                    onChange={(e) => setPatient({ ...patient, mobile: e.target.value.replace(/\D/g, '') })}
                    placeholder="7982348151"
                    className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age (Years) *</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  required
                  value={patient.age}
                  onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                  placeholder="e.g. 36"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                <select
                  value={patient.gender}
                  onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Relationship to You</label>
                <select
                  value={patient.relationship}
                  onChange={(e) => setPatient({ ...patient, relationship: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="other">Other Relative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional for Report Copy)</label>
                <input
                  type="email"
                  value={patient.email}
                  onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                  placeholder="care.patient@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Clinical Symptoms or Doctor Notes (Optional)
                </label>
                <input
                  type="text"
                  value={patient.doctorNotes}
                  onChange={(e) => setPatient({ ...patient, doctorNotes: e.target.value })}
                  placeholder="e.g. Diabete checkup, fasting since 9 PM last night, doctor advised lipid profile"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-sm rounded-xl shadow flex items-center gap-1.5"
              >
                <span>Continue to Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COLLECTION ADDRESS */}
        {currentStep === 3 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-[#0b3866]">Home Collection Location</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Our phlebotomist visits this address to collect your diagnostic samples.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  6-Digit PIN Code * (Delhi NCR Coverage)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                    placeholder="e.g. 110007, 201310, 110001"
                    className="w-48 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                  />
                  {checkingPincode && <span className="text-xs text-slate-400 self-center">Verifying...</span>}
                </div>
                {pincodeMessage && (
                  <p
                    className={`text-xs mt-1 font-medium ${
                      pincodeServiceable ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {pincodeMessage}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">House / Flat / Floor No. *</label>
                <input
                  type="text"
                  required
                  value={address.houseNumber}
                  onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                  placeholder="e.g. Flat 302, Block B"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street / Building / Society *</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="e.g. Near Kamla Nagar Market"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  placeholder="e.g. Near Metro Station / Park Gate"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Area / Locality *</label>
                <input
                  type="text"
                  value={address.area}
                  onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  placeholder="e.g. New Chandrawal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  readOnly
                  value={address.city}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  readOnly
                  value={address.state}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-sm rounded-xl shadow flex items-center gap-1.5"
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SCHEDULE TIME SLOT */}
        {currentStep === 4 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-[#0b3866]">Pick Date & Convenient Time Slot</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Early morning slots are ideal for fasting blood tests (Lipid, Glucose, LFT).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Preferred Collection Date</label>
              <input
                type="date"
                min={minDate}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Time Window</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { time: '06:30 AM - 08:00 AM', tag: 'Best for Fasting' },
                  { time: '08:00 AM - 09:30 AM', tag: 'Recommended' },
                  { time: '09:30 AM - 11:00 AM', tag: 'Morning' },
                  { time: '11:00 AM - 01:00 PM', tag: 'Midday' },
                  { time: '02:00 PM - 04:00 PM', tag: 'Afternoon' },
                  { time: '04:00 PM - 06:00 PM', tag: 'Evening' },
                ].map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedSlot === slot.time
                        ? 'border-[#00a896] bg-teal-50/60 ring-2 ring-[#00a896]/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-[#00a896] uppercase block">
                      {slot.tag}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{slot.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-sm rounded-xl shadow flex items-center gap-1.5"
              >
                <span>Review & Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & PAYMENT SELECTION */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-[#0b3866]">Review Booking & Payment Method</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm patient information, scheduled time slot, and pick your payment option.
                </p>
              </div>

              {/* Patient & Address summary grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-500 block mb-1">Patient Details:</span>
                  <div className="font-bold text-slate-900 text-sm">{patient.fullName}</div>
                  <div>
                    {patient.age} Yrs / {patient.gender} | Mob: +91 {patient.mobile}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block mb-1">Collection Address & Slot:</span>
                  <div className="font-semibold text-slate-900">
                    {address.houseNumber}, {address.street}, {address.area}
                  </div>
                  <div>
                    PIN: {address.pincode} | Slot: {selectedDate} ({selectedSlot})
                  </div>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Have a coupon? Try SANGAM10 or HEALTH2026"
                      className="w-full pl-9 pr-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-xs rounded-xl"
                  >
                    Apply
                  </button>
                </form>
                {couponFeedback && (
                  <p
                    className={`text-xs mt-2 font-medium ${
                      couponFeedback.success ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
                {couponCode && (
                  <div className="flex items-center justify-between mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                    <span>Applied Coupon: {couponCode} (-₹{discount})</span>
                    <button onClick={removeCoupon} className="text-red-600 underline text-[11px]">
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Services Subtotal:</span>
                  <span className="font-bold text-slate-800">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Home Sample Collection Fee:</span>
                  <span className="font-bold text-emerald-600">
                    {collectionFee === 0 ? 'FREE' : `₹${collectionFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0b3866] pt-2 border-t border-slate-200">
                  <span>Total Payable Amount:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_collection')}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'cash_on_collection'
                        ? 'border-[#00a896] bg-teal-50/60 ring-2 ring-[#00a896]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Banknote className="w-6 h-6 text-[#00a896] mb-2" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Pay at Collection</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Pay via Cash or UPI during sample draw</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi_qr')}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'upi_qr'
                        ? 'border-[#00a896] bg-teal-50/60 ring-2 ring-[#00a896]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-purple-600 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Instant UPI QR</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Google Pay / PhonePe / Paytm</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online_gateway')}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'online_gateway'
                        ? 'border-[#00a896] bg-teal-50/60 ring-2 ring-[#00a896]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-blue-600 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Cards & Netbanking</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Secure payment gateway sandbox</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={prevStep}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Back
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-[#00a896] hover:from-emerald-700 hover:to-[#008f80] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isSubmitting ? 'Confirming Booking...' : `Confirm & Book (₹${total})`}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION SUCCESS */}
        {currentStep === 6 && confirmedBooking && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                Appointment Registered
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866] mt-1">
                Booking Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{confirmedBooking.patient.fullName}</strong>. Your home sample collection has been reserved.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl max-w-sm mx-auto">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Your Booking Reference</div>
              <div className="text-2xl font-black text-[#0b3866] font-mono tracking-wider mt-0.5">
                {confirmedBooking.bookingReference}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Status:{' '}
                <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase text-[10px]">
                  {confirmedBooking.bookingStatus.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Breakdown summary */}
            <div className="text-left text-xs text-slate-600 p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span>Date & Time Slot:</span>
                <span className="font-bold text-slate-800">
                  {confirmedBooking.selectedDate} ({confirmedBooking.selectedSlot})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Collection Address:</span>
                <span className="font-bold text-slate-800 truncate max-w-[200px]">
                  {confirmedBooking.collectionAddress.street}, {confirmedBooking.collectionAddress.area}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-bold text-slate-800 uppercase">
                  {confirmedBooking.paymentMethod.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span className="text-[#0b3866]">₹{confirmedBooking.totalAmount}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href={`/track?ref=${confirmedBooking.bookingReference}&mobile=${confirmedBooking.patient.mobile}`}
                className="px-6 py-3 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-xs rounded-xl shadow"
              >
                Track Booking Timeline
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
