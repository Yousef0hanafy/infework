import { createFileRoute } from "@tanstack/react-router";

import Reveal from "@/components/infeworks/Reveal";
import ParallaxImage from "@/components/infeworks/ParallaxImage";
import MilestoneTrack from "@/components/infeworks/MilestoneTrack";


const TITLE = "About Infeworks — International for Engineering Works";
const DESC =
  "Infeworks (International for Engineering Works) delivers water and wastewater infrastructure in Egypt as a single accountable contractor.";

export const Route = createFileRoute("/$locale/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VERTICAL_CAPABILITIES = [
  {
    en: "Process Design",
    ar: "التصميم العملياتي والهندسي",
  },
  {
    en: "Equipment Procurement & Skid Fabrication",
    ar: "التوريد وتصنيع الوحدات المجمعة",
  },
  {
    en: "Electromechanical Works",
    ar: "الأعمال الكهروميكانيكية",
  },
  {
    en: "SCADA Controls",
    ar: "أنظمة التحكم والسكادا",
  },
  {
    en: "Long-Term O&M",
    ar: "التشغيل والصيانة طويلة الأجل",
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

const TIMELINE = [
  {
    years: "2006",
    en: "Foundation in Cairo",
    ar: "التأسيس في القاهرة",
    detail: {
      en: "Established as a water infrastructure contracting house, taking on core supply, storage, and pumping works for local authorities.",
      ar: "تأسست كبيت مقاولات للبنية التحتية للمياه، بأعمال التغذية والتخزين والضخ الأساسية لجهات محلية.",
    },
    entries: [
      { en: "Company registration — Zahraa Nasr City, Cairo", ar: "تسجيل الشركة — زهراء مدينة نصر، القاهرة", note: { en: "Founding", ar: "التأسيس" } },
      { en: "First potable water supply and storage contracts", ar: "أول عقود تغذية وتخزين مياه شرب", note: { en: "Municipal", ar: "قطاع حكومي" } },
    ],
  },
  {
    years: "2009",
    en: "In-House Mechanical Workshop",
    ar: "ورشة ميكانيكية داخلية",
    detail: {
      en: "Pipework prefabrication and pump-set assembly moved in-house, removing dependence on third-party fabricators.",
      ar: "نقل تصنيع خطوط المواسير وتجميع مجموعات الضخ إلى الداخل، وإلغاء الاعتماد على ورش خارجية.",
    },
    entries: [
      { en: "Steel pipework prefabrication line", ar: "خط تصنيع مواسير الصلب", note: { en: "Capability", ar: "قدرة تنفيذية" } },
      { en: "Pump-set assembly and hydraulic testing bay", ar: "تجميع مجموعات الضخ وحوض اختبار هيدروليكي", note: { en: "Capability", ar: "قدرة تنفيذية" } },
    ],
  },
  {
    years: "2012",
    en: "Regional Pumping Networks",
    ar: "شبكات الضخ الإقليمية",
    detail: {
      en: "Expansion into regional pumping networks with in-house electromechanical installation, panel building, and control works.",
      ar: "التوسع في شبكات الضخ الإقليمية بتنفيذ كهروميكانيكي داخلي وتصنيع لوحات وأعمال تحكم.",
    },
    entries: [
      { en: "Awlad El-Sheikh potable water pumping station", ar: "محطة ضخ مياه الشرب — أولاد الشيخ", note: { en: "Pumping", ar: "ضخ" } },
      { en: "LV panel building and motor control centres", ar: "تصنيع لوحات الجهد المنخفض ومراكز التحكم", note: { en: "Electromechanical", ar: "كهروميكانيكي" } },
    ],
  },
  {
    years: "2015",
    en: "Industrial & Cold-Chain Clients",
    ar: "عملاء الصناعة وسلاسل التبريد",
    detail: {
      en: "First industrial framework works: process water, drainage, and cold-storage utility infrastructure.",
      ar: "أول أعمال إطارية صناعية: مياه العمليات والصرف والبنية التحتية لمرافق التخزين المبرد.",
    },
    entries: [
      { en: "Ameriya cold-storage utility infrastructure", ar: "بنية تحتية لمرافق التخزين المبرد — العامرية", note: { en: "Industrial", ar: "صناعي" } },
      { en: "Process water and industrial drainage packages", ar: "حزم مياه العمليات والصرف الصناعي", note: { en: "Industrial", ar: "صناعي" } },
    ],
  },
  {
    years: "2018",
    en: "Membrane Separation & RO",
    ar: "الفصل الغشائي والتناضح العكسي",
    detail: {
      en: "Advanced membrane separation, reverse osmosis desalination, and fabricated industrial effluent treatment skids.",
      ar: "تقنيات الفصل الغشائي المتقدمة وتحلية المياه بالتناضح العكسي ووحدات معالجة الصرف الصناعي المصنَّعة.",
    },
    entries: [
      { en: "First RO desalination trains commissioned", ar: "تشغيل أول وحدات تحلية بالتناضح العكسي", note: { en: "Desalination", ar: "تحلية" } },
      { en: "Fabricated effluent treatment skids", ar: "وحدات معالجة صرف مصنَّعة مجمعة", note: { en: "Wastewater", ar: "صرف" } },
      { en: "North Coast commercial desalination works", ar: "أعمال تحلية تجارية — الساحل الشمالي", note: { en: "Commercial", ar: "تجاري" } },
    ],
  },
  {
    years: "2021",
    en: "Sadat City RO — Food-Grade Delivery",
    ar: "تحلية السادات — تسليم بمواصفات غذائية",
    detail: {
      en: "1,500 m³/day RO plant for an NSPO-affiliated food production complex, delivered design-to-operation under one contract.",
      ar: "محطة تحلية 1,500 م³/يوم لمجمع إنتاج غذائي تابع للخدمة الوطنية، من التصميم حتى التشغيل بعقد واحد.",
    },
    entries: [
      { en: "Sadat City RO desalination plant — 1,500 m³/day", ar: "محطة تحلية السادات — 1,500 م³/يوم", note: { en: "Client: Macaroni & Biscuit Factories Complex (NSPO)", ar: "العميل: مجمع مصانع المكرونة والبسكويت (الخدمة الوطنية)" } },
      { en: "Food City industrial wastewater train — 50 m³/day", ar: "وحدة معالجة الصرف الصناعي — المدينة الغذائية 50 م³/يوم", note: { en: "Compliance-tested discharge", ar: "صرف مطابق ومُختبر" } },
    ],
  },
  {
    years: "2023",
    en: "Toshka — 22 Pumping Stations",
    ar: "توشكى — 22 محطة رفع",
    detail: {
      en: "National agricultural reclamation programme: hydraulic design, station construction, electromechanical works and O&M across a dispersed desert footprint.",
      ar: "برنامج استصلاح زراعي قومي: تصميم هيدروليكي وإنشاء محطات وأعمال كهروميكانيكية وتشغيل وصيانة على امتداد صحراوي متباعد.",
    },
    entries: [
      { en: "22 irrigation pumping stations delivered in-house", ar: "22 محطة ضخ للري بتنفيذ ذاتي كامل", note: { en: "Toshka, Aswan", ar: "توشكى، أسوان" } },
      { en: "Long-term operation & maintenance mandate", ar: "تكليف تشغيل وصيانة طويل الأجل", note: { en: "O&M", ar: "تشغيل وصيانة" } },
    ],
  },
  {
    years: "2025–2026",
    en: "Sinai & East Delta Programmes",
    ar: "برامج سيناء ودلتا الشرق",
    detail: {
      en: "Trunk mains, storage and pumping capacity in Sinai under Engineering Authority supervision, alongside East Delta wastewater treatment works.",
      ar: "خطوط رئيسية وتخزين وقدرات ضخ في سيناء بإشراف الهيئة الهندسية، بجانب أعمال معالجة صرف صحي بدلتا الشرق.",
    },
    entries: [
      { en: "Arish water supply & infrastructure works", ar: "أعمال تغذية المياه والبنية التحتية — العريش", note: { en: "Engineering Authority supervision", ar: "بإشراف الهيئة الهندسية" } },
      { en: "East Delta wastewater treatment works", ar: "أعمال معالجة الصرف الصحي — دلتا الشرق", note: { en: "Municipal", ar: "قطاع حكومي" } },
      { en: "15 documented flagship deliveries to date", ar: "15 مشروعًا مرجعيًا موثقًا حتى الآن", note: { en: "Record", ar: "السجل" } },
    ],
  },
];



function AboutPage() {
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      {/* Identity */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-40">
          <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
            {t("About", "من نحن")}
          </p>
          <h1 className="display-xl mt-8 max-w-5xl text-[clamp(2rem,5.5vw,4.5rem)]">
            {isAr ? (
              <>
                إنفيوركس
                <span
                  className="mt-4 block text-[clamp(1.1rem,2.2vw,2rem)] font-normal tracking-normal"
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
                  className="mt-4 block text-[clamp(1.1rem,2.2vw,2rem)] font-normal tracking-normal normal-case"
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
        </div>
      </section>

      {/* Core business */}
      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <h2 className="label-mono pt-2 text-[var(--iw-text-secondary)]">
              {t("Core Business", "نشاط الشركة")}
            </h2>
            <p className="body-reading max-w-3xl text-lg">
              {t(
                "Infeworks designs, supplies, installs, tests, and operates water and wastewater infrastructure for state, industrial, and agricultural clients in Egypt. Work is delivered under a single accountable contract, covering process design, mechanical and electrical works, control systems, commissioning, and ongoing operation and maintenance.",
                "تقوم إنفيوركس بتصميم وتوريد وتنفيذ واختبار وتشغيل منشآت المياه والصرف الصحي لعملاء القطاع الحكومي والصناعي والزراعي في مصر. تُنفَّذ الأعمال تحت عقد واحد مسؤول يشمل التصميم التنفيذي والأعمال الميكانيكية والكهربائية وأنظمة التحكم والتشغيل التجريبي ثم التشغيل والصيانة.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="iw-section-surface">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="border-t border-[var(--iw-border)] pt-8">
            <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
              {t("Mission & Vision", "الرسالة والرؤية")}
            </p>
            <h2 className="display-lg mt-4 max-w-4xl text-[clamp(1.75rem,4vw,3rem)]">
              {t("Why Infeworks Exists", "لماذا وُجدت إنفيوركس")}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-[var(--iw-border)] lg:grid-cols-2">
            {[
              {
                key: "mission",
                label: t("Mission", "الرسالة"),
                num: "M",
                title: t(
                  "Deliver water infrastructure that performs exactly as specified.",
                  "تنفيذ منشآت مياه تعمل تمامًا كما تم التعاقد عليها.",
                ),
                body: t(
                  "To engineer, build, commission, and operate water and wastewater facilities under one accountable contract — measured against documented hydraulic, water-quality, and availability parameters rather than promises.",
                  "أن نصمّم ونُنفّذ ونشغّل منشآت المياه والصرف الصحي تحت عقد واحد مسؤول — بمعايير هيدروليكية وجودة مياه وجاهزية موثّقة، لا بوعود.",
                ),
              },
              {
                key: "vision",
                label: t("Vision", "الرؤية"),
                num: "V",
                title: t(
                  "Egypt's most trusted integrated water contractor.",
                  "أن نكون المقاول المتكامل الأكثر ثقة في مجال المياه بمصر.",
                ),
                body: t(
                  "To be the reference partner for mid-capacity water security in Egypt and the region — where every plant we hand over becomes verifiable evidence of engineering integrity for the next one.",
                  "أن نكون الشريك المرجعي للأمن المائي متوسط السعات في مصر والمنطقة — حيث تصبح كل محطة نسلّمها دليلًا موثقًا على نزاهتنا الهندسية في المشروع التالي.",
                ),
              },
            ].map((card, idx) => (
              <Reveal
                key={card.key}
                delay={idx * 110}
                className="bg-[var(--iw-surface)] p-8 md:p-12"
              >
                <div className="flex items-baseline gap-4">
                  <span className="label-mono" style={{ color: "var(--iw-accent)" }}>
                    {card.label}
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--iw-border)" }}
                  />
                </div>
                <h3 className="display-md mt-6 text-2xl md:text-3xl">{card.title}</h3>
                <p className="body-reading mt-5 text-[var(--iw-text-secondary)]">
                  {card.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <ParallaxImage
              src="/images/projects/sadat-city-ro/cover.webp"
              alt={t(
                "Sadat City RO Desalination Plant — Reverse osmosis trains & skid assembly",
                "محطة تحلية مياه بالتناضح العكسي بالسادات — تجميع الوحدات ومنظومات الأغشية",
              )}
              ratio="4/3"
            />
            <ParallaxImage
              src="/images/projects/toshka-pumping-stations/gallery-1.webp"
              alt={t(
                "Toshka Pumping Infrastructure — Hydraulic pump sets and intake pipework",
                "منظومة محطات الرفع بتوشكى — مجموعات الضخ الهيدروليكي وخطوط المواسير",
              )}
              ratio="4/3"
            />
            <ParallaxImage
              src="/images/projects/food-city-treatment/cover.webp"
              alt={t(
                "Food City Industrial Wastewater Treatment Plant — Biological & chemical facility",
                "محطة معالجة الصرف الصناعي بالمدينة الغذائية — المعالجة البيولوجية والكيميائية",
              )}
              ratio="4/3"
            />
          </Reveal>
        </div>
      </section>



      {/* Vertically Integrated Model */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 border-t pt-8" style={{ borderColor: "var(--iw-dark-border)" }}>
            <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
              {t("Delivery Model", "نموذج التنفيذ")}
            </p>
            <h2 className="display-lg mt-4 max-w-4xl text-[clamp(1.75rem,4vw,3rem)]">
              {t("The Vertically Integrated Model", "النموذج المتكامل من البداية للنهاية")}
            </h2>
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="body-reading text-lg" style={{ color: "var(--iw-dark-text-muted)" }}>
                {t(
                  "Single-contract accountability across process design, equipment procurement and skid fabrication, electromechanical works, SCADA controls, and long-term O&M. One partner holds every milestone — from hydraulic design to final commissioning.",
                  "مسؤولية موحدة بعقد واحد تغطي التصميم العملياتي، وتوريد المعدات وتصنيع الوحدات المجمعة، والأعمال الكهروميكانيكية، وأنظمة التحكم والسكادا، والتشغيل والصيانة طويلة الأجل. شريك واحد يتحمل كل مرحلة — من التصميم الهيدروليكي حتى التشغيل التجريبي النهائي.",
                )}
              </p>
              <p
                className="body-reading mt-6 border-l-2 pl-6 text-base"
                style={{
                  borderColor: "var(--iw-dark-accent)",
                  color: "var(--iw-dark-text)",
                }}
              >
                {t(
                  "Unlike fragmented multi-contractor delivery, Infeworks removes the interface risk. Process, mechanical, electrical, and control disciplines are engineered and built by the same accountable team, so performance guarantees are enforceable and commissioning is predictable.",
                  "على عكس التنفيذ المقسَّم بين عدة مقاولين، تزيل إنفيوركس مخاطر الواجهات. يتم تصميم وتنفيذ الأعمال العملياتية والميكانيكية والكهربائية وأنظمة التحكم من قِبل نفس الفريق المسؤول، مما يجعل ضمانات الأداء قابلة للتنفيذ والتشغيل التجريبي أكثر قابلية للتنبؤ.",
                )}
              </p>
            </div>

            <div className="divide-y" style={{ borderColor: "var(--iw-dark-border)" }}>
              {VERTICAL_CAPABILITIES.map((cap, idx) => (
                <div
                  key={cap.en}
                  className="group flex items-start gap-5 py-6"
                  style={{ borderColor: "var(--iw-dark-border)" }}
                >
                  <span
                    className="label-mono pt-1.5"
                    style={{ color: "var(--iw-dark-accent)", minWidth: "2.5rem" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display-md text-xl md:text-2xl">{isAr ? cap.ar : cap.en}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Strategic Engineering Pillars */}
      <section className="iw-section-surface">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 border-t pt-8" style={{ borderColor: "var(--iw-border)" }}>
            <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
              {t("Strategic Pillars", "المبادئ الاستراتيجية")}
            </p>
            <h2 className="display-lg mt-4 text-[clamp(1.75rem,4vw,3rem)]">
              {t("What Defines Our Engineering", "ما يميز هندستنا")}
            </h2>
          </div>

          <div className="grid gap-px bg-[var(--iw-border)] md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.en}
                className="bg-[var(--iw-surface)] p-8 transition-colors hover:bg-[var(--iw-surface-alt)] md:p-10"
              >
                <span
                  className="label-mono block"
                  style={{ color: "var(--iw-accent)" }}
                >
                  {pillar.num}
                </span>
                <h3 className="display-md mt-5 min-h-[3.5rem] text-xl md:text-2xl">
                  {isAr ? pillar.ar : pillar.en}
                </h3>
                <p className="body-reading mt-5 text-[var(--iw-text-secondary)]">
                  {isAr ? pillar.body.ar : pillar.body.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company history since 2006 */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="mb-16 border-t border-[var(--iw-dark-border)] pt-8">
            <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
              {t("Established in 2006", "تأسست عام 2006")}
            </p>
            <h2 className="display-lg mt-4 text-[clamp(1.75rem,4vw,3rem)]">
              {t(
                "Since 2006 — Two Decades of Engineering Integration",
                "منذ 2006 — مسيرة عقدين من التكامل الهندسي",
              )}
            </h2>
            <p
              className="body-reading mt-4 max-w-2xl"
              style={{ color: "var(--iw-dark-text-muted)" }}
            >
              {t(
                "Select a milestone on the datum line to read how the scope expanded.",
                "اختر محطة على خط الزمن لقراءة كيف توسّع نطاق أعمالنا.",
              )}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <MilestoneTrack
              isAr={isAr}
              items={TIMELINE.map((item) => ({
                years: item.years,
                title: isAr ? item.ar : item.en,
                detail: isAr ? item.detail.ar : item.detail.en,
                meta: t("Milestone", "محطة"),
                entries: item.entries?.map((e) => ({
                  label: isAr ? e.ar : e.en,
                  note: e.note ? (isAr ? e.note.ar : e.note.en) : undefined,
                })),
              }))}
            />

          </Reveal>
        </div>
      </section>


      {/* Quality, Health & Safety Governance */}
      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <div>
              <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
                {t("Governance", "الحوكمة")}
              </p>
              <h2 className="display-lg mt-4 text-[clamp(1.5rem,3vw,2.25rem)]">
                {t("Quality, Health & Safety", "الجودة والصحة والسلامة")}
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="body-reading text-lg">
                {t(
                  "Infeworks adheres to stringent ISO and Egyptian code compliance, hydraulic surge protection, and food-grade membrane hygiene standards. Every plant is delivered with documented commissioning records, operator training, and a clear O&M handover package.",
                  "تلتزم إنفيوركس بمعايير الجودة والكود المصري، وحماية الأنظمة الهيدروليكية من الصدمات، ومعايير نظافة أغشية المياه الغذائية. تُسلَّم كل محطة مع سجلات تشغيل موثقة وتدريب للمشغلين وحزمة تشغيل وصيانة واضحة.",
                )}
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    en: "ISO-aligned quality systems",
                    ar: "أنظمة جودة متوافقة مع ISO",
                  },
                  {
                    en: "Hydraulic surge protection",
                    ar: "حماية من الصدمات الهيدروليكية",
                  },
                  {
                    en: "Food-grade membrane hygiene",
                    ar: "نظافة أغشية مطابقة للاشتراطات الغذائية",
                  },
                  {
                    en: "Documented commissioning & handover",
                    ar: "تشغيل تجريبي موثّق وتسليم منظم",
                  },
                ].map((g) => (
                  <div
                    key={g.en}
                    className="border p-5"
                    style={{
                      borderColor: "var(--iw-border)",
                      backgroundColor: "var(--iw-surface)",
                    }}
                  >
                    <p className="font-medium">{isAr ? g.ar : g.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
