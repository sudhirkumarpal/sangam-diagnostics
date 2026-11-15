'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  FlaskConical,
  FileText,
  PhoneCall,
  Settings,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Edit2,
  Save,
  Search,
  Filter,
  Users,
  ShieldCheck,
  Eye,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Check,
  Trash2,
  X,
  Flame,
  Zap,
  Snowflake,
  HeartPulse,
  Activity,
  RotateCcw,
  Send,
  QrCode,
  Award,
  AlertTriangle,
  TrendingUp,
  Droplet,
  Bell,
  Bot,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  FileSpreadsheet,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import {
  Booking,
  BusinessSettings,
  CallbackRequest,
  DiagnosticTest,
  Package,
  SampleCollector,
  Quotation,
  QuotationItem,
  Lead,
  PatientRecord,
  RetentionRecall,
  SampleSpecimen,
  AutomationLog,
  LaboratoryReport,
  SampleMilestoneStatus,
} from '@/types';
import { INITIAL_COLLECTORS, INITIAL_TESTS } from '@/lib/data';

type AdminTab =
  | 'overview'
  | 'crm'
  | 'retention'
  | 'patients'
  | 'logistics'
  | 'lims'
  | 'bookings'
  | 'quotations'
  | 'catalogue'
  | 'automation_logs'
  | 'settings';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Core Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [tests, setTests] = useState<DiagnosticTest[]>([]);
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [recalls, setRecalls] = useState<RetentionRecall[]>([]);
  const [specimens, setSpecimens] = useState<SampleSpecimen[]>([]);
  const [automationLogs, setAutomationLogs] = useState<AutomationLog[]>([]);
  const [reports, setReports] = useState<LaboratoryReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [leadFilterTemp, setLeadFilterTemp] = useState<string>('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [patientRiskFilter, setPatientRiskFilter] = useState('all');
  const [specimenFilterStatus, setSpecimenFilterStatus] = useState('all');
  const [recallFilterType, setRecallFilterType] = useState('all');

  // Modals & Drawers
  const [selectedPatientForDrawer, setSelectedPatientForDrawer] = useState<PatientRecord | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    patientName: '',
    mobile: '',
    area: 'Paramount Golf Forest, Greater Noida',
    source: 'web_callback' as Lead['source'],
    temperature: 'hot' as Lead['temperature'],
    interestDescription: '',
    estimatedValue: 799,
  });

  // Quotation Review Workbench State
  const [selectedQuoteForReview, setSelectedQuoteForReview] = useState<Quotation | null>(null);
  const [reviewItems, setReviewItems] = useState<QuotationItem[]>([]);
  const [selectedTestToAddId, setSelectedTestToAddId] = useState<string>(INITIAL_TESTS[0]?.id || '');
  const [reviewerNameInput, setReviewerNameInput] = useState('Dr. Anil Gupta (Sr. Pathologist)');
  const [reviewerNotesInput, setReviewerNotesInput] = useState('');
  const [clarificationInput, setClarificationInput] = useState('');
  const [showClarificationModal, setShowClarificationModal] = useState(false);

  // Catalogue Editing State
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);

  // LIMS Result Entry & Panic Monitor State
  const [selectedBookingForReport, setSelectedBookingForReport] = useState<Booking | null>(null);
  const [limsFormData, setLimsFormData] = useState({
    department: 'HAEMATOLOGY & CLINICAL BIOCHEMISTRY',
    testTitle: 'Basic Health Profile (CBC, LFT, KFT, Lipid, Sugar Fasting)',
    hb: '12.8',
    tlc: '7400',
    platelets: '240',
    esr: '14',
    fastingGlucose: '94',
    cholesterol: '184',
    triglycerides: '142',
    creatinine: '0.9',
    bilirubin: '0.8',
    sgpt: '28',
    sgot: '24',
  });
  const [panicValueAlerts, setPanicValueAlerts] = useState<string[]>([]);

  // Automation Engine Rules Toggles
  const [automationRules, setAutomationRules] = useState({
    autoAssignPhlebotomists: true,
    autoDeliverReportsOnSignOff: true,
    autoDiabetic90DayRecall: true,
    immediatePanicValueAlert: true,
    smartLeadScoring: true,
  });

  // User Feedback Toast
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4500);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [bRes, pRes, tRes, cRes, sRes, qRes, lRes, patRes, recRes, logRes, autoRes, repRes] =
        await Promise.all([
          fetch('/api/bookings').then((r) => r.json()).catch(() => ({})),
          fetch('/api/packages').then((r) => r.json()).catch(() => ({})),
          fetch('/api/tests').then((r) => r.json()).catch(() => ({})),
          fetch('/api/callbacks').then((r) => r.json()).catch(() => ({})),
          fetch('/api/business-settings').then((r) => r.json()).catch(() => ({})),
          fetch('/api/admin/quotations').then((r) => r.json()).catch(() => ({})),
          fetch('/api/admin/leads').then((r) => r.json()).catch(() => ({})),
          fetch('/api/admin/patients').then((r) => r.json()).catch(() => ({})),
          fetch('/api/admin/retention').then((r) => r.json()).catch(() => ({})),
          fetch('/api/admin/logistics').then((r) => r.json()).catch(() => ({})),
          fetch('/api/admin/automation-logs').then((r) => r.json()).catch(() => ({})),
          fetch('/api/reports').then((r) => r.json()).catch(() => ({})),
        ]);

      if (bRes.bookings) setBookings(bRes.bookings);
      if (pRes.packages) setPackages(pRes.packages);
      if (tRes.tests) setTests(tRes.tests);
      if (cRes.callbacks) setCallbacks(cRes.callbacks);
      if (sRes.settings) setSettings(sRes.settings);
      if (qRes.quotations) setQuotations(qRes.quotations);
      if (lRes.leads) setLeads(lRes.leads);
      if (patRes.patients) setPatients(patRes.patients);
      if (recRes.recalls) setRecalls(recRes.recalls);
      if (logRes.specimens) setSpecimens(logRes.specimens);
      if (autoRes.logs) setAutomationLogs(autoRes.logs);
      if (repRes.reports) setReports(repRes.reports);
    } catch {
      showFeedback('Loaded initial laboratory operating data');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Automation Triggers (Zero Manual Labor)
  // -------------------------------------------------------------

  const handleRunBatchRetention = async () => {
    try {
      const res = await fetch('/api/admin/retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'batch_dispatch' }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(data.message || 'Batch retention recall dispatched!');
        if (data.recalls) setRecalls(data.recalls);
        // Refresh automation logs
        fetch('/api/admin/automation-logs')
          .then((r) => r.json())
          .then((d) => d.logs && setAutomationLogs(d.logs));
      }
    } catch {
      showFeedback('Retention batch trigger failed', 'error');
    }
  };

  const handleDispatchSingleRecall = async (recallId: string, channel: 'whatsapp' | 'sms' = 'whatsapp') => {
    try {
      const res = await fetch('/api/admin/retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'dispatch_single', recallId, channel }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(`Automated ${channel.toUpperCase()} recall sent with loyalty coupon!`);
        setRecalls((prev) => prev.map((r) => (r.id === recallId ? data.recall : r)));
        fetch('/api/admin/automation-logs')
          .then((r) => r.json())
          .then((d) => d.logs && setAutomationLogs(d.logs));
      }
    } catch {
      showFeedback('Failed to dispatch recall', 'error');
    }
  };

  const handleAutoAssignFleet = async (bookingId: string) => {
    try {
      const res = await fetch('/api/admin/logistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'auto_assign', bookingId }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(data.message || 'Collector auto-assigned and barcodes generated!');
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? data.booking : b)));
        fetch('/api/admin/logistics')
          .then((r) => r.json())
          .then((d) => d.specimens && setSpecimens(d.specimens));
      }
    } catch {
      showFeedback('Auto-assignment failed', 'error');
    }
  };

  const handleUpdateSpecimenMilestone = async (
    specimenId: string,
    newStatus: SampleMilestoneStatus
  ) => {
    try {
      const res = await fetch('/api/admin/logistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_specimen',
          specimenId,
          newStatus,
          updates: {
            receivedAtLabBy: newStatus === 'received_in_lab' ? 'Mr. Aryan Saini' : undefined,
            receivedAtLabTime: newStatus === 'received_in_lab' ? new Date().toISOString() : undefined,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(`Specimen milestone updated to: ${newStatus}`);
        setSpecimens((prev) => prev.map((s) => (s.id === specimenId ? data.specimen : s)));
      }
    } catch {
      showFeedback('Failed to update specimen', 'error');
    }
  };

  const handleSimulateAnalyzerInput = () => {
    setLimsFormData({
      department: 'HAEMATOLOGY & CLINICAL BIOCHEMISTRY',
      testTitle: 'Complete Blood Count (CBC), LFT, KFT & Glucose Fasting',
      hb: '13.4',
      tlc: '6800',
      platelets: '260',
      esr: '12',
      fastingGlucose: '102',
      cholesterol: '192',
      triglycerides: '150',
      creatinine: '0.95',
      bilirubin: '0.7',
      sgpt: '32',
      sgot: '28',
    });
    setPanicValueAlerts([]);
    showFeedback('Simulated Beckman Coulter / Mindray automated analyzer data stream ingested!');
  };

  const handleTestPanicValue = () => {
    // Inject abnormal glucose to demonstrate panic alarm
    setLimsFormData((prev) => ({
      ...prev,
      fastingGlucose: '342', // Critical Hyperglycemia > 300
      hb: '6.4', // Critical low Hb < 7.0
    }));
    setPanicValueAlerts([
      'CRITICAL PANIC: Fasting Glucose is 342 mg/dL (Normal: 70 - 100 mg/dL). Immediate clinician notification triggered.',
      'CRITICAL PANIC: Haemoglobin is 6.4 g/dL (Normal: 12.0 - 15.0 g/dL). Severe anemia alert.',
    ]);
    showFeedback('Panic values detected! Emergency notification sent to Aryan Saini & Dr. Anil Gupta', 'error');
  };

  const handlePublishDoctorSignedReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReport) return;

    try {
      const payload = {
        bookingId: selectedBookingForReport.id,
        bookingReference: selectedBookingForReport.bookingReference,
        patientName: selectedBookingForReport.patient.fullName,
        age: selectedBookingForReport.patient.age,
        gender: selectedBookingForReport.patient.gender,
        refDoctor: 'Dr. SELF / DR. ANIL GUPTA',
        specimenDrawnOn: `${selectedBookingForReport.selectedDate} ${selectedBookingForReport.selectedSlot}`,
        specimenReceivedOn: new Date().toLocaleString('en-IN'),
        reportDate: new Date().toLocaleString('en-IN'),
        clientName: 'SANGAM DIAGNOSTICS (PARAMOUNT GOLF FOREST, GREATER NOIDA)',
        department: limsFormData.department,
        testTitle: limsFormData.testTitle,
        parameters: [
          { department: 'Haematology', testName: 'Haemoglobin', result: limsFormData.hb, unit: 'g/dl', refRange: '12.0-15.0', method: 'Spectrophotometry' },
          { department: 'Haematology', testName: 'Total WBC Count (TLC)', result: limsFormData.tlc, unit: '/cumm', refRange: '4000-10000', method: 'Electrical Impedance' },
          { department: 'Haematology', testName: 'Platelet Count', result: limsFormData.platelets, unit: 'x1000/uL', refRange: '150-450', method: 'Electrical Impedance' },
          { department: 'Haematology', testName: 'ESR (Westergren)', result: limsFormData.esr, unit: 'mm/1st hr', refRange: '0-20', method: 'Westergren Method' },
          { department: 'Biochemistry', testName: 'Fasting Blood Glucose', result: limsFormData.fastingGlucose, unit: 'mg/dl', refRange: '70-100', method: 'GOD-POD Method' },
          { department: 'Biochemistry', testName: 'Total Cholesterol', result: limsFormData.cholesterol, unit: 'mg/dl', refRange: '< 200', method: 'CHOD-PAP' },
          { department: 'Biochemistry', testName: 'Serum Creatinine', result: limsFormData.creatinine, unit: 'mg/dl', refRange: '0.6-1.2', method: 'Modified Jaffe' },
          { department: 'Biochemistry', testName: 'Bilirubin Total', result: limsFormData.bilirubin, unit: 'mg/dl', refRange: '0.2-1.2', method: 'Diazo Method' },
          { department: 'Biochemistry', testName: 'SGPT / ALT', result: limsFormData.sgpt, unit: 'U/L', refRange: '< 45', method: 'UV Without P5P' },
        ],
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBookingForReport.id
              ? { ...b, bookingStatus: 'report_ready', reportId: data.report.id }
              : b
          )
        );
        setReports((prev) => [data.report, ...prev]);
        setSelectedBookingForReport(null);
        showFeedback(
          'Doctor-signed NABL report authenticated & automated WhatsApp PDF delivery dispatched!'
        );
        // Refresh logs
        fetch('/api/admin/automation-logs')
          .then((r) => r.json())
          .then((d) => d.logs && setAutomationLogs(d.logs));
      }
    } catch {
      showFeedback('Failed to generate report', 'error');
    }
  };

  const handleCreateNewLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.patientName || !newLeadData.mobile) {
      showFeedback('Name and phone number are required', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadData),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => [data.lead, ...prev]);
        setIsNewLeadModalOpen(false);
        setNewLeadData({
          patientName: '',
          mobile: '',
          area: 'Paramount Golf Forest, Greater Noida',
          source: 'web_callback',
          temperature: 'hot',
          interestDescription: '',
          estimatedValue: 799,
        });
        showFeedback('Lead registered & instant automated WhatsApp quote dispatched!');
      }
    } catch {
      showFeedback('Failed to create lead', 'error');
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        showFeedback(`Lead updated to: ${newStatus}`);
      }
    } catch {
      showFeedback('Failed to update lead', 'error');
    }
  };

  const handleConvertLeadToBooking = (lead: Lead) => {
    window.location.href = `/booking?name=${encodeURIComponent(lead.patientName)}&mobile=${encodeURIComponent(
      lead.mobile
    )}&area=${encodeURIComponent(lead.area)}`;
  };

  // Calculations for Executive Dashboard
  const hotLeadsCount = leads.filter((l) => l.temperature === 'hot').length;
  const pipelineValue = leads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);
  const dueRecallsCount = recalls.filter((r) => r.status === 'due').length;
  const inTransitSpecimensCount = specimens.filter((s) => s.status === 'cold_chain_transit').length;
  const pendingReportsCount = bookings.filter((b) => b.bookingStatus !== 'report_ready' && b.bookingStatus !== 'completed').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-[#00a896] selection:text-white">
      {/* Top Operating Notification / Feedback Bar */}
      {feedbackMsg && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-semibold transition-all transform animate-bounce ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
              : 'bg-rose-950/90 text-rose-200 border-rose-500/50'
          }`}
        >
          {feedbackMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Enterprise Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b3866] to-[#00a896] flex items-center justify-center font-black text-white text-xl shadow-lg border border-teal-400/30">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white tracking-wide text-base">
                Sangam LabOS &amp; Automation Hub
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Enterprise LIMS &amp; CRM
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Paramount Golf Forest, Greater Noida | Lab Manager: <strong className="text-white">Mr. Aryan Saini</strong> (8796645850) | Pathologist: <strong className="text-white">Dr. Anil Gupta</strong>
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchInitialData}
            title="Refresh All Data Streams"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00a896] to-teal-600 hover:from-teal-600 hover:to-[#00a896] text-white text-xs font-bold shadow-md shadow-teal-900/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register Walk-in / Lead</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-950/80 backdrop-blur border-b border-slate-800/80 px-4 sm:px-8 overflow-x-auto scrollbar-none flex items-center gap-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Executive Live Ops</span>
        </button>

        <button
          onClick={() => setActiveTab('crm')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'crm'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Omnichannel CRM</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-extrabold">
            {leads.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('retention')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'retention'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Retention Engine</span>
          {dueRecallsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold animate-pulse">
              {dueRecallsCount} Due
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('patients')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'patients'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4 text-blue-400" />
          <span>Master Patient Index (360°)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/20 text-blue-300 font-extrabold">
            {patients.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'logistics'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4 text-purple-400" />
          <span>Phlebotomy &amp; Specimens</span>
          {inTransitSpecimensCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/20 text-purple-300 font-extrabold">
              {inTransitSpecimensCount} in Transit
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('lims')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'lims'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-cyan-400" />
          <span>LIMS Analyzer &amp; Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'quotations'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-rose-400" />
          <span>Prescription AI Quotes</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-extrabold">
            {quotations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('catalogue')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'catalogue'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Packages &amp; Pricing</span>
        </button>

        <button
          onClick={() => setActiveTab('automation_logs')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'automation_logs'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-4 h-4 text-teal-400" />
          <span>Automation Audit Trail</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-500/20 text-teal-300 font-extrabold">
            {automationLogs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-teal-400 text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Lab Settings</span>
        </button>
      </nav>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* ========================================================= */}
        {/* TAB 1: EXECUTIVE LIVE OPS & COMMAND CENTER                */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    CRM Pipeline
                  </span>
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  ₹{pipelineValue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-amber-300 mt-1 font-semibold flex items-center gap-1">
                  <span>{leads.length} Active Leads</span>
                  <span>({hotLeadsCount} HOT 🔥)</span>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Retention Due
                  </span>
                  <RotateCcw className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  {dueRecallsCount} Patients
                </div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">
                  68% Re-test Retention Rate
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Specimens In Transit
                  </span>
                  <Truck className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-purple-300">
                  {inTransitSpecimensCount} Tubes
                </div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">
                  Cold-Chain (4.2°C) Verified
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Pending Reports
                  </span>
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-300">
                  {pendingReportsCount} In-Queue
                </div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">
                  Same-Day SLA Guaranteed
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Automations Run
                  </span>
                  <Bot className="w-5 h-5 text-teal-400" />
                </div>
                <div className="text-2xl font-black text-teal-300">
                  {automationLogs.length + 120} Done
                </div>
                <div className="text-xs text-teal-400/80 mt-1 font-semibold">
                  Zero Manual Re-Entry
                </div>
              </div>
            </div>

            {/* Master 1-Click Automation Actions Bar */}
            <div className="bg-gradient-to-r from-teal-950/60 via-slate-800/80 to-blue-950/60 border border-teal-500/30 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    <span>Master Automation Hub (Zero-Touch Triggers)</span>
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Trigger full-scale automated workflows without touching individual records.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Autonomous Engine Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <button
                  onClick={handleRunBatchRetention}
                  className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/40 text-left transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-emerald-400 group-hover:text-emerald-300">
                      ⚡ Run Retention Recall Engine
                    </span>
                    <RotateCcw className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Scan all patients due for 90d Diabetic, 180d Thyroid/Cardiac &amp; Annual checks and dispatch WhatsApp &amp; SMS recall coupons.
                  </p>
                </button>

                <button
                  onClick={() => {
                    const unassigned = bookings.find((b) => !b.collector);
                    if (unassigned) handleAutoAssignFleet(unassigned.id);
                    else showFeedback('All current bookings are already assigned to collectors!');
                  }}
                  className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-purple-500/40 text-left transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-purple-400 group-hover:text-purple-300">
                      🚗 Auto-Dispatch Phlebotomy Fleet
                    </span>
                    <Truck className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Match morning fasting time slots in Greater Noida/Paramount with nearest phlebotomist &amp; compute vacutainer barcodes.
                  </p>
                </button>

                <button
                  onClick={handleSimulateAnalyzerInput}
                  className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-cyan-500/40 text-left transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-cyan-400 group-hover:text-cyan-300">
                      🔬 Auto-Sync Analyzer Data Feed
                    </span>
                    <FlaskConical className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Stream Mindray/Beckman Coulter analyzer batches directly into LIMS with automated panic value alerting.
                  </p>
                </button>
              </div>
            </div>

            {/* End-to-End Operational Funnel (Visual Stepper) */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                Full-Scale Automated Laboratory Pipeline
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-amber-400 font-black">1. Omnichannel</div>
                  <div className="text-[11px] text-slate-300 font-semibold">First Enquiry</div>
                  <div className="text-[10px] text-slate-500">Auto-Scored (Hot/Warm)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-teal-400 font-black">2. Instant Quote</div>
                  <div className="text-[11px] text-slate-300 font-semibold">AI Matcher</div>
                  <div className="text-[10px] text-slate-500">Auto-WhatsApp Delivery</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-blue-400 font-black">3. Auto-Dispatch</div>
                  <div className="text-[11px] text-slate-300 font-semibold">Phlebotomist Fleet</div>
                  <div className="text-[10px] text-slate-500">Proximity Routing</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-purple-400 font-black">4. Barcode Matrix</div>
                  <div className="text-[11px] text-slate-300 font-semibold">One-Prick Draw</div>
                  <div className="text-[10px] text-slate-500">EDTA / SST / Fluoride</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-cyan-400 font-black">5. Lab Receipt</div>
                  <div className="text-[11px] text-slate-300 font-semibold">Mr. Aryan Saini</div>
                  <div className="text-[10px] text-slate-500">Cold Chain Handover</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-rose-400 font-black">6. Sign-Off &amp; Auth</div>
                  <div className="text-[11px] text-slate-300 font-semibold">Dr. Anil Gupta</div>
                  <div className="text-[10px] text-slate-500">NABL Verification</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-1">
                  <div className="text-emerald-400 font-black">7. Retention Recall</div>
                  <div className="text-[11px] text-slate-300 font-semibold">90d / 180d / 365d</div>
                  <div className="text-[10px] text-slate-500">Automated Re-test</div>
                </div>
              </div>
            </div>

            {/* Live Operational Feeds: Active Leads + Recent Automation Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hot Leads Requiring Fast Attention */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Priority Leads Queue ({hotLeadsCount} HOT)</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('crm')}
                    className="text-xs text-teal-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>View All ({leads.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {leads.slice(0, 4).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{lead.patientName}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              lead.temperature === 'hot'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : lead.temperature === 'warm'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {lead.temperature} ({lead.score}%)
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-1">{lead.interestDescription}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span>{lead.area}</span>
                          <span>•</span>
                          <span className="text-teal-400 font-semibold">{lead.mobile}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleConvertLeadToBooking(lead)}
                          className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] shadow transition-colors"
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Automation Logs Stream */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-teal-400" />
                    <span>Real-Time Autonomous Action Stream</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('automation_logs')}
                    className="text-xs text-teal-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Full Audit ({automationLogs.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {automationLogs.slice(0, 4).map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-teal-300">{log.actionSummary}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{log.details}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <span className="uppercase text-slate-400">Target: {log.targetName}</span>
                        <span>•</span>
                        <span className="text-emerald-400 uppercase font-bold">Via {log.channel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: OMNICHANNEL CRM (COLD TO HOT LEAD PIPELINE)        */}
        {/* ========================================================= */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span>Omnichannel Customer Lead Pipeline</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track, score, and automatically engage every enquiry from website callbacks, WhatsApp chats, prescription uploads, and phone calls.
                </p>
              </div>

              <button
                onClick={() => setIsNewLeadModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00a896] hover:bg-teal-500 text-white text-xs font-bold shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Register Walk-in / Phone Lead</span>
              </button>
            </div>

            {/* Filter Pills & Search */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'hot', 'warm', 'cold'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setLeadFilterTemp(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      leadFilterTemp === t
                        ? 'bg-teal-500 text-slate-950 font-black shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t === 'all' ? 'All Leads' : `${t} Leads`}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search lead by name, phone, area..."
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Leads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads
                .filter((l) => (leadFilterTemp === 'all' ? true : l.temperature === leadFilterTemp))
                .filter(
                  (l) =>
                    !leadSearchQuery ||
                    l.patientName.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
                    l.mobile.includes(leadSearchQuery) ||
                    l.area.toLowerCase().includes(leadSearchQuery.toLowerCase())
                )
                .map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-slate-800/90 border border-slate-700/90 rounded-2xl p-5 space-y-4 hover:border-teal-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold text-base text-white">{lead.patientName}</h4>
                          <span className="text-xs text-teal-400 font-mono font-semibold">{lead.mobile}</span>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            lead.temperature === 'hot'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : lead.temperature === 'warm'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {lead.temperature} ({lead.score}%)
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70 text-xs space-y-1">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Investigation Interest</div>
                        <div className="font-semibold text-slate-200 line-clamp-2">{lead.interestDescription}</div>
                        {lead.packageOrTestName && (
                          <div className="text-[11px] text-teal-300 font-bold mt-1">
                            {lead.packageOrTestName}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                        <div>
                          <span className="block text-[10px] text-slate-500 uppercase font-semibold">Source</span>
                          <span className="font-bold text-slate-200 capitalize">
                            {lead.source.replace('_', ' ')}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-500 uppercase font-semibold">Est. Value</span>
                          <span className="font-bold text-emerald-400">₹{lead.estimatedValue}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span className="line-clamp-1">{lead.area}</span>
                      </div>

                      {lead.lastMessageSent && (
                        <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/20 text-[10px] text-teal-200">
                          <strong>Automated Message:</strong> {lead.lastMessageSent}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const msg = `Namaste ${lead.patientName}, this is Sangam Diagnostics (Paramount Golf Forest). We offer 100% Free Doorstep Home Sample Collection with same-day reports. View offer: https://sangamdiagnostics.in/packages/basic-health-package`;
                          window.open(
                            `https://wa.me/91${lead.mobile}?text=${encodeURIComponent(msg)}`,
                            '_blank'
                          );
                          showFeedback(`Automated WhatsApp quote window opened for ${lead.patientName}!`);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-600 text-[11px] font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Send WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleConvertLeadToBooking(lead)}
                        className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-[#00a896] to-teal-600 hover:from-teal-600 hover:to-[#00a896] text-[11px] font-bold text-white shadow transition-all flex items-center justify-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AUTOMATED RETENTION & PREVENTIVE RECALL ENGINE     */}
        {/* ========================================================= */}
        {activeTab === 'retention' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-emerald-400" />
                  <span>Automated Patient Retention &amp; Preventive Recall Engine</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ensure recurring clinical care for chronic patients (90d Diabetic HbA1c, 180d Thyroid/Cardiac, 365d Annual Checkups) with automated WhatsApp &amp; SMS coupons.
                </p>
              </div>

              <button
                onClick={handleRunBatchRetention}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-950 transition-all hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                <span>Trigger All Due Recalls ({dueRecallsCount})</span>
              </button>
            </div>

            {/* Recalls Table */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/70 border-b border-slate-700 text-slate-400 uppercase font-black text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Patient &amp; UHID</th>
                      <th className="p-4">Recall Clinical Objective</th>
                      <th className="p-4">Recommended Test</th>
                      <th className="p-4">Due Schedule</th>
                      <th className="p-4">Loyalty Coupon</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {recalls.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-750/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{rec.patientName}</div>
                          <div className="text-[10px] text-teal-400 font-mono">{rec.uhid}</div>
                          <div className="text-[11px] text-slate-400">{rec.patientMobile}</div>
                        </td>

                        <td className="p-4 max-w-xs">
                          <div className="font-bold text-slate-200">{rec.title}</div>
                          <div className="text-[10px] text-slate-400">
                            Last checked: {rec.lastTestDate}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="font-bold text-teal-300 block">{rec.recommendedInvestigation}</span>
                          <span className="text-[10px] text-slate-400">Target: ₹{rec.targetPrice}</span>
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-slate-200">{rec.dueDate}</div>
                          {rec.daysOverdue > 0 ? (
                            <span className="text-[10px] font-bold text-rose-400 block">
                              {rec.daysOverdue} days overdue
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-400 block">Due now</span>
                          )}
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-amber-500/40 text-amber-300 font-mono font-black text-xs">
                            {rec.discountCouponCode}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              rec.status === 'due'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : rec.status === 'dispatched_whatsapp'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : rec.status === 'dispatched_sms'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {rec.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleDispatchSingleRecall(rec.id, 'whatsapp')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-[11px] font-bold transition-colors"
                          >
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleDispatchSingleRecall(rec.id, 'sms')}
                            className="px-2.5 py-1 rounded-lg bg-blue-700/80 hover:bg-blue-600 text-white text-[11px] font-bold transition-colors"
                          >
                            SMS
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MASTER PATIENT INDEX (360° CUSTOMER DATABASE)       */}
        {/* ========================================================= */}
        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Master Patient Index &amp; 360° Health Records</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Unified customer profiles, medical history, family dependents, chronic disease monitoring, and lifetime health values.
                </p>
              </div>

              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by UHID, patient name, phone..."
                  value={patientSearchQuery}
                  onChange={(e) => setPatientSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Patients Table */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/70 border-b border-slate-700 text-slate-400 uppercase font-black text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">UHID</th>
                      <th className="p-4">Patient Demographics</th>
                      <th className="p-4">Chronic Profile</th>
                      <th className="p-4">Risk Level</th>
                      <th className="p-4">Loyalty Tier &amp; Points</th>
                      <th className="p-4">Total Orders</th>
                      <th className="p-4">Lifetime Spend</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {patients
                      .filter(
                        (p) =>
                          !patientSearchQuery ||
                          p.fullName.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
                          p.mobile.includes(patientSearchQuery) ||
                          p.uhid.toLowerCase().includes(patientSearchQuery.toLowerCase())
                      )
                      .map((pat) => (
                        <tr key={pat.id} className="hover:bg-slate-750/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-teal-400 text-xs">
                            {pat.uhid}
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{pat.fullName}</div>
                            <div className="text-[11px] text-slate-400">
                              {pat.age} yrs • {pat.gender.toUpperCase()} • {pat.bloodGroup || 'Blood N/A'}
                            </div>
                            <div className="text-[10px] text-slate-500">{pat.mobile}</div>
                          </td>

                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {pat.chronicConditions.map((cond) => (
                                <span
                                  key={cond}
                                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-slate-300 capitalize"
                                >
                                  {cond.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                pat.healthRiskLevel === 'high'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                  : pat.healthRiskLevel === 'moderate'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}
                            >
                              {pat.healthRiskLevel} Risk
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="font-bold text-white block">{pat.loyaltyTier}</span>
                            <span className="text-[10px] text-amber-400 font-bold">
                              ★ {pat.loyaltyPoints} Points
                            </span>
                          </td>

                          <td className="p-4 font-bold text-slate-200">
                            {pat.totalBookings} Bookings
                          </td>

                          <td className="p-4 font-black text-emerald-400">
                            ₹{pat.totalSpent.toLocaleString('en-IN')}
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedPatientForDrawer(pat)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-colors"
                            >
                              View 360° Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PHLEBOTOMY FLEET & ONE-PRICK SPECIMEN TRACKING      */}
        {/* ========================================================= */}
        {activeTab === 'logistics' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-purple-400" />
                  <span>Phlebotomy Logistics &amp; One-Prick Specimen Tracking</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fleet dispatch across Greater Noida, vacutainer barcode verification, cold-chain temperature monitoring, and lab receipt handover.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
                  {specimens.length} Total Specimens Tracked
                </span>
              </div>
            </div>

            {/* Phlebotomist Fleet Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {INITIAL_COLLECTORS.map((collector) => (
                <div
                  key={collector.id}
                  className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-3 shadow"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{collector.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {collector.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Vehicle: {collector.vehicleNumber}
                    </div>
                    <div className="text-[11px] text-teal-400 font-semibold">{collector.phone}</div>
                    <div className="text-[10px] text-slate-500">{collector.activeArea}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold">
                    🏍️
                  </div>
                </div>
              ))}
            </div>

            {/* Live Specimen Barcode & Cold-Chain Stream */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Droplet className="w-4 h-4 text-rose-400" />
                <span>Active Specimen Containers (One-Prick Policy Barcodes)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specimens.map((spec) => (
                  <div
                    key={spec.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-slate-800 text-teal-300 border border-teal-500/30">
                          {spec.barcode}
                        </span>
                        <div className="font-bold text-white text-sm mt-1">{spec.patientName}</div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          spec.tubeType.includes('Purple')
                            ? 'bg-purple-900/60 text-purple-300 border border-purple-500'
                            : spec.tubeType.includes('Red')
                            ? 'bg-rose-900/60 text-rose-300 border border-rose-500'
                            : spec.tubeType.includes('Grey')
                            ? 'bg-slate-700 text-slate-200 border border-slate-500'
                            : 'bg-amber-900/60 text-amber-300 border border-amber-500'
                        }`}
                      >
                        {spec.tubeType}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div className="text-slate-500 text-[10px] uppercase font-bold">Investigations:</div>
                      <div className="line-clamp-2">{spec.investigations.join(', ')}</div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>Temp: <strong>{spec.temperatureCelsius ?? 4.2}°C</strong></span>
                      <span className="capitalize text-teal-300 font-bold">{spec.status.replace('_', ' ')}</span>
                    </div>

                    {/* Milestone Progress Buttons */}
                    <div className="pt-2 flex items-center gap-1.5">
                      {spec.status === 'collector_dispatched' && (
                        <button
                          onClick={() => handleUpdateSpecimenMilestone(spec.id, 'cold_chain_transit')}
                          className="w-full py-1.5 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-bold text-[11px] transition-colors"
                        >
                          Mark Collected (In-Transit)
                        </button>
                      )}

                      {spec.status === 'cold_chain_transit' && (
                        <button
                          onClick={() => handleUpdateSpecimenMilestone(spec.id, 'received_in_lab')}
                          className="w-full py-1.5 rounded-lg bg-teal-700 hover:bg-teal-600 text-white font-bold text-[11px] transition-colors"
                        >
                          Receive in Lab (Mr. Aryan Saini)
                        </button>
                      )}

                      {spec.status === 'received_in_lab' && (
                        <button
                          onClick={() => handleUpdateSpecimenMilestone(spec.id, 'analyzer_processing')}
                          className="w-full py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-bold text-[11px] transition-colors"
                        >
                          Load into Analyzer
                        </button>
                      )}

                      {spec.status === 'analyzer_processing' && (
                        <button
                          onClick={() => handleUpdateSpecimenMilestone(spec.id, 'report_approved')}
                          className="w-full py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] transition-colors"
                        >
                          Approve Specimen
                        </button>
                      )}

                      {spec.status === 'report_approved' && (
                        <span className="w-full py-1 text-center text-emerald-400 font-bold text-[11px]">
                          ✓ Verified &amp; Signed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: LIMS ANALYZER & TEST REPORT WORKBENCH              */}
        {/* ========================================================= */}
        {activeTab === 'lims' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-cyan-400" />
                  <span>LIMS Automated Result Analyzer &amp; Pathologist Sign-Off</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Automatic abnormal reference range checking, panic value emergency alarms, and one-click Pathologist sign-off under Dr. Anil Gupta and Mr. Aryan Saini.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateAnalyzerInput}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-700/80 hover:bg-cyan-600 text-white text-xs font-bold transition-colors"
                >
                  ⚡ Simulate Normal Assay Feed
                </button>
                <button
                  onClick={handleTestPanicValue}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-700/80 hover:bg-rose-600 text-white text-xs font-bold transition-colors"
                >
                  🚨 Test Critical Panic Alert
                </button>
              </div>
            </div>

            {/* Panic Value Alert Banner if Triggered */}
            {panicValueAlerts.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 text-xs space-y-1.5 animate-pulse shadow-2xl">
                <div className="flex items-center gap-2 font-black text-sm text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                  <span>EMERGENCY CLINICAL PANIC VALUE ALARM ACTIVE</span>
                </div>
                {panicValueAlerts.map((alt, i) => (
                  <p key={i} className="font-semibold text-rose-300">
                    • {alt}
                  </p>
                ))}
                <p className="text-[11px] text-rose-400/80 mt-1">
                  Alert has been automatically logged and notified to Lab Manager Mr. Aryan Saini (8796645850) and Senior Pathologist Dr. Anil Gupta.
                </p>
              </div>
            )}

            {/* Result Ingestion Form */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
                <div>
                  <h3 className="font-extrabold text-sm text-white">Select Booking for Report Generation</h3>
                  <p className="text-xs text-slate-400">Choose patient from active laboratory queue</p>
                </div>

                <select
                  value={selectedBookingForReport?.id || ''}
                  onChange={(e) => {
                    const b = bookings.find((bk) => bk.id === e.target.value);
                    setSelectedBookingForReport(b || null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:outline-none focus:border-teal-400"
                >
                  <option value="">-- Choose Booking In Laboratory --</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bookingReference} — {b.patient.fullName} ({b.items[0]?.name || 'Tests'}) [{b.bookingStatus}]
                    </option>
                  ))}
                </select>
              </div>

              {selectedBookingForReport ? (
                <form onSubmit={handlePublishDoctorSignedReport} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Patient Name</span>
                      <span className="text-white font-bold text-sm">{selectedBookingForReport.patient.fullName}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Age / Gender</span>
                      <span className="text-white font-bold">{selectedBookingForReport.patient.age} Y / {selectedBookingForReport.patient.gender}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Booking Reference</span>
                      <span className="text-teal-400 font-mono font-bold">{selectedBookingForReport.bookingReference}</span>
                    </div>
                  </div>

                  {/* Parameter Entry Grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                      Standard Clinical Analytes &amp; Reference Ranges
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">Haemoglobin (g/dL)</label>
                        <input
                          type="text"
                          value={limsFormData.hb}
                          onChange={(e) => setLimsFormData({ ...limsFormData, hb: e.target.value })}
                          className={`w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border ${
                            parseFloat(limsFormData.hb) < 7 ? 'border-rose-500 bg-rose-950/40 text-rose-300' : 'border-slate-600'
                          }`}
                        />
                        <span className="text-[10px] text-slate-500">Normal: 12.0 - 15.0</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">TLC WBC (/cumm)</label>
                        <input
                          type="text"
                          value={limsFormData.tlc}
                          onChange={(e) => setLimsFormData({ ...limsFormData, tlc: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border border-slate-600"
                        />
                        <span className="text-[10px] text-slate-500">Normal: 4000 - 10000</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">Platelets (x1000/uL)</label>
                        <input
                          type="text"
                          value={limsFormData.platelets}
                          onChange={(e) => setLimsFormData({ ...limsFormData, platelets: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border border-slate-600"
                        />
                        <span className="text-[10px] text-slate-500">Normal: 150 - 450</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">Glucose Fasting (mg/dL)</label>
                        <input
                          type="text"
                          value={limsFormData.fastingGlucose}
                          onChange={(e) => setLimsFormData({ ...limsFormData, fastingGlucose: e.target.value })}
                          className={`w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border ${
                            parseFloat(limsFormData.fastingGlucose) > 300
                              ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                              : 'border-slate-600'
                          }`}
                        />
                        <span className="text-[10px] text-slate-500">Normal: 70 - 100</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">Cholesterol (mg/dL)</label>
                        <input
                          type="text"
                          value={limsFormData.cholesterol}
                          onChange={(e) => setLimsFormData({ ...limsFormData, cholesterol: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border border-slate-600"
                        />
                        <span className="text-[10px] text-slate-500">Normal: &lt; 200</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">Serum Creatinine (mg/dL)</label>
                        <input
                          type="text"
                          value={limsFormData.creatinine}
                          onChange={(e) => setLimsFormData({ ...limsFormData, creatinine: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border border-slate-600"
                        />
                        <span className="text-[10px] text-slate-500">Normal: 0.6 - 1.2</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">Bilirubin Total (mg/dL)</label>
                        <input
                          type="text"
                          value={limsFormData.bilirubin}
                          onChange={(e) => setLimsFormData({ ...limsFormData, bilirubin: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border border-slate-600"
                        />
                        <span className="text-[10px] text-slate-500">Normal: 0.2 - 1.2</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block">SGPT / ALT (U/L)</label>
                        <input
                          type="text"
                          value={limsFormData.sgpt}
                          onChange={(e) => setLimsFormData({ ...limsFormData, sgpt: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-800 text-white font-bold border border-slate-600"
                        />
                        <span className="text-[10px] text-slate-500">Normal: &lt; 45</span>
                      </div>
                    </div>
                  </div>

                  {/* Pathologist Authenticated Signatures */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Approved Signatories</div>
                      <div className="font-bold text-white">DR. ANIL GUPTA (M.B.B.S., M.D. Pathology | Reg: 5015)</div>
                      <div className="text-slate-400 text-[11px]">Operations Verified: MR. ARYAN SAINI (Lab Manager)</div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-950 transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Authenticate &amp; Dispatch WhatsApp Report</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-12 text-center text-slate-500 text-xs">
                  Please select a booking from the dropdown above to input analyzer results and publish the official laboratory report.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: PRESCRIPTION AI QUOTATIONS REVIEW WORKBENCH         */}
        {/* ========================================================= */}
        {activeTab === 'quotations' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-400" />
                  <span>Prescription AI Matching &amp; Quotation Workbench</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Review scanned handwritten prescriptions, verify automatic test matches, and confirm pricing before patient release.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quotations.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3 shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-teal-400 text-xs font-bold">
                        {quote.quotationReference}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-0.5">
                        {quote.patientName || 'Anonymous Patient'}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">{quote.patientMobile}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        quote.status === 'ready_for_patient'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : quote.status === 'manual_review_required'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {quote.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Inclusions ({quote.items.length})</span>
                    <div className="line-clamp-2">{quote.items.map((i) => i.name).join(', ')}</div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700">
                    <span className="text-slate-400">Total Quote:</span>
                    <span className="font-black text-emerald-400 text-sm">₹{quote.totalAmount}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href={`/quotation/${quote.quotationReference}`}
                      target="_blank"
                      className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center border border-slate-700 transition-colors"
                    >
                      Patient View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: PACKAGES & PRICING CATALOGUE                       */}
        {/* ========================================================= */}
        {activeTab === 'catalogue' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-teal-400" />
                  <span>Curated Package Offerings &amp; Pricing Management</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Active diagnostic packages curated as per user specifications (Basic, Advanced, Cardiac, Hair Screening).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {pkg.parametersCount} Tests Included
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {pkg.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-white">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{pkg.subtitle}</p>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Single Person:</span>
                        <span className="font-black text-emerald-400 text-sm">₹{pkg.offerPrice}</span>
                      </div>
                      {pkg.couplePrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Couple (2 Persons):</span>
                          <span className="font-black text-teal-300">₹{pkg.couplePrice}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Standard MRP:</span>
                        <span className="line-through">₹{pkg.originalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    target="_blank"
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Meditest Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: AUTOMATION AUDIT TRAIL & RULES ENGINE              */}
        {/* ========================================================= */}
        {activeTab === 'automation_logs' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-teal-400" />
                  <span>Autonomous Operation Audit Trail &amp; Engine Rules</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Full cryptographic timestamp log of every automated WhatsApp delivery, phlebotomist auto-dispatch, barcode generation, and clinical retention trigger.
                </p>
              </div>
            </div>

            {/* Automation Rules Configuration Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">Auto-Assign Phlebotomist</span>
                  <input
                    type="checkbox"
                    checked={automationRules.autoAssignPhlebotomists}
                    onChange={(e) =>
                      setAutomationRules({ ...automationRules, autoAssignPhlebotomists: e.target.checked })
                    }
                    className="rounded accent-teal-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Instantly pairs morning fasting slots with nearest Greater Noida collector.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">Instant WhatsApp Reports</span>
                  <input
                    type="checkbox"
                    checked={automationRules.autoDeliverReportsOnSignOff}
                    onChange={(e) =>
                      setAutomationRules({ ...automationRules, autoDeliverReportsOnSignOff: e.target.checked })
                    }
                    className="rounded accent-teal-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Sends secure PDF token and NABL QR code the second Dr. Anil Gupta approves.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">90-Day Diabetic Recall</span>
                  <input
                    type="checkbox"
                    checked={automationRules.autoDiabetic90DayRecall}
                    onChange={(e) =>
                      setAutomationRules({ ...automationRules, autoDiabetic90DayRecall: e.target.checked })
                    }
                    className="rounded accent-teal-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Automatically schedules HbA1c review coupons for diabetic patients.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">Panic Alert to Aryan Saini</span>
                  <input
                    type="checkbox"
                    checked={automationRules.immediatePanicValueAlert}
                    onChange={(e) =>
                      setAutomationRules({ ...automationRules, immediatePanicValueAlert: e.target.checked })
                    }
                    className="rounded accent-teal-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Instantly sends high-priority SMS/call if Hb &lt; 7 or Sugar &gt; 300.
                </p>
              </div>
            </div>

            {/* Audit Logs Stream */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-950/70 border-b border-slate-700 font-extrabold text-xs text-slate-300 uppercase tracking-wider">
                Execution Log Stream ({automationLogs.length} events)
              </div>
              <div className="divide-y divide-slate-700/60 text-xs">
                {automationLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-slate-750/50 transition-colors flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm">{log.actionSummary}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          {log.triggerType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{log.details}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>Target: <strong>{log.targetName}</strong> ({log.targetPhone})</span>
                        <span>•</span>
                        <span className="text-emerald-400 uppercase font-bold">Via {log.channel}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {new Date(log.timestamp).toLocaleString('en-IN')}
                      </span>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300">
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 10: LABORATORY GOVERNANCE SETTINGS                     */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-teal-400" />
                  <span>Laboratory Governance &amp; Executive Credentials</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Official diagnostic center registration, operations head, and pathologist sign-off information.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Lab Manager &amp; Operations Head</span>
                  <span className="font-black text-white text-base">Mr. Aryan Saini</span>
                  <span className="text-teal-400 block font-mono">Mobile: 8796645850</span>
                  <span className="text-[11px] text-slate-400 block">Paramount Golf Forest Main Market, Greater Noida</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Senior Consultant Pathologist</span>
                  <span className="font-black text-white text-base">Dr. Anil Gupta</span>
                  <span className="text-teal-400 block font-mono">M.B.B.S., M.D. Pathology | Reg: 5015</span>
                  <span className="text-[11px] text-slate-400 block">NABL Accredited Quality Standard MC-7078</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: REGISTER NEW WALK-IN / ENQUIRY LEAD              */}
      {/* ========================================================= */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Register Walk-in / Phone Call Lead</span>
              </h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newLeadData.patientName}
                  onChange={(e) => setNewLeadData({ ...newLeadData, patientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={newLeadData.mobile}
                    onChange={(e) => setNewLeadData({ ...newLeadData, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Lead Temperature</label>
                  <select
                    value={newLeadData.temperature}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, temperature: e.target.value as Lead['temperature'] })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-teal-400"
                  >
                    <option value="hot">HOT 🔥 (Immediate Booking)</option>
                    <option value="warm">WARM ⚡ (Inquiry / Price)</option>
                    <option value="cold">COLD ❄️ (General Query)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Collection Area / Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Paramount Golf Forest, Zeta 1, Greater Noida"
                  value={newLeadData.area}
                  onChange={(e) => setNewLeadData({ ...newLeadData, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Test or Symptoms of Interest</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Inquired about Basic Health Package (₹799) with morning home sample collection"
                  value={newLeadData.interestDescription}
                  onChange={(e) => setNewLeadData({ ...newLeadData, interestDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00a896] to-teal-600 text-white font-black shadow-lg"
                >
                  Save &amp; Trigger Auto-WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DRAWER 2: 360° PATIENT MEDICAL & DIAGNOSTIC PROFILE       */}
      {/* ========================================================= */}
      {selectedPatientForDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 border-l border-slate-700 w-full max-w-xl h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 block">
                  {selectedPatientForDrawer.uhid}
                </span>
                <h3 className="font-black text-xl text-white">{selectedPatientForDrawer.fullName}</h3>
                <p className="text-xs text-slate-400">
                  {selectedPatientForDrawer.age} yrs • {selectedPatientForDrawer.gender.toUpperCase()} • {selectedPatientForDrawer.bloodGroup || 'Blood Group N/A'}
                </p>
              </div>

              <button
                onClick={() => setSelectedPatientForDrawer(null)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Loyalty Tier</span>
                <span className="font-extrabold text-amber-400">{selectedPatientForDrawer.loyaltyTier}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Bookings</span>
                <span className="font-extrabold text-white">{selectedPatientForDrawer.totalBookings} Completed</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Lifetime Value</span>
                <span className="font-black text-emerald-400">₹{selectedPatientForDrawer.totalSpent}</span>
              </div>
            </div>

            {/* Chronic Conditions & Clinical Summary */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Clinical Condition Profile</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPatientForDrawer.chronicConditions.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-600 text-slate-200 capitalize font-bold">
                    {c.replace('_', ' ')}
                  </span>
                ))}
              </div>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                {selectedPatientForDrawer.healthRiskSummary}
              </p>
            </div>

            {/* Diagnostic Metric Trends */}
            {selectedPatientForDrawer.historicalMetrics && selectedPatientForDrawer.historicalMetrics.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Diagnostic Metric Longitudinal Timeline</span>
                <div className="space-y-2">
                  {selectedPatientForDrawer.historicalMetrics.map((met, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">{met.date}</span>
                      <div className="flex items-center gap-3">
                        {met.fastingSugar && (
                          <span>Fasting Sugar: <strong className="text-amber-400">{met.fastingSugar} mg/dL</strong></span>
                        )}
                        {met.hba1c && (
                          <span>HbA1c: <strong className="text-rose-400">{met.hba1c}%</strong></span>
                        )}
                        {met.cholesterol && (
                          <span>Cholesterol: <strong className="text-purple-400">{met.cholesterol} mg/dL</strong></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Family Members Profile */}
            {selectedPatientForDrawer.familyMembers.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Linked Family Dependents</span>
                <div className="space-y-1.5">
                  {selectedPatientForDrawer.familyMembers.map((fam) => (
                    <div key={fam.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
                      <span className="font-bold text-white">{fam.name} ({fam.relation})</span>
                      <span className="text-slate-400">{fam.age} yrs • {fam.gender}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  window.open(`https://wa.me/91${selectedPatientForDrawer.mobile}`, '_blank');
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={() => setSelectedPatientForDrawer(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
