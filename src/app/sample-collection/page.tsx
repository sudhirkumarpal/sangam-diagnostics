import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, CheckCircle2, Clock, AlertCircle, Phone } from 'lucide-react';

export default function SampleCollectionPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Safe & Hygienic Home Care
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Home Sample Collection Protocol</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            How Sangam Diagnostics ensures sterile vacutainer collection, temperature-controlled cold-chain logistics, and painless phlebotomy at your home.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-black text-[#0b3866] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Certified Phlebotomists & Strict Hygiene</span>
            </h2>
            <p>
              All our phlebotomists are medically trained certified technicians equipped with disposable sterile gloves, fresh alcohol swabs, and sealed single-use needles (BD Vacutainer systems). Needles are opened directly in front of the patient and safely discarded in puncture-proof sharps biohazard containers immediately after the blood draw.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-[#0b3866] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#00a896]" />
              <span>Cold-Chain Specimen Logistics</span>
            </h2>
            <p>
              To prevent analyte degradation, hemolysis, or metabolic changes in serum, samples are immediately barcode-tagged at the patient&apos;s bedside and transferred into insulated temperature-controlled cold boxes (maintained between 2°C and 8°C). The specimens are delivered directly to our central processing laboratory in New Chandrawal, Delhi.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-[#0b3866] flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Punctual Scheduling & Real-Time Tracking</span>
            </h2>
            <p>
              Home collection slots are available every 90 minutes starting from 06:30 AM to 06:00 PM. Once assigned, you can view your phlebotomist&apos;s name, vehicle number, and phone number directly from our tracking page.
            </p>
          </section>

          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-teal-900 text-xs">
            <strong>Free Home Collection:</strong> Orders of ₹500 and above qualify for completely free doorstep pickup across Delhi North, Greater Noida, Noida, and Ghaziabad.
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/booking"
            className="px-6 py-3 bg-[#0b3866] text-white font-bold text-xs rounded-xl shadow"
          >
            Book Home Sample Collection
          </Link>
          <a
            href="tel:8796645850"
            className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>Call Aryan Saini: 8796645850</span>
          </a>
        </div>
      </div>
    </div>
  );
}
