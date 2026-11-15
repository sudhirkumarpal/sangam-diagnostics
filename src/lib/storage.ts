import fs from 'fs';
import path from 'path';
import {
  Booking,
  BusinessSettings,
  CallbackRequest,
  ContactEnquiry,
  Coupon,
  DiagnosticTest,
  LaboratoryReport,
  Package,
  SampleCollector,
  ServiceArea,
  PrescriptionUpload,
  Quotation,
  QuotationItem,
  QuotationVersion,
  ManualReviewEntry,
  Lead,
  PatientRecord,
  RetentionRecall,
  SampleSpecimen,
  AutomationLog,
  ReportParameter,
  SpecimenTubeColor,
  SampleMilestoneStatus,
} from '@/types';
import {
  INITIAL_BOOKINGS,
  INITIAL_BUSINESS_SETTINGS,
  INITIAL_COLLECTORS,
  INITIAL_COUPONS,
  INITIAL_PACKAGES,
  INITIAL_TESTS,
  SEED_SAMPLE_REPORT,
  SERVICEABLE_AREAS,
  INITIAL_LEADS,
  INITIAL_PATIENTS,
  INITIAL_RETENTION_RECALLS,
  INITIAL_SPECIMENS,
  INITIAL_AUTOMATION_LOGS,
} from './data';

interface DatabaseSchema {
  settings: BusinessSettings;
  packages: Package[];
  tests: DiagnosticTest[];
  serviceAreas: ServiceArea[];
  collectors: SampleCollector[];
  coupons: Coupon[];
  bookings: Booking[];
  reports: LaboratoryReport[];
  callbacks: CallbackRequest[];
  enquiries: ContactEnquiry[];
  prescriptions: PrescriptionUpload[];
  quotations: Quotation[];
  leads: Lead[];
  patients: PatientRecord[];
  recalls: RetentionRecall[];
  specimens: SampleSpecimen[];
  automationLogs: AutomationLog[];
}

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// In-memory cache for fast SSR and API routes
let memoryDb: DatabaseSchema | null = null;

