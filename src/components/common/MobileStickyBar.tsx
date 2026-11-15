'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, MessageSquare, PhoneCall } from 'lucide-react';
import { CallbackModal } from './CallbackModal';

export function MobileStickyBar() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-4 gap-1.5 items-center">
          {/* 1. Direct Call */}
          <a
            href="tel:7982348151"
            className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-[#0b3866]"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0b3866] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold mt-0.5">Call Lab</span>
          </a>

          {/* 2. WhatsApp Direct Chat */}
          <a
            href="https://wa.me/918796645850?text=Hello%20Sangam%20Diagnostics,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20test."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-emerald-600"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
          </a>

          {/* 3. Request Callback */}
          <button
            onClick={() => setIsCallbackOpen(true)}
            className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-cyan-600"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold mt-0.5">Callback</span>
          </button>

          {/* 4. Book Test Primary Action */}
          <Link
            href="/booking"
            className="flex flex-col items-center justify-center py-1.5 px-1 bg-gradient-to-r from-[#0b3866] to-[#00a896] text-white rounded-xl shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] font-bold mt-0.5">Book Now</span>
          </Link>
        </div>
      </div>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  );
}
