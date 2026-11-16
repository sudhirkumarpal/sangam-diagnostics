'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  FlaskConical,
  Droplet,
  ArrowRight,
  Plus,
  Sparkles,
  ShieldCheck,
  Activity,
  Heart,
  Zap,
  Thermometer,
  Sun,
  AlertCircle,
  Award,
  Phone,
  ShoppingCart,
  X,
  Layers,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
  Check,
} from 'lucide-react';
import { INITIAL_TESTS, TEST_CATEGORIES, INITIAL_PACKAGES } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { CallbackModal } from '@/components/common/CallbackModal';

// Icon resolver for Meditest risk areas
function getCategoryIcon(slug: string) {
  switch (slug) {
    case 'thyroid':
      return <Zap className="w-6 h-6 text-amber-500" />;
    case 'diabetes-kidney':
      return <ShieldAlertIcon className="w-6 h-6 text-blue-500" />;
    case 'heart-hypertension':
      return <Heart className="w-6 h-6 text-rose-500" />;
    case 'fever-infection':
      return <Thermometer className="w-6 h-6 text-red-500" />;
    case 'vitamins-minerals':
      return <Sun className="w-6 h-6 text-amber-600" />;
    case 'liver-function':
      return <Activity className="w-6 h-6 text-emerald-500" />;
    case 'joint-bone':
      return <Layers className="w-6 h-6 text-indigo-500" />;
    case 'cancer-screening':
      return <AlertCircle className="w-6 h-6 text-purple-500" />;
    case 'pregnancy-care':
      return <Sparkles className="w-6 h-6 text-pink-500" />;
    case 'infertility':
      return <Heart className="w-6 h-6 text-violet-500" />;
    case 'hormonal':
      return <Clock className="w-6 h-6 text-cyan-600" />;
    case 'child-special':
      return <Award className="w-6 h-6 text-teal-500" />;
    case 'male-special':
      return <Award className="w-6 h-6 text-sky-600" />;
    case 'female-special':
      return <Sparkles className="w-6 h-6 text-rose-400" />;
    case 'senior-male':
    case 'senior-female':
      return <ShieldCheck className="w-6 h-6 text-slate-600" />;
    case 'allergy':
      return <AlertCircle className="w-6 h-6 text-orange-500" />;
    case 'alcoholism':
    case 'smoking':
      return <Activity className="w-6 h-6 text-stone-600" />;
    case 'stress':
      return <Clock className="w-6 h-6 text-blue-400" />;
    case 'anaemia':
      return <Droplet className="w-6 h-6 text-red-600" />;
    case 'std':
      return <ShieldCheck className="w-6 h-6 text-purple-600" />;
    default:
      return <FlaskConical className="w-6 h-6 text-[#00a896]" />;
  }
}

function ShieldAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export default function TestsCataloguePage() {
  const { addItem, bookNow } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sampleFilter, setSampleFilter] = useState<'all' | 'blood' | 'urine' | 'stool' | 'swab'>('all');
  const [fastingFilter, setFastingFilter] = useState<'all' | 'fasting' | 'non-fasting'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'name_asc'>('recommended');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null);

  const testsListRef = useRef<HTMLDivElement>(null);

  const handleSelectRiskArea = (slug: string) => {
    setSelectedCategory(slug);
    setSearch('');
    // Smooth scroll to test list
    if (testsListRef.current) {
      testsListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (test: (typeof INITIAL_TESTS)[0]) => {
    const finalPrice = test.discountedPrice ?? test.price;
    addItem({
      type: 'test',
      id: test.id,
      slug: test.slug,
      name: test.name,
      price: finalPrice,
    });
    setAddedItemSlug(test.slug);
    setTimeout(() => {
      setAddedItemSlug(null);
    }, 1800);
  };

  const handleBookNow = (test: (typeof INITIAL_TESTS)[0]) => {
    const finalPrice = test.discountedPrice ?? test.price;
    bookNow({
      type: 'test',
      id: test.id,
      slug: test.slug,
      name: test.name,
      price: finalPrice,
    });
  };

  const filteredTests = useMemo(() => {
    return INITIAL_TESTS.filter((test) => {
      // Search matching: name, category, parameters, description, and price!
      const q = search.trim().toLowerCase();
      if (q) {
        const matchName = test.name.toLowerCase().includes(q);
        const matchShort = test.shortCode?.toLowerCase().includes(q);
        const matchCat = test.categoryLabel.toLowerCase().includes(q) || test.category.toLowerCase().includes(q);
        const matchDesc = test.description.toLowerCase().includes(q);
        const matchSig = test.clinicalSignificance.toLowerCase().includes(q);
        const matchParams = test.parameters.some((p) => p.toLowerCase().includes(q));
        const currentPrice = test.discountedPrice ?? test.price;
        const matchPrice =
          currentPrice.toString().includes(q) ||
          test.price.toString().includes(q) ||
          `₹${currentPrice}`.includes(q) ||
          `₹${test.price}`.includes(q);

        if (!matchName && !matchShort && !matchCat && !matchDesc && !matchSig && !matchParams && !matchPrice) {
          return false;
        }
      }

      // Category matching
      if (selectedCategory !== 'all') {
        if (test.category !== selectedCategory) {
          // Special fallback grouping
          if (selectedCategory === 'diabetes-kidney') {
            if (test.category !== 'diabetes-kidney' && test.category !== 'diabetes' && test.category !== 'kidney-function') {
              return false;
            }
          } else if (selectedCategory === 'heart-hypertension') {
            if (test.category !== 'heart-hypertension' && test.category !== 'lipid-profile') {
              return false;
            }
          } else {
            return false;
          }
        }
      }

      // Sample type matching
      if (sampleFilter !== 'all') {
        const sType = test.sampleType.toLowerCase();
        if (sampleFilter === 'blood' && !sType.includes('blood')) return false;
        if (sampleFilter === 'urine' && !sType.includes('urine')) return false;
        if (sampleFilter === 'stool' && !sType.includes('stool')) return false;
        if (sampleFilter === 'swab' && !sType.includes('swab')) return false;
      }

      // Fasting filter
      if (fastingFilter === 'fasting' && !test.fastingRequired) return false;
      if (fastingFilter === 'non-fasting' && test.fastingRequired) return false;

      return true;
    }).sort((a, b) => {
      const pA = a.discountedPrice ?? a.price;
      const pB = b.discountedPrice ?? b.price;
      if (sortBy === 'price_asc') return pA - pB;
      if (sortBy === 'price_desc') return pB - pA;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selectedCategory, sampleFilter, fastingFilter, sortBy]);

  // Compute test counts for each category
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    INITIAL_TESTS.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Meditest-style Top Breadcrumb & Hero Banner */}
      <section className="bg-gradient-to-r from-[#071d36] via-[#0b3866] to-[#0d477e] text-white py-10 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-200 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-cyan-300 font-semibold">Test / Packages</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NABL Accredited Diagnostic Laboratory (MC-7078)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Sangam Test & Diagnostic Packages
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Accredited, fully automated & completely barcoded laboratory. Over 140+ individual clinical investigations and health checkup profiles with transparent pricing and free home sample collection.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                href="/prescription-upload"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-[#00a896] hover:from-teal-600 hover:to-[#008f80] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Upload Prescription</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsCallbackOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-300" />
                <span>Request Free Callback</span>
              </button>
            </div>
          </div>

          {/* Meditest Integrated Full-Width Search Toolbar */}
          <div className="mt-8">
            <div className="relative max-w-4xl">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for Test/Package( KFT, Full Body, Thyroid, Sugar, Dengue, CBC, Calcium, ₹299 etc.)"
                  className="w-full py-4 pl-3 pr-10 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="p-2 text-slate-400 hover:text-slate-600 pr-3"
                    title="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Search Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-blue-200 font-semibold">Popular Searches:</span>
              {[
                'Thyroid Profile',
                'CBC & ESR',
                'Lipid Profile',
                'KFT Test',
                'LFT',
                'HbA1c',
                'Vitamin D3',
                'Vitamin B12',
                'Dengue',
                'Urine Routine',
                'Beta HCG',
                'Calcium',
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearch(term)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meditest "Test(s)/Package(s) by Risk Areas" Section */}
      <section className="py-10 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866]">
              Test(s)/Package(s) by Risk Areas:
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any organ profile or clinical risk area below to view dedicated laboratory tests and packages.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Card 1: Most Popular Health Packages */}
            <Link
              href="/packages"
              className="group p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-2 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-amber-800 line-clamp-2">
                Most Popular Health Packages
              </h3>
              <span className="text-[11px] font-bold text-amber-700 mt-2 flex items-center gap-1 group-hover:underline">
                View Packages &rarr;
              </span>
            </Link>

            {/* 22 Risk Area Cards */}
            {TEST_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.slug] || 0;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectRiskArea(cat.slug)}
                  className={`group p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-50 border-[#00a896] shadow-md ring-2 ring-[#00a896]/20'
                      : 'bg-white border-slate-200 hover:border-[#00a896] hover:shadow-md hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0b3866] line-clamp-2">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      {count > 0 ? `${count} Tests` : 'Clinical Profile'}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#00a896] mt-2 group-hover:underline flex items-center gap-0.5">
                    Click here
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Tests Directory & Catalog */}
      <section ref={testsListRef} className="py-10 px-4 max-w-7xl mx-auto">
        {/* Filter and Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Total matching tests counter */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-[#0b3866]">
                  Showing {filteredTests.length} Diagnostic Tests
                </span>
                {selectedCategory !== 'all' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#00a896] text-xs font-bold border border-cyan-200">
                    {TEST_CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Certified NABL pricing with MD Pathologist sign-off and free home collection.
              </p>
            </div>

            {/* Right: Sort and Reset */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              >
                <option value="all">All Risk Categories ({INITIAL_TESTS.length})</option>
                {TEST_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name} ({categoryCounts[c.slug] || 0})
                  </option>
                ))}
              </select>

              {/* Sample Type dropdown */}
              <select
                value={sampleFilter}
                onChange={(e) => setSampleFilter(e.target.value as any)}
                className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              >
                <option value="all">All Specimens</option>
                <option value="blood">Blood Tests</option>
                <option value="urine">Urine Tests</option>
                <option value="stool">Stool Tests</option>
                <option value="swab">Swab / Culture</option>
              </select>

              {/* Fasting dropdown */}
              <select
                value={fastingFilter}
                onChange={(e) => setFastingFilter(e.target.value as any)}
                className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              >
                <option value="all">Fasting & Non-Fasting</option>
                <option value="fasting">Fasting Required</option>
                <option value="non-fasting">No Fasting Required</option>
              </select>

              {/* Sort by */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
              </select>

              {(selectedCategory !== 'all' || sampleFilter !== 'all' || fastingFilter !== 'all' || search !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSampleFilter('all');
                    setFastingFilter('all');
                    setSearch('');
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 underline px-1"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No matching tests found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We couldn&apos;t find any tests matching your filter. Try adjusting your search query, or upload your prescription to have our pathologists match it for you.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSampleFilter('all');
                  setFastingFilter('all');
                  setSearch('');
                }}
                className="px-4 py-2 bg-[#0b3866] text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
              <Link
                href="/prescription-upload"
                className="px-4 py-2 bg-teal-50 text-[#00a896] border border-teal-200 text-xs font-bold rounded-xl"
              >
                Upload Prescription
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTests.map((test) => {
              const currentPrice = test.discountedPrice ?? test.price;
              const hasDiscount = !!test.discountedPrice && test.discountedPrice < test.price;
              const savings = hasDiscount ? test.price - test.discountedPrice! : 0;
              const isJustAdded = addedItemSlug === test.slug;

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#00a896] hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b3866] text-[11px] font-bold border border-blue-100 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-[#00a896]" />
                        <span>{test.categoryLabel}</span>
                      </span>

                      {hasDiscount && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                          Save ₹{savings}
                        </span>
                      )}
                    </div>

                    <Link href={`/tests/${test.slug}`} className="block">
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#0b3866] transition-colors line-clamp-2">
                        {test.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {test.clinicalSignificance || test.description}
                    </p>

                    {/* Metadata Chips */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span className="truncate">{test.sampleType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span>{test.reportDeliveryHours || 12} Hrs Turnaround</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">
                          {test.fastingRequired
                            ? `Fasting Required (${test.fastingHours || 10} Hrs)`
                            : 'No Fasting Required'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Price & Action Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Offer Price</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-[#0b3866]">₹{currentPrice}</span>
                        {hasDiscount && (
                          <span className="text-xs text-slate-400 line-through">₹{test.price}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(test)}
                        className={`p-2.5 rounded-xl border font-bold text-xs transition-all flex items-center justify-center ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                        title="Add to Cart"
                      >
                        {isJustAdded ? (
                          <Check className="w-4 h-4 animate-in zoom-in" />
                        ) : (
                          <ShoppingCart className="w-4 h-4 text-slate-700" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookNow(test)}
                        className="px-3.5 py-2.5 bg-gradient-to-r from-[#0b3866] to-[#00a896] hover:from-[#092d52] hover:to-[#008f80] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
                      >
                        Book Test
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Meditest "Why choose MediTest / Sangam Diagnostics ?" Trust Section */}
      <section className="bg-white py-14 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>4.9 Based on 10,000+ Patient Reviews across Delhi NCR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3866]">
              Why Choose Sangam Diagnostics ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
              Accredited, fully automated & completely barcoded laboratory with zero commission and money-back accuracy guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0b3866] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#0b3866] mb-1">
                NABL Certified Labs & High-End Machines
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating with Certificate No. MC-7078. 100% automated analyzers with complete barcoding of specimens, eliminating any risk of sample mix-up.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#00a896] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#0b3866] mb-1">
                Senior MD Pathologists & Expert Phlebotomists
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reports validated by Dr. Anil Gupta (M.D. Path, Regd. 5015) and qualified clinical biochemists. Free home sample collection by trained technicians.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#0b3866] mb-1">
                BIG NO to Commissions & Cuts
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe in ethical, honest healthcare. Honest transparent test prices, 12–14 hr online report delivery on WhatsApp, and zero hidden home visit fees.
              </p>
            </div>
          </div>

          {/* Quick Contact & Branch Footprint */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0b3866] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-lg font-bold">Need assistance choosing the right test or profile?</h3>
              <p className="text-xs text-blue-200 mt-1">
                Our clinical advisers are available 7:00 AM to 8:00 PM (All Days). Free sample collection in Delhi & Greater Noida.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:7982348151"
                className="px-4 py-2.5 bg-white text-[#0b3866] rounded-xl text-xs font-extrabold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#00a896]" />
                <span>Delhi: 7982348151</span>
              </a>
              <a
                href="tel:8796645850"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gr. Noida (Aryan Saini): 8796645850</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      {isCallbackOpen && <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />}
    </div>
  );
}