function getInitialDatabase(): DatabaseSchema {
  return {
    settings: { ...INITIAL_BUSINESS_SETTINGS },
    packages: [...INITIAL_PACKAGES],
    tests: [...INITIAL_TESTS],
    serviceAreas: [...SERVICEABLE_AREAS],
    collectors: [...INITIAL_COLLECTORS],
    coupons: [...INITIAL_COUPONS],
    bookings: [...INITIAL_BOOKINGS],
    reports: [SEED_SAMPLE_REPORT],
    callbacks: [
      {
        id: 'cb-1',
        name: 'Sunil Mehra',
        mobile: '9876543210',
        preferredTime: 'Morning (9 AM - 12 PM)',
        testOfInterest: 'Basic Health Package ₹999',
        notes: 'Inquired about home collection in Kamla Nagar',
        status: 'called',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    enquiries: [
      {
        id: 'enq-1',
        name: 'Pooja Kashyap',
        mobile: '9988776655',
        email: 'pooja.k@example.com',
        subject: 'Corporate Annual Health Checkup',
        message: 'Looking for group health screening quotation for 25 staff members in Greater Noida.',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
    prescriptions: [],
    quotations: [
      {
        id: 'qt-seed-01',
        quotationReference: 'SD-QT-2026-1042',
        prescriptionId: 'presc-seed-01',
        prescriptionFileName: 'dr-gupta-prescription-arvind-sharma.jpg',
        patientName: 'Arvind Sharma',
        patientMobile: '9811981100',
        patientAge: 45,
        patientGender: 'male',
        status: 'ready_for_patient',
        currentVersion: 1,
        versions: [
          {
            version: 1,
            createdAt: '2026-10-24T14:30:00Z',
            createdBy: 'system_ai',
            items: [
              {
                id: 'qi-1',
                type: 'test',
                itemId: 'test-cbc-esr',
                slug: 'cbc-and-esr',
                name: 'Complete Blood Count (CBC) with ESR',
                originalPrescriptionText: 'Complete Blood Count (CBC)',
                matchStatus: 'auto_matched',
                confidence: 0.96,
                price: 350,
                quantity: 1,
                isProvisional: false,
              },
              {
                id: 'qi-2',
                type: 'test',
                itemId: 'test-lipid-profile',
                slug: 'lipid-profile',
                name: 'Lipid Profile',
                originalPrescriptionText: 'Lipid Profile',
                matchStatus: 'auto_matched',
                confidence: 0.96,
                price: 500,
                quantity: 1,
                isProvisional: false,
              },
              {
                id: 'qi-3',
                type: 'test',
                itemId: 'test-sugar-fasting',
                slug: 'sugar-fasting',
                name: 'Blood Sugar Fasting (Glucose)',
                originalPrescriptionText: 'Blood Sugar Fasting',
                matchStatus: 'auto_matched',
                confidence: 0.95,
                price: 100,
                quantity: 1,
                isProvisional: false,
              },
            ],
            subtotal: 950,
            discount: 0,
            collectionFee: 0,
            totalAmount: 950,
          },
        ],
        items: [
          {
            id: 'qi-1',
            type: 'test',
            itemId: 'test-cbc-esr',
            slug: 'cbc-and-esr',
            name: 'Complete Blood Count (CBC) with ESR',
            originalPrescriptionText: 'Complete Blood Count (CBC)',
            matchStatus: 'auto_matched',
            confidence: 0.96,
            price: 350,
            quantity: 1,
            isProvisional: false,
          },
          {
            id: 'qi-2',
            type: 'test',
            itemId: 'test-lipid-profile',
            slug: 'lipid-profile',
            name: 'Lipid Profile',
            originalPrescriptionText: 'Lipid Profile',
            matchStatus: 'auto_matched',
            confidence: 0.96,
            price: 500,
            quantity: 1,
            isProvisional: false,
          },
          {
            id: 'qi-3',
            type: 'test',
            itemId: 'test-sugar-fasting',
            slug: 'sugar-fasting',
            name: 'Blood Sugar Fasting (Glucose)',
            originalPrescriptionText: 'Blood Sugar Fasting',
            matchStatus: 'auto_matched',
            confidence: 0.95,
            price: 100,
            quantity: 1,
            isProvisional: false,
          },
        ],
        subtotal: 950,
        discount: 0,
        collectionFee: 0,
        totalAmount: 950,
        isProvisional: false,
        requiresStaffReview: false,
        hasUnavailableItems: false,
        clarifications: [],
        reviewHistory: [],
        createdAt: '2026-10-24T14:30:00Z',
        updatedAt: '2026-10-24T14:30:00Z',
        expiresAt: '2026-10-31T14:30:00Z',
      },
      {
        id: 'qt-seed-02',
        quotationReference: 'SD-QT-2026-1043',
        prescriptionId: 'presc-seed-02',
        prescriptionFileName: 'handwritten-prescription-meenakshi.jpg',
        patientName: 'Meenakshi Roy',
        patientMobile: '9955443322',
        patientAge: 32,
        patientGender: 'female',
        status: 'manual_review_required',
        currentVersion: 1,
        versions: [
          {
            version: 1,
            createdAt: '2026-10-24T16:00:00Z',
            createdBy: 'system_ai',
            items: [
              {
                id: 'qi-4',
                type: 'test',
                itemId: 'test-thyroid-profile',
                slug: 'thyroid-profile',
                name: 'Thyroid Profile (T3, T4, TSH)',
                originalPrescriptionText: 'Thyroid Profile',
                matchStatus: 'auto_matched',
                confidence: 0.95,
                price: 450,
                quantity: 1,
                isProvisional: false,
              },
              {
                id: 'qi-5',
                type: 'custom_item',
                name: 'Unverified Item: "S. Ferritin / D-Dimer (Handwriting unclear)"',
                originalPrescriptionText: 'S. Ferritin / D-Dimer',
                matchStatus: 'clarification_needed',
                confidence: 0.35,
                price: 0,
                quantity: 1,
                isProvisional: true,
                notes: 'Pathologist review required to verify doctor handwriting.',
              },
            ],
            subtotal: 450,
            discount: 0,
            collectionFee: 100,
            totalAmount: 550,
          },
        ],
        items: [
          {
            id: 'qi-4',
            type: 'test',
            itemId: 'test-thyroid-profile',
            slug: 'thyroid-profile',
            name: 'Thyroid Profile (T3, T4, TSH)',
            originalPrescriptionText: 'Thyroid Profile',
            matchStatus: 'auto_matched',
            confidence: 0.95,
            price: 450,
            quantity: 1,
            isProvisional: false,
          },
          {
            id: 'qi-5',
            type: 'custom_item',
            name: 'Unverified Item: "S. Ferritin / D-Dimer (Handwriting unclear)"',
            originalPrescriptionText: 'S. Ferritin / D-Dimer',
            matchStatus: 'clarification_needed',
            confidence: 0.35,
            price: 0,
            quantity: 1,
            isProvisional: true,
            notes: 'Pathologist review required to verify doctor handwriting.',
          },
        ],
        subtotal: 450,
        discount: 0,
        collectionFee: 100,
        totalAmount: 550,
        isProvisional: true,
        requiresStaffReview: true,
        hasUnavailableItems: false,
        clarifications: [],
        reviewHistory: [],
        createdAt: '2026-10-24T16:00:00Z',
        updatedAt: '2026-10-24T16:00:00Z',
        expiresAt: '2026-10-31T16:00:00Z',
      },
    ],
    leads: [...INITIAL_LEADS],
    patients: [...INITIAL_PATIENTS],
    recalls: [...INITIAL_RETENTION_RECALLS],
    specimens: [...INITIAL_SPECIMENS],
    automationLogs: [...INITIAL_AUTOMATION_LOGS],
  };
}

export function getDatabase(): DatabaseSchema {
  if (memoryDb) {
    if (!memoryDb.prescriptions) memoryDb.prescriptions = [];
    if (!memoryDb.quotations) memoryDb.quotations = [];
    if (!memoryDb.leads) memoryDb.leads = [...INITIAL_LEADS];
    if (!memoryDb.patients) memoryDb.patients = [...INITIAL_PATIENTS];
    if (!memoryDb.recalls) memoryDb.recalls = [...INITIAL_RETENTION_RECALLS];
    if (!memoryDb.specimens) memoryDb.specimens = [...INITIAL_SPECIMENS];
    if (!memoryDb.automationLogs) memoryDb.automationLogs = [...INITIAL_AUTOMATION_LOGS];
    return memoryDb;
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(data);
      if (memoryDb) {
        if (!memoryDb.prescriptions) memoryDb.prescriptions = [];
        if (!memoryDb.quotations || memoryDb.quotations.length === 0) {
          memoryDb.quotations = getInitialDatabase().quotations;
        }
        if (!memoryDb.leads || memoryDb.leads.length === 0) {
          memoryDb.leads = [...INITIAL_LEADS];
        }
        if (!memoryDb.patients || memoryDb.patients.length === 0) {
          memoryDb.patients = [...INITIAL_PATIENTS];
        }
        if (!memoryDb.recalls || memoryDb.recalls.length === 0) {
          memoryDb.recalls = [...INITIAL_RETENTION_RECALLS];
        }
        if (!memoryDb.specimens || memoryDb.specimens.length === 0) {
          memoryDb.specimens = [...INITIAL_SPECIMENS];
        }
        if (!memoryDb.automationLogs || memoryDb.automationLogs.length === 0) {
          memoryDb.automationLogs = [...INITIAL_AUTOMATION_LOGS];
        }
        return memoryDb;
      }
    }
  } catch (err) {
    console.error('Failed reading database file, using fallback initial data:', err);
  }

  memoryDb = getInitialDatabase();
  saveDatabase(memoryDb);
  return memoryDb;
}

export function saveDatabase(db: DatabaseSchema) {
  memoryDb = db;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed persisting database file:', err);
  }
}

// Helper query functions
export function getSettings(): BusinessSettings {
  return getDatabase().settings;
}

export function updateSettings(newSettings: Partial<BusinessSettings>): BusinessSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...newSettings };
  saveDatabase(db);
  return db.settings;
}

