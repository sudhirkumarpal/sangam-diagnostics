import React from 'react';

export default function RefundCancellationPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b3866]">Refund & Cancellation Policy</h1>
        <p className="text-slate-500 text-xs">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Cancellation by Patient</h2>
          <p>
            You may cancel or reschedule your home sample collection appointment without any fee up to 2 hours prior to the scheduled time slot. Simply call our customer care helpline at 7982348151.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Cancellation After Phlebotomist Dispatch</h2>
          <p>
            If a cancellation is requested after our phlebotomist has already arrived at your premises or is actively en route, a nominal transportation visit fee of ₹100 may be deducted from any refund amount.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Sample Collected</h2>
          <p>
            Once a blood or urine sample has been drawn, tagged, and transported into the analytical pipeline, bookings cannot be cancelled or refunded, as reagent consumption and laboratory processing have commenced.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Processing of Refunds</h2>
          <p>
            Eligible refunds for online payments are credited back to the original source method (UPI, credit/debit card, or bank account) within 5 to 7 business days following formal cancellation.
          </p>
        </section>
      </div>
    </div>
  );
}
