'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      setError('Please provide your name, mobile number, and enquiry message.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/callbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          mobile: formData.mobile.replace(/\D/g, ''),
          testOfInterest: formData.subject || 'General Enquiry',
          notes: formData.message.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed to submit message.');
      setSubmitted(true);
      setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
    } catch {
      setError('Unable to send enquiry right now. Please call Aryan Saini at 8796645850 or 7982348151.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Contact Sangam Diagnostics</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Have questions about our ₹999 package, sample collection, or report delivery? Contact our patient support team.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Lab */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b3866] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0b3866]">Central Laboratory (Main Branch)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gali No. 3, New Chandrawal, Near Kamla Nagar Market, Delhi - 110007
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              Primary: <strong className="text-slate-800">7982348151 / 9953022493</strong>
            </div>
          </div>

          {/* Greater Noida Centre */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0b3866]">Greater Noida Collection Centre</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              PF - 02 (Shop No. 2), Paramount Golf Forest Main Market, Zeta 1, Greater Noida, UP - 201308
            </p>
            <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 space-y-1">
              <div>Incharge: <strong className="text-slate-800">Aryan Saini</strong></div>
              <div>Free Home Collection: <a href="tel:8796645850" className="font-bold text-[#0b3866] hover:text-[#00a896]">8796645850</a></div>
            </div>
          </div>

          {/* Hours & Email */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0b3866]">Operating Hours</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monday to Sunday: <strong className="text-slate-800">06:30 AM – 08:30 PM</strong>
              <br />
              Home sample pickups start early at 06:30 AM for fasting tests.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              Email: <a href="mailto:care.sangamdiagnostic@gmail.com" className="text-[#00a896] hover:underline font-semibold">care.sangamdiagnostic@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Form & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-[#0b3866] mb-1">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500 mb-6">
              Our medical coordinator will review your request and get back to you quickly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-base text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700 mt-1 mb-4">
                  Thank you for reaching out. We will connect with you on your mobile number shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#0b3866] text-white font-bold text-xs rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Home collection enquiry, Package enquiry"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message or Query *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what tests you need or ask any question..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Service Area Info */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#0b3866]">Service Area & Pincode Coverage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We provide direct, free home sample collection across key PIN codes in Delhi, Greater Noida, Noida, and Ghaziabad:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-800 block">Delhi Hub:</strong>
                <span className="text-slate-500">
                  110007 (Kamla Nagar, New Chandrawal), 110001 (Connaught Place), 110009 (GTB Nagar), 110033 (Azadpur), 110052 (Ashok Vihar), 110085 (Rohini)
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-800 block">Greater Noida & Noida Hub:</strong>
                <span className="text-slate-500">
                  201310 (Paramount Golf Foreste, Swarn Nagri), 201306 (Alpha/Beta), 201308 (Greater Noida West), 201301 (Noida Central), 201303 (Expressway)
                </span>
              </div>
            </div>

            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 text-xs text-teal-900 mt-4">
              <strong>Need home collection outside these PIN codes?</strong>
              <p className="mt-1 text-[11px] text-teal-800">
                Call Aryan Saini at 8796645850 or helpline at 7982348151. We coordinate special phlebotomist dispatches across the broader National Capital Region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