export function getAllPackages(): Package[] {
  return getDatabase().packages;
}

export function getPackageBySlug(slug: string): Package | undefined {
  return getDatabase().packages.find((p) => p.slug === slug);
}

export function updatePackage(slug: string, updates: Partial<Package>): Package | null {
  const db = getDatabase();
  const index = db.packages.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  db.packages[index] = { ...db.packages[index], ...updates };
  saveDatabase(db);
  return db.packages[index];
}

export function getAllTests(): DiagnosticTest[] {
  return getDatabase().tests;
}

export function getTestBySlug(slug: string): DiagnosticTest | undefined {
  return getDatabase().tests.find((t) => t.slug === slug);
}

export function updateTest(slug: string, updates: Partial<DiagnosticTest>): DiagnosticTest | null {
  const db = getDatabase();
  const index = db.tests.findIndex((t) => t.slug === slug);
  if (index === -1) return null;
  db.tests[index] = { ...db.tests[index], ...updates };
  saveDatabase(db);
  return db.tests[index];
}

export function getAllBookings(): Booking[] {
  return getDatabase().bookings;
}

export function getBookingByReference(ref: string): Booking | undefined {
  return getDatabase().bookings.find(
    (b) => b.bookingReference.toLowerCase() === ref.trim().toLowerCase()
  );
}

export function getBookingById(id: string): Booking | undefined {
  return getDatabase().bookings.find((b) => b.id === id);
}

export function createBooking(newBooking: Omit<Booking, 'id' | 'bookingReference' | 'createdAt' | 'updatedAt'>): Booking {
  const db = getDatabase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingReference = `SD-${new Date().getFullYear()}-${randomSuffix}`;
  
  const booking: Booking = {
    ...newBooking,
    id: `book-${Date.now()}-${randomSuffix}`,
    bookingReference,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.bookings.unshift(booking);
  saveDatabase(db);
  return booking;
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const db = getDatabase();
  const index = db.bookings.findIndex((b) => b.id === id || b.bookingReference === id);
  if (index === -1) return null;
  db.bookings[index] = { ...db.bookings[index], ...updates, updatedAt: new Date().toISOString() };
  saveDatabase(db);
  return db.bookings[index];
}

export function getAllReports(): LaboratoryReport[] {
  return getDatabase().reports;
}

export function getReportByBookingId(bookingId: string): LaboratoryReport | undefined {
  return getDatabase().reports.find(
    (r) => r.bookingId === bookingId || r.bookingReference === bookingId
  );
}

export function getReportById(id: string): LaboratoryReport | undefined {
  return getDatabase().reports.find((r) => r.id === id);
}

export function createReport(report: LaboratoryReport): LaboratoryReport {
  const db = getDatabase();
  db.reports.unshift(report);
  saveDatabase(db);
  return report;
}

export function checkPincodeServiceability(pincode: string): ServiceArea | null {
  const clean = pincode.trim();
  const area = getDatabase().serviceAreas.find((s) => s.pincode === clean && s.isHomeCollectionAvailable);
  return area || null;
}

export function getAllServiceAreas(): ServiceArea[] {
  return getDatabase().serviceAreas;
}

export function validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
  const clean = code.trim().toUpperCase();
  const coupon = getDatabase().coupons.find((c) => c.code === clean && c.isActive);

  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid or inactive coupon code.' };
  }

  if (new Date(coupon.validUntil) < new Date()) {
    return { valid: false, discount: 0, message: 'This coupon code has expired.' };
  }

  if (subtotal < coupon.minOrderValue) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (subtotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  return {
    valid: true,
    discount: Math.round(discount),
    message: `Coupon applied: ₹${Math.round(discount)} off!`,
    coupon,
  };
}

