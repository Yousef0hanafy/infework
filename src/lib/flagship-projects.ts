// Infeworks — curated flagship project fallback used when the published
// database catalogue is empty. Presentation-only; mirrors PublicProject shape
// so routes can render identical cards without backend records.

import { PROJECT_META } from "./project-meta";
import type { PublicProject, PublicProjectDetail } from "./public-types";

type FlagshipSeed = {
  slug: string;
  en: { title: string; challenge: string; outcome: string };
  ar: { title: string; challenge: string; outcome: string };
  capability_slugs: string[];
  location: { lat: number; lng: number; en: string; ar: string };
  schematic_steps?: import("./public-types").SchematicStep[];
};

const SEEDS: FlagshipSeed[] = [
  {
    slug: "sadat-city-ro",
    schematic_steps: [
      {
        id: "s1",
        label_en: "Well Intake",
        label_ar: "مأخذ الآبار",
        desc_en: "Brackish raw water",
        desc_ar: "مياه جوفية عسرة",
      },
      {
        id: "s2",
        label_en: "Pre-treatment",
        label_ar: "المعالجة الابتدائية",
        desc_en: "Multimedia & cartridge filtration",
        desc_ar: "فلاتر رملية وقطنية",
      },
      {
        id: "s3",
        label_en: "High Pressure Pumping",
        label_ar: "ضخ عالي الضغط",
        desc_en: "Feed to RO skids",
        desc_ar: "تغذية أغشية التناضح",
      },
      {
        id: "s4",
        label_en: "RO Membranes",
        label_ar: "أغشية التناضح العكسي",
        desc_en: "Desalination process",
        desc_ar: "عملية فصل الأملاح",
      },
      {
        id: "s5",
        label_en: "Post-treatment",
        label_ar: "المعالجة النهائية",
        desc_en: "Disinfection & remineralization",
        desc_ar: "تعقيم وإعادة معدنة",
      },
      {
        id: "s6",
        label_en: "Product Storage",
        label_ar: "خزانات المنتج",
        desc_en: "Food-grade distribution",
        desc_ar: "توزيع مطابق للمواصفات الغذائية",
      },
    ],
    en: {
      title: "Sadat City RO Desalination Plant",
      challenge:
        "A food-grade production complex needed 1,500 m³/day of consistently potable water from brackish well sources, with no tolerance for quality drift on the production line.",
      outcome:
        "Design, supply, installation, commissioning and operation delivered under one contract, with witnessed performance runs and lab-verified product water.",
    },
    ar: {
      title: "محطة تحلية مياه بالتناضح العكسي — مدينة السادات",
      challenge:
        "مجمع إنتاج غذائي يحتاج 1,500 م³/يوم من مياه صالحة للشرب من آبار مالحة، دون أي انحراف في الجودة على خطوط الإنتاج.",
      outcome:
        "تصميم وتوريد وتركيب وتشغيل تجريبي وتشغيل بعقد واحد، مع تجارب أداء موثقة وتحقق معملي لمياه المنتج.",
    },
    capability_slugs: ["water-treatment", "industrial-mep"],
    location: {
      lat: 30.3639,
      lng: 30.5236,
      en: "Sadat City, Menoufia",
      ar: "مدينة السادات، المنوفية",
    },
  },
  {
    slug: "toshka-pumping-stations",
    schematic_steps: [
      {
        id: "t1",
        label_en: "Wet Well Intake",
        label_ar: "مأخذ البيارة",
        desc_en: "Source water collection",
        desc_ar: "تجميع مياه المصدر",
      },
      {
        id: "t2",
        label_en: "Screening",
        label_ar: "حجز الشوائب",
        desc_en: "Coarse and fine basket screens",
        desc_ar: "مصافي خشنة ودقيقة",
      },
      {
        id: "t3",
        label_en: "Heavy Duty Pumping",
        label_ar: "طلمبات الخدمة الشاقة",
        desc_en: "Lifting via high-head sets",
        desc_ar: "رفع عبر طلمبات قدرات عالية",
      },
      {
        id: "t4",
        label_en: "VFD & Control",
        label_ar: "التحكم والمغيرات",
        desc_en: "Automated discharge regulation",
        desc_ar: "تنظيم آلي لتدفق المياه",
      },
      {
        id: "t5",
        label_en: "Surge Protection",
        label_ar: "حماية الطرق المائي",
        desc_en: "Anti-hammer vessels",
        desc_ar: "خزانات تخميد الصدمات",
      },
      {
        id: "t6",
        label_en: "Distribution",
        label_ar: "شبكة التوزيع",
        desc_en: "Reclamation supply lines",
        desc_ar: "خطوط تغذية الاستصلاح الزراعي",
      },
    ],
    en: {
      title: "Toshka Multi-Station Pumping System (22 Hubs)",
      challenge:
        "Critical desert lifting, pumping, and distribution infrastructure to support strategic agricultural reclamation in Toshka under harsh ambient temperatures and high hydraulic heads.",
      outcome:
        "Completed mechanical, electrical, and hydraulic stations with heavy-duty pump sets, basket screens, and automated discharge controls handed over for long-term operation.",
    },
    ar: {
      title: "منظومة محطات رفع وتوزيع مياه توشكى (22 محطة)",
      challenge:
        "بنية تحتية استراتيجية للرفع والضخ والتوزيع لدعم مشروعات الاستصلاح الزراعي في توشكى تحت ظروف مناخية صحراوية قاسية وفروق مناسيب هيدروليكية عالية.",
      outcome:
        "استكمال وتدشين محطات ميكانيكية وكهربائية ومحطات رفع مع طلمبات الخدمة الشاقة ومصافي حجز الشوائب وأنظمة التحكم الآلي في التصرف.",
    },
    capability_slugs: ["wastewater", "infrastructure-networks"],
    location: {
      lat: 22.6833,
      lng: 31.7167,
      en: "Toshka, Aswan",
      ar: "توشكى، أسوان",
    },
  },
  {
    slug: "shubra-shahab-industrial-wastewater",
    schematic_steps: [
      {
        id: "w1",
        label_en: "Equalization",
        label_ar: "خزان الموازنة",
        desc_en: "Load and flow balancing",
        desc_ar: "موازنة الأحمال والتدفق",
      },
      {
        id: "w2",
        label_en: "Chemical Dosing",
        label_ar: "الحقن الكيميائي",
        desc_en: "Coagulation & flocculation",
        desc_ar: "ترويب وتنديف",
      },
      {
        id: "w3",
        label_en: "DAF Unit",
        label_ar: "التعويم بالهواء المذاب",
        desc_en: "FOG and TSS removal",
        desc_ar: "فصل الزيوت والمواد العالقة",
      },
      {
        id: "w4",
        label_en: "Biological Aeration",
        label_ar: "المعالجة البيولوجية",
        desc_en: "Organic load reduction",
        desc_ar: "تقليل الحمل العضوي",
      },
      {
        id: "w5",
        label_en: "Secondary Clarification",
        label_ar: "الترويق النهائي",
        desc_en: "Sludge settlement",
        desc_ar: "ترسيب الحمأة",
      },
      {
        id: "w6",
        label_en: "Compliance Discharge",
        label_ar: "الصرف الآمن",
        desc_en: "Environmental release",
        desc_ar: "صرف مطابق بيئياً",
      },
    ],
    en: {
      title: "Shubra Shahab Industrial Wastewater Treatment Facility",
      challenge:
        "An agro-industrial processing complex required a specialized industrial wastewater treatment facility to treat high-load organic and chemical effluents in full compliance with environmental standards.",
      outcome:
        "Civil basins, dissolved air flotation (DAF), chemical dosing, and biological treatment train fabricated, installed, and commissioned.",
    },
    ar: {
      title: "محطة معالجة الصرف الصناعي الزراعي — شبرا شهاب",
      challenge:
        "مجمع صناعي زراعي يتطلب محطة معالجة صرف صناعي متخصصة لمعالجة المنصرفات العضوية والكيميائية عالية الأحمال ومطابقة المعايير البيئية.",
      outcome:
        "أحواض خرسانية، ووحدات تعويم بالهواء المذاب (DAF)، وحقن كيميائي، وخط معالجة بيولوجية تم تصنيعها وتركيبها وتشغيلها بنجاح.",
    },
    capability_slugs: ["industrial-mep", "wastewater"],
    location: {
      lat: 30.2833,
      lng: 31.2167,
      en: "Shubra Shahab, Qalyubia",
      ar: "شبرا شهاب، القليوبية",
    },
  },
  {
    slug: "food-city-treatment",
    schematic_steps: [
      {
        id: "f1",
        label_en: "FOG Trap",
        label_ar: "مصيدة الزيوت والشحوم",
        desc_en: "Initial separation",
        desc_ar: "فصل أولي",
      },
      {
        id: "f2",
        label_en: "Equalization Tank",
        label_ar: "حوض الموازنة",
        desc_en: "Buffer storage",
        desc_ar: "تخزين مؤقت للتوازن",
      },
      {
        id: "f3",
        label_en: "DAF System",
        label_ar: "نظام DAF",
        desc_en: "Industrial load reduction",
        desc_ar: "تقليل الحمل الصناعي",
      },
      {
        id: "f4",
        label_en: "MBBR Reactor",
        label_ar: "مفاعل MBBR",
        desc_en: "Biofilm biological treatment",
        desc_ar: "معالجة بيولوجية حيوية",
      },
      {
        id: "f5",
        label_en: "Final Clarifier",
        label_ar: "حوض الترسيب",
        desc_en: "Solids separation",
        desc_ar: "فصل المواد الصلبة",
      },
      {
        id: "f6",
        label_en: "Municipal Discharge",
        label_ar: "صرف على الشبكة",
        desc_en: "Compliant effluent",
        desc_ar: "صرف مطابق لحدود البلدية",
      },
    ],
    en: {
      title: "Food City Industrial Wastewater Treatment",
      challenge:
        "An industrial food complex discharged high-load effluent that had to meet municipal compliance limits before release.",
      outcome:
        "Treatment train designed, fabricated, installed and compliance-tested against discharge limits.",
    },
    ar: {
      title: "معالجة الصرف الصناعي — المدينة الغذائية",
      challenge:
        "مجمع غذائي صناعي يصرف مخلفات عالية التحميل يجب أن تطابق حدود الصرف البلدية قبل التخلص منها.",
      outcome: "وحدة معالجة 50 م³/يوم تم تصميمها وتصنيعها وتركيبها واختبار مطابقتها لحدود الصرف.",
    },
    capability_slugs: ["wastewater", "industrial-mep"],
    location: {
      lat: 30.3729,
      lng: 30.5401,
      en: "Sadat City Industrial Zone",
      ar: "المنطقة الصناعية بالسادات",
    },
  },
  {
    slug: "arish-water-supply",
    schematic_steps: [
      {
        id: "a1",
        label_en: "Source Intake",
        label_ar: "مأخذ المصدر",
        desc_en: "Primary supply connection",
        desc_ar: "نقطة الربط الرئيسية",
      },
      {
        id: "a2",
        label_en: "Trunk Mains",
        label_ar: "الخطوط الناقلة",
        desc_en: "Large diameter transmission",
        desc_ar: "نقل بأقطار كبيرة",
      },
      {
        id: "a3",
        label_en: "Strategic Storage",
        label_ar: "خزانات تكديس",
        desc_en: "Buffer reservoirs",
        desc_ar: "خزانات توازن استراتيجية",
      },
      {
        id: "a4",
        label_en: "Booster Station",
        label_ar: "محطة الرفع",
        desc_en: "Pressure boosting",
        desc_ar: "رفع الضغط الهيدروليكي",
      },
      {
        id: "a5",
        label_en: "Local Distribution",
        label_ar: "شبكة التوزيع الفرعية",
        desc_en: "Service area network",
        desc_ar: "شبكة التغذية للمناطق",
      },
    ],
    en: {
      title: "Arish Water Supply & Infrastructure",
      challenge:
        "Sinai development works needed trunk mains, storage and pumping capacity delivered under Engineering Authority supervision.",
      outcome:
        "Supply lines, storage tanks and pumping stations built and handed over as a single accountable package.",
    },
    ar: {
      title: "أعمال تغذية المياه والبنية التحتية — العريش",
      challenge:
        "أعمال تنمية بسيناء تتطلب خطوط تغذية رئيسية وخزانات وقدرة ضخ تحت إشراف الهيئة الهندسية.",
      outcome: "خطوط تغذية وخزانات تكديس ومحطات ضخ تم تنفيذها وتسليمها كحزمة واحدة بمسؤولية كاملة.",
    },
    capability_slugs: ["infrastructure-networks", "pumping-wells"],
    location: { lat: 31.1313, lng: 33.8031, en: "Arish, North Sinai", ar: "العريش، شمال سيناء" },
  },
  {
    slug: "ameriya-cold-storage",
    schematic_steps: [
      {
        id: "c1",
        label_en: "Chiller Plant",
        label_ar: "محطة التبريد",
        desc_en: "Refrigeration generation",
        desc_ar: "توليد طاقة التبريد",
      },
      {
        id: "c2",
        label_en: "Heat Exchangers",
        label_ar: "المبادلات الحرارية",
        desc_en: "Thermal transfer",
        desc_ar: "نقل التبادل الحراري",
      },
      {
        id: "c3",
        label_en: "Primary Loop",
        label_ar: "الدائرة الابتدائية",
        desc_en: "Circulation pumping",
        desc_ar: "طلمبات التدوير",
      },
      {
        id: "c4",
        label_en: "Distribution Network",
        label_ar: "شبكة النقل",
        desc_en: "Insulated pipework",
        desc_ar: "مواسير معزولة حرارياً",
      },
      {
        id: "c5",
        label_en: "Evaporator Coils",
        label_ar: "ملفات التبخير",
        desc_en: "Cold room cooling",
        desc_ar: "تبريد غرف الحفظ",
      },
    ],
    en: {
      title: "Ameriya Cold-Storage Infrastructure",
      challenge:
        "A cold-storage complex required process cooling and a distribution network able to hold temperature under continuous load.",
      outcome:
        "Process cooling loops, distribution network and electromechanical works commissioned and handed over.",
    },
    ar: {
      title: "بنية تحتية للتخزين المبرد — العامرية",
      challenge:
        "مجمع تخزين مبرد يحتاج تبريد عمليات وشبكة توزيع قادرة على ثبات درجات الحرارة تحت تحميل مستمر.",
      outcome: "دوائر تبريد العمليات وشبكة التوزيع والأعمال الكهروميكانيكية تم تشغيلها وتسليمها.",
    },
    capability_slugs: ["industrial-mep", "pumping-wells"],
    location: { lat: 31.0, lng: 29.8, en: "Ameriya, Alexandria", ar: "العامرية، الإسكندرية" },
  },
  {
    slug: "awlad-el-sheikh-pumping",
    schematic_steps: [
      {
        id: "aw1",
        label_en: "Suction Header",
        label_ar: "مجمع السحب",
        desc_en: "Intake manifold",
        desc_ar: "تجميع خطوط السحب",
      },
      {
        id: "aw2",
        label_en: "Duty/Standby Pumps",
        label_ar: "طلمبات التشغيل والاحتياط",
        desc_en: "Potable water lifting",
        desc_ar: "رفع مياه الشرب",
      },
      {
        id: "aw3",
        label_en: "VFD Control Panel",
        label_ar: "لوحات التحكم VFD",
        desc_en: "Variable speed drive",
        desc_ar: "تغيير السرعة حسب الطلب",
      },
      {
        id: "aw4",
        label_en: "Instrumentation",
        label_ar: "أجهزة القياس",
        desc_en: "Pressure & flow sensors",
        desc_ar: "حساسات ضغط وتصرف",
      },
      {
        id: "aw5",
        label_en: "Rising Main",
        label_ar: "خط الطرد الرئيسي",
        desc_en: "Network feed",
        desc_ar: "تغذية شبكة المستهلكين",
      },
    ],
    en: {
      title: "Awlad El-Sheikh Potable Water Pumping",
      challenge:
        "A local water authority needed reliable potable pumping capacity for a growing service area in Upper Egypt.",
      outcome:
        "Civil works, pump sets, control panels and commissioning completed under one delivery team.",
    },
    ar: {
      title: "محطة ضخ مياه شرب — أولاد الشيخ",
      challenge: "جهة مياه محلية تحتاج قدرة ضخ موثوقة لمياه الشرب لنطاق خدمة متنامٍ بصعيد مصر.",
      outcome: "أعمال مدنية ومجموعات ضخ ولوحات تحكم وتشغيل تجريبي بفريق تنفيذ واحد.",
    },
    capability_slugs: ["pumping-wells", "industrial-mep"],
    location: {
      lat: 26.5569,
      lng: 31.6948,
      en: "Awlad El-Sheikh, Sohag",
      ar: "أولاد الشيخ، سوهاج",
    },
  },
  {
    slug: "north-coast-desalination",
    schematic_steps: [
      {
        id: "n1",
        label_en: "Sea/Well Intake",
        label_ar: "المأخذ",
        desc_en: "Raw water extraction",
        desc_ar: "سحب المياه الخام",
      },
      {
        id: "n2",
        label_en: "Pre-treatment",
        label_ar: "المعالجة الابتدائية",
        desc_en: "Multi-stage filtration",
        desc_ar: "فلاتر متعددة المراحل",
      },
      {
        id: "n3",
        label_en: "High Pressure Pumps",
        label_ar: "طلمبات الضغط العالي",
        desc_en: "Membrane feed",
        desc_ar: "تغذية الأغشية",
      },
      {
        id: "n4",
        label_en: "RO Skids",
        label_ar: "وحدات RO",
        desc_en: "Desalination process",
        desc_ar: "فصل الأملاح",
      },
      {
        id: "n5",
        label_en: "Post-treatment",
        label_ar: "المعالجة النهائية",
        desc_en: "pH adjustment",
        desc_ar: "ضبط القلوية والتعقيم",
      },
      {
        id: "n6",
        label_en: "Commercial Supply",
        label_ar: "الضخ التجاري",
        desc_en: "Resort distribution",
        desc_ar: "تغذية المنتجع السياحي",
      },
    ],
    en: {
      title: "North Coast Commercial Desalination",
      challenge:
        "A coastal commercial development needed an independent, verifiable source of potable water outside the municipal network.",
      outcome:
        "Commercial RO train designed, supplied, installed and verified by independent laboratory testing.",
    },
    ar: {
      title: "تحلية مياه تجارية — الساحل الشمالي",
      challenge: "مشروع تجاري ساحلي يحتاج مصدر مياه شرب مستقل وقابل للتحقق خارج الشبكة البلدية.",
      outcome: "وحدة تناضح عكسي تجارية تم تصميمها وتوريدها وتركيبها والتحقق منها معمليًا.",
    },
    capability_slugs: ["water-treatment"],
    location: { lat: 31.0409, lng: 28.4, en: "North Coast, Matrouh", ar: "الساحل الشمالي، مطروح" },
  },
];

