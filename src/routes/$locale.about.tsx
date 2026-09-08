import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Wrench,
  Activity,
  Award,
  ArrowRight,
  Sparkles,
  Linkedin,
  Target,
  Eye,
  Quote,
} from "lucide-react";

import Reveal from "@/components/infeworks/Reveal";
import MilestoneTrack, { type Milestone } from "@/components/infeworks/MilestoneTrack";

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) => {
    const isAr = params.locale === "ar";
    const title = isAr
      ? "عن إنفيوركس — الشركة الدولية للأعمال الهندسية | 20 عاماً من التكامل الهندسي"
      : "About Infeworks — International for Engineering Works | 20 Years of Integration";
    const desc = isAr
      ? "تأسست إنفيوركس عام 2006 لتكون المقاول المتكامل المسؤول عن تنفيذ محطات معالجة المياه وشبكات المرافق والمشروعات القومية في مصر بعقد واحد ومسؤولية شاملة."
      : "Established in 2006, Infeworks delivers water, wastewater, pumping stations, and utility infrastructure in Egypt as a single accountable contractor.";
    const url = `https://infeworks.com/${params.locale}/about`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: title,
      description: desc,
      url: url,
      mainEntity: {
        "@type": "Corporation",
        name: isAr ? "الشركة الدولية للأعمال الهندسية" : "International for Engineering Works",
        alternateName: "Infeworks",
        foundingDate: "2006",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Zahraa Nasr City, Cairo",
          addressCountry: "EG",
        },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
        },
        knowsAbout: [
          "Water Treatment Engineering",
          "Reverse Osmosis Desalination",
          "Wastewater Infrastructure",
          "High-Pressure Pumping Stations",
          "Electromechanical Contracting",
        ],
      },
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://infeworks.com/logo.png" },
        { property: "og:image:alt", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: "https://infeworks.com/logo.png" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(schema),
        },
      ],
    };
  },
  component: AboutPage,
});

const VERTICAL_CAPABILITIES = [
  {
    icon: Layers,
    en: "Process & Hydraulic Design",
    ar: "التصميم العملياتي والهيدروليكي",
    scopeEn:
      "Hydraulic modeling, membrane projection, mass balance calculations, and statutory authority engineering submissions.",
    scopeAr:
      "النمذجة الهيدروليكية، حسابات أداء الأغشية، موازنة الكتل والتدفقات، والاعتمادات الهندسية الرسمية.",
  },
  {
    icon: Wrench,
    en: "Equipment Procurement & Skid Fabrication",
    ar: "التوريد وتصنيع الوحدات المجمعة",
    scopeEn:
      "In-house pipe prefabrication, modular skid assembly, pressure vessel fabrication, and tier-1 membrane sourcing.",
    scopeAr:
      "تصنيع خطوط المواسير داخلياً، تجميع الوحدات المدمجة على شاسيهات، وتوريد المكونات والأغشية المعتمدة عالمياً.",
  },
  {
    icon: Cpu,
    en: "Heavy Electromechanical Installations",
    ar: "الأعمال الكهروميكانيكية التخصصية",
    scopeEn:
      "Large pump sets, ATEX-rated power, motor control centres (MCC), variable frequency drives (VFD), and surge protection vessels.",
    scopeAr:
      "مجموعات الضخ الكبرى، منظومات القوى المقاومة للانفجار، مراكز التحكم بالمحركات (MCC)، ومحابس وخزانات الحماية من الصدمات.",
  },
  {
    icon: Activity,
    en: "SCADA & Telemetry Automation",
    ar: "أنظمة التحكم والسكادا والمراقبة",
    scopeEn:
      "Industrial PLC programming, telemetry data loggers, remote station monitoring, and automated fault interlocks.",
    scopeAr:
      "برمجة أجهزة التحكم المنطقي (PLC)، أجهزة تسجيل وتلمتري عن بُعد، وشاشات المراقبة والتحكم الآلي.",
  },
  {
    icon: ShieldCheck,
    en: "Commissioning & Long-Term O&M",
    ar: "التشغيل التجريبي والصيانة طويلة الأجل",
    scopeEn:
      "72-hour continuous performance testing, statutory water quality verification, operator training, and 24/7 technical O&M.",
    scopeAr:
      "اختبارات الأداء المتواصل 72 ساعة، التحاليل المعملية لمطابقة المياه، تدريب الكوادر، والتشغيل والصيانة 24/7.",
  },
];

const PILLARS = [
  {
    num: "01",
    en: "Technical Precision & Integrity",
    ar: "الدقة الهندسية والنزاهة",
    body: {
      en: "Verified hydraulic designs, documented lab water-quality benchmarks, and food-grade compliance. Every assumption is traceable to field data.",
      ar: "تصاميم هيدروليكية موثّقة، ومعايير معملية للجودة، وامتثال للاشتراطات الغذائية. كل افتراض قابل للتتبع إلى بيانات الموقع.",
    },
  },
  {
    num: "02",
    en: "Single-Point Accountability",
    ar: "المسؤولية الكاملة الموحدة",
    body: {
      en: "Direct delivery without subcontracting diffusion. We own the plant performance parameters from intake to handover.",
      ar: "تنفيذ مباشر دون تفريغ للمقاولين. نتحمل مسؤولية معايير أداء المحطة من المأخذ حتى التسليم.",
    },
  },
  {
    num: "03",
    en: "Operational Reliability",
    ar: "الموثوقية التشغيلية وضمان الأداء",
    body: {
      en: "Redundant pumping arrangements, remote telemetry monitoring, and rigorous commissioning protocols keep plants at design duty.",
      ar: "تجهيزات ضخ احتياطية، ومراقبة تلمترية عن بُعد، وبروتوكولات تشغيل تجريبي صارمة للحفاظ على الأداء التصميمي.",
    },
  },
  {
    num: "04",
    en: "National Water Security",
    ar: "دعم الأمن المائي والمشروعات القومية",
    body: {
      en: "Supporting Egypt's strategic water reuse, agricultural reclamation such as Toshka, and municipal supply networks including Sinai.",
      ar: "دعم إعادة استخدام المياه الاستراتيجي، والاستصلاح الزراعي مثل مشروع توشكى، وشبكات مياه البلاد بما فيها سيناء.",
    },
  },
];

const LEADERSHIP: {
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  bio: { en: string; ar: string };
  initials: string;
  image?: string;
  imageScale?: string;
  linkedin?: string;
}[] = [
  {
    name: { en: "Ahmed Houssien", ar: "أحمد حسين" },
    title: { en: "Managing Director", ar: "العضو المنتدب" },
    bio: {
      en: "Leads overall corporate direction, contract administration, and executive partnerships with state authorities and master developers.",
      ar: "يقود الإدارة التنفيذية للشركة، وحوكمة التعاقدات والشراكات مع الهيئات الحكومية وكبرى جهات التطوير.",
    },
    initials: "AH",
    image: "/images/team/ahmed-houssien.png",
    imageScale: "scale-[1.08] translate-y-1",
    linkedin: "https://www.linkedin.com/in/ahmed-hussien-derbaz-463781143/",
  },
  {
    name: { en: "Abdelaziz Elwaily", ar: "عبد العزيز الويلي" },
    title: { en: "Head of Engineering", ar: "رئيس القطاع الهندسي" },
    bio: {
      en: "Directs hydraulic process engineering, treatment plant specifications, and technical reviews across all turnkey installations.",
      ar: "يشرف على التصميم والنمذجة الهيدروليكية، واعتماد مواصفات المحطات والمراجعات الفنية للمشروعات.",
    },
    initials: "AE",
    image: "/images/team/abdlaziz.png",
    imageScale: "scale-[1.02] translate-y-1",
    linkedin: "https://www.linkedin.com/in/abdelaziz-abdallah-elwaily-1aa922286/",
  },
  {
    name: { en: "Eslam Tarek", ar: "إسلام طارق" },
    title: { en: "Head of Mechanical Engineering", ar: "رئيس القطاع الميكانيكي" },
    bio: {
      en: "Oversees workshop steel prefabrication, high-pressure piping manifolds, and electromechanical pump skid assembly.",
      ar: "يتولى إدارة التصنيع الميكانيكي بالورش، وتجميع شاسيهات الطلمبات ومجمعات الأنابيب عالية الضغط.",
    },
    initials: "ET",
    image: "/images/team/islam-tarek.png",
    imageScale: "scale-[1.12] translate-y-2",
    linkedin: "https://www.linkedin.com/in/isllamtarekk/",
  },
  {
    name: { en: "Mahmoud Adham", ar: "محمود أدهم" },
    title: { en: "Head of Civil Engineering", ar: "رئيس القطاع المدني" },
    bio: {
      en: "Manages on-site civil works, deep lift pump stations, intake structures, and gravity utility networks across active sites.",
      ar: "يدير الأعمال المدنية والإنشائية للمحطات والبيارات العميقة وشبكات المرافق والانحدار في مواقع العمل.",
    },
    initials: "AM",
  },
];

type TimelineMilestone = {
  years: string;
  en: string;
  ar: string;
  detail: { en: string; ar: string };
  meta?: string;
  image: string;
  entries?: {
    en: string;
    ar: string;
    note?: { en: string; ar: string };
    slug?: string;
    slugLabel?: { en: string; ar: string };
  }[];
};

