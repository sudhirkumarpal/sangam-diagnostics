'use client';

import React, { useState } from 'react';
import { PhoneCall, X, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageName?: string;
}

export function CallbackModal({ isOpen, onClose, defaultPackageName }: CallbackModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [preferredTime, setPreferredTime] = useState('Within 15 minutes');
  const [testOfInterest, setTestOfInterest] = useState(defaultPackageName || 'Basic Health Package ₹999');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/callbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: cleanMobile,
          preferredTime,
          testOfInterest,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Unable to submit request right now. Please call us directly at 7982348151.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setMobile('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b3866] to-[#00a896] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Request a Quick Callback</h3>
              <p className="text-xs text-cyan-100">Our medical coordinator calls in minutes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-1">Callback Requested!</h4>
              <p className="text-sm text-slate-600 mb-4">
                Thank you, <span className="font-semibold text-slate-800">{name}</span>. Our diagnostic expert will call you on{' '}
                <span className="font-semibold text-slate-800">+91 {mobile}</span> shortly.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 flex items-center justify-center gap-2 mb-6 border border-slate-100">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Operating hours: 06:30 AM – 08:30 PM (Mon–Sun)</span>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#0b3866] text-white font-medium rounded-xl hover:bg-[#082848] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00a896] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">10-Digit Mobile Number *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="7982348151"
                    className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00a896] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Test or Health Package of Interest</label>
                <input
                  type="text"
                  value={testOfInterest}
                  onChange={(e) => setTestOfInterest(e.target.value)}
                  placeholder="e.g. Basic Health Package ₹999, CBC, Lipid Profile"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00a896] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time for Call</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00a896] text-sm bg-white"
                >
                  <option value="Within 15 minutes">As soon as possible (within 15 mins)</option>
                  <option value="Morning (08:00 AM - 11:00 AM)">Morning (08:00 AM - 11:00 AM)</option>
                  <option value="Afternoon (11:00 AM - 03:00 PM)">Afternoon (11:00 AM - 03:00 PM)</option>
                  <option value="Evening (03:00 PM - 07:00 PM)">Evening (03:00 PM - 07:00 PM)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Your information is strictly private. Zero promotional spam.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-[#0b3866] to-[#00a896] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Call Me Back'}
              </button>

              <div className="text-center pt-1">
                <span className="text-xs text-slate-500">Or dial directly: </span>
                <a href="tel:7982348151" className="text-xs font-bold text-[#0b3866] hover:underline">
                  +91 7982348151
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
