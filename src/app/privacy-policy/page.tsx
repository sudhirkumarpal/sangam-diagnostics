import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b3866]">Privacy & Patient Data Protection Policy</h1>
        <p className="text-slate-500 text-xs">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Sangam Diagnostics collects necessary personal and clinical information required exclusively for scheduling home sample collections, specimen processing, and delivering certified laboratory test reports. This includes patient full name, age, biological gender, contact telephone number, residential address, and optional doctor consultation notes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Medical Confidentiality & Security</h2>
          <p>
            All diagnostic test results and patient identifiers are treated as highly confidential medical records. We maintain role-based access restrictions so that laboratory personnel, pathologists, and phlebotomists access only the minimal information required to execute their specific responsibilities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Third-Party Disclosures</h2>
          <p>
            We do not sell, rent, or lease patient contact details or medical information to commercial marketing entities or data brokers. Data is shared exclusively with accredited laboratory partners, contracted phlebotomists for visit fulfillment, or when mandated by statutory public health authorities under Indian health regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Report Retention & Access</h2>
          <p>
            Digital diagnostic reports are retained securely in our encrypted database. Patients can access and download their verified reports using their authenticated mobile session or verified booking reference code.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Information</h2>
          <p>
            For privacy queries or record deletion requests, please contact our data grievance officer at{' '}
            <a href="mailto:care.sangamdiagnostic@gmail.com" className="text-[#00a896] underline font-semibold">
              care.sangamdiagnostic@gmail.com
            </a>{' '}
            or call 7982348151.
          </p>
        </section>
      </div>
    </div>
  );
}
