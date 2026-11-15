'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, ShieldCheck, KeyRound, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtpNotice, setDevOtpNotice] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', mobile: cleanMobile }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch OTP.');
      }

      if (data.devOtp) {
        setDevOtpNotice(`Test Mode OTP: ${data.devOtp} (Or enter 123456)`);
        setOtp(data.devOtp); // auto-fill for testing convenience
      }
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', mobile: mobile.replace(/\D/g, ''), code: otp.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid OTP code.');
      }

      // Store patient session in localStorage
      localStorage.setItem('sangam_patient_token', data.sessionToken);
      localStorage.setItem('sangam_patient_mobile', data.mobile);

      router.push('/my-account');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <div className="text-center">
          <Logo size="md" className="justify-center mb-4" />
          <h1 className="text-2xl font-black text-[#0b3866]">Patient Portal Sign In</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your laboratory test reports, past bookings, and invoices securely.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {devOtpNotice && (
          <div className="p-3 bg-blue-50 text-[#0b3866] text-xs font-bold rounded-xl border border-blue-200">
            {devOtpNotice}
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enter 10-Digit Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 7982348151"
                  className="w-full px-4 py-3 rounded-r-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                We will send an encrypted One-Time Password via SMS.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0b3866] hover:bg-[#082848] text-white font-bold text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Sending OTP...' : 'Get Verification Code'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Enter 6-Digit OTP</label>
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="text-[11px] text-[#00a896] hover:underline"
                >
                  Change Mobile
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit OTP (or 123456)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-center text-lg font-mono font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-[#00a896] text-white font-bold text-sm rounded-xl shadow transition-colors"
            >
              {loading ? 'Verifying...' : 'Sign In to Portal'}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Patient data protected under high medical privacy standards.</span>
        </div>
      </div>
    </div>
  );
}
