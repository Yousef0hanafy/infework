import { Suspense, lazy } from "react";
import { ClientOnly, Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";

import SectorSchematic from "@/components/infeworks/SectorSchematic";
import ParallaxImage from "@/components/infeworks/ParallaxImage";
import { SECTORS, type SectorSlug } from "@/lib/sectors";
import { getProjectMeta } from "@/lib/project-meta";
import { getFlagshipDetail } from "@/lib/flagship-projects";

import { getPublicProjectBySlug } from "@/lib/public.functions";

const ProjectLocationMap = lazy(() => import("@/components/infeworks/ProjectLocationMap"));

export const Route = createFileRoute("/$locale/work/$slug")({
  loader: async ({ params }) => {
    const detail = await getPublicProjectBySlug({
      data: { slug: params.slug, locale: params.locale },
    });
    const resolved = detail ?? getFlagshipDetail(params.slug, params.locale);
    if (!resolved) throw notFound();
    return resolved;
  },

  head: ({ loaderData, params }) => {
    const isAr = params?.locale === "ar";
    const suffix = isAr ? "إنفيوركس" : "Infeworks";
    const fallbackTitle = isAr ? "دراسة حالة لمشروع — إنفيوركس" : "Case Study — Infeworks";
    const title = loaderData ? `${loaderData.project.title} — ${suffix}` : fallbackTitle;
    const description =
      loaderData?.project.challenge?.slice(0, 155) ??
      loaderData?.project.outcome?.slice(0, 155) ??
      (isAr
        ? "دراسة حالة لمشروع من إنفيوركس — نطاق الأعمال والتنفيذ والنتائج لمشروعات البنية التحتية للمياه في مصر."
        : "Infeworks project case study — scope, execution, and outcome of a delivered water infrastructure facility.");
    const meta = loaderData?.project ? getProjectMeta(loaderData.project.slug) : undefined;
    const rawImage = loaderData?.media[0]?.url ?? meta?.cover;
    const absImage = rawImage
      ? rawImage.startsWith("http")
        ? rawImage
        : `https://infeworks.com${rawImage}`
      : "https://infeworks.com/logo.png";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: absImage },
        { property: "og:image:alt", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: absImage },
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
    <div
      className="iw-section-dark"
      style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}
    >
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
  const { project, location, claims, media, facts: serverFacts, schema } = Route.useLoaderData();
  const { locale, slug } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const meta = getProjectMeta(project.slug);

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.challenge || project.outcome || project.title,
    url: `https://infeworks.com/${locale}/work/${slug}`,
    inLanguage: isAr ? "ar-EG" : "en-EG",
    image: project.cover_url
      ? project.cover_url.startsWith("http")
        ? project.cover_url
        : `https://infeworks.com${project.cover_url}`
      : meta?.cover
        ? meta.cover.startsWith("http")
          ? meta.cover
          : `https://infeworks.com${meta.cover}`
        : undefined,
    locationCreated: location
      ? {
          "@type": "Place",
          name: location.display_name,
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.lat,
            longitude: location.lng,
          },
        }
      : undefined,
    customer: (serverFacts?.client || meta?.client)
      ? {
          "@type": "Organization",
          name: serverFacts?.client || (isAr ? meta?.client?.ar : meta?.client?.en),
        }
      : undefined,
    contributor: (serverFacts?.consultant || meta?.consultant)
      ? {
          "@type": "Organization",
          name: serverFacts?.consultant || (isAr ? meta?.consultant?.ar : meta?.consultant?.en),
        }
      : undefined,
    provider: {
      "@type": "Corporation",
      name: "Infeworks — International for Engineering Works",
      url: "https://infeworks.com",
    },
  };

  const schematicSlug = project.capability_slugs?.find((slug) =>
    SECTORS.some((s) => s.slug === slug),
  ) as SectorSlug | undefined;

  const facts = [
    ...(serverFacts?.client
      ? [{ label: t("Client", "جهة التعاقد"), value: serverFacts.client }]
      : meta?.client
        ? [{ label: t("Client", "جهة التعاقد"), value: isAr ? meta.client.ar : meta.client.en }]
        : []),
    ...(serverFacts?.consultant
      ? [{ label: t("Consultant", "الاستشاري"), value: serverFacts.consultant }]
      : meta?.consultant
        ? [{ label: t("Consultant", "الاستشاري"), value: isAr ? meta.consultant.ar : meta.consultant.en }]
        : []),
    ...(serverFacts?.capacity
      ? [{ label: t("Capacity", "الطاقة"), value: serverFacts.capacity }]
      : meta?.capacity
        ? [{ label: t("Capacity", "الطاقة"), value: isAr ? meta.capacity.ar : meta.capacity.en }]
        : []),
    ...(serverFacts?.scope
      ? [{ label: t("Scope", "نطاق العمل"), value: serverFacts.scope }]
      : meta?.scope
        ? [{ label: t("Scope", "نطاق العمل"), value: isAr ? meta.scope.ar : meta.scope.en }]
        : []),
    ...(serverFacts?.year
      ? [{ label: t("Delivered", "سنة التنفيذ"), value: serverFacts.year }]
      : meta?.year
        ? [{ label: t("Delivered", "سنة التنفيذ"), value: meta.year }]
        : []),
    {
      label: t("Location", "الموقع"),
      value:
        location?.display_name ??
        (serverFacts?.region ? serverFacts.region : meta?.region ? (isAr ? meta.region.ar : meta.region.en) : "—"),
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

  const hero = media[0]?.url ?? project.cover_url ?? meta?.cover;
  const heroAlt = media[0]?.alt ?? project.title;
  const gallery = media.length > 1 ? media.slice(1).map((m) => m.url) : (meta?.gallery ?? []);

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdProject),
        }}
      />
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
              <ParallaxImage src={hero} alt={heroAlt} className="mb-16" ratio="16/9" priority={true} />
            ) : null}

            {project.challenge ? (
              <>
                <h2 className="display-md text-2xl md:text-3xl">
                  {t("Project Context & Requirements", "سياق المشروع والمتطلبات الفنية")}
                </h2>
                <p className="body-reading mt-6 max-w-3xl text-lg text-[var(--iw-text-secondary)] leading-relaxed">
                  {project.challenge}
                </p>
              </>
            ) : null}

            {claims.length > 0 ? (
              <>
                <h2 className="display-md mt-16 text-2xl md:text-3xl">
                  {t("Scope & Deliverables", "نطاق العمل والمخرجات المنفذة")}
                </h2>
                <div className="mt-8 border-t border-s" style={{ borderColor: "var(--iw-border)" }}>
                  {claims.map((claim, i) => (
                    <div
                      key={claim.id}
                      className="flex flex-col gap-2 border-b border-e p-6 md:flex-row md:gap-8 bg-[var(--iw-surface)]"
                      style={{ borderColor: "var(--iw-border)" }}
                    >
                      <span
                        className="label-mono w-16 shrink-0 font-semibold"
                        style={{ color: "var(--iw-accent)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="body-reading text-[var(--iw-text-secondary)] leading-relaxed">
                        {claim.content}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {/* Dedicated Project Schema OR Sector Schematic Fallback */}
            {schema ? (
              <div className="mt-16">
                <h2 className="display-md text-2xl md:text-3xl">
                  {t("Process Schematic & Diagram", "المخطط الهندسي للمشروع")}
                </h2>
                <p className="body-reading mt-3 max-w-3xl text-[var(--iw-text-secondary)]">
                  {schema.alt ||
                    t(
                      "Official technical drawing and process flowchart for this facility.",
                      "المخطط الهندسي ومسار العمليات المعتمد للمشروع.",
                    )}
                </p>
                <div
                  className="mt-6 overflow-hidden rounded-md border"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  {schema.mime_type === "application/pdf" ? (
                    <div className="space-y-3 bg-neutral-900 p-4">
                      <iframe
                        src={schema.url}
                        title="Engineering Schematic PDF"
                        className="h-[550px] w-full rounded border bg-neutral-950"
                        style={{ borderColor: "var(--iw-border)" }}
                      />
                      <div className="flex justify-end">
                        <a
                          href={schema.url}
                          target="_blank"
                          rel="noreferrer"
                          className="label-mono inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:underline"
                        >
                          <Download className="h-4 w-4" />
                          {t("Download Technical PDF", "تحميل المخطط الهندسي (PDF)")}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-black/5 p-4">
                      <img
                        src={schema.url}
                        alt={schema.alt ?? project.title}
                        className="max-h-[600px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : schematicSlug ? (
              <>
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
              </>
            ) : null}

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
                <h2 className="display-md mt-16 text-2xl md:text-3xl">
                  {t("Delivered Outcome", "النتيجة والمخرجات المنفذة")}
                </h2>
                <p className="body-reading mt-6 max-w-3xl text-lg text-[var(--iw-text-secondary)] leading-relaxed">
                  {project.outcome}
                </p>
              </>
            ) : null}
          </div>

          {/* Facts sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="border p-6 shadow-sm"
              style={{
                borderColor: "var(--iw-border)",
                backgroundColor: "var(--iw-surface)",
              }}
            >
              <p className="label-mono text-xs font-semibold tracking-wider uppercase text-[var(--iw-accent)]">
                {t("Engineering Dossier Facts", "بيانات ملف المشروع")}
              </p>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="border-t pt-4"
                    style={{ borderColor: "var(--iw-border)" }}
                  >
                    <dt className="label-mono text-xs text-[var(--iw-text-secondary)]">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-[var(--iw-text-primary)]">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="/downloads/infeworks-company-profile.pdf"
                download="infeworks-company-profile.pdf"
                className="label-mono mt-8 inline-flex w-full items-center justify-center gap-3 rounded-sm border border-[var(--iw-accent)] bg-transparent px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--iw-accent)] transition-all duration-200 hover:bg-[var(--iw-accent)] hover:text-white"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>{t("Download Profile (PDF)", "تحميل ملف الشركة (PDF)")}</span>
              </a>
            </div>

            {location ? (
              <div
                className="mt-8 h-64 w-full overflow-hidden border shadow-sm"
                style={{
                  borderColor: "var(--iw-border)",
                  backgroundColor: "var(--iw-surface-alt)",
                }}
              >
                <ClientOnly fallback={null}>
                  <Suspense fallback={null}>
                    <ProjectLocationMap
                      lat={location.lat}
                      lng={location.lng}
                      label={location.display_name}
                      zoom={9}
                      locale={locale}
                    />
                  </Suspense>
                </ClientOnly>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* Institutional Corporate Commitment Slogan Banner */}
      <section
        className="border-y bg-[var(--iw-surface)] py-12 md:py-16"
        style={{ borderColor: "var(--iw-border)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 text-center md:px-10">
          <p className="label-mono text-xs font-semibold tracking-widest uppercase text-[var(--iw-accent)]">
            {t("Our Execution Standard", "معيار التنفيذ المعتمد")}
          </p>
          <p className="display-md mt-4 text-2xl font-bold tracking-tight text-[var(--iw-text-primary)] sm:text-3xl md:text-4xl">
            {t(
              "One partner · Full scope · Delivered as agreed.",
              "شريك واحد · مسؤولية شاملة · تسليم بالمعايير المتفق عليها.",
            )}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <h2 className="display-xl max-w-3xl text-[clamp(1.75rem,4vw,3.25rem)]">
            {t("Build with one accountable partner.", "ابنِ مع شريك واحد مسؤول.")}
          </h2>
          <p className="body-reading mt-6 max-w-2xl text-base md:text-lg text-[var(--iw-dark-text-muted)]">
            {t(
              "Direct access to our senior engineering leads. We review project tenders, perform feasibility assessments, and structure turnkey proposals.",
              "تواصل مباشر مع قياداتنا الهندسية. نقوم بمراجعة المناقصات ودراسات الجدوى وتقديم عروض تسليم المفتاح المتكاملة.",
            )}
          </p>
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
