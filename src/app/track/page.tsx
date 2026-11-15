'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  FileText,
  Truck,
  Phone,
  AlertCircle,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Booking } from '@/types';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';
  const initialMobile = searchParams.get('mobile') || '';

  const [bookingRef, setBookingRef] = useState(initialRef);
  const [mobile, setMobile] = useState(initialMobile);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRef) {
      handleSearch(initialRef, initialMobile);
    }
  }, [initialRef]);

  const handleSearch = async (refToSearch: string, mobToSearch: string) => {
    if (!refToSearch.trim()) {
      setError('Please enter your Booking Reference (e.g. SD-2026-8941)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/bookings/${refToSearch.trim()}`);
      const data = await res.json();

      if (!res.ok || !data.success || !data.booking) {
        throw new Error('No booking found with this reference. Please check your reference code.');
      }

      // If mobile was provided, verify matching last 4 digits
      if (mobToSearch.trim()) {
        const cleanProvided = mobToSearch.replace(/\D/g, '');
        const cleanActual = data.booking.patient.mobile.replace(/\D/g, '');
        if (!cleanActual.endsWith(cleanProvided) && !cleanProvided.endsWith(cleanActual)) {
          throw new Error('Mobile number does not match this booking record.');
        }
      }

      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message || 'Failed to locate booking record.');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'received', label: 'Booking Received' },
    { key: 'confirmed', label: 'Order Confirmed' },
    { key: 'collector_assigned', label: 'Phlebotomist Assigned' },
    { key: 'sample_collected', label: 'Sample Collected' },
    { key: 'processing', label: 'Lab Processing' },
    { key: 'report_ready', label: 'Report Ready' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const statusOrder = [
      'received',
      'confirmed',
      'collector_assigned',
      'collection_scheduled',
      'sample_collected',
      'processing',
      'report_ready',
      'completed',
    ];

    const targetIndex = statusOrder.indexOf(stepKey);
    const currentIndex = statusOrder.indexOf(currentStatus);

    if (currentIndex >= targetIndex) return 'completed';
    if (currentIndex === targetIndex - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Live Diagnostic Status
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Track Your Booking & Sample</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status updates from phlebotomist dispatch to doctor-signed test report publication.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(bookingRef, mobile);
            }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3"
          >
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Booking Reference *
              </label>
              <input
                type="text"
                required
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="e.g. SD-2026-8941"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Mobile (Optional)
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 7982348151"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? 'Searching...' : 'Track'}</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Help */}
          <div className="mt-4 text-[11px] text-slate-400">
            <span>Demo Reference: </span>
            <button
              onClick={() => {
                setBookingRef('SD-2026-8941');
                setMobile('7982348151');
                handleSearch('SD-2026-8941', '7982348151');
              }}
              className="font-mono font-bold text-[#00a896] hover:underline"
            >
              SD-2026-8941
            </button>
            <span> (Sample with published report)</span>
          </div>
        </div>

        {/* Tracking Details View */}
        {booking && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0b3866] to-[#092d52] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                  Booking Reference
                </span>
                <h3 className="text-2xl font-black font-mono tracking-wider">{booking.bookingReference}</h3>
                <span className="text-xs text-blue-100">
                  Booked on {new Date(booking.createdAt).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-blue-200 uppercase font-semibold block">Current Status</span>
                <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black rounded-full uppercase mt-1">
                  {booking.bookingStatus.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="p-6 sm:p-8 border-b border-slate-100">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                {steps.map((st, i) => {
                  const state = getStepStatus(st.key, booking.bookingStatus);
                  return (
                    <div key={st.key} className="flex flex-col items-center text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                          state === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : state === 'current'
                            ? 'bg-[#00a896] text-white ring-4 ring-teal-100 animate-pulse'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {state === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                      </div>
                      <span
                        className={`text-xs font-bold leading-tight ${
                          state === 'completed'
                            ? 'text-slate-800'
                            : state === 'current'
                            ? 'text-[#00a896]'
                            : 'text-slate-400'
                        }`}
                      >
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0b3866] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00a896]" />
                  <span>Patient & Order Summary</span>
                </h4>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                  <div>
                    <strong>Patient:</strong> {booking.patient.fullName} ({booking.patient.age} Yrs / {booking.patient.gender})
                  </div>
                  <div>
                    <strong>Mobile:</strong> +91 {booking.patient.mobile}
                  </div>
                  <div>
                    <strong>Scheduled Slot:</strong> {booking.selectedDate} ({booking.selectedSlot})
                  </div>
                  <div>
                    <strong>Total Amount:</strong> ₹{booking.totalAmount} (
                    <span className="font-semibold uppercase text-emerald-700">{booking.paymentStatus}</span>)
                  </div>
                </div>

                <div className="pt-2">
                  <strong className="text-slate-800 block mb-1">Booked Diagnostic Items:</strong>
                  <div className="space-y-1">
                    {booking.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span>{it.name} (x{it.quantity})</span>
                        <span className="font-bold text-slate-900">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0b3866] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#00a896]" />
                  <span>Collection & Collector Assignment</span>
                </h4>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                  <div>
                    <strong>Collection Address:</strong> {booking.collectionAddress.houseNumber}, {booking.collectionAddress.street}, {booking.collectionAddress.area}, {booking.collectionAddress.city} - {booking.collectionAddress.pincode}
                  </div>
                  {booking.collector ? (
                    <div className="pt-2 border-t border-slate-200 mt-2">
                      <div className="text-emerald-800 font-bold">Assigned Phlebotomist:</div>
                      <div>{booking.collector.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:${booking.collector.phone}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0b3866] bg-blue-50 px-2 py-0.5 rounded"
                        >
                          <Phone className="w-3 h-3 text-[#00a896]" />
                          <span>Call: {booking.collector.phone}</span>
                        </a>
                        <span className="text-[10px] text-slate-500">Vehicle: {booking.collector.vehicleNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 italic">Phlebotomist will be assigned 2 hours prior to your slot.</div>
                  )}

                  {booking.sampleBarcodes && booking.sampleBarcodes.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 mt-2">
                      <strong className="text-slate-700">Sample Barcode:</strong>{' '}
                      <span className="font-mono font-bold text-[#0b3866]">
                        {booking.sampleBarcodes.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Report Download CTA */}
                {booking.bookingStatus === 'report_ready' && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h5 className="font-black text-sm text-emerald-900">Official Report Ready!</h5>
                    <p className="text-[11px] text-emerald-700">
                      Your NABL certified laboratory report has been approved and signed by our pathologists.
                    </p>
                    <Link
                      href={`/reports?ref=${booking.bookingReference}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View & Download Report</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading tracker...</div>}>
      <TrackContent />
    </Suspense>
  );
}
