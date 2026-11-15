import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import { SERVICEABLE_AREAS } from '@/lib/data';

export default function LocationsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Verified Physical Centres
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Our Diagnostic Centres & Service Areas</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visit our laboratory centres in Delhi and Greater Noida or book certified home collection across Delhi NCR.
          </p>
        </div>

        {/* Physical Centres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="px-3 py-1 bg-blue-50 text-[#0b3866] text-xs font-bold rounded-full">
              Central Processing Laboratory
            </span>
            <h2 className="text-xl font-bold text-[#0b3866]">Main Branch — Delhi Hub</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Gali No. 3, New Chandrawal, Near Kamla Nagar Market, Delhi - 110007
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div><strong>Helplines:</strong> 7982348151 / 9953022493</div>
              <div><strong>Timing:</strong> 06:30 AM – 08:30 PM (Monday to Sunday)</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-teal-50 text-[#00a896] text-xs font-bold rounded-full">
                Collection Centre & Camp Hub
              </span>
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Camp: ₹1000 Package
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#0b3866]">Greater Noida Collection Centre</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              PF - 02 (Shop No. 2), Paramount Golf Forest Main Market, Zeta 1, Greater Noida, UP - 201308
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div><strong>Centre Incharge:</strong> <span className="font-semibold text-slate-800">Aryan Saini</span></div>
              <div><strong>Free Home Collection:</strong> <a href="tel:8796645850" className="font-bold text-[#0b3866] hover:text-[#00a896]">8796645850</a></div>
              <div><strong>Timing:</strong> 06:30 AM – 08:30 PM (Monday to Sunday)</div>
            </div>
            <div className="pt-2">
              <Link
                href="/packages/full-body-package-1000"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a896] hover:underline"
              >
                <span>View ₹1000 Full Body Camp Package & Poster</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Pincode Serviceability Table */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-[#0b3866]">Serviceable Home Collection PIN Codes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="p-3">PIN Code</th>
                  <th className="p-3">Locality / Covered Area</th>
                  <th className="p-3">City & State</th>
                  <th className="p-3">Home Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SERVICEABLE_AREAS.map((sa) => (
                  <tr key={sa.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-[#0b3866]">{sa.pincode}</td>
                    <td className="p-3 font-medium text-slate-800">{sa.areaName}</td>
                    <td className="p-3 text-slate-600">{sa.city}, {sa.state}</td>
                    <td className="p-3 font-bold text-emerald-600">Free Home Collection</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
