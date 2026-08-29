import { Suspense, lazy } from "react";
import { ClientOnly, Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";

import SectorSchematic from "@/components/infeworks/SectorSchematic";
import ParallaxImage from "@/components/infeworks/ParallaxImage";
import { SECTORS, type SectorSlug } from "@/lib/sectors";
import { getProjectMeta } from "@/lib/project-meta";
import { getFlagshipDetail } from "@/lib/flagship-projects";

import { getPublicProjectBySlug } from "@/lib/public.functions";

const EgyptMap = lazy(() => import("@/components/infeworks/EgyptMap"));


export const Route = createFileRoute("/$locale/work/$slug")({
  loader: async ({ params }) => {
    const detail = await getPublicProjectBySlug({
      data: { slug: params.slug, locale: params.locale },
    });
    const resolved = detail ?? getFlagshipDetail(params.slug, params.locale);
    if (!resolved) throw notFound();
    return resolved;
  },

  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.project.title} — Infeworks`
      : "Case Study — Infeworks";
    const description =
      loaderData?.project.challenge?.slice(0, 155) ??
      loaderData?.project.outcome?.slice(0, 155) ??
      "Infeworks project case study — scope, execution, and outcome of a delivered water infrastructure facility.";
    const image = loaderData?.media[0]?.url;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: CaseStudyNotFound,
  errorComponent: CaseStudyNotFound,
});

function CaseStudyNotFound() {
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  return (
    <div className="iw-section-dark" style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-40 pb-32 md:px-10">
        <h1 className="display-xl text-[clamp(2rem,5vw,4rem)]">
          {isAr ? "دراسة الحالة غير متاحة" : "Case study not available"}
        </h1>
        <p className="body-reading mt-6 max-w-xl" style={{ color: "var(--iw-dark-text-muted)" }}>
          {isAr
            ? "هذه الدراسة لم تُنشر بعد أو تم نقلها."
            : "This record is not published yet, or has moved."}
        </p>
        <Link
          to="/$locale/work"
          params={{ locale }}
          className="mt-10 inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide uppercase"
          style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
        >
          {isAr ? "كل الأعمال" : "All work"}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}

function CaseStudyPage() {
  const { project, location, claims, media } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const meta = getProjectMeta(project.slug);

  const schematicSlug = (SECTORS.find((s) =>
    project.capability_slugs.includes(s.slug),
  )?.slug ?? "water-treatment") as SectorSlug;

  const facts = [
    ...(meta
      ? [
          { label: t("Client", "جهة التعاقد"), value: isAr ? meta.client.ar : meta.client.en },
          ...(meta.consultant
            ? [
                {
                  label: t("Consultant", "الاستشاري"),
                  value: isAr ? meta.consultant.ar : meta.consultant.en,
                },
              ]
            : []),
          { label: t("Capacity", "الطاقة"), value: isAr ? meta.capacity.ar : meta.capacity.en },
          { label: t("Scope", "نطاق العمل"), value: isAr ? meta.scope.ar : meta.scope.en },
          { label: t("Delivered", "سنة التنفيذ"), value: meta.year },
        ]
      : []),
    {
      label: t("Location", "الموقع"),
      value: location?.display_name ?? (meta ? (isAr ? meta.region.ar : meta.region.en) : "—"),
    },
    ...(project.capability_slugs.length > 0
      ? [
          {
            label: t("Disciplines", "التخصصات"),
            value: project.capability_slugs
              .map((s) => {
                const sec = SECTORS.find((x) => x.slug === s);
                return sec ? (isAr ? sec.ar : sec.en) : s;
              })
              .join(" · "),
          },
        ]
      : []),
  ];

  const hero = media[0]?.url ?? meta?.cover;
  const heroAlt = media[0]?.alt ?? project.title;
  const gallery = media.length > 1 ? media.slice(1).map((m) => m.url) : (meta?.gallery ?? []);


  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      {/* Dark engineering header */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-40">
          <Link
            to="/$locale/work"
            params={{ locale }}
            className="label-mono"
            style={{ color: "var(--iw-dark-accent)" }}
          >
            {t("Selected Work", "أعمال مختارة")}
          </Link>
          <h1 className="display-xl mt-8 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)]">
            {project.title}
          </h1>
          <div
            className="mt-12 grid grid-cols-2 gap-8 border-t pt-8 md:grid-cols-4"
            style={{ borderColor: "var(--iw-dark-border)" }}
          >
            {facts.map((f) => (
              <div key={f.label}>
                <p className="label-mono" style={{ color: "var(--iw-dark-text-muted)" }}>
                  {f.label}
                </p>
                <p className="display-md mt-3 text-lg">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body + facts sidebar */}
      <section className="iw-section-light">
        <div className="mx-auto grid w-full max-w-[1400px] gap-16 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            {hero ? (
              <ParallaxImage src={hero} alt={heroAlt} className="mb-16" ratio="16/9" />
            ) : null}


            {project.challenge ? (
              <>
                <h2 className="display-md text-2xl md:text-3xl">{t("The Challenge", "التحدي")}</h2>
                <p className="body-reading mt-6 max-w-3xl text-lg text-[var(--iw-text-secondary)]">
                  {project.challenge}
                </p>
              </>
            ) : null}

            {claims.length > 0 ? (
              <>
                <h2 className="display-md mt-16 text-2xl md:text-3xl">
                  {t("Scope & Delivery", "نطاق العمل والتنفيذ")}
                </h2>
                <div className="mt-8 border-t border-s" style={{ borderColor: "var(--iw-border)" }}>
                  {claims.map((claim, i) => (
                    <div
                      key={claim.id}
                      className="flex flex-col gap-2 border-b border-e p-6 md:flex-row md:gap-8"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <span className="label-mono w-16 shrink-0 text-[var(--iw-text-secondary)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="body-reading text-[var(--iw-text-secondary)]">
                        {claim.content}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {/* Authored process schematic */}
            <h2 className="display-md mt-16 text-2xl md:text-3xl">
              {t("Process Schematic", "المخطط الهندسي للعملية")}
            </h2>
            <p className="body-reading mt-6 max-w-3xl text-[var(--iw-text-secondary)]">
              {t(
                "The treatment and transfer sequence applied on this facility, drawn at concept level.",
                "تسلسل المعالجة والنقل المطبق في هذه المحطة، معروض على المستوى المفاهيمي.",
              )}
            </p>
            <SectorSchematic slug={schematicSlug} isAr={isAr} className="mt-8" />

            {gallery.length > 0 ? (
              <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {gallery.map((url) => (
                  <ParallaxImage
                    key={url}
                    src={url}
                    alt={project.title}
                    ratio="4/3"
                    strength={0.08}
                  />
                ))}
              </div>
            ) : null}

            {project.outcome ? (
              <>
                <h2 className="display-md mt-16 text-2xl md:text-3xl">{t("Outcome", "النتيجة")}</h2>
                <p className="body-reading mt-6 max-w-3xl text-lg text-[var(--iw-text-secondary)]">
                  {project.outcome}
                </p>
              </>
            ) : null}
          </div>

          {/* Facts sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="border p-6"
              style={{
                borderColor: "var(--iw-border)",
                backgroundColor: "var(--iw-surface)",
              }}
            >
              <p className="label-mono text-[var(--iw-text-secondary)]">
                {t("Project Facts", "بيانات المشروع")}
              </p>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div key={f.label} className="border-t pt-4" style={{ borderColor: "var(--iw-border)" }}>
                    <dt className="label-mono text-[var(--iw-text-secondary)]">{f.label}</dt>
                    <dd className="mt-2 text-base font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="/downloads/infeworks-company-profile.pdf"
                download="infeworks-company-profile.pdf"
                className="label-mono mt-6 inline-flex items-center gap-3 border px-4 py-3 transition-colors hover:border-[var(--iw-accent)]"
                style={{ borderColor: "var(--iw-border)", color: "var(--iw-accent)" }}
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {t("Download profile (PDF)", "تحميل ملف الشركة (PDF)")}
              </a>
            </div>


            {location ? (
              <div
                className="mt-8 h-64 w-full overflow-hidden border"
                style={{
                  borderColor: "var(--iw-border)",
                  backgroundColor: "var(--iw-surface-alt)",
                }}
              >
                <ClientOnly fallback={null}>
                  <Suspense fallback={null}>
                    <EgyptMap
                      center={[location.lat, location.lng]}
                      zoom={9}
                      markers={[
                        { lat: location.lat, lng: location.lng, label: location.display_name },
                      ]}
                    />
                  </Suspense>
                </ClientOnly>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 className="display-xl max-w-3xl text-[clamp(1.75rem,4vw,3.25rem)]">
            {t("Build with one accountable partner.", "ابنِ مع شريك واحد مسؤول.")}
          </h2>
          <Link
            to="/$locale/contact"
            params={{ locale }}
            className="mt-10 inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
          >
            {t("Submit Technical Enquiry", "طلب استفسار فني")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
