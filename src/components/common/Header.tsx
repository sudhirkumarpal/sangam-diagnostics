'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Calendar,
  FileText,
  Search,
  ShoppingCart,
  Menu,
  X,
  MapPin,
  ShieldCheck,
  User,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { CallbackModal } from './CallbackModal';
import { useCart } from '@/context/CartContext';

export function Header() {
  const pathname = usePathname();
  const { itemCount, selectedCity, setSelectedCity } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'Health Packages',
      href: '/packages',
      badge: '₹799 Deals',
    },
    { label: 'All Tests', href: '/tests' },
    {
      label: 'Upload Prescription',
      href: '/prescription-upload',
      badge: 'AI Price',
    },
    { label: 'Offers', href: '/offers' },
    { label: 'Track Booking', href: '/track' },
    { label: 'Download Report', href: '/reports' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-100">
        {/* Top Info Bar */}
        <div className="bg-[#0b3866] text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* Left: Accreditation & Free Home Collection banner */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                NABL Accredited Lab (MC-7078)
              </span>
              <span className="hidden md:inline text-blue-200">|</span>
              <span className="hidden md:inline text-blue-100">
                Free Home Sample Collection in Delhi & Greater Noida
              </span>
            </div>

            {/* Right: City Selector, Callback, Direct Phone */}
            <div className="flex items-center gap-3 ml-auto">
              {/* City selector */}
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px]">
                <MapPin className="w-3 h-3 text-cyan-300" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="Delhi NCR" className="text-slate-800">
                    Delhi NCR
                  </option>
                  <option value="Delhi - Kamla Nagar" className="text-slate-800">
                    Delhi (Kamla Nagar Lab)
                  </option>
                  <option value="Greater Noida" className="text-slate-800">
                    Greater Noida (Golf Foreste)
                  </option>
                  <option value="Noida" className="text-slate-800">
                    Noida Expressway
                  </option>
                  <option value="Ghaziabad" className="text-slate-800">
                    Ghaziabad
                  </option>
                </select>
              </div>

              {/* Callback Trigger */}
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded transition-colors"
              >
                Request Callback
              </button>

              {/* Direct Call Numbers */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:7982348151"
                  className="flex items-center gap-1 font-bold text-white hover:text-cyan-200 transition-colors"
                  title="Delhi Lab: 7982348151"
                >
                  <Phone className="w-3 h-3 text-cyan-300 animate-pulse" />
                  <span className="hidden sm:inline text-[11px] font-normal text-blue-200">Delhi:</span>
                  <span>7982348151</span>
                </a>
                <span className="text-blue-300">|</span>
                <a
                  href="tel:8796645850"
                  className="flex items-center gap-1 font-bold text-emerald-300 hover:text-white transition-colors"
                  title="Greater Noida (Aryan Saini): 8796645850"
                >
                  <Phone className="w-3 h-3 text-emerald-300" />
                  <span className="hidden md:inline text-[11px] font-normal text-emerald-200">Gr. Noida (Aryan Saini):</span>
                  <span>8796645850</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#0b3866] font-bold border-b-2 border-[#00a896]'
                      : 'text-slate-700 hover:text-[#0b3866]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-[#e63946] text-white rounded-full uppercase tracking-wider animate-bounce">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Quick Test & Package Search (Meditest style) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-colors ${
                isSearchOpen ? 'bg-cyan-100 text-[#00a896]' : 'text-slate-600 hover:text-[#0b3866] hover:bg-slate-50'
              }`}
              title="Search Tests & Packages (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <Link
              href="/booking"
              className="relative p-2 text-slate-700 hover:text-[#0b3866] hover:bg-slate-50 rounded-full transition-colors"
              title="View Cart & Booking"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e63946] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Patient Sign In / Account */}
            <Link
              href="/my-account"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 text-slate-700 hover:text-[#0b3866] border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#00a896]" />
              <span>Portal</span>
            </Link>

            {/* Upload Prescription Button */}
            <Link
              href="/prescription-upload"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-teal-50 hover:bg-teal-100 text-[#00a896] border border-teal-200 text-xs font-bold rounded-xl transition-all shadow-sm"
              title="Upload Prescription & Get Price"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upload Prescription</span>
            </Link>

            {/* Primary Book Test Button */}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0b3866] to-[#00a896] hover:from-[#092d52] hover:to-[#008f80] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Test</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-[#0b3866] hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Global Expandable Meditest-style Search Bar Panel */}
        {isSearchOpen && (
          <div className="bg-slate-50 border-t border-b border-slate-200 px-4 py-3 shadow-md animate-in fade-in slide-in-from-top-1">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <div className="flex-1">
                <SearchBar
                  variant="compact"
                  placeholder="Search for Test/Package (e.g. CBC, KFT, Full Body, Cardiac Profile...)"
                  onSelect={() => setIsSearchOpen(false)}
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                title="Close Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-xl animate-fade-in space-y-4">
            <div className="pb-1">
              <SearchBar
                variant="compact"
                placeholder="Search Test/Package..."
                onSelect={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold ${
                    pathname === link.href
                      ? 'bg-blue-50 text-[#0b3866]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-extrabold bg-[#e63946] text-white px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/my-account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-[#00a896]" />
                <span>Patient Account / Sign In</span>
              </Link>
              <Link
                href="/collector"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Phlebotomist / Collector Portal</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Lab Administrator Dashboard</span>
              </Link>
            </div>

            {/* Quick Mobile Call CTAs */}
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCallbackOpen(true);
                }}
                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Request Free Callback</span>
              </button>
              <a
                href="tel:8796645850"
                className="w-full py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00a896]" />
                <span>Helpline: 8796645850</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Callback Modal */}
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  );
}