/** Curated flagship projects rendered when no published records exist. */
export function getFlagshipProjects(locale: string): PublicProject[] {
  const isAr = locale === "ar";
  return SEEDS.map((s) => {
    const copy = isAr ? s.ar : s.en;
    return {
      project_id: `flagship-${s.slug}`,
      slug: s.slug,
      locale,
      title: copy.title,
      challenge: copy.challenge,
      outcome: copy.outcome,
      created_at: PROJECT_META[s.slug]?.year ? `${PROJECT_META[s.slug]!.year}-01-01` : null,
      capability_slugs: s.capability_slugs,
      location: {
        lat: s.location.lat,
        lng: s.location.lng,
        display_name: isAr ? s.location.ar : s.location.en,
      },
      cover_url: PROJECT_META[s.slug]?.cover ?? null,
      featured: true,
    } satisfies PublicProject;
  });
}

/** Fallback case-study detail for a curated flagship slug. */
export function getFlagshipDetail(slug: string, locale: string): PublicProjectDetail | null {
  const isAr = locale === "ar";
  const project = getFlagshipProjects(locale).find((p) => p.slug === slug);
  if (!project) return null;
  const meta = PROJECT_META[slug];
  const seed = SEEDS.find((s) => s.slug === slug);
  return {
    project,
    location: project.location,
    claims: [],
    media: meta
      ? [meta.cover, ...meta.gallery].map((url, i) => ({
          id: `${slug}-media-${i}`,
          url,
          alt: project.title,
          media_type: "photo" as const,
          mime_type: "image/webp",
        }))
      : [],
    facts: meta
      ? {
          client: (isAr ? meta.client?.ar : meta.client?.en) ?? "",
          consultant: (isAr ? meta.consultant?.ar : meta.consultant?.en) ?? "",
          scope: (isAr ? meta.scope?.ar : meta.scope?.en) ?? "",
          capacity: (isAr ? meta.capacity?.ar : meta.capacity?.en) ?? "",
          year: meta.year ?? "",
          region: (isAr ? meta.region?.ar : meta.region?.en) ?? "",
        }
      : null,
    schema: null,
    schematic_steps: seed?.schematic_steps,
  };
}
