import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Droplets, Gauge, Recycle, Sprout, Wrench, Zap, type LucideIcon } from "lucide-react";

import SectorSchematic from "@/components/infeworks/SectorSchematic";
import { getSector } from "@/lib/sectors";
import { getFlagshipProjects } from "@/lib/flagship-projects";
import { getProjectMeta } from "@/lib/project-meta";
import { getPublicProjects } from "@/lib/public.functions";

export const Route = createFileRoute("/$locale/what-we-do/$sector")({
  loader: async ({ params }) => {
    const sector = getSector(params.sector);
    if (!sector) throw notFound();
    const published = await getPublicProjects({ data: { locale: params.locale } }).catch(() => []);
    return { published };
  },
  head: ({ params }) => {
    const sector = getSector(params.sector);
    const name = sector ? sector.en : "Capability";
    const title = `${name} — Infeworks`;
    const desc = sector
      ? sector.defEn
      : "Infeworks engineering capability — water and wastewater infrastructure in Egypt.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SectorPage,
});

const ICONS: Record<string, LucideIcon> = {
  droplets: Droplets,
  recycle: Recycle,
  gauge: Gauge,
  sprout: Sprout,
  zap: Zap,
};

function SectorPage() {
  const { published } = Route.useLoaderData();
  const { locale, sector: slug } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const sector = getSector(slug)!;

  const allProjects = published && published.length > 0 ? published : getFlagshipProjects(locale);
  const relatedProjects = allProjects.filter((p) => p.capability_slugs.includes(slug));

  const SectorIcon = ICONS[sector.icon] ?? Droplets;

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      {/* SECTION 1: HERO & SCHEMATIC */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-40">
          <Link
            to="/$locale/what-we-do"
            params={{ locale }}
            className="label-mono inline-flex items-center gap-2 transition-colors hover:text-[var(--iw-dark-accent)]"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {t("All Capabilities", "جميع القدرات والتخصصات")}
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <SectorIcon className="h-8 w-8 shrink-0" style={{ color: "var(--iw-dark-accent)" }} />
            <span
              className="label-mono rounded-full border px-3.5 py-1 text-xs"
              style={{
                borderColor: "var(--iw-dark-border)",
                color: "var(--iw-dark-accent)",
              }}
            >
              {isAr ? sector.metric.ar : sector.metric.en}
            </span>
          </div>
          <h1 className="display-xl mt-6 max-w-4xl text-[clamp(2.25rem,6vw,5rem)]">
            {isAr ? sector.ar : sector.en}
          </h1>
          <p
            className="body-reading mt-6 max-w-3xl text-lg leading-relaxed"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {isAr ? sector.intro.ar : sector.intro.en}
          </p>

          <div className="mt-16 border-t pt-10" style={{ borderColor: "var(--iw-dark-border)" }}>
            <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
              {t("Engineering Flow Sequence", "المخطط الهندسي وتسلسل العمليات")}
            </p>
            <SectorSchematic slug={sector.slug} isAr={isAr} className="mt-6" />
          </div>
        </div>
      </section>

      {/* SECTION 2: ENGINEERING PROCESS & DELIVERABLES */}
      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div>
            <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
              {t("Delivery Scope", "نطاق التنفيذ الهندسي")}
            </p>
            <h2 className="display-lg mt-4 max-w-3xl text-[clamp(1.75rem,4vw,3rem)]">
              {t("Stage-by-Stage Engineering Execution", "مراحل التنفيذ الفني المتكامل")}
            </h2>
            <p className="body-reading mt-4 max-w-2xl text-[var(--iw-text-secondary)]">
              {t(
                "Every plant stage is engineered, built, and tested in-house with documented quality gates from intake to handover.",
                "يتم تصميم وتنفيذ واختبار كل مرحلة ذاتياً بأطقمنا الهندسية مع بوابات جودة موثقة من المأخذ حتى التسليم.",
              )}
            </p>
          </div>

          <div
            className="mt-14 border-t border-s"
            style={{ borderColor: "var(--iw-border)" }}
          >
            {sector.process.map((stage, i) => (
              <div
                key={stage.key}
                className="grid gap-6 border-b border-e p-6 md:grid-cols-[6rem_16rem_1fr] md:gap-8 md:p-8"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <span
                  className="label-mono text-lg font-bold"
                  style={{ color: "var(--iw-accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display-md text-xl md:text-2xl">
                    {isAr ? stage.name.ar : stage.name.en}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--iw-text-secondary)]">
                    {isAr ? stage.detail.ar : stage.detail.en}
                  </p>
                </div>
                <div>
                  <ul className="space-y-2.5">
                    {stage.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--iw-text-secondary)]"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--iw-accent)" }}
                        />
                        <span>{isAr ? step.ar : step.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sourced Equipment & Systems */}
          {sector.equipment.length > 0 ? (
            <div className="mt-20">
              <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
                {t("Technology & Systems", "المعدات والأنظمة المتكاملة")}
              </p>
              <h3 className="display-md mt-4 text-2xl md:text-3xl">
                {t("Engineered Equipment Packages", "حزم التوريدات والمعدات الهندسية")}
              </h3>

              <div
                className="mt-8 grid grid-cols-1 border-t border-s sm:grid-cols-2 lg:grid-cols-3"
                style={{ borderColor: "var(--iw-border)" }}
              >
                {sector.equipment.map((eq) => (
                  <div
                    key={eq.category.en}
                    className="border-b border-e bg-[var(--iw-surface)] p-6 md:p-8"
                    style={{ borderColor: "var(--iw-border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" style={{ color: "var(--iw-accent)" }} />
                      <h4 className="display-md text-lg">
                        {isAr ? eq.category.ar : eq.category.en}
                      </h4>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-[var(--iw-text-secondary)]">
                      {isAr ? eq.items.ar : eq.items.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* SECTION 3: RELATED DELIVERED PROJECTS */}
      <section className="iw-section-surface">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="label-mono" style={{ color: "var(--iw-accent)" }}>
                {t("Proven Execution", "التنفيذ الواقعي")}
              </p>
              <h2 className="display-lg mt-4 text-[clamp(1.75rem,4vw,3rem)]">
                {t("Delivered Projects in This Sector", "مشروعات منفذة في هذا القطاع")}
              </h2>
            </div>
            <Link
              to="/$locale/work"
              params={{ locale }}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors hover:text-[var(--iw-accent)]"
            >
              {t("View all portfolio", "عرض كل المشروعات")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => {
                const meta = getProjectMeta(p.slug);
                return (
                  <Link
                    key={p.project_id}
                    to="/$locale/work/$slug"
                    params={{ locale, slug: p.slug }}
                    className="group flex flex-col justify-between border bg-[var(--iw-surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{ borderColor: "var(--iw-border)" }}
                  >
                    {meta ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--iw-surface-alt)]">
                        <img
                          src={meta.cover}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span
                          className="label-mono absolute top-0 px-3.5 py-2 text-xs"
                          style={{
                            backgroundColor: "var(--iw-dark-bg)",
                            color: "var(--iw-dark-accent)",
                          }}
                        >
                          {isAr ? meta.capacity.ar : meta.capacity.en}
                        </span>
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                      <div>
                        <h3 className="display-md text-xl md:text-2xl">{p.title}</h3>
                        {meta ? (
                          <p className="label-mono mt-2 text-xs" style={{ color: "var(--iw-accent)" }}>
                            {isAr ? meta.client.ar : meta.client.en}
                          </p>
                        ) : null}
                        {p.challenge ? (
                          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[var(--iw-text-secondary)]">
                            {p.challenge}
                          </p>
                        ) : null}
                      </div>
                      <span
                        className="label-mono mt-6 inline-flex items-center gap-2 text-xs font-semibold"
                        style={{ color: "var(--iw-accent)" }}
                      >
                        {t("Case study & specs", "دراسة الحالة والمواصفات")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              className="mt-8 border p-10 text-center md:p-16"
              style={{
                borderColor: "var(--iw-border)",
                backgroundColor: "var(--iw-surface-alt)",
              }}
            >
              <p className="body-reading text-[var(--iw-text-secondary)]">
                {t(
                  "Discuss your custom facility requirements with our engineering team.",
                  "ناقش متطلبات محطتك الخاصة مع فريقنا الهندسي مباشرة.",
                )}
              </p>
              <Link
                to="/$locale/contact"
                params={{ locale }}
                className="mt-6 inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)]"
                style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
              >
                {t("Submit Technical Enquiry", "طلب استفسار فني")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 className="display-lg max-w-3xl text-[clamp(1.75rem,4vw,3.25rem)]">
            {t(
              `Ready to engineer your ${sector.en.toLowerCase()} infrastructure?`,
              `هل ترغب في تنفيذ مشروعك في مجال ${sector.ar}؟`,
            )}
          </h2>
          <p className="body-reading mt-4 max-w-2xl text-[var(--iw-dark-text-muted)]">
            {t(
              "Single accountable contract covering process design, supply, civil works, installation, commissioning, and operation.",
              "عقد واحد بمسؤولية كاملة يشمل التصميم والتوريد والأعمال المدنية والتركيب والتشغيل التجريبي والصيانة.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
            >
              {t("Submit Technical Enquiry", "طلب استفسار فني")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a
              href="/downloads/infeworks-company-profile.pdf"
              download="infeworks-company-profile.pdf"
              className="iw-glass-dark inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:-translate-y-0.5"
              style={{ color: "var(--iw-dark-text)" }}
            >
              {t("Download Company Profile", "تحميل ملف الشركة")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
