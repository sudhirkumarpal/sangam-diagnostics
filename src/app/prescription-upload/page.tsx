'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  UploadCloud,
  FileText,
  Camera,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  RefreshCw,
  ArrowRight,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default function PrescriptionUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [patientMobile, setPatientMobile] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female' | 'other'>('male');
  const [consentGiven, setConsentGiven] = useState(false);
  const [selectedPresetHint, setSelectedPresetHint] = useState<string>('');

  // UI States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle File Selection
  const handleFileChange = (selectedFile: File | null) => {
    setErrorMessage('');
    if (!selectedFile) return;

    // Check size limit: 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('Selected file exceeds the 10MB limit. Please upload a smaller file.');
      return;
    }

    setFile(selectedFile);

    // Create preview if image
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!file) {
      setErrorMessage('Please upload a prescription image or PDF document.');
      return;
    }

    const cleanMobile = patientMobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for quotation delivery.');
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please check the consent box to authorize sensitive medical prescription processing.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    setProgressStage('Uploading prescription to secure private storage...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mobile', cleanMobile);
      formData.append('fullName', patientName.trim());
      formData.append('age', patientAge.trim());
      formData.append('gender', patientGender);
      formData.append('consentGiven', 'true');
      if (selectedPresetHint) {
        formData.append('ocrHintText', selectedPresetHint);
      }

      // Simulated Progress Animation
      setTimeout(() => {
        setUploadProgress(45);
        setProgressStage('Performing Optical Character Recognition (OCR)...');
      }, 600);

      setTimeout(() => {
        setUploadProgress(75);
        setProgressStage('Matching identified tests against Sangam Diagnostics Catalogue...');
      }, 1200);

      setTimeout(() => {
        setUploadProgress(90);
        setProgressStage('Calculating authoritative laboratory prices and quotation...');
      }, 1800);

      const res = await fetch('/api/prescriptions/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze prescription.');
      }

      setUploadProgress(100);
      setProgressStage('Quotation prepared successfully!');

      setTimeout(() => {
        router.push(data.redirectUrl || `/quotation/${data.quotationReference}`);
      }, 500);
    } catch (err: any) {
      setIsUploading(false);
      setErrorMessage(err.message || 'An error occurred during prescription analysis. Please try again.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0b3866]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Upload Prescription & Get Price</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2.5 rounded-2xl bg-teal-50 text-[#00a896] border border-teal-100">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#00a896] uppercase tracking-wider block">
                Instant AI Document Recognition
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0b3866]">
                Upload Prescription & Get Price
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Upload your doctor&apos;s prescription slip (JPG, PNG, or PDF). Our clinical test identification engine reads prescribed tests, maps them to Sangam Diagnostics&apos; official catalogue, and generates an itemized quotation with home collection pricing in seconds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Exact Catalogue Prices</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#00a896] flex-shrink-0" />
              <span>Private & NABL Compliant</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Quote Ready in Seconds</span>
            </div>
          </div>
        </div>

        {/* Main Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span>Step 1: Choose Prescription Document</span>
              <span className="text-xs font-normal text-slate-400">PDF, JPG, PNG (Max 10MB)</span>
            </h2>

            {!file ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-300 hover:border-[#00a896] rounded-2xl p-8 text-center transition-colors bg-slate-50/50 hover:bg-teal-50/20 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-12 h-12 text-[#00a896] mx-auto mb-3" />
                <h3 className="font-bold text-sm text-slate-800">
                  Click to Browse or Drag & Drop Prescription
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Supports camera photos, scanned copies, and digital PDF prescriptions
                </p>

                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0b3866] hover:bg-slate-50 shadow-sm flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select File</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-emerald-700 hover:bg-slate-50 shadow-sm flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Camera Capture</span>
                  </button>
                </div>

                {/* Hidden File Inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>
            ) : (
              /* Selected File Preview Box */
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {filePreviewUrl ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-white">
                      <Image
                        src={filePreviewUrl}
                        alt="Prescription preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-blue-100 text-[#0b3866] flex items-center justify-center flex-shrink-0 font-bold text-xs uppercase">
                      PDF
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-sm text-slate-800 truncate max-w-xs">
                      {file.name}
                    </h4>
                    <span className="text-xs text-slate-500 block">
                      {(file.size / 1024).toFixed(1)} KB • {file.type || 'Document'}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ready for analysis
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replace</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="px-3 py-2 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 hover:bg-red-100 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Presets for Demo / Sandbox Testing */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Clinical Presets for Testing (Optional)
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  {
                    label: 'Routine Health (CBC, Lipid, KFT, Sugar)',
                    text: 'Advise Blood Tests:\n1. Complete Blood Count (CBC)\n2. Lipid Profile\n3. Kidney Function Test (KFT)\n4. Blood Sugar Fasting',
                  },
                  {
                    label: 'Fever Screen (CBC, Widal, Urine R/M)',
                    text: 'Rx:\n1. CBC and ESR\n2. Widal Test\n3. Urine Routine & Microscopy\nTab Paracetamol 650mg',
                  },
                  {
                    label: 'Vitamins & Thyroid (Vit D, B12, T3 T4 TSH)',
                    text: 'Rx:\n- Vitamin D (25-OH)\n- Vitamin B12\n- Thyroid Profile (T3, T4, TSH)\n- Serum Calcium',
                  },
                  {
                    label: 'With Unclear Line (Routes to Pathologist Review)',
                    text: 'Rx:\n1. CBC\n2. Liver Function Test (LFT)\n3. Unclear scratchy line Dr. Test\n4. USG Abdomen',
                  },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPresetHint(preset.text);
                      if (!file) {
                        // Create a mock File object for convenience
                        const mockFile = new File(['Sample Prescription Content'], 'prescription-sample.jpg', {
                          type: 'image/jpeg',
                        });
                        handleFileChange(mockFile);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all ${
                      selectedPresetHint === preset.text
                        ? 'bg-[#0b3866] text-white border-[#0b3866]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Step 2: Patient & Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="e.g. 9811981100"
                    value={patientMobile}
                    onChange={(e) => setPatientMobile(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-r-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Your quotation link and updates will be sent to this number.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Arvind Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Age (Optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 45"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setPatientGender(g)}
                      className={`py-2 text-xs font-bold rounded-xl border capitalize transition-all ${
                        patientGender === g
                          ? 'bg-[#0b3866] text-white border-[#0b3866]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sensitive Health Information Consent Banner */}
          <div
            onClick={() => setConsentGiven(!consentGiven)}
            className={`rounded-3xl border p-5 cursor-pointer transition-all ${
              consentGiven
                ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30'
                : 'bg-amber-50 border-amber-200 hover:bg-amber-100/50'
            }`}
          >
            <div className="flex items-start gap-3 pointer-events-none">
              <input
                id="consent-checkbox"
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#00a896] focus:ring-[#00a896] cursor-pointer pointer-events-auto"
              />
              <label htmlFor="consent-checkbox" className="text-xs text-amber-900 leading-relaxed cursor-pointer select-none">
                <strong>Medical Data Privacy & Processing Consent:</strong> I confirm that I am uploading this medical prescription for test identification and price quotation by Sangam Diagnostics. I understand this document contains sensitive health information, which will be processed strictly in accordance with Indian healthcare privacy practices and will not be shared with unauthorized third parties.
              </label>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Upload Progress Overlay / Banner */}
          {isUploading && (
            <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#0b3866] flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00a896]" />
                  {progressStage}
                </span>
                <span className="text-slate-500">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00a896] to-[#0b3866] transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Please wait while our clinical matching engine evaluates the document.
              </p>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back to Homepage
            </Link>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0b3866] hover:bg-[#082848] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>Analyze Prescription & Generate Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Informational Help Box */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 text-xs text-slate-600 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
            <HelpCircle className="w-4 h-4 text-[#00a896]" />
            <span>How the Prescription Quotation Workflow Works</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
            <li><strong>Upload Document:</strong> Take a photo or upload your doctor&apos;s written prescription.</li>
            <li><strong>Automated Matching:</strong> Recognizes tests like CBC, LFT, KFT, Thyroid, Lipid Profile, and Sugar.</li>
            <li><strong>Authoritative Prices:</strong> Calculates individual charges and bundle packages at official Sangam Diagnostics rates.</li>
            <li><strong>Explicit Approval:</strong> Review the line items and click <strong>YES, PROCEED WITH BOOKING</strong> or <strong>NO, CANCEL</strong>.</li>
            <li><strong>Staff Verification:</strong> Any unreadable handwriting is sent directly to our laboratory pathologist team for free manual verification.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
