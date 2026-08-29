// Infeworks — presentation metadata for published flagship projects.
// Keyed by project slug; complements the bilingual records held in the database.

import type { Bi } from "./sectors";

export type ProjectMeta = {
  cover: string;
  gallery: string[];
  capacity: Bi;
  client: Bi;
  consultant: Bi | null;
  scope: Bi;
  year: string;
  region: Bi;
};

export const PROJECT_META: Record<string, ProjectMeta> = {
  "sadat-city-ro": {
    cover: "/images/projects/sadat-city-ro/cover.webp",
    gallery: [
      "/images/projects/sadat-city-ro/gallery-1.webp",
      "/images/projects/sadat-city-ro/gallery-2.webp",
      "/images/projects/sadat-city-ro/gallery-3.webp",
      "/images/projects/sadat-city-ro/gallery-4.webp",
      "/images/projects/sadat-city-ro/gallery-5.webp",
    ],
    capacity: { en: "1,500 m³/day", ar: "1,500 م³/يوم" },
    client: {
      en: "Macaroni & Biscuit Factories Complex — NSPO",
      ar: "مجمع مصانع المكرونة والبسكويت — الخدمة الوطنية",
    },
    consultant: { en: "MAST Group", ar: "مجموعة ماست" },
    scope: {
      en: "Process Design · RO Supply · Skid Assembly · Commissioning · 24/7 O&M",
      ar: "تصميم العمليات · توريد التناضح العكسي · تجميع الوحدات · تشغيل تجريبي · تشغيل وصيانة",
    },
    year: "2021",
    region: { en: "Sadat City, Menoufia", ar: "مدينة السادات، المنوفية" },
  },
  "toshka-pumping-stations": {
    cover: "/images/projects/toshka-pumping-stations/cover.webp",
    gallery: [
      "/images/projects/toshka-pumping-stations/gallery-1.webp",
      "/images/projects/toshka-pumping-stations/gallery-2.webp",
      "/images/projects/toshka-pumping-stations/gallery-3.webp",
      "/images/projects/toshka-pumping-stations/gallery-4.webp",
      "/images/projects/toshka-pumping-stations/gallery-5.webp",
    ],
    capacity: { en: "22 Pumping Stations · 150 m³/day Purification", ar: "22 محطة رفع · محطة تنقية 150 م³/يوم" },
    client: {
      en: "National Agricultural Reclamation Authority",
      ar: "جهاز مشروعات الخدمة الوطنية واستصلاح الأراضي",
    },
    consultant: { en: "Armed Forces Engineering Department", ar: "إدارة المهندسين العسكريين" },
    scope: {
      en: "Hydraulic Design · Pumping Station Construction · Electromechanical Fit-Out · SCADA",
      ar: "تصميم هيدروليكي · إنشاء محطات الرفع · أعمال كهروميكانيكية · تحكم سكادا",
    },
    year: "2021",
    region: { en: "Toshka & East Owainat, Aswan", ar: "توشكى وشرق العوينات، أسوان" },
  },
  "arish-water-supply": {
    cover: "/images/projects/arish-water-supply/cover.webp",
    gallery: [
      "/images/projects/arish-water-supply/gallery-1.webp",
      "/images/projects/arish-water-supply/gallery-2.webp",
      "/images/projects/arish-water-supply/gallery-3.webp",
      "/images/projects/arish-water-supply/gallery-4.webp",
      "/images/projects/arish-water-supply/gallery-5.webp",
    ],
    capacity: { en: "Regional Trunk Lines & Booster Stations", ar: "خطوط نقل رئيسية ومحطات رافع" },
    client: {
      en: "Engineering Authority & Al-Arjani Group",
      ar: "الهيئة الهندسية ومجموعة العرجاني (أبناء سيناء)",
    },
    consultant: { en: "Engineering Authority Supervision Office", ar: "مكتب الإشراف الهندسي" },
    scope: {
      en: "Supply Trunk Lines · Strategic Storage Tanks · Booster Stations · Valve Chambers",
      ar: "خطوط التغذية الناقلة · خزانات التكديس الاستراتيجية · محطات الرفع · غرف المحابس",
    },
    year: "2024",
    region: { en: "Arish Airport & North Sinai", ar: "مطار العريش وشمال سيناء" },
  },
  "food-city-treatment": {
    cover: "/images/projects/food-city-treatment/cover.webp",
    gallery: [
      "/images/projects/food-city-treatment/gallery-1.webp",
      "/images/projects/food-city-treatment/gallery-2.webp",
      "/images/projects/food-city-treatment/gallery-3.webp",
      "/images/projects/food-city-treatment/gallery-4.webp",
      "/images/projects/food-city-treatment/gallery-5.webp",
    ],
    capacity: { en: "50 m³/day Industrial Wastewater", ar: "50 م³/يوم صرف صناعي غذائي" },
    client: {
      en: "Food City Industrial Complex (Biscuit Factory)",
      ar: "مجمع المدينة الغذائية الصناعي (مصنع البسكويت)",
    },
    consultant: { en: "MAST Engineering Consultants", ar: "استشاريو ماست الهندسيون" },
    scope: {
      en: "Biological & Chemical Treatment · Skid Fabrication · Compliance Testing · Handover",
      ar: "معالجة بيولوجية وكيميائية · تصنيع الوحدات · اختبارات المطابقة البيئية · التسليم",
    },
    year: "2021",
    region: { en: "Sadat City Industrial Zone", ar: "المنطقة الصناعية بالسادات" },
  },
  "awlad-el-sheikh-pumping": {
    cover: "/images/projects/awlad-el-sheikh-pumping/cover.webp",
    gallery: [
      "/images/projects/awlad-el-sheikh-pumping/gallery-1.webp",
      "/images/projects/awlad-el-sheikh-pumping/gallery-2.webp",
    ],
    capacity: { en: "Potable Water Lifting Hub", ar: "محطة رفع وتغذية مياه الشرب" },
    client: {
      en: "Potable Water & Sanitation Authority (NOPWASD)",
      ar: "الهيئة القومية لمياه الشرب والصرف الصحي — سوهاج",
    },
    consultant: { en: "Third Field Army Engineering Department", ar: "شعبة المهندسين العسكريين" },
    scope: {
      en: "Civil Well Construction · Submersible & Booster Pump Sets · Control Panels · Testing",
      ar: "الأعمال المدنية للبيارات · مجموعات الضخ الغاطس والرافع · لوحات التشغيل والتحكم",
    },
    year: "2022",
    region: { en: "Awlad El-Sheikh, Sohag", ar: "أولاد الشيخ، سوهاج" },
  },
  "north-coast-desalination": {
    cover: "/images/projects/north-coast-desalination/cover.webp",
    gallery: [
      "/images/projects/north-coast-desalination/gallery-1.webp",
      "/images/projects/north-coast-desalination/gallery-2.webp",
      "/images/projects/north-coast-desalination/gallery-3.webp",
      "/images/projects/north-coast-desalination/gallery-4.webp",
      "/images/projects/north-coast-desalination/gallery-5.webp",
    ],
    capacity: { en: "Multi-Unit Brackish RO Trains", ar: "وحدات تحلية متتابعة بالتناضح العكسي" },
    client: {
      en: "Commercial & Regional Development Authority",
      ar: "جهاز تنمية وتطوير المشروعات الإقليمية والساحلية",
    },
    consultant: { en: "Coastal Water Works Committee", ar: "لجنة الأعمال المائية الساحلية" },
    scope: {
      en: "Pre-Filtration · Brackish RO Trains · Chemical Dosing · Lab Quality Verification",
      ar: "مراحل الفلترة الرملية والميكرونية · وحدات التناضح العكسي · منظومة الحقن الكيميائي",
    },
    year: "2020",
    region: { en: "El Hamam & Coastal Strip, Matrouh", ar: "الحمام والشريط الساحلي، مطروح" },
  },
  "ameriya-cold-storage": {
    cover: "/images/projects/ameriya-cold-storage/cover.jpg",
    gallery: [
      "/images/projects/ameriya-cold-storage/gallery-1.jpg",
      "/images/projects/ameriya-cold-storage/gallery-2.jpg",
      "/images/projects/ameriya-cold-storage/gallery-3.jpg",
      "/images/projects/ameriya-cold-storage/gallery-4.jpg",
      "/images/projects/ameriya-cold-storage/gallery-5.jpg",
    ],
    capacity: { en: "Industrial Cooling & Water Distribution Loops", ar: "دوائر تبريد عمليات وشبكات توزيع مياه متكاملة" },
    client: {
      en: "Industrial Logistics & Cold Storage Complex",
      ar: "مجمع الثلاجات والمشروعات اللوجستية الصناعية بالعامرية",
    },
    consultant: null,
    scope: {
      en: "Process Cooling Loops · Water Distribution Network · Pressure Balancing · Commissioning",
      ar: "دوائر التبريد للعمليات · شبكة التوزيع والضخ · موازنة الضغوط الهيدروليكية · التشغيل التجريبي",
    },
    year: "2021",
    region: { en: "Ameriya, Alexandria", ar: "العامرية، الإسكندرية" },
  },
  "east-delta-wastewater": {
    cover: "/images/projects/east-delta-wastewater/cover.webp",
    gallery: [
      "/images/projects/east-delta-wastewater/gallery-1.webp",
      "/images/projects/east-delta-wastewater/gallery-2.webp",
      "/images/projects/east-delta-wastewater/gallery-3.webp",
      "/images/projects/east-delta-wastewater/gallery-4.webp",
      "/images/projects/east-delta-wastewater/gallery-5.webp",
    ],
    capacity: { en: "Regional Wastewater Collection & Treatment Networks", ar: "شبكات تجميع ومعالجة مياه الصرف الصحي الإقليمية" },
    client: {
      en: "National Urban Development Authority",
      ar: "الهيئة القومية لتطوير التجمعات العمرانية والريفية",
    },
    consultant: { en: "Infrastructure Engineering Directorate", ar: "إدارة البنية التحتية الهندسية" },
    scope: {
      en: "Gravity Sewer Mains · Lift Stations · Treatment Works · Statutory Compliance Verification",
      ar: "خطوط الانحدار الرئيسية · محطات الرفع · محطات المعالجة · اختبارات المطابقة البيئية",
    },
    year: "2025",
    region: { en: "East Delta, Sharqia & Peace City", ar: "دلتا الشرق، الشرقية ومدينة السلام" },
  },
};

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return PROJECT_META[slug];
}