export function addCallbackRequest(req: { name: string; mobile: string; preferredTime?: string; testOfInterest?: string; notes?: string }): CallbackRequest {
  const db = getDatabase();
  const callback: CallbackRequest = {
    id: `cb-${Date.now()}`,
    ...req,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  db.callbacks.unshift(callback);
  saveDatabase(db);
  return callback;
}

export function getAllCallbacks(): CallbackRequest[] {
  return getDatabase().callbacks;
}

export function updateCallbackStatus(id: string, status: CallbackRequest['status']): CallbackRequest | null {
  const db = getDatabase();
  const item = db.callbacks.find((c) => c.id === id);
  if (!item) return null;
  item.status = status;
  saveDatabase(db);
  return item;
}

export function addContactEnquiry(enq: { name: string; mobile: string; email: string; subject: string; message: string }): ContactEnquiry {
  const db = getDatabase();
  const enquiry: ContactEnquiry = {
    id: `enq-${Date.now()}`,
    ...enq,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(enquiry);
  saveDatabase(db);
  return enquiry;
}

export function getAllEnquiries(): ContactEnquiry[] {
  return getDatabase().enquiries;
}

// -------------------------------------------------------------
// Prescription & Quotation Database Functions
// -------------------------------------------------------------

export function createPrescription(
  data: Omit<PrescriptionUpload, 'id' | 'uploadedAt' | 'retentionExpiresAt'>
): PrescriptionUpload {
  const db = getDatabase();
  const id = `presc-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const now = new Date().toISOString();
  // Retention: 90 days default
  const retentionExpiresAt = new Date(Date.now() + 90 * 86400000).toISOString();

  const record: PrescriptionUpload = {
    id,
    ...data,
    uploadedAt: now,
    retentionExpiresAt,
  };

  db.prescriptions = db.prescriptions || [];
  db.prescriptions.unshift(record);
  saveDatabase(db);
  return record;
}

export function getPrescriptionById(id: string): PrescriptionUpload | undefined {
  return (getDatabase().prescriptions || []).find((p) => p.id === id);
}

export function createQuotation(
  data: Omit<
    Quotation,
    | 'id'
    | 'quotationReference'
    | 'currentVersion'
    | 'versions'
    | 'reviewHistory'
    | 'clarifications'
    | 'createdAt'
    | 'updatedAt'
    | 'expiresAt'
  > & { initialNotes?: string }
): Quotation {
  const db = getDatabase();
  const id = `qt-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const quotationReference = `SD-QT-${new Date().getFullYear()}-${randomNum}`;
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 7 * 86400000).toISOString(); // 7 days validity

  const initialVersion: QuotationVersion = {
    version: 1,
    createdAt: now,
    createdBy: 'system_ai',
    items: data.items,
    subtotal: data.subtotal,
    discount: data.discount,
    collectionFee: data.collectionFee,
    totalAmount: data.totalAmount,
    notes: data.initialNotes,
  };

  const quotation: Quotation = {
    id,
    quotationReference,
    prescriptionId: data.prescriptionId,
    prescriptionFileName: data.prescriptionFileName,
    patientMobile: data.patientMobile,
    patientName: data.patientName,
    patientAge: data.patientAge,
    patientGender: data.patientGender,
    status: data.status,
    currentVersion: 1,
    versions: [initialVersion],
    items: data.items,
    subtotal: data.subtotal,
    discount: data.discount,
    collectionFee: data.collectionFee,
    totalAmount: data.totalAmount,
    isProvisional: data.isProvisional,
    requiresStaffReview: data.requiresStaffReview,
    hasUnavailableItems: data.hasUnavailableItems,
    clarifications: [],
    reviewHistory: [],
    createdAt: now,
    updatedAt: now,
    expiresAt,
  };

  db.quotations = db.quotations || [];
  db.quotations.unshift(quotation);
  saveDatabase(db);
  return quotation;
}

export function getQuotationByReference(ref: string): Quotation | undefined {
  const db = getDatabase();
  const cleanRef = ref.toUpperCase().trim();
  let found = (db.quotations || []).find(
    (q) => q.quotationReference.toUpperCase() === cleanRef || q.id === ref
  );
  if (!found) {
    const seed = getInitialDatabase().quotations.find(
      (q) => q.quotationReference.toUpperCase() === cleanRef || q.id === ref
    );
    if (seed) {
      db.quotations = db.quotations || [];
      db.quotations.push(seed);
      saveDatabase(db);
      found = seed;
    }
  }
  return found;
}

export function getQuotationById(id: string): Quotation | undefined {
  const db = getDatabase();
  let found = (db.quotations || []).find((q) => q.id === id);
  if (!found) {
    const seed = getInitialDatabase().quotations.find((q) => q.id === id);
    if (seed) {
      db.quotations = db.quotations || [];
      db.quotations.push(seed);
      saveDatabase(db);
      found = seed;
    }
  }
  return found;
}

export function updateQuotation(id: string, updates: Partial<Quotation>): Quotation | null {
  const db = getDatabase();
  db.quotations = db.quotations || [];
  const index = db.quotations.findIndex((q) => q.id === id || q.quotationReference === id);
  if (index === -1) return null;

  db.quotations[index] = {
    ...db.quotations[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveDatabase(db);
  return db.quotations[index];
}

export function addQuotationVersion(
  id: string,
  newVersionItems: QuotationItem[],
  subtotal: number,
  discount: number,
  collectionFee: number,
  totalAmount: number,
  reviewerEntry?: { reviewerName: string; notes: string; changesSummary: string[] }
): Quotation | null {
  const db = getDatabase();
  db.quotations = db.quotations || [];
  const index = db.quotations.findIndex((q) => q.id === id);
  if (index === -1) return null;

  const quote = db.quotations[index];
  const nextVerNum = quote.currentVersion + 1;
  const now = new Date().toISOString();

  const versionRecord: QuotationVersion = {
    version: nextVerNum,
    createdAt: now,
    createdBy: reviewerEntry ? 'staff_reviewer' : 'system_ai',
    items: newVersionItems,
    subtotal,
    discount,
    collectionFee,
    totalAmount,
    notes: reviewerEntry?.notes,
  };

  quote.versions.push(versionRecord);
  quote.currentVersion = nextVerNum;
  quote.items = newVersionItems;
  quote.subtotal = subtotal;
  quote.discount = discount;
  quote.collectionFee = collectionFee;
  quote.totalAmount = totalAmount;
  quote.isProvisional = newVersionItems.some((it) => it.isProvisional);
  quote.requiresStaffReview = false;
  quote.status = 'ready_for_patient';
  quote.updatedAt = now;

  if (reviewerEntry) {
    quote.reviewHistory.push({
      id: `rev-${Date.now()}`,
      reviewerName: reviewerEntry.reviewerName,
      reviewedAt: now,
      notes: reviewerEntry.notes,
      previousVersion: nextVerNum - 1,
      newVersion: nextVerNum,
      changesSummary: reviewerEntry.changesSummary,
    });
  }

  saveDatabase(db);
  return quote;
}

export function listQuotations(filter?: { status?: string; search?: string }): Quotation[] {
  const db = getDatabase();
  let list = db.quotations || [];

  if (filter?.status && filter.status !== 'all') {
    list = list.filter((q) => q.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (it) =>
        it.quotationReference.toLowerCase().includes(q) ||
        (it.patientName && it.patientName.toLowerCase().includes(q)) ||
        it.patientMobile.includes(q)
    );
  }

  return list;
}

// -------------------------------------------------------------
// Vertical Enterprise Business Automation Functions
// -------------------------------------------------------------

// 1. Automation Logging
export function addAutomationLog(
  entry: Omit<AutomationLog, 'id' | 'timestamp'>
): AutomationLog {
  const db = getDatabase();
  const log: AutomationLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  db.automationLogs.unshift(log);
  // Keep last 150 logs in memory/disk
  if (db.automationLogs.length > 150) {
    db.automationLogs = db.automationLogs.slice(0, 150);
  }
  saveDatabase(db);
  return log;
}

export function getAllAutomationLogs(): AutomationLog[] {
  const db = getDatabase();
  return db.automationLogs || [];
}

// 2. Omnichannel CRM Leads (Cold to Hot)
export function getAllLeads(filter?: {
  temperature?: string;
  status?: string;
  search?: string;
}): Lead[] {
  const db = getDatabase();
  let list = db.leads || [];

  if (filter?.temperature && filter.temperature !== 'all') {
    list = list.filter((l) => l.temperature === filter.temperature);
  }

  if (filter?.status && filter.status !== 'all') {
    list = list.filter((l) => l.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (l) =>
        l.patientName.toLowerCase().includes(q) ||
        l.mobile.includes(q) ||
        l.area.toLowerCase().includes(q) ||
        l.interestDescription.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createLead(data: Partial<Lead>): Lead {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Automatic Lead Scoring
  let score = 50;
  let temperature: Lead['temperature'] = 'warm';

  if (data.source === 'prescription_upload') {
    score = 95;
    temperature = 'hot';
  } else if (data.source === 'whatsapp_inquiry') {
    score = 88;
    temperature = 'hot';
  } else if (data.source === 'web_callback') {
    score = 75;
    temperature = 'warm';
  } else if (data.source === 'checkout_abandonment') {
    score = 55;
    temperature = 'warm';
  } else if (data.source === 'direct_phone') {
    score = 85;
    temperature = 'hot';
  }

  if (data.estimatedValue && data.estimatedValue > 1500) {
    score = Math.min(100, score + 10);
    temperature = 'hot';
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    patientName: data.patientName || 'Anonymous Visitor',
    mobile: data.mobile || '',
    email: data.email,
    area: data.area || 'Greater Noida',
    source: data.source || 'web_callback',
    temperature: data.temperature || temperature,
    score: data.score || score,
    status: data.status || 'new',
    interestDescription: data.interestDescription || 'General diagnostic test inquiry',
    packageOrTestId: data.packageOrTestId,
    packageOrTestName: data.packageOrTestName,
    estimatedValue: data.estimatedValue || 799,
    notes: data.notes || 'Ingested automatically through omnichannel gateway.',
    createdAt: now,
    lastContactedAt: now,
    nextFollowUpAt: new Date(Date.now() + 3600000 * 4).toISOString(),
    automatedRemindersCount: 1,
    lastMessageSent: 'Instant automated WhatsApp acknowledgement and quotation link dispatched.',
  };

  db.leads.unshift(newLead);
  saveDatabase(db);

  // Trigger automation log
  addAutomationLog({
    triggerType: 'lead_followup',
    targetName: newLead.patientName,
    targetPhone: newLead.mobile,
    channel: 'whatsapp',
    actionSummary: `Automated Lead Ingestion (${newLead.temperature.toUpperCase()} 🔥)`,
    details: `Ingested ${newLead.source} lead. Automated instant WhatsApp quote link dispatched for ${newLead.packageOrTestName || 'investigations'}.`,
    status: 'sent',
  });

  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const db = getDatabase();
  const idx = db.leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;

  db.leads[idx] = {
    ...db.leads[idx],
    ...updates,
    lastContactedAt: new Date().toISOString(),
  };

  saveDatabase(db);
  return db.leads[idx];
}

// 3. Master Patient Index (360° Customer Database)
export function getAllPatients(filter?: {
  search?: string;
  risk?: string;
  condition?: string;
}): PatientRecord[] {
  const db = getDatabase();
  let list = db.patients || [];

  if (filter?.risk && filter.risk !== 'all') {
    list = list.filter((p) => p.healthRiskLevel === filter.risk);
  }

  if (filter?.condition && filter.condition !== 'all') {
    list = list.filter((p) => (p.chronicConditions as string[]).includes(filter.condition!));
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.mobile.includes(q) ||
        p.uhid.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getPatientById(id: string): PatientRecord | undefined {
  const db = getDatabase();
  return db.patients.find((p) => p.id === id || p.uhid === id);
}

export function getPatientByMobile(mobile: string): PatientRecord | undefined {
  const db = getDatabase();
  const clean = mobile.replace(/\D/g, '');
  return db.patients.find((p) => p.mobile.replace(/\D/g, '') === clean);
}

export function createOrUpdatePatientFromBooking(booking: Booking): PatientRecord {
  const db = getDatabase();
  const cleanMobile = booking.patient.mobile.replace(/\D/g, '');
  let patient = db.patients.find((p) => p.mobile.replace(/\D/g, '') === cleanMobile);

  const now = new Date().toISOString().split('T')[0];
  const earnedPoints = Math.floor(booking.totalAmount / 10);

  if (!patient) {
    const uhidNum = 40 + db.patients.length + 1;
    patient = {
      id: `pat-${Date.now()}`,
      uhid: `SD-UHID-2026-00${uhidNum}`,
      fullName: booking.patient.fullName,
      mobile: booking.patient.mobile,
      email: booking.patient.email,
      age: booking.patient.age,
      gender: booking.patient.gender,
      address: `${booking.collectionAddress.houseNumber}, ${booking.collectionAddress.street}`,
      area: booking.collectionAddress.area,
      pincode: booking.collectionAddress.pincode,
      chronicConditions: ['general_wellness'],
      healthRiskLevel: 'low',
      healthRiskSummary: 'Registered via online booking. Fasting home collection scheduled.',
      loyaltyPoints: earnedPoints,
      loyaltyTier: earnedPoints > 500 ? 'Gold Member' : earnedPoints > 200 ? 'Silver Member' : 'Bronze Member',
      totalBookings: 1,
      totalSpent: booking.totalAmount,
      firstVisitDate: now,
      lastVisitDate: now,
      familyMembers: [],
      tags: ['Online Booking', booking.collectionAddress.area],
      pastReportIds: [],
    };
    db.patients.push(patient);
  } else {
    patient.totalBookings += 1;
    patient.totalSpent += booking.totalAmount;
    patient.loyaltyPoints += earnedPoints;
    if (patient.loyaltyPoints >= 800) patient.loyaltyTier = 'Gold Member';
    else if (patient.loyaltyPoints >= 300) patient.loyaltyTier = 'Silver Member';
    patient.lastVisitDate = now;
  }

  saveDatabase(db);

  addAutomationLog({
    triggerType: 'loyalty_points_earned',
    targetName: patient.fullName,
    targetPhone: patient.mobile,
    channel: 'system_alert',
    actionSummary: `Credited ${earnedPoints} Loyalty Points`,
    details: `Updated Master Patient Index (${patient.uhid}). Balance: ${patient.loyaltyPoints} points (${patient.loyaltyTier}).`,
    status: 'sent',
  });

  return patient;
}

// 4. Retention & Preventive Recall Engine
export function getAllRetentionRecalls(filter?: {
  status?: string;
  type?: string;
}): RetentionRecall[] {
  const db = getDatabase();
  let list = db.recalls || [];

  if (filter?.status && filter.status !== 'all') {
    list = list.filter((r) => r.status === filter.status);
  }

  if (filter?.type && filter.type !== 'all') {
    list = list.filter((r) => r.recallType === filter.type);
  }

  return list;
}

export function dispatchRecallNotification(
  recallId: string,
  channel: 'whatsapp' | 'sms' = 'whatsapp'
): RetentionRecall | null {
  const db = getDatabase();
  const rec = db.recalls.find((r) => r.id === recallId);
  if (!rec) return null;

  rec.status = channel === 'whatsapp' ? 'dispatched_whatsapp' : 'dispatched_sms';
  rec.dispatchedAt = new Date().toISOString();
  rec.dispatchedChannel = channel;

  saveDatabase(db);

  addAutomationLog({
    triggerType: 'retention_recall',
    targetName: rec.patientName,
    targetPhone: rec.patientMobile,
    channel,
    actionSummary: `Automated Retention Recall (${rec.title})`,
    details: `Automated ${channel.toUpperCase()} recall sent to ${rec.patientName}. Recommended: ${rec.recommendedInvestigation} with coupon ${rec.discountCouponCode}.`,
    status: 'sent',
  });

  return rec;
}

export function triggerBatchRecallAutomation(): {
  dispatchedCount: number;
  recalls: RetentionRecall[];
} {
  const db = getDatabase();
  let dispatched = 0;
  const now = new Date().toISOString();

  db.recalls.forEach((r) => {
    if (r.status === 'due') {
      r.status = 'dispatched_whatsapp';
      r.dispatchedAt = now;
      r.dispatchedChannel = 'whatsapp';
      dispatched++;

      addAutomationLog({
        triggerType: 'retention_recall',
        targetName: r.patientName,
        targetPhone: r.patientMobile,
        channel: 'whatsapp',
        actionSummary: `Batch Automated Recall: ${r.title}`,
        details: `Dispatched WhatsApp recall notice to ${r.patientMobile} with coupon ${r.discountCouponCode}.`,
        status: 'sent',
      });
    }
  });

  saveDatabase(db);
  return { dispatchedCount: dispatched, recalls: db.recalls };
}

// 5. Specimen & Phlebotomy Logistics (One-Prick Policy Tracking)
export function getAllSpecimens(filter?: {
  status?: string;
  bookingId?: string;
}): SampleSpecimen[] {
  const db = getDatabase();
  let list = db.specimens || [];

  if (filter?.status && filter.status !== 'all') {
    list = list.filter((s) => s.status === filter.status);
  }

  if (filter?.bookingId) {
    list = list.filter((s) => s.bookingId === filter.bookingId);
  }

  return list;
}

export function generateSpecimensForBooking(booking: Booking): SampleSpecimen[] {
  const db = getDatabase();
  const now = new Date().toISOString();
  const refCode = booking.bookingReference.replace(/\D/g, '') || String(Date.now()).slice(-4);

  const newSpecimens: SampleSpecimen[] = [
    {
      id: `spec-${Date.now()}-1`,
      barcode: `SD-B-${refCode}-LAV`,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      patientName: booking.patient.fullName,
      patientMobile: booking.patient.mobile,
      tubeType: 'Purple / EDTA',
      department: 'Haematology',
      investigations: ['Complete Blood Count (CBC)', 'Erythrocyte Sedimentation Rate (ESR)'],
      status: 'collector_dispatched',
      collectorName: booking.collector?.name || 'Assigned Phlebotomist',
      temperatureCelsius: 4.2,
      notes: 'Sterile vacuum needle drawn. One-prick policy followed.',
    },
    {
      id: `spec-${Date.now()}-2`,
      barcode: `SD-B-${refCode}-SST`,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      patientName: booking.patient.fullName,
      patientMobile: booking.patient.mobile,
      tubeType: 'Red / SST Plain',
      department: 'Biochemistry',
      investigations: ['Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Lipid Profile', 'Thyroid Profile'],
      status: 'collector_dispatched',
      collectorName: booking.collector?.name || 'Assigned Phlebotomist',
      temperatureCelsius: 4.2,
      notes: 'Gel separator vacutainer for clean serum extraction.',
    },
  ];

  // If Fasting Sugar included, add grey tube
  const hasSugar = booking.items.some(
    (it) => it.slug.includes('sugar') || it.slug.includes('basic') || it.slug.includes('advance')
  );
  if (hasSugar) {
    newSpecimens.push({
      id: `spec-${Date.now()}-3`,
      barcode: `SD-B-${refCode}-GLU`,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      patientName: booking.patient.fullName,
      patientMobile: booking.patient.mobile,
      tubeType: 'Grey / Sodium Fluoride',
      department: 'Biochemistry',
      investigations: ['Fasting Blood Glucose'],
      status: 'collector_dispatched',
      collectorName: booking.collector?.name || 'Assigned Phlebotomist',
      temperatureCelsius: 4.0,
      notes: 'Fluoride tube for glycolysis inhibition.',
    });
  }

  // If Urine R/M included, add sterile cup
  const hasUrine = booking.items.some(
    (it) => it.slug.includes('urine') || it.slug.includes('basic') || it.slug.includes('advance')
  );
  if (hasUrine) {
    newSpecimens.push({
      id: `spec-${Date.now()}-4`,
      barcode: `SD-B-${refCode}-URN`,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      patientName: booking.patient.fullName,
      patientMobile: booking.patient.mobile,
      tubeType: 'Sterile Container (Urine)',
      department: 'Clinical Pathology',
      investigations: ['Urine Routine & Microscopy (R/M)'],
      status: 'collector_dispatched',
      collectorName: booking.collector?.name || 'Assigned Phlebotomist',
      temperatureCelsius: 5.0,
      notes: 'Clean catch midstream specimen.',
    });
  }

  db.specimens.push(...newSpecimens);
  saveDatabase(db);

  addAutomationLog({
    triggerType: 'specimen_barcode_gen',
    targetName: booking.patient.fullName,
    targetPhone: booking.patient.mobile,
    channel: 'system_alert',
    actionSummary: `Auto-Calculated ${newSpecimens.length} Vacutainers & Barcodes`,
    details: `Generated barcoded containers: ${newSpecimens.map((s) => s.barcode).join(', ')}. Dispatched with phlebotomy fleet.`,
    status: 'sent',
  });

  return newSpecimens;
}

export function updateSpecimenStatus(
  specimenId: string,
  newStatus: SampleMilestoneStatus,
  updates?: Partial<SampleSpecimen>
): SampleSpecimen | null {
  const db = getDatabase();
  const sp = db.specimens.find((s) => s.id === specimenId || s.barcode === specimenId);
  if (!sp) return null;

  sp.status = newStatus;
  if (updates) Object.assign(sp, updates);

  if (newStatus === 'received_in_lab' && !sp.receivedAtLabBy) {
    sp.receivedAtLabBy = 'Mr. Aryan Saini';
    sp.receivedAtLabTime = new Date().toISOString();
  }

  saveDatabase(db);
  return sp;
}

export function autoAssignCollectorForBooking(bookingId: string): Booking | null {
  const db = getDatabase();
  const booking = db.bookings.find((b) => b.id === bookingId);
  if (!booking) return null;

  // Smart matching algorithm: Match by active area and availability
  const area = booking.collectionAddress.area.toLowerCase();
  let assignedCollector = db.collectors.find((c) => c.activeArea.toLowerCase().includes(area));
  if (!assignedCollector) {
    assignedCollector = db.collectors[0]; // Default to Amit Kumar (Greater Noida Fleet)
  }

  booking.collector = assignedCollector;
  booking.bookingStatus = 'collector_assigned';

  // Also generate specimen tubes
  generateSpecimensForBooking(booking);

  saveDatabase(db);

  addAutomationLog({
    triggerType: 'phlebotomist_autodispatch',
    targetName: assignedCollector.name,
    targetPhone: assignedCollector.phone,
    channel: 'sms',
    actionSummary: `Smart Phlebotomist Auto-Dispatched`,
    details: `Auto-assigned ${assignedCollector.name} (${assignedCollector.vehicleNumber}) to Booking ${booking.bookingReference} for ${booking.selectedSlot} at ${booking.collectionAddress.area}.`,
    status: 'sent',
  });

  return booking;
}

// 6. LIMS Automated Panic Value Detection & Automated Delivery
export function detectPanicValues(
  parameters: ReportParameter[],
  patientName: string,
  bookingRef: string
): { hasPanic: boolean; alerts: string[] } {
  const alerts: string[] = [];

  parameters.forEach((p) => {
    const val = parseFloat(p.result);
    if (isNaN(val)) return;

    const name = p.testName.toLowerCase();
    if (name.includes('haemoglobin') && val < 7.0) {
      alerts.push(`Critical Low Haemoglobin: ${val} g/dL (Normal: 12.0 - 15.0)`);
    } else if (name.includes('platelet') && val < 50) {
      alerts.push(`Critical Thrombocytopenia (Platelets): ${val} x1000/uL (Normal: 150 - 450)`);
    } else if (name.includes('sugar') || name.includes('glucose')) {
      if (val > 300) alerts.push(`Critical Hyperglycemia (Fasting Sugar): ${val} mg/dL (Normal: 70 - 100)`);
      if (val < 50) alerts.push(`Critical Hypoglycemia (Fasting Sugar): ${val} mg/dL (Normal: 70 - 100)`);
    } else if (name.includes('creatinine') && val > 4.0) {
      alerts.push(`Critical Renal Elevation (Creatinine): ${val} mg/dL (Normal: 0.6 - 1.2)`);
    } else if (name.includes('potassium') && (val > 6.0 || val < 2.8)) {
      alerts.push(`Critical Electrolyte (Potassium): ${val} mEq/L (Normal: 3.5 - 5.0)`);
    }
  });

  if (alerts.length > 0) {
    addAutomationLog({
      triggerType: 'panic_value_alert',
      targetName: `${patientName} (${bookingRef})`,
      targetPhone: '8796645850', // Alerts Lab Manager Aryan Saini
      channel: 'system_alert',
      actionSummary: `CRITICAL PANIC VALUE ALERT (${alerts.length} tests)`,
      details: `Panic flags detected: ${alerts.join('; ')}. Immediate alert sent to Mr. Aryan Saini & Dr. Anil Gupta.`,
      status: 'sent',
    });
  }

  return { hasPanic: alerts.length > 0, alerts };
}

export function dispatchAutomatedReportDelivery(
  reportId: string,
  channel: 'whatsapp' | 'sms' | 'all' = 'all'
): boolean {
  const db = getDatabase();
  const rep = db.reports.find((r) => r.id === reportId);
  if (!rep) return false;

  const downloadLink = `https://sangamdiagnostics.in/reports?token=${rep.downloadToken}`;

  if (channel === 'whatsapp' || channel === 'all') {
    addAutomationLog({
      triggerType: 'instant_whatsapp_report',
      targetName: rep.patientName,
      targetPhone: 'Patient Mobile',
      channel: 'whatsapp',
      actionSummary: 'Automated Doctor-Signed Report Delivered',
      details: `Dispatched instant WhatsApp message to ${rep.patientName}: "Namaste, your NABL-certified Sangam Diagnostics report is ready. Download PDF: ${downloadLink}". Verified under Dr. Anil Gupta & Mr. Aryan Saini.`,
      status: 'sent',
    });
  }

  if (channel === 'sms' || channel === 'all') {
    addAutomationLog({
      triggerType: 'instant_whatsapp_report',
      targetName: rep.patientName,
      targetPhone: 'Patient Mobile',
      channel: 'sms',
      actionSummary: 'SMS Report Notification Sent',
      details: `SMS: "Dear ${rep.patientName}, your test report (UHID ${rep.uhid}) has been released. View online: ${downloadLink}".`,
      status: 'sent',
    });
  }

  return true;
}


