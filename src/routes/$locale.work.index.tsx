import { responsiveImage, catalogueImageSizes } from "@/lib/responsive-image";
import { getProjectTitle } from "@/lib/project-title";
import { safeJsonLd } from "@/lib/safe-json-ld";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2, Layers, ShieldCheck } from "lucide-react";
import {
  CATALOGUE_BATCH,
  catalogueSearch,
  matchesCatalogueQuery,
} from "@/lib/catalogue-navigation";

import CatalogueSnapshotNotice from "@/components/infeworks/CatalogueSnapshotNotice";
import { getProjectMeta } from "@/lib/project-meta";
import { getCapabilities, getPublicProjects } from "@/lib/public.functions";

import HeroMetrics from "@/components/infeworks/HeroMetrics";

const TITLE = "Engineering Portfolio & Proven Track Record — Infeworks";
const DESC =
  "Detailed case studies and documented deliverables across water treatment, wastewater, utility networks, mega pumping stations, and civil infrastructure in Egypt.";
const TITLE_AR = "سجل الأعمال والمشروعات الهندسية — إنفيوركس";
const DESC_AR =
  "مشروعات ودراسات حالة تفصيلية لمحطات تنقية وتحلية المياه، محطات الصرف الصحي والصناعي، شبكات المرافق، ومحطات الرفع والضخ العملاقة المنفذة في مصر.";

export const Route = createFileRoute("/$locale/work/")({
  validateSearch: (search: Record<string, unknown>) => catalogueSearch(search),
  loader: async ({ params }) => {
    const [projects, capabilities] = await Promise.all([
      getPublicProjects({ data: { locale: params.locale } }),
      getCapabilities(),
    ]);
    return { projects, capabilities };
  },
  head: ({ params }) => {
    const isAr = params?.locale === "ar";
    const title = isAr ? TITLE_AR : TITLE;
    const description = isAr ? DESC_AR : DESC;
    const url = `https://www.infeworks.com/${params?.locale ?? "ar"}/work`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description: description,
      url: url,
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.infeworks.com/logo.png" },
        { property: "og:image:alt", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://www.infeworks.com/logo.png" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: safeJsonLd(schema),
        },
      ],
    };
  },
  component: WorkIndex,
});

