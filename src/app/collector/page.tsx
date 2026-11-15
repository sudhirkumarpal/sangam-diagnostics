'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Truck,
  Phone,
  Navigation,
  CheckCircle2,
  Barcode,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { Booking } from '@/types';
import { INITIAL_COLLECTORS } from '@/lib/data';

export default function CollectorPortalPage() {
  const [selectedCollectorId, setSelectedCollectorId] = useState('col-1');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBarcodeModal, setActiveBarcodeModal] = useState<Booking | null>(null);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    setTodayDate(new Date().toLocaleDateString('en-IN'));
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [selectedCollectorId]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.bookings) {
        // Filter bookings assigned to this collector or unassigned for picking up
        const assigned = data.bookings.filter(
          (b: Booking) => b.collector?.id === selectedCollectorId || !b.collector
        );
        setBookings(assigned);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: Booking['bookingStatus']) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingStatus: status }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? data.booking : b)));
        setFeedback(`Visit status updated to ${status.replace('_', ' ')}`);
        setTimeout(() => setFeedback(''), 3000);
      }
    } catch {
      setFeedback('Failed to update status');
    }
  };

  const handleRecordSample = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBarcodeModal || !barcodeInput.trim()) return;

    try {
      const res = await fetch(`/api/bookings/${activeBarcodeModal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingStatus: 'sample_collected',
          sampleBarcodes: [barcodeInput.trim().toUpperCase()],
          collectionNotes: notesInput.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.map((b) => (b.id === activeBarcodeModal.id ? data.booking : b)));
        setActiveBarcodeModal(null);
        setBarcodeInput('');
        setNotesInput('');
        setFeedback('Sample barcode recorded and status marked Sample Collected!');
        setTimeout(() => setFeedback(''), 3000);
      }
    } catch {
      setFeedback('Failed to record sample');
    }
  };

  const currentCollector = INITIAL_COLLECTORS.find((c) => c.id === selectedCollectorId);

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Phlebotomist Header */}
        <div className="bg-[#0b3866] text-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase">
              Phlebotomist Duty Portal
            </span>
            <div className="text-xs text-cyan-200">
              Vehicle: <strong className="text-white">{currentCollector?.vehicleNumber}</strong>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black">{currentCollector?.name}</h1>
              <p className="text-xs text-blue-200">{currentCollector?.activeArea}</p>
            </div>

            {/* Switch staff for testing */}
            <select
              value={selectedCollectorId}
              onChange={(e) => setSelectedCollectorId(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded-xl px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {INITIAL_COLLECTORS.map((c) => (
                <option key={c.id} value={c.id} className="text-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {feedback && (
          <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Assigned Home Visits List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>Today&apos;s Assigned Pickups ({bookings.length})</span>
            {todayDate ? <span>Date: {todayDate}</span> : <span />}
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-800">No Pending Pickups Assigned</h3>
              <p className="text-xs text-slate-500 mt-1">
                All assigned home collection samples have been completed.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4"
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0b3866]">
                      {booking.bookingReference}
                    </span>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#00a896]" />
                      <span>{booking.selectedSlot}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      booking.bookingStatus === 'sample_collected'
                        ? 'bg-emerald-100 text-emerald-800'
                        : booking.bookingStatus === 'collector_assigned'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-[#0b3866]'
                    }`}
                  >
                    {booking.bookingStatus.replace('_', ' ')}
                  </span>
                </div>

                {/* Patient Information & Address */}
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-sm font-bold text-slate-900 block">
                      {booking.patient.fullName}
                    </strong>
                    <div className="text-slate-500 text-[11px]">
                      {booking.patient.age} Yrs / {booking.patient.gender}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">{booking.collectionAddress.houseNumber}, {booking.collectionAddress.street}</span>
                        <div className="text-slate-500">
                          {booking.collectionAddress.area}, {booking.collectionAddress.city} - {booking.collectionAddress.pincode}
                        </div>
                        {booking.collectionAddress.accessInstructions && (
                          <div className="text-[10px] text-amber-700 mt-1 italic">
                            Note: {booking.collectionAddress.accessInstructions}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Test items to collect */}
                  <div className="text-[11px] text-slate-600">
                    <strong className="text-slate-800">Samples Required: </strong>
                    {booking.items.map((it) => it.name).join(', ')}
                  </div>

                  {booking.sampleBarcodes && booking.sampleBarcodes.length > 0 && (
                    <div className="text-[11px] text-emerald-800 font-bold bg-emerald-50 p-2 rounded-lg">
                      Barcode Tagged: {booking.sampleBarcodes.join(', ')}
                    </div>
                  )}
                </div>

                {/* Action Buttons: 1-Click Call, Navigation, Barcode Scan */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:${booking.patient.mobile}`}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Patient</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${booking.collectionAddress.street}, ${booking.collectionAddress.area}, ${booking.collectionAddress.city} ${booking.collectionAddress.pincode}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-blue-50 text-[#0b3866] hover:bg-blue-100 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#00a896]" />
                    <span>Navigate</span>
                  </a>
                </div>

                {/* Status Transitions */}
                <div className="pt-2">
                  {booking.bookingStatus !== 'sample_collected' && (
                    <button
                      onClick={() => {
                        setActiveBarcodeModal(booking);
                        setBarcodeInput(`AA${Math.floor(100000 + Math.random() * 900000)}`);
                      }}
                      className="w-full py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-colors"
                    >
                      <Barcode className="w-4 h-4" />
                      <span>Tag Vacutainer & Mark Collected</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Barcode Input Modal */}
        {activeBarcodeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
              <h3 className="font-bold text-base text-[#0b3866] mb-1">
                Record Sample Collection
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Booking: {activeBarcodeModal.bookingReference} ({activeBarcodeModal.patient.fullName})
              </p>

              <form onSubmit={handleRecordSample} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Vacutainer Tube Barcode ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    placeholder="e.g. AA798215"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-sm uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Collection Field Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="e.g. Fasting sample drawn from left arm. Patient comfortable."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveBarcodeModal(null)}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow"
                  >
                    Confirm Sample
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
