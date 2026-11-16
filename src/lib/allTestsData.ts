import { DiagnosticTest } from '@/types';

export const INITIAL_TESTS: DiagnosticTest[] = [
  {
    "id": "test-cbc-esr",
    "slug": "cbc-and-esr",
    "name": "Complete Blood Count (CBC) with ESR",
    "shortCode": "CBC+ESR",
    "category": "haematology",
    "categoryLabel": "Haematology",
    "description": "Quantitative evaluation of red blood cells, white blood cells, platelets, and erythrocyte sedimentation rate to detect infection, anemia, and inflammation.",
    "price": 350,
    "discountedPrice": 200,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 24,
    "parameters": [
      "Haemoglobin (Hb)",
      "Total Leucocyte Count (TLC / WBC)",
      "Platelet Count",
      "RBC Count",
      "Packed Cell Volume (PCV / Hematocrit)",
      "Mean Corpuscular Volume (MCV)",
      "Mean Corpuscular Hemoglobin (MCH)",
      "Mean Corpuscular Hemoglobin Concentration (MCHC)",
      "Red Cell Distribution Width (RDW-CV)",
      "Neutrophils %",
      "Lymphocytes %",
      "Monocytes %",
      "Eosinophils %",
      "Basophils %",
      "Absolute Neutrophil Count",
      "Absolute Lymphocyte Count",
      "Absolute Monocyte Count",
      "Absolute Eosinophil Count",
      "Mean Platelet Volume (MPV)",
      "Plateletcrit (PCT)",
      "Platelet Distribution Width (PDW)",
      "Neutrophil-Lymphocyte Ratio (NLR)",
      "Platelet-Lymphocyte Ratio (PLR)",
      "ESR (Westergren Method)"
    ],
    "clinicalSignificance": "Essential baseline investigation for detecting systemic infections, bacterial/viral illness, leukemias, allergic conditions, thrombocytopenia, and inflammatory disorders.",
    "preparationInstructions": [
      "No fasting required.",
      "Stay hydrated with plain water before sample draw."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-lipid-profile",
    "slug": "lipid-profile",
    "name": "Lipid Profile (Complete Heart & Cholesterol)",
    "shortCode": "LIPID",
    "category": "lipid-profile",
    "categoryLabel": "Cardiac & Lipid Profile",
    "description": "Measures total cholesterol, good HDL cholesterol, bad LDL cholesterol, triglycerides, and VLDL to estimate cardiovascular and coronary artery disease risk.",
    "price": 500,
    "discountedPrice": 300,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol (Good)",
      "LDL Cholesterol (Bad)",
      "VLDL Cholesterol",
      "Cholesterol / HDL Ratio"
    ],
    "clinicalSignificance": "Crucial for assessing atherosclerosis, myocardial infarction risk, hyperlipidemia, and monitoring dietary or statin drug efficacy.",
    "preparationInstructions": [
      "Requires 10-12 hours of overnight fasting.",
      "Water is permitted.",
      "Avoid high-fat meal and alcohol the evening prior to test."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-lft",
    "slug": "liver-function-test-lft",
    "name": "Liver Function Test (LFT Complete)",
    "shortCode": "LFT",
    "category": "liver-function",
    "categoryLabel": "Liver Function",
    "description": "Comprehensive biochemical assessment of liver integrity, biliary drainage, and protein synthesis.",
    "price": 600,
    "discountedPrice": 300,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 8,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct (Conjugated)",
      "Bilirubin Indirect (Unconjugated)",
      "SGOT / AST (Aspartate Aminotransferase)",
      "SGPT / ALT (Alanine Aminotransferase)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Serum Albumin",
      "Serum Globulin",
      "Albumin / Globulin (A/G) Ratio"
    ],
    "clinicalSignificance": "Screens for hepatitis, fatty liver disease, cirrhosis, drug-induced hepatotoxicity, alcohol-related damage, and biliary obstruction.",
    "preparationInstructions": [
      "8-10 hours fasting recommended for optimal clarity.",
      "Avoid alcohol for 24 hours."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-kft-egfr",
    "slug": "kidney-function-test-kft-egfr",
    "name": "Kidney Function Test (KFT with eGFR)",
    "shortCode": "KFT+eGFR",
    "category": "kidney-function",
    "categoryLabel": "Kidney Function",
    "description": "Evaluates glomerular filtration, nitrogenous waste excretion, urea clearance, and serum creatinine balance.",
    "price": 600,
    "discountedPrice": 300,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 8,
    "reportDeliveryHours": 12,
    "parametersCount": 7,
    "parameters": [
      "Blood Urea",
      "Serum Creatinine",
      "Blood Urea Nitrogen (BUN)",
      "Uric Acid",
      "BUN / Creatinine Ratio",
      "Urea / Creatinine Ratio",
      "eGFR (Estimated Glomerular Filtration Rate)"
    ],
    "clinicalSignificance": "Monitors chronic kidney disease (CKD), acute kidney injury, diabetic nephropathy, hypertensive renal damage, and gout.",
    "preparationInstructions": [
      "Fasting of 8 hours is preferred.",
      "Avoid heavy red meat consumption right before test."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-thyroid-profile",
    "slug": "thyroid-profile-total",
    "name": "Thyroid Profile Total (T3, T4, TSH)",
    "shortCode": "T3-T4-TSH",
    "category": "thyroid",
    "categoryLabel": "Thyroid Hormones",
    "description": "Simultaneous assessment of Triiodothyronine (T3), Thyroxine (T4), and Ultrasensitive Thyroid Stimulating Hormone (TSH).",
    "price": 500,
    "discountedPrice": 300,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Ultrasensitive TSH (Thyroid Stimulating Hormone)"
    ],
    "clinicalSignificance": "Screens for hypothyroidism, hyperthyroidism, thyroid nodules, Hashimoto thyroiditis, unexplained weight changes, and fatigue.",
    "preparationInstructions": [
      "Early morning sample collection is ideal due to diurnal TSH rhythm.",
      "Inform technician if taking thyroid hormone replacement medication."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-hba1c",
    "slug": "hba1c-glycated-hemoglobin",
    "name": "HbA1c (Glycated Hemoglobin) with eAG",
    "shortCode": "HbA1c",
    "category": "diabetes",
    "categoryLabel": "Diabetes",
    "description": "Measures percentage of glycated hemoglobin to establish 3-month average blood glucose control using HPLC method.",
    "price": 500,
    "discountedPrice": 300,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "HbA1c (% of Total Hemoglobin)",
      "Estimated Average Glucose (eAG in mg/dL)"
    ],
    "clinicalSignificance": "Gold standard test for diabetes diagnosis (threshold >= 6.5%), prediabetes detection (5.7 - 6.4%), and ongoing glycemic control.",
    "preparationInstructions": [
      "No fasting required. Can be drawn at any time of day."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-sugar-fasting",
    "slug": "blood-glucose-fasting",
    "name": "Blood Glucose (Fasting Blood Sugar / FBS)",
    "shortCode": "FBS",
    "category": "diabetes",
    "categoryLabel": "Diabetes",
    "description": "Enzymatic quantitative measurement of plasma glucose after an overnight fast.",
    "price": 150,
    "discountedPrice": 100,
    "sampleType": "Blood (Fluoride Plasma)",
    "tubeColor": "Grey / Sodium Fluoride",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 8,
    "parametersCount": 1,
    "parameters": [
      "Fasting Plasma Glucose"
    ],
    "clinicalSignificance": "Key diagnostic test for fasting hyperglycemia, impaired fasting glucose, and diabetes mellitus management.",
    "preparationInstructions": [
      "Strict 8-10 hours overnight fasting required. Water is allowed."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-vitamin-d",
    "slug": "vitamin-d-25-hydroxy",
    "name": "Vitamin D (25-Hydroxy / 25-OH)",
    "shortCode": "VIT-D",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Total 25-hydroxyvitamin D measurement to assess sunshine vitamin sufficiency for bone and immune health.",
    "price": 1200,
    "discountedPrice": 799,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 14,
    "parametersCount": 1,
    "parameters": [
      "25-OH Vitamin D Total"
    ],
    "clinicalSignificance": "Detects Vitamin D deficiency (<20 ng/mL), insufficiency, osteoporosis, rickets, muscle weakness, and fatigue.",
    "preparationInstructions": [
      "No fasting required."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-vitamin-b12",
    "slug": "vitamin-b12-cyanocobalamin",
    "name": "Vitamin B12 (Cyanocobalamin)",
    "shortCode": "VIT-B12",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Quantifies serum cobalamin levels essential for nerve conduction, memory, and erythropoiesis.",
    "price": 1100,
    "discountedPrice": 699,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 8,
    "reportDeliveryHours": 14,
    "parametersCount": 1,
    "parameters": [
      "Serum Vitamin B12"
    ],
    "clinicalSignificance": "Investigates megaloblastic anemia, peripheral neuropathy, tingling sensation, memory fog, especially in vegetarians.",
    "preparationInstructions": [
      "Overnight fasting of 8 hours is recommended."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-urine-routine",
    "slug": "urine-routine-and-microscopy",
    "name": "Urine Routine & Microscopic Examination (R/M)",
    "shortCode": "URINE-RM",
    "category": "urine-tests",
    "categoryLabel": "Urine & Renal",
    "description": "Physical, chemical strip, and sediment microscopy of urine to assess kidneys, urinary tract, and systemic metabolism.",
    "price": 250,
    "discountedPrice": 150,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 8,
    "parametersCount": 15,
    "parameters": [
      "Color & Transparency",
      "Specific Gravity",
      "pH Reaction",
      "Albumin / Protein",
      "Glucose / Sugar",
      "Ketone Bodies",
      "Bile Salt & Bile Pigment",
      "Urobilinogen",
      "Blood / Hemoglobin",
      "Pus Cells (Leukocytes / HPF)",
      "Red Blood Cells (RBCs / HPF)",
      "Epithelial Cells / HPF",
      "Casts",
      "Crystals",
      "Bacteria / Yeast"
    ],
    "clinicalSignificance": "Identifies urinary tract infections (UTI), glomerulonephritis, proteinuria, kidney stones, and glucosuria.",
    "preparationInstructions": [
      "Collect mid-stream clean catch urine in the provided sterile container.",
      "Morning first sample preferred."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-serum-calcium",
    "slug": "serum-calcium-total",
    "name": "Serum Calcium (Total)",
    "shortCode": "S-CAL",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Measures total circulating calcium to evaluate bone metabolism and parathyroid gland activity.",
    "price": 300,
    "discountedPrice": 199,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 10,
    "parametersCount": 1,
    "parameters": [
      "Serum Calcium Total"
    ],
    "clinicalSignificance": "Evaluates hypercalcemia (malignancy, hyperparathyroidism) and hypocalcemia (tetany, vitamin D deficiency, renal disease).",
    "preparationInstructions": [
      "No strict fasting required, but avoid calcium supplements on the morning of test."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-crp-quantitative",
    "slug": "c-reactive-protein-crp",
    "name": "C-Reactive Protein (CRP Quantitative)",
    "shortCode": "CRP",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "High sensitivity acute phase reactant produced by the liver during systemic inflammation and bacterial infection.",
    "price": 500,
    "discountedPrice": 300,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 10,
    "parametersCount": 1,
    "parameters": [
      "Serum C-Reactive Protein (mg/L)"
    ],
    "clinicalSignificance": "Rapid indicator of bacterial infections, autoimmune flare-ups (rheumatoid arthritis, lupus), and cardiovascular risk.",
    "preparationInstructions": [
      "No fasting required."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-1",
    "slug": "tsh-test-thyroid-stimulating-hormone",
    "name": "TSH test - THYROID STIMULATING HORMONE",
    "shortCode": "TT-",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 410,
    "discountedPrice": 287,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Thyroid Stimulating Hormone (TSH)"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-2",
    "slug": "thyroid-profile",
    "name": "Thyroid Profile",
    "shortCode": "TP",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 600,
    "discountedPrice": 420,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-3",
    "slug": "anti-thyroglobulin-antibody-anti-tg-atg",
    "name": "Anti Thyroglobulin Antibody - Anti TG - ATG",
    "shortCode": "ATA",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 1280,
    "discountedPrice": 896,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-4",
    "slug": "anti-tpo-anti-thyroid-peroxidase-antibody-ama",
    "name": "Anti TPO-Anti Thyroid Peroxidase Antibody-AMA",
    "shortCode": "ATT",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 1560,
    "discountedPrice": 1092,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-5",
    "slug": "anti-thyroid-antibodies-panel-anti-tg-anti-tpo",
    "name": "Anti Thyroid Antibodies Panel (Anti TG & Anti TPO)",
    "shortCode": "ATA",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 2999,
    "discountedPrice": 2099,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-7",
    "slug": "free-thyroid-profile-ft3-ft4-tsh",
    "name": "Free Thyroid Profile - FT3 FT4 TSH",
    "shortCode": "FTP",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 999,
    "discountedPrice": 699,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-8",
    "slug": "thyroid-profile-advance",
    "name": "Thyroid Profile Advance",
    "shortCode": "TPA",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 2899,
    "discountedPrice": 2029,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-9",
    "slug": "thyroid-profile-comprehensive",
    "name": "Thyroid Profile, Comprehensive",
    "shortCode": "TPC",
    "category": "thyroid",
    "categoryLabel": "Thyroid Care",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 3599,
    "discountedPrice": 2519,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-10",
    "slug": "urine-protein-creatinine-ratio",
    "name": "Urine Protein Creatinine Ratio",
    "shortCode": "UPC",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "price": 450,
    "discountedPrice": 315,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Urine Albumin",
      "Urine Creatinine",
      "Albumin-to-Creatinine Ratio (ACR)"
    ],
    "clinicalSignificance": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-11",
    "slug": "glucose-challenge-test-gct-samples-fasting-and-2-hrs",
    "name": "Glucose Challenge Test GCT Samples (Fasting and 2 hrs)",
    "shortCode": "GCT",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "price": 999,
    "discountedPrice": 699,
    "sampleType": "Blood (Fluoride Plasma)",
    "tubeColor": "Grey / Sodium Fluoride",
    "fastingRequired": true,
    "fastingHours": 8,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Plasma Glucose"
    ],
    "clinicalSignificance": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "preparationInstructions": [
      "Fasting of 8 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-12",
    "slug": "g6pd-quantitative",
    "name": "G6PD Quantitative",
    "shortCode": "GQ",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "price": 830,
    "discountedPrice": 581,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "G6PD Quantitative"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-13",
    "slug": "procalcitonin",
    "name": "Procalcitonin",
    "shortCode": "P",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "price": 2800,
    "discountedPrice": 1960,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Procalcitonin"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-14",
    "slug": "hepatitis-b-core-antigen-total-antibodies-anti-hbc-total",
    "name": "Hepatitis B core antigen-Total Antibodies -Anti HBc-Total",
    "shortCode": "HBC",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 1000,
    "discountedPrice": 700,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-15",
    "slug": "parietal-cell-antibody-acpa",
    "name": "Parietal Cell Antibody - ACPA",
    "shortCode": "PCA",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "price": 2800,
    "discountedPrice": 1960,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Parietal Cell Antibody - ACPA"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-16",
    "slug": "acetyl-choline-receptor-antibody-achr-ab",
    "name": "Acetyl Choline Receptor Antibody - AChR Ab",
    "shortCode": "ACR",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "price": 2800,
    "discountedPrice": 1960,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Acetyl Choline Receptor Antibody - AChR Ab"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating diabetes & kidney and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-17",
    "slug": "24-hour-urine-for-microalbumin",
    "name": "24 Hour Urine for Microalbumin",
    "shortCode": "2HU",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "price": 550,
    "discountedPrice": 385,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Urine Albumin",
      "Urine Creatinine",
      "Albumin-to-Creatinine Ratio (ACR)"
    ],
    "clinicalSignificance": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-18",
    "slug": "24-hour-urine-for-metanephrines",
    "name": "24 HOUR URINE for METANEPHRINES",
    "shortCode": "2HU",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "price": 10500,
    "discountedPrice": 7350,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Physical Examination (Color, Appearance)",
      "Chemical Analysis (Protein, Glucose, Ketones)",
      "Microscopic Examination (RBCs, Pus Cells, Epithelial Cells, Casts, Crystals)"
    ],
    "clinicalSignificance": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-19",
    "slug": "urine-acr-microalbumin-creatinine-ratiourine",
    "name": "Urine ACR-Microalbumin Creatinine Ratio,Urine",
    "shortCode": "UAC",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "price": 550,
    "discountedPrice": 385,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Urine Albumin",
      "Urine Creatinine",
      "Albumin-to-Creatinine Ratio (ACR)"
    ],
    "clinicalSignificance": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-20",
    "slug": "full-body-checkup-panel-2-with-hba1c",
    "name": "Full Body Checkup Panel 2 with HbA1C",
    "shortCode": "FBC",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "price": 2800,
    "discountedPrice": 1960,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "HbA1c Glycated Hemoglobin",
      "Estimated Average Glucose (eAG)"
    ],
    "clinicalSignificance": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-21",
    "slug": "diabetic-care-health-package-basic",
    "name": "Diabetic Care Health Package - Basic",
    "shortCode": "DCH",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "price": 1999,
    "discountedPrice": 1399,
    "sampleType": "Blood (Fluoride Plasma)",
    "tubeColor": "Grey / Sodium Fluoride",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Plasma Glucose"
    ],
    "clinicalSignificance": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-22",
    "slug": "diabetic-care-health-package-advance",
    "name": "Diabetic Care Health Package- Advance",
    "shortCode": "DCH",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "price": 3250,
    "discountedPrice": 2275,
    "sampleType": "Blood (Fluoride Plasma)",
    "tubeColor": "Grey / Sodium Fluoride",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Plasma Glucose"
    ],
    "clinicalSignificance": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-23",
    "slug": "kft-test-kidney-function-test-or-rft-renal-function-test",
    "name": "KFT Test (Kidney Function Test) or RFT (Renal Function Test)",
    "shortCode": "KT(",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "price": 780,
    "discountedPrice": 546,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Blood Urea",
      "Serum Creatinine",
      "BUN",
      "Serum Uric Acid",
      "eGFR",
      "Electrolytes (Sodium, Potassium, Chloride)"
    ],
    "clinicalSignificance": "Evaluates renal filtration capacity, glomerular function, and detects early signs of kidney damage.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-25",
    "slug": "hba1c-glycated-hemoglobin-test",
    "name": "HbA1c (Glycated hemoglobin) Test",
    "shortCode": "H(H",
    "category": "diabetes-kidney",
    "categoryLabel": "Diabetes & Kidney Care",
    "description": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "price": 599,
    "discountedPrice": 419,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "HbA1c Glycated Hemoglobin",
      "Estimated Average Glucose (eAG)"
    ],
    "clinicalSignificance": "Gold standard metric for diabetes mellitus diagnosis, monitoring glucose control over the past 3 months.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": true,
    "isActive": true
  },
  {
    "id": "test-meditest-26",
    "slug": "ldh-lactate-dehydrogenase",
    "name": "LDH - LACTATE DEHYDROGENASE",
    "shortCode": "L-L",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "price": 415,
    "discountedPrice": 291,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "Chol/HDL Ratio"
    ],
    "clinicalSignificance": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "preparationInstructions": [
      "Fasting of 10 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-27",
    "slug": "lipoprotein-a-lpa",
    "name": "LIPOPROTEIN -A -LPA",
    "shortCode": "L--",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Diagnostic clinical profile for evaluating heart & hypertension and associated biological markers.",
    "price": 920,
    "discountedPrice": 644,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "LIPOPROTEIN -A -LPA"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating heart & hypertension and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-28",
    "slug": "meditest-advanced-cardiac-risk-profile",
    "name": "MediTest Advanced Cardiac Risk Profile",
    "shortCode": "MAC",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "price": 2700,
    "discountedPrice": 1890,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "Chol/HDL Ratio"
    ],
    "clinicalSignificance": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "preparationInstructions": [
      "Fasting of 10 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-29",
    "slug": "cpk-mb-mass",
    "name": "CPK MB-Mass",
    "shortCode": "CM",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "price": 999,
    "discountedPrice": 699,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "Chol/HDL Ratio"
    ],
    "clinicalSignificance": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "preparationInstructions": [
      "Fasting of 10 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-30",
    "slug": "aldolase",
    "name": "Aldolase",
    "shortCode": "A",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Diagnostic clinical profile for evaluating heart & hypertension and associated biological markers.",
    "price": 999,
    "discountedPrice": 699,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Aldolase"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating heart & hypertension and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-31",
    "slug": "homocysteine-quantitative-serum",
    "name": "Homocysteine Quantitative, Serum",
    "shortCode": "HQS",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "price": 1299,
    "discountedPrice": 909,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "Chol/HDL Ratio"
    ],
    "clinicalSignificance": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "preparationInstructions": [
      "Fasting of 10 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-32",
    "slug": "hscrp-c-reactive-protein-cardio",
    "name": "HsCRP-C-Reactive Protein, Cardio",
    "shortCode": "HPC",
    "category": "heart-hypertension",
    "categoryLabel": "Heart & Hypertension",
    "description": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "price": 999,
    "discountedPrice": 699,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "Chol/HDL Ratio"
    ],
    "clinicalSignificance": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "preparationInstructions": [
      "Fasting of 10 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-34",
    "slug": "dengue-ns1-antigen-elisa",
    "name": "Dengue NS1 Antigen ELISA",
    "shortCode": "DNA",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 600,
    "discountedPrice": 420,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Dengue NS1 Antigen ELISA",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-35",
    "slug": "chikungunya-virus-antibody-rapid-igm",
    "name": "Chikungunya Virus Antibody Rapid IgM",
    "shortCode": "CVA",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 970,
    "discountedPrice": 679,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Chikungunya Virus Antibody Rapid IgM",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-36",
    "slug": "cbc-test",
    "name": "CBC Test",
    "shortCode": "CT",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "price": 299,
    "discountedPrice": 209,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 15,
    "parameters": [
      "Hemoglobin",
      "TLC (WBC)",
      "Platelet Count",
      "RBC Count",
      "PCV",
      "MCV",
      "MCH",
      "MCHC",
      "RDW",
      "Neutrophils",
      "Lymphocytes",
      "Monocytes",
      "Eosinophils",
      "Basophils",
      "ESR"
    ],
    "clinicalSignificance": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-37",
    "slug": "fever-package-1",
    "name": "Fever Package 1",
    "shortCode": "FP1",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 1000,
    "discountedPrice": 700,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Fever Package 1",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-38",
    "slug": "meditest-fever-package-2",
    "name": "MediTest Fever Package 2",
    "shortCode": "MFP",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 1599,
    "discountedPrice": 1119,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "MediTest Fever Package 2",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-39",
    "slug": "fever-package-3-with-dengue-ns1-antigen",
    "name": "Fever Package 3 with Dengue NS1 Antigen",
    "shortCode": "FP3",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 2599,
    "discountedPrice": 1819,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Fever Package 3 with Dengue NS1 Antigen",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-40",
    "slug": "fever-package-complete-care",
    "name": "Fever Package - Complete Care",
    "shortCode": "FP-",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 3999,
    "discountedPrice": 2799,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Fever Package - Complete Care",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-41",
    "slug": "typhi-dot-salmonella-typhi-igg-and-igm",
    "name": "Typhi Dot (Salmonella Typhi-IgG and IgM)",
    "shortCode": "TD(",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "price": 700,
    "discountedPrice": 490,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Typhi Dot (Salmonella Typhi-IgG and IgM)"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-42",
    "slug": "esr-erythrocyte-sedimentation-rate",
    "name": "ESR- Erythrocyte Sedimentation Rate",
    "shortCode": "EES",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "price": 130,
    "discountedPrice": 91,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 15,
    "parameters": [
      "Hemoglobin",
      "TLC (WBC)",
      "Platelet Count",
      "RBC Count",
      "PCV",
      "MCV",
      "MCH",
      "MCHC",
      "RDW",
      "Neutrophils",
      "Lymphocytes",
      "Monocytes",
      "Eosinophils",
      "Basophils",
      "ESR"
    ],
    "clinicalSignificance": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-43",
    "slug": "peripheral-blood-smear-examination-by-pathologist",
    "name": "Peripheral Blood Smear Examination by Pathologist",
    "shortCode": "PBS",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "price": 140,
    "discountedPrice": 98,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 15,
    "parameters": [
      "Hemoglobin",
      "TLC (WBC)",
      "Platelet Count",
      "RBC Count",
      "PCV",
      "MCV",
      "MCH",
      "MCHC",
      "RDW",
      "Neutrophils",
      "Lymphocytes",
      "Monocytes",
      "Eosinophils",
      "Basophils",
      "ESR"
    ],
    "clinicalSignificance": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-44",
    "slug": "microfilaria-detection",
    "name": "Microfilaria Detection",
    "shortCode": "MD",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "price": 500,
    "discountedPrice": 350,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Microfilaria Detection"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-45",
    "slug": "koh-preparation-for-fungus-sputum-koh-stain",
    "name": "KOH Preparation for Fungus - Sputum KOH Stain",
    "shortCode": "KPF",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "price": 500,
    "discountedPrice": 350,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "KOH Preparation for Fungus - Sputum KOH Stain"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-46",
    "slug": "monospot-test",
    "name": "Monospot Test",
    "shortCode": "MT",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "price": 1990,
    "discountedPrice": 1393,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Monospot Test"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating fever & infection and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-47",
    "slug": "dengue-fever-profile-complete",
    "name": "Dengue Fever Profile- Complete",
    "shortCode": "DFP",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 1798,
    "discountedPrice": 1259,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Dengue Fever Profile- Complete",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-48",
    "slug": "dengue-fever-ns1-antigen-detection",
    "name": "Dengue Fever NS1 Antigen Detection",
    "shortCode": "DFN",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 600,
    "discountedPrice": 420,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Dengue Fever NS1 Antigen Detection",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-49",
    "slug": "dengue-fever-profile-with-platelet-count",
    "name": "Dengue Fever Profile with Platelet count",
    "shortCode": "DFP",
    "category": "fever-infection",
    "categoryLabel": "Fever & Infection",
    "description": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "price": 1850,
    "discountedPrice": 1295,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Dengue Fever Profile with Platelet count",
      "Clinical Correlation"
    ],
    "clinicalSignificance": "Rapid serological detection of infectious pathogens causing acute febrile illness.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-50",
    "slug": "healthy-india-package-with-vitamin-d-and-b12-85-tests",
    "name": "Healthy India Package with Vitamin D and B12 @ 85 Tests",
    "shortCode": "HIP",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 4800,
    "discountedPrice": 3360,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Healthy India Package with Vitamin D and B12 @ 85 Tests"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-51",
    "slug": "full-body-with-immunity-check-comprehensive",
    "name": "Full Body with Immunity Check - Comprehensive",
    "shortCode": "FBW",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Diagnostic clinical profile for evaluating vitamins & minerals and associated biological markers.",
    "price": 5999,
    "discountedPrice": 4199,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Full Body with Immunity Check - Comprehensive"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating vitamins & minerals and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-52",
    "slug": "full-body-check-with-immunity-markers-advanced",
    "name": "Full Body Check with Immunity Markers- Advanced",
    "shortCode": "FBC",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Diagnostic clinical profile for evaluating vitamins & minerals and associated biological markers.",
    "price": 4999,
    "discountedPrice": 3499,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Full Body Check with Immunity Markers- Advanced"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating vitamins & minerals and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-53",
    "slug": "meditest-full-body-checkup-kids-special",
    "name": "MediTest Full Body Checkup - Kids Special",
    "shortCode": "MFB",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Diagnostic clinical profile for evaluating vitamins & minerals and associated biological markers.",
    "price": 4500,
    "discountedPrice": 3150,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "MediTest Full Body Checkup - Kids Special"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating vitamins & minerals and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-54",
    "slug": "vitamin-d3-test-vitamin-d25-oh-test",
    "name": "Vitamin D3 Test / Vitamin  D25 OH Test",
    "shortCode": "VDT",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 1500,
    "discountedPrice": 1050,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Vitamin D3 Test / Vitamin  D25 OH Test"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-55",
    "slug": "serum-folic-acid-folate-vitamin-b9",
    "name": "Serum Folic Acid - Folate ( Vitamin B9 )",
    "shortCode": "SFA",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 1299,
    "discountedPrice": 909,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Serum Folic Acid - Folate ( Vitamin B9 )"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-56",
    "slug": "vitamin-d3-25-oh-and-b12-vitamin-profile",
    "name": "Vitamin D3 25 OH and B12 - Vitamin Profile",
    "shortCode": "VD2",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 2500,
    "discountedPrice": 1750,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Vitamin D3 25 OH and B12 - Vitamin Profile"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-57",
    "slug": "vitamin-e-tocopherol",
    "name": "Vitamin E-Tocopherol",
    "shortCode": "VE",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 6999,
    "discountedPrice": 4899,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Vitamin E-Tocopherol"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-58",
    "slug": "vitamin-b12-test",
    "name": "Vitamin B12 Test",
    "shortCode": "VBT",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 1200,
    "discountedPrice": 840,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Vitamin B12 Test"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-59",
    "slug": "vitamin-d3-test-vitamin-d25-oh-test-in-gurgaon-gurugram",
    "name": "Vitamin D3 Test / Vitamin  D25 OH Test in Gurgaon Gurugram",
    "shortCode": "VDT",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 1500,
    "discountedPrice": 1050,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Vitamin D3 Test / Vitamin  D25 OH Test in Gurgaon Gurugram"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-60",
    "slug": "1-25-dihydroxy-vitamin-d3",
    "name": "1-25-Dihydroxy Vitamin D3",
    "shortCode": "1VD",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 3000,
    "discountedPrice": 2100,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "1-25-Dihydroxy Vitamin D3"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-61",
    "slug": "vitamin-d3-test-vitamin-d25-oh-test-in-chandigarh-tricity-punjab",
    "name": "Vitamin D3 Test / Vitamin  D25 OH Test in Chandigarh Tricity Punjab",
    "shortCode": "VDT",
    "category": "vitamins-minerals",
    "categoryLabel": "Vitamins & Minerals",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 1500,
    "discountedPrice": 1050,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Vitamin D3 Test / Vitamin  D25 OH Test in Chandigarh Tricity Punjab"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-62",
    "slug": "meditest-full-body-screening-package-basic",
    "name": "MediTest Full Body Screening Package - Basic",
    "shortCode": "MFB",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Diagnostic clinical profile for evaluating liver, jaundice & hepatitis and associated biological markers.",
    "price": 1350,
    "discountedPrice": 945,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "MediTest Full Body Screening Package - Basic"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating liver, jaundice & hepatitis and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-63",
    "slug": "advanced-liver-and-stomach-care",
    "name": "Advanced Liver and Stomach care",
    "shortCode": "ALA",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 1299,
    "discountedPrice": 909,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-65",
    "slug": "lft-test-liver-function-test",
    "name": "LFT Test - Liver Function Test",
    "shortCode": "LT-",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 750,
    "discountedPrice": 525,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-66",
    "slug": "hbsag-hepatitis-b-surface-antigen-in-delhi-ncr",
    "name": "HBsAg-Hepatitis B Surface Antigen in Delhi NCR",
    "shortCode": "HBS",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 495,
    "discountedPrice": 347,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-67",
    "slug": "hbsag-hepatitis-b-surface-antigen-clia-method",
    "name": "HBsAg-Hepatitis B Surface Antigen CLIA Method",
    "shortCode": "HBS",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 695,
    "discountedPrice": 486,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-68",
    "slug": "hepatitis-c-virus-total-antibodies-by-clia",
    "name": "Hepatitis C virus-Total Antibodies by CLIA",
    "shortCode": "HCV",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 650,
    "discountedPrice": 455,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-69",
    "slug": "anti-hepatitis-a-virus-anti-hav-igm",
    "name": "Anti Hepatitis A Virus -Anti Hav-IgM",
    "shortCode": "AHA",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 1500,
    "discountedPrice": 1050,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-70",
    "slug": "anti-hbc-anti-hepatitis-b-core-antigen-total",
    "name": "Anti HBc / Anti Hepatitis B Core Antigen - Total",
    "shortCode": "AH/",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 1100,
    "discountedPrice": 770,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-71",
    "slug": "anti-hepatitis-e-virus-anti-hev-igm",
    "name": "Anti Hepatitis E Virus-Anti HEV - IgM",
    "shortCode": "AHE",
    "category": "liver-function",
    "categoryLabel": "Liver, Jaundice & Hepatitis",
    "description": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "price": 1600,
    "discountedPrice": 1120,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 10,
    "parameters": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Bilirubin Indirect",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A:G Ratio"
    ],
    "clinicalSignificance": "Evaluates hepatic integrity, biliary obstruction, drug-induced liver injury, and viral hepatitis.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-72",
    "slug": "full-body-checkup-with-arthritis-care",
    "name": "Full Body Checkup with Arthritis Care",
    "shortCode": "FBC",
    "category": "joint-bone",
    "categoryLabel": "Joint Pain & Bone Health",
    "description": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "price": 2350,
    "discountedPrice": 1645,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Full Body Checkup with Arthritis Care"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-76",
    "slug": "ra-factor-rheumatoid-factor-qualitative-arthritis",
    "name": "RA Factor RHEUMATOID FACTOR (QUALITATIVE) - Arthritis",
    "shortCode": "RFR",
    "category": "joint-bone",
    "categoryLabel": "Joint Pain & Bone Health",
    "description": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "price": 540,
    "discountedPrice": 378,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "RA Factor RHEUMATOID FACTOR (QUALITATIVE) - Arthritis"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-77",
    "slug": "ra-factor-rheumatoid-factor-quantitative-arthritis",
    "name": "RA Factor RHEUMATOID FACTOR (QUANTITATIVE) - Arthritis",
    "shortCode": "RFR",
    "category": "joint-bone",
    "categoryLabel": "Joint Pain & Bone Health",
    "description": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "price": 490,
    "discountedPrice": 343,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "RA Factor RHEUMATOID FACTOR (QUANTITATIVE) - Arthritis"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-80",
    "slug": "full-body-checkup-panel-3",
    "name": "Full Body Checkup Panel 3",
    "shortCode": "FBC",
    "category": "joint-bone",
    "categoryLabel": "Joint Pain & Bone Health",
    "description": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "price": 4800,
    "discountedPrice": 3360,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Full Body Checkup Panel 3"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-82",
    "slug": "crp-or-c-reactive-protein",
    "name": "CRP or C-reactive protein",
    "shortCode": "COC",
    "category": "joint-bone",
    "categoryLabel": "Joint Pain & Bone Health",
    "description": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "price": 599,
    "discountedPrice": 419,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "CRP or C-reactive protein"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating joint pain & bone health and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-84",
    "slug": "stool-examinationoccult-blood",
    "name": "Stool Examination,Occult Blood",
    "shortCode": "SEB",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "price": 190,
    "discountedPrice": 133,
    "sampleType": "Stool",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Physical Examination (Color, Appearance)",
      "Chemical Analysis (Protein, Glucose, Ketones)",
      "Microscopic Examination (RBCs, Pus Cells, Epithelial Cells, Casts, Crystals)"
    ],
    "clinicalSignificance": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-85",
    "slug": "stool-routine-and-microscopic",
    "name": "Stool Routine and Microscopic",
    "shortCode": "SRA",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "price": 140,
    "discountedPrice": 98,
    "sampleType": "Stool",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Physical Examination (Color, Appearance)",
      "Chemical Analysis (Protein, Glucose, Ketones)",
      "Microscopic Examination (RBCs, Pus Cells, Epithelial Cells, Casts, Crystals)"
    ],
    "clinicalSignificance": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-86",
    "slug": "psa-total-prostate-specific-antigen-total",
    "name": "PSA Total- Prostate Specific Antigen, Total",
    "shortCode": "PTP",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 750,
    "discountedPrice": 525,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "PSA Total- Prostate Specific Antigen, Total",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-87",
    "slug": "psa-free-prostate-specific-antigen-free",
    "name": "PSA Free - Prostate Specific Antigen, Free",
    "shortCode": "PF-",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 1050,
    "discountedPrice": 735,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "PSA Free - Prostate Specific Antigen, Free",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-88",
    "slug": "afp-alpha-fetoprotein-tumor-marker",
    "name": "AFP (Alpha Fetoprotein), Tumor Marker",
    "shortCode": "A(F",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 990,
    "discountedPrice": 693,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "AFP (Alpha Fetoprotein), Tumor Marker",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-89",
    "slug": "ca-125-ovarian-cancer-markerserum",
    "name": "CA 125 - Ovarian Cancer Marker,Serum",
    "shortCode": "C1-",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 1600,
    "discountedPrice": 1120,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "CA 125 - Ovarian Cancer Marker,Serum",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-90",
    "slug": "inhibin-b",
    "name": "Inhibin B",
    "shortCode": "IB",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Diagnostic clinical profile for evaluating cancer screening and associated biological markers.",
    "price": 2600,
    "discountedPrice": 1820,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Inhibin B"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating cancer screening and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-91",
    "slug": "cea-carcino-embryonic-antigen-serum",
    "name": "CEA - Carcino Embryonic Antigen, Serum",
    "shortCode": "C-C",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 960,
    "discountedPrice": 672,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "CEA - Carcino Embryonic Antigen, Serum",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-92",
    "slug": "ca-153-breast-cancer-markerserum",
    "name": "CA 15.3- Breast Cancer Marker,Serum",
    "shortCode": "C1B",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 1560,
    "discountedPrice": 1092,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "CA 15.3- Breast Cancer Marker,Serum",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-93",
    "slug": "ca-199-pancreatic-cancer-markerserum",
    "name": "CA 19.9 - Pancreatic Cancer Marker,Serum",
    "shortCode": "C1-",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "price": 1400,
    "discountedPrice": 980,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "CA 19.9 - Pancreatic Cancer Marker,Serum",
      "Reference Cut-off Range"
    ],
    "clinicalSignificance": "Tumor-associated antigen marker assisting in oncological screening, staging, and therapeutic monitoring.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-94",
    "slug": "ca-724-gastric-cancer-markerserum",
    "name": "CA 72.4- Gastric Cancer Marker,Serum",
    "shortCode": "C7G",
    "category": "cancer-screening",
    "categoryLabel": "Cancer Screening",
    "description": "Diagnostic clinical profile for evaluating cancer screening and associated biological markers.",
    "price": 1900,
    "discountedPrice": 1330,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "CA 72.4- Gastric Cancer Marker,Serum"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating cancer screening and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-99",
    "slug": "aspergillus-igg",
    "name": "Aspergillus IgG",
    "shortCode": "AI",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "price": 1600,
    "discountedPrice": 1120,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Aspergillus IgG"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-102",
    "slug": "serum-ferritin",
    "name": "Serum Ferritin",
    "shortCode": "SF",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 1399,
    "discountedPrice": 979,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Serum Ferritin"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-103",
    "slug": "rubella-virus-german-measles-igm-avidity",
    "name": "Rubella Virus-German Measles -IgM Avidity",
    "shortCode": "RVM",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "price": 1569,
    "discountedPrice": 1098,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Rubella Virus-German Measles -IgM Avidity"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-106",
    "slug": "urine-culture-sensitivity",
    "name": "Urine Culture & Sensitivity",
    "shortCode": "UC&",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "price": 700,
    "discountedPrice": 490,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Physical Examination (Color, Appearance)",
      "Chemical Analysis (Protein, Glucose, Ketones)",
      "Microscopic Examination (RBCs, Pus Cells, Epithelial Cells, Casts, Crystals)"
    ],
    "clinicalSignificance": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-107",
    "slug": "pregnancy-test-or-urine-pregnancy-test-upt",
    "name": "Pregnancy Test or Urine Pregnancy Test -UPT",
    "shortCode": "PTO",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "price": 360,
    "discountedPrice": 252,
    "sampleType": "Urine",
    "tubeColor": "Sterile Container",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Physical Examination (Color, Appearance)",
      "Chemical Analysis (Protein, Glucose, Ketones)",
      "Microscopic Examination (RBCs, Pus Cells, Epithelial Cells, Casts, Crystals)"
    ],
    "clinicalSignificance": "Screening for urinary tract infections, renal parenchymal diseases, gastrointestinal bleeding, and metabolic disorders.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-108",
    "slug": "progesterone-serum",
    "name": "Progesterone, Serum",
    "shortCode": "PS",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "price": 799,
    "discountedPrice": 559,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Progesterone, Serum"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-109",
    "slug": "beta-hcg-total-quantitativematernal",
    "name": "Beta HCG Total- Quantitative,Maternal",
    "shortCode": "BHT",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "price": 650,
    "discountedPrice": 455,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Beta HCG Total- Quantitative,Maternal"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-110",
    "slug": "rubella-virus-german-measles-igg-antibodies",
    "name": "Rubella Virus-German Measles -IgG Antibodies",
    "shortCode": "RVM",
    "category": "pregnancy-care",
    "categoryLabel": "Pregnancy Care",
    "description": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "price": 1260,
    "discountedPrice": 882,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Rubella Virus-German Measles -IgG Antibodies"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating pregnancy care and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-111",
    "slug": "beta-2-glycoprotein-iga",
    "name": "Beta 2 Glycoprotein IgA",
    "shortCode": "B2G",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 1000,
    "discountedPrice": 700,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Beta 2 Glycoprotein IgA"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-112",
    "slug": "beta-2-glycoprotein-igg",
    "name": "Beta 2 Glycoprotein IgG",
    "shortCode": "B2G",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 1000,
    "discountedPrice": 700,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Beta 2 Glycoprotein IgG"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-113",
    "slug": "beta-2-glycoprotein-igm",
    "name": "Beta 2 Glycoprotein IgM",
    "shortCode": "B2G",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 1000,
    "discountedPrice": 700,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Beta 2 Glycoprotein IgM"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-114",
    "slug": "beta-2-glycoprotein-1-panel-igg-igm-iga",
    "name": "BETA 2 GLYCOPROTEIN 1 PANEL, IgG, IgM, IgA",
    "shortCode": "B2G",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 2600,
    "discountedPrice": 1820,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "BETA 2 GLYCOPROTEIN 1 PANEL, IgG, IgM, IgA"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-115",
    "slug": "premium-full-body-checkup-with-harmone-panel-female",
    "name": "Premium Full Body Checkup with Harmone Panel - Female",
    "shortCode": "PFB",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 4600,
    "discountedPrice": 3220,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Premium Full Body Checkup with Harmone Panel - Female"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-118",
    "slug": "female-harmones-package",
    "name": "Female Harmones Package",
    "shortCode": "FHP",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 4350,
    "discountedPrice": 3045,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Female Harmones Package"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-120",
    "slug": "meditest-pcod-pcos-panel",
    "name": "MediTest PCOD ( PCOS ) Panel",
    "shortCode": "MP(",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 4500,
    "discountedPrice": 3150,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "MediTest PCOD ( PCOS ) Panel"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-122",
    "slug": "amh-anti-mullerian-hormone",
    "name": "AMH - Anti Mullerian Hormone",
    "shortCode": "A-A",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 2100,
    "discountedPrice": 1470,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "AMH - Anti Mullerian Hormone"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-124",
    "slug": "rubella-virus-german-measles-igm",
    "name": "Rubella Virus-German Measles -IgM",
    "shortCode": "RVM",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 899,
    "discountedPrice": 629,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Rubella Virus-German Measles -IgM"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-125",
    "slug": "torch-panel-4-igg",
    "name": "TORCH PANEL-4, IgG",
    "shortCode": "TPI",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 2000,
    "discountedPrice": 1400,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "TORCH PANEL-4, IgG"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-126",
    "slug": "torch-panel-4-igm",
    "name": "TORCH PANEL-4, IgM",
    "shortCode": "TPI",
    "category": "infertility",
    "categoryLabel": "Infertility & Reproductive",
    "description": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "price": 2000,
    "discountedPrice": 1400,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "TORCH PANEL-4, IgM"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating infertility and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-127",
    "slug": "luteinising-hormone-lh",
    "name": "LUTEINISING HORMONE -LH",
    "shortCode": "LH-",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 530,
    "discountedPrice": 371,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "LUTEINISING HORMONE -LH"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-128",
    "slug": "follicle-stimulating-hormone-fsh",
    "name": "FOLLICLE STIMULATING HORMONE -FSH",
    "shortCode": "FSH",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 530,
    "discountedPrice": 371,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "FOLLICLE STIMULATING HORMONE -FSH"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-129",
    "slug": "erythropoietin",
    "name": "Erythropoietin",
    "shortCode": "E",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 1799,
    "discountedPrice": 1259,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Erythropoietin"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-130",
    "slug": "weil-felix-test",
    "name": "Weil Felix Test",
    "shortCode": "WFT",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 1090,
    "discountedPrice": 763,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Weil Felix Test"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-131",
    "slug": "serum-prolactin-prl",
    "name": "Serum Prolactin - PRL",
    "shortCode": "SP-",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 530,
    "discountedPrice": 371,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Serum Prolactin - PRL"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-132",
    "slug": "basic-harmones-female-lh-fsh-prl",
    "name": "Basic Harmones-Female LH FSH PRL",
    "shortCode": "BHL",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 1580,
    "discountedPrice": 1106,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Basic Harmones-Female LH FSH PRL"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-137",
    "slug": "testosterone-total",
    "name": "Testosterone Total",
    "shortCode": "TT",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 975,
    "discountedPrice": 683,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Testosterone Total"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-138",
    "slug": "estradiol-o-estrogen-e2-test",
    "name": "Estradiol / O Estrogen - E2 Test",
    "shortCode": "E/O",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 850,
    "discountedPrice": 595,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Estradiol / O Estrogen - E2 Test"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-140",
    "slug": "male-hormone-test-profile",
    "name": "Male Hormone Test Profile",
    "shortCode": "MHT",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 3300,
    "discountedPrice": 2310,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Male Hormone Test Profile"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-141",
    "slug": "pth-parathyroid-hormoneintact",
    "name": "PTH (Parathyroid Hormone),Intact",
    "shortCode": "P(H",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "price": 1999,
    "discountedPrice": 1399,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 3,
    "parameters": [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Thyroid Stimulating Hormone (TSH) Ultrasensitive"
    ],
    "clinicalSignificance": "Screens and monitors hyperthyroidism, hypothyroidism, goiter, thyroiditis, and metabolic rate regulation.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-142",
    "slug": "acth-adreno-cortico-tropic-hormone",
    "name": "ACTH (Adreno Cortico Tropic Hormone)",
    "shortCode": "A(C",
    "category": "hormonal",
    "categoryLabel": "Hormonal Imbalance",
    "description": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "price": 2499,
    "discountedPrice": 1749,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "ACTH (Adreno Cortico Tropic Hormone)"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating hormonal imbalance and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-144",
    "slug": "full-body-checkup-complete-care-gold",
    "name": "Full Body Checkup- Complete Care Gold",
    "shortCode": "FBC",
    "category": "child-special",
    "categoryLabel": "Pediatric & Child Special",
    "description": "Diagnostic clinical profile for evaluating child special and associated biological markers.",
    "price": 2300,
    "discountedPrice": 1610,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Full Body Checkup- Complete Care Gold"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating child special and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-147",
    "slug": "full-body-checkup-panel-1-83-tests",
    "name": "Full Body Checkup Panel 1 @ 83 Tests",
    "shortCode": "FBC",
    "category": "child-special",
    "categoryLabel": "Pediatric & Child Special",
    "description": "Diagnostic clinical profile for evaluating child special and associated biological markers.",
    "price": 2100,
    "discountedPrice": 1470,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Full Body Checkup Panel 1 @ 83 Tests"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating child special and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-149",
    "slug": "premium-full-body-checkup-with-hormone-panel-male",
    "name": "Premium Full Body Checkup with Hormone Panel - Male",
    "shortCode": "PFB",
    "category": "male-special",
    "categoryLabel": "Men's Health Special",
    "description": "Diagnostic clinical profile for evaluating male special and associated biological markers.",
    "price": 4100,
    "discountedPrice": 2870,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Premium Full Body Checkup with Hormone Panel - Male"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating male special and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-152",
    "slug": "testosterone-free",
    "name": "Testosterone Free",
    "shortCode": "TF",
    "category": "male-special",
    "categoryLabel": "Men's Health Special",
    "description": "Diagnostic clinical profile for evaluating male special and associated biological markers.",
    "price": 1900,
    "discountedPrice": 1330,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Testosterone Free"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating male special and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-169",
    "slug": "premium-full-body-checkup-senior-male",
    "name": "Premium Full Body Checkup - Senior Male",
    "shortCode": "PFB",
    "category": "senior-male",
    "categoryLabel": "Senior Male Special",
    "description": "Diagnostic clinical profile for evaluating senior male special and associated biological markers.",
    "price": 5600,
    "discountedPrice": 3920,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Premium Full Body Checkup - Senior Male"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating senior male special and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-182",
    "slug": "premium-full-body-checkup-senior-female",
    "name": "Premium Full Body Checkup - Senior Female",
    "shortCode": "PFB",
    "category": "senior-female",
    "categoryLabel": "Senior Female Special",
    "description": "Diagnostic clinical profile for evaluating senior female special and associated biological markers.",
    "price": 5600,
    "discountedPrice": 3920,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Premium Full Body Checkup - Senior Female"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating senior female special and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-191",
    "slug": "aspergillus-igm",
    "name": "Aspergillus IgM",
    "shortCode": "AI",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 1600,
    "discountedPrice": 1120,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Aspergillus IgM"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-192",
    "slug": "allergy-screening-package",
    "name": "Allergy Screening Package",
    "shortCode": "ASP",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 1999,
    "discountedPrice": 1399,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Allergy Screening Package"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-193",
    "slug": "serum-ige-total-immunoglobulin-ige",
    "name": "Serum IgE Total - Immunoglobulin IgE",
    "shortCode": "SIT",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 1250,
    "discountedPrice": 875,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Serum IgE Total - Immunoglobulin IgE"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-194",
    "slug": "tissue-transglutaminase-iga-ttg-iga",
    "name": "Tissue Transglutaminase IgA (tTG-IgA)",
    "shortCode": "TTI",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 1599,
    "discountedPrice": 1119,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Tissue Transglutaminase IgA (tTG-IgA)"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-195",
    "slug": "tissue-transglutaminase-igg-ttg-igg",
    "name": "TISSUE TRANSGLUTAMINASE - IgG-TTG IgG",
    "shortCode": "TT-",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 1599,
    "discountedPrice": 1119,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "TISSUE TRANSGLUTAMINASE - IgG-TTG IgG"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-196",
    "slug": "allergy-milk-doodh",
    "name": "Allergy MILK (Doodh)",
    "shortCode": "AM(",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 2999,
    "discountedPrice": 2099,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Allergy MILK (Doodh)"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-197",
    "slug": "allergy-aspergillus-fumigatus",
    "name": "Allergy, Aspergillus Fumigatus",
    "shortCode": "AAF",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 2399,
    "discountedPrice": 1679,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Allergy, Aspergillus Fumigatus"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-198",
    "slug": "allergy-panel-i-vegetarian-non-vegetarian-inhalants-drugs",
    "name": "Allergy Panel I (Vegetarian + Non-Vegetarian + Inhalants+ Drugs)",
    "shortCode": "API",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 10000,
    "discountedPrice": 7000,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Allergy Panel I (Vegetarian + Non-Vegetarian + Inhalants+ Drugs)"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-199",
    "slug": "aec-absolute-eosinophil-count",
    "name": "AEC-Absolute Eosinophil Count",
    "shortCode": "AEC",
    "category": "allergy",
    "categoryLabel": "Allergy Screening",
    "description": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "price": 250,
    "discountedPrice": 175,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "AEC-Absolute Eosinophil Count"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating allergy and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-203",
    "slug": "lipid-profile-2",
    "name": "Lipid Profile",
    "shortCode": "LP",
    "category": "alcoholism",
    "categoryLabel": "Alcohol & Lifestyle Risk",
    "description": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "price": 490,
    "discountedPrice": 343,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": true,
    "fastingHours": 10,
    "reportDeliveryHours": 12,
    "parametersCount": 6,
    "parameters": [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "Chol/HDL Ratio"
    ],
    "clinicalSignificance": "Assesses coronary artery disease risk, arterial plaque buildup, and overall cardiovascular health.",
    "preparationInstructions": [
      "Fasting of 10 hours is required before sample collection.",
      "Plain water may be consumed freely.",
      "Avoid alcohol or heavy fatty meals the previous evening."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-206",
    "slug": "amylase-blood-test",
    "name": "Amylase Blood Test",
    "shortCode": "ABT",
    "category": "alcoholism",
    "categoryLabel": "Alcohol & Lifestyle Risk",
    "description": "Diagnostic clinical profile for evaluating alcoholism and associated biological markers.",
    "price": 680,
    "discountedPrice": 476,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Amylase Blood Test"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating alcoholism and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-222",
    "slug": "iron-profile",
    "name": "Iron Profile",
    "shortCode": "IP",
    "category": "anaemia",
    "categoryLabel": "Anaemia & Iron Deficiency",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 580,
    "discountedPrice": 406,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Iron Profile"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-223",
    "slug": "serum-iron",
    "name": "Serum Iron",
    "shortCode": "SI",
    "category": "anaemia",
    "categoryLabel": "Anaemia & Iron Deficiency",
    "description": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "price": 425,
    "discountedPrice": 298,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Serum Iron"
    ],
    "clinicalSignificance": "Detects micronutrient deficiencies vital for bone density, neurological function, erythropoiesis, and immunity.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-224",
    "slug": "thalassemia-profile",
    "name": "Thalassemia Profile",
    "shortCode": "TP",
    "category": "anaemia",
    "categoryLabel": "Anaemia & Iron Deficiency",
    "description": "Diagnostic clinical profile for evaluating anaemia and associated biological markers.",
    "price": 1999,
    "discountedPrice": 1399,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 1,
    "parameters": [
      "Thalassemia Profile"
    ],
    "clinicalSignificance": "Diagnostic clinical profile for evaluating anaemia and associated biological markers.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-225",
    "slug": "reticulocyte-count",
    "name": "Reticulocyte Count",
    "shortCode": "RC",
    "category": "anaemia",
    "categoryLabel": "Anaemia & Iron Deficiency",
    "description": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "price": 699,
    "discountedPrice": 489,
    "sampleType": "Blood (EDTA Whole Blood)",
    "tubeColor": "Purple / EDTA",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 15,
    "parameters": [
      "Hemoglobin",
      "TLC (WBC)",
      "Platelet Count",
      "RBC Count",
      "PCV",
      "MCV",
      "MCH",
      "MCHC",
      "RDW",
      "Neutrophils",
      "Lymphocytes",
      "Monocytes",
      "Eosinophils",
      "Basophils",
      "ESR"
    ],
    "clinicalSignificance": "Evaluates cellular components of blood to identify infections, anemia, leukemia, and inflammatory states.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-226",
    "slug": "meditest-std-viral-infection",
    "name": "Meditest STD (Viral Infection)",
    "shortCode": "MS(",
    "category": "std",
    "categoryLabel": "STD & Sexual Health",
    "description": "Sensitive immunological assay for blood-borne and sexually transmitted pathogens with strict clinical confidentiality.",
    "price": 610,
    "discountedPrice": 427,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "Meditest STD (Viral Infection)",
      "Assay Cut-off Index (S/CO)"
    ],
    "clinicalSignificance": "Sensitive immunological assay for blood-borne and sexually transmitted pathogens with strict clinical confidentiality.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-227",
    "slug": "tpha-treponema-pallidum-hemagglutination",
    "name": "TPHA TREPONEMA PALLIDUM HEMAGGLUTINATION",
    "shortCode": "TTP",
    "category": "std",
    "categoryLabel": "STD & Sexual Health",
    "description": "Sensitive immunological assay for blood-borne and sexually transmitted pathogens with strict clinical confidentiality.",
    "price": 999,
    "discountedPrice": 699,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "TPHA TREPONEMA PALLIDUM HEMAGGLUTINATION",
      "Assay Cut-off Index (S/CO)"
    ],
    "clinicalSignificance": "Sensitive immunological assay for blood-borne and sexually transmitted pathogens with strict clinical confidentiality.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  },
  {
    "id": "test-meditest-228",
    "slug": "hiv-1-and-2-antibodies-hiv-aids-test-in-delhi-ncr",
    "name": "HIV 1 and 2 - Antibodies | HIV AIDS test in Delhi NCR",
    "shortCode": "H1A",
    "category": "std",
    "categoryLabel": "STD & Sexual Health",
    "description": "Sensitive immunological assay for blood-borne and sexually transmitted pathogens with strict clinical confidentiality.",
    "price": 610,
    "discountedPrice": 427,
    "sampleType": "Blood (Serum)",
    "tubeColor": "Yellow / SST",
    "fastingRequired": false,
    "reportDeliveryHours": 12,
    "parametersCount": 2,
    "parameters": [
      "HIV 1 and 2 - Antibodies | HIV AIDS test in Delhi NCR",
      "Assay Cut-off Index (S/CO)"
    ],
    "clinicalSignificance": "Sensitive immunological assay for blood-borne and sexually transmitted pathogens with strict clinical confidentiality.",
    "preparationInstructions": [
      "No special dietary restrictions or fasting needed before sample collection.",
      "Stay normally hydrated before blood collection."
    ],
    "isPopular": false,
    "isActive": true
  }
];
