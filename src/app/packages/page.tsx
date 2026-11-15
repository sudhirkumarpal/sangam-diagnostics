'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Activity,
  Heart,
  Droplet,
} from 'lucide-react';
import { INITIAL_PACKAGES } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { SearchBar } from '@/components/common/SearchBar';

export default function PackagesPage() {
  const { bookNow, addItem } = useCart();
  const [filterType, setFilterType] = useState('all');
  const [sortOption, setSortOption] = useState('recommended');

  const filtered = INITIAL_PACKAGES.filter((pkg) => {
    if (filterType === 'all') return true;
    if (filterType === 'basic_cardiac') return pkg.offerPrice <= 1300;
    if (filterType === 'advanced') return pkg.slug.includes('advanced');
    if (filterType === 'hair') return pkg.slug.includes('hair');
    return true;
  }).sort((a, b) => {
    if (sortOption === 'price_asc') return a.offerPrice - b.offerPrice;
    if (sortOption === 'price_desc') return b.offerPrice - a.offerPrice;
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Preventive & Diagnostic Checkups
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0b3866] mt-1">
            Health Check-up Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Certified pathology profiles designed for regular wellness, early disease detection, and organ screening with complimentary home sample collection.
          </p>
        </div>

        {/* Meditest Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            variant="hero"
            placeholder="Search for Test/Package (e.g. CBC, KFT, Full Body, Cardiac Profile...)"
          />
        </div>

        {/* Filters and Sorting bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Packages (5)' },
              { id: 'basic_cardiac', label: 'Basic & Cardiac (₹799 - ₹1,299)' },
              { id: 'advanced', label: 'Advanced Health (₹1,499)' },
              { id: 'hair', label: 'Hair Treatment (₹2,499)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  filterType === btn.id
                    ? 'bg-[#0b3866] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Poster visual */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  {pkg.posterImage ? (
                    <Image
                      src={pkg.posterImage}
                      alt={pkg.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <Activity className="w-12 h-12 text-cyan-300 opacity-60" />
                    </div>
                  )}
                  {pkg.tag && (
                    <span className="absolute top-3 left-3 bg-[#0b3866] text-white text-[10px] font-bold px-3 py-1 rounded-md shadow">
                      {pkg.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                    Free Home Collection
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-[#00a896]">{pkg.parametersCount} Parameters</span>
                    <span>12–14h Delivery</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0b3866] transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {pkg.inclusionsSummary.slice(0, 5).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                    {pkg.inclusionsSummary.length > 5 && (
                      <div className="text-[11px] text-slate-400 font-medium pl-6">
                        + {pkg.inclusionsSummary.length - 5} more diagnostic parameters
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                <div className="flex items-baseline justify-between py-3">
                  <div>
                    <span className="text-xs line-through text-slate-400 mr-2">₹{pkg.originalPrice}</span>
                    <span className="text-3xl font-black text-[#0b3866]">₹{pkg.offerPrice}</span>
                  </div>
                  {pkg.couplePrice && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Couple / 2 Persons</span>
                      <span className="text-xs font-bold text-emerald-700">₹{pkg.couplePrice}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="py-3 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                  >
                    View Details
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
                    className="py-3 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
