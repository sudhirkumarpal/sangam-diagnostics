export type TestCategorySlug =
  | 'haematology'
  | 'biochemistry'
  | 'liver-function'
  | 'kidney-function'
  | 'thyroid'
  | 'diabetes'
  | 'diabetes-kidney'
  | 'lipid-profile'
  | 'heart-hypertension'
  | 'vitamins-minerals'
  | 'urine-tests'
  | 'hormonal'
  | 'fever-infection'
  | 'joint-bone'
  | 'cancer-screening'
  | 'pregnancy-care'
  | 'infertility'
  | 'allergy'
  | 'alcoholism'
  | 'smoking'
  | 'stress'
  | 'anaemia'
  | 'std'
  | 'child-special'
  | 'male-special'
  | 'female-special'
  | 'senior-male'
  | 'senior-female'
  | 'preventive-health'
  | string;

export interface DiagnosticTest {
  id: string;
  slug: string;
  name: string;
  shortCode?: string;
  category: TestCategorySlug;
  categoryLabel: string;
  description: string;
  price: number;
  discountedPrice?: number;
  sampleType: string;
  tubeColor?: string;
  fastingRequired: boolean;
  fastingHours?: number;
  reportDeliveryHours: number;
  parametersCount: number;
  parameters: string[];
  clinicalSignificance: string;
  preparationInstructions: string[];
  faqs?: { question: string; answer: string }[];
  isPopular?: boolean;
  isActive: boolean;
}

export interface TestCategory {
  id: string;
  slug: TestCategorySlug;
  name: string;
  description: string;
  iconName: string;
  testsCount: number;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tag?: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  savings: number;
  parametersCount: number;
  sampleType: string;
  fastingRequired: boolean;
  fastingHours?: number;
  reportDeliveryHours: number;
  inclusionsSummary: string[];
  includedTests: {
    name: string;
    description: string;
    parameters: string[];
    purpose?: string;
  }[];
  benefits: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  posterImage?: string;
  isFeatured?: boolean;
  isActive: boolean;
  couplePrice?: number;
}

export interface ServiceArea {
  id: string;
  pincode: string;
  areaName: string;
  city: string;
  state: string;
  isHomeCollectionAvailable: boolean;
  turnaroundHours: number;
  deliveryFee: number;
}

export interface CollectionSlot {
  id: string;
  timeWindow: string;
  label: string;
  isAvailable: boolean;
}

export interface BookingPatient {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  email?: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'other';
  doctorNotes?: string;
}

export interface CollectionAddress {
  houseNumber: string;
  street: string;
  landmark?: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  accessInstructions?: string;
}

export interface BookingItem {
  type: 'test' | 'package';
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  coupleOption?: boolean;
}

export type PaymentMethod = 'cash_on_collection' | 'upi_qr' | 'online_gateway' | 'card_at_home';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type BookingStatus =
  | 'received'
  | 'confirmed'
  | 'collector_assigned'
  | 'collection_scheduled'
  | 'sample_collected'
  | 'processing'
  | 'report_ready'
  | 'completed'
  | 'cancelled';

export interface SampleCollector {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  activeArea: string;
  status: 'available' | 'on_duty' | 'offline';
}

export interface Booking {
  id: string;
  bookingReference: string; // e.g. SD-2026-8941
  createdAt: string;
  updatedAt: string;
  patient: BookingPatient;
  collectionAddress: CollectionAddress;
  selectedDate: string;
  selectedSlot: string;
  items: BookingItem[];
  subtotal: number;
  couponCode?: string;
  discount: number;
  collectionFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  collector?: SampleCollector;
  sampleBarcodes?: string[];
  collectionNotes?: string;
  reportId?: string;
  paymentId?: string;
}

export interface Coupon {
  code: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  validUntil: string;
  usageCount: number;
  isActive: boolean;
}

export interface ReportParameter {
  department: string;
  testName: string;
  result: string;
  unit: string;
  refRange: string;
  method: string;
  isAbnormal?: boolean;
}

export interface LaboratoryReport {
  id: string;
  bookingId: string;
  bookingReference: string;
  uhid: string; // e.g. ANDA.0000203817
  barcodeNo: string; // e.g. AA798215
  visitId: string; // e.g. MNDA203830
  patientName: string;
  age: number;
  gender: string;
  refDoctor: string;
  specimenDrawnOn: string;
  specimenReceivedOn: string;
  reportDate: string;
  clientName: string;
  department: string;
  testTitle: string;
  parameters: ReportParameter[];
  seniorPathologist: string;
  labManager?: string;
  consultantBiochemist?: string;
  labHead?: string;
  nablCertNo: string;
  pdfUrl?: string;
  downloadToken: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  mobile: string;
  preferredTime?: string;
  testOfInterest?: string;
  notes?: string;
  status: 'pending' | 'called' | 'converted' | 'closed';
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
}

