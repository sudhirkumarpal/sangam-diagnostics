'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Percent, Sparkles, Copy, Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { INITIAL_COUPONS } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function OffersPage() {
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [applyResult, setApplyResult] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleQuickApply = async (code: string) => {
    const res = await applyCoupon(code);
    setApplyResult(res.message);
    setTimeout(() => setApplyResult(null), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Verified Promotional Offers
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Special Discounts & Health Coupons</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Apply active promotional coupons during checkout to claim guaranteed savings on diagnostic packages and individual tests.
          </p>
        </div>

        {applyResult && (
          <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-2xl border border-emerald-300 text-center">
            {applyResult}
          </div>
        )}

        {/* Flagship Promotional Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#0b3866] via-[#092d52] to-[#00a896] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full uppercase tracking-wider">
                Flagship Package Offer
              </span>
              <h2 className="text-2xl font-black">Basic Health Package @ ₹799 Only</h2>
              <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
                8 core clinical profiles (CBC, ESR, Sugar Fasting, KFT Extended, LFT, Lipid, Thyroid, Urine RM) with complimentary home collection.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/packages/basic-health-package"
                className="flex-1 py-3 bg-white text-[#0b3866] font-extrabold text-xs sm:text-sm rounded-xl shadow hover:bg-slate-100 transition-colors text-center"
              >
                Claim ₹799 Package
              </Link>
              <a
                href="tel:8796645850"
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                title="Call Aryan Saini"
              >
                Call Aryan Saini
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-[#0b3866] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-4 border border-emerald-500/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-400 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider">
                  Full Body Special
                </span>
                <span className="text-xs text-emerald-200 font-mono">78+ Parameters</span>
              </div>
              <h2 className="text-2xl font-black">Advanced Health Package @ ₹1,499 Only</h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Complete checkup adding Vitamin D (25-OH), Vitamin B12, Complete Iron Profile, and HbA1c to all vital profiles. Save ₹2,500.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/packages/advanced-health-package"
                className="flex-1 py-3 bg-white text-emerald-900 font-black text-xs sm:text-sm rounded-xl shadow hover:bg-emerald-50 transition-colors text-center"
              >
                Claim ₹1,499 Package
              </Link>
              <a
                href="tel:8796645850"
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                title="Call Aryan Saini"
              >
                Call Aryan Saini
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Banners: Cardiac & Hair Treatment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-rose-900 via-red-950 to-slate-900 text-white p-7 rounded-3xl shadow-lg flex flex-col justify-between space-y-4 border border-rose-500/30">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-rose-400 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider">
                Heart Wellness
              </span>
              <h3 className="text-xl font-black">Cardiac Health Profile @ ₹1,299 Only</h3>
              <p className="text-xs text-rose-100 leading-relaxed">
                Lipid Profile, hs-CRP, Homocysteine, Fasting Sugar &amp; HbA1c, SGOT/AST, KFT &amp; eGFR, Electrolytes. MRP ₹3,200.
              </p>
            </div>
            <Link
              href="/packages/cardiac-health-profile"
              className="py-2.5 bg-white text-rose-950 font-extrabold text-xs rounded-xl text-center hover:bg-rose-50 transition-colors"
            >
              Book Cardiac Profile (₹1,299)
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-7 rounded-3xl shadow-lg flex flex-col justify-between space-y-4 border border-purple-500/30">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-purple-400 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider">
                Trichology Special
              </span>
              <h3 className="text-xl font-black">Hair Treatment Screening @ ₹2,499 Only</h3>
              <p className="text-xs text-purple-100 leading-relaxed">
                Men&apos;s &amp; Women&apos;s panels with Testosterone, Ferritin, Zinc, Vit D, B12, Iron Profile, Thyroid. 2 Persons: ₹4,500.
              </p>
            </div>
            <Link
              href="/packages/hair-treatment-screening-men"
              className="py-2.5 bg-white text-purple-950 font-extrabold text-xs rounded-xl text-center hover:bg-purple-50 transition-colors"
            >
              Book Hair Treatment (₹2,499)
            </Link>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_COUPONS.map((cp) => (
            <div
              key={cp.code}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-blue-50 text-[#0b3866] px-4 py-1 rounded-bl-2xl text-[10px] font-bold">
                Valid until Dec 2027
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center mb-3">
                  <Percent className="w-5 h-5" />
                </div>

                <div className="font-mono text-xl font-black text-[#0b3866] tracking-wider mb-1">
                  {cp.code}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {cp.description}
                </p>

                <div className="text-[11px] text-slate-400 mt-2">
                  Min Order: ₹{cp.minOrderValue}
                  {cp.maxDiscount && ` | Max Discount: ₹${cp.maxDiscount}`}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => handleCopy(cp.code)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedCode === cp.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleQuickApply(cp.code)}
                  className="px-3 py-2 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
