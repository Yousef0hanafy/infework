import { useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  Building2,
  Droplets,
  Gauge,
  Recycle,
  ShieldCheck,
  Sprout,
  Zap,
  Route as RouteIcon,
  type LucideIcon,
} from "lucide-react";

import BlueprintBackdrop from "@/components/infeworks/BlueprintBackdrop";
import NetworkFlowBackdrop from "@/components/infeworks/NetworkFlowBackdrop";
import Reveal from "@/components/infeworks/Reveal";
import { useSpotlight } from "@/lib/spotlight";
import LifecycleFlow from "@/components/infeworks/LifecycleFlow";
import ImpactMap from "@/components/infeworks/ImpactMap";
import ClientsMarquee from "@/components/infeworks/ClientsMarquee";
import SuppliersShowcase from "@/components/infeworks/SuppliersShowcase";
import { SECTORS } from "@/lib/sectors";
import { getProjectMeta } from "@/lib/project-meta";
import { getFlagshipProjects } from "@/lib/flagship-projects";

import { getPublicProjects, getSiteSettings } from "@/lib/public.functions";

const DEFAULT_TITLE = "Infeworks — Water Infrastructure, Engineered & Delivered";
const DEFAULT_DESC =
  "Infeworks — the vertically integrated water and wastewater infrastructure contractor for Egypt's state, industrial, and agricultural clients.";

export const Route = createFileRoute("/$locale/")({
  loader: async ({ params }) => {
    const [projects, settings] = await Promise.all([
      getPublicProjects({ data: { locale: params.locale } }),
      getSiteSettings(),
    ]);
    return { projects, settings };
  },
  head: ({ loaderData }) => {
    const settings = loaderData?.settings ?? {};
    const title = settings["home_title"] ?? DEFAULT_TITLE;
    const description = settings["home_description"] ?? DEFAULT_DESC;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://infeworks.com/logo.png" },
        { property: "og:image:alt", content: "Infeworks Logo" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://infeworks.com/logo.png" },
      ],
    };
  },
  component: LocaleHome,
});

const ICONS: Record<string, LucideIcon> = {
  droplets: Droplets,
  recycle: Recycle,
  gauge: Gauge,
  sprout: Sprout,
  zap: Zap,
  route: RouteIcon,
  building: Building2,
};

const SECTOR_BENCHMARKS: Record<string, { en: string; ar: string }> = {
  "water-treatment": {
    en: "Sadat City RO Plant",
    ar: "محطة تحلية السادات",
  },
  wastewater: {
    en: "Shubra Shahab Industrial WWTP",
    ar: "محطة معالجة شبرا شهاب",
  },
  "pumping-wells": {
    en: "Toshka Multi-Station System (22 Hubs)",
    ar: "منظومة محطات رفع توشكى (22 محطة)",
  },
  "infrastructure-networks": {
    en: "Arish Airport Regional Trunk Lines",
    ar: "خطوط نقل مياه مطار العريش الإقليمية",
  },
  "civil-buildings": {
    en: "Qabs Min Nour Grand Mosque",
    ar: "جامع ومجمع قبس من نور",
  },
  "industrial-mep": {
    en: "Ameriya Cold Storage Process Cooling",
    ar: "دوائر تبريد العمليات الصناعية بالعامرية",
  },
};

const PROJECT_SECTORS: Record<string, { en: string; ar: string }> = {
  "sadat-city-ro": { en: "Water & Desalination", ar: "المياه والتحلية" },
  "toshka-pumping-stations": { en: "Pumping & Deep Wells", ar: "محطات الرفع والآبار" },
  "shubra-shahab-industrial-wastewater": { en: "Wastewater Treatment", ar: "معالجة مياه الصرف" },
  "food-city-treatment": { en: "Wastewater Treatment", ar: "معالجة مياه الصرف" },
  "arish-water-supply": { en: "Infrastructure Networks", ar: "شبكات المرافق والبنية التحتية" },
  "ameriya-cold-storage": { en: "Industrial MEP & Energy", ar: "الكهروميكانيكا والطاقة" },
  "qabs-min-nour-mosque": { en: "Civil & Buildings", ar: "الإنشاءات المدنية والمعمارية" },
};

