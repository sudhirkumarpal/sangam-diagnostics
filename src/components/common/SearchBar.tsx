'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Loader2,
  Clock,
  Sparkles,
  ArrowRight,
  History,
  TrendingUp,
  PackageCheck,
  FlaskConical,
  Phone,
  FileUp,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_PACKAGES, INITIAL_TESTS } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { DiagnosticTest, Package } from '@/types';

interface SearchBarProps {
  variant?: 'hero' | 'header' | 'compact';
  placeholder?: string;
  className?: string;
  onSelect?: () => void;
}

const POPULAR_SEARCHES = [
  'Basic Health Package',
  'Advanced Health Package',
  'Cardiac Health Profile',
  'Hair Treatment Screening',
  'CBC & ESR',
  'Lipid Profile',
  'KFT (Kidney)',
  'LFT (Liver)',
  'Thyroid Profile',
  'HbA1c',
  'Vitamin D',
  'Vitamin B12',
];

export function SearchBar({
  variant = 'hero',
  placeholder = 'Search for Test/Package (e.g. CBC, KFT, Full Body, Cardiac Profile...)',
  className = '',
  onSelect,
}: SearchBarProps) {
  const router = useRouter();
  const { bookNow, addItem } = useCart();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'packages' | 'tests'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sangam_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    if (!term || term.trim().length < 2) return;
    const trimmed = term.trim();
    try {
      const next = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      setRecentSearches(next);
      localStorage.setItem('sangam_recent_searches', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem('sangam_recent_searches');
    } catch {
      // ignore
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search indicator
  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 120);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  // Compute search results
  const { matchedPackages, matchedTests, allResults } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { matchedPackages: [], matchedTests: [], allResults: [] };
    }

    const packages = INITIAL_PACKAGES.filter((p) => {
      if (!p.isActive) return false;
      const matchName = p.name.toLowerCase().includes(q);
      const matchSub = p.subtitle.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTag = p.tag?.toLowerCase().includes(q);
      const matchInclusions = p.inclusionsSummary.some((inc) => inc.toLowerCase().includes(q));
      const matchTests = p.includedTests.some(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.parameters.some((param) => param.toLowerCase().includes(q))
      );
      const matchPrice =
        p.offerPrice.toString().includes(q) ||
        p.originalPrice.toString().includes(q) ||
        `₹${p.offerPrice}`.includes(q) ||
        `₹${p.originalPrice}`.includes(q);
      return matchName || matchSub || matchDesc || matchTag || matchInclusions || matchTests || matchPrice;
    });

    const tests = INITIAL_TESTS.filter((t) => {
      if (!t.isActive) return false;
      const matchName = t.name.toLowerCase().includes(q);
      const matchCode = t.shortCode?.toLowerCase().includes(q);
      const matchCat = t.categoryLabel.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchSig = t.clinicalSignificance.toLowerCase().includes(q);
      const matchParams = t.parameters.some((param) => param.toLowerCase().includes(q));
      const matchPrice =
        (t.discountedPrice ?? t.price).toString().includes(q) ||
        t.price.toString().includes(q) ||
        `₹${t.discountedPrice ?? t.price}`.includes(q) ||
        `₹${t.price}`.includes(q);
      return matchName || matchCode || matchCat || matchDesc || matchSig || matchParams || matchPrice;
    });

    const combined = [
      ...packages.map((pkg) => ({ type: 'package' as const, data: pkg })),
      ...tests.map((test) => ({ type: 'test' as const, data: test })),
    ];

    return {
      matchedPackages: packages,
      matchedTests: tests,
      allResults: combined,
    };
  }, [query]);

  // Filtered list depending on active tab
  const displayedResults = useMemo(() => {
    if (activeTab === 'packages') {
      return matchedPackages.map((p) => ({ type: 'package' as const, data: p }));
    }
    if (activeTab === 'tests') {
      return matchedTests.map((t) => ({ type: 'test' as const, data: t }));
    }
    return allResults;
  }, [activeTab, matchedPackages, matchedTests, allResults]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query, activeTab]);

  // Handle keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (displayedResults.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < displayedResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayedResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < displayedResults.length) {
          const item = displayedResults[selectedIndex];
          handleItemClick(item);
        } else if (displayedResults.length > 0) {
          handleItemClick(displayedResults[0]);
        }
      }
    }
  };

  const handleItemClick = (item: { type: 'package'; data: Package } | { type: 'test'; data: DiagnosticTest }) => {
    saveRecentSearch(item.data.name);
    setIsOpen(false);
    if (onSelect) onSelect();
    if (item.type === 'package') {
      router.push(`/packages/${item.data.slug}`);
    } else {
      router.push(`/tests/${item.data.slug}`);
    }
  };

  const handleQuickBook = (
    e: React.MouseEvent,
    item: { type: 'package'; data: Package } | { type: 'test'; data: DiagnosticTest }
  ) => {
    e.stopPropagation();
    saveRecentSearch(item.data.name);
    setIsOpen(false);
    if (onSelect) onSelect();

    if (item.type === 'package') {
      bookNow({
        type: 'package',
        id: item.data.id,
        slug: item.data.slug,
        name: item.data.name,
        price: item.data.offerPrice,
      });
    } else {
      bookNow({
        type: 'test',
        id: item.data.id,
        slug: item.data.slug,
        name: item.data.name,
        price: item.data.discountedPrice || item.data.price,
      });
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    inputRef.current?.focus();
    setIsOpen(true);
  };

  // Highlight matched query text
  const renderHighlighted = (text: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-amber-950 font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box (Meditest ajaxsearchlite styling) */}
      <div
        className={`relative flex items-center transition-all duration-200 rounded-2xl bg-white ${
          isOpen ? 'ring-2 ring-[#00a896] shadow-2xl border-transparent' : 'shadow-lg border border-slate-200 hover:border-slate-300'
        } ${isHero ? 'p-1.5 sm:p-2' : 'p-1'}`}
      >
        <div className="pl-3 sm:pl-4 pr-2 text-slate-400 flex items-center justify-center">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-[#00a896] animate-spin" />
          ) : (
            <Search className={`w-5 h-5 text-[#0b3866] transition-colors`} />
          )}
        </div>

        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          aria-label="Search medical tests and packages"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none ${
            isHero ? 'text-sm sm:text-base py-2.5 sm:py-3' : 'text-xs sm:text-sm py-2'
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors mr-1"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-1.5 pr-2">
          <kbd className="px-2 py-1 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
            Ctrl+K
          </kbd>
        </div>

        {isHero && (
          <Link
            href="/packages"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0b3866] hover:bg-[#082848] text-white text-xs font-bold rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            <span>All Packages</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
          </Link>
        )}
      </div>

      {/* Instant Dropdown (Meditest ajaxsearchliteres replica) */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* STATE A: Empty Query => Popular Searches & Recent Searches */}
          {!query.trim() && (
            <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Clear History
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handlePopularSearch(term)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00a896] uppercase tracking-wider mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00a896]" />
                  Popular Tests & Packages on Sangam Diagnostics
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePopularSearch(term)}
                      className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-[#0b3866] border border-cyan-200 text-xs font-bold rounded-xl transition-all hover:scale-105"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Quick Assistance */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-700">Need personal guidance?</span>
                  <a
                    href="tel:8796645850"
                    className="font-bold text-[#00a896] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> Call Mr. Aryan Saini: 8796645850
                  </a>
                </div>
                <Link
                  href="/prescription-upload"
                  className="font-bold text-[#0b3866] hover:text-[#00a896] flex items-center gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <FileUp className="w-3 h-3" /> Upload Prescription
                </Link>
              </div>
            </div>
          )}

          {/* STATE B: Active Query => Filter Tabs & Live Results */}
          {query.trim() && (
            <div>
              {/* Category Filter Tabs Header */}
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                      activeTab === 'all'
                        ? 'bg-[#0b3866] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    All Results ({allResults.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('packages')}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors flex items-center gap-1 ${
                      activeTab === 'packages'
                        ? 'bg-[#00a896] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <PackageCheck className="w-3 h-3" />
                    Packages ({matchedPackages.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('tests')}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors flex items-center gap-1 ${
                      activeTab === 'tests'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <FlaskConical className="w-3 h-3" />
                    Tests ({matchedTests.length})
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  {displayedResults.length} match{displayedResults.length === 1 ? '' : 'es'}
                </span>
              </div>

              {/* Results List */}
              <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
                {displayedResults.length === 0 ? (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm">
                      No tests or packages found matching &quot;{query}&quot;
                    </div>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Have a prescription for a specialized test? Upload it directly or call our Lab Manager for personal assistance.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Link
                        href="/prescription-upload"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
                      >
                        <FileUp className="w-3.5 h-3.5" />
                        <span>Upload Prescription</span>
                      </Link>
                      <a
                        href="tel:8796645850"
                        className="px-4 py-2 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Call Aryan Saini (8796645850)</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  displayedResults.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    const isPkg = item.type === 'package';
                    const pkgData = isPkg ? (item.data as Package) : null;
                    const testData = !isPkg ? (item.data as DiagnosticTest) : null;

                    const title = item.data.name;
                    const price = isPkg ? pkgData!.offerPrice : testData!.discountedPrice || testData!.price;
                    const originalPrice = isPkg ? pkgData!.originalPrice : testData!.price;
                    const hasDiscount = originalPrice > price;

                    return (
                      <div
                        key={`${item.type}-${item.data.id}`}
                        onClick={() => handleItemClick(item)}
                        className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected ? 'bg-cyan-50/70 border-l-4 border-[#00a896]' : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Left: Metadata & Titles */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-black rounded-md uppercase tracking-wider ${
                                isPkg ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {isPkg ? 'Package' : 'Diagnostic Test'}
                            </span>

                            {isPkg && pkgData?.tag && (
                              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded-md">
                                {pkgData.tag}
                              </span>
                            )}

                            {!isPkg && testData?.categoryLabel && (
                              <span className="text-[10px] text-slate-500 font-semibold">
                                {testData.categoryLabel}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-sm sm:text-base text-[#0b3866] truncate">
                            {renderHighlighted(title)}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-1">
                            {isPkg ? pkgData?.subtitle : testData?.clinicalSignificance || testData?.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                            {isPkg && (
                              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {pkgData?.parametersCount} Parameters
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-slate-500">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {item.data.reportDeliveryHours}h Report
                            </span>
                            <span className="text-slate-400">
                              {item.data.fastingRequired ? '10-12h Fasting' : 'No Fasting'}
                            </span>
                          </div>
                        </div>

                        {/* Right: Pricing & Quick Actions */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <div className="text-left sm:text-right">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg sm:text-xl font-black text-[#e63946]">₹{price}</span>
                              {hasDiscount && (
                                <span className="text-xs text-slate-400 line-through">₹{originalPrice}</span>
                              )}
                            </div>
                            {hasDiscount && (
                              <span className="text-[10px] font-extrabold text-emerald-600 block">
                                Save ₹{originalPrice - price}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleQuickBook(e, item)}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-[#00a896] hover:from-emerald-700 hover:to-[#008f80] text-white text-xs font-black rounded-xl shadow-sm transition-transform active:scale-95"
                            >
                              Book Now
                            </button>
                            <span className="text-slate-300 hidden sm:inline">|</span>
                            <span className="text-xs font-bold text-[#0b3866] hover:text-[#00a896] flex items-center gap-0.5">
                              Details <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Dropdown Footer Status */}
              <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  Showing {displayedResults.length} result{displayedResults.length === 1 ? '' : 's'} for &quot;
                  <strong className="text-slate-800">{query}</strong>&quot;
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                  ↑↓ navigate • Enter to select • Esc to close
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}