import {
  BusinessSettings,
  DiagnosticTest,
  LaboratoryReport,
  Package,
  SampleCollector,
  ServiceArea,
  TestCategory,
  Booking,
  Coupon,
  Lead,
  PatientRecord,
  RetentionRecall,
  SampleSpecimen,
  AutomationLog,
} from '@/types';

export const INITIAL_BUSINESS_SETTINGS: BusinessSettings = {
  brandName: 'Sangam Diagnostics',
  brandTagline: 'ACCURACY | CLARITY | RELIABLE RESULTS',
  campaignTagline: 'STAY HEALTHY, STAY AHEAD',
  phonePrimary: '8796645850',
  phoneSecondary: '7982348151',
  phoneGreaterNoida: '8796645850',
  greaterNoidaContactPerson: 'Aryan Saini',
  phoneAlternative: '9953022493',
  whatsappNumber: '8796645850',
  email: 'care.sangamdiagnostic@gmail.com',
  mainLabAddress: 'Gali No. 3, New Chandrawal, Near Kamla Nagar Market, Delhi - 110007',
  greaterNoidaAddress: 'PF - 02 (Shop No. 2), Paramount Golf Forest Main Market, Zeta 1, Greater Noida, UP - 201308',
  nablRegNumber: 'MC-7078',
  workingHours: 'Mon - Sun: 06:30 AM - 08:30 PM',
  reportDeliveryHours: '12-14 Hours',
  freeCollectionAvailable: true,
  defaultCollectionFee: 100,
  freeCollectionMinOrder: 500,
  labManagerName: 'Mr. Aryan Saini',
  labManagerRole: 'Lab Manager & Operations Head',
  seniorPathologistName: 'Dr. Anil Gupta',
  seniorPathologistReg: 'M.B.B.S., M.D. (Path) | Regd. No. 5015',
};

export const TEST_CATEGORIES: TestCategory[] = [
  {
    id: 'cat-thyroid',
    slug: 'thyroid',
    name: 'Thyroid',
    description: 'TSH, Total T3/T4, Free FT3/FT4, Anti-TPO, Anti-TG, and comprehensive thyroid panels.',
    iconName: 'Zap',
    testsCount: 9,
  },
  {
    id: 'cat-diabetes-kidney',
    slug: 'diabetes-kidney',
    name: 'Diabetes & Kidney',
    description: 'HbA1c, Blood Glucose Fasting/PP, KFT, Creatinine, Urine Albumin, eGFR, Microalbumin.',
    iconName: 'ShieldAlert',
    testsCount: 16,
  },
  {
    id: 'cat-heart',
    slug: 'heart-hypertension',
    name: 'Heart & Hypertension',
    description: 'Lipid Profile, CPK-MB, Troponin, LDH, Lipoprotein (a), Hs-CRP, Homocysteine.',
    iconName: 'Heart',
    testsCount: 10,
  },
  {
    id: 'cat-fever',
    slug: 'fever-infection',
    name: 'Fever & Infection',
    description: 'Dengue NS1 Antigen, Chikungunya, Malaria Antigen, Typhoid TyphiDot, Widal, CBC, ESR.',
    iconName: 'Thermometer',
    testsCount: 16,
  },
  {
    id: 'cat-vitamins',
    slug: 'vitamins-minerals',
    name: 'Vitamins & Minerals',
    description: 'Vitamin D3 (25-OH), Vitamin B12, Serum Calcium, Zinc, Folic Acid, Vitamin E.',
    iconName: 'Sun',
    testsCount: 12,
  },
  {
    id: 'cat-liver',
    slug: 'liver-function',
    name: 'Liver, Jaundice and Hepatitis',
    description: 'Complete LFT, Bilirubin Total/Direct, SGOT, SGPT, Alkaline Phosphatase, Total Protein.',
    iconName: 'Activity',
    testsCount: 11,
  },
  {
    id: 'cat-joint-bone',
    slug: 'joint-bone',
    name: 'Joint Pain & Bone Health',
    description: 'RA Factor Quantitative, Anti-CCP, Uric Acid, Calcium, Phosphorus, Alkaline Phosphatase.',
    iconName: 'Layers',
    testsCount: 11,
  },
  {
    id: 'cat-cancer',
    slug: 'cancer-screening',
    name: 'Cancer Screening',
    description: 'PSA Total, Free PSA, CA-125, CEA, AFP, CA 15-3, CA 19-9, CA 72-4, Stool Occult Blood.',
    iconName: 'AlertCircle',
    testsCount: 12,
  },
  {
    id: 'cat-pregnancy',
    slug: 'pregnancy-care',
    name: 'Pregnancy Time?',
    description: 'Beta-hCG Quantitative, Urine Pregnancy Test, Dual Marker, Triple Marker, Progesterone, Ferritin.',
    iconName: 'HeartPulse',
    testsCount: 16,
  },
  {
    id: 'cat-infertility',
    slug: 'infertility',
    name: 'Infertility',
    description: 'AMH Anti-Mullerian Hormone, Beta-2 Glycoprotein, PCOD/PCOS Panel, TORCH-4 Panel, Semen Analysis.',
    iconName: 'Sparkles',
    testsCount: 16,
  },
  {
    id: 'cat-hormones',
    slug: 'hormonal',
    name: 'Hormonal Imbalance?',
    description: 'LH, FSH, Prolactin, Total Testosterone, Free Testosterone, Estradiol E2, Cortisol, PTH, ACTH.',
    iconName: 'Clock',
    testsCount: 16,
  },
  {
    id: 'cat-child',
    slug: 'child-special',
    name: 'Child Special',
    description: 'Pediatric CBC, Blood Grouping, Glucose, Calcium, Growth & Immunity Markers for children.',
    iconName: 'User',
    testsCount: 6,
  },
  {
    id: 'cat-male',
    slug: 'male-special',
    name: 'Male Special',
    description: 'Testosterone Total & Free, PSA, Cardiac risk markers, Liver, Kidney, Metabolic profiling for men.',
    iconName: 'Award',
    testsCount: 6,
  },
  {
    id: 'cat-female',
    slug: 'female-special',
    name: 'Female Special',
    description: 'LH, FSH, Prolactin, Thyroid, Iron Profile, Vitamin D, Bone and hormonal wellness for women.',
    iconName: 'CheckCircle2',
    testsCount: 15,
  },
  {
    id: 'cat-senior-male',
    slug: 'senior-male',
    name: 'Senior Male Special',
    description: 'Senior prostate, cardiac, renal, bone density, diabetic, and comprehensive geriatric health.',
    iconName: 'ShieldCheck',
    testsCount: 7,
  },
  {
    id: 'cat-senior-female',
    slug: 'senior-female',
    name: 'Senior Female Special',
    description: 'Post-menopausal calcium, osteoporosis markers, arthritis, lipid, thyroid, and diabetic checks.',
    iconName: 'ShieldCheck',
    testsCount: 15,
  },
  {
    id: 'cat-allergy',
    slug: 'allergy',
    name: 'Allergy',
    description: 'Serum Total IgE, Absolute Eosinophil Count (AEC), Food Allergy Panel, Inhalants, Aspergillus, Celiac.',
    iconName: 'AlertCircle',
    testsCount: 11,
  },
  {
    id: 'cat-alcoholism',
    slug: 'alcoholism',
    name: 'Alcoholism',
    description: 'Amylase, Lipase, GGT, LFT, Liver enzyme evaluation, and lipid metabolism profile.',
    iconName: 'Activity',
    testsCount: 6,
  },
  {
    id: 'cat-smoking',
    slug: 'smoking',
    name: 'Smoking',
    description: 'Cardiovascular risk, Complete Blood Count, Lipid Profile, Hs-CRP, and inflammatory markers.',
    iconName: 'HeartPulse',
    testsCount: 6,
  },
  {
    id: 'cat-stress',
    slug: 'stress',
    name: 'Stress/Anger',
    description: 'Serum Cortisol, Thyroid Profile, Electrolytes, Blood Pressure & Cardiovascular Wellness.',
    iconName: 'Clock',
    testsCount: 7,
  },
  {
    id: 'cat-anaemia',
    slug: 'anaemia',
    name: 'Anaemia',
    description: 'Complete Blood Count (CBC), Serum Iron, Ferritin, Total Iron Binding Capacity (TIBC), Reticulocyte.',
    iconName: 'Droplet',
    testsCount: 7,
  },
  {
    id: 'cat-std',
    slug: 'std',
    name: 'STD',
    description: 'HIV 1 & 2 4th Gen, Syphilis TPHA, VDRL, HBsAg, Hepatitis C antibody with confidential reporting.',
    iconName: 'ShieldCheck',
    testsCount: 5,
  },
];