const METRICS = [
  {
    value: "20+",
    en: "Years of Engineering Delivery",
    ar: "عاماً من الخبرة والتنفيذ الهندسي",
  },
  {
    value: "50+",
    en: "Infrastructure Projects Delivered",
    ar: "مشروع بنية تحتية منفذ ومشغل",
  },
  {
    value: "100%",
    en: "Integrated In-House Delivery",
    ar: "تنفيذ ذاتي متكامل",
  },
];

const TELEMETRY = [
  {
    icon: ShieldCheck,
    en: "Civil & Infrastructure Works",
    ar: "بنية تحتية ومقاولات عامة",
    subEn: "General contracting for major state infrastructure",
    subAr: "مقاولات عامة لمشروعات البنية التحتية الكبرى للدولة",
  },
  {
    icon: Droplets,
    en: "Water, Wastewater & Irrigation",
    ar: "محطات المعالجة والصرف والري",
    subEn: "Treatment plants, RO desalination & agri networks",
    subAr: "محطات معالجة وتحلية وشبكات ري زراعي واستصلاح أراضي",
  },
  {
    icon: Zap,
    en: "Electromechanical",
    ar: "كهروميكانيكا",
    subEn: "Large-scale pumping hubs & automation systems",
    subAr: "محطات رفع كبرى وأنظمة تحكم آلي متكاملة",
  },
];

const TRUST = [
  {
    en: "Single accountable contract",
    ar: "عقد واحد بمسؤولية كاملة",
    bodyEn:
      "One signature covers process design, procurement, construction, commissioning, and operation. No interface gaps to argue over.",
    bodyAr:
      "توقيع واحد يغطي التصميم والتوريد والتنفيذ والتشغيل التجريبي والتشغيل. لا فجوات مسؤولية بين المقاولين.",
  },
  {
    en: "Design, build and operate in-house",
    ar: "تصميم وتنفيذ وتشغيل داخلي",
    bodyEn:
      "Our own engineers, fabrication crews, panel workshop, and operators — which is why our schedules hold.",
    bodyAr:
      "مهندسونا وأطقم التصنيع وورشة اللوحات والمشغلون تابعون لنا — ولهذا تلتزم جداولنا الزمنية.",
  },
  {
    en: "Documented delivery record",
    ar: "سجل تسليم موثق",
    bodyEn:
      "Witnessed performance runs, lab verification, and as-built documentation handed over with every plant.",
    bodyAr: "تجارب أداء موثقة وتحقق معملي ورسومات تنفيذية فعلية تُسلَّم مع كل محطة.",
  },
];

