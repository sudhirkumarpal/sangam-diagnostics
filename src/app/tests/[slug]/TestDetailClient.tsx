'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShoppingCart,
  MessageCircle,
  Phone,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Layers,
  Info,
  HelpCircle,
  ArrowRight,
  FlaskConical,
  Sparkles,
  Truck,
  Droplet,
} from 'lucide-react';
import { DiagnosticTest } from '@/types';
import { INITIAL_TESTS, INITIAL_PACKAGES } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { CallbackModal } from '@/components/common/CallbackModal';

interface TestDetailClientProps {
  test: DiagnosticTest;
}

export function TestDetailClient({ test }: TestDetailClientProps) {
  const { bookNow, addItem } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'preparation' | 'faqs'>('description');
  const [quantity, setQuantity] = useState<number>(1);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Accordion open/close state for parameters
  const [openPanels, setOpenPanels] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    test.parameters.forEach((_, i) => {
      initial[i] = i < 4;
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
    test.parameters.forEach((_, i) => {
      allOpen[i] = true;
    });
    setOpenPanels(allOpen);
  };

  const collapseAll = () => {
    setOpenPanels({});
  };

  const currentPrice = test.discountedPrice ?? test.price;
  const hasDiscount = !!test.discountedPrice && test.discountedPrice < test.price;
  const savings = hasDiscount ? test.price - test.discountedPrice! : 0;
  const discountPercent = hasDiscount ? Math.round((savings / test.price) * 100) : 0;

  const handleBookNow = () => {
    bookNow({
      type: 'test',
      id: test.id,
      slug: test.slug,
      name: test.name,
      price: currentPrice * quantity,
    });
  };

  const handleAddToCart = () => {
    addItem({
      type: 'test',
      id: test.id,
      slug: test.slug,
      name: test.name,
      price: currentPrice * quantity,
    });
  };

  // WhatsApp booking link
  const whatsappUrl = `https://wa.me/918796645850?text=${encodeURIComponent(
    `Hello Sangam Diagnostics, I would like to book the ${test.name} for Rs. ${currentPrice} at my location.`
  )}`;

  // Related tests in same category
  const relatedTests = INITIAL_TESTS.filter(
    (t) => t.category === test.category && t.slug !== test.slug
  ).slice(0, 3);

  // Recommend Full Body or Advanced Package
  const recommendedPackage =
    INITIAL_PACKAGES.find((p) => p.slug === 'basic-health-package') || INITIAL_PACKAGES[0];

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation (Meditest pattern) */}
        <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-[#0b3866] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/tests" className="hover:text-[#0b3866] transition-colors">
            All Tests
          </Link>
          <span>/</span>
          <Link href={`/tests?category=${test.category}`} className="hover:text-[#0b3866] transition-colors">
            {test.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">
            {test.name} @ {test.parametersCount} Parameters
          </span>
        </nav>

        {/* 1. MAIN PRODUCT SECTION (Meditest 2-Column Gallery + Summary Layout) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* LEFT COLUMN: Visual Test Badge & NABL Accreditation (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0b3866] via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col items-center justify-between text-white relative">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NABL MC-7078
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">100% Automated Analyzers</span>
              </div>

              {/* Graphic Test Card */}
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center space-y-4 shadow-2xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-[#00a896] text-slate-950 flex items-center justify-center mx-auto shadow-lg">
                  <FlaskConical className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                    {test.categoryLabel}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 leading-snug">
                    {test.name}
                  </h3>
                  {test.shortCode && (
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-white/20 rounded-md text-[11px] font-mono text-cyan-100">
                      Code: {test.shortCode}
                    </span>
                  )}
                </div>

                {test.tubeColor && (
                  <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-slate-200 flex items-center justify-center gap-2">
                    <Droplet className="w-4 h-4 text-cyan-300" />
                    <span>Vacutainer: <strong>{test.tubeColor}</strong></span>
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
                    {test.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-50 text-[#00a896] border border-teal-200">
                    {test.parametersCount} Parameters Included
                  </span>
                  {test.isPopular && (
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900">
                      Popular Test
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3866] leading-tight">
                  {test.name} @ {test.parametersCount} Parameters
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                  NABL Certified Diagnostic Panel
                </p>
              </div>

              {/* Short Description (Meditest layout lead paragraph) */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p>{test.description}</p>
                <p className="mt-1.5 font-black text-[#0b3866]">
                  Parameters Included: {test.parametersCount} Tests ({test.parameters.join(', ')})
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
                    <span className="font-bold text-slate-800">{test.sampleType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
                    ⏳
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Fasting Requirement</span>
                    <span className="font-bold text-slate-800">
                      {test.fastingRequired
                        ? `${test.fastingHours || 10} to 12 hrs Fasting`
                        : 'No Fasting Required'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
                    🕒
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Reporting Time</span>
                    <span className="font-bold text-slate-800">
                      Same Day Delivery ({test.reportDeliveryHours}h / By 9 PM)
                    </span>
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

              {/* Pricing Block (.price) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-cyan-50/50 to-emerald-50/70 border border-blue-200/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Diagnostic Test Price
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#0b3866]">
                      ₹{currentPrice}.00
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-sm sm:text-base line-through text-slate-400">
                          ₹{test.price}.00
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Save ₹{savings} ({discountPercent}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-xs font-bold text-[#00a896] block">✓ Direct Lab Rate</span>
                  <span className="text-[11px] text-slate-500">Transparent Pricing</span>
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
              <span>Description &amp; Parameters ({test.parametersCount})</span>
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
              <span>Clinical Significance &amp; FAQs</span>
            </button>
          </div>

          {/* TAB 1: DESCRIPTION & ACCORDION (Meditest #accordion Pattern) */}
          {activeTab === 'description' && (
            <div className="p-6 sm:p-10 space-y-6">
              {/* Introduction Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0b3866]">
                  {test.name} — Analyte Parameters Included
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {test.clinicalSignificance}
                </p>
              </div>

              {/* Expand / Collapse Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Parameters ({test.parameters.length} Analytes)
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
                {test.parameters.map((param, i) => {
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
                            <span className="font-bold text-sm text-[#0b3866] uppercase tracking-wide block">
                              {param}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal">
                              Clinical Analyte Measurement
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                            Included
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Panel Body */}
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-slate-600 space-y-2 animate-in fade-in duration-150">
                          <p>
                            Quantitative biological evaluation of <strong>{param}</strong> tested via fully automated clinical analyzers.
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                            <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                              Method: Automated Standard Assay
                            </span>
                            <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                              Specimen: {test.sampleType}
                            </span>
                            <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md font-bold">
                              NABL Calibrated
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADDITIONAL INFORMATION */}
          {activeTab === 'additional' && (
            <div className="p-6 sm:p-10 space-y-6">
              <h2 className="text-xl font-black text-[#0b3866]">
                Technical &amp; Laboratory Specifications
              </h2>

              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs sm:text-sm">
                <table className="w-full text-left divide-y divide-slate-200">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700 w-1/3">Test Name</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold">{test.name}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Category</th>
                      <td className="py-3 px-4 text-[#00a896] font-bold">{test.categoryLabel}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Specimen / Sample Type</th>
                      <td className="py-3 px-4 text-slate-900">{test.sampleType}</td>
                    </tr>
                    {test.tubeColor && (
                      <tr>
                        <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Vacutainer Tube Color</th>
                        <td className="py-3 px-4 text-slate-900 font-semibold">{test.tubeColor}</td>
                      </tr>
                    )}
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Fasting Requirement</th>
                      <td className="py-3 px-4 text-slate-900">
                        {test.fastingRequired
                          ? `${test.fastingHours || 10} to 12 Hours Fasting Required`
                          : 'No Fasting Required (Random Blood Sample)'}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Turnaround Time (TAT)</th>
                      <td className="py-3 px-4 text-slate-900">
                        Same Day Delivery (within {test.reportDeliveryHours} Hours)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Laboratory Quality Standard</th>
                      <td className="py-3 px-4 text-emerald-700 font-bold">
                        NABL Accredited Facility (MC-7078)
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/50">Operations &amp; Phlebotomy Head</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold">
                        Mr. Aryan Saini (8796645850)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 font-bold text-slate-700">Senior Pathologist</th>
                      <td className="py-3 px-4 text-slate-900 font-semibold">
                        Dr. Anil Gupta (M.B.B.S., M.D. Pathology | Regd. 5015)
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
                  Pre-Test Instructions &amp; Safe Home Collection
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Simple guidelines to ensure your test sample is pristine and unhemolyzed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Fasting &amp; Diet Guidelines</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {test.fastingRequired
                      ? `Fast for ${test.fastingHours || 10} to 12 hours before sample collection. Avoid heavy meals or caffeine. Water is permitted.`
                      : 'No dietary restrictions or fasting needed before this test.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-blue-900">
                    <Clock className="w-4 h-4 text-blue-700" />
                    <span>Preparation Checklist</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {test.preparationInstructions.map((inst, k) => (
                      <li key={k} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLINICAL SIGNIFICANCE & FAQS */}
          {activeTab === 'faqs' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0b3866]">
                  Clinical Significance &amp; Medical Consultation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  How clinicians utilize this test for diagnosis and monitoring.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>{test.clinicalSignificance}</p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    <strong>Clinical Notice:</strong> Laboratory test values must be correlated with patient symptoms by a qualified medical practitioner. Sangam Diagnostics provides certified reports under Dr. Anil Gupta.
                  </span>
                </div>
              </div>

              {test.faqs && test.faqs.length > 0 && (
                <div className="pt-4 border-t border-slate-200 space-y-3 text-xs sm:text-sm">
                  {test.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <strong className="text-slate-900 block font-bold">Q: {faq.question}</strong>
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. RECOMMENDED FULL BODY CHECKUP BANNER (Best Value Proposition) */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-[#0b3866] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/30">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 bg-emerald-400 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider">
              Smart Value Recommendation
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Get {test.name} + {recommendedPackage.parametersCount - test.parametersCount} More Tests in Full Body Checkup!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Why test only one organ? Upgrade to our {recommendedPackage.name} covering {recommendedPackage.parametersCount} parameters including Complete CBC, LFT, KFT, Lipid, and Thyroid for only ₹{recommendedPackage.offerPrice}!
            </p>
          </div>

          <Link
            href={`/packages/${recommendedPackage.slug}`}
            className="px-6 py-3.5 bg-white text-[#0b3866] hover:bg-slate-100 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Upgrade to Full Package (₹{recommendedPackage.offerPrice})</span>
          </Link>
        </div>

        {/* 4. RELATED TESTS IN CATEGORY (Meditest "You may also like...") */}
        {relatedTests.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
                  Similar Pathology Tests
                </span>
                <h3 className="text-2xl font-black text-[#0b3866]">
                  You May Also Need&hellip;
                </h3>
              </div>
              <Link
                href="/tests"
                className="text-xs font-bold text-[#0b3866] hover:text-[#00a896] flex items-center gap-1"
              >
                <span>View All Tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedTests.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between p-6 group"
                >
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-[#0b3866] uppercase">
                      {rel.categoryLabel}
                    </span>
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-[#0b3866] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                    <div className="text-[11px] text-slate-400 font-semibold pt-1">
                      {rel.parametersCount} Parameters • {rel.reportDeliveryHours}h Report
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {rel.discountedPrice && (
                        <span className="text-xs line-through text-slate-400 block">₹{rel.price}</span>
                      )}
                      <span className="text-xl font-black text-[#0b3866]">
                        ₹{rel.discountedPrice || rel.price}
                      </span>
                    </div>
                    <Link
                      href={`/tests/${rel.slug}`}
                      className="px-4 py-2 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        defaultPackageName={test.name}
      />
    </div>
  );
}