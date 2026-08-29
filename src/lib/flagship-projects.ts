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
};

const SEEDS: FlagshipSeed[] = [
  {
    slug: "sadat-city-ro",
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
    capability_slugs: ["water-treatment", "electrical-control"],
    location: { lat: 30.3639, lng: 30.5236, en: "Sadat City, Menoufia", ar: "مدينة السادات، المنوفية" },
  },
  {
    slug: "toshka-pumping-stations",
    en: {
      title: "Toshka Multi-Station Infrastructure",
      challenge:
        "National agricultural reclamation required 22 pumping stations lifting irrigation water across a dispersed desert footprint on a fixed programme.",
      outcome:
        "Hydraulic design, station construction, electromechanical works and O&M executed in-house across all 22 hubs.",
    },
    ar: {
      title: "منظومة محطات الرفع — توشكى",
      challenge:
        "مشروع استصلاح زراعي قومي يتطلب 22 محطة ضخ لرفع مياه الري على امتداد صحراوي متباعد وبجدول زمني محدد.",
      outcome:
        "تصميم هيدروليكي وإنشاء المحطات وأعمال كهروميكانيكية وتشغيل وصيانة بأطقمنا الذاتية في المحطات الـ22.",
    },
    capability_slugs: ["pumping", "irrigation"],
    location: { lat: 22.5, lng: 31.4, en: "Toshka, Aswan", ar: "توشكى، أسوان" },
  },
  {
    slug: "food-city-treatment",
    en: {
      title: "Food City Industrial Wastewater Treatment",
      challenge:
        "An industrial food complex discharged high-load effluent that had to meet municipal compliance limits before release.",
      outcome:
        "50 m³/day treatment train designed, fabricated, installed and compliance-tested against discharge limits.",
    },
    ar: {
      title: "معالجة الصرف الصناعي — المدينة الغذائية",
      challenge:
        "مجمع غذائي صناعي يصرف مخلفات عالية التحميل يجب أن تطابق حدود الصرف البلدية قبل التخلص منها.",
      outcome:
        "وحدة معالجة 50 م³/يوم تم تصميمها وتصنيعها وتركيبها واختبار مطابقتها لحدود الصرف.",
    },
    capability_slugs: ["wastewater"],
    location: { lat: 30.3729, lng: 30.5401, en: "Sadat City Industrial Zone", ar: "المنطقة الصناعية بالسادات" },
  },
  {
    slug: "arish-water-supply",
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
      outcome:
        "خطوط تغذية وخزانات تكديس ومحطات ضخ تم تنفيذها وتسليمها كحزمة واحدة بمسؤولية كاملة.",
    },
    capability_slugs: ["water-treatment", "pumping"],
    location: { lat: 31.1313, lng: 33.8031, en: "Arish, North Sinai", ar: "العريش، شمال سيناء" },
  },
  {
    slug: "ameriya-cold-storage",
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
      outcome:
        "دوائر تبريد العمليات وشبكة التوزيع والأعمال الكهروميكانيكية تم تشغيلها وتسليمها.",
    },
    capability_slugs: ["pumping", "electrical-control"],
    location: { lat: 31.0, lng: 29.8, en: "Ameriya, Alexandria", ar: "العامرية، الإسكندرية" },
  },
  {
    slug: "awlad-el-sheikh-pumping",
    en: {
      title: "Awlad El-Sheikh Potable Water Pumping",
      challenge:
        "A local water authority needed reliable potable pumping capacity for a growing service area in Upper Egypt.",
      outcome:
        "Civil works, pump sets, control panels and commissioning completed under one delivery team.",
    },
    ar: {
      title: "محطة ضخ مياه شرب — أولاد الشيخ",
      challenge:
        "جهة مياه محلية تحتاج قدرة ضخ موثوقة لمياه الشرب لنطاق خدمة متنامٍ بصعيد مصر.",
      outcome:
        "أعمال مدنية ومجموعات ضخ ولوحات تحكم وتشغيل تجريبي بفريق تنفيذ واحد.",
    },
    capability_slugs: ["pumping", "electrical-control"],
    location: { lat: 26.5569, lng: 31.6948, en: "Awlad El-Sheikh, Sohag", ar: "أولاد الشيخ، سوهاج" },
  },
  {
    slug: "north-coast-desalination",
    en: {
      title: "North Coast Commercial Desalination",
      challenge:
        "A coastal commercial development needed an independent, verifiable source of potable water outside the municipal network.",
      outcome:
        "Commercial RO train designed, supplied, installed and verified by independent laboratory testing.",
    },
    ar: {
      title: "تحلية مياه تجارية — الساحل الشمالي",
      challenge:
        "مشروع تجاري ساحلي يحتاج مصدر مياه شرب مستقل وقابل للتحقق خارج الشبكة البلدية.",
      outcome:
        "وحدة تناضح عكسي تجارية تم تصميمها وتوريدها وتركيبها والتحقق منها معمليًا.",
    },
    capability_slugs: ["water-treatment"],
    location: { lat: 31.0409, lng: 28.4, en: "North Coast, Matrouh", ar: "الساحل الشمالي، مطروح" },
  },
  {
    slug: "east-delta-wastewater",
    en: {
      title: "East Delta Wastewater Treatment",
      challenge:
        "A municipal utility needed treatment works and electromechanical fit-out to bring effluent within statutory limits.",
      outcome:
        "Treatment works, electromechanical fit-out, compliance testing and ongoing O&M delivered in-house.",
    },
    ar: {
      title: "معالجة صرف صحي — دلتا الشرق",
      challenge:
        "مرفق بلدي يحتاج أعمال معالجة وتجهيز كهروميكانيكي لتوافق المخلفات مع الحدود القانونية.",
      outcome:
        "أعمال معالجة وتجهيز كهروميكانيكي واختبارات مطابقة وتشغيل وصيانة بأطقمنا الذاتية.",
    },
    capability_slugs: ["wastewater", "electrical-control"],
    location: { lat: 30.7, lng: 31.75, en: "East Delta, Sharqia", ar: "دلتا الشرق، الشرقية" },
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
    } satisfies PublicProject;
  });
}

/** Fallback case-study detail for a curated flagship slug. */
export function getFlagshipDetail(
  slug: string,
  locale: string,
): PublicProjectDetail | null {
  const project = getFlagshipProjects(locale).find((p) => p.slug === slug);
  if (!project) return null;
  const meta = PROJECT_META[slug];
  return {
    project,
    location: project.location,
    claims: [],
    media: meta
      ? [meta.cover, ...meta.gallery].map((url, i) => ({
          id: `${slug}-media-${i}`,
          url,
          alt: project.title,
        }))
      : [],
  };
}
