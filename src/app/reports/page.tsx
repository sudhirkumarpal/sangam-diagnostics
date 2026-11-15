'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  QrCode,
  Award,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { LaboratoryReport } from '@/types';

function ReportsContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [bookingRef, setBookingRef] = useState(initialRef);
  const [mobile, setMobile] = useState('');
  const [report, setReport] = useState<LaboratoryReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRef) {
      fetchReport(initialRef);
    }
  }, [initialRef]);

  const fetchReport = async (ref: string) => {
    if (!ref.trim()) {
      setError('Please provide a valid Booking Reference.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/reports?ref=${ref.trim()}`);
      const data = await res.json();

      if (!res.ok || !data.success || !data.report) {
        throw new Error(
          'No authenticated report has been published for this booking yet. If your sample was recently collected, reports are usually ready within 12–14 hours.'
        );
      }

      setReport(data.report);
    } catch (err: any) {
      setError(err.message || 'Report retrieval failed.');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="print:hidden space-y-6 mb-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
              Secure Patient Portal
            </span>
            <h1 className="text-3xl font-black text-[#0b3866] mt-1">Download Diagnostic Report</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Access your NABL accredited, doctor-signed pathology report with complete analytical parameters.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchReport(bookingRef);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  placeholder="Enter Booking Reference (e.g. SD-2026-8941)"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? 'Verifying...' : 'Access Report'}</span>
              </button>
            </form>

            {error && (
              <div className="mt-3 p-3 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-3 text-[11px] text-slate-400">
              Try sample reference:{' '}
              <button
                onClick={() => {
                  setBookingRef('SD-2026-8941');
                  fetchReport('SD-2026-8941');
                }}
                className="font-mono font-bold text-[#00a896] hover:underline"
              >
                SD-2026-8941
              </button>{' '}
              (Mrs. Bharti Pal — CBC Report)
            </div>
          </div>
        </div>

        {/* OFFICIAL LABORATORY TEST REPORT (Exact NABL Format from Poster Image 4) */}
        {report && (
          <div className="space-y-4">
            {/* Action Bar (Print / PDF) */}
            <div className="print:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  Verified Report for {report.patientName} (Ref: {report.bookingReference})
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

            {/* A4 REPORT CONTAINER */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-300 shadow-xl print:border-none print:shadow-none print:p-0 text-slate-900">
              {/* Report Header */}
              <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900">
                <div>
                  <Logo size="md" />
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-xs font-black tracking-wide text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>NABL ACCREDITED LAB (MC-7078)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                    ACCURATE RESULTS | BETTER HEALTH | PRECISION & TRUST
                  </div>
                </div>
              </div>

              {/* Title Bar */}
              <div className="bg-[#d90429] text-white text-center py-1 text-sm font-black uppercase tracking-wider my-3 rounded-sm">
                LABORATORY TEST REPORT
              </div>

              {/* Patient Metadata Table */}
              <div className="border border-slate-300 rounded-lg p-3 text-xs mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono">
                <div>
                  <span className="text-slate-500 font-sans">Patient Name: </span>
                  <strong className="text-slate-900 font-sans">{report.patientName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-sans">Specimen Drawn ON: </span>
                  <strong>{report.specimenDrawnOn}</strong>
                </div>

                <div>
                  <span className="text-slate-500 font-sans">Age / Gender: </span>
                  <strong>{report.age} YRS / {report.gender}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-sans">Specimen Received ON: </span>
                  <strong>{report.specimenReceivedOn}</strong>
                </div>

                <div>
                  <span className="text-slate-500 font-sans">UHID/MR No: </span>
                  <strong>{report.uhid}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-sans">Report Date: </span>
                  <strong>{report.reportDate}</strong>
                </div>

                <div>
                  <span className="text-slate-500 font-sans">Barcode No: </span>
                  <strong className="text-[#0b3866]">{report.barcodeNo}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-sans">Client Code: </span>
                  <strong>DL2396</strong>
                </div>

                <div>
                  <span className="text-slate-500 font-sans">Ref Doctor: </span>
                  <strong>{report.refDoctor || 'Dr. SELF'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-sans">Visit ID: </span>
                  <strong>{report.visitId}</strong>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-500 font-sans">Client / Collection Point: </span>
                  <strong>{report.clientName || 'CRL COLLECTION POINT (SAINI)'}</strong>
                </div>
              </div>

              {/* Department Header */}
              <div className="bg-slate-100 text-slate-800 font-black text-center py-1 text-xs uppercase tracking-wider border border-slate-300 mb-2">
                {report.department || 'DEPARTMENT OF HAEMATOLOGY'}
              </div>

              {/* Parameters Table */}
              <table className="w-full text-xs text-left border-collapse border border-slate-300 mb-6">
                <thead>
                  <tr className="bg-slate-200/80 font-bold text-slate-900 border-b border-slate-300">
                    <th className="py-1.5 px-3 border-r border-slate-300">Test Name</th>
                    <th className="py-1.5 px-3 border-r border-slate-300 text-center w-24">Result</th>
                    <th className="py-1.5 px-3 border-r border-slate-300 text-center w-28">Unit</th>
                    <th className="py-1.5 px-3 border-r border-slate-300 text-center w-32">Bio. Ref. Range</th>
                    <th className="py-1.5 px-3 text-center w-36">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {report.parameters.map((p, idx) => (
                    <tr
                      key={idx}
                      className={p.isAbnormal ? 'bg-red-50/50 font-semibold' : 'hover:bg-slate-50'}
                    >
                      <td className="py-1.5 px-3 border-r border-slate-200">
                        {p.testName}
                        {p.isAbnormal && <span className="text-[#d90429] font-black ml-1.5">*</span>}
                      </td>
                      <td
                        className={`py-1.5 px-3 border-r border-slate-200 text-center font-bold font-mono ${
                          p.isAbnormal ? 'text-[#d90429]' : 'text-slate-900'
                        }`}
                      >
                        {p.result}
                      </td>
                      <td className="py-1.5 px-3 border-r border-slate-200 text-center text-slate-600 font-mono">
                        {p.unit}
                      </td>
                      <td className="py-1.5 px-3 border-r border-slate-200 text-center text-slate-600 font-mono">
                        {p.refRange}
                      </td>
                      <td className="py-1.5 px-3 text-center text-slate-500 text-[10px]">
                        {p.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* End of Report Disclaimer */}
              <div className="text-[10px] text-slate-500 italic mb-6">
                *** End of Report. Results marked with (*) indicate values outside standard biological reference ranges. Test results relate strictly to the sample analyzed. Clinical correlation is recommended. ***
              </div>

              {/* Laboratory Signatures Section */}
              <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="h-10 flex items-center justify-center font-serif italic text-slate-600">
                    Anil Gupta
                  </div>
                  <strong className="block text-[11px] text-slate-900 uppercase">DR. ANIL GUPTA</strong>
                  <span className="text-[10px] text-slate-500 block">M.B.B.S., M.D. (PATH)</span>
                  <span className="text-[9px] text-slate-400 block">SR. CONSULTANT PATHOLOGIST (REGD. 5015)</span>
                </div>

                <div>
                  <div className="h-10 flex items-center justify-center font-serif italic text-slate-600">
                    Aryan Saini
                  </div>
                  <strong className="block text-[11px] text-slate-900 uppercase">MR. ARYAN SAINI</strong>
                  <span className="text-[10px] text-slate-500 block">LAB MANAGER & OPERATIONS INCHARGE</span>
                  <span className="text-[9px] text-slate-400 block">SANGAM DIAGNOSTICS</span>
                </div>
              </div>

              {/* Official Report Footer with Real Center Addresses */}
              <div className="mt-8 pt-3 border-t-2 border-slate-900 flex flex-wrap items-center justify-between text-[10px] text-slate-600">
                <div>
                  <strong>Main Branch & Lab:</strong> Gali No. 3, New Chandrawal, Near Kamla Nagar Market, Delhi-7
                </div>
                <div className="font-bold text-slate-900">
                  Tel: 7982348151 / 7982348151 / 9953022493
                </div>
                <div>
                  care.sangamdiagnostic@gmail.com
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Report Portal...</div>}>
      <ReportsContent />
    </Suspense>
  );
}
