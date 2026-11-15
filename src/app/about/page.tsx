import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, HeartPulse, CheckCircle2, Clock, Users, ArrowRight, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            About Sangam Diagnostics
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0b3866]">
            Accuracy | Clarity | Reliable Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sangam Diagnostics is a trusted pathology testing facility and home collection provider operating in Delhi NCR. With certified NABL quality controls (Certificate MC-7078), fully automated clinical analyzers, and expert medical validation, we deliver accurate diagnostics you can rely on.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b3866] flex items-center justify-center font-bold">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0b3866]">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To deliver accurate, prompt, and transparent diagnostic services to patients and clinicians, enabling timely clinical intervention and preventive health monitoring at fair and affordable prices.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0b3866]">Quality Commitment</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every sample undergoes internal quality audits, barcoded specimen tracking, and calibration against international reference materials. Final reports are reviewed and authenticated by registered MD Pathologists.
            </p>
          </div>
        </div>

        {/* Certified Medical Pathologists */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
              Diagnostic & Operational Leadership
            </span>
            <h2 className="text-2xl font-black text-[#0b3866] mt-1">Our Leadership & Medical Direction</h2>
            <p className="text-xs text-slate-500 mt-1">
              Qualified medical leadership and operations management ensuring diagnostic excellence on every specimen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-black text-2xl">
                AG
              </div>
              <h4 className="font-bold text-lg text-slate-900">Dr. Anil Gupta</h4>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Senior Consultant Pathologist</p>
              <div className="text-xs text-slate-500 pt-1 space-y-1">
                <div className="font-semibold text-slate-700">M.B.B.S., M.D. (Pathology)</div>
                <div className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                  Regd. No. 5015
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Over 25+ years of clinical pathology oversight, diagnostic cytology, and haematology certification.
                </p>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-[#0b3866] flex items-center justify-center mx-auto font-black text-2xl">
                AS
              </div>
              <h4 className="font-bold text-lg text-slate-900">Mr. Aryan Saini</h4>
              <p className="text-xs font-bold text-[#00a896] uppercase tracking-wider">Lab Manager & Operations Head</p>
              <div className="text-xs text-slate-500 pt-1 space-y-1">
                <div className="font-semibold text-slate-700">Laboratory Operations & Administration</div>
                <div className="font-mono text-[#0b3866] font-bold bg-blue-50 px-2.5 py-1 rounded-lg inline-block border border-blue-200">
                  Direct Line: 8796645850
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Leads day-to-day laboratory operations, free home collection coordination, cold-chain transport, and patient quality care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Laboratory Centres */}
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Service Centres
            </span>
            <h2 className="text-2xl font-black mt-1">Our Diagnostic Locations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-6 bg-white/10 rounded-2xl border border-white/10 space-y-2">
              <strong className="text-cyan-300 text-base block">1. Central Pathology Laboratory (Main Branch)</strong>
              <p className="text-slate-300">
                Gali No. 3, New Chandrawal, Near Kamla Nagar Market, Delhi - 110007
              </p>
              <div className="pt-2 text-slate-400">
                Contact: <strong className="text-white">7982348151 / 9953022493</strong>
              </div>
            </div>

            <div className="p-6 bg-white/10 rounded-2xl border border-white/10 space-y-2">
              <strong className="text-emerald-300 text-base block">2. Greater Noida Collection Centre & Camp Hub</strong>
              <p className="text-slate-300">
                Shop No: 02, Paramount Golf Forest, Greater Noida, Uttar Pradesh
              </p>
              <div className="pt-2 text-slate-300">
                Centre Incharge: <strong className="text-white">Aryan Saini</strong> (Free Home Collection: <strong className="text-emerald-300">8796645850</strong>)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