function WorkIndex() {
  const { projects: published, capabilities } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const knownSectors = useMemo(() => capabilities.map((c) => c.slug), [capabilities]);
  const state = useMemo(() => catalogueSearch(search, knownSectors), [search, knownSectors]);
  const active = state.sector ?? "all";
  const query = state.q ?? "";
  const limit = state.limit ?? CATALOGUE_BATCH;
  const [draft, setDraft] = useState(query);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelPending = useCallback(() => {
    if (pending.current) clearTimeout(pending.current);
    pending.current = null;
  }, []);
  useEffect(() => {
    cancelPending();
    setDraft(query);
    return cancelPending;
  }, [query, search.sector, search.limit, cancelPending]);
  useEffect(() => {
    if (search.sector && !state.sector) {
      cancelPending();
      void navigate({ search: state, replace: true, resetScroll: false });
    }
  }, [search.sector, state, navigate, cancelPending]);
  const applyQuery = (value: string) => {
    cancelPending();
    setDraft(value.slice(0, 200));
    pending.current = setTimeout(() => {
      pending.current = null;
      const next = catalogueSearch({ ...state, q: value, limit: undefined }, knownSectors);
      setDraft(next.q ?? "");
      void navigate({
        search: next,
        replace: true,
        resetScroll: false,
      });
    }, 250);
  };
  const clearQuery = () => {
    cancelPending();
    setDraft("");
    void navigate({
      search: catalogueSearch({ sector: state.sector }, knownSectors),
      replace: true,
      resetScroll: false,
    });
  };
  const reset = () => {
    cancelPending();
    setDraft("");
    void navigate({ search: {}, replace: false, resetScroll: false });
  };
  const projects = published;

  const filters = useMemo(() => {
    const order = [
      "water-treatment",
      "wastewater",
      "pumping-wells",
      "infrastructure-networks",
      "civil-buildings",
      "industrial-mep",
    ];

    const sortedCaps = [...capabilities].sort((a, b) => {
      const idxA = order.indexOf(a.slug);
      const idxB = order.indexOf(b.slug);
      if (idxA === -1 && idxB === -1) return a.en_name.localeCompare(b.en_name);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

    return [
      { key: "all", label: isAr ? "جميع القطاعات" : "All Sectors" },
      ...sortedCaps.map((c) => ({
        key: c.slug,
        label: isAr ? c.ar_name : c.en_name,
      })),
    ];
  }, [capabilities, isAr]);

  const filteredAndSorted = useMemo(() => {
    // 1. Filter by active capability
    const filtered = projects.filter((p) => {
      if (active !== "all" && !p.capability_slugs?.includes(active)) return false;
      const meta = getProjectMeta(p.slug);
      return matchesCatalogueQuery(query, [
        p.title,
        p.title_en,
        p.title_ar,
        getProjectTitle(p).text,
        p.slug,
        meta?.client?.en,
        meta?.client?.ar,
        meta?.region?.en,
        meta?.region?.ar,
      ]);
    });

    // 2. Sort to prioritize explicit flagship projects
    const flagships = [
      "sadat-city-ro",
      "multi-site-desalination-purification",
      "toshka-pumping-stations",
      "arish-water-supply",
      "shubra-shahab-industrial-wastewater",
      "qabs-min-nour-mosque",
    ];
    return [...filtered].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const aIndex = flagships.indexOf(a.slug);
      const bIndex = flagships.indexOf(b.slug);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      // Fallback to most recent for non-flagships
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [projects, active, query]);

  const visible = filteredAndSorted.slice(0, Math.min(limit, filteredAndSorted.length));
  const hasMore = limit < filteredAndSorted.length;

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      {/* 1. Immersive Metrics & Institutional Hero */}
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

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-24 pb-12 md:px-10 md:pt-32 md:pb-16">
          <h1 className="display-xl max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold tracking-tight">
            {t("Infrastructure & Engineering Portfolio", "محفظة مشروعات البنية التحتية والهندسة")}
          </h1>

          <p
            className="body-reading mt-6 max-w-3xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {t(
              "An authoritative record of 50+ delivered projects across water treatment, utility networks, heavy electromechanical facilities, and civil infrastructure throughout Egypt.",
              "سجل موثق يضم أكثر من 50 مشروعاً منجزاً في معالجة المياه، شبكات المرافق، المحطات الكهروميكانيكية الكبرى، والأعمال المدنية في مختلف محافظات مصر.",
            )}
          </p>

          <CatalogueSnapshotNotice
            mediaUnavailable={projects.some((p) => p.media_unavailable)}
            date={projects.find((p) => p.catalogue_snapshot_date)?.catalogue_snapshot_date}
            locale={locale}
          />
          <HeroMetrics className="mt-10" />
        </div>
      </section>

      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-20">
          <div className="mb-6 flex flex-wrap items-end gap-3">
            <div className="min-w-0 flex-1 basis-64">
              <label htmlFor="project-search" className="mb-2 block text-sm font-semibold">
                {t("Search projects", "البحث في المشروعات")}
              </label>
              <input
                id="project-search"
                name="q"
                type="search"
                maxLength={200}
                value={draft}
                onChange={(event) => applyQuery(event.target.value)}
                placeholder={t("Project, client or region…", "اسم المشروع، العميل أو المنطقة…")}
                className="w-full rounded-sm border border-[var(--iw-border)] bg-[var(--iw-surface)] px-4 py-3 text-[var(--iw-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)]"
              />
            </div>
            {draft && (
              <button
                type="button"
                onClick={clearQuery}
                className="rounded-sm border border-[var(--iw-border)] px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)]"
              >
                {t("Clear search", "مسح البحث")}
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              className="rounded-sm border border-[var(--iw-border)] px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)]"
            >
              {t("Reset filters", "مسح البحث والفلاتر")}
            </button>
          </div>
          <div
            role="group"
            aria-label={t("Filter by sector", "التصفية حسب القطاع")}
            className="flex flex-wrap items-center gap-2 border-b pb-6"
            style={{ borderColor: "var(--iw-border)" }}
          >
            {filters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    cancelPending();
                    void navigate({
                      search: catalogueSearch({ q: draft, sector: f.key }, knownSectors),
                      replace: false,
                      resetScroll: false,
                    });
                  }}
                  className={`label-mono rounded-xs border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)] ${
                    isActive
                      ? "bg-[var(--iw-accent)] border-[var(--iw-accent)] text-white"
                      : "bg-[var(--iw-surface)] border-[var(--iw-border)] text-[var(--iw-text-secondary)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            <span key={`${query}:${active}:${limit}`}>
              {visible.length
                ? query
                  ? t(
                      `Project results updated for ${query}`,
                      `تم تحديث نتائج المشروعات للبحث: ${query}`,
                    )
                  : t("Project results updated", "تم تحديث نتائج المشروعات")
                : t("No matching projects", "لا توجد مشروعات مطابقة")}
            </span>
          </p>

          {visible.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const meta = getProjectMeta(p.slug);
                const coverSrc = p.cover_url ?? meta?.cover ?? null;

                return (
                  <Link
                    key={p.slug}
                    to="/$locale/work/$slug"
                    params={{ locale, slug: p.slug }}
                    preload={false}
                    className="group relative flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--iw-accent)] rounded-md border bg-[var(--iw-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--iw-accent)] hover:shadow-xl overflow-hidden"
                    style={{ borderColor: "var(--iw-border)" }}
                  >
                    {/* Visual Header (Clean, no text overlays) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      {coverSrc ? (
                        <img
                          src={coverSrc}
                          {...responsiveImage(coverSrc, catalogueImageSizes)}
                          alt={getProjectTitle(p).text}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[var(--iw-surface-alt)]">
                          <span className="label-mono text-xs text-[var(--iw-text-muted)]">
                            {t("Infeworks Infrastructure", "مشروعات إنفيوركس")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Body: Focus on Delivered Outcomes */}
                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                      <div>
                        {/* Client Attribution */}
                        {meta?.client ? (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--iw-accent)]">
                            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              {isAr ? meta.client.ar : meta.client.en}
                            </span>
                          </div>
                        ) : null}

                        <h2 className="display-md mt-2.5 text-xl font-bold leading-snug md:text-2xl text-[var(--iw-text-primary)] group-hover:text-[var(--iw-accent)] transition-colors">
                          <bdi lang={getProjectTitle(p).lang}>{getProjectTitle(p).text}</bdi>
                        </h2>

                        {/* Deliverable & Outcome Highlight */}
                        {p.outcome ? (
                          <p className="body-reading mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--iw-text-secondary)]">
                            {p.outcome}
                          </p>
                        ) : p.challenge ? (
                          <p className="body-reading mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--iw-text-secondary)]">
                            {p.challenge}
                          </p>
                        ) : null}
                      </div>

                      {/* Dossier Action Trigger */}
                      <div
                        className="mt-8 flex items-center justify-between border-t pt-4 text-xs font-semibold transition-colors"
                        style={{ borderColor: "var(--iw-border)" }}
                      >
                        <span className="label-mono text-[var(--iw-accent)] font-bold">
                          {t("View Project Dossier", "استعراض ملف المشروع")}
                        </span>
                        <ArrowRight className="h-4 w-4 text-[var(--iw-accent)] transition-transform group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              className="mt-16 border p-12 text-center"
              style={{
                borderColor: "var(--iw-border)",
                backgroundColor: "var(--iw-surface)",
              }}
            >
              <p className="body-reading text-base text-[var(--iw-text-secondary)]">
                {t(
                  "No projects match your search and sector. Try another term or reset the filters.",
                  "لا توجد مشروعات مطابقة للبحث والقطاع المحددين. جرّب كلمة أخرى أو امسح الفلاتر.",
                )}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-sm border border-[var(--iw-border)] px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)]"
              >
                {t("Reset filters", "مسح البحث والفلاتر")}
              </button>
            </div>
          )}

          {/* Load More Pagination */}
          {hasMore && visible.length > 0 && (
            <div className="mt-16 flex flex-col items-center gap-3">
              <button
                type="button"
                disabled={draft !== query}
                onClick={() => {
                  cancelPending();
                  void navigate({
                    search: catalogueSearch(
                      {
                        ...state,
                        limit: Math.min(limit + CATALOGUE_BATCH, filteredAndSorted.length),
                      },
                      knownSectors,
                    ),
                    replace: true,
                    resetScroll: false,
                  });
                }}
                className="label-mono inline-flex items-center gap-3 rounded-sm border border-[var(--iw-border)] bg-[var(--iw-surface)] px-8 py-4 text-xs font-bold tracking-widest uppercase text-[var(--iw-text-primary)] transition-all duration-300 hover:border-[var(--iw-accent)] hover:bg-[var(--iw-accent)] hover:text-white cursor-pointer disabled:cursor-wait disabled:opacity-50 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)]"
              >
                {t("Load More Projects", "عرض المزيد من المشروعات")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
