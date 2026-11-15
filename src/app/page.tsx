'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  MapPin,
  Award,
  ChevronRight,
  Activity,
  HeartPulse,
  Droplet,
  FlaskConical,
  TestTube,
  HelpCircle,
  Truck,
  FileText,
  Percent,
} from 'lucide-react';
import { INITIAL_PACKAGES, INITIAL_TESTS, TEST_CATEGORIES } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { CallbackModal } from '@/components/common/CallbackModal';
import { SearchBar } from '@/components/common/SearchBar';

export default function HomePage() {
  const { addItem, bookNow } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ checked: boolean; serviceable?: boolean; message?: string }>({
    checked: false,
  });
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackPackage, setCallbackPackage] = useState('Basic Health Package ₹999');
  const [activeBrochure, setActiveBrochure] = useState<'basic' | 'advanced' | 'cardiac' | 'hairfall'>('basic');

  // Filter tests and packages based on search query
  const filteredPackages = INITIAL_PACKAGES.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.inclusionsSummary.some((inc) => inc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTests = INITIAL_TESTS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.parameters.some((param) => param.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput.trim()) return;
    setCheckingPincode(true);
    try {
      const res = await fetch('/api/pincodes/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode: pincodeInput.trim() }),
      });
      const data = await res.json();
      setPincodeStatus({
        checked: true,
        serviceable: data.serviceable,
        message: data.message,
      });
    } catch {
      setPincodeStatus({
        checked: true,
        serviceable: false,
        message: 'Could not verify pincode. Please call Aryan Saini at 8796645850.',
      });
    } finally {
      setCheckingPincode(false);
    }
  };

  const openCallbackFor = (pkgName: string) => {
    setCallbackPackage(pkgName);
    setIsCallbackOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION: Prominent Basic Health Package ₹999 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b3866] via-[#092d52] to-[#071d36] text-white py-12 md:py-20 px-4">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a896]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00a896]/20 text-cyan-300 border border-[#00a896]/30">
                <ShieldCheck className="w-4 h-4 text-[#00a896]" />
                NABL Certified Lab (MC-7078)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Special Inaugural Price
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Stay Healthy, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300">
                  Stay Ahead.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-blue-100 max-w-xl font-normal leading-relaxed">
                Accurate, clear and reliable pathology testing from Delhi NCR&apos;s trusted medical partner. Certified automated analysis with free home sample collection.
              </p>
            </div>

            {/* Meditest-style Live Search Bar */}
            <div className="relative max-w-xl">
              <SearchBar
                variant="hero"
                placeholder="Search for Test/Package (e.g. CBC, KFT, Full Body, Cardiac Profile...)"
              />
            </div>

            {/* Free Home Collection Pincode Checker Widget */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-cyan-300" />
                <span className="text-xs font-bold text-white">Check Free Home Collection in Your Area</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 110007, 201310)"
                  className="flex-1 px-3 py-2 bg-white/20 text-white placeholder-blue-200 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-300"
                />
                <button
                  type="submit"
                  disabled={checkingPincode}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  {checkingPincode ? 'Checking...' : 'Check'}
                </button>
              </form>
              {pincodeStatus.checked && (
                <div
                  className={`mt-2.5 p-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    pincodeStatus.serviceable
                      ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/40'
                      : 'bg-red-950/80 text-red-200 border border-red-500/40'
                  }`}
                >
                  {pincodeStatus.serviceable ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span>{pincodeStatus.message}</span>
                </div>
              )}
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/prescription-upload"
                className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 border border-cyan-400/30"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Upload Prescription & Get Price</span>
              </Link>
              <Link
                href="/booking"
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-[#00a896] hover:from-emerald-600 hover:to-[#008f80] text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Test</span>
              </Link>
              <button
                onClick={() => openCallbackFor('Basic Health Package ₹999')}
                className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-300" />
                <span>Callback</span>
              </button>
            </div>
          </div>

          {/* Hero Right: Basic Health Package ₹999 Featured Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 shadow-2xl text-slate-800 border-4 border-cyan-400/30 relative">
              {/* Highlight ribbon */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white text-[11px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md">
                Offer Price: ₹999 Only
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-bold text-[#00a896] tracking-wider uppercase">
                  Flagship Health Screen
                </span>
                <h3 className="text-2xl font-black text-[#0b3866] mt-0.5">Basic Health Package</h3>
                <p className="text-xs text-slate-500 font-medium">STAY HEALTHY, STAY AHEAD</p>
              </div>

              {/* Price Banner */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Special Introductory Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0b3866]">₹999</span>
                    <span className="text-sm line-through text-slate-400">₹2,499</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Save ₹1,500 (60% OFF)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#00a896] block">60+ Parameters</span>
                  <span className="text-[10px] text-slate-500">Free Home Collection</span>
                </div>
              </div>

              {/* Nine Test Items Checklist from Poster */}
              <div className="mb-5">
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>9 Core Included Profiles:</span>
                  <span className="text-[10px] text-[#00a896] font-bold">12-14 Hr Reports</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    '1. Lipid Profile (Cholesterol & HDL)',
                    '2. CBC & ESR (24 parameters)',
                    '3. LFT (Liver Function Test)',
                    '4. KFT (Kidney Function Test)',
                    '5. Thyroid Profile (T3, T4, TSH)',
                    '6. eGFR Level (Renal Filtration)',
                    '7. Sugar Fasting (Blood Glucose)',
                    '8. Urine Routine & Microscopy',
                    '9. S. Calcium (Bone Health)',
                  ].map((testName, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-700 bg-slate-50 p-1.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] font-medium leading-tight">{testName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    bookNow({
                      type: 'package',
                      id: 'pkg-basic-health',
                      slug: 'basic-health-package',
                      name: 'Basic Health Package',
                      price: 999,
                    })
                  }
                  className="w-full py-3 bg-[#0b3866] hover:bg-[#082848] text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now at ₹999</span>
                </button>

                <div className="flex gap-2">
                  <Link
                    href="/packages/basic-health-package"
                    className="flex-1 py-2 text-center text-xs font-bold text-[#0b3866] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    View Full Inclusions
                  </Link>
                  <button
                    onClick={() => openCallbackFor('Basic Health Package ₹999')}
                    className="flex-1 py-2 text-center text-xs font-bold text-[#00a896] border border-[#00a896]/30 hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    Consult Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI PRESCRIPTION UPLOAD PROMINENT CALLOUT BANNER */}
      <section className="bg-gradient-to-r from-teal-900 via-[#0b3866] to-[#071d36] text-white py-6 px-4 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-400/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 text-cyan-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-cyan-300 uppercase">
                AI Prescription Recognition
              </span>
              <h3 className="text-base sm:text-lg font-black">
                Have a Doctor&apos;s Prescription Slip?
              </h3>
              <p className="text-xs text-blue-100">
                Upload your prescription to identify tests, calculate prices and book home collection with one click.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/prescription-upload"
              className="w-full md:w-auto px-6 py-3 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Upload Prescription & Get Price</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED VALUE PROPOSITIONS */}
      <section className="bg-white py-8 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b3866] flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">NABL Quality Assured</h4>
              <p className="text-xs text-slate-500 mt-0.5">Accreditation Cert. No. MC-7078</p>
            </div>

            <div className="p-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Free Home Collection</h4>
              <p className="text-xs text-slate-500 mt-0.5">Certified phlebotomists at your doorstep</p>
            </div>

            <div className="p-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">12–14 Hours Turnaround</h4>
              <p className="text-xs text-slate-500 mt-0.5">Fast digital report delivery</p>
            </div>

            <div className="p-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Certified MD Pathologists</h4>
              <p className="text-xs text-slate-500 mt-0.5">Every report clinically verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED HEALTH PACKAGES SECTION */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
                Preventive Health Checkups
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866] mt-1">
                Popular Diagnostic Packages
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Curated by senior pathologists for regular organ monitoring, disease prevention, and wellness tracking.
              </p>
            </div>
            <Link
              href="/packages"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b3866] hover:text-[#00a896] transition-colors"
            >
              <span>Explore All Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Poster or visual header */}
                  <div className="relative h-44 bg-gradient-to-br from-blue-900 to-slate-900 overflow-hidden">
                    {pkg.posterImage ? (
                      <Image
                        src={pkg.posterImage}
                        alt={pkg.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center">
                        <Activity className="w-12 h-12 text-cyan-300 opacity-60" />
                      </div>
                    )}
                    {pkg.tag && (
                      <span className="absolute top-3 left-3 bg-[#0b3866] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                        {pkg.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>{pkg.parametersCount} Parameters</span>
                      <span className="font-semibold text-emerald-600">Free Home Visit</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0b3866] transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {pkg.subtitle}
                    </p>

                    {/* Inclusions summary list */}
                    <div className="mt-4 space-y-1.5">
                      {pkg.inclusionsSummary.slice(0, 4).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00a896] flex-shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                      {pkg.inclusionsSummary.length > 4 && (
                        <div className="text-[11px] text-slate-400 font-medium pl-5">
                          + {pkg.inclusionsSummary.length - 4} more test profiles
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-4">
                  <div className="flex items-baseline justify-between py-3">
                    <div>
                      <span className="text-xs line-through text-slate-400 mr-2">₹{pkg.originalPrice}</span>
                      <span className="text-2xl font-black text-[#0b3866]">₹{pkg.offerPrice}</span>
                    </div>
                    {pkg.couplePrice && (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Couple: ₹{pkg.couplePrice}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        bookNow({
                          type: 'package',
                          id: pkg.id,
                          slug: pkg.slug,
                          name: pkg.name,
                          price: pkg.offerPrice,
                        })
                      }
                      className="py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3B. OFFICIAL CAMPAIGN BROCHURES & SPECIAL PACKAGES SHOWCASE */}
      <section className="py-16 px-4 bg-gradient-to-b from-white via-blue-50/30 to-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#0b3866] text-cyan-300 uppercase tracking-wider">
              Verified Health Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b3866] mt-2">
              Featured Diagnostic Packages & Special Offers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Explore transparent profiles, comprehensive parameters, and verified package pricing. Free Home Sample Collection across Greater Noida, Delhi & NCR.
            </p>
          </div>

          {/* Interactive Package Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-4xl mx-auto">
            {[
              { id: 'basic', label: 'Basic Health Package (₹999)', badge: 'Bestseller' },
              { id: 'advanced', label: 'Platinum Health Package (₹1,499)', badge: 'Full Body' },
              { id: 'cardiac', label: 'Cardiac Health Profile (₹2,499)', badge: 'Heart Care' },
              { id: 'hairfall', label: 'Hair Treatment Screening (₹2,499)', badge: 'Men & Women' },
            ].map((tab) => {
              const active = activeBrochure === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBrochure(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-[#0b3866] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      active ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-slate-300/80 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Package Showcase Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* TAB 1: BASIC HEALTH PACKAGE (₹999) */}
            {activeBrochure === 'basic' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                    <Image
                      src="/images/basic-health-package-official.jpg"
                      alt="Basic Health Package ₹999 Official Brochure - Sangam Diagnostics"
                      width={600}
                      height={850}
                      className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 text-xs text-cyan-200 font-mono">
                    Paramount Golf Forest, Greater Noida | 8796645850
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-[#0b3866] text-xs font-bold rounded-full uppercase">
                      Essential Preventive Care
                    </span>
                    <h3 className="text-3xl font-black text-[#0b3866] mt-2 leading-tight">
                      Basic Health Package @ ₹999 Only
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Complete basic preventive health checkup covering 9 core clinical profiles (62 parameters) with Free Home Sample Collection.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0b3866] uppercase">Single Person</span>
                        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">62 Parameters</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#0b3866]">₹999</span>
                        <span className="text-xs line-through text-slate-400">₹2,499</span>
                        <span className="text-xs font-bold text-emerald-600">Save ₹1,500</span>
                      </div>
                      <p className="text-[11px] text-slate-600">Lipid, CBC & ESR, LFT, KFT, Thyroid, eGFR, Fasting Sugar, Urine RM, S. Calcium.</p>
                      <button
                        onClick={() => bookNow({ type: 'package', id: 'pkg-basic-health', slug: 'basic-health-package', name: 'Basic Health Package', price: 999 })}
                        className="w-full py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl transition-colors mt-2"
                      >
                        Book Single (₹999)
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-950 uppercase">Couple / 2 Persons</span>
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Double Saver</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-emerald-800">₹1,499</span>
                        <span className="text-xs line-through text-slate-400">₹4,798</span>
                        <span className="text-xs font-bold text-emerald-600">Save ₹3,299</span>
                      </div>
                      <p className="text-[11px] text-slate-600">Full 8-profile testing for two family members or couple.</p>
                      <button
                        onClick={() => bookNow({ type: 'package', id: 'pkg-basic-health', slug: 'basic-health-package', name: 'Basic Health Package (2 Persons)', price: 1499 })}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors mt-2"
                      >
                        Book for 2 (₹1,499)
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="tel:8796645850"
                      className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shadow"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Aryan Saini (8796645850)</span>
                    </a>
                    <Link
                      href="/packages/basic-health-package"
                      className="py-3 px-5 border border-slate-300 hover:border-[#0b3866] text-slate-700 hover:text-[#0b3866] font-bold text-xs sm:text-sm rounded-xl transition-colors"
                    >
                      View Package Details
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ADVANCED HEALTH PACKAGE (₹1,499) */}
            {activeBrochure === 'advanced' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                    <Image
                      src="/images/platinum-advanced-health-package-official.jpg"
                      alt="Advanced Health Package ₹1499 - Sangam Diagnostics"
                      width={600}
                      height={850}
                      className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 text-xs text-emerald-200 font-mono">
                    Paramount Golf Forest, Greater Noida | 8796645850
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
                      Most Comprehensive 78+ Parameters
                    </span>
                    <h3 className="text-3xl font-black text-[#0b3866] mt-2 leading-tight">
                      Platinum Health Package (Advanced) @ ₹1,499 Only
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Our flagship preventive checkup covering 13 major clinical profiles and 88 parameters from our official brochure. Includes Heart, Liver, Kidney, Thyroid, HbA1c, Vitamin D3, B12, Calcium & deep Iron Profile.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      'Vitamin D (25-OH)',
                      'Vitamin B12',
                      'Complete Iron Profile',
                      'HbA1c (3-Month Sugar)',
                      'Lipid Profile (Heart)',
                      'Liver Function (LFT)',
                      'Kidney Function (KFT)',
                      'Thyroid Profile (T3, T4, TSH)',
                      'CBC & ESR (24 params)',
                      'Urine Routine & Microscopy',
                    ].map((item) => (
                      <div key={item} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 text-center">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-900 font-bold block">Flat Promotional Offer (MRP ₹3,999)</span>
                      <span className="text-[11px] text-emerald-700">Save ₹2,500 • Free Home Collection</span>
                    </div>
                    <span className="text-3xl font-black text-emerald-800">₹1,499</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => bookNow({ type: 'package', id: 'pkg-advanced-health', slug: 'advanced-health-package', name: 'Advanced Health Package', price: 1499 })}
                      className="py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow"
                    >
                      Book Advanced Package (₹1,499)
                    </button>
                    <a
                      href="tel:8796645850"
                      className="py-3 px-5 bg-[#0b3866] hover:bg-[#082848] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shadow"
                    >
                      <Phone className="w-4 h-4 text-cyan-300" />
                      <span>Call Aryan Saini (8796645850)</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CARDIAC HEALTH PROFILE (₹2,499) */}
            {activeBrochure === 'cardiac' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                    <Image
                      src="/images/cardiac-health-profile-official.jpg"
                      alt="Cardiac Health Profile - Sangam Diagnostics"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 text-xs text-rose-200 font-mono">
                    NABL Accredited Heart Care Panel | 8796645850
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-rose-100 text-rose-900 text-xs font-bold rounded-full uppercase">
                      Specialized Cardiovascular Screen
                    </span>
                    <h3 className="text-3xl font-black text-[#0b3866] mt-2 leading-tight">
                      Cardiac Health Profile @ ₹2,499 Special Offer
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      A comprehensive checkup to assess your heart health and detect risks early from our official brochure. Includes high-specificity cardiac injury markers (Troponin-T, CPK-MB, CPK, S LDH, HS-CRP), Apolipoproteins (APO-1, APO-3), Lipid, LFT, KFT, eGFR, S. Calcium, Thyroid, Sugar & Urine.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      'Troponin-T (Heart Attack Marker)',
                      'CPK-MB (Heart Muscle Damage)',
                      'HS-CRP (Arterial Inflammation)',
                      'S LDH (Tissue Damage)',
                      'CPK (General Muscle Enzyme)',
                      'APO-1 & APO-3 (Apolipoproteins)',
                      'Lipid Profile (Cholesterol, HDL, LDL)',
                      'LFT (Metabolic Health)',
                      'KFT & eGFR (Renal Filtration)',
                      'Thyroid Profile (T3, T4, TSH)',
                      'S. Calcium (Heart Rhythm)',
                      'Sugar Fasting & Urine R/M',
                    ].map((item) => (
                      <div key={item} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 text-center">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-rose-900 font-bold block">Special Limited Period Offer (Actual Price Higher)</span>
                      <span className="text-[11px] text-rose-700">Save ₹2,500 • 16 Core Clinical Investigations • Free Home Visit</span>
                    </div>
                    <span className="text-3xl font-black text-rose-700">₹2,499</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => bookNow({ type: 'package', id: 'pkg-cardiac-health', slug: 'cardiac-health-profile', name: 'Cardiac Health Profile', price: 2499 })}
                      className="py-3 px-6 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow"
                    >
                      Book Cardiac Profile (₹2,499)
                    </button>
                    <a
                      href="tel:8796645850"
                      className="py-3 px-5 bg-[#0b3866] hover:bg-[#082848] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shadow"
                    >
                      <Phone className="w-4 h-4 text-cyan-300" />
                      <span>Call Aryan Saini (8796645850)</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: HAIR TREATMENT SCREENING (₹2,499) */}
            {activeBrochure === 'hairfall' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                    <Image
                      src="/images/hair-fall-screening-10tests-official.jpg"
                      alt="Hair Treatment Screening Mens and Womens Packages"
                      width={600}
                      height={850}
                      className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 text-xs text-cyan-200 font-mono">
                    Shop No: PF-02, Paramount Golf Forest | 8796645850
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-900 text-xs font-bold rounded-full uppercase">
                      Specialist Trichology Profiles
                    </span>
                    <h3 className="text-3xl font-black text-[#0b3866] mt-2 leading-tight">
                      Hair Treatment Screening Packages
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Identifies deep nutritional, hormonal, and inflammatory causes of alopecia, hair thinning, and shedding in men and women.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-2">
                      <span className="font-black text-xs text-[#0b3866] block">MEN&apos;S PACKAGE</span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-600">Single Person:</span>
                        <span className="text-xl font-black text-[#0b3866]">₹2,499/-</span>
                      </div>
                      <p className="text-[11px] text-slate-500">10 Tests: Testosterone Total, Ferritin, CRP, CBC, Zinc, Vit D, B12, Iron Profile, Thyroid, S. Calcium.</p>
                      <button
                        onClick={() => bookNow({ type: 'package', id: 'pkg-hair-treatment-men', slug: 'hair-treatment-screening-men', name: "Hair Treatment Screening (Men's)", price: 2499 })}
                        className="w-full py-2 bg-[#0b3866] text-white text-xs font-bold rounded-xl mt-1"
                      >
                        Book Men&apos;s (₹2,499)
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/40 space-y-2">
                      <span className="font-black text-xs text-rose-950 block">WOMEN&apos;S PACKAGE</span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-600">Single Person:</span>
                        <span className="text-xl font-black text-rose-800">₹2,499/-</span>
                      </div>
                      <p className="text-[11px] text-slate-500">10 Tests: CBC, Ferritin, Folic Acid (Folate), Testosterone Total, Zinc, Iron Profile, Vit D, B12, Progesterone, Thyroid.</p>
                      <button
                        onClick={() => bookNow({ type: 'package', id: 'pkg-hair-treatment-women', slug: 'hair-treatment-screening-women', name: "Hair Treatment Screening (Women's)", price: 2499 })}
                        className="w-full py-2 bg-rose-700 text-white text-xs font-bold rounded-xl mt-1"
                      >
                        Book Women&apos;s (₹2,499)
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-purple-900 font-bold block">Couple / Two Persons Booking Offer</span>
                      <span className="text-[11px] text-purple-700">Both packages for two persons at only ₹4,500 (Save up to ₹6,700)</span>
                    </div>
                    <span className="text-2xl font-black text-purple-950">₹4,500</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="tel:8796645850"
                      className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shadow"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Aryan Saini (8796645850)</span>
                    </a>
                    <Link
                      href="/packages/hair-treatment-screening-men"
                      className="py-3 px-5 border border-slate-300 hover:border-[#0b3866] text-slate-700 hover:text-[#0b3866] font-bold text-xs sm:text-sm rounded-xl transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. DIAGNOSTIC TEST CATEGORIES */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
              Specialized Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866] mt-1">
              Browse Diagnostic Test Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Automated high-precision equipment covering hematology, biochemistry, immunology, endocrinology, and renal profiles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {TEST_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/tests?category=${cat.slug}`}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#00a896] hover:shadow-md transition-all text-center group bg-slate-50/50 hover:bg-white flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b3866] group-hover:bg-[#00a896] group-hover:text-white transition-colors flex items-center justify-center mb-3">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0b3866] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 mt-1">{cat.testsCount} Tests Available</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR INDIVIDUAL TESTS LIST */}
      <section className="py-14 px-4 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">Individual Pathology Tests</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866] mt-1">Frequently Prescribed Tests</h2>
            </div>
            <Link
              href="/tests"
              className="mt-2 sm:mt-0 text-xs sm:text-sm font-bold text-[#0b3866] hover:text-[#00a896] transition-colors flex items-center gap-1"
            >
              <span>View Full 100+ Tests Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_TESTS.slice(0, 6).map((test) => (
              <div
                key={test.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0b3866] font-semibold">
                      {test.categoryLabel}
                    </span>
                    <span className="text-slate-400">{test.reportDeliveryHours}h turnaround</span>
                  </div>

                  <Link href={`/tests/${test.slug}`} className="block group">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0b3866] transition-colors">
                      {test.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{test.description}</p>
                  </Link>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      Sample: {test.sampleType}
                    </span>
                    {test.fastingRequired && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                        Fasting Required ({test.fastingHours}h)
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {test.discountedPrice && (
                      <span className="text-xs line-through text-slate-400 mr-1.5">₹{test.price}</span>
                    )}
                    <span className="text-lg font-black text-[#0b3866]">
                      ₹{test.discountedPrice || test.price}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        addItem({
                          type: 'test',
                          id: test.id,
                          slug: test.slug,
                          name: test.name,
                          price: test.discountedPrice || test.price,
                        })
                      }
                      className="px-3 py-1.5 text-xs font-semibold text-[#0b3866] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() =>
                        bookNow({
                          type: 'test',
                          id: test.id,
                          slug: test.slug,
                          name: test.name,
                          price: test.discountedPrice || test.price,
                        })
                      }
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#00a896] hover:bg-[#008f80] rounded-lg shadow-sm transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW HOME COLLECTION WORKS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">Seamless Diagnostic Journey</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866] mt-1">How Home Sample Collection Works</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Easy, safe, and hygienic blood draw at your home or office in 4 steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#0b3866] text-white font-black text-xs flex items-center justify-center">
                1
              </span>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0b3866] flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Select Test or Package</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Choose the ₹999 Basic Health Package or specific tests and pick your convenient time slot.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#0b3866] text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Phlebotomist Visit</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Our vaccinated, certified collector visits with sealed vacutainers and maintains strict hygiene.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#0b3866] text-white font-black text-xs flex items-center justify-center">
                3
              </span>
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">NABL Central Lab Analysis</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Samples transported in cold-chain containers and processed on fully automated analyzers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#0b3866] text-white font-black text-xs flex items-center justify-center">
                4
              </span>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Digital Report in 12–14h</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Verified report delivered via SMS, WhatsApp, and accessible 24/7 on our online portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED DOCTOR & PATHOLOGIST TEAM */}
      <section className="py-14 px-4 bg-gradient-to-r from-slate-900 to-[#0b3866] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Certified Medical Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">Our Authorised Pathologists & Scientists</h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Every Sangam Diagnostics test report is reviewed, validated, and signed by licensed medical specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto mb-3 font-black text-2xl">
                AG
              </div>
              <h4 className="font-bold text-lg text-white">Dr. Anil Gupta</h4>
              <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mt-0.5">Senior Consultant Pathologist</p>
              <div className="text-xs text-slate-300 mt-3 space-y-1">
                <div className="font-semibold text-white">M.B.B.S., M.D. (Pathology)</div>
                <div className="font-mono text-emerald-200 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg inline-block">
                  Regd. No. 5015
                </div>
                <p className="text-[11px] text-slate-300 pt-1">
                  Over 25+ years of clinical pathology oversight, diagnostic cytology, and quality assurance.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-20 h-20 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center mx-auto mb-3 font-black text-2xl">
                AS
              </div>
              <h4 className="font-bold text-lg text-white">Mr. Aryan Saini</h4>
              <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider mt-0.5">Lab Manager & Operations Head</p>
              <div className="text-xs text-slate-300 mt-3 space-y-1">
                <div className="font-semibold text-white">Center Administration & Phlebotomy Fleet</div>
                <div className="font-mono text-cyan-200 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg inline-block">
                  Direct Line: 8796645850
                </div>
                <p className="text-[11px] text-slate-300 pt-1">
                  Leads day-to-day laboratory operations, free home collection coordination, cold-chain transport, and patient quality care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">Common Inquiries</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866] mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is included in the ₹999 Basic Health Package?',
                a: 'The Basic Health Package includes 9 core diagnostic profiles: Lipid Profile (Cholesterol, HDL, LDL, Triglycerides), Complete Blood Count (CBC) with ESR, Liver Function Test (LFT), Kidney Function Test (KFT), Thyroid Profile (T3, T4, TSH), eGFR Level, Sugar Fasting, Urine Routine, and Serum Calcium.',
              },
              {
                q: 'Is home sample collection really free?',
                a: 'Yes, home sample collection is completely free for orders of ₹500 and above across our serviceable areas in Delhi and Greater Noida NCR. Our certified phlebotomists follow strict sterile protocols.',
              },
              {
                q: 'How long will it take to get my diagnostic report?',
                a: 'Standard routine tests and packages like the Basic Health Package (₹999) are reported within 12 to 14 hours. Reports are delivered as authenticated digital PDFs via SMS, WhatsApp, and our patient portal.',
              },
              {
                q: 'Do I need to fast before my sample collection?',
                a: 'For packages including Lipid Profile, Fasting Sugar, LFT, or KFT, an overnight fasting period of 10 to 12 hours is recommended. Plain drinking water is permitted.',
              },
              {
                q: 'How can I download my official test report?',
                a: 'Click on "Download Report" in the top navigation, enter your Booking Reference (e.g. SD-2026-8941) and registered mobile number, and download your doctor-signed NABL accredited PDF report immediately.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-[#0b3866] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#00a896] flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CALLBACK CALL-OUT SECTION */}
      <section className="bg-gradient-to-r from-[#0b3866] to-[#00a896] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">Need assistance selecting a test?</h3>
            <p className="text-xs sm:text-sm text-cyan-100 mt-1">
              Speak directly with Lab Manager Mr. Aryan Saini at <strong className="text-white">+91 8796645850</strong> or <strong className="text-white">+91 7982348151</strong>.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => openCallbackFor('General Diagnostic Advice')}
              className="px-5 py-3 bg-white text-[#0b3866] font-bold text-xs rounded-xl shadow hover:bg-slate-100 transition-colors"
            >
              Request Free Callback
            </button>
            <a
              href="tel:8796645850"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Aryan Saini</span>
            </a>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        defaultPackageName={callbackPackage}
      />
    </div>
  );
}
