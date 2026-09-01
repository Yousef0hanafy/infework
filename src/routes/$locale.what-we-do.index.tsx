import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Droplets,
  Gauge,
  Recycle,
  Zap,
  Route as RouteIcon,
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Cpu,
  ChevronRight,
  Briefcase,
  Scale,
  Award,
  PenTool,
  PackageCheck,
  HardHat,
  Settings,
  Globe,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { getSector, SECTORS } from "@/lib/sectors";
import { getCapabilities } from "@/lib/public.functions";

const TITLE = "What We Do — Engineering & EPC Capabilities | Infeworks";
const DESC =
  "Institutional EPC contractor delivering national water infrastructure, pump stations, treatment plants, pipelines, and industrial electromechanical systems across Egypt.";

export const Route = createFileRoute("/$locale/what-we-do/")({
  loader: async () => ({ capabilities: await getCapabilities() }),
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
  component: CapabilityIndex,
});

const ICONS: Record<string, LucideIcon> = {
  droplets: Droplets,
  recycle: Recycle,
  gauge: Gauge,
  zap: Zap,
  route: RouteIcon,
  building: Building2,
};

const SECTOR_IMAGES: Record<string, string> = {
  "water-treatment": "/images/projects/sadat-city-ro/cover.webp",
  wastewater: "/images/projects/shubra-shahab-industrial-wastewater/cover.webp",
  "pumping-wells": "/images/projects/qibili-qarun-water-purification/gallery-2.webp",
  "industrial-mep": "/images/projects/ameriya-cold-storage/cover.jpg",
  "infrastructure-networks": "/images/projects/capital-island-infrastructure/cover.webp",
  "civil-buildings": "/images/projects/al-azhar-institute-minya/cover.webp",
};