export const INITIAL_PACKAGES: Package[] = [
  {
    "id": "pkg-basic-health",
    "slug": "basic-health-package",
    "name": "Basic Health Package",
    "subtitle": "Stay Healthy, Stay Ahead — 9 Core Clinical Profiles (Offer Price ₹999)",
    "tag": "Bestseller ₹999",
    "description": "A perfect package for regular health check-up and early detection of health issues covering 9 key clinical investigations: Lipid Profile, CBC & ESR, LFT, KFT, Thyroid Profile, eGFR Level, Sugar Fasting, Urine Routine, and Serum Calcium with Free Home Sample Collection.",
    "originalPrice": 2499,
    "offerPrice": 999,
    "couplePrice": 1899,
    "savings": 1500,
    "parametersCount": 62,
    "sampleType": "Blood & Urine (Fasting)",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "posterImage": "/images/basic-health-package-official.jpg",
    "isFeatured": true,
    "isActive": true,
    "benefits": [
      "Comprehensive Health Check-up",
      "Early Detection of Health Issues",
      "Trusted & Accurate Reports",
      "Affordable & Value for Money",
      "Home Sample Collection Available*",
      "12-14 Hours Report Delivery"
],
    "inclusionsSummary": [
      "Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL)",
      "CBC & ESR (Complete Blood Count 24 Parameters + Inflammation)",
      "LFT - Liver Function Test (10 Parameters)",
      "KFT - Kidney Function Test (Urea, Creatinine, BUN, Uric Acid)",
      "Thyroid Profile (Total T3, Total T4, TSH Ultrasensitive)",
      "eGFR Level (Glomerular Filtration Rate for Kidney Health)",
      "Sugar Fasting (Blood Glucose Fasting Screen)",
      "Urine Routine & Microscopy (20 Physical, Chemical & Microscopic checks)",
      "S. Calcium (Serum Calcium for Bone & Cellular Vitality)"
    ],
    "includedTests": [
      {
        "name": "Lipid Profile",
        "description": "Evaluates blood cholesterol levels and cardiovascular disease risk",
        "parameters": [
          "Cholesterol Total",
          "HDL Cholesterol (Good)",
          "LDL Cholesterol (Bad)",
          "VLDL Cholesterol",
          "Triglycerides",
          "Total Cholesterol / HDL Ratio",
          "LDL / HDL Ratio"
        ],
        "purpose": "Evaluates cholesterol & risk of heart disease"
      },
      {
        "name": "CBC & ESR",
        "description": "Complete blood count and erythrocyte sedimentation rate",
        "parameters": [
          "Hemoglobin",
          "Total Leukocyte Count (TLC)",
          "Neutrophils",
          "Lymphocytes",
          "Monocytes",
          "Eosinophils",
          "Basophils",
          "Platelet Count",
          "Total RBC Count",
          "PCV / Hematocrit",
          "MCV",
          "MCH",
          "MCHC",
          "RDW-CV",
          "RDW-SD",
          "ESR (Westergren Method)"
        ],
        "purpose": "Detects infections, anemia and inflammatory conditions"
      },
      {
        "name": "LFT (Liver Function Test)",
        "description": "Comprehensive hepatic panel assessing liver enzyme health and protein synthesis",
        "parameters": [
          "Bilirubin Total",
          "Bilirubin Direct",
          "Bilirubin Indirect",
          "SGOT / AST",
          "SGPT / ALT",
          "Alkaline Phosphatase (ALP)",
          "Total Protein",
          "Serum Albumin",
          "Serum Globulin",
          "A:G Ratio"
        ],
        "purpose": "Assesses liver function and detects liver disorders"
      },
      {
        "name": "KFT (Kidney Function Test)",
        "description": "Evaluates kidney waste filtration, urea clearance and electrolyte balance",
        "parameters": [
          "Blood Urea",
          "Blood Urea Nitrogen (BUN)",
          "Serum Creatinine",
          "Uric Acid",
          "BUN / Creatinine Ratio"
        ],
        "purpose": "Evaluates kidney function and detects kidney disorders"
      },
      {
        "name": "Thyroid Profile",
        "description": "Endocrine assessment of master metabolic hormones via CLIA",
        "parameters": [
          "Total Triiodothyronine (T3)",
          "Total Thyroxine (T4)",
          "Thyroid Stimulating Hormone (TSH Ultrasensitive)"
        ],
        "purpose": "Checks thyroid hormone levels and detects thyroid disorders"
      },
      {
        "name": "eGFR Level",
        "description": "Estimated glomerular filtration rate calculated from serum creatinine",
        "parameters": [
          "eGFR (Estimated Glomerular Filtration Rate)"
        ],
        "purpose": "Detects kidney filtration rate and functional renal health"
      },
      {
        "name": "Sugar Fasting",
        "description": "Baseline blood glucose measurement after overnight fasting",
        "parameters": [
          "Fasting Blood Glucose"
        ],
        "purpose": "Screens for diabetes and blood sugar level irregularities"
      },
      {
        "name": "Urine Routine",
        "description": "Complete physical, chemical and microscopic sediment urinalysis",
        "parameters": [
          "Colour",
          "Appearance",
          "Specific Gravity",
          "pH",
          "Urine Protein / Albumin",
          "Urine Glucose",
          "Ketone Bodies",
          "Bile Salts & Pigments",
          "Pus Cells (WBCs)",
          "Epithelial Cells",
          "Red Blood Cells (RBCs)",
          "Casts & Crystals"
        ],
        "purpose": "Detects infections, kidney problems and other abnormalities"
      },
      {
        "name": "S. Calcium",
        "description": "Total serum calcium assessment",
        "parameters": [
          "Serum Calcium"
        ],
        "purpose": "Checks calcium levels for bone, neuromuscular and overall health"
      }
    ],
    "faqs": [
      {
        "question": "How much fasting is required for the Basic Health Package?",
        "answer": "A minimum of 10-12 hours of overnight fasting is mandatory. You may drink plain water, but avoid tea, coffee, milk, and breakfast until sample collection is completed."
      },
      {
        "question": "When and how will I receive my test reports?",
        "answer": "Reports are processed in our NABL accredited laboratory and delivered within 12-14 hours directly to your WhatsApp and registered email. You can also view or download them anytime via our Online Reports Portal."
      },
      {
        "question": "Is home sample collection really free?",
        "answer": "Yes, free home sample collection is provided across Greater Noida (including Paramount Golf Foreste, Zeta 1, Alpha, Beta, Delta, Gaur City) and Delhi North with zero home visit charges."
      }
    ]
  },
  {
    "id": "pkg-advanced-health",
    "slug": "advanced-health-package",
    "name": "Platinum Health Package",
    "subtitle": "Stay Healthy, Stay Ahead — 13 Clinical Profiles with Vitamins, Iron & HbA1c (Offer ₹1,499)",
    "tag": "Popular ₹1,499",
    "description": "Our most comprehensive preventive health package covering 13 major clinical profiles and 88 parameters. Includes all core organs (Heart, Liver, Kidney, Thyroid), 3-month average Diabetes marker (HbA1c), complete Vitamin D3 & B12 panels, and deep Iron Profile with Ferritin.",
    "originalPrice": 3999,
    "offerPrice": 1499,
    "couplePrice": 2799,
    "savings": 2500,
    "parametersCount": 88,
    "sampleType": "Blood & Urine (Fasting)",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "posterImage": "/images/platinum-advanced-health-package-official.jpg",
    "isFeatured": true,
    "isActive": true,
    "benefits": [
      "Comprehensive Health Check-up",
      "Early Detection of Health Issues",
      "Fast & Accurate Reports",
      "12-14 Hours Report Delivery",
      "Advanced Lab Technology",
      "Certified Lab Experts"
],
    "inclusionsSummary": [
      "Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL)",
      "CBC & ESR (Full Hemogram 24 Parameters + Inflammation)",
      "LFT (Liver Function Test - 10 Hepatic Parameters)",
      "KFT (Kidney Function Test - Urea, BUN, Creatinine, Uric Acid)",
      "Thyroid Profile (Total T3, Total T4, TSH Ultrasensitive)",
      "eGFR Level (Calculated Kidney Filtration Rate)",
      "Sugar Fasting (Baseline Fasting Blood Glucose)",
      "Urine Routine & Microscopy (Complete Urinalysis)",
      "S. Calcium (Bone & Neuromuscular Mineral Marker)",
      "HbA1c - Glycated Hemoglobin (Gold standard 3-month average glucose)",
      "Vitamin D3 25-Hydroxy (Bone, immunity and vitality check)",
      "Vitamin B12 (Nerve health, brain function and energy metabolism)",
      "Complete Iron Profile (Serum Iron, TIBC, UIBC, % Transferrin, Ferritin)"
    ],
    "includedTests": [
      {
        "name": "Lipid Profile",
        "description": "Complete blood cholesterol and cardiovascular risk evaluation",
        "parameters": [
          "Cholesterol Total",
          "HDL Cholesterol (Good)",
          "LDL Cholesterol (Bad)",
          "VLDL Cholesterol",
          "Triglycerides",
          "TC / HDL Ratio",
          "LDL / HDL Ratio"
        ],
        "purpose": "Evaluates cholesterol & risk of heart disease"
      },
      {
        "name": "CBC & ESR",
        "description": "Complete blood count and systemic inflammatory index",
        "parameters": [
          "Hemoglobin",
          "Total Leukocyte Count (TLC)",
          "Neutrophils",
          "Lymphocytes",
          "Monocytes",
          "Eosinophils",
          "Basophils",
          "Platelet Count",
          "Total RBC Count",
          "PCV / Hematocrit",
          "MCV",
          "MCH",
          "MCHC",
          "RDW-CV",
          "RDW-SD",
          "ESR (Westergren Method)"
        ],
        "purpose": "Detects infections, anemia and inflammatory conditions"
      },
      {
        "name": "LFT (Liver Function Test)",
        "description": "10-parameter hepatic health panel",
        "parameters": [
          "Bilirubin Total",
          "Bilirubin Direct",
          "Bilirubin Indirect",
          "SGOT / AST",
          "SGPT / ALT",
          "Alkaline Phosphatase (ALP)",
          "Total Protein",
          "Serum Albumin",
          "Serum Globulin",
          "A:G Ratio"
        ],
        "purpose": "Assesses liver function and detects liver disorders"
      },
      {
        "name": "KFT (Kidney Function Test)",
        "description": "Evaluates renal function, urea clearance and metabolic filtration",
        "parameters": [
          "Blood Urea",
          "Blood Urea Nitrogen (BUN)",
          "Serum Creatinine",
          "Uric Acid",
          "BUN / Creatinine Ratio"
        ],
        "purpose": "Evaluates kidney function and detects kidney disorders"
      },
      {
        "name": "Thyroid Profile",
        "description": "Ultrasensitive endocrine evaluation for thyroid disorders",
        "parameters": [
          "Total Triiodothyronine (T3)",
          "Total Thyroxine (T4)",
          "Thyroid Stimulating Hormone (TSH Ultrasensitive)"
        ],
        "purpose": "Checks thyroid hormone levels and detects thyroid disorders"
      },
      {
        "name": "eGFR Level",
        "description": "Kidney filtration rate estimation",
        "parameters": [
          "eGFR (Estimated Glomerular Filtration Rate)"
        ],
        "purpose": "Detects kidney filtration rate and kidney health"
      },
      {
        "name": "Sugar Fasting",
        "description": "Fasting blood sugar level",
        "parameters": [
          "Fasting Blood Glucose"
        ],
        "purpose": "Screens for diabetes and blood sugar levels"
      },
      {
        "name": "Urine Routine",
        "description": "Comprehensive physical, chemical and microscopic urine screen",
        "parameters": [
          "Colour",
          "Appearance",
          "Specific Gravity",
          "pH",
          "Urine Protein",
          "Urine Glucose",
          "Ketone Bodies",
          "Bile Pigments",
          "Pus Cells",
          "Epithelial Cells",
          "RBCs",
          "Casts & Crystals"
        ],
        "purpose": "Detects infections, kidney problems and other abnormalities"
      },
      {
        "name": "S. Calcium",
        "description": "Serum calcium level",
        "parameters": [
          "Serum Calcium"
        ],
        "purpose": "Checks calcium levels for bone and overall health"
      },
      {
        "name": "HbA1c (Glycated Hemoglobin)",
        "description": "Gold-standard 90-day average blood sugar indicator",
        "parameters": [
          "HbA1c Glycated Hemoglobin",
          "Estimated Average Glucose (eAG)"
        ],
        "purpose": "Indicates average blood sugar level over last 2-3 months and detects prediabetes"
      },
      {
        "name": "Vitamin D3 25 Hydroxy",
        "description": "Serum 25-hydroxycholecalciferol via CLIA",
        "parameters": [
          "Vitamin D3 25-OH Total"
        ],
        "purpose": "Checks Vitamin D level for bone, immunity & overall health"
      },
      {
        "name": "Vitamin B12",
        "description": "Serum cyanocobalamin concentration",
        "parameters": [
          "Vitamin B12 (Cyanocobalamin)"
        ],
        "purpose": "Assesses Vitamin B12 level for nerve health, brain vitality & energy"
      },
      {
        "name": "Iron Profile",
        "description": "Complete blood iron dynamics and cellular iron stores",
        "parameters": [
          "Serum Iron",
          "Total Iron Binding Capacity (TIBC)",
          "Unsaturated Iron Binding Capacity (UIBC)",
          "% Transferrin Saturation",
          "Serum Ferritin"
        ],
        "purpose": "Detects iron deficiency, latent anemia and cell oxygen transport"
      }
    ],
    "faqs": [
      {
        "question": "Why is the Platinum / Advanced Package better than basic checkups?",
        "answer": "Unlike basic packages, the Platinum Package includes HbA1c (your 3-month blood sugar average), both Vitamin D3 and B12 (which cause chronic fatigue and aches), and a full Iron Profile with Ferritin for deep nutritional evaluation."
      },
      {
        "question": "Is fasting required?",
        "answer": "Yes, 10-12 hours of overnight fasting is required for accurate fasting blood sugar, lipid profile, and iron measurements."
      },
      {
        "question": "How long does it take to deliver reports?",
        "answer": "All 13 profiles are completed in-house and validated by our Pathologist within 12-14 hours, sent directly to your WhatsApp and email."
      }
    ]
  },
  {
    "id": "pkg-cardiac-health",
    "slug": "cardiac-health-profile",
    "name": "Cardiac Health Profile",
    "subtitle": "Comprehensive Cardiovascular Risk & Heart Muscle Wellness Panel (Special Offer ₹2,499)",
    "tag": "Specialist ₹2,499",
    "description": "A comprehensive checkup to assess your heart health and detect risks early. Includes high-sensitivity cardiac injury markers (Troponin-T, CPK-MB, CPK, S LDH, HS-CRP), advanced apolipoproteins (APO-1, APO-3), Lipid Profile, Liver & Kidney Function, Thyroid Profile, eGFR, S. Calcium, Sugar Fasting, and Urine R/M.",
    "originalPrice": 4999,
    "offerPrice": 2499,
    "couplePrice": 4500,
    "savings": 2500,
    "parametersCount": 52,
    "sampleType": "Blood & Urine (Fasting)",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 14,
    "posterImage": "/images/cardiac-health-profile-official.jpg",
    "isFeatured": true,
    "isActive": true,
    "benefits": [
      "Early detection of heart disease risk",
      "Comprehensive assessment of heart & organ health",
      "Helps in timely prevention & better management",
      "For all adults above 30 years or with risk factors",
      "100% Automated Testing",
      "Free Home Sample Collection"
],
    "inclusionsSummary": [
      "CPK-MB (Cardiac Isoenzyme for Heart Muscle Damage)",
      "HS-CRP (High-Sensitivity C-Reactive Protein Heart Inflammation)",
      "S LDH (Serum Lactate Dehydrogenase Tissue Damage Marker)",
      "TROPONIN-T (Highly Specific Cardiac Marker for Heart Attack Risk)",
      "CPK (Creatine Phosphokinase General & Heart Muscle Enzyme)",
      "APO-1 / Apolipoprotein A1 (Good HDL Cholesterol Particle Indicator)",
      "APO-3 / Apolipoprotein B (Atherogenic Bad Cholesterol Indicator)",
      "Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL)",
      "LFT (Liver Function Test - Assesses Overall Metabolic Health)",
      "KFT (Kidney Function Test - Filtration & Fluid Balance)",
      "CBC & ESR (Complete Blood Count & Inflammation Marker)",
      "Thyroid Profile (Total T3, Total T4, TSH Ultrasensitive)",
      "eGFR Level (Kidney Glomerular Filtration Rate)",
      "S. Calcium (Essential Mineral for Heart Rhythm & Bone Health)",
      "Sugar Fasting (Diabetes Screening)",
      "Urine R/M (Routine Urinalysis for Renal & Systemic Health)"
    ],
    "includedTests": [
      {
        "name": "CPK-MB",
        "description": "Cardiac specific creatine kinase isoenzyme",
        "parameters": [
          "CPK-MB"
        ],
        "purpose": "Helps detect heart muscle damage and acute myocardial stress"
      },
      {
        "name": "HS-CRP (High Sensitivity CRP)",
        "description": "Ultrasensitive systemic vascular inflammation marker",
        "parameters": [
          "High Sensitivity C-Reactive Protein (HS-CRP)"
        ],
        "purpose": "High-sensitivity marker of arterial inflammation & heart disease risk"
      },
      {
        "name": "S LDH (Serum Lactate Dehydrogenase)",
        "description": "Cellular enzyme indicating myocardial and tissue breakdown",
        "parameters": [
          "Serum Lactate Dehydrogenase (LDH)"
        ],
        "purpose": "Assesses tissue damage including heart muscle"
      },
      {
        "name": "TROPONIN-T",
        "description": "Gold standard myocardial infarction biomarker",
        "parameters": [
          "Troponin-T (Cardiac Specific)"
        ],
        "purpose": "Highly specific marker for heart attack and myocardial necrosis"
      },
      {
        "name": "CPK (Creatine Phosphokinase Total)",
        "description": "Total muscle enzyme evaluation",
        "parameters": [
          "CPK Total"
        ],
        "purpose": "Indicates general muscle injury including heart muscle"
      },
      {
        "name": "APO-1 (Apolipoprotein A1)",
        "description": "Primary protein constituent of cardioprotective HDL",
        "parameters": [
          "Apolipoprotein A1 (APO-A1)"
        ],
        "purpose": "Apolipoprotein A1 — Good cholesterol indicator and anti-atherogenic marker"
      },
      {
        "name": "APO-3 / APO-B (Apolipoprotein B)",
        "description": "Primary protein constituent of atherogenic LDL/VLDL particles",
        "parameters": [
          "Apolipoprotein B (APO-B)",
          "Apo B / Apo A1 Ratio"
        ],
        "purpose": "Apolipoprotein B — Bad cholesterol particle indicator for plaque formation"
      },
      {
        "name": "Lipid Profile",
        "description": "Complete blood cholesterol panel",
        "parameters": [
          "Cholesterol Total",
          "Triglycerides",
          "HDL Cholesterol",
          "LDL Cholesterol",
          "VLDL Cholesterol",
          "Total Cholesterol / HDL Ratio"
        ],
        "purpose": "Total Cholesterol, Triglycerides, HDL, LDL, VLDL evaluation"
      },
      {
        "name": "LFT (Liver Function Test)",
        "description": "10-parameter liver and protein panel",
        "parameters": [
          "Bilirubin Total",
          "SGOT",
          "SGPT",
          "ALP",
          "Total Protein",
          "Serum Albumin"
        ],
        "purpose": "Liver function test to assess overall metabolic and medication clearance health"
      },
      {
        "name": "KFT (Kidney Function Test)",
        "description": "Renal profile assessing fluid and filtration balance",
        "parameters": [
          "Blood Urea",
          "BUN",
          "Serum Creatinine",
          "Uric Acid"
        ],
        "purpose": "Kidney function test for waste filtration and vascular health"
      },
      {
        "name": "CBC & ESR",
        "description": "Complete blood count and inflammatory index",
        "parameters": [
          "Hemoglobin",
          "TLC",
          "Platelet Count",
          "RBC Count",
          "PCV",
          "MCV",
          "ESR"
        ],
        "purpose": "Complete blood count & inflammation marker"
      },
      {
        "name": "Thyroid Profile",
        "description": "Thyroid hormone assessment",
        "parameters": [
          "Total T3",
          "Total T4",
          "TSH Ultrasensitive"
        ],
        "purpose": "Assesses thyroid function which directly influences heart rate and blood pressure"
      },
      {
        "name": "eGFR Level",
        "description": "Kidney filtration rate estimation",
        "parameters": [
          "eGFR"
        ],
        "purpose": "Evaluates kidney filtration rate"
      },
      {
        "name": "S. Calcium",
        "description": "Serum calcium level",
        "parameters": [
          "Serum Calcium"
        ],
        "purpose": "Essential mineral for heart muscle contraction and rhythm stability"
      },
      {
        "name": "Sugar Fasting",
        "description": "Fasting blood sugar test",
        "parameters": [
          "Blood Glucose Fasting"
        ],
        "purpose": "Fasting blood sugar for diabetes and cardiovascular risk screening"
      },
      {
        "name": "Urine R/M",
        "description": "Routine urinalysis",
        "parameters": [
          "Urine Protein",
          "Glucose",
          "Pus Cells",
          "Microscopic examination"
        ],
        "purpose": "Routine urinalysis for infection & kidney health"
      }
    ],
    "faqs": [
      {
        "question": "Who should take the Cardiac Health Profile?",
        "answer": "Recommended for all adults aged 30 and above, individuals with high blood pressure, diabetes, high cholesterol, chest discomfort, shortness of breath, a family history of premature heart disease, or significant lifestyle stress/smoking."
      },
      {
        "question": "What makes Troponin-T and CPK-MB important in this profile?",
        "answer": "Troponin-T and CPK-MB are highly specific biological markers that detect subtle heart muscle stress or damage long before symptoms or routine ECG changes become apparent."
      },
      {
        "question": "What preparation is needed?",
        "answer": "Fasting for 10-12 hours is recommended. You may drink plenty of plain water to stay well-hydrated."
      }
    ]
  },
  {
    "id": "pkg-hair-treatment-men",
    "slug": "hair-treatment-screening-men",
    "name": "Hair Fall Screening (Men's Package)",
    "subtitle": "Targeted Trichology, Hormonal, Calcium & Micronutrient Panel for Men (Offer ₹2,499)",
    "tag": "Specialist Care ₹2,499",
    "description": "Complete clinical hair loss diagnostic evaluation for men from our official flyer. Covers 10 comprehensive investigations: Testosterone Total, Serum Ferritin, C-Reactive Protein (CRP), Complete Blood Count (CBC), Serum ZINC/Plasma, Vitamin D25-Hydroxy, Vitamin B12, Iron Profile, Thyroid Profile, and S. Calcium.",
    "originalPrice": 4999,
    "offerPrice": 2499,
    "couplePrice": 4500,
    "savings": 2500,
    "parametersCount": 46,
    "sampleType": "Blood (Serum & EDTA)",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 14,
    "posterImage": "/images/hair-fall-screening-10tests-official.jpg",
    "isFeatured": true,
    "isActive": true,
    "benefits": [
      "Accurate Testing & Diagnosis",
      "Quality Assured NABL Standards",
      "Expert Trichology Support",
      "Timely Digital Reports",
      "Free Home Collection: 8796645850"
],
    "inclusionsSummary": [
      "1. Testosterone Total — Complete (Primary androgen linked to DHT & male baldness)",
      "2. Serum Ferritin — Complete (Deep iron storage essential for follicle root strength)",
      "3. C-Reactive Protein — Qualitative (Screens for micro-vascular scalp inflammation)",
      "4. Complete Blood Count (CBC) — Complete (24 params, oxygenation & anemia check)",
      "5. Serum ZINC/Plasma — Complete (Keratin synthesis & follicle repair)",
      "6. Vitamin D25-Hydroxy — Complete (Follicular stem cell activation & hair cycle)",
      "7. Vitamin B12 — Complete (RBC production & follicle matrix nourishment)",
      "8. Iron Profile — Complete (Serum Iron, UIBC, TIBC, % Transferrin Saturation)",
      "9. Thyroid Profile — Complete (Total T3, Total T4, TSH Ultrasensitive)",
      "10. S. Calcium — Complete (Structural mineral essential for follicle integrity)"
    ],
    "includedTests": [
      {
        "name": "Testosterone Total",
        "description": "Primary male hormone regulating hair growth cycles",
        "parameters": [
          "Total Testosterone"
        ],
        "purpose": "Identifies androgenic alopecia risk, DHT conversion triggers, and hormonal thinning patterns"
      },
      {
        "name": "Serum Ferritin",
        "description": "Primary cellular iron store index",
        "parameters": [
          "Serum Ferritin"
        ],
        "purpose": "Evaluates follicle root iron reserves; deficient ferritin triggers premature telogen shedding"
      },
      {
        "name": "C-Reactive Protein (CRP)",
        "description": "Qualitative inflammatory marker",
        "parameters": [
          "CRP (Qualitative)"
        ],
        "purpose": "Screens for scalp micro-inflammation, folliculitis triggers, and systemic stress"
      },
      {
        "name": "Complete Blood Count (CBC)",
        "description": "Full hematological profile",
        "parameters": [
          "Hemoglobin",
          "TLC",
          "DLC (5-part)",
          "Platelet Count",
          "Total RBC",
          "MCV",
          "MCH",
          "MCHC",
          "PCV"
        ],
        "purpose": "Ensures adequate oxygen-carrying capacity and capillary nourishment to scalp papillae"
      },
      {
        "name": "Serum ZINC / Plasma",
        "description": "Essential trace element concentration",
        "parameters": [
          "Serum Zinc"
        ],
        "purpose": "Cofactor in protein synthesis, keratin construction, and hair matrix cell division"
      },
      {
        "name": "Vitamin D25-Hydroxy",
        "description": "Steroid pre-hormone governing follicle cycles",
        "parameters": [
          "Vitamin D25-OH Total"
        ],
        "purpose": "Stimulates dormant hair follicles into the active anagen growth phase"
      },
      {
        "name": "Vitamin B12",
        "description": "Cyanocobalamin concentration",
        "parameters": [
          "Vitamin B12"
        ],
        "purpose": "Powers rapid DNA synthesis in rapidly dividing follicle matrix cells"
      },
      {
        "name": "Iron Profile",
        "description": "Complete serum iron dynamics",
        "parameters": [
          "Serum Iron",
          "TIBC",
          "UIBC",
          "% Transferrin Saturation"
        ],
        "purpose": "Detects latent iron deficiency that causes gradual diffuse hair thinning"
      },
      {
        "name": "Thyroid Profile",
        "description": "Metabolic axis evaluation",
        "parameters": [
          "Total T3",
          "Total T4",
          "TSH Ultrasensitive"
        ],
        "purpose": "Screens for hypo- and hyper-thyroidism causing brittle hair and accelerated shedding"
      },
      {
        "name": "S. Calcium",
        "description": "Serum calcium level",
        "parameters": [
          "Serum Calcium"
        ],
        "purpose": "Essential mineral for hair bulb anchoring, cellular signaling and structural hair density"
      }
    ],
    "faqs": [
      {
        "question": "Why are 10 tests included in the Men's Hair Fall Screening?",
        "answer": "Male hair thinning is often multifactorial — driven by testosterone/DHT sensitivity, low ferritin or zinc, vitamin D/B12 deficiencies, or thyroid imbalance. This 10-test panel pinpoints the exact clinical trigger."
      },
      {
        "question": "What is the single vs two person price?",
        "answer": "As printed on our official brochure, single person testing is ₹2,499/-, and two persons / combo is ₹4,500/- (saving an extra ₹500)."
      },
      {
        "question": "How can I book free home collection?",
        "answer": "Book directly through our website or call / WhatsApp Aryan Saini at 8796645850 for priority doorstep sample pickup in Greater Noida & Delhi NCR."
      }
    ]
  },
  {
    "id": "pkg-hair-treatment-women",
    "slug": "hair-treatment-screening-women",
    "name": "Hair Fall Screening (Women's Package)",
    "subtitle": "Targeted Trichology, Hormonal (Progesterone & Testosterone) & Micronutrient Panel for Women (Offer ₹2,499)",
    "tag": "Specialist Care ₹2,499",
    "description": "Comprehensive female hair thinning and shedding evaluation from our official brochure. Covers 10 targeted investigations: Complete Blood Count (CBC), Serum Ferritin, Folic Acid (Folate), Testosterone Total, Serum ZINC/Plasma, Iron Profile, Vitamin D25-Hydroxy, Vitamin B12, Progesterone, and Thyroid Profile.",
    "originalPrice": 5499,
    "offerPrice": 2499,
    "couplePrice": 4500,
    "savings": 3000,
    "parametersCount": 46,
    "sampleType": "Blood (Serum & EDTA)",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 14,
    "posterImage": "/images/hair-fall-screening-10tests-official.jpg",
    "isFeatured": true,
    "isActive": true,
    "benefits": [
      "Accurate Testing & Diagnosis",
      "Quality Assured NABL Standards",
      "Expert Support for Female Hair Loss",
      "Timely Digital Reports",
      "Free Home Collection: 8796645850"
],
    "inclusionsSummary": [
      "1. Complete Blood Count (CBC) — Complete (24 params, anemia & root oxygenation)",
      "2. Serum Ferritin — Complete (Threshold >50 ng/mL required to stop female diffuse shedding)",
      "3. Folic Acid (Folate) — Complete (Crucial for DNA replication & keratin synthesis in follicles)",
      "4. Testosterone Total — Complete (Screens for hyperandrogenism & PCOS-related thinning)",
      "5. Serum ZINC/Plasma — Complete (Trace element for follicular anchoring & scalp health)",
      "6. Iron Profile — Complete (Serum Iron, UIBC, TIBC, % Saturation)",
      "7. Vitamin D25-Hydroxy — Complete (Awakens follicle stem cells and triggers regrowth)",
      "8. Vitamin B12 — Complete (Follicular nerve & capillary nourishment)",
      "9. Progesterone — Complete (Luteal hormone balance preventing postpartum/chronic hair loss)",
      "10. Thyroid Profile — Complete (Total T3, Total T4, TSH Ultrasensitive)"
    ],
    "includedTests": [
      {
        "name": "Complete Blood Count (CBC)",
        "description": "Full hematological profile",
        "parameters": [
          "Hemoglobin",
          "TLC",
          "DLC (5-part)",
          "Platelet Count",
          "Total RBC",
          "MCV",
          "MCH",
          "MCHC",
          "PCV"
        ],
        "purpose": "Screens for female microcytic/macrocytic anemia and oxygenation to hair roots"
      },
      {
        "name": "Serum Ferritin",
        "description": "Deep cellular iron store concentration",
        "parameters": [
          "Serum Ferritin"
        ],
        "purpose": "#1 marker in women; levels below 50 ng/mL trigger chronic diffuse telogen effluvium"
      },
      {
        "name": "Folic Acid (Folate)",
        "description": "Serum folate concentration",
        "parameters": [
          "Serum Folic Acid"
        ],
        "purpose": "Required for rapid DNA replication, keratinocyte division and hair shaft keratinization"
      },
      {
        "name": "Testosterone Total",
        "description": "Female androgen evaluation",
        "parameters": [
          "Total Testosterone"
        ],
        "purpose": "Detects hyperandrogenism, PCOS and hormonal scalp crown thinning"
      },
      {
        "name": "Serum ZINC / Plasma",
        "description": "Essential trace element",
        "parameters": [
          "Serum Zinc"
        ],
        "purpose": "Essential trace element for cellular repair, follicle anchoring and anti-dandruff health"
      },
      {
        "name": "Iron Profile",
        "description": "Comprehensive iron panel",
        "parameters": [
          "Serum Iron",
          "TIBC",
          "UIBC",
          "% Transferrin Saturation"
        ],
        "purpose": "Comprehensive blood iron dynamics to detect latent deficiency before full anemia"
      },
      {
        "name": "Vitamin D25-Hydroxy",
        "description": "Serum 25-OH vitamin D3",
        "parameters": [
          "Vitamin D25-OH Total"
        ],
        "purpose": "Steroid pre-hormone critical for awakening stem cells in the hair follicle bulge"
      },
      {
        "name": "Vitamin B12",
        "description": "Serum cyanocobalamin concentration",
        "parameters": [
          "Vitamin B12"
        ],
        "purpose": "Protects follicle nerve supply and ensures oxygen delivery to root capillaries"
      },
      {
        "name": "Progesterone",
        "description": "Female luteal reproductive hormone",
        "parameters": [
          "Serum Progesterone"
        ],
        "purpose": "Key female luteal hormone; imbalance triggers postpartum & menopausal hair shedding"
      },
      {
        "name": "Thyroid Profile",
        "description": "Master metabolic thyroid axis",
        "parameters": [
          "Total T3",
          "Total T4",
          "TSH Ultrasensitive"
        ],
        "purpose": "Screens for hypo/hyperthyroidism causing dry brittle hair and excessive shower shedding"
      }
    ],
    "faqs": [
      {
        "question": "Why are Ferritin, Folic Acid and Progesterone specifically tested for women?",
        "answer": "In women, hair loss is most frequently triggered by low iron storage (Ferritin <50 ng/mL even with normal Hb), folate deficiency affecting hair keratin, or progesterone/estrogen imbalances. This panel isolates the exact hormonal or nutritional trigger."
      },
      {
        "question": "What is the offer price?",
        "answer": "Single person testing is ₹2,499/- (MRP ₹5,499), and two persons / family combo is ₹4,500/-."
      },
      {
        "question": "Can I take this test during my menstrual cycle?",
        "answer": "Yes, though testing around day 21 (mid-luteal phase) is often optimal for progesterone interpretation. Our phlebotomist can advise you based on your cycle."
      }
    ]
  }
];

