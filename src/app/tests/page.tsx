'use client';

import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { INITIAL_TESTS, TEST_CATEGORIES } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function TestsCataloguePage() {
  const { addItem, bookNow } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sampleFilter, setSampleFilter] = useState('all');
  const [fastingFilter, setFastingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredTests = useMemo(() => {
    return INITIAL_TESTS.filter((test) => {
      // Search
      const matchSearch =
        test.name.toLowerCase().includes(search.toLowerCase()) ||
        test.description.toLowerCase().includes(search.toLowerCase()) ||
        test.parameters.some((p) => p.toLowerCase().includes(search.toLowerCase()));

      if (!matchSearch) return false;

      // Category
      if (selectedCategory !== 'all' && test.category !== selectedCategory) {
        return false;
      }

      // Sample
      if (sampleFilter !== 'all') {
        if (sampleFilter === 'blood' && !test.sampleType.includes('Blood')) return false;
        if (sampleFilter === 'urine' && !test.sampleType.includes('Urine')) return false;
      }

      // Fasting
      if (fastingFilter === 'fasting' && !test.fastingRequired) return false;
      if (fastingFilter === 'non-fasting' && test.fastingRequired) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        const pA = a.discountedPrice ?? a.price;
        const pB = b.discountedPrice ?? b.price;
        return pA - pB;
      }
      if (sortBy === 'price_desc') {
        const pA = a.discountedPrice ?? a.price;
        const pB = b.discountedPrice ?? b.price;
        return pB - pA;
      }
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selectedCategory, sampleFilter, fastingFilter, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
              Diagnostic Pathology Services
            </span>
            <h1 className="text-3xl font-black text-[#0b3866] mt-1">Diagnostic Tests Catalogue</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Search our comprehensive list of certified diagnostic tests with transparent pricing, sample requirements, and clinical significance.
            </p>
          </div>

          <Link
            href="/prescription-upload"
            className="px-5 py-3 bg-gradient-to-r from-teal-600 to-[#0b3866] hover:from-teal-700 hover:to-[#082848] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Upload Prescription & Get Price</span>
          </Link>
        </div>

        {/* Prescription Callout Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-teal-100 text-[#00a896] font-bold">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-slate-800">Don&apos;t know which tests to select?</span>
              <p className="text-slate-600 mt-0.5">
                Upload your doctor&apos;s slip. Our clinical AI matches the prescribed tests and provides an authoritative quotation instantly.
              </p>
            </div>
          </div>
          <Link
            href="/prescription-upload"
            className="px-4 py-2 bg-white text-[#0b3866] border border-slate-200 hover:bg-slate-50 rounded-xl font-bold shadow-sm flex items-center gap-1.5 flex-shrink-0"
          >
            <span>Upload Prescription & Get Price</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00a896]" />
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by test name, analyte or category (e.g., CBC, Thyroid, Glucose, Creatinine)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896] text-slate-800"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Departments</option>
                {TEST_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              <span className="text-xs font-bold text-slate-500 ml-2">Sample:</span>
              <select
                value={sampleFilter}
                onChange={(e) => setSampleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="blood">Blood</option>
                <option value="urine">Urine</option>
              </select>

              <span className="text-xs font-bold text-slate-500 ml-2">Fasting:</span>
              <select
                value={fastingFilter}
                onChange={(e) => setFastingFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">Any</option>
                <option value="fasting">Fasting Required</option>
                <option value="non-fasting">No Fasting</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-4 text-xs font-semibold text-slate-500 flex items-center justify-between">
          <span>Showing {filteredTests.length} diagnostic tests</span>
          {(search || selectedCategory !== 'all' || sampleFilter !== 'all' || fastingFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSampleFilter('all');
                setFastingFilter('all');
              }}
              className="text-[#00a896] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Tests List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => {
            const currentPrice = test.discountedPrice ?? test.price;
            return (
              <div
                key={test.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b3866] font-bold text-[11px]">
                      {test.categoryLabel}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00a896]" />
                      <span>{test.reportDeliveryHours}h turnaround</span>
                    </span>
                  </div>

                  <Link href={`/tests/${test.slug}`} className="block group">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0b3866] transition-colors leading-snug">
                      {test.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {test.description}
                    </p>
                  </Link>

                  {/* Sample details tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                      {test.sampleType}
                    </span>
                    {test.fastingRequired ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-medium">
                        Fasting ({test.fastingHours}h)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                        No Fasting
                      </span>
                    )}
                  </div>

                  {/* Parameters preview */}
                  <div className="mt-3 text-[11px] text-slate-500">
                    <strong className="text-slate-700">{test.parametersCount} Parameters:</strong>{' '}
                    <span className="line-clamp-1">{test.parameters.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {test.discountedPrice && (
                      <span className="text-xs line-through text-slate-400 mr-2">₹{test.price}</span>
                    )}
                    <span className="text-2xl font-black text-[#0b3866]">₹{currentPrice}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        addItem({
                          type: 'test',
                          id: test.id,
                          slug: test.slug,
                          name: test.name,
                          price: currentPrice,
                        })
                      }
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0b3866] font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() =>
                        bookNow({
                          type: 'test',
                          id: test.id,
                          slug: test.slug,
                          name: test.name,
                          price: currentPrice,
                        })
                      }
                      className="px-4 py-2 bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-xs rounded-xl shadow transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