function CapabilityIndex() {
  const { capabilities } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const [activeSector, setActiveSector] = useState<string>("water-treatment");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id.startsWith("sector-")) {
              setActiveSector(id.replace("sector-", ""));
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      },
    );

    SECTORS.forEach((sector) => {
      const el = document.getElementById(`sector-${sector.slug}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined} className="min-h-screen">
      {/* 1. Editorial Hero Section */}
      <section className="iw-section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url("/images/hero/hero-plant.jpg")' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,14,26,0.85) 0%, rgba(7,14,26,0.95) 60%, var(--iw-dark-deep) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-20 md:px-10 md:pt-44 md:pb-28">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: "var(--iw-dark-accent)" }} />
              <span
                className="label-mono uppercase tracking-widest text-xs"
                style={{ color: "var(--iw-dark-accent)" }}
              >
                {t(
                  "Engineering Scope & Operational Capacities",
                  "المدى الهندسي والقدرات التشغيلية",
                )}
              </span>
            </div>

            <h1 className="display-xl mt-6 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-white">
              {t(
                "What We Do — Technical Capabilities & Delivery Dossier",
                "مجالات أعمالنا وقدراتنا الهندسية والتنفيذية",
              )}
            </h1>

            <p
              className="body-reading mt-8 max-w-3xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--iw-dark-text-muted)" }}
            >
              {t(
                "Infeworks delivers critical national and industrial infrastructure across Egypt. We operate as an integrated general and EPC contractor — taking complete ownership of engineering design, procurement, fabrication, civil execution, testing, and multi-year operations.",
                "تتولى شركة إنفيوركس تنفيذ مشروعات البنية التحتية القومية والصناعية الكبرى في مصر. نعمل كمقاول عام ومقاول تسليم متكامل (EPC) — نتحمل المسؤولية الكاملة عن التصميم الهندسي، والتوريد، والتصنيع، والأعمال المدنية والكهروميكانيكية، والاختبار والتشغيل.",
              )}
            </p>
          </div>

          {/* Key Authority Metrics */}
          <div
            className="mt-16 grid grid-cols-2 gap-8 border-t pt-10 sm:grid-cols-4"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div>
              <div className="display-md text-3xl md:text-4xl text-white font-bold">50+</div>
              <div className="label-mono mt-2 text-xs uppercase text-[var(--iw-dark-text-muted)]">
                {t("Completed Projects", "مشروعاً منجزاً بنجاح")}
              </div>
            </div>
            <div>
              <div className="display-md text-3xl md:text-4xl text-white font-bold">6</div>
              <div className="label-mono mt-2 text-xs uppercase text-[var(--iw-dark-text-muted)]">
                {t("Core Engineering Sectors", "قطاعات هندسية تخصصية")}
              </div>
            </div>
            <div>
              <div className="display-md text-3xl md:text-4xl text-white font-bold">20+</div>
              <div className="label-mono mt-2 text-xs uppercase text-[var(--iw-dark-text-muted)]">
                {t("Years Track Record", "عاماً من الخبرة الهندسية")}
              </div>
            </div>
            <div>
              <div className="display-md text-3xl md:text-4xl text-white font-bold">100%</div>
              <div className="label-mono mt-2 text-xs uppercase text-[var(--iw-dark-text-muted)]">
                {t("Single-Point Accountability", "مسؤولية تعاقدية متكاملة")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contracting & Institutional Delivery Frameworks */}
      <section className="iw-section-light border-b" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl mb-16">
            <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
              {t("Institutional Contracting Models", "أطر التعاقد ونماذج التنفيذ المؤسسي")}
            </p>
            <h2 className="display-lg mt-3 text-3xl md:text-4xl text-[var(--iw-text-primary)] font-bold">
              {t(
                "Engineered for Government & Major Developers",
                "منظومة تنفيذ معتمدة للجهات الرسمية والمطورين",
              )}
            </h2>
            <p className="body-reading mt-4 text-base text-[var(--iw-text-secondary)]">
              {t(
                "We provide flexible, compliant contracting structures tailored to the procurement standards of state ministries, armed forces authorities, and institutional master developers.",
                "نوفر هياكل تعاقدية مرنة ومتوافقة مع معايير ومتطلبات الطرح والترسية لدى الوزارات، والهيئات السيادية، وكبرى شركات التطوير العقاري والصناعي.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* EPC / Turnkey */}
            <div
              className="border p-8 transition-colors hover:border-[var(--iw-accent)]"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <Briefcase className="h-8 w-8 mb-6" style={{ color: "var(--iw-accent)" }} />
              <div className="label-mono text-xs uppercase" style={{ color: "var(--iw-accent)" }}>
                {t("Contract Model 01", "نموذج التعاقد 01")}
              </div>
              <h3 className="display-md mt-2 text-xl text-[var(--iw-text-primary)]">
                {t("Turnkey EPC Delivery", "تسليم مفتاح متكامل (EPC)")}
              </h3>
              <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "Single accountable contract covering process design, hydraulic calculations, equipment procurement, civil construction, panel fabrication, and witnessed performance commissioning.",
                  "عقد موحد وشامل يغطي التصميم الهندسي والهيدروليكي، وتوريد المعدات وتصنيع اللوحات، والأعمال المدنية والتركيبات، والاختبار والتشغيل التجريبي حتى التسليم.",
                )}
              </p>
            </div>

            {/* National Mega-Projects */}
            <div
              className="border p-8 transition-colors hover:border-[var(--iw-accent)]"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <Award className="h-8 w-8 mb-6" style={{ color: "var(--iw-accent)" }} />
              <div className="label-mono text-xs uppercase" style={{ color: "var(--iw-accent)" }}>
                {t("Contract Model 02", "نموذج التعاقد 02")}
              </div>
              <h3 className="display-md mt-2 text-xl text-[var(--iw-text-primary)]">
                {t("Fast-Track State Projects", "مقاولات المشروعات القومية الكبرى")}
              </h3>
              <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "Rapid mobilization and direct contracting for national priority programs (Toshka, Hayah Karima, Sinai development) with high compliance to state technical specifications and tight deadlines.",
                  "سرعة حشد الموارد والمعدات لتنفيذ المشروعات القومية التنموية الكبرى (توشكى، حياة كريمة، تنمية سيناء) مع الالتزام التام بالمواصفات الفنية والجداول الزمنية الحرجة.",
                )}
              </p>
            </div>

            {/* O&M Asset Management */}
            <div
              className="border p-8 transition-colors hover:border-[var(--iw-accent)]"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <Scale className="h-8 w-8 mb-6" style={{ color: "var(--iw-accent)" }} />
              <div className="label-mono text-xs uppercase" style={{ color: "var(--iw-accent)" }}>
                {t("Contract Model 03", "نموذج التعاقد 03")}
              </div>
              <h3 className="display-md mt-2 text-xl text-[var(--iw-text-primary)]">
                {t("Long-Term O&M Agreements", "اتفاقيات التشغيل والصيانة الممتدة")}
              </h3>
              <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "Performance-guaranteed operation agreements ensuring plant output, consumable management, trained resident operating personnel, preventive maintenance schedules, and continuous water quality logging.",
                  "عقود تشغيل وصيانة بضمانات أداء واضحة تشمل إدارة المستهلكات، وتوفير الأطقم الفنية المدربة، والصيانة الوقائية، وتسجيل المؤشرات المعملية دورياً.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Integrated EPC Delivery Lifecycle */}
      <section
        className="iw-section-light border-b bg-[var(--iw-surface)]"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl mb-16">
            <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
              {t("Integrated EPC Lifecycle", "منظومة الهندسة والتنفيذ المتكاملة")}
            </p>
            <h2 className="display-lg mt-3 text-3xl md:text-4xl text-[var(--iw-text-primary)] font-bold">
              {t("End-to-End Technical Delivery", "تحكم كامل في مراحل دورة المشروع")}
            </h2>
            <p className="body-reading mt-4 text-base text-[var(--iw-text-secondary)]">
              {t(
                "As a primary EPC contractor, we do not just assemble; we engineer. Our in-house technical coordination seamlessly bridges the gap between hydraulic models and physical assets.",
                "بصفتنا مقاول عام (EPC)، نحن لا نقوم بالتجميع فحسب، بل نهندس الحلول. يضمن التنسيق الفني الداخلي لدينا جسر الفجوة بين التصميمات والنماذج الهيدروليكية والتنفيذ الفعلي.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
            <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-px bg-[var(--iw-border)]" />

            {/* Stage 1 */}
            <div className="relative pt-8 lg:pt-0">
              <div
                className="absolute left-0 top-0 lg:top-[120px] -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--iw-surface)] border-2 z-10"
                style={{ borderColor: "var(--iw-accent)" }}
              />
              <div
                className="mb-6 lg:mb-12 aspect-[4/3] w-full overflow-hidden rounded-sm border bg-slate-900"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <img
                  src="/images/about/site-eng-team.jpg"
                  alt="Engineering & Design Team"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pr-6">
                <PenTool className="h-6 w-6 mb-4" style={{ color: "var(--iw-accent)" }} />
                <h3 className="display-md text-xl text-[var(--iw-text-primary)]">
                  {t("Engineering & Design", "الهندسة والتصميم")}
                </h3>
                <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                  {t(
                    "Process and hydraulic design, detailed shop drawings, static & dynamic calculation assumptions, and comprehensive multi-disciplinary coordination.",
                    "التصميم الهيدروليكي والعملياتي، إعداد المخططات التنفيذية التفصيلية (Shop Drawings)، مذكرات الحسابات الهندسية، والتنسيق الشامل بين التخصصات.",
                  )}
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative pt-8 lg:pt-0">
              <div
                className="absolute left-0 top-0 lg:top-[120px] -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--iw-surface)] border-2 z-10"
                style={{ borderColor: "var(--iw-accent)" }}
              />
              <div
                className="mb-6 lg:mb-12 aspect-[4/3] w-full overflow-hidden rounded-sm border bg-slate-900"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <img
                  src="/images/about/consltant-team.jpg"
                  alt="Technical Procurement & Consultant Approvals"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pr-6">
                <PackageCheck className="h-6 w-6 mb-4" style={{ color: "var(--iw-accent)" }} />
                <h3 className="display-md text-xl text-[var(--iw-text-primary)]">
                  {t("Technical Procurement", "التوريدات وسلاسل الإمداد")}
                </h3>
                <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                  {t(
                    "Strict BOQ verification, global OEM catalog approvals, materials tracing, and ensuring all components meet demanding specifications.",
                    "المراجعة الدقيقة لجداول الكميات (BOQ)، اعتماد الكتالوجات من كبرى المصانع العالمية، وضمان مطابقة المواد للمواصفات الصارمة.",
                  )}
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative pt-8 lg:pt-0">
              <div
                className="absolute left-0 top-0 lg:top-[120px] -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--iw-surface)] border-2 z-10"
                style={{ borderColor: "var(--iw-accent)" }}
              />
              <div
                className="mb-6 lg:mb-12 aspect-[4/3] w-full overflow-hidden rounded-sm border bg-slate-900"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <img
                  src="/images/about/site-team.webp"
                  alt="Field Engineering & Site Execution"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pr-6">
                <HardHat className="h-6 w-6 mb-4" style={{ color: "var(--iw-accent)" }} />
                <h3 className="display-md text-xl text-[var(--iw-text-primary)]">
                  {t("Site Execution", "التنفيذ والإدارة الميدانية")}
                </h3>
                <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                  {t(
                    "Methodical civil and mechanical installation, active RFI/IR correspondence, field safety management, and accurate quantity surveying.",
                    "التركيبات المدنية والميكانيكية المنهجية، إدارة المراسلات الفنية (RFI/IR)، إدارة السلامة الميدانية، والحصر الدقيق للكميات.",
                  )}
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative pt-8 lg:pt-0">
              <div
                className="absolute left-0 top-0 lg:top-[120px] -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--iw-surface)] border-2 z-10"
                style={{ borderColor: "var(--iw-accent)" }}
              />
              <div
                className="mb-6 lg:mb-12 aspect-[4/3] w-full overflow-hidden rounded-sm border bg-slate-900"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <img
                  src="/images/about/om-team.jpg"
                  alt="Commissioning & O&M Field Engineering"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pr-6">
                <Settings className="h-6 w-6 mb-4" style={{ color: "var(--iw-accent)" }} />
                <h3 className="display-md text-xl text-[var(--iw-text-primary)]">
                  {t("Commissioning & O&M", "الاختبار، التشغيل، والتسليم")}
                </h3>
                <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                  {t(
                    "Hydrostatic testing, Factory Acceptance Tests (FAT), system flushing, performance verification, and long-term operator training.",
                    "الاختبارات الهيدروستاتيكية، اختبارات المصنع (FAT)، غسيل الشبكات، التحقق من الأداء، وتدريب مشغلي المحطات.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. National Scale & Project Footprint */}
      <section
        className="iw-section-light border-b bg-[var(--iw-bg)]"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
                {t("National Footprint", "حجم الأعمال والمشروعات القومية")}
              </p>
              <h2 className="display-lg mt-3 text-3xl md:text-4xl text-[var(--iw-text-primary)] font-bold">
                {t(
                  "Trusted on Egypt's Most Critical Infrastructure",
                  "الخيار الموثوق لمشروعات البنية التحتية الحرجة في مصر",
                )}
              </h2>
              <p className="body-reading mt-6 text-base text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "We have successfully delivered complex infrastructure systems for high-profile national programs including the Toshka Agricultural Reclamation, Hayah Karima initiatives, Sisi City developments, and major Armed Forces Engineering Authority (AFEA) assignments.",
                  "قمنا بتنفيذ وتسليم أنظمة بنية تحتية معقدة لبرامج قومية كبرى، شملت الاستصلاح الزراعي في توشكى، ومبادرات حياة كريمة، ومشروعات مدينة السيسي، والتكليفات الكبرى للهيئة الهندسية للقوات المسلحة.",
                )}
              </p>
              <p className="body-reading mt-4 text-base text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "By integrating our operations with global Tier-1 OEMs and enforcing rigorous compliance, we minimize risk and ensure asset longevity for government bodies and private master developers (e.g. Palm Hills).",
                  "من خلال دمج عملياتنا مع كبرى المصانع العالمية (OEMs) وتطبيق معايير صارمة، نضمن تقليل المخاطر وإطالة العمر الافتراضي للأصول لصالح الجهات الحكومية والمطورين العقاريين الكبار (مثل بالم هيلز).",
                )}
              </p>
              <div className="mt-8 flex gap-4">
                <div
                  className="flex items-center gap-2 label-mono text-xs uppercase"
                  style={{ color: "var(--iw-text-primary)" }}
                >
                  <Globe className="h-4 w-4" style={{ color: "var(--iw-accent)" }} />
                  {t("Global Supply Chain", "سلاسل إمداد عالمية")}
                </div>
                <div
                  className="flex items-center gap-2 label-mono text-xs uppercase"
                  style={{ color: "var(--iw-text-primary)" }}
                >
                  <MapPin className="h-4 w-4" style={{ color: "var(--iw-accent)" }} />
                  {t("Nationwide Delivery", "تغطية على مستوى الجمهورية")}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div
                className="aspect-[4/3] w-full overflow-hidden border rounded-sm bg-slate-900 shadow-lg"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <img
                  src="/images/projects/toshka-farm-potable-water-plant/cover.webp"
                  alt="Toshka Infrastructure Pumping & Purification Plant"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 p-6 border shadow-md"
                style={{ backgroundColor: "var(--iw-surface)", borderColor: "var(--iw-border)" }}
              >
                <div className="display-md text-4xl text-[var(--iw-text-primary)] font-bold">
                  1,000,000+
                </div>
                <div className="label-mono text-xs text-[var(--iw-text-secondary)] mt-1 uppercase">
                  {t("m³/day Combined Capacity", "م³/يوم إجمالي طاقات التصرف")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Capabilities Matrix (Detailed Sector Portfolios) */}
      <section className="iw-section-light bg-[var(--iw-bg)]">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b"
            style={{ borderColor: "var(--iw-border)" }}
          >
            <div>
              <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
                {t("Comprehensive Engineering Disciplines", "القطاعات الهندسية التخصصية")}
              </p>
              <h2 className="display-lg mt-3 text-3xl md:text-5xl text-[var(--iw-text-primary)] font-bold">
                {t("Detailed Capability Tracks", "تفاصيل القطاعات ومسارات التنفيذ")}
              </h2>
            </div>
            <p className="body-reading mt-4 md:mt-0 max-w-md text-sm text-[var(--iw-text-secondary)]">
              {t(
                "Select a sector to explore its technical processes, scope of works, and delivered projects.",
                "اختر قطاعاً لاستعراض المراحل الهندسية المعتمدة ونطاق الأعمال والمشروعات المنفذة.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-16 items-start">
            {/* Sticky Navigation Sidebar */}
            <div className="hidden lg:block sticky top-28 space-y-1">
              <p className="label-mono mb-4 text-xs uppercase text-[var(--iw-text-secondary)]">
                {t("Direct Navigation", "الانتقال السريع للقطاع")}
              </p>
              {SECTORS.map((s) => {
                const Icon = ICONS[s.icon] || Droplets;
                const isActive = activeSector === s.slug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => {
                      setActiveSector(s.slug);
                      const el = document.getElementById(`sector-${s.slug}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`w-full flex items-center justify-between p-3.5 text-start text-sm font-medium transition-colors border ${
                      isActive
                        ? "bg-[var(--iw-dark-deep)] text-white border-transparent"
                        : "bg-transparent text-[var(--iw-text-primary)] hover:bg-[var(--iw-surface)] border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-4 w-4"
                        style={{ color: isActive ? "var(--iw-dark-accent)" : "var(--iw-accent)" }}
                      />
                      <span>{isAr ? s.ar : s.en}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 opacity-50 ${isAr ? "rotate-180" : ""}`} />
                  </button>
                );
              })}
            </div>

            {/* Deep Sector Blocks */}
            <div className="space-y-20">
              {SECTORS.map((sector) => {
                const Icon = ICONS[sector.icon] || Droplets;
                const img = SECTOR_IMAGES[sector.slug] || "/images/hero/hero-mega.jpg";

                return (
                  <div
                    key={sector.slug}
                    id={`sector-${sector.slug}`}
                    className="scroll-mt-28 border p-8 md:p-12 transition-shadow hover:shadow-md"
                    style={{
                      borderColor: "var(--iw-border)",
                      backgroundColor: "var(--iw-surface)",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded border"
                          style={{
                            borderColor: "var(--iw-border)",
                            backgroundColor: "var(--iw-bg)",
                          }}
                        >
                          <Icon className="h-6 w-6" style={{ color: "var(--iw-accent)" }} />
                        </div>
                        <div>
                          <h3 className="display-md text-2xl md:text-3xl text-[var(--iw-text-primary)]">
                            {isAr ? sector.ar : sector.en}
                          </h3>
                          <p
                            className="label-mono mt-1 text-xs font-semibold"
                            style={{ color: "var(--iw-accent)" }}
                          >
                            {isAr ? sector.metric.ar : sector.metric.en}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/$locale/what-we-do/$sector"
                        params={{ locale, sector: sector.slug }}
                        className="label-mono inline-flex items-center gap-2 text-xs font-semibold uppercase px-4 py-2 border transition-colors text-[var(--iw-text-primary)] hover:bg-[var(--iw-dark-deep)] hover:text-white"
                        style={{ borderColor: "var(--iw-border)" }}
                      >
                        <span>{t("Technical Deep-Dive", "التفاصيل الفنية الكاملة")}</span>
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </Link>
                    </div>

                    {/* Content Grid: Photo + Description */}
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
                      <div
                        className="md:col-span-5 relative aspect-[16/10] md:aspect-auto overflow-hidden border"
                        style={{ borderColor: "var(--iw-border)" }}
                      >
                        <img
                          src={img}
                          alt={isAr ? sector.ar : sector.en}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="md:col-span-7 flex flex-col justify-between">
                        <div>
                          <p className="body-reading text-base leading-relaxed text-[var(--iw-text-secondary)]">
                            {isAr ? sector.intro.ar : sector.intro.en}
                          </p>

                          {/* Process Stages Preview */}
                          <div className="mt-6">
                            <p className="label-mono text-xs uppercase text-[var(--iw-text-primary)] font-semibold mb-3">
                              {t("Key Engineering Stages:", "المراحل الهندسية المعتمدة:")}
                            </p>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                              {sector.process.slice(0, 4).map((p) => (
                                <div
                                  key={p.key}
                                  className="flex items-start gap-2 text-xs text-[var(--iw-text-secondary)]"
                                >
                                  <CheckCircle2
                                    className="h-3.5 w-3.5 mt-0.5 shrink-0"
                                    style={{ color: "var(--iw-accent)" }}
                                  />
                                  <span>{isAr ? p.name.ar : p.name.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Equipment / Scope Tag list */}
                        {sector.equipment && sector.equipment.length > 0 && (
                          <div
                            className="mt-8 pt-6 border-t"
                            style={{ borderColor: "var(--iw-border)" }}
                          >
                            <span className="label-mono text-[11px] text-[var(--iw-text-secondary)] uppercase block mb-2">
                              {t("Core Systems Handled:", "الأنظمة والمعدات المشمولة:")}
                            </span>
                            <p className="text-xs text-[var(--iw-text-primary)] leading-normal line-clamp-2">
                              {isAr ? sector.equipment[0]?.items.ar : sector.equipment[0]?.items.en}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Engineering Standards, Quality & Compliance Section */}
      <section className="iw-section-light border-t" style={{ borderColor: "var(--iw-border)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
              {t(
                "Institutional Compliance & QA Standards",
                "معايير الجودة والامتثال للأكواد الهندسية",
              )}
            </p>
            <h2 className="display-lg mt-4 text-3xl md:text-4xl text-[var(--iw-text-primary)] font-bold">
              {t(
                "Tested, Witnessed, and Certified Delivery",
                "اختبارات موثقة ومطابقة تامة للمواصفات",
              )}
            </h2>
            <p className="body-reading mt-4 text-base text-[var(--iw-text-secondary)]">
              {t(
                "We adhere to national environmental regulations and international engineering codes across all civil, mechanical, and electrical installations.",
                "نلتزم بالقوانين البيئية المصرية والأكواد الهندسية المعتمدة في كافة الأعمال المدنية والميكانيكية والكهربائية.",
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div
              className="border p-8"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <ShieldCheck className="h-8 w-8 mb-4" style={{ color: "var(--iw-accent)" }} />
              <h3 className="display-md text-lg text-[var(--iw-text-primary)]">
                {t(
                  "Hydrostatic & Surge Pressure Testing",
                  "اختبارات الضغط الهيدروستاتيكي والصدمات",
                )}
              </h3>
              <p className="body-reading mt-2 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "All transmission pipelines, manifold assemblies, and pressure vessels undergo rigorous hydrostatic testing witnessed and certified by supervising consultants.",
                  "تخضع خطوط النقل والمجمعات الميكانيكية وأوعية الضغط لاختبارات ضغط هيدروستاتيكي موثقة ومعتمدة من الاستشاري المشرف قبل الردم والتشغيل.",
                )}
              </p>
            </div>

            <div
              className="border p-8"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <Cpu className="h-8 w-8 mb-4" style={{ color: "var(--iw-accent)" }} />
              <h3 className="display-md text-lg text-[var(--iw-text-primary)]">
                {t("Factory Acceptance Tests (FAT)", "اختبارات القبول بالمصنع للوحات التحكم")}
              </h3>
              <p className="body-reading mt-2 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "Every MCC and PLC automation panel is assembled in-house with full point-to-point wiring checks, thermographic inspection, and interlock simulations.",
                  "يتم تجميع لوحات MCC وPLC داخلياً مع إجراء فحص كامل للأسلاك، واختبارات حرارية، ومحاكاة دقيقة لبرمجيات التعاشق والحماية قبل التوريد للموقع.",
                )}
              </p>
            </div>

            <div
              className="border p-8"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <FileCheck2 className="h-8 w-8 mb-4" style={{ color: "var(--iw-accent)" }} />
              <h3 className="display-md text-lg text-[var(--iw-text-primary)]">
                {t("Environmental Law Compliance", "المطابقة للقوانين البيئية والاشتراطات")}
              </h3>
              <p className="body-reading mt-2 text-sm text-[var(--iw-text-secondary)] leading-relaxed">
                {t(
                  "Rigorous water laboratory analyses ensuring full compliance with Egyptian Environmental Law 48/1982 and Law 93/1962 for safe municipal and industrial discharge.",
                  "تحاليل معملية شاملة تضمن مطابقة مياه الصرف المعالجة للقانون 48 لسنة 1982 والقانون 93 لسنة 1962 للتصريف الآمن وإعادة الاستخدام.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct Technical Consultation CTA */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 text-center md:px-10 md:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="display-lg text-3xl md:text-5xl font-bold text-white">
              {t("Have a Technical Project in Mind?", "هل لديك مشروع يتطلب دراسة هندسية؟")}
            </h2>
            <p className="body-reading mx-auto mt-6 max-w-2xl text-[var(--iw-dark-text-muted)] text-base md:text-lg">
              {t(
                "Submit your load parameters, raw water data, or site drawings to our technical desk for preliminary engineering assessment.",
                "أرسل معايير الأحمال، أو تحاليل المياه الخام، أو المخططات المساحية إلى مكتبنا الفني للحصول على تقييم هندسي أولي.",
              )}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/$locale/contact"
                params={{ locale }}
                search={{ type: "technical" }}
                className="inline-flex items-center gap-3 px-8 py-4 transition-colors font-semibold"
                style={{ backgroundColor: "var(--iw-dark-accent)", color: "var(--iw-dark-deep)" }}
              >
                <span className="label-mono text-xs uppercase tracking-wider">
                  {t("Submit Technical Enquiry", "تقديم استفسار فني")}
                </span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