export { INITIAL_TESTS } from './allTestsData';

export const SERVICEABLE_AREAS: ServiceArea[] = [
  {
    id: 'sa-110007',
    pincode: '110007',
    areaName: 'New Chandrawal / Kamla Nagar / Delhi University North Campus',
    city: 'Delhi',
    state: 'Delhi',
    isHomeCollectionAvailable: true,
    turnaroundHours: 12,
    deliveryFee: 0,
  },
  {
    id: 'sa-110001',
    pincode: '110001',
    areaName: 'Connaught Place / Central Delhi',
    city: 'Delhi',
    state: 'Delhi',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
  {
    id: 'sa-110009',
    pincode: '110009',
    areaName: 'GTB Nagar / Model Town / Kingsway Camp',
    city: 'Delhi',
    state: 'Delhi',
    isHomeCollectionAvailable: true,
    turnaroundHours: 12,
    deliveryFee: 0,
  },
  {
    id: 'sa-110033',
    pincode: '110033',
    areaName: 'Azadpur / Adarsh Nagar / Jahangirpuri',
    city: 'Delhi',
    state: 'Delhi',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
  {
    id: 'sa-110052',
    pincode: '110052',
    areaName: 'Ashok Vihar / Satyawati Colony / Wazirpur',
    city: 'Delhi',
    state: 'Delhi',
    isHomeCollectionAvailable: true,
    turnaroundHours: 12,
    deliveryFee: 0,
  },
  {
    id: 'sa-110085',
    pincode: '110085',
    areaName: 'Rohini Sector 1 to 15 / Pitampura',
    city: 'Delhi',
    state: 'Delhi',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
  {
    id: 'sa-201310',
    pincode: '201310',
    areaName: 'Paramount Golf Foreste / Swarn Nagri / Greater Noida',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    isHomeCollectionAvailable: true,
    turnaroundHours: 12,
    deliveryFee: 0,
  },
  {
    id: 'sa-201306',
    pincode: '201306',
    areaName: 'Alpha 1 & 2 / Beta 1 & 2 / Greater Noida Central',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    isHomeCollectionAvailable: true,
    turnaroundHours: 12,
    deliveryFee: 0,
  },
  {
    id: 'sa-201308',
    pincode: '201308',
    areaName: 'Greater Noida West / Gaur City / Ecotech',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
  {
    id: 'sa-201301',
    pincode: '201301',
    areaName: 'Noida Sector 1 to Sector 30 / Atta Market',
    city: 'Noida',
    state: 'Uttar Pradesh',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
  {
    id: 'sa-201303',
    pincode: '201303',
    areaName: 'Noida Sector 126 / Expressway / Raipur Khadar',
    city: 'Noida',
    state: 'Uttar Pradesh',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
  {
    id: 'sa-201014',
    pincode: '201014',
    areaName: 'Indirapuram / Vaishali / Ghaziabad NCR',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    isHomeCollectionAvailable: true,
    turnaroundHours: 14,
    deliveryFee: 0,
  },
];

export const INITIAL_COLLECTORS: SampleCollector[] = [
  {
    id: 'col-1',
    name: 'Rajesh Sharma (Phlebotomist)',
    phone: '7982348151',
    vehicleNumber: 'DL-01-AB-4920',
    activeArea: 'Delhi North & Kamla Nagar',
    status: 'available',
  },
  {
    id: 'col-2',
    name: 'Amit Verma (Phlebotomist)',
    phone: '8796645850',
    vehicleNumber: 'UP-16-BZ-8812',
    activeArea: 'Greater Noida & Golf Foreste',
    status: 'available',
  },
  {
    id: 'col-3',
    name: 'Suresh Kumar (Senior Phlebotomist)',
    phone: '9953022493',
    vehicleNumber: 'DL-04-XY-3105',
    activeArea: 'Noida & Ghaziabad Corridor',
    status: 'available',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SANGAM10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 800,
    maxDiscount: 200,
    description: 'Flat 10% discount on all bookings over ₹800',
    validUntil: '2027-12-31',
    usageCount: 42,
    isActive: true,
  },
  {
    code: 'HEALTH2026',
    discountType: 'fixed',
    discountValue: 150,
    minOrderValue: 999,
    description: '₹150 instant rebate on health checkup packages',
    validUntil: '2027-12-31',
    usageCount: 18,
    isActive: true,
  },
  {
    code: 'FAMILY500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 3500,
    description: '₹500 privilege discount on family bundles above ₹3,500',
    validUntil: '2027-12-31',
    usageCount: 9,
    isActive: true,
  },
];

export const SEED_SAMPLE_REPORT: LaboratoryReport = {
  id: 'rep-bharti-pal-2026',
  bookingId: 'book-seed-01',
  bookingReference: 'SD-2026-8941',
  uhid: 'ANDA.0000203817',
  barcodeNo: 'AA798215',
  visitId: 'MNDA203830',
  patientName: 'Mrs. BHARTI PAL',
  age: 36,
  gender: 'Female (36 YRS / F)',
  refDoctor: 'Dr. SELF',
  specimenDrawnOn: '08/Oct/2026 10:00 AM',
  specimenReceivedOn: '08/Oct/2026 12:07 PM',
  reportDate: '08/Oct/2026 12:40 PM',
  clientName: 'CRL COLLECTION POINT (SAINI)',
  department: 'DEPARTMENT OF HAEMATOLOGY',
  testTitle: 'COMPLETE BLOOD COUNT (CBC) 23 PARAMETERS & ESR',
  seniorPathologist: 'DR. ANIL GUPTA\nM.B.B.S., M.D. (PATH)\nSR. CONSULTANT PATHOLOGIST\nREGD. NO. 5015',
  labManager: 'MR. ARYAN SAINI\nLAB MANAGER\nSANGAM DIAGNOSTICS',
  nablCertNo: 'MC-7078',
  downloadToken: 'valid-token-bharti-pal',
  parameters: [
    { department: 'Haematology', testName: 'R.B.C', result: '4.41', unit: 'Millions/cumm', refRange: '4.5-5.5', method: 'Impedance variation', isAbnormal: true },
    { department: 'Haematology', testName: 'Haemoglobin', result: '10.4', unit: 'g/dl', refRange: '12.0-15.0', method: 'Spectrophotometry', isAbnormal: true },
    { department: 'Haematology', testName: 'Packed Cell Volume (PCV)', result: '31.00', unit: '%', refRange: '40.0-50.0', method: 'Analogical Integration', isAbnormal: true },
    { department: 'Haematology', testName: 'MCV', result: '70.29', unit: 'fL', refRange: '80-100', method: 'Calculated', isAbnormal: true },
    { department: 'Haematology', testName: 'MCH', result: '23.58', unit: 'pg', refRange: '27.0-32.0', method: 'Calculated', isAbnormal: true },
    { department: 'Haematology', testName: 'MCHC', result: '33.55', unit: 'g/dL', refRange: '27.0-48.0', method: 'Calculated', isAbnormal: false },
    { department: 'Haematology', testName: 'RDW-CV', result: '13.4', unit: '%', refRange: '11.5-14.0', method: 'Calculated', isAbnormal: false },
    { department: 'Haematology', testName: 'Platelet Count', result: '174', unit: 'x1000/uL', refRange: '150-450', method: 'Impedance Variation', isAbnormal: false },
    { department: 'Haematology', testName: 'Total WBC Count (TLC)', result: '9050', unit: '/cumm', refRange: '4000-10000', method: 'Impedance Variation', isAbnormal: false },
    { department: 'Haematology', testName: 'MPV', result: '12.00', unit: '%', refRange: '9.1-11.9', method: 'Calculated', isAbnormal: true },
    { department: 'Haematology', testName: 'PCT', result: '0.21', unit: '%', refRange: '0.18-0.39', method: 'Calculated', isAbnormal: false },
    { department: 'Haematology', testName: 'PDW', result: '30.70', unit: '%', refRange: '9.0-15.0', method: 'Calculated', isAbnormal: true },
    { department: 'Differential Leucocyte Count', testName: 'Neutrophil', result: '70', unit: '%', refRange: '40.0-80.0', method: 'Flow cytometry/manual', isAbnormal: false },
    { department: 'Differential Leucocyte Count', testName: 'Lymphocyte', result: '20', unit: '%', refRange: '20.0-40.0', method: 'Flow cytometry/manual', isAbnormal: false },
    { department: 'Differential Leucocyte Count', testName: 'Monocytes', result: '08', unit: '%', refRange: '2-10', method: 'Flow cytometry/manual', isAbnormal: false },
    { department: 'Differential Leucocyte Count', testName: 'Eosinophils', result: '02', unit: '%', refRange: '01-06', method: 'Flow cytometry/manual', isAbnormal: false },
    { department: 'Differential Leucocyte Count', testName: 'Basophils', result: '00', unit: '%', refRange: '0-2', method: 'Flow cytometry/manual', isAbnormal: false },
    { department: 'Absolute Counts', testName: 'Absolute Neutrophils', result: '6.34', unit: '1000/uL', refRange: '2.00-7.00', method: 'Calculated', isAbnormal: false },
    { department: 'Absolute Counts', testName: 'Absolute Lymphocytes', result: '1.81', unit: '1000/uL', refRange: '1.00-3.00', method: 'Calculated', isAbnormal: false },
    { department: 'Absolute Counts', testName: 'Absolute Monocytes', result: '0.72', unit: '1000/uL', refRange: '0.20-1.00', method: 'Calculated', isAbnormal: false },
    { department: 'Absolute Counts', testName: 'Absolute Eosinophils', result: '0.18', unit: '1000/uL', refRange: '0.02-0.50', method: 'Calculated', isAbnormal: false },
    { department: 'Ratios', testName: 'Neutrophil-Lymphocyte Ratio', result: '3.50', unit: '', refRange: 'Normal < 3.0', method: 'Calculated', isAbnormal: true },
    { department: 'Ratios', testName: 'Platelet-Lymphocyte Ratio', result: '9', unit: '', refRange: '', method: 'Calculated', isAbnormal: false },
  ],
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-seed-01',
    bookingReference: 'SD-2026-8941',
    createdAt: '2026-10-24T08:30:00Z',
    updatedAt: '2026-10-24T12:45:00Z',
    patient: {
      fullName: 'Mrs. Bharti Pal',
      age: 36,
      gender: 'female',
      mobile: '9876543210',
      email: 'bharti.pal@example.com',
      relationship: 'self',
      doctorNotes: 'Routine health checkup and CBC evaluation',
    },
    collectionAddress: {
      houseNumber: 'Flat 402, Tower B',
      street: 'Near Kamla Nagar Market',
      landmark: 'Opposite North Campus Gate',
      area: 'New Chandrawal',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110007',
      accessInstructions: 'Ring bell on 4th floor.',
    },
    selectedDate: '2026-10-24',
    selectedSlot: '08:00 AM - 09:30 AM',
    items: [
      {
        type: 'package',
        id: 'pkg-basic-health',
        slug: 'basic-health-package',
        name: 'Basic Health Package',
        price: 999,
        quantity: 1,
      },
    ],
    subtotal: 999,
    discount: 0,
    collectionFee: 0,
    totalAmount: 999,
    paymentMethod: 'cash_on_collection',
    paymentStatus: 'paid',
    bookingStatus: 'report_ready',
    collector: INITIAL_COLLECTORS[0],
    sampleBarcodes: ['AA798215'],
    collectionNotes: 'Sample drawn smoothly from left antecubital vein. Fasting verified.',
    reportId: 'rep-bharti-pal-2026',
  },
  {
    id: 'book-seed-02',
    bookingReference: 'SD-2026-8942',
    createdAt: '2026-10-24T14:15:00Z',
    updatedAt: '2026-10-24T14:30:00Z',
    patient: {
      fullName: 'Vikramaditya Rao',
      age: 48,
      gender: 'male',
      mobile: '9811223344',
      email: 'vikram.rao@example.com',
      relationship: 'self',
    },
    collectionAddress: {
      houseNumber: 'Villa 12, Golf View',
      street: 'Paramount Golf Foreste',
      landmark: 'Club House Road',
      area: 'Surajpur',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      pincode: '201310',
    },
    selectedDate: '2026-10-25',
    selectedSlot: '07:00 AM - 08:30 AM',
    items: [
      {
        type: 'package',
        id: 'pkg-full-body',
        slug: 'full-body-health-checkup',
        name: 'Full Body Health Checkup (75 Parameters)',
        price: 1399,
        quantity: 1,
      },
    ],
    subtotal: 1399,
    couponCode: 'SANGAM10',
    discount: 139.9,
    collectionFee: 0,
    totalAmount: 1259.1,
    paymentMethod: 'upi_qr',
    paymentStatus: 'paid',
    bookingStatus: 'collector_assigned',
    collector: INITIAL_COLLECTORS[1],
    collectionNotes: 'Morning fasting blood sample scheduled.',
  },
];

// -------------------------------------------------------------
// Vertical Enterprise Operating System Seed Datasets
// -------------------------------------------------------------

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    patientName: 'Dr. Rajiv Mehra',
    mobile: '9811002233',
    email: 'rajiv.mehra@aiims.edu',
    area: 'Paramount Golf Forest, Greater Noida',
    source: 'prescription_upload',
    temperature: 'hot',
    score: 95,
    status: 'quoted',
    interestDescription: 'Prescription upload: LFT, KFT Extended, HbA1c and Lipid Profile for home collection.',
    packageOrTestName: 'Advanced Health Package (₹1,499)',
    estimatedValue: 1499,
    notes: 'Prescription scanned via AI OCR. Immediate morning slot requested at Paramount Golf Forest.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    lastContactedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    nextFollowUpAt: new Date(Date.now() + 3600000 * 3).toISOString(),
    automatedRemindersCount: 1,
    lastMessageSent: 'Instant automated WhatsApp quotation and pre-filled booking link delivered.',
  },
  {
    id: 'lead-02',
    patientName: 'Sneha Kapoor',
    mobile: '9910203040',
    email: 'sneha.k@gmail.com',
    area: 'Sector Chi 3, Greater Noida',
    source: 'whatsapp_inquiry',
    temperature: 'hot',
    score: 88,
    status: 'new',
    interestDescription: 'Inquired via WhatsApp for Hair Fall Screening (Women) with Ferritin & Zinc.',
    packageOrTestName: 'Hair Treatment Screening (Women) — ₹2,499',
    estimatedValue: 2499,
    notes: 'Complaining of postpartum hair loss. Inquired if female phlebotomist is available.',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    automatedRemindersCount: 0,
  },
  {
    id: 'lead-03',
    patientName: 'Sunil Mehra',
    mobile: '9876543210',
    area: 'Zeta 1, Greater Noida',
    source: 'web_callback',
    temperature: 'warm',
    score: 72,
    status: 'contacted',
    interestDescription: 'Requested callback for Basic Health Package (₹799) morning collection.',
    packageOrTestName: 'Basic Health Package (₹799)',
    estimatedValue: 799,
    notes: 'Called by Lab Manager Aryan Saini. Patient asked to confirm 7:30 AM slot tomorrow.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    lastContactedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    automatedRemindersCount: 1,
    lastMessageSent: 'Morning fasting guidelines sent on WhatsApp.',
  },
  {
    id: 'lead-04',
    patientName: 'Arvind Sharma',
    mobile: '9811981100',
    area: 'Alpha 2, Greater Noida',
    source: 'prescription_upload',
    temperature: 'warm',
    score: 78,
    status: 'quoted',
    interestDescription: 'Prescription SD-QT-2026-1042 verified by Dr. Anil Gupta.',
    packageOrTestName: 'Cardiac Health Profile (₹1,299)',
    estimatedValue: 1299,
    notes: 'Quotation sent. Awaiting patient confirmation.',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    automatedRemindersCount: 2,
    lastMessageSent: 'Gentle follow-up sent with free home collection confirmation.',
  },
  {
    id: 'lead-05',
    patientName: 'Rahul Bhatia',
    mobile: '9711223344',
    area: 'Delta 1, Greater Noida',
    source: 'checkout_abandonment',
    temperature: 'cold',
    score: 45,
    status: 'cold_followup',
    interestDescription: 'Abandoned cart with Basic Health Package at payment step.',
    packageOrTestName: 'Basic Health Package (₹799)',
    estimatedValue: 799,
    notes: 'Automated cart recovery trigger scheduled.',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    automatedRemindersCount: 2,
    lastMessageSent: 'Automated WhatsApp recovery code "HEALTH5" (5% OFF) delivered.',
  },
];

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'pat-01',
    uhid: 'SD-UHID-2026-0012',
    fullName: 'Bharti Pal',
    mobile: '9876543210',
    email: 'bharti.pal@example.com',
    age: 42,
    gender: 'female',
    bloodGroup: 'B+',
    address: 'Flat 402, Tower B, Paramount Golf Forest',
    area: 'Zeta 1',
    pincode: '201308',
    chronicConditions: ['diabetes', 'thyroid'],
    healthRiskLevel: 'moderate',
    healthRiskSummary: 'Mildly elevated fasting blood glucose (138 mg/dL) with borderline TSH (4.8 uIU/mL). Quarterly monitoring advised.',
    loyaltyPoints: 420,
    loyaltyTier: 'Silver Member',
    totalBookings: 3,
    totalSpent: 3197,
    firstVisitDate: '2025-11-10',
    lastVisitDate: '2026-10-24',
    familyMembers: [
      { id: 'fam-01', name: 'Ramesh Pal', relation: 'spouse', age: 46, gender: 'male' },
      { id: 'fam-02', name: 'Ananya Pal', relation: 'child', age: 14, gender: 'female' },
    ],
    tags: ['Diabetic Recall', 'Paramount Resident', 'Loyal Patient'],
    pastReportIds: ['rep-bharti-pal-2026'],
    historicalMetrics: [
      { date: '2025-11-10', fastingSugar: 148, hba1c: 7.2, tsh: 5.1 },
      { date: '2026-04-15', fastingSugar: 142, hba1c: 6.9, tsh: 4.9 },
      { date: '2026-10-24', fastingSugar: 138, hba1c: 6.8, tsh: 4.8 },
    ],
  },
  {
    id: 'pat-02',
    uhid: 'SD-UHID-2026-0018',
    fullName: 'Vikramaditya Rao',
    mobile: '9811223344',
    email: 'vikram.rao@example.com',
    age: 48,
    gender: 'male',
    bloodGroup: 'O+',
    address: 'Villa 12, Golf View, Paramount Golf Forest',
    area: 'Surajpur / Zeta 1',
    pincode: '201310',
    chronicConditions: ['cardiac_risk', 'hypertension'],
    healthRiskLevel: 'high',
    healthRiskSummary: 'Elevated serum cholesterol (245 mg/dL) and triglycerides (220 mg/dL). High cardiovascular risk index.',
    loyaltyPoints: 890,
    loyaltyTier: 'Gold Member',
    totalBookings: 4,
    totalSpent: 5496,
    firstVisitDate: '2025-08-20',
    lastVisitDate: '2026-10-25',
    familyMembers: [
      { id: 'fam-03', name: 'Radha Rao', relation: 'spouse', age: 44, gender: 'female' },
    ],
    tags: ['Cardiac Alert', 'High Value', 'Quarterly Recall'],
    pastReportIds: ['rep-vikram-rao-2025'],
    historicalMetrics: [
      { date: '2025-08-20', cholesterol: 260, fastingSugar: 118 },
      { date: '2026-02-12', cholesterol: 252, fastingSugar: 114 },
      { date: '2026-10-25', cholesterol: 245, fastingSugar: 112 },
    ],
  },
  {
    id: 'pat-03',
    uhid: 'SD-UHID-2026-0031',
    fullName: 'Arvind Sharma',
    mobile: '9811981100',
    age: 45,
    gender: 'male',
    bloodGroup: 'A+',
    address: 'House 88, Pocket 4',
    area: 'Alpha 2',
    pincode: '201310',
    chronicConditions: ['diabetes'],
    healthRiskLevel: 'high',
    healthRiskSummary: 'Uncontrolled glycemic variation. Requires 90-day HbA1c review.',
    loyaltyPoints: 150,
    loyaltyTier: 'Bronze Member',
    totalBookings: 1,
    totalSpent: 1299,
    firstVisitDate: '2026-09-02',
    lastVisitDate: '2026-09-02',
    familyMembers: [],
    tags: ['Prescription Upload', 'Diabetic'],
    pastReportIds: [],
  },
  {
    id: 'pat-04',
    uhid: 'SD-UHID-2026-0044',
    fullName: 'Sunita Devi',
    mobile: '9899887766',
    age: 61,
    gender: 'female',
    bloodGroup: 'AB+',
    address: 'B-142, Sector Beta 1',
    area: 'Beta 1',
    pincode: '201308',
    chronicConditions: ['thyroid', 'hypertension'],
    healthRiskLevel: 'moderate',
    healthRiskSummary: 'Senior citizen on Thyroxine therapy. 6-monthly TSH re-test due.',
    loyaltyPoints: 360,
    loyaltyTier: 'Silver Member',
    totalBookings: 2,
    totalSpent: 2298,
    firstVisitDate: '2026-03-14',
    lastVisitDate: '2026-05-18',
    familyMembers: [],
    tags: ['Senior Citizen', 'Home Collection Preferred'],
    pastReportIds: [],
  },
  {
    id: 'pat-05',
    uhid: 'SD-UHID-2026-0056',
    fullName: 'Megha Chawla',
    mobile: '9910998877',
    age: 29,
    gender: 'female',
    bloodGroup: 'O+',
    address: 'Tower A-601, Paramount Golf Forest',
    area: 'Zeta 1',
    pincode: '201308',
    chronicConditions: ['alopecia'],
    healthRiskLevel: 'low',
    healthRiskSummary: 'Screened for diffuse hair shedding. Low serum Ferritin noted in previous test.',
    loyaltyPoints: 250,
    loyaltyTier: 'Silver Member',
    totalBookings: 1,
    totalSpent: 2499,
    firstVisitDate: '2026-09-20',
    lastVisitDate: '2026-09-20',
    familyMembers: [],
    tags: ['Hair Fall Screening', 'Paramount Resident'],
    pastReportIds: [],
  },
];

export const INITIAL_RETENTION_RECALLS: RetentionRecall[] = [
  {
    id: 'rec-01',
    patientId: 'pat-01',
    uhid: 'SD-UHID-2026-0012',
    patientName: 'Bharti Pal',
    patientMobile: '9876543210',
    recallType: 'diabetes_hba1c_90d',
    title: '90-Day Diabetic Glycemic Review (HbA1c + Fasting Sugar)',
    recommendedInvestigation: 'Basic Health Package (₹799) or HbA1c + Fasting Sugar (₹400)',
    recommendedSlug: 'basic-health-package',
    targetPrice: 799,
    discountCouponCode: 'CARE10',
    lastTestDate: '2026-08-16',
    dueDate: '2026-11-16',
    daysOverdue: 0,
    status: 'due',
    lastMessagePreview: 'Namaste Mrs. Bharti Pal, your 90-day diabetic checkup is due tomorrow. Book your morning home collection with 10% OFF.',
  },
  {
    id: 'rec-02',
    patientId: 'pat-02',
    uhid: 'SD-UHID-2026-0018',
    patientName: 'Vikramaditya Rao',
    patientMobile: '9811223344',
    recallType: 'cardiac_lipid_180d',
    title: '180-Day Cardiovascular & Lipid Profile Review',
    recommendedInvestigation: 'Cardiac Health Profile (₹1,299)',
    recommendedSlug: 'cardiac-health-profile',
    targetPrice: 1299,
    discountCouponCode: 'HEART15',
    lastTestDate: '2026-05-15',
    dueDate: '2026-11-15',
    daysOverdue: 1,
    status: 'dispatched_whatsapp',
    dispatchedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    dispatchedChannel: 'whatsapp',
    lastMessagePreview: 'Respected Mr. Rao, maintaining lipid control is vital for cardiac health. Your 6-month profile is due.',
  },
  {
    id: 'rec-03',
    patientId: 'pat-04',
    uhid: 'SD-UHID-2026-0044',
    patientName: 'Sunita Devi',
    patientMobile: '9899887766',
    recallType: 'thyroid_tsh_180d',
    title: '180-Day Thyroid Hormone Monitoring (T3, T4, TSH)',
    recommendedInvestigation: 'Thyroid Profile (₹300) / Basic Health Package (₹799)',
    recommendedSlug: 'basic-health-package',
    targetPrice: 799,
    discountCouponCode: 'SENIOR10',
    lastTestDate: '2026-04-20',
    dueDate: '2026-10-20',
    daysOverdue: 26,
    status: 'due',
    lastMessagePreview: 'Namaste Sunita ji, your 6-monthly thyroid checkup is overdue by 26 days. Free doorstep collection available.',
  },
  {
    id: 'rec-04',
    patientId: 'pat-05',
    uhid: 'SD-UHID-2026-0056',
    patientName: 'Megha Chawla',
    patientMobile: '9910998877',
    recallType: 'hair_treatment_45d',
    title: '45-Day Hair Treatment Mineral Follow-up (Ferritin + Zinc)',
    recommendedInvestigation: 'Serum Ferritin & Zinc Checkup',
    recommendedSlug: 'hair-treatment-screening-women',
    targetPrice: 1200,
    discountCouponCode: 'HAIRCARE',
    lastTestDate: '2026-09-20',
    dueDate: '2026-11-04',
    daysOverdue: 11,
    status: 'dispatched_sms',
    dispatchedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    dispatchedChannel: 'sms',
    lastMessagePreview: 'Hi Megha, review your hair regrowth progress with an essential mineral checkup.',
  },
  {
    id: 'rec-05',
    patientId: 'pat-03',
    uhid: 'SD-UHID-2026-0031',
    patientName: 'Arvind Sharma',
    patientMobile: '9811981100',
    recallType: 'annual_checkup_365d',
    title: 'Annual Full Body Preventive Health Checkup Anniversary',
    recommendedInvestigation: 'Advanced Health Package (₹1,499)',
    recommendedSlug: 'advanced-health-package',
    targetPrice: 1499,
    discountCouponCode: 'ANNUAL20',
    lastTestDate: '2025-11-20',
    dueDate: '2026-11-20',
    daysOverdue: 0,
    status: 'due',
    lastMessagePreview: 'Annual health checkup anniversary reminder: complete 75-test full body protection.',
  },
];

export const INITIAL_SPECIMENS: SampleSpecimen[] = [
  {
    id: 'spec-01',
    barcode: 'SD-B-798215-LAV',
    bookingId: 'book-seed-01',
    bookingReference: 'SD-2026-8941',
    patientName: 'Bharti Pal',
    patientMobile: '9876543210',
    tubeType: 'Purple / EDTA',
    department: 'Haematology',
    investigations: ['Complete Blood Count (CBC)', 'Erythrocyte Sedimentation Rate (ESR)'],
    status: 'report_approved',
    collectorName: 'Amit Kumar',
    collectedAt: '2026-10-24T08:15:00Z',
    receivedAtLabBy: 'Mr. Aryan Saini',
    receivedAtLabTime: '2026-10-24T09:45:00Z',
    temperatureCelsius: 4.2,
    panicValueDetected: false,
    notes: 'No hemolysis, optimal blood-anticoagulant ratio.',
  },
  {
    id: 'spec-02',
    barcode: 'SD-B-798215-SST',
    bookingId: 'book-seed-01',
    bookingReference: 'SD-2026-8941',
    patientName: 'Bharti Pal',
    patientMobile: '9876543210',
    tubeType: 'Red / SST Plain',
    department: 'Biochemistry',
    investigations: ['Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Lipid Profile', 'Thyroid Profile'],
    status: 'report_approved',
    collectorName: 'Amit Kumar',
    collectedAt: '2026-10-24T08:15:00Z',
    receivedAtLabBy: 'Mr. Aryan Saini',
    receivedAtLabTime: '2026-10-24T09:45:00Z',
    temperatureCelsius: 4.2,
    panicValueDetected: false,
    notes: 'Centrifuged at 3500 RPM for 10 minutes. Clean serum separated.',
  },
  {
    id: 'spec-03',
    barcode: 'SD-B-798215-GLU',
    bookingId: 'book-seed-01',
    bookingReference: 'SD-2026-8941',
    patientName: 'Bharti Pal',
    patientMobile: '9876543210',
    tubeType: 'Grey / Sodium Fluoride',
    department: 'Biochemistry',
    investigations: ['Fasting Blood Glucose'],
    status: 'report_approved',
    collectorName: 'Amit Kumar',
    collectedAt: '2026-10-24T08:15:00Z',
    receivedAtLabBy: 'Mr. Aryan Saini',
    receivedAtLabTime: '2026-10-24T09:45:00Z',
    temperatureCelsius: 4.0,
    panicValueDetected: false,
    notes: 'Inhibits glycolysis for accurate plasma glucose measurement.',
  },
  {
    id: 'spec-04',
    barcode: 'SD-B-798215-URN',
    bookingId: 'book-seed-01',
    bookingReference: 'SD-2026-8941',
    patientName: 'Bharti Pal',
    patientMobile: '9876543210',
    tubeType: 'Sterile Container (Urine)',
    department: 'Clinical Pathology',
    investigations: ['Urine Routine & Microscopy (R/M)'],
    status: 'report_approved',
    collectorName: 'Amit Kumar',
    collectedAt: '2026-10-24T08:15:00Z',
    receivedAtLabBy: 'Mr. Aryan Saini',
    receivedAtLabTime: '2026-10-24T09:45:00Z',
    temperatureCelsius: 5.1,
    panicValueDetected: false,
    notes: 'Clean catch midstream specimen.',
  },
  {
    id: 'spec-05',
    barcode: 'SD-B-894201-LAV',
    bookingId: 'book-seed-02',
    bookingReference: 'SD-2026-8942',
    patientName: 'Vikramaditya Rao',
    patientMobile: '9811223344',
    tubeType: 'Purple / EDTA',
    department: 'Haematology',
    investigations: ['Complete Blood Count (CBC)'],
    status: 'cold_chain_transit',
    collectorName: 'Rahul Verma',
    collectedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    temperatureCelsius: 4.1,
    panicValueDetected: false,
    notes: 'In cold box transport to Paramount Golf Forest Central Lab.',
  },
  {
    id: 'spec-06',
    barcode: 'SD-B-894201-YEL',
    bookingId: 'book-seed-02',
    bookingReference: 'SD-2026-8942',
    patientName: 'Vikramaditya Rao',
    patientMobile: '9811223344',
    tubeType: 'Yellow / SST Gel',
    department: 'Biochemistry',
    investigations: ['Lipid Profile', 'Thyroid Profile', 'LFT', 'KFT'],
    status: 'cold_chain_transit',
    collectorName: 'Rahul Verma',
    collectedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    temperatureCelsius: 4.1,
    panicValueDetected: false,
    notes: 'Gel separator barrier intact.',
  },
];

export const INITIAL_AUTOMATION_LOGS: AutomationLog[] = [
  {
    id: 'log-01',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    triggerType: 'instant_whatsapp_report',
    targetName: 'Bharti Pal',
    targetPhone: '9876543210',
    channel: 'whatsapp',
    actionSummary: 'Automated Doctor-Signed Report Delivered',
    details: 'Dr. Anil Gupta signed Report SD-2026-8941. Automated WhatsApp dispatched with direct PDF download token and NABL QR code.',
    status: 'sent',
  },
  {
    id: 'log-02',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    triggerType: 'phlebotomist_autodispatch',
    targetName: 'Rahul Verma (Phlebotomist)',
    targetPhone: '9876543212',
    channel: 'sms',
    actionSummary: 'Smart Phlebotomist Auto-Assignment',
    details: 'Auto-routed Booking SD-2026-8942 at Paramount Golf Forest (Villa 12) based on proximity and 07:00 AM slot availability.',
    status: 'sent',
  },
  {
    id: 'log-03',
    timestamp: new Date(Date.now() - 3600000 * 3.5).toISOString(),
    triggerType: 'specimen_barcode_gen',
    targetName: 'Booking SD-2026-8942',
    targetPhone: '9811223344',
    channel: 'system_alert',
    actionSummary: 'Calculated Vacutainers & Barcodes',
    details: 'Calculated 2 required vacutainers (1x Purple EDTA, 1x Yellow SST Gel). Assigned barcodes SD-B-894201-LAV & SD-B-894201-YEL.',
    status: 'sent',
  },
  {
    id: 'log-04',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    triggerType: 'retention_recall',
    targetName: 'Vikramaditya Rao',
    targetPhone: '9811223344',
    channel: 'whatsapp',
    actionSummary: '180-Day Cardiac Recall Notification',
    details: 'Triggered automated WhatsApp reminder for 6-monthly Lipid Profile review with loyalty coupon HEART15.',
    status: 'sent',
  },
  {
    id: 'log-05',
    timestamp: new Date(Date.now() - 3600000 * 7).toISOString(),
    triggerType: 'lead_followup',
    targetName: 'Dr. Rajiv Mehra',
    targetPhone: '9811002233',
    channel: 'whatsapp',
    actionSummary: 'Instant Prescription Quotation Sent',
    details: 'AI parsed prescription into Advanced Health Package. Automated WhatsApp quotation delivered with 1-click booking link.',
    status: 'sent',
  },
  {
    id: 'log-06',
    timestamp: new Date(Date.now() - 3600000 * 9).toISOString(),
    triggerType: 'loyalty_points_earned',
    targetName: 'Bharti Pal',
    targetPhone: '9876543210',
    channel: 'system_alert',
    actionSummary: 'Silver Loyalty Tier Progression',
    details: 'Credited 99 loyalty points for Booking SD-2026-8941. Balance: 420 points (Silver Member).',
    status: 'sent',
  },
];