function LocaleHome() {
  const { projects: published } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const projects = published.length > 0 ? published : getFlagshipProjects(locale);
  const featured = useMemo(() => {
    const flagships = [
      "sadat-city-ro",
      "toshka-pumping-stations",
      "shubra-shahab-industrial-wastewater",
      "arish-water-supply",
      "ameriya-cold-storage",
      "qabs-min-nour-mosque",
    ];
    return [...projects]
      .sort((a, b) => {
        const aIndex = flagships.indexOf(a.slug);
        const bIndex = flagships.indexOf(b.slug);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        // Fallback to most recent for non-flagships
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 6);
  }, [projects]);
  const spot = useSpotlight();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Infeworks",
    url: "https://infeworks.com",
    inLanguage: isAr ? "ar-EG" : "en-EG",
    description: isAr
      ? "المقاول الهندسي المتكامل لتنفيذ محطات معالجة المياه والصرف والشبكات في مصر"
      : "Turnkey EPC contractor for water, wastewater, civil infrastructure, and electromechanical engineering in Egypt.",
  };

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {/* SECTION A — HERO */}
      <section className="iw-section-dark relative overflow-hidden">
        <NetworkFlowBackdrop />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-32 pb-0 md:px-10 md:pt-44">
          <p className="iw-tag label-mono">
            {t("Class-A Infrastructure EPC Contractor", "مقاول فئة أولى لمشروعات البنية التحتية")}
          </p>
          <h1 className="display-xl mt-8 max-w-5xl text-[clamp(2.25rem,6.4vw,5.5rem)]">
            {t(
              "Engineering & Constructing Egypt's Critical Water Infrastructure.",
              "هندسة وتشييد البنية التحتية القومية للمياه والمشروعات الكهروميكانيكية.",
            )}
          </h1>
          <p
            className="body-reading mt-8 max-w-3xl text-lg"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {t(
              "Turnkey EPC contractor delivering Large-scale water treatment, wastewater treatment, civil infrastructure, and industrial electromechanical infrastructure across Egypt.",
              "المقاول العام لتنفيذ محطات معالجة وتنقية المياه، شبكات المرافق والأعمال المدنية، ومحطات الرفع الكبرى والأنظمة الكهروميكانيكية في مصر منذ عام 2006.",
            )}
          </p>

          {/* Command-centre telemetry badges */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TELEMETRY.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.en} className="iw-reveal">
                  <div
                    className="flex items-start gap-4 rounded-lg border px-6 py-5 transition-all duration-300 backdrop-blur-md hover:-translate-y-1 hover:border-[var(--iw-dark-accent)] hover:shadow-[0_8px_32px_-12px_color-mix(in_oklab,var(--iw-dark-accent)_40%,transparent)]"
                    style={{
                      backgroundColor: "color-mix(in oklab, var(--iw-dark-bg) 60%, transparent)",
                      borderColor: "var(--iw-dark-border)",
                    }}
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ color: "var(--iw-dark-accent)" }}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--iw-dark-accent)] opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--iw-dark-accent)]"></span>
                        </span>
                        <p
                          className="label-mono text-[13px]"
                          style={{ color: "var(--iw-dark-text)" }}
                        >
                          {t(item.en, item.ar)}
                        </p>
                      </div>
                      <p
                        className="mt-2 text-xs leading-relaxed"
                        style={{ color: "var(--iw-dark-text-muted)" }}
                      >
                        {t(item.subEn, item.subAr)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex flex-col items-stretch gap-4 pb-24 sm:flex-row sm:items-center sm:gap-5">
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="inline-flex w-full justify-center sm:w-auto items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--iw-accent-hover)] hover:shadow-[0_16px_36px_-12px_color-mix(in_oklab,var(--iw-accent)_75%,transparent)]"
              style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
            >
              {t("Submit Technical Enquiry", "طلب استفسار فني")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              to="/$locale/work"
              params={{ locale }}
              className="inline-flex w-full justify-center sm:w-auto items-center gap-3 rounded-sm border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--iw-dark-accent)]"
              style={{
                backgroundColor: "color-mix(in oklab, var(--iw-dark-bg) 85%, #000)",
                borderColor: "var(--iw-dark-border)",
                color: "var(--iw-dark-text)",
              }}
            >
              {t("Explore Portfolio", "استكشف المشروعات")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a
              href="/downloads/infeworks-company-profile.pdf"
              download="infeworks-company-profile.pdf"
              className="label-mono inline-flex w-full justify-center sm:w-auto items-center gap-3 px-3 py-4 underline-offset-8 transition-colors hover:underline"
              style={{ color: "var(--iw-dark-accent)" }}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              {t("Download Company Profile", "تحميل ملف الشركة")}
            </a>
          </div>

          {/* Scroll datum cue */}
          <a
            href="#clients-section"
            className="group inline-flex items-center gap-4 pb-14 transition-opacity hover:opacity-100 focus:outline-none"
            style={{ color: "var(--iw-dark-text-muted)" }}
            aria-label={t("Scroll to clients section", "الانتقال لقسم العملاء")}
          >
            <span className="label-mono text-[10px] tracking-[0.24em] uppercase transition-colors group-hover:text-[var(--iw-dark-accent)]">
              {t("Scroll", "انزل للأسفل")}
            </span>
            <span
              className="relative h-px w-24 overflow-hidden"
              style={{
                backgroundColor: "color-mix(in oklab, var(--iw-dark-text-muted) 35%, transparent)",
              }}
            >
              <span
                className="iw-scroll-trace absolute inset-y-0 w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--iw-dark-accent), transparent)",
                }}
              />
            </span>
          </a>
        </div>

        {/* Evidence metrics bar */}
        <div className="relative border-t" style={{ borderColor: "var(--iw-dark-border)" }}>
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-3">
            {METRICS.map((item, i) => (
              <div
                key={item.value}
                className={`group relative px-6 py-10 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--iw-dark-accent)_6%,transparent)] md:px-10 ${i > 0 ? "border-t md:border-t-0 md:border-s" : ""}`}
                style={{ borderColor: "var(--iw-dark-border)" }}
              >
                <p className="display-lg iw-text-glow text-[clamp(2.5rem,5vw,3.75rem)]">
                  {item.value}
                </p>
                <p className="mt-4 text-sm" style={{ color: "var(--iw-dark-text-muted)" }}>
                  {t(item.en, item.ar)}
                </p>
                <span
                  className="mt-6 block h-px w-10 origin-left transition-transform duration-500 group-hover:scale-x-[4]"
                  style={{ backgroundColor: "var(--iw-dark-accent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B — CLIENTS & CONTRACTING AUTHORITIES (Instant Institutional Proof) */}
      <section
        id="clients-section"
        className="iw-section-light overflow-hidden border-b"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-20 pb-8 md:px-10 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow={t("Proven Track Record", "سجل موثوق")}
              title={t("Our Clients & Contracting Authorities", "عملاؤنا والجهات المتعاقدة")}
            />
          </Reveal>
          <Reveal delay={120}>
            <p
              className="body-reading mt-6 max-w-2xl text-[15px]"
              style={{ color: "var(--iw-text-secondary)" }}
            >
              {t(
                "Two decades of delivery for Egypt's state ministries, national authorities, and industrial leaders — under single-point contract accountability.",
                "عقدان من التنفيذ لوزارات الدولة والهيئات القومية وكبرى الكيانات الصناعية في مصر — بمسؤولية تعاقدية موحدة.",
              )}
            </p>
          </Reveal>
        </div>
        <Reveal delay={180}>
          <div className="pb-16 md:pb-20">
            <ClientsMarquee isAr={isAr} />
          </div>
        </Reveal>
      </section>

      {/* SECTION C — CORE CAPABILITIES */}
      <section className="iw-section-surface border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading
              eyebrow={t("Capabilities", "القدرات الهندسية")}
              title={t("Core Engineering Disciplines", "القطاعات والقدرات الهندسية")}
            />
          </Reveal>
          <div
            className="mt-16 grid grid-cols-1 gap-8 border-t-0 border-s-0 sm:gap-0 sm:border-t sm:border-s sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: "var(--iw-border)" }}
          >
            {SECTORS.map((s) => {
              const Icon = ICONS[s.icon] ?? Droplets;
              return (
                <Link
                  key={s.slug}
                  to="/$locale/what-we-do/$sector"
                  params={{ locale, sector: s.slug }}
                  onMouseMove={spot}
                  className="group iw-spotlight relative flex flex-col justify-between overflow-hidden border sm:border-0 sm:border-e sm:border-b bg-[var(--iw-surface)] p-8 hover:bg-[var(--iw-surface-alt)] md:p-10 transition-colors"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, color-mix(in oklab, var(--iw-accent) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--iw-accent) 12%, transparent) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-7 w-7 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                        style={{ color: "var(--iw-accent)" }}
                        strokeWidth={1.5}
                      />
                      <span className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                        {isAr ? s.metric.ar : s.metric.en}
                      </span>
                    </div>
                    <h3 className="display-md mt-8 text-xl md:text-2xl">{isAr ? s.ar : s.en}</h3>
                    <p
                      className="mt-4 text-sm leading-relaxed"
                      style={{ color: "var(--iw-text-secondary)" }}
                    >
                      {isAr ? s.defAr : s.defEn}
                    </p>
                    {SECTOR_BENCHMARKS[s.slug] ? (
                      <div
                        className="mt-6 flex items-center gap-2 border-t pt-4 text-xs font-medium"
                        style={{ borderColor: "var(--iw-border)" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)] shrink-0" />
                        <span className="truncate" style={{ color: "var(--iw-text-primary)" }}>
                          <span className="text-[var(--iw-text-secondary)] font-normal me-1">
                            {isAr ? "مشروع مرجعي:" : "Benchmark:"}
                          </span>
                          {isAr ? SECTOR_BENCHMARKS[s.slug]?.ar : SECTOR_BENCHMARKS[s.slug]?.en}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <span
                    className="label-mono relative mt-10 inline-flex items-center gap-3"
                    style={{ color: "var(--iw-accent)" }}
                  >
                    {t("Technical detail", "التفاصيل الفنية")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION D — DELIVERED FLAGSHIP PROJECTS (BENTO SHOWCASE) */}
      <section className="iw-section-light border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
                  {t("Portfolio", "سجل الأعمال")}
                </p>
                <h2 className="display-lg mt-4 text-[clamp(2rem,4.5vw,3.75rem)]">
                  {t("Flagship Projects", "مشروعات مرجعية")}
                </h2>
              </div>
              <p
                className="body-reading max-w-xl text-sm md:text-base leading-relaxed"
                style={{ color: "var(--iw-text-secondary)" }}
              >
                {t(
                  "Six engineering benchmarks delivered across state, municipal, and industrial sectors in Egypt.",
                  "ستة نماذج هندسية مرجعية تم تنفيذها لقطاعات الدولة والهيئات القومية والصناعية في مصر.",
                )}
              </p>
            </div>
          </Reveal>

          {/* BENTO GRID (2 + 3 + 1) */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {featured.map((p, idx) => {
              const meta = getProjectMeta(p.slug);
              const sectorInfo = PROJECT_SECTORS[p.slug];
              const isHeroCard = idx === 0;
              const isCompanionCard = idx === 1;
              const isGrandShowcase = idx === 5;

              // Card 5: Full-width Grand Split Showcase Banner
              if (isGrandShowcase) {
                return (
                  <Reveal key={p.project_id} delay={idx * 60} className="lg:col-span-12">
                    <Link
                      to="/$locale/work/$slug"
                      params={{ locale, slug: p.slug }}
                      preload={false}
                      onMouseMove={spot}
                      className="group iw-spotlight relative block overflow-hidden rounded-md border bg-[var(--iw-surface)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--iw-accent)] hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.1)]"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                        {/* Image Panel */}
                        <div
                          className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 min-h-[300px] overflow-hidden"
                          style={{ backgroundColor: "var(--iw-surface-alt)" }}
                        >
                          <span
                            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                "linear-gradient(to top, color-mix(in oklab, var(--iw-dark-bg) 60%, transparent), transparent 60%)",
                            }}
                            aria-hidden="true"
                          />
                          {meta ? (
                            <img
                              src={meta.cover}
                              alt={p.title}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover grayscale-[25%] transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            />
                          ) : null}

                          {/* Technical Spec Badge */}
                          {meta?.badge || meta?.capacity ? (
                            <div className="absolute top-4 start-4 z-20 flex items-center gap-2 rounded-sm bg-[#0b1628]/95 px-3.5 py-2 backdrop-blur-md border border-white/15 shadow-lg">
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-dark-accent)] animate-pulse" />
                              <span className="label-mono text-xs font-semibold text-white tracking-wide">
                                {isAr
                                  ? (meta.badge?.ar ?? meta.capacity?.ar)
                                  : (meta.badge?.en ?? meta.capacity?.en)}
                              </span>
                            </div>
                          ) : null}
                        </div>

                        {/* Content Panel */}
                        <div
                          className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-s"
                          style={{ borderColor: "var(--iw-border)" }}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs label-mono">
                              {sectorInfo ? (
                                <span className="font-semibold uppercase tracking-wider text-[var(--iw-accent)]">
                                  {isAr ? sectorInfo.ar : sectorInfo.en}
                                </span>
                              ) : (
                                <span />
                              )}
                              <span className="text-[var(--iw-text-secondary)]">
                                {p.location?.display_name ?? meta?.region?.en ?? ""} ·{" "}
                                {meta?.year ?? "2025"}
                              </span>
                            </div>

                            <h3 className="display-md mt-4 text-2xl lg:text-3xl font-bold leading-tight">
                              {p.title}
                            </h3>

                            {meta?.client ? (
                              <p
                                className="label-mono mt-3 text-xs font-medium"
                                style={{ color: "var(--iw-accent)" }}
                              >
                                {isAr ? meta.client.ar : meta.client.en}
                              </p>
                            ) : null}

                            <p
                              className="mt-5 text-sm leading-relaxed"
                              style={{ color: "var(--iw-text-secondary)" }}
                            >
                              {p.outcome ?? p.challenge}
                            </p>

                            {meta?.scope ? (
                              <div
                                className="mt-6 border-t pt-4 text-xs font-normal"
                                style={{
                                  borderColor: "var(--iw-border)",
                                  color: "var(--iw-text-secondary)",
                                }}
                              >
                                <span className="label-mono font-semibold text-[var(--iw-text-primary)] block mb-1">
                                  {isAr ? "نطاق التنفيذ المتكامل:" : "Turnkey Scope:"}
                                </span>
                                {isAr ? meta.scope.ar : meta.scope.en}
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="mt-8 border-t pt-5 flex items-center justify-between"
                            style={{ borderColor: "var(--iw-border)" }}
                          >
                            <span className="label-mono inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--iw-text-primary)] transition-colors group-hover:text-[var(--iw-accent)]">
                              {t("Explore Case Study", "عرض دراسة الحالة")}
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5 rtl:rotate-180" />
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)] opacity-60" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              }

              // Card Layout Grid Spans:
              // Card 0: lg:col-span-7 (Hero)
              // Card 1: lg:col-span-5 (Companion)
              // Cards 2, 3, 4: lg:col-span-4 (Standard 3-column row)
              const colSpanClass = isHeroCard
                ? "lg:col-span-7"
                : isCompanionCard
                  ? "lg:col-span-5"
                  : idx === 2
                    ? "md:col-span-6 lg:col-span-4"
                    : idx === 3
                      ? "md:col-span-6 lg:col-span-4"
                      : "md:col-span-12 lg:col-span-4";

              return (
                <Reveal key={p.project_id} delay={idx * 60} className={colSpanClass}>
                  <Link
                    to="/$locale/work/$slug"
                    params={{ locale, slug: p.slug }}
                    preload={false}
                    onMouseMove={spot}
                    className="group iw-spotlight relative flex flex-col justify-between h-full overflow-hidden rounded-md border bg-[var(--iw-surface)] p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--iw-accent)] hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08)]"
                    style={{ borderColor: "var(--iw-border)" }}
                  >
                    <div>
                      {/* Image Frame */}
                      <div
                        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm"
                        style={{ backgroundColor: "var(--iw-surface-alt)" }}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(to top, color-mix(in oklab, var(--iw-dark-bg) 55%, transparent), transparent 60%)",
                          }}
                          aria-hidden="true"
                        />
                        {meta ? (
                          <img
                            src={meta.cover}
                            alt={p.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover grayscale-[25%] transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />
                        ) : null}

                        {/* Floating Technical Badge */}
                        {meta?.badge || meta?.capacity ? (
                          <div className="absolute top-3 start-3 z-20 flex items-center gap-1.5 rounded-sm bg-[#0b1628]/95 px-3 py-1.5 backdrop-blur-md border border-white/15 shadow-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-dark-accent)] animate-pulse" />
                            <span className="label-mono text-[10.5px] font-semibold text-white tracking-wide">
                              {isAr
                                ? (meta.badge?.ar ?? meta.capacity?.ar)
                                : (meta.badge?.en ?? meta.capacity?.en)}
                            </span>
                          </div>
                        ) : null}
                      </div>

                      {/* Header & Meta */}
                      <div
                        className="mt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 border-t pt-4"
                        style={{ borderColor: "var(--iw-border)" }}
                      >
                        <div className="flex items-center gap-2">
                          {sectorInfo ? (
                            <span className="label-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--iw-accent)]">
                              {isAr ? sectorInfo.ar : sectorInfo.en}
                            </span>
                          ) : null}
                        </div>
                        <span
                          className="label-mono text-xs shrink-0"
                          style={{ color: "var(--iw-text-secondary)" }}
                        >
                          {p.location?.display_name ?? meta?.year ?? ""}
                        </span>
                      </div>

                      <h3
                        className={`display-md mt-2 font-bold ${isHeroCard ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"}`}
                      >
                        {p.title}
                      </h3>

                      {meta?.client ? (
                        <p
                          className="label-mono mt-2 text-xs"
                          style={{ color: "var(--iw-accent)" }}
                        >
                          {isAr ? meta.client.ar : meta.client.en}
                        </p>
                      ) : null}

                      <div className="mt-3.5 flex items-start gap-2.5">
                        <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--iw-accent)]" />
                        <p
                          className="text-xs md:text-sm leading-relaxed"
                          style={{ color: "var(--iw-text-secondary)" }}
                        >
                          {p.outcome ?? p.challenge}
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div
                      className="mt-6 border-t pt-4 flex items-center justify-between"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <span className="label-mono inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--iw-text-primary)] transition-colors group-hover:text-[var(--iw-accent)]">
                        {t("View Case Study", "عرض دراسة الحالة")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5 rtl:rotate-180" />
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)] opacity-60" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div
            className="mt-16 flex items-center justify-between border-t pt-8"
            style={{ borderColor: "var(--iw-border)" }}
          >
            <Link
              to="/$locale/work"
              params={{ locale }}
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:text-[var(--iw-accent)]"
              style={{ color: "var(--iw-text-primary)" }}
            >
              {t("Explore Complete Portfolio", "استكشف السجل الكامل للأعمال")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <span className="label-mono text-xs text-[var(--iw-text-secondary)]">
              {t("6 Sector Benchmarks", "6 مشروعات قطاعية مرجعية")}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION E — INTEGRATED EXECUTION MODEL */}
      <section className="iw-section-surface border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading
              eyebrow={t("Delivery lifecycle", "دورة التنفيذ المتكاملة")}
              title={t("Integrated Execution Model", "نموذج التنفيذ المتكامل")}
            />
            <LifecycleFlow isAr={isAr} />
          </Reveal>
        </div>
      </section>

      {/* SECTION F — EGYPT IMPACT MAP */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading
              dark
              eyebrow={t("Footprint", "الانتشار الجغرافي")}
              title={t("Our Impact Across Egypt", "أثرنا على امتداد مصر")}
            />
          </Reveal>
          <ImpactMap projects={projects} locale={locale} isAr={isAr} />
        </div>
      </section>

      {/* SECTION G — GLOBAL SUPPLIERS & TECHNOLOGY PARTNERS */}
      <section
        className="iw-section-light overflow-hidden border-t"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-24 pb-4 md:px-10 md:pt-32">
          <Reveal>
            <SectionHeading
              eyebrow={t("Global Supply Chain", "سلاسل التوريد العالمية")}
              title={t(
                "Approved Suppliers & Technology Partners",
                "الموردون المعتمدون وشركاء التكنولوجيا",
              )}
            />
          </Reveal>
          <Reveal delay={120}>
            <p
              className="body-reading mt-6 max-w-2xl text-[15px]"
              style={{ color: "var(--iw-text-secondary)" }}
            >
              {t(
                "Direct partnerships with world-class international manufacturers for high-pressure pumps, RO membranes, valves, electrical panels, and SCADA automation.",
                "شراكات مباشرة مع كبرى المصانع العالمية المعتمدة لمضخات الضغط العالي، أغشية التناضح العكسي، المحابس، اللوحات الكهربائية، وأنظمة التحكم والسكادا.",
              )}
            </p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="pb-24 md:pb-32">
            <SuppliersShowcase isAr={isAr} />
          </div>
        </Reveal>
      </section>

      {/* SECTION H — TRUST & CLOSING TECHNICAL ENQUIRY */}
      <section className="iw-section-dark">
        <div
          className="mx-auto w-full max-w-[1400px] border-t px-6 py-24 md:px-10 md:py-32"
          style={{ borderColor: "var(--iw-dark-border)" }}
        >
          {/* Corporate Commitment Banner */}
          <div
            className="mb-20 rounded-xl border p-8 md:p-12"
            style={{
              borderColor: "var(--iw-dark-border)",
              backgroundColor: "color-mix(in oklab, var(--iw-dark-bg) 60%, transparent)",
            }}
          >
            <p
              className="label-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--iw-dark-accent)" }}
            >
              {t("Corporate Commitment", "الالتزام المؤسسي والتنفيذي")}
            </p>
            <h2 className="display-lg mt-4 text-[clamp(1.75rem,4vw,3.25rem)] text-white">
              {t(
                "One partner · Full scope · Delivered as agreed.",
                "شريك واحد · مسؤولية شاملة · تسليم بالمعايير المتفق عليها.",
              )}
            </h2>
            <p className="body-reading mt-4 max-w-3xl text-base text-[var(--iw-dark-text-muted)]">
              {t(
                "Eliminating interface gaps between process designers, equipment fabricators, civil teams, and commissioning engineers through end-to-end institutional accountability.",
                "القضاء على فجوات المسؤولية بين مصممي العمليات وموردي المعدات والمقاولين المدنيين ومهندسي التشغيل من خلال إسناد موحد ومسؤولية تنفيذية متكاملة.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {TRUST.map((p) => (
              <div key={p.en}>
                <div className="h-px w-16" style={{ backgroundColor: "var(--iw-dark-accent)" }} />
                <p className="display-md mt-6 text-xl md:text-2xl">{t(p.en, p.ar)}</p>
                <p
                  className="body-reading mt-4 text-sm"
                  style={{ color: "var(--iw-dark-text-muted)" }}
                >
                  {t(p.bodyEn, p.bodyAr)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-5">
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_color-mix(in_oklab,var(--iw-accent)_75%,transparent)]"
              style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
            >
              {t("Submit Technical Enquiry", "طلب استفسار فني")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              to="/$locale/about"
              params={{ locale }}
              className="inline-flex items-center gap-3 rounded-sm border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--iw-dark-accent)]"
              style={{
                backgroundColor: "color-mix(in oklab, var(--iw-dark-bg) 85%, #000)",
                borderColor: "var(--iw-dark-border)",
                color: "var(--iw-dark-text)",
              }}
            >
              {t("About Our Track Record", "عن سابقة أعمالنا")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      <p
        className="label-mono"
        style={{ color: dark ? "var(--iw-dark-accent)" : "var(--iw-accent)" }}
      >
        {eyebrow}
      </p>
      <h2 className="display-lg mt-6 max-w-3xl text-[clamp(2rem,4.5vw,3.75rem)]">{title}</h2>
    </div>
  );
}
