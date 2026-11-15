'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Phone,
  Truck,
  FlaskConical,
  Award,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  MessageCircle,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Info,
  Droplet,
  Heart,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Package } from '@/types';
import { INITIAL_PACKAGES } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { CallbackModal } from '@/components/common/CallbackModal';

interface PackageDetailClientProps {
  pkg: Package;
}

export function PackageDetailClient({ pkg }: PackageDetailClientProps) {
  const { bookNow, addItem } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'preparation' | 'faqs'>('description');
  const [personOption, setPersonOption] = useState<'single' | 'couple'>('single');
  const [quantity, setQuantity] = useState<number>(1);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Accordion open/close state for all included tests
  const [openPanels, setOpenPanels] = useState<Record<number, boolean>>(() => {
    // Open the first 3 panels by default
    const initial: Record<number, boolean> = {};
    pkg.includedTests.forEach((_, i) => {
      initial[i] = i < 3;
    });
    return initial;
  });

  const togglePanel = (index: number) => {
    setOpenPanels((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {};
    pkg.includedTests.forEach((_, i) => {
      allOpen[i] = true;
    });
    setOpenPanels(allOpen);
  };

  const collapseAll = () => {
    setOpenPanels({});
  };

  const isCouple = personOption === 'couple' && !!pkg.couplePrice;
  const currentPrice = isCouple ? pkg.couplePrice! : pkg.offerPrice;
  const currentSavings = isCouple ? pkg.originalPrice * 2 - pkg.couplePrice! : pkg.savings;
  const discountPercent = Math.round((currentSavings / (isCouple ? pkg.originalPrice * 2 : pkg.originalPrice)) * 100);

  const handleBookNow = () => {
    bookNow({
      type: 'package',
      id: pkg.id,
      slug: pkg.slug,
      name: isCouple ? `${pkg.name} (Couple Option)` : pkg.name,
      price: currentPrice * quantity,
      coupleOption: isCouple,
    });
  };

  const handleAddToCart = () => {
    addItem({
      type: 'package',
      id: pkg.id,
      slug: pkg.slug,
      name: isCouple ? `${pkg.name} (Couple Option)` : pkg.name,
      price: currentPrice * quantity,
      coupleOption: isCouple,
    });
  };

  // WhatsApp click handler
  const whatsappUrl = `https://wa.me/918796645850?text=${encodeURIComponent(
    `Hello Sangam Diagnostics, I would like to book the ${pkg.name} (${pkg.parametersCount} Tests) for Rs. ${currentPrice} at my location.`
  )}`;

  // Related packages (Meditest "You may also like..." section)
  const relatedPackages = INITIAL_PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation (Meditest pattern) */}
        <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-[#0b3866] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-[#0b3866] transition-colors">
            Health Packages
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">
            {pkg.name} @ {pkg.parametersCount} Tests
          </span>
        </nav>

        {/* 1. MAIN PRODUCT SECTION (Meditest 2-Column Gallery + Summary Layout) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* LEFT COLUMN: Poster & Diagnostic Accreditation (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col items-center justify-between text-white relative">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NABL MC-7078
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">100% Automated Lab</span>
              </div>

              {/* Poster Card */}
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
                {pkg.posterImage ? (
                  <Image
                    src={pkg.posterImage}
                    alt={`${pkg.name} Official Brochure`}
                    width={500}
                    height={750}
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                    priority
                  />
                ) : (
                  <div className="w-full h-96 flex flex-col items-center justify-center p-6 text-center">
                    <FlaskConical className="w-16 h-16 text-cyan-300 mb-3" />
                    <span className="font-bold text-sm">{pkg.name}</span>
                    <span className="text-xs text-slate-400">{pkg.parametersCount} Tests</span>
                  </div>
                )}
              </div>

              {/* Lab Manager Direct Tagline */}
              <div className="mt-6 w-full text-center space-y-1">
                <div className="text-xs text-cyan-200 font-mono">
                  Paramount Golf Forest, Greater Noida | Del: 7982348151
                </div>
                <div className="text-[11px] text-slate-400">
                  Operations &amp; Phlebotomy Fleet Managed by <strong>Mr. Aryan Saini</strong> (8796645850)
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Details Summary (7 cols - Meditest entry-summary) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              {/* Product Title */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#0b3866] text-white">
                    {pkg.tag || 'Special Offer'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-50 text-[#00a896] border border-teal-200">
                    {pkg.parametersCount} Tests Included
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3866] leading-tight">
                  {pkg.name} @ {pkg.parametersCount} Tests
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                  {pkg.subtitle}
                </p>
              </div>

              {/* Short Description (Meditest layout lead paragraph) */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p>
                  This Package Includes Screening of Major Organ Systems:{' '}
                  <strong>{pkg.inclusionsSummary.join(', ')}</strong>.
                </p>
                <p className="mt-1.5 font-black text-[#0b3866]">
                  Parameters Included: {pkg.parametersCount} Clinical Tests
                </p>
              </div>

              {/* Meditest Key Feature Highlights Grid (.iconcontainer) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 font-bold">
                    🩸
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Test Type</span>
                    <span className="font-bold text-slate-800">{pkg.sampleType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
                    ⏳
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Fasting Requirement</span>
                    <span className="font-bold text-slate-800">
                      {pkg.fastingRequired ? `${pkg.fastingHours || 10} to 12 hrs Fasting` : 'No Fasting Required'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
                    🕒
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Reporting Time</span>
                    <span className="font-bold text-slate-800">Same Day ({pkg.reportDeliveryHours}h / By 9 PM)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                    🏠
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Home Collection</span>
                    <span className="font-bold text-emerald-700">100% Free Doorstep Pickup</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 font-bold">
                    💉
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Sampling Policy</span>
                    <span className="font-bold text-slate-800">One-Prick Safe Collection</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 font-bold">
                    🩺
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Medical Guidance</span>
                    <span className="font-bold text-slate-800">Free Doctor Review &amp; Advice</span>
                  </div>
                </div>
              </div>

              {/* Person Option Toggle (Single vs Couple if available) */}
              {pkg.couplePrice && (
                <div className="p-3 bg-slate-100 rounded-2xl flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPersonOption('single')}
                    className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                      personOption === 'single'
                        ? 'bg-white text-[#0b3866] shadow-md border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Single Person (₹{pkg.offerPrice})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPersonOption('couple')}
                    className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                      personOption === 'couple'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>2 Persons / Couple (₹{pkg.couplePrice})</span>
                    <span className="px-1.5 py-0.2 text-[9px] bg-amber-400 text-slate-950 font-black rounded-full">
                      SAVE MORE
                    </span>
                  </button>
                </div>
              )}

              {/* Pricing Block (.price) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-cyan-50/50 to-emerald-50/70 border border-blue-200/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {isCouple ? 'Couple / 2 Persons Rate' : 'Offer Price'}
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#0b3866]">
                      ₹{currentPrice}.00
                    </span>
                    <span className="text-sm sm:text-base line-through text-slate-400">
                      ₹{isCouple ? pkg.originalPrice * 2 : pkg.originalPrice}.00
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Save ₹{currentSavings} ({discountPercent}% OFF)
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-xs font-bold text-[#00a896] block">✓ Honest Pricing</span>
                  <span className="text-[11px] text-slate-500">Zero Hidden Charges</span>
                </div>
              </div>

              {/* Quantity Selector & Booking Actions (.cart) */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white px-2 py-1 text-xs">
                    <span className="text-slate-500 font-semibold mr-2">Qty:</span>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="bg-transparent font-bold text-slate-800 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Primary Book Now Button */}
                  <button
                    onClick={handleBookNow}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#0b3866] to-[#00a896] hover:from-[#082848] hover:to-[#008f80] text-white font-black text-sm rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Now at ₹{currentPrice * quantity}</span>
                  </button>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="p-3 border-2 border-slate-300 hover:border-[#0b3866] text-[#0b3866] bg-white hover:bg-slate-50 rounded-xl transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                {/* Secondary Actions: WhatsApp & Call Aryan Saini */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book on WhatsApp</span>
                  </a>

                  <a
                    href="tel:8796645850"
                    className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-cyan-200" />
                    <span>Call Aryan Saini (8796645850)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABBED CONTENT SECTION (Meditest woocommerce-tabs Architecture) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'description'
                  ? 'border-[#0b3866] text-[#0b3866] bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-[#00a896]" />
              <span>Description &amp; Parameters ({pkg.parametersCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('additional')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'additional'
                  ? 'border-[#0b3866] text-[#0b3866] bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Info className="w-4 h-4 text-[#00a896]" />
              <span>Additional Information</span>
            </button>

            <button
              onClick={() => setActiveTab('preparation')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'preparation'
                  ? 'border-[#0b3866] text-[#0b3866] bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-4 h-4 text-[#00a896]" />
              <span>Sample Collection &amp; Preparation</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-4 px-6 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'faqs'
                  ? 'border-[#0b3866] text-[#0b3866] bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#00a896]" />
              <span>Benefits &amp; FAQs</span>
            </button>
          </div>

          {/* TAB 1: DESCRIPTION & ACCORDION (Meditest #accordion Pattern) */}
          {activeTab === 'description' && (
            <div className="p-6 sm:p-10 space-y-6">
              {/* Introduction Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0b3866]">
                  {pkg.name} — Comprehensive Test Parameters
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Expand / Collapse Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Organ Screening Profiles ({pkg.includedTests.length} Profiles / {pkg.parametersCount} Tests)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-2.5 py-1 text-xs font-semibold text-[#00a896] hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    Expand All
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Meditest #accordion Panels */}
              <div className="space-y-3" id="accordion">
                {pkg.includedTests.map((test, i) => {
                  const isOpen = !!openPanels[i];
                  return (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
                    >
                      {/* Panel Header */}
                      <button
                        type="button"
                        onClick={() => togglePanel(i)}
                        className={`w-full p-4 text-left flex items-center justify-between gap-4 transition-colors ${
                          isOpen ? 'bg-blue-50/70 border-b border-blue-100' : 'bg-slate-50/70 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                              isOpen ? 'bg-[#0b3866] text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-[#0b3866] block">
                              {test.name}
                            </span>
                            {test.purpose && (
                              <span className="text-[11px] text-slate-500 font-normal">
                                {test.purpose}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                            {test.parameters?.length || 1} Tests
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Panel Body (Meditest uppercase parameter list) */}
                      {isOpen && (
                        <div className="p-5 bg-white space-y-3 animate-in fade-in duration-150">
                          <p className="text-xs text-slate-600 italic">
                            {test.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                            {test.parameters.map((param, j) => (
                              <div
                                key={j}
                                className="p-2.5 bg-slate-50 hover:bg-cyan-50/50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00a896] flex-shrink-0" />
                                <span className="truncate">{param}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADDITIONAL INFORMATION (Meditest Specifications Table) */}
          {activeTab === 'additional' && (
            <div className="p-6 sm:p-10 space-y-6">
              <h2 className="text-xl font-black text-[#0b3866]">
                Technical &amp; Laboratory Specifications
              </h2>

              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs sm:text-sm">
                <table className="w-full text-left divide-y divide-slate-200">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700 w-1/3">Package Name</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold">{pkg.name}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Total Parameters</th>
                      <td className="py-3 px-4 text-[#00a896] font-black">{pkg.parametersCount} Tests</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Specimen / Sample Type</th>
                      <td className="py-3 px-4 text-slate-900">{pkg.sampleType}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Fasting Guidelines</th>
                      <td className="py-3 px-4 text-slate-900">
                        {pkg.fastingRequired
                          ? `${pkg.fastingHours || 10} to 12 Hours Fasting Mandatory (Water Allowed)`
                          : 'No Fasting Required'}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Turnaround Time (TAT)</th>
                      <td className="py-3 px-4 text-slate-900">
                        Same Day Delivery (within {pkg.reportDeliveryHours} Hours via WhatsApp &amp; PDF)
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Recommended Frequency</th>
                      <td className="py-3 px-4 text-slate-900">Every 6 Months or Annually for Preventive Health</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Target Demographic</th>
                      <td className="py-3 px-4 text-slate-900">Adults, Elderly &amp; Young Adults (Unisex)</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Collection Containers</th>
                      <td className="py-3 px-4 text-slate-900">
                        K2/K3 EDTA (Purple), Clot Activator / SST (Yellow/Red), Fluoride (Grey), Sterile Urine Cup
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Laboratory Accreditation</th>
                      <td className="py-3 px-4 text-emerald-700 font-bold">
                        NABL Certified Laboratory Standard (Regd: MC-7078)
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Lab Manager &amp; Operations</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold">
                        Mr. Aryan Saini (Paramount Golf Forest, Greater Noida | 8796645850)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Medical Signatory</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold">
                        Dr. Anil Gupta (M.B.B.S., M.D. Pathology | Regd. No. 5015)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SAMPLE COLLECTION & PREPARATION */}
          {activeTab === 'preparation' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0b3866]">
                  Pre-Test Instructions &amp; Safe Home Collection Policy
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Follow these essential guidelines to guarantee maximum clinical precision for your test results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Fasting &amp; Hydration Protocol</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {pkg.fastingRequired
                      ? 'Do not consume any solid food, tea, coffee, milk, or juices for 10-12 hours prior to sample collection. Plain drinking water is permitted and encouraged to keep veins well-hydrated.'
                      : 'No fasting required. You can have regular meals before sample collection.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-blue-900">
                    <Clock className="w-4 h-4 text-blue-700" />
                    <span>Morning Collection Slots</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    Morning slots (06:30 AM to 11:30 AM) are strongly recommended for fasting parameters like Blood Glucose, Lipid Profile, and Thyroid Hormones.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>One-Prick Gentle Phlebotomy</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    Our certified technicians follow a strict One-Prick Policy using single-use, sterile vacuum needles to prevent vein trauma or hematomas.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-purple-900">
                    <Truck className="w-4 h-4 text-purple-700" />
                    <span>Cold Chain Barcoded Transport</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    Specimens are immediately sealed into barcoded vacutainers and transported in temperature-controlled gel cold boxes to avoid analyte degradation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BENEFITS & FAQS */}
          {activeTab === 'faqs' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0b3866]">
                  Package Benefits &amp; Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Everything you need to know about booking, report delivery, and doctor consultations.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {pkg.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{b}</span>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div className="pt-4 border-t border-slate-200 space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Q: How and when will I receive my diagnostic report?
                  </strong>
                  <p className="text-slate-600">
                    Your NABL certified report will be dispatched within {pkg.reportDeliveryHours} hours directly to your registered WhatsApp number and available for secure PDF download on our portal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Q: Is home sample collection really free of cost?
                  </strong>
                  <p className="text-slate-600">
                    Yes, 100% Free Home Sample Collection is included across Delhi NCR, Greater Noida, and Noida. No hidden transport fees.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Q: Can I consult a doctor if any of my tests show abnormal values?
                  </strong>
                  <p className="text-slate-600">
                    Yes! Every full package booking includes complimentary doctor teleconsultation and report interpretation to guide you on next clinical steps.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. YOU MAY ALSO LIKE (Meditest Recommended Packages Section) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
                Related Health Checkups
              </span>
              <h3 className="text-2xl font-black text-[#0b3866]">
                You May Also Like&hellip;
              </h3>
            </div>
            <Link
              href="/packages"
              className="text-xs font-bold text-[#0b3866] hover:text-[#00a896] flex items-center gap-1"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.map((relPkg) => (
              <div
                key={relPkg.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between p-6 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-blue-100 text-[#0b3866] uppercase">
                      {relPkg.parametersCount} Tests
                    </span>
                    <span className="text-xs font-bold text-emerald-600">Free Home Visit</span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 group-hover:text-[#0b3866] transition-colors line-clamp-1">
                    {relPkg.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {relPkg.subtitle}
                  </p>

                  <div className="space-y-1 pt-1">
                    {relPkg.inclusionsSummary.slice(0, 3).map((inc, k) => (
                      <div key={k} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-[#00a896] flex-shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs line-through text-slate-400 block">₹{relPkg.originalPrice}</span>
                    <span className="text-xl font-black text-[#0b3866]">₹{relPkg.offerPrice}</span>
                  </div>
                  <Link
                    href={`/packages/${relPkg.slug}`}
                    className="px-4 py-2 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. WHY CHOOSE SANGAM DIAGNOSTICS? (Meditest Trust Banner) */}
        <div className="bg-gradient-to-r from-[#0b3866] via-[#092d52] to-[#00a896] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Diagnostic Excellence
            </span>
            <h3 className="text-2xl font-black mt-1">Why Choose Sangam Diagnostics?</h3>
            <p className="text-xs text-cyan-100 mt-1">
              Trusted pathology testing with NABL quality benchmarks, automated analyzers, and patient care.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
              <div className="font-black text-sm">NABL Accredited</div>
              <div className="text-[11px] text-cyan-200 mt-0.5">Registration: MC-7078</div>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Truck className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
              <div className="font-black text-sm">Free Doorstep Pickup</div>
              <div className="text-[11px] text-cyan-200 mt-0.5">Delhi &amp; Greater Noida</div>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Clock className="w-6 h-6 text-amber-300 mx-auto mb-2" />
              <div className="font-black text-sm">Same Day Reports</div>
              <div className="text-[11px] text-cyan-200 mt-0.5">Online &amp; WhatsApp</div>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Phone className="w-6 h-6 text-teal-300 mx-auto mb-2" />
              <div className="font-black text-sm">Dedicated Manager</div>
              <div className="text-[11px] text-cyan-200 mt-0.5">Mr. Aryan Saini (8796645850)</div>
            </div>
          </div>
        </div>
      </div>

      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        defaultPackageName={pkg.name}
      />
    </div>
  );
}