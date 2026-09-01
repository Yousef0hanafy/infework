const fs = require('fs');
const stats = require('./curated_portfolio_stats.json');

let content = fs.readFileSync('src/lib/project-meta.ts', 'utf-8');

// First, make the fields optional in the type definition
content = content.replace(
`export type ProjectMeta = {
  cover: string;
  gallery: string[];
  capacity: Bi;
  client: Bi;
  consultant: Bi | null;
  scope: Bi;
  year: string;
  region: Bi;
};`,
`export type ProjectMeta = {
  cover: string;
  gallery: string[];
  capacity?: Bi;
  client?: Bi;
  consultant?: Bi | null;
  scope?: Bi;
  year?: string;
  region?: Bi;
};`
);

// We need to rebuild PROJECT_META.
// The existing 8 projects are:
const existingData = {
  "sadat-city-ro": {
    capacity: '{ en: "1,500 m³/day", ar: "1,500 م³/يوم" }',
    client: `{\n      en: "Macaroni & Biscuit Factories Complex — NSPO",\n      ar: "مجمع مصانع المكرونة والبسكويت — الخدمة الوطنية",\n    }`,
    consultant: '{ en: "MAST Group", ar: "مجموعة ماست" }',
    scope: `{\n      en: "Process Design · RO Supply · Skid Assembly · Commissioning · 24/7 O&M",\n      ar: "تصميم العمليات · توريد التناضح العكسي · تجميع الوحدات · تشغيل تجريبي · تشغيل وصيانة",\n    }`,
    year: '"2021"',
    region: '{ en: "Sadat City, Menoufia", ar: "مدينة السادات، المنوفية" }',
  },
  "toshka-pumping-stations": {
    capacity: '{ en: "22 Pumping Stations · 150 m³/day Purification", ar: "22 محطة رفع · محطة تنقية 150 م³/يوم" }',
    client: `{\n      en: "National Agricultural Reclamation Authority",\n      ar: "جهاز مشروعات الخدمة الوطنية واستصلاح الأراضي",\n    }`,
    consultant: '{ en: "Armed Forces Engineering Department", ar: "إدارة المهندسين العسكريين" }',
    scope: `{\n      en: "Hydraulic Design · Pumping Station Construction · Electromechanical Fit-Out · SCADA",\n      ar: "تصميم هيدروليكي · إنشاء محطات الرفع · أعمال كهروميكانيكية · تحكم سكادا",\n    }`,
    year: '"2021"',
    region: '{ en: "Toshka & East Owainat, Aswan", ar: "توشكى وشرق العوينات، أسوان" }',
  },
  "arish-water-supply": {
    capacity: '{ en: "Regional Trunk Lines & Booster Stations", ar: "خطوط نقل رئيسية ومحطات رافع" }',
    client: `{\n      en: "Engineering Authority & Al-Arjani Group",\n      ar: "الهيئة الهندسية ومجموعة العرجاني (أبناء سيناء)",\n    }`,
    consultant: '{ en: "Engineering Authority Supervision Office", ar: "مكتب الإشراف الهندسي" }',
    scope: `{\n      en: "Supply Trunk Lines · Strategic Storage Tanks · Booster Stations · Valve Chambers",\n      ar: "خطوط التغذية الناقلة · خزانات التكديس الاستراتيجية · محطات الرفع · غرف المحابس",\n    }`,
    year: '"2024"',
    region: '{ en: "Arish Airport & North Sinai", ar: "مطار العريش وشمال سيناء" }',
  },
  "food-city-treatment": {
    capacity: '{ en: "50 m³/day Industrial Wastewater", ar: "50 م³/يوم صرف صناعي غذائي" }',
    client: `{\n      en: "Food City Industrial Complex (Biscuit Factory)",\n      ar: "مجمع المدينة الغذائية الصناعي (مصنع البسكويت)",\n    }`,
    consultant: '{ en: "MAST Engineering Consultants", ar: "استشاريو ماست الهندسيون" }',
    scope: `{\n      en: "Biological & Chemical Treatment · Skid Fabrication · Compliance Testing · Handover",\n      ar: "معالجة بيولوجية وكيميائية · تصنيع الوحدات · اختبارات المطابقة البيئية · التسليم",\n    }`,
    year: '"2021"',
    region: '{ en: "Sadat City Industrial Zone", ar: "المنطقة الصناعية بالسادات" }',
  },
  "awlad-el-sheikh-pumping": {
    capacity: '{ en: "Potable Water Lifting Hub", ar: "محطة رفع وتغذية مياه الشرب" }',
    client: `{\n      en: "Potable Water & Sanitation Authority (NOPWASD)",\n      ar: "الهيئة القومية لمياه الشرب والصرف الصحي — سوهاج",\n    }`,
    consultant: '{ en: "Third Field Army Engineering Department", ar: "شعبة المهندسين العسكريين" }',
    scope: `{\n      en: "Civil Well Construction · Submersible & Booster Pump Sets · Control Panels · Testing",\n      ar: "الأعمال المدنية للبيارات · مجموعات الضخ الغاطس والرافع · لوحات التشغيل والتحكم",\n    }`,
    year: '"2022"',
    region: '{ en: "Awlad El-Sheikh, Sohag", ar: "أولاد الشيخ، سوهاج" }',
  },
  "north-coast-desalination": {
    capacity: '{ en: "Multi-Unit Brackish RO Trains", ar: "وحدات تحلية متتابعة بالتناضح العكسي" }',
    client: `{\n      en: "Commercial & Regional Development Authority",\n      ar: "جهاز تنمية وتطوير المشروعات الإقليمية والساحلية",\n    }`,
    consultant: '{ en: "Coastal Water Works Committee", ar: "لجنة الأعمال المائية الساحلية" }',
    scope: `{\n      en: "Pre-Filtration · Brackish RO Trains · Chemical Dosing · Lab Quality Verification",\n      ar: "مراحل الفلترة الرملية والميكرونية · وحدات التناضح العكسي · منظومة الحقن الكيميائي",\n    }`,
    year: '"2020"',
    region: '{ en: "El Hamam & Coastal Strip, Matrouh", ar: "الحمام والشريط الساحلي، مطروح" }',
  },
  "ameriya-cold-storage": {
    capacity: '{ en: "Industrial Cooling & Water Distribution Loops", ar: "دوائر تبريد عمليات وشبكات توزيع مياه متكاملة" }',
    client: `{\n      en: "Industrial Logistics & Cold Storage Complex",\n      ar: "مجمع الثلاجات والمشروعات اللوجستية الصناعية بالعامرية",\n    }`,
    consultant: 'null',
    scope: `{\n      en: "Process Cooling Loops · Water Distribution Network · Pressure Balancing · Commissioning",\n      ar: "دوائر التبريد للعمليات · شبكة التوزيع والضخ · موازنة الضغوط الهيدروليكية · التشغيل التجريبي",\n    }`,
    year: '"2021"',
    region: '{ en: "Ameriya, Alexandria", ar: "العامرية، الإسكندرية" }',
  },
  "east-delta-wastewater": {
    capacity: '{ en: "Regional Wastewater Collection & Treatment Networks", ar: "شبكات تجميع ومعالجة مياه الصرف الصحي الإقليمية" }',
    client: `{\n      en: "National Urban Development Authority",\n      ar: "الهيئة القومية لتطوير التجمعات العمرانية والريفية",\n    }`,
    consultant: '{ en: "Infrastructure Engineering Directorate", ar: "إدارة البنية التحتية الهندسية" }',
    scope: `{\n      en: "Gravity Sewer Mains · Lift Stations · Treatment Works · Statutory Compliance Verification",\n      ar: "خطوط الانحدار الرئيسية · محطات الرفع · محطات المعالجة · اختبارات المطابقة البيئية",\n    }`,
    year: '"2025"',
    region: '{ en: "East Delta, Sharqia & Peace City", ar: "دلتا الشرق، الشرقية ومدينة السلام" }',
  }
};

let replacementObject = '{\n';

for (const [slug, stat] of Object.entries(stats)) {
  const galleryStr = stat.gallery.map(g => `      "${g}"`).join(',\n');
  
  replacementObject += \`  "\${slug}": {
    cover: "\${stat.cover}",
    gallery: [
\${galleryStr}
    ]\`;

  if (existingData[slug]) {
    const p = existingData[slug];
    replacementObject += \`,
    capacity: \${p.capacity},
    client: \${p.client},
    consultant: \${p.consultant},
    scope: \${p.scope},
    year: \${p.year},
    region: \${p.region}\`;
  }
  
  replacementObject += \`\n  },\n\`;
}

replacementObject += '};';

// Replace the PROJECT_META object entirely
content = content.replace(/export const PROJECT_META: Record<string, ProjectMeta> = \{[\s\S]*?\n\};\n?/m, \`export const PROJECT_META: Record<string, ProjectMeta> = \${replacementObject}\n\`);

fs.writeFileSync('src/lib/project-meta.ts', content);
console.log('Successfully updated src/lib/project-meta.ts');
