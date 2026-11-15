import React from 'react';
import Link from 'next/link';
import { HelpCircle, Phone, Calendar } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Booking & Scheduling',
      items: [
        {
          q: 'How do I book a home sample collection with Sangam Diagnostics?',
          a: 'You can select the ₹999 Basic Health Package, any other health package, or individual blood tests on our website, click "Book Now", choose your convenient morning or evening time slot, and enter your home address. You will receive an instant booking reference.',
        },
        {
          q: 'Is home sample collection really free?',
          a: 'Yes, home sample collection is 100% free for all orders of ₹500 and above throughout our serviceable areas in Delhi and Greater Noida NCR.',
        },
        {
          q: 'Can I book tests for family members?',
          a: 'Yes. During the booking step, you can specify the patient’s full name, age, and relationship (spouse, child, parent, etc.). You can also choose the couple package option for hair fall screening at ₹4,500.',
        },
      ],
    },
    {
      category: 'Fasting & Preparation',
      items: [
        {
          q: 'Which diagnostic tests require fasting?',
          a: 'Tests including Lipid Profile, Fasting Blood Sugar (FBS), and Comprehensive Liver/Kidney Function Tests (LFT/KFT) require 10 to 12 hours of overnight fasting. You may drink plain water.',
        },
        {
          q: 'Can I take my regular medications during fasting?',
          a: 'Blood pressure and cardiac medications can typically be taken with a sip of water unless specifically advised otherwise by your treating doctor. Mention all daily medications to our phlebotomist.',
        },
      ],
    },
    {
      category: 'Reports & Accuracy',
      items: [
        {
          q: 'When and how will I receive my diagnostic report?',
          a: 'Routine test reports and the Basic Health Package (₹999) are typically ready within 12 to 14 hours. You will receive a direct notification via SMS and WhatsApp, and you can view/download the doctor-signed PDF directly from our website under "Download Report".',
        },
        {
          q: 'Is Sangam Diagnostics an accredited laboratory?',
          a: 'Yes, Sangam Diagnostics operates under NABL accreditation standards (Certificate No. MC-7078) with all tests authenticated by certified MD Pathologists.',
        },
      ],
    },
    {
      category: 'Payment & Cancellations',
      items: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Cash on Collection, UPI (Google Pay, PhonePe, Paytm, BHIM), debit/credit cards, and netbanking.',
        },
        {
          q: 'How do I cancel or reschedule my appointment?',
          a: 'You can reschedule your slot by calling our helpline at 7982348151 at least 2 hours before the scheduled time slot without any cancellation penalty.',
        },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Patient Help Centre
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Everything you need to know about sample collection, test preparation, reports, and payments.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((sec, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-black text-[#0b3866] border-b border-slate-100 pb-3">
                {sec.category}
              </h2>
              <div className="space-y-4">
                {sec.items.map((item, i) => (
                  <div key={i} className="text-xs">
                    <h3 className="font-bold text-slate-900 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-[#00a896] flex-shrink-0 mt-0.5" />
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-slate-600 mt-1 pl-6 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b3866] text-white p-8 rounded-3xl text-center space-y-3">
          <h3 className="font-bold text-lg">Still Have Questions?</h3>
          <p className="text-xs text-cyan-100">
            Our medical coordinators are available from 06:30 AM to 08:30 PM every day.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="tel:7982348151"
              className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call: 7982348151</span>
            </a>
            <Link
              href="/booking"
              className="px-5 py-2.5 bg-white text-[#0b3866] font-bold text-xs rounded-xl shadow"
            >
              Book a Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
