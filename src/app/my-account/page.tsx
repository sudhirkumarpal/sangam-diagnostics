'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Calendar,
  FileText,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  LogOut,
  Download,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Booking } from '@/types';

export default function MyAccountPage() {
  const router = useRouter();
  const [patientMobile, setPatientMobile] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mobile = localStorage.getItem('sangam_patient_mobile');
    if (!mobile) {
      // Default to demo patient or redirect
      setPatientMobile('7982348151');
      fetchPatientBookings('7982348151');
    } else {
      setPatientMobile(mobile);
      fetchPatientBookings(mobile);
    }
  }, []);

  const fetchPatientBookings = async (mobileNum: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?mobile=${mobileNum}`);
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('sangam_patient_token');
    localStorage.removeItem('sangam_patient_mobile');
    router.push('/login');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0b3866] text-white flex items-center justify-center font-black text-xl">
              <User className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#00a896] uppercase tracking-wider">
                Patient Account
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {bookings[0]?.patient.fullName || 'Registered Patient'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Registered Mobile: +91 {patientMobile}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="px-4 py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book New Test</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Bookings & Reports List */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-[#0b3866]">My Diagnostic Bookings & Reports</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track status of upcoming sample collections or download signed test results.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">{bookings.length} Records</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading your health records...</div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-700">No Booking Records Found</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                You haven&apos;t booked any tests with mobile +91 {patientMobile} yet.
              </p>
              <Link
                href="/booking"
                className="px-5 py-2.5 bg-[#0b3866] text-white text-xs font-bold rounded-xl"
              >
                Book Your First Test
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#0b3866]">
                        {b.bookingReference}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.bookingStatus === 'report_ready'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.bookingStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">
                      {b.items.map((it) => it.name).join(', ')}
                    </h4>

                    <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span>Scheduled: {b.selectedDate} ({b.selectedSlot})</span>
                      <span>Total: ₹{b.totalAmount} (Paid)</span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Address: {b.collectionAddress.street}, {b.collectionAddress.area}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                    <Link
                      href={`/track?ref=${b.bookingReference}`}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                    >
                      Track Order
                    </Link>

                    {b.bookingStatus === 'report_ready' ? (
                      <Link
                        href={`/reports?ref=${b.bookingReference}`}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Download Report</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                        Report in 12–14h
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-[#0b3866] to-[#00a896] text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base">Need to reschedule or modify your booking?</h3>
            <p className="text-xs text-cyan-100 mt-0.5">
              Contact our patient support helpline at 7982348151 or request an immediate callback.
            </p>
          </div>
          <a
            href="tel:7982348151"
            className="px-5 py-2.5 bg-white text-[#0b3866] font-bold text-xs rounded-xl shadow hover:bg-slate-100 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Call 7982348151</span>
          </a>
        </div>
      </div>
    </div>
  );
}
