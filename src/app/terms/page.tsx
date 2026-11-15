import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b3866]">Terms & Conditions of Service</h1>
        <p className="text-slate-500 text-xs">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Nature of Services</h2>
          <p>
            Sangam Diagnostics provides diagnostic testing, blood analysis, urine examination, and doorstep specimen phlebotomy services. We do not practice direct clinical medicine or replace primary consulting physicians.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Clinical Interpretation Notice</h2>
          <p>
            Diagnostic findings and biological parameter values must be interpreted exclusively in conjunction with individual clinical symptoms, patient history, and physical evaluation by a licensed registered medical practitioner. Sangam Diagnostics does not provide medical diagnoses directly to consumers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Appointments & Home Collection</h2>
          <p>
            While every effort is made to adhere to the chosen 90-minute time slot, unforeseen traffic conditions, emergency patient situations, or inclement weather may cause minor adjustments. Patients will be kept informed via SMS or direct phone call.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Fasting Adherence</h2>
          <p>
            Patients must comply with specified fasting protocols (typically 10 to 12 hours for lipid and fasting blood sugar profiles). Non-compliance may alter biochemical test parameters and require a paid re-draw.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, and any disputes shall fall under the jurisdiction of competent courts in Delhi.
          </p>
        </section>
      </div>
    </div>
  );
}