export interface BusinessSettings {
  brandName: string;
  brandTagline: string;
  campaignTagline: string;
  phonePrimary: string;
  phoneSecondary: string;
  phoneGreaterNoida: string;
  greaterNoidaContactPerson?: string;
  phoneAlternative: string;
  whatsappNumber: string;
  email: string;
  mainLabAddress: string;
  greaterNoidaAddress: string;
  nablRegNumber: string;
  workingHours: string;
  reportDeliveryHours: string;
  freeCollectionAvailable: boolean;
  defaultCollectionFee: number;
  freeCollectionMinOrder: number;
  labManagerName: string;
  labManagerRole: string;
  seniorPathologistName: string;
  seniorPathologistReg: string;
  labHeadName?: string;
  labHeadReg?: string;
  biochemistName?: string;
}

// -------------------------------------------------------------
// AI-Assisted Prescription, Test Identification & Quotation Models
// -------------------------------------------------------------

export type QuotationStatus =
  | 'uploaded'
  | 'processing'
  | 'manual_review_required'
  | 'clarification_required'
  | 'ready_for_patient'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'converted_to_booking';

export type MatchStatus =
  | 'auto_matched'
  | 'staff_verified'
  | 'unmatched'
  | 'clarification_needed'
  | 'unavailable';

export interface PrescriptionTestMatch {
  id: string;
  originalText: string;
  matchedTestId?: string;
  matchedTestSlug?: string;
  matchedTestName?: string;
  matchedPackageId?: string;
  matchedPackageSlug?: string;
  category?: string;
  confidence: number; // 0.0 - 1.0
  price: number;
  isConfirmed: boolean;
  status: MatchStatus;
  requiresManualVerification: boolean;
  notes?: string;
}

export interface QuotationItem {
  id: string;
  type: 'test' | 'package' | 'custom_item';
  itemId?: string;
  slug?: string;
  name: string;
  originalPrescriptionText: string;
  matchStatus: MatchStatus;
  confidence: number;
  price: number;
  quantity: number;
  isProvisional: boolean;
  notes?: string;
}

export interface ManualReviewEntry {
  id: string;
  reviewerName: string;
  reviewedAt: string;
  notes: string;
  previousVersion: number;
  newVersion: number;
  changesSummary: string[];
}

export interface PatientClarification {
  id: string;
  question: string;
  sentAt: string;
  patientResponse?: string;
  respondedAt?: string;
  status: 'pending' | 'resolved';
}

export interface QuotationVersion {
  version: number;
  createdAt: string;
  createdBy: 'system_ai' | 'staff_reviewer';
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  collectionFee: number;
  totalAmount: number;
  notes?: string;
}

export interface PrescriptionUpload {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  filePath: string;
  uploadedAt: string;
  patientMobile: string;
  patientName?: string;
  consentGiven: boolean;
  consentTimestamp: string;
  extractedRawText?: string;
  ocrConfidence?: number;
  retentionExpiresAt: string;
}