const TIMELINE: TimelineMilestone[] = [
  {
    years: "2006",
    en: "Foundation in Cairo & Municipal Works",
    ar: "التأسيس في القاهرة وشبكات المياه الحكومية",
    detail: {
      en: "Established as a water infrastructure contracting house in Zahraa Nasr City, Cairo, executing core potable water supply, storage tanks, and municipal pumping works.",
      ar: "تأسست الشركة كبيت مقاولات متخصص في البنية التحتية للمياه بزهراء مدينة نصر بالقاهرة، لتنفيذ مشروعات تغذية مياه الشرب وخزانات التخزين ومحطات الضخ الحكومية.",
    },
    meta: "Foundation",
    image: "/images/projects/east-delta-wastewater/cover.webp",
    entries: [
      {
        en: "Official company registration — Zahraa Nasr City, Cairo",
        ar: "التسجيل التجاري والهندسي للشركة — زهراء مدينة نصر، القاهرة",
        note: { en: "Corporate Foundation", ar: "التأسيس الرسمي" },
      },
      {
        en: "First municipal water supply and ground storage reservoirs",
        ar: "أول عقود تنفيذ خطوط تغذية وخزانات مياه شرب أرضية",
        note: { en: "Municipal Infrastructure", ar: "بنية تحتية حكومية" },
      },
    ],
  },
  {
    years: "2009",
    en: "In-House Fabrication & Assembly Workshop",
    ar: "تأسيس ورشة التصنيع الميكانيكي والتجميع الداخلي",
    detail: {
      en: "Established dedicated prefabrication facilities for carbon and stainless steel manifolds, pump-set skids, and hydraulic testing bays to eliminate third-party delays.",
      ar: "إنشاء ورشة تصنيع متخصصة لخطوط المواسير الصلب ومجمعات التوزيع وتجميع شاسيهات الطلمبات مع حوض اختبار هيدروليكي، للقضاء على تأخير الورش الخارجية.",
    },
    meta: "Integration",
    image: "/images/projects/shubra-shahab-technical-works/cover.webp",
    entries: [
      {
        en: "Dedicated steel pipework and manifold prefabrication line",
        ar: "خط تصنيع وتهيئة مواسير الصلب ومجمعات السحب والطرد",
        note: { en: "Fabrication Capability", ar: "قدرة تصنيع ذاتية" },
      },
      {
        en: "Pump-set testing bay and dynamic alignment facility",
        ar: "حوض اختبار هيدروليكي وضبط استقامة مجموعات الضخ",
        note: { en: "Quality Control", ar: "ضبط الجودة" },
      },
    ],
  },
  {
    years: "2012",
    en: "Regional Potable Pumping Infrastructure",
    ar: "محطات وشبكات ضخ مياه الشرب الإقليمية",
    detail: {
      en: "Expansion into regional potable water booster stations with in-house electromechanical installation, LV motor control centers (MCC), and surge protection systems.",
      ar: "التوسع في محطات الرفع والضخ الإقليمية بتنفيذ كهروميكانيكي داخلي متكامل، وتصنيع لوحات الجهد المنخفض وغرف الحماية من المطرقة المائية.",
    },
    meta: "Pumping Stations",
    image: "/images/projects/manshiyat-nasser-pumping-station/cover.webp",
    entries: [
      {
        en: "Awlad El-Sheikh potable water pumping station delivery",
        ar: "تنفيذ محطة ضخ مياه الشرب المتكاملة — أولاد الشيخ",
        note: { en: "Municipal Pumping", ar: "محطة ضخ مياه شرب" },
        slug: "awlad-el-sheikh-pumping",
        slugLabel: { en: "View Awlad El-Sheikh Dossier", ar: "استعراض ملف أولاد الشيخ" },
      },
      {
        en: "In-house LV switchgear and motor control panel assembly",
        ar: "تصنيع وتجميع لوحات الجهد المنخفض ومراكز التحكم بالمحركات",
        note: { en: "Electromechanical", ar: "كهروميكانيك" },
      },
    ],
  },
  {
    years: "2015",
    en: "Industrial & Cold-Chain Infrastructure",
    ar: "مرافق التبريد الصناعي وسلاسل الإمداد اللوجستية",
    detail: {
      en: "First industrial turnkey utility packages: process cooling circuits, industrial drainage networks, and high-efficiency water circulation for major cold storage complexes.",
      ar: "تنفيذ أول حزم مرافق صناعية متكاملة: دوائر تبريد العمليات، شبكات الصرف الصناعي، وأنظمة التوزيع الهيدروليكي لمجمعات التخزين اللوجستي.",
    },
    meta: "Industrial Utilities",
    image: "/images/projects/ameriya-cold-storage/cover.jpg",
    entries: [
      {
        en: "Ameriya cold-storage industrial cooling & water utility network",
        ar: "شبكات التبريد ومرافق المياه لمجمع ثلاجات العامرية اللوجستي",
        note: { en: "Industrial Logistics", ar: "مجمع صناعي لوجستي" },
        slug: "ameriya-cold-storage",
        slugLabel: { en: "View Ameriya Dossier", ar: "استعراض ملف العامرية" },
      },
      {
        en: "Process water distribution loops and balance balancing manifolds",
        ar: "دوائر توزيع مياه العمليات ومجمعات موازنة الضغوط الهيدروليكية",
        note: { en: "Turnkey Piping", ar: "شبكات متكاملة" },
      },
    ],
  },
  {
    years: "2018",
    en: "Membrane Separation & Desalination Skids",
    ar: "توطين تكنولوجيا التناضح العكسي والوحدات المدمجة",
    detail: {
      en: "Full technological transition to advanced membrane separation, containerized brackish & seawater reverse osmosis plants, and compact modular wastewater treatment skids.",
      ar: "التحول التقني الكامل نحو أنظمة الفصل الغشائي، ومحطات تحلية مياه البحر والآبار بالتناضح العكسي، ووحدات المعالجة المدمجة سريعة النشر.",
    },
    meta: "Desalination & Treatment",
    image: "/images/projects/north-coast-desalination/cover.webp",
    entries: [
      {
        en: "North Coast seawater desalination & resort purification plants",
        ar: "محطات تحلية وتنقية مياه البحر للمنتجعات بالساحل الشمالي",
        note: { en: "Seawater RO", ar: "تحلية مياه البحر" },
        slug: "north-coast-desalination",
        slugLabel: { en: "View North Coast Dossier", ar: "استعراض ملف الساحل الشمالي" },
      },
      {
        en: "Prefabricated compact industrial effluent treatment skids",
        ar: "وحدات معالجة مياه الصرف الصناعي المدمجة سابقة التجهيز",
        note: { en: "Packaged Skids", ar: "وحدات معالجة مجمعة" },
      },
    ],
  },
  {
    years: "2021",
    en: "Food-Grade RO & Sovereign Food Security",
    ar: "تحلية السادات الغذائية ومنظومات الأمن الغذائي القومي",
    detail: {
      en: "Delivery of the Sadat City RO plant for the NSPO Macaroni & Biscuit Complex under strict food-grade hygienic standards, alongside specialized industrial wastewater treatment.",
      ar: "تسليم محطة تحلية السادات لمجمع مصانع المكرونة والبسكويت بالخدمة الوطنية بمواصفات غذائية معتمدة، مع محطة معالجة الصرف الصناعي.",
    },
    meta: "Flagship Delivery",
    image: "/images/projects/sadat-city-ro/cover.webp",
    entries: [
      {
        en: "Sadat City RO Plant — NSPO Food Complex",
        ar: "محطة تحلية السادات — مجمع مصانع الخدمة الوطنية",
        note: { en: "Food-Grade Reverse Osmosis", ar: "تناضح عكسي بمواصفات غذائية" },
        slug: "sadat-city-ro",
        slugLabel: { en: "View Sadat City RO Dossier", ar: "استعراض ملف محطة السادات" },
      },
      {
        en: "Food City industrial wastewater compliance facility",
        ar: "محطة معالجة الصرف الصناعي المطابقة للاشتراطات بالمدينة الغذائية",
        note: { en: "Industrial Effluent", ar: "صرف صناعي مطابق" },
        slug: "food-city-treatment",
        slugLabel: { en: "View Food City Dossier", ar: "استعراض ملف المدينة الغذائية" },
      },
    ],
  },
  {
    years: "2022",
    en: "Mega Agricultural Reclamation Pumping",
    ar: "مشروعات الضخ الهيدروليكي الكبرى لاستصلاح الأراضي",
    detail: {
      en: "Deployment of heavy-duty desert pumping packages, high-pressure transmission headers, and mechanical filtration systems for major agricultural development programs.",
      ar: "نشر حزم ضخ صحراوية شاقة، وخطوط طرد عالية الضغط، ومنظومات ترشيح ميكانيكي لبرامج الاستصلاح الزراعي والتنمية الإقليمية.",
    },
    meta: "Heavy Infrastructure",
    image: "/images/projects/beni-suef-water-wastewater/cover.webp",
    entries: [
      {
        en: "Toshka agricultural reclamation pumping station package",
        ar: "حزمة محطات رفع مياه الري لاستصلاح أراضي توشكى",
        note: { en: "Aswan Governorate", ar: "محافظة أسوان" },
        slug: "toshka-pumping-stations",
        slugLabel: { en: "View Toshka Dossier", ar: "استعراض ملف توشكى" },
      },
      {
        en: "Beni Suef potable and wastewater infrastructure networks",
        ar: "شبكات ومحطات البنية التحتية للمياه والصرف ببني سويف",
        note: { en: "Upper Egypt Infrastructure", ar: "بنية تحتية بصعيد مصر" },
        slug: "beni-suef-water-wastewater",
        slugLabel: { en: "View Beni Suef Dossier", ar: "استعراض ملف بني سويف" },
      },
    ],
  },
  {
    years: "2023",
    en: "Toshka — 22 Pumping Stations & Long-Term O&M",
    ar: "توشكى — منظومة 22 محطة رفع وتشغيل وصيانة مستمرة",
    detail: {
      en: "Full turnkey execution of 22 irrigation pumping stations across Toshka's desert footprint, followed by an ongoing long-term operations and maintenance mandate ensuring 100% duty availability.",
      ar: "التنفيذ الشامل لـ 22 محطة رفع لمياه الري على امتداد مشروع توشكى القومي، يعقبه تكليف تشغيل وصيانة شامل لضمان جاهزية المنظومة على مدار الساعة.",
    },
    meta: "National Programme",
    image: "/images/projects/toshka-farm-potable-water-plant/cover.webp",
    entries: [
      {
        en: "22 Irrigation pumping stations built & commissioned under 1 contract",
        ar: "22 محطة رفع ري منجزة ومُشغَّلة بعقد واحد ومسؤولية شاملة",
        note: { en: "100% In-House Delivery", ar: "تنفيذ ذاتي 100%" },
        slug: "toshka-pumping-stations",
        slugLabel: { en: "View Toshka 22 Stations Dossier", ar: "استعراض ملف منظومة توشكى" },
      },
      {
        en: "Toshka farm potable water treatment and mineralization plant",
        ar: "محطة تنقية ومعالجة مياه الشرب لمزرعة توشكى",
        note: { en: "Potable Purification", ar: "مياه شرب نقية" },
        slug: "toshka-farm-potable-water-plant",
        slugLabel: { en: "View Toshka Farm Dossier", ar: "استعراض ملف محطة المزرعة" },
      },
    ],
  },
  {
    years: "2024",
    en: "Strategic Water Transmission & Farm Networks",
    ar: "خطوط نقل المياه الاستراتيجية ومجمعات الإنتاج الحيواني",
    detail: {
      en: "Laying high-pressure strategic water transmission pipelines in North Sinai from Sheikh Zuweid to New Salam City, alongside wet utility networks for massive national livestock complexes.",
      ar: "مد خطوط نقل المياه الاستراتيجية عالية الضغط بشمال سيناء من الشيخ زويد لمدينة السلام، بجانب مرافق وشبكات مجمعات الإنتاج الحيواني القومية.",
    },
    meta: "Water Security",
    image: "/images/projects/salam-city-water-pipeline/cover.webp",
    entries: [
      {
        en: "New Salam City high-pressure water transmission line (Sheikh Zuweid)",
        ar: "خط نقل المياه الاستراتيجي عالي الضغط لمدينة السلام من الشيخ زويد",
        note: { en: "Strategic Pipeline", ar: "خط ناقل استراتيجي" },
        slug: "salam-city-water-pipeline",
        slugLabel: { en: "View Water Pipeline Dossier", ar: "استعراض ملف خط المياه" },
      },
      {
        en: "New Salam City 2,500-head cattle farm integrated wet utilities",
        ar: "مرافق وشبكات مجمع الإنتاج الحيواني سعة 2,500 رأس بمدينة السلام",
        note: { en: "NSPO Agriculture", ar: "الخدمة الوطنية" },
        slug: "salam-city-cattle-farm-networks",
        slugLabel: { en: "View Cattle Farm Dossier", ar: "استعراض ملف مجمع الإنتاج" },
      },
    ],
  },
  {
    years: "2025–2026",
    en: "Sovereign Infrastructure & Strategic Development",
    ar: "المشروعات السيادية والقومية والتنمية الاستراتيجية",
    detail: {
      en: "Delivering sovereign civic landmarks, regional gravity wastewater trunk lines, integrated Bedouin housing utilities, and landfill environmental protection under Engineering Authority supervision.",
      ar: "تنفيذ الصروح المعمارية والخدمية السيادية، وشبكات الانحدار الرئيسية للصرف الصحي، ومرافق البيوت البدوية برفح، وحماية البيئة بالمدافن الصحية بإشراف الهيئة الهندسية.",
    },
    meta: "Sovereign Mandates",
    image: "/images/projects/qabs-min-nour-mosque/cover.webp",
    entries: [
      {
        en: "Arish city comprehensive water supply & utility networks",
        ar: "شبكات ومرافق تغذية مياه الشرب الشاملة بمدينة العريش",
        note: { en: "North Sinai Infrastructure", ar: "بنية تحتية بشمال سيناء" },
        slug: "arish-water-supply",
        slugLabel: { en: "View Arish Dossier", ar: "استعراض ملف العريش" },
      },
      {
        en: "Qabs Min Nour Grand Mosque & Community Complex — New Capital R3",
        ar: "مسجد قبس من نور الجامع والمركز التنموي — العاصمة الإدارية R3",
        note: { en: "Turnkey Contracting", ar: "مقاولات عامة متكاملة" },
        slug: "qabs-min-nour-mosque",
        slugLabel: { en: "View Mosque Dossier", ar: "استعراض ملف المسجد" },
      },
      {
        en: "Al-Salam City gravity sewer & storm trunk network",
        ar: "شبكة انحدار الصرف الصحي وصرف الأمطار بمدينة السلام",
        note: { en: "Gravity Sewer Mains", ar: "خطوط انحدار ومطابق" },
        slug: "sisi-city-wastewater",
        slugLabel: { en: "View Salam City Dossier", ar: "استعراض ملف مدينة السلام" },
      },
      {
        en: "Rafah Bedouin housing Zone 1 integrated utilities (100+ Units)",
        ar: "إنشاءات ومرافق البيوت البدوية برفح المرحلة الأولى (100+ بيت)",
        note: { en: "Sinai Development", ar: "تنمية سيناء" },
        slug: "rafah-bedouin-housing",
        slugLabel: { en: "View Rafah Dossier", ar: "استعراض ملف بيوت رفح" },
      },
    ],
  },
];

