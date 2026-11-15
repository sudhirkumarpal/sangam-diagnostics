import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award, FileCheck, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#071d36] text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-[#00a896]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">NABL Accredited Lab</h4>
              <p className="text-xs text-slate-400 mt-0.5">Certificate No. MC-7078 with stringent quality standards.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Certified Pathologists</h4>
              <p className="text-xs text-slate-400 mt-0.5">Validated by MD Pathologists & PhD Biochemists.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">12–14 Hr Report Turnaround</h4>
              <p className="text-xs text-slate-400 mt-0.5">Fast, accurate online reports with instant WhatsApp notification.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Free Home Collection</h4>
              <p className="text-xs text-slate-400 mt-0.5">Trained phlebotomists servicing Delhi NCR at zero home visit fee.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Col 1: About & Logo */}
          <div className="space-y-4">
            <Logo variant="white" size="md" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Sangam Diagnostics is dedicated to diagnostic accuracy, clarity, and dependable test reporting. Operating certified central pathology processing in Delhi with home collection across Delhi NCR.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-semibold">
                NABL Cert. No: MC-7078
              </span>
            </div>
            <div className="text-xs text-slate-400 pt-1 space-y-0.5">
              <div>
                <span className="font-medium text-slate-200">Lab Manager:</span> Mr. Aryan Saini
              </div>
              <div>
                <span className="font-medium text-slate-200">Pathologist:</span> Dr. Anil Gupta (M.D. Path, Regd. 5015)
              </div>
            </div>
          </div>

          {/* Col 2: Popular Health Packages */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-4">
              Featured Health Packages
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/packages/basic-health-package"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#00a896]" />
                  <span>Basic Health Package (₹799 Only)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/advanced-health-package"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#00a896]" />
                  <span>Advanced Health Package (₹1,499)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/cardiac-health-profile"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#00a896]" />
                  <span>Cardiac Health Profile (₹1,299)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/hair-treatment-screening-men"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#00a896]" />
                  <span>Hair Treatment Screening — Men (₹2,499)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/hair-treatment-screening-women"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#00a896]" />
                  <span>Hair Treatment Screening — Women (₹2,499)</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-cyan-400 font-semibold pt-1">
                  <ArrowRight className="w-3 h-3" />
                  <span>View All Health Packages</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Diagnostic Tests & Portal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-4">
              Diagnostic Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/tests/cbc-and-esr" className="hover:text-cyan-300 transition-colors">
                  Complete Blood Count (CBC) with ESR
                </Link>
              </li>
              <li>
                <Link href="/tests/lipid-profile" className="hover:text-cyan-300 transition-colors">
                  Lipid Profile (Cholesterol & Triglycerides)
                </Link>
              </li>
              <li>
                <Link href="/tests/liver-function-test-lft" className="hover:text-cyan-300 transition-colors">
                  Liver Function Test (LFT)
                </Link>
              </li>
              <li>
                <Link href="/tests/kidney-function-test-kft-egfr" className="hover:text-cyan-300 transition-colors">
                  Kidney Function Test (KFT with eGFR)
                </Link>
              </li>
              <li>
                <Link href="/tests/thyroid-profile-total" className="hover:text-cyan-300 transition-colors">
                  Thyroid Profile (T3, T4, TSH)
                </Link>
              </li>
              <li>
                <Link href="/tests/hba1c-glycated-hemoglobin" className="hover:text-cyan-300 transition-colors">
                  HbA1c Glycated Hemoglobin (Diabetes)
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-cyan-300 font-bold text-amber-300 transition-colors">
                  Download Patient Test Report
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-cyan-300 font-semibold text-emerald-300 transition-colors">
                  Live Booking & Sample Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Branches */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-4">
              Verified Centres & Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00a896] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Main Branch & Lab:</strong>
                  <p className="text-slate-400 mt-0.5">Gali No. 3, New Chandrawal, Near Kamla Nagar Market, Delhi - 110007</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Greater Noida Centre:</strong>
                  <p className="text-slate-300 mt-0.5">PF - 02 (Shop No. 2), Paramount Golf Forest Main Market, Zeta 1, Greater Noida, UP - 201308</p>
                  <p className="text-emerald-400 text-[11px] font-semibold mt-0.5">Incharge: Aryan Saini — Free Home Collection</p>
                </div>
              </li>

              <li className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="space-x-2 flex flex-wrap text-xs">
                  <a href="tel:8796645850" className="font-bold text-emerald-300 hover:text-white" title="Aryan Saini - Greater Noida Collection">
                    Gr. Noida: 8796645850
                  </a>
                  <span className="text-slate-500">|</span>
                  <a href="tel:7982348151" className="font-bold text-white hover:text-cyan-300" title="Delhi Central Lab Helpline">
                    Delhi: 7982348151
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:care.sangamdiagnostic@gmail.com" className="hover:text-cyan-300 text-slate-300 break-all">
                  care.sangamdiagnostic@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Medical Disclaimer */}
        <div className="border-t border-slate-800/80 pt-8 pb-4 text-[11px] text-slate-400 leading-relaxed">
          <p className="mb-3">
            <strong className="text-slate-300">Clinical Notice & Disclaimer:</strong> Laboratory test results, health checks, and parameter findings provided by Sangam Diagnostics are intended for clinical correlation and patient guidance. Diagnostic values must always be evaluated in conjunction with personal medical history and evaluated by a licensed healthcare physician. Sangam Diagnostics does not prescribe treatment or generate automated medical diagnoses.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-slate-400">
            <div>
              &copy; 2026 Sangam Diagnostics. All rights reserved. Accuracy | Clarity | Reliable Results.
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/privacy-policy" className="hover:text-slate-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-200">
                Terms of Service
              </Link>
              <Link href="/refund-cancellation" className="hover:text-slate-200">
                Refund & Cancellation
              </Link>
              <Link href="/sample-collection" className="hover:text-slate-200">
                Sample Collection Guidelines
              </Link>
              <Link href="/faq" className="hover:text-slate-200">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
