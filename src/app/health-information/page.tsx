import React from 'react';
import Link from 'next/link';
import { AlertCircle, FileText, ArrowRight } from 'lucide-react';

export default function HealthInformationPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider">
            Patient Health Education
          </span>
          <h1 className="text-3xl font-black text-[#0b3866] mt-1">Diagnostic Health Information</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            Understanding your laboratory test panels, biological reference ranges, and the importance of routine preventive screening.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong>Clinical Disclaimers:</strong> Information provided on this page is purely for educational awareness. Pathology parameters must be interpreted in conjunction with your personal clinical history, physical examination, and imaging findings by your treating registered medical practitioner.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-black text-[#0b3866]">1. Complete Blood Count (CBC) with ESR</h2>
            <p>
              A Complete Blood Count evaluates cellular components in whole blood. Red blood cells (RBCs) and Hemoglobin (Hb) carry oxygen throughout the body. White blood cells (WBCs) and differential counts (Neutrophils, Lymphocytes, Eosinophils) are essential for immune defense. Platelets are critical for blood clotting. An elevated ESR (Erythrocyte Sedimentation Rate) signifies non-specific inflammation or infection in the body.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-[#0b3866]">2. Lipid Profile (Cholesterol & Triglycerides)</h2>
            <p>
              The lipid profile is essential for assessing cardiovascular health and atherosclerosis risk. High-density lipoprotein (HDL) is known as &quot;good cholesterol&quot; because it transports cholesterol away from arteries, while elevated low-density lipoprotein (LDL) and triglycerides correlate with increased plaque deposition and coronary artery disease.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-[#0b3866]">3. Liver Function Test (LFT)</h2>
            <p>
              Assesses hepatic cellular integrity and biliary tract function. Bilirubin elevation indicates jaundice or hemolytic breakdown. Transaminases (SGOT/AST and SGPT/ALT) leak into the bloodstream when liver cells suffer injury, while Alkaline Phosphatase (ALP) reflects biliary excretion or bone remodeling.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-[#0b3866]">4. Kidney Function Test (KFT) and eGFR</h2>
            <p>
              Serum Creatinine and Blood Urea Nitrogen (BUN) reflect how efficiently the kidneys filter metabolic waste products. The estimated Glomerular Filtration Rate (eGFR) evaluates functional filtration capacity and detects early asymptomatic renal decline.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-[#0b3866]">5. Fasting Blood Sugar & HbA1c</h2>
            <p>
              Fasting Blood Sugar reflects acute glucose levels after overnight fasting. HbA1c (Glycated Hemoglobin) measures the proportion of red blood cell hemoglobin chemically bonded with glucose over a 90-day lifecycle, providing an accurate, long-term glycemic index independent of short-term dietary swings.
            </p>
          </section>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/packages/basic-health-package"
            className="px-6 py-3 bg-[#0b3866] text-white font-bold text-xs rounded-xl shadow"
          >
            Explore Basic Health Package (₹999)
          </Link>
          <Link
            href="/tests"
            className="px-6 py-3 bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
          >
            View All Tests
          </Link>
        </div>
      </div>
    </div>
  );
}