function AboutPage() {
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      {/* 1. Identity & Institutional Hero Header */}
      <section
        className="iw-section-dark relative overflow-hidden border-b"
        style={{ borderColor: "var(--iw-dark-border)" }}
      >
        {/* Subtle engineering grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20">
          <p
            className="label-mono font-semibold uppercase tracking-wider"
            style={{ color: "var(--iw-dark-accent)" }}
          >
            {t("Institutional Profile", "الملف التعريفي المؤسسي")}
          </p>

          <h1 className="display-xl mt-6 max-w-5xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold tracking-tight">
            {isAr ? (
              <>
                إنفيوركس
                <span
                  className="mt-3 block text-[clamp(1.25rem,2.5vw,2.25rem)] font-normal tracking-normal"
                  style={{ color: "var(--iw-dark-text-muted)" }}
                >
                  الشركة الدولية للأعمال الهندسية
                </span>
                <span
                  className="mt-2 block text-sm font-normal tracking-wide text-slate-400"
                  dir="ltr"
                >
                  Infeworks · International for Engineering Works
                </span>
              </>
            ) : (
              <>
                Infeworks
                <span
                  className="mt-3 block text-[clamp(1.25rem,2.5vw,2.25rem)] font-normal tracking-normal normal-case"
                  style={{ color: "var(--iw-dark-text-muted)" }}
                >
                  International for Engineering Works
                </span>
                <span
                  className="mt-2 block text-sm font-normal tracking-normal text-slate-400"
                  style={{ fontFamily: "var(--font-arabic)" }}
                  dir="rtl"
                >
                  الشركة الدولية للأعمال الهندسية
                </span>
              </>
            )}
          </h1>

          {/* Institutional Trust & Credential Ribbon */}
          <div
            className="mt-12 grid grid-cols-2 gap-4 border-t pt-8 sm:grid-cols-4 sm:gap-6"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <div
              className="flex flex-col border-s-2 ps-4"
              style={{ borderColor: "var(--iw-dark-accent)" }}
            >
              <span className="display-md text-2xl font-bold md:text-3xl text-white">50+</span>
              <span
                className="label-mono mt-1 text-xs"
                style={{ color: "var(--iw-dark-text-muted)" }}
              >
                {t("Delivered Projects", "مشروعاً منجزاً")}
              </span>
            </div>
            <div
              className="flex flex-col border-s-2 ps-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <span className="display-md text-2xl font-bold md:text-3xl text-white">20+</span>
              <span
                className="label-mono mt-1 text-xs"
                style={{ color: "var(--iw-dark-text-muted)" }}
              >
                {t("Years of Integration", "عاماً من التكامل الهندسي")}
              </span>
            </div>
            <div
              className="flex flex-col border-s-2 ps-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <span className="display-md text-2xl font-bold md:text-3xl text-white">6</span>
              <span
                className="label-mono mt-1 text-xs"
                style={{ color: "var(--iw-dark-text-muted)" }}
              >
                {t("Specialized Sectors", "قطاعات هندسية متخصصة")}
              </span>
            </div>
            <div
              className="flex flex-col border-s-2 ps-4"
              style={{ borderColor: "var(--iw-dark-accent)" }}
            >
              <span className="display-md text-2xl font-bold md:text-3xl text-[var(--iw-dark-accent)]">
                100%
              </span>
              <span
                className="label-mono mt-1 text-xs"
                style={{ color: "var(--iw-dark-text-muted)" }}
              >
                {t("Single-Contract Delivery", "مسؤولية تعاقدية موحدة")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Business Statement */}
      <section className="iw-section-light border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <div>
              <p className="label-mono font-semibold" style={{ color: "var(--iw-accent)" }}>
                {t("Core Business", "نشاط الشركة")}
              </p>
              <h2 className="display-md mt-2 text-2xl font-bold md:text-3xl">
                {t("Turnkey Engineering & Contracting", "المقاولات الهندسية المتكاملة")}
              </h2>
            </div>
            <p className="body-reading max-w-3xl text-lg leading-relaxed text-[var(--iw-text-primary)]">
              {t(
                "Infeworks designs, supplies, fabricates, installs, tests, and operates water and wastewater infrastructure for state, industrial, and agricultural clients in Egypt. Every package is delivered under a single accountable contract — covering process hydraulic design, in-house mechanical prefabrication, electromechanical installations, SCADA automation, statutory testing, and long-term operations & maintenance.",
                "تقوم إنفيوركس بتصميم وتوريد وتصنيع وتنفيذ واختبار وتشغيل منشآت المياه والصرف الصحي لعملاء القطاع الحكومي والسيادي والصناعي والزراعي في مصر. تُنفَّذ الأعمال تحت عقد واحد مسؤول يغطي التصميم الهيدروليكي، والتصنيع الميكانيكي الداخلي، والأعمال الكهروميكانيكية، وأنظمة التحكم والسكادا، والتشغيل التجريبي ثم التشغيل والصيانة طويلة الأجل.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section
        className="iw-section-surface border-b bg-[var(--iw-bg)]"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <Reveal className="border-t border-[var(--iw-border)] pt-8">
            <p className="label-mono font-semibold uppercase text-[var(--iw-accent)]">
              {t("Our Guiding Purpose", "الميثاق والغاية الهندسية")}
            </p>
            <h2 className="display-lg mt-3 max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-bold text-[var(--iw-text-primary)]">
              {t("Why Infeworks Exists", "لماذا وُجدت إنفيوركس")}
            </h2>
            <p className="body-reading mt-3 max-w-3xl text-base text-[var(--iw-text-secondary)]">
              {t(
                "In an industry often fragmented by diluted accountability and disputed handovers, we exist to deliver enduring water security with complete single-contract ownership.",
                "في قطاع مقاولات يعاني غالباً من تشتت المسؤوليات وتبادل الأعذار، وُجدت إنفيوركس لتتحمل المسؤولية الهندسية الكاملة وتبني أصولاً مائية تدوم لأجيال.",
              )}
            </p>
          </Reveal>

          {/* Dual-Pillar Manifesto Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* The Mission */}
            <Reveal
              delay={60}
              className="flex flex-col justify-between rounded-xl border bg-[var(--iw-surface)] p-8 md:p-12 shadow-xs transition-all duration-300 hover:border-[var(--iw-accent)] hover:shadow-md"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <div>
                <div
                  className="flex items-center justify-between pb-6 border-b"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-sm border bg-[var(--iw-bg)]"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <Target className="h-5 w-5" style={{ color: "var(--iw-accent)" }} />
                    </div>
                    <span
                      className="label-mono font-bold uppercase tracking-widest text-xs"
                      style={{ color: "var(--iw-accent)" }}
                    >
                      {t("Our Mission", "رسالتنا")}
                    </span>
                  </div>
                  <span className="label-mono text-[11px] text-[var(--iw-text-muted)] uppercase tracking-wider">
                    {t("Single Accountability", "مسؤولية شاملة")}
                  </span>
                </div>

                <h3 className="display-md mt-6 text-xl font-bold md:text-2xl text-[var(--iw-text-primary)] leading-snug">
                  {t(
                    "Engineering water infrastructure with uncompromised integrity and single-point accountability.",
                    "أن نتحمل مسؤولية كل قطرة مياه، ونبني بنية تحتية هندسية تعيش لأجيال.",
                  )}
                </h3>

                <p className="body-reading mt-5 text-base leading-relaxed text-[var(--iw-text-secondary)]">
                  {t(
                    "We do not merely assemble equipment or pour concrete; we build the lifelines of communities and strategic national developments across Egypt. Our mission is to take unbroken, single-point accountability for critical water and utility assets — bridging advanced hydraulic engineering with in-house prefabrication and relentless site precision, ensuring every facility operates at peak design duty from day one.",
                    "رسالتنا في إنفيوركس تتجاوز مجرد توريد مضخات أو صب خرسانات؛ نحن نبني شرايين الحياة للمجتمعات والمشروعات الاستراتيجية في مصر. نتحمل مسؤولية المحطة كاملة من النمذجة الهيدروليكية والتصنيع الذاتي وحتى التشغيل المستمر — لنضمن أن كل أصل مائي نسلمه يعمل بأعلى كفاءة تصميمية وتدفق فعلي، بدون أعذار وبدون تشتيت للمسؤولية.",
                  )}
                </p>
              </div>

              <div
                className="mt-8 pt-6 border-t flex items-center gap-3 text-xs font-semibold text-[var(--iw-accent)]"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)]" />
                <span className="label-mono tracking-wider uppercase">
                  {t(
                    "Measured by verified flow, not promises",
                    "معيارنا قياس التدفق الفعلي لا الوعود",
                  )}
                </span>
              </div>
            </Reveal>

            {/* The Vision */}
            <Reveal
              delay={120}
              className="flex flex-col justify-between rounded-xl border bg-[var(--iw-surface)] p-8 md:p-12 shadow-xs transition-all duration-300 hover:border-[var(--iw-accent)] hover:shadow-md"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <div>
                <div
                  className="flex items-center justify-between pb-6 border-b"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-sm border bg-[var(--iw-bg)]"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <Eye className="h-5 w-5" style={{ color: "var(--iw-accent)" }} />
                    </div>
                    <span
                      className="label-mono font-bold uppercase tracking-widest text-xs"
                      style={{ color: "var(--iw-accent)" }}
                    >
                      {t("Our Vision", "رؤيتنا")}
                    </span>
                  </div>
                  <span className="label-mono text-[11px] text-[var(--iw-text-muted)] uppercase tracking-wider">
                    {t("National Benchmark", "المرجع الوطني")}
                  </span>
                </div>

                <h3 className="display-md mt-6 text-xl font-bold md:text-2xl text-[var(--iw-text-primary)] leading-snug">
                  {t(
                    "To set Egypt's benchmark for mission-critical water & infrastructure delivery.",
                    "أن نكون المعيار الهندسي الأول للبنية التحتية والمشروعات المائية المعقدة في مصر والمنطقة.",
                  )}
                </h3>

                <p className="body-reading mt-5 text-base leading-relaxed text-[var(--iw-text-secondary)]">
                  {t(
                    "To stand as the definitive partner of choice for state authorities and master developers when projects are complex, high-stakes, and unforgiving. We envision a future where every plant we commission proves that integrated domestic engineering and single-contract delivery form the strongest foundation for regional water security.",
                    "رؤيتنا أن تصبح إنفيوركس الشريك المرجعي الموثوق للدولة وكبرى الكيانات عندما يكون المشروع حرجاً ومعقداً ولا يحتمل الخطأ. نبرهن في كل محطة ننجزها أن التكامل الهندسي والمسؤولية الشاملة قادران على بناء مستقبل مائي آمن ومستدام للأجيال القادمة.",
                  )}
                </p>
              </div>

              <div
                className="mt-8 pt-6 border-t flex items-center gap-3 text-xs font-semibold text-[var(--iw-accent)]"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)]" />
                <span className="label-mono tracking-wider uppercase">
                  {t(
                    "Every delivered plant is evidence for the next",
                    "كل محطة نسلّمها برهان على نزاهتنا",
                  )}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3.5. Chairman & Founder's Address */}
      <section
        className="iw-section-dark border-b relative overflow-hidden bg-[#070e1b]"
        style={{ borderColor: "var(--iw-dark-border)" }}
      >
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[var(--iw-dark-accent)]/5 blur-3xl pointer-events-none" />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24 relative z-10">
          <Reveal className="mb-12 border-t border-[var(--iw-dark-border)] pt-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[var(--iw-dark-accent)]" />
              <p className="label-mono font-semibold uppercase text-xs tracking-widest text-[var(--iw-dark-accent)]">
                {t("Chairman's Address", "كلمة رئيس مجلس الإدارة")}
              </p>
            </div>
            <h2 className="display-lg mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-white max-w-4xl">
              {t(
                '"In water infrastructure, there is no room for excuses. We never leave a site until the water flows exactly as promised."',
                "«المياه لا تقبل الأعذار؛ لذلك لم نترك موقعاً قط إلا والماء يجري فيه كما وُعد.»",
              )}
            </h2>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">
            {/* Portrait of Mr. Houssien Derbaze */}
            <div className="lg:col-span-5">
              <Reveal delay={60} className="relative group">
                <div
                  className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-xl border bg-slate-900 shadow-2xl transition-all duration-500 group-hover:border-[var(--iw-dark-accent)]"
                  style={{ borderColor: "var(--iw-dark-border)" }}
                >
                  <img
                    src="/images/about/houssien-derbaze.png"
                    alt={t(
                      "Houssien Derbaze — Founder & Chairman",
                      "حسين درباز — المؤسس ورئيس مجلس الإدارة",
                    )}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg backdrop-blur-md bg-[#070e1b]/85 border border-white/10">
                    <h3 className="display-md text-xl font-bold text-white">
                      {t("Houssien Derbaze", "حسين درباز")}
                    </h3>
                    <p className="label-mono text-xs text-[var(--iw-dark-accent)] mt-1 uppercase tracking-wider font-semibold">
                      {t("Founder & Chairman", "المؤسس ورئيس مجلس الإدارة")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Letter Content & Signature */}
            <div className="lg:col-span-7">
              <Reveal delay={120} className="relative flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6 text-[var(--iw-dark-accent)] opacity-80">
                  <Quote className="h-8 w-8" />
                  <span className="label-mono text-xs tracking-widest uppercase text-white/50">
                    {t("Leadership Philosophy · Founded 2006", "فلسفة القيادة · تأسست 2006")}
                  </span>
                </div>

                <div className="body-reading space-y-5 text-base md:text-lg leading-relaxed text-slate-300">
                  <p>
                    {t(
                      "In this industry, it is remarkably easy for contractors to pass the blame: the civil builder points to the pump supplier, the electrician blames the consultant, and the client is left waiting with a dry pipeline.",
                      "في عالم مقاولات البنية التحتية، من السهل جداً أن يلقي الجميع باللوم على غيرهم: المقاول المدني يلوم مورد الطلمبات، والكهربائي يلوم الاستشاري، وفي النهاية يتعطل المشروع ويضيع وقت العميل.",
                    )}
                  </p>
                  <p>
                    {t(
                      "When I founded Infeworks in 2006, my driving purpose was to put an end to that cycle. I made a commitment that still guides every engineer on our team today: we do not merely ship equipment or pour foundations. We take complete, personal ownership of the entire facility — from the first hydraulic calculation in our office, to prefabricating pipe manifolds in our workshops, right down to the moment clean water flows from the outlet.",
                      "عندما أسست إنفيوركس عام 2006، كان دافعي الوحيد هو إنهاء هذا التشتت. قطعت عهداً على نفسي وعلى كل مهندس معنا: نحن لسنا مجرد شركة تشحن معدات أو تصب خرسانات؛ نحن نتحمل مسؤولية المحطة كاملة كأنها ملكنا الشخصي. من أول حساب هيدروليكي على الورق، إلى تصنيع الوصلات في ورشنا، وحتى اللحظة التي يفتح فيها العميل المحبس وتتدفق المياه النقية.",
                    )}
                  </p>
                  <p>
                    {t(
                      "Water engineering is unforgiving. Behind every pump station in Toshka are crops waiting to grow, and behind every network in Sinai are communities relying on safe drinking water. That sense of duty is why consultants and sovereign authorities trust our handshake — and it is why we stand behind every single facility we build.",
                      "المياه ليست قطاعاً يحتمل الخطأ أو المماطلة؛ فخلف كل محطة رفع ننفذها في توشكى مزارع تنتظر الري، وخلف كل شبكة مياه في سيناء أهالٍ ينتظرون كوب ماء نظيف. هذا الإحساس بالأمانة هو ما يجعل استشاريي مصر وجهات الإسناد يثقون بنا، وهو السبب الذي يجعلنا نضع اسمنا وسمعتنا بكل فخر على كل مشروع نسلمه.",
                    )}
                  </p>
                </div>

                {/* Signature Block */}
                <div
                  className="mt-8 pt-6 border-t flex items-center justify-between flex-wrap gap-4"
                  style={{ borderColor: "var(--iw-dark-border)" }}
                >
                  <div>
                    <span className="display-md text-lg font-bold text-white block">
                      {t("Houssien Derbaze", "حسين درباز")}
                    </span>
                    <span className="label-mono text-xs text-white/60 mt-0.5 block">
                      {t("Founder & Chairman · Infeworks", "المؤسس ورئيس مجلس الإدارة · إنفيوركس")}
                    </span>
                  </div>

                  <div className="label-mono text-xs text-[var(--iw-dark-accent)] border border-[var(--iw-dark-accent)]/30 rounded-xs px-3 py-1 bg-white/5">
                    {t("Est. 2006 · Cairo, Egypt", "تأسست 2006 · القاهرة، مصر")}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Vertically Integrated Delivery Model */}
      <section
        className="iw-section-dark border-b"
        style={{ borderColor: "var(--iw-dark-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="mb-12 border-t pt-8" style={{ borderColor: "var(--iw-dark-border)" }}>
            <p
              className="label-mono font-semibold uppercase"
              style={{ color: "var(--iw-dark-accent)" }}
            >
              {t("Lifecycle Execution", "دورة التنفيذ المتكاملة")}
            </p>
            <h2 className="display-lg mt-3 max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-bold">
              {t("The Vertically Integrated Model", "النموذج المتكامل من البداية للنهاية")}
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p
                className="body-reading text-lg leading-relaxed"
                style={{ color: "var(--iw-dark-text-muted)" }}
              >
                {t(
                  "Single-contract accountability across process design, equipment procurement, workshop fabrication, electromechanical installation, SCADA telemetry, and long-term O&M. One partner holds every milestone — from hydraulic calculation sheets to final handover certificate.",
                  "مسؤولية موحدة بعقد واحد تغطي التصميم العملياتي، وتوريد المعدات، والتصنيع بالورش الداخلية، والأعمال الكهروميكانيكية، وأنظمة التحكم والسكادا، والتشغيل والصيانة طويلة الأجل. شريك واحد يتحمل كل مرحلة — من الحسابات الهيدروليكية حتى محضر الاستلام النهائي.",
                )}
              </p>
              <div
                className="body-reading mt-8 border-s-2 ps-6 text-base leading-relaxed"
                style={{
                  borderColor: "var(--iw-dark-accent)",
                  color: "var(--iw-dark-text)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  padding: "1.25rem",
                }}
              >
                {t(
                  "Unlike fragmented multi-contractor delivery, Infeworks eliminates the interface risk. Process, mechanical, electrical, and control disciplines are engineered and built by the same accountable team, ensuring performance guarantees are enforceable and plant commissioning is predictable.",
                  "على عكس التنفيذ المقسَّم بين عدة مقاولين، تلغي إنفيوركس مخاطر تعارض الواجهات. يتم تصميم وتنفيذ الأعمال العملياتية والميكانيكية والكهربائية وأنظمة التحكم من قِبل نفس الفريق المسؤول، مما يجعل ضمانات الأداء ملزمة ومؤكدة والتشغيل التجريبي دقيقاً وموثوقاً.",
                )}
              </div>
            </div>

            <div className="divide-y" style={{ borderColor: "var(--iw-dark-border)" }}>
              {VERTICAL_CAPABILITIES.map((cap, idx) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={cap.en}
                    className="group flex items-start gap-4 py-6 transition-colors hover:bg-white/[0.02] px-2 rounded-sm"
                  >
                    <span
                      className="label-mono pt-1 text-sm font-bold"
                      style={{ color: "var(--iw-dark-accent)", minWidth: "2rem" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <IconComponent
                          className="h-4 w-4"
                          style={{ color: "var(--iw-dark-accent)" }}
                        />
                        <h3 className="display-md text-lg font-bold md:text-xl text-white">
                          {isAr ? cap.ar : cap.en}
                        </h3>
                      </div>
                      <p
                        className="body-reading mt-2 text-sm leading-relaxed"
                        style={{ color: "var(--iw-dark-text-muted)" }}
                      >
                        {isAr ? cap.scopeAr : cap.scopeEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4 Strategic Engineering Pillars */}
      <section className="iw-section-surface border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="mb-12 border-t pt-8" style={{ borderColor: "var(--iw-border)" }}>
            <p className="label-mono font-semibold uppercase" style={{ color: "var(--iw-accent)" }}>
              {t("Strategic Pillars", "المبادئ الاستراتيجية")}
            </p>
            <h2 className="display-lg mt-3 text-[clamp(1.75rem,4vw,3rem)] font-bold">
              {t("What Defines Our Engineering", "ما يميز هندستنا")}
            </h2>
          </div>

          <div className="grid gap-px bg-[var(--iw-border)] md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.en}
                className="bg-[var(--iw-surface)] p-8 transition-all duration-300 hover:bg-[var(--iw-surface-alt)] md:p-10"
              >
                <span
                  className="label-mono block text-sm font-bold"
                  style={{ color: "var(--iw-accent)" }}
                >
                  {pillar.num}
                </span>
                <h3 className="display-md mt-5 min-h-[3rem] text-xl font-bold md:text-2xl text-[var(--iw-text-primary)]">
                  {isAr ? pillar.ar : pillar.en}
                </h3>
                <p className="body-reading mt-4 text-sm md:text-base leading-relaxed text-[var(--iw-text-secondary)]">
                  {isAr ? pillar.body.ar : pillar.body.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. Core Management Team & Engineering Directorate */}
      <section
        className="iw-section-light border-t bg-[var(--iw-bg)]"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <Reveal className="mb-12">
            <p className="label-mono font-semibold uppercase" style={{ color: "var(--iw-accent)" }}>
              {t("Core Operations Management", "فريق الإدارة التنفيذية")}
            </p>
            <h2 className="display-lg mt-3 text-[clamp(1.75rem,4vw,3rem)] font-bold text-[var(--iw-text-primary)]">
              {t("The Team Behind the Engineering", "القيادات القائمة على التنفيذ الهندسي")}
            </h2>
            <p className="body-reading mt-3 max-w-2xl text-base text-[var(--iw-text-secondary)]">
              {t(
                "Building on two decades of institutional legacy, our dynamic management team brings modern engineering practices, technical precision, and on-site delivery to our infrastructure projects.",
                "بالبناء على إرث مؤسسي يمتد لعقدين، يقود فريقنا الإداري الشاب عمليات التنفيذ الميداني برؤية هندسية حديثة ودقة فنية عالية في قطاعات البنية التحتية والمياه.",
              )}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name.en}
                className="group relative flex flex-col justify-between rounded-lg border bg-[var(--iw-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--iw-accent)] hover:shadow-xl"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <div>
                  {/* Portrait / Avatar Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[#070e1a] border border-white/10 mb-6 flex flex-col items-center justify-end text-center transition-all duration-500 group-hover:border-[var(--iw-accent)] group-hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.5)]">
                    {/* Engineering grid backdrop */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                      aria-hidden="true"
                    />
                    {/* Studio spotlight glow */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 30%, rgba(0, 200, 213, 0.16) 0%, rgba(176, 94, 42, 0.10) 50%, transparent 80%)",
                      }}
                      aria-hidden="true"
                    />

                    {leader.image ? (
                      <>
                        <img
                          src={leader.image}
                          alt={isAr ? leader.name.ar : leader.name.en}
                          loading="lazy"
                          decoding="async"
                          className={`relative z-10 h-full w-full object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105 ${
                            leader.imageScale ?? ""
                          }`}
                        />
                        {/* Seamless bottom fade */}
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(7, 14, 26, 0.95) 0%, rgba(7, 14, 26, 0.4) 60%, transparent 100%)",
                          }}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--iw-dark-accent)] bg-white/5 text-2xl font-bold tracking-widest text-[var(--iw-dark-accent)] shadow-[0_0_24px_rgba(0,200,213,0.18)] transition-transform duration-500 group-hover:scale-105">
                          {leader.initials}
                        </div>
                        <span className="label-mono mt-4 text-[10px] font-medium text-white/50 uppercase tracking-widest">
                          Infeworks Directorate
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name & Title */}
                  <h3 className="display-md text-lg font-bold text-[var(--iw-text-primary)] transition-colors group-hover:text-[var(--iw-accent)]">
                    {isAr ? leader.name.ar : leader.name.en}
                  </h3>
                  <div className="mt-1.5">
                    <span
                      className="label-mono inline-block rounded-xs border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--iw-accent)]"
                      style={{
                        borderColor: "rgba(163, 76, 26, 0.25)",
                        backgroundColor: "rgba(163, 76, 26, 0.05)",
                      }}
                    >
                      {isAr ? leader.title.ar : leader.title.en}
                    </span>
                  </div>

                  {/* Real, Grounded Bio */}
                  <p className="body-reading mt-4 text-xs leading-relaxed text-[var(--iw-text-secondary)]">
                    {isAr ? leader.bio.ar : leader.bio.en}
                  </p>
                </div>

                {/* Footer / LinkedIn */}
                <div
                  className="mt-6 border-t pt-4 flex items-center justify-between"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn Profile - ${isAr ? leader.name.ar : leader.name.en}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--iw-text-muted)] transition-colors hover:text-[#0a66c2]"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span className="label-mono text-[11px]">LinkedIn</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--iw-text-muted)] opacity-60">
                      <Linkedin className="h-3.5 w-3.5" />
                      <span className="label-mono text-[11px]">Infeworks</span>
                    </span>
                  )}
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)] opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Company History Since 2006 (20-Year Evolution) */}
      <section
        className="iw-section-dark border-b"
        style={{ borderColor: "var(--iw-dark-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-28">
          <Reveal className="mb-14 border-t border-[var(--iw-dark-border)] pt-8">
            <p
              className="label-mono font-semibold uppercase"
              style={{ color: "var(--iw-dark-accent)" }}
            >
              {t("Two Decades of Excellence (2006–2026)", "عقدان من التميز الهندسي (2006–2026)")}
            </p>
            <h2 className="display-lg mt-3 text-[clamp(1.75rem,4vw,3rem)] font-bold text-white">
              {t(
                "Chronicle of Integration & Major Infrastructure Deliveries",
                "سجل التوسع والتسليمات الكبرى للبنية التحتية",
              )}
            </h2>
            <p
              className="body-reading mt-4 max-w-3xl text-base md:text-lg"
              style={{ color: "var(--iw-dark-text-muted)" }}
            >
              {t(
                "Explore the 10 milestone stations marking our evolution from municipal water contractor to sovereign infrastructure partner across Egypt.",
                "استعرض المحطات الـ 10 التي وثقت تطور الشركة من مقاول شبكات مياه إلى شريك في المشروعات القومية والسيادية في مصر.",
              )}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <MilestoneTrack
              isAr={isAr}
              locale={locale}
              items={TIMELINE.map((item) => ({
                years: item.years,
                title: isAr ? item.ar : item.en,
                detail: isAr ? item.detail.ar : item.detail.en,
                meta: item.meta ? t(item.meta, item.meta) : undefined,
                image: item.image,
                entries: item.entries?.map((e) => ({
                  label: isAr ? e.ar : e.en,
                  note: e.note ? (isAr ? e.note.ar : e.note.en) : undefined,
                  slug: e.slug,
                  slugLabel: e.slugLabel ? (isAr ? e.slugLabel.ar : e.slugLabel.en) : undefined,
                })),
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* 7. Quality, Health & Safety Governance */}
      <section className="iw-section-light border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <div>
              <p
                className="label-mono font-semibold uppercase"
                style={{ color: "var(--iw-accent)" }}
              >
                {t("Engineering Standards", "المعايير الهندسية")}
              </p>
              <h2 className="display-lg mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold">
                {t("Quality, Health & Safety Governance", "حوكمة الجودة والسلامة والبيئة")}
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="body-reading text-lg leading-relaxed text-[var(--iw-text-primary)]">
                {t(
                  "Infeworks strictly adheres to Egyptian Engineering Codes, ISO management systems, and stringent hygienic and hydraulic safeguards. Every project is handed over with traceable hydrostatic test certificates, calibrated water quality analyses, and comprehensive operator training manuals.",
                  "تلتزم إنفيوركس بصرامة بالكود المصري للهندسة الصحية، وأنظمة إدارة الجودة والسلامة الدولية (ISO)، وحماية الأنظمة الهيدروليكية من الصدمات. تُسلَّم كل محطة بشهادات اختبارات الضغط الهيدروستاتيكي، والتحاليل المعملية المعتمدة، وأدلة تشغيل شاملة.",
                )}
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    icon: Award,
                    en: "ISO 9001, 14001 & 45001 Aligned",
                    ar: "معايير الجودة والبيئة والسلامة المهنية ISO",
                    descEn:
                      "Integrated management system ensuring traceable quality and on-site workforce safety.",
                    descAr:
                      "نظام إدارة متكامل يضمن ضبط الجودة الصارم وسلامة الكوادر التنفيذية في المواقع.",
                  },
                  {
                    icon: Activity,
                    en: "Hydraulic Surge & Transient Protection",
                    ar: "الحماية الهيدروليكية من المطرقة المائية",
                    descEn:
                      "Engineered air vessels, kinetic air valves, and transient simulation compliance.",
                    descAr:
                      "خزانات هواء متخصصة، ومحابس هواء ديناميكية، ونمذجة دقيقة لتفادي الصدمات.",
                  },
                  {
                    icon: ShieldCheck,
                    en: "Food-Grade & Potable Membrane Hygiene",
                    ar: "مطابقة الاشتراطات الصحية لمياه الشرب والأغذية",
                    descEn:
                      "NSF/ANSI compliance for potable membrane arrays and food-production contact water.",
                    descAr:
                      "مطابقة معايير NSF/ANSI لمنظومات الأغشية ومياه الصناعات الغذائية الحساسة.",
                  },
                  {
                    icon: CheckCircle2,
                    en: "Documented Handover & 72-Hour Testing",
                    ar: "التشغيل التجريبي 72 ساعة والتسليم المنظم",
                    descEn:
                      "Continuous load testing, water laboratory certification, and formal client sign-off.",
                    descAr:
                      "اختبارات تشغيل متواصلة، وشهادات فحص معملي معتمدة، ومحاضر استلام موثقة.",
                  },
                ].map((g) => {
                  const IconComp = g.icon;
                  return (
                    <div
                      key={g.en}
                      className="border p-6 transition-all duration-200 hover:border-[var(--iw-accent)]"
                      style={{
                        borderColor: "var(--iw-border)",
                        backgroundColor: "var(--iw-surface)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp
                          className="h-5 w-5 shrink-0"
                          style={{ color: "var(--iw-accent)" }}
                        />
                        <h4 className="font-bold text-base text-[var(--iw-text-primary)]">
                          {isAr ? g.ar : g.en}
                        </h4>
                      </div>
                      <p className="body-reading mt-3 text-sm leading-relaxed text-[var(--iw-text-secondary)]">
                        {isAr ? g.descAr : g.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Executive Closing Engagement Banner (CTA) */}
      <section className="iw-section-dark relative overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div
            className="relative rounded-sm border p-8 md:p-14 text-center flex flex-col items-center"
            style={{
              borderColor: "rgba(0, 200, 213, 0.3)",
              backgroundColor: "rgba(7, 14, 26, 0.85)",
            }}
          >
            {/* Subtle engineering cue */}
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: "rgba(0, 200, 213, 0.4)",
                color: "var(--iw-dark-accent)",
                backgroundColor: "rgba(0, 200, 213, 0.05)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("Corporate Commitment", "الالتزام المؤسسي")}
            </div>

            <h2 className="display-lg mt-6 max-w-3xl text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold text-white">
              {t(
                "One partner · Full scope · Delivered as agreed.",
                "شريك واحد · مسؤولية شاملة · تسليم بالمعايير المتفق عليها.",
              )}
            </h2>

            <p
              className="body-reading mt-4 max-w-2xl text-base md:text-lg leading-relaxed"
              style={{ color: "var(--iw-dark-text-muted)" }}
            >
              {t(
                "Whether you are planning a municipal utility network, a mega agricultural pumping scheme, or an industrial RO plant, our engineering team is ready to review your project brief.",
                "سواء كنت تخطط لشبكة مرافق كبرى، أو منظومة ضخ زراعي قومية، أو محطة تحلية متخصصة، فريقنا الهندسي جاهز لمراجعة المتطلبات الفنية لمشروعكم.",
              )}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/$locale/work"
                params={{ locale }}
                className="label-mono inline-flex items-center gap-2 rounded-sm border px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--iw-dark-accent)",
                  borderColor: "var(--iw-dark-accent)",
                  color: "#070e1a",
                }}
              >
                <span>{t("Explore All 50+ Projects", "استعراض كافة المشروعات (+50)")}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>

              <Link
                to="/$locale/contact"
                params={{ locale }}
                className="label-mono inline-flex items-center gap-2 rounded-sm border border-white/20 bg-transparent px-8 py-4 text-xs font-bold tracking-widest uppercase text-[var(--iw-dark-text)] transition-all duration-300 hover:border-white hover:text-white"
              >
                <span>{t("Request Technical Consultation", "طلب استشارة هندسية")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