export interface Quotation {
  id: string;
  quotationReference: string; // e.g. SD-QT-2026-1042
  prescriptionId: string;
  prescriptionFileName?: string;
  patientMobile: string;
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
  status: QuotationStatus;
  currentVersion: number;
  versions: QuotationVersion[];
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  collectionFee: number;
  totalAmount: number;
  isProvisional: boolean;
  requiresStaffReview: boolean;
  hasUnavailableItems: boolean;
  clarifications: PatientClarification[];
  reviewHistory: ManualReviewEntry[];
  patientDecision?: 'accepted' | 'declined';
  patientDecisionAt?: string;
  bookingReference?: string;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

// -------------------------------------------------------------
// Vertical Enterprise Operating System (Sangam LabOS & CRM)
// -------------------------------------------------------------

export type LeadSource =
  | 'web_callback'
  | 'whatsapp_inquiry'
  | 'prescription_upload'
  | 'checkout_abandonment'
  | 'direct_phone'
  | 'walkin'
  | 'google_maps'
  | 'doctor_referral';

export type LeadTemperature = 'hot' | 'warm' | 'cold';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'quoted'
  | 'scheduled'
  | 'converted'
  | 'cold_followup'
  | 'lost';

export interface Lead {
  id: string;
  patientName: string;
  mobile: string;
  email?: string;
  area: string;
  source: LeadSource;
  temperature: LeadTemperature;
  score: number; // 0 - 100
  status: LeadStatus;
  interestDescription: string;
  packageOrTestId?: string;
  packageOrTestName?: string;
  estimatedValue: number;
  notes: string;
  createdAt: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  automatedRemindersCount: number;
  lastMessageSent?: string;
  conversionBookingId?: string;
}

export type ChronicCondition =
  | 'diabetes'
  | 'hypertension'
  | 'thyroid'
  | 'cardiac_risk'
  | 'alopecia'
  | 'renal_calculus'
  | 'liver_disease'
  | 'general_wellness';

export type HealthRiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type LoyaltyTier = 'Bronze Member' | 'Silver Member' | 'Gold Member' | 'Platinum Elite';

export interface PatientFamilyMember {
  id: string;
  name: string;
  relation: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
}

export interface PatientRecord {
  id: string;
  uhid: string; // e.g. SD-UHID-2026-0042
  fullName: string;
  mobile: string;
  email?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address: string;
  area: string;
  pincode: string;
  chronicConditions: ChronicCondition[];
  healthRiskLevel: HealthRiskLevel;
  healthRiskSummary: string;
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
  totalBookings: number;
  totalSpent: number;
  firstVisitDate: string;
  lastVisitDate: string;
  familyMembers: PatientFamilyMember[];
  tags: string[];
  pastReportIds: string[];
  historicalMetrics?: {
    date: string;
    hba1c?: number;
    fastingSugar?: number;
    cholesterol?: number;
    tsh?: number;
    creatinine?: number;
    hemoglobin?: number;
  }[];
}

export type RecallType =
  | 'diabetes_hba1c_90d'
  | 'thyroid_tsh_180d'
  | 'cardiac_lipid_180d'
  | 'annual_checkup_365d'
  | 'hair_treatment_45d'
  | 'hypertension_90d';

export type RecallStatus =
  | 'due'
  | 'dispatched_whatsapp'
  | 'dispatched_sms'
  | 'booked'
  | 'declined'
  | 'snoozed';

export interface RetentionRecall {
  id: string;
  patientId: string;
  uhid: string;
  patientName: string;
  patientMobile: string;
  recallType: RecallType;
  title: string;
  recommendedInvestigation: string;
  recommendedSlug: string;
  targetPrice: number;
  discountCouponCode: string;
  lastTestDate: string;
  dueDate: string;
  daysOverdue: number;
  status: RecallStatus;
  dispatchedAt?: string;
  dispatchedChannel?: 'whatsapp' | 'sms' | 'email';
  lastMessagePreview?: string;
  convertedBookingId?: string;
}

export type SpecimenTubeColor =
  | 'Purple / EDTA'
  | 'Red / SST Plain'
  | 'Grey / Sodium Fluoride'
  | 'Yellow / SST Gel'
  | 'Sterile Container (Urine)'
  | 'Sterile Swab';

export type SampleMilestoneStatus =
  | 'pending_dispatch'
  | 'collector_dispatched'
  | 'sample_collected'
  | 'cold_chain_transit'
  | 'received_in_lab'
  | 'analyzer_processing'
  | 'doctor_review'
  | 'report_approved'
  | 'report_delivered';

export interface SampleSpecimen {
  id: string;
  barcode: string; // e.g. SD-B-798215-LAV
  bookingId: string;
  bookingReference: string;
  patientName: string;
  patientMobile: string;
  tubeType: SpecimenTubeColor;
  department: string;
  investigations: string[];
  status: SampleMilestoneStatus;
  collectorName?: string;
  collectedAt?: string;
  receivedAtLabBy?: string; // e.g. Mr. Aryan Saini
  receivedAtLabTime?: string;
  temperatureCelsius?: number; // e.g. 4.2 C cold chain
  panicValueDetected?: boolean;
  notes?: string;
}

export interface AutomationLog {
  id: string;
  timestamp: string;
  triggerType:
    | 'lead_followup'
    | 'phlebotomist_autodispatch'
    | 'specimen_barcode_gen'
    | 'panic_value_alert'
    | 'instant_whatsapp_report'
    | 'retention_recall'
    | 'loyalty_points_earned'
    | 'lead_temperature_escalation';
  targetName: string;
  targetPhone: string;
  channel: 'whatsapp' | 'sms' | 'system_alert' | 'email';
  actionSummary: string;
  details: string;
  status: 'sent' | 'queued' | 'simulated';
}


