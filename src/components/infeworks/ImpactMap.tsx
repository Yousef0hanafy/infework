// Infeworks — Egypt footprint section: authored SVG stage, filter pills, detail drawer.
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

import EgyptStage, { type StageNode } from "@/components/infeworks/EgyptStage";
import { SECTORS } from "@/lib/sectors";
import { getProjectMeta } from "@/lib/project-meta";
import type { PublicProject } from "@/lib/public-types";

type ImpactPoint = {
  slug: string;
  title: string;
  lat: number;
  lng: number;
  display_name: string | null;
  challenge: string | null;
  capability_slugs: string[];
};

function toPoints(projects: PublicProject[]): ImpactPoint[] {
  const seen = new Map<string, number>();
  return projects.flatMap((p) => {
    if (!p.location) return [];
    // Nearby governorate centroids are fanned apart so every node and label stays legible.
    const key = `${Math.round(p.location.lat / 1.2)}-${Math.round(p.location.lng / 1.2)}`;
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);
    return [
      {
        slug: p.slug,
        title: p.title,
        lat: p.location.lat - n * 0.95,
        lng: p.location.lng + n * 0.55,
        display_name: p.location.display_name,

        challenge: p.challenge,
        capability_slugs: p.capability_slugs,
      },
    ];
  });
}

export default function ImpactMap({
  projects,
  locale,
  isAr,
}: {
  projects: PublicProject[];
  locale: string;
  isAr: boolean;
}) {
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const points = useMemo(() => toPoints(projects), [projects]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(points[0]?.slug ?? null);
  const [hover, setHover] = useState<{ slug: string; x: number; y: number } | null>(null);
  const hovered = hover ? (points.find((p) => p.slug === hover.slug) ?? null) : null;
  const hoveredMeta = hovered ? getProjectMeta(hovered.slug) : undefined;


  const visible = useMemo(
    () =>
      filter === "all"
        ? points
        : points.filter((p) => p.capability_slugs.includes(filter)),
    [points, filter],
  );

  const active = visible.find((p) => p.slug === selected) ?? visible[0] ?? null;
  const meta = active ? getProjectMeta(active.slug) : undefined;

  const nodes: StageNode[] = points.map((p) => ({
    id: p.slug,
    lat: p.lat,
    lng: p.lng,
    label: p.display_name ?? p.title,
    sublabel: p.title,
    dimmed: !visible.some((v) => v.slug === p.slug),
  }));

  const pills = [
    { key: "all", label: t("All disciplines", "كل التخصصات"), count: points.length },
    ...SECTORS.map((s) => ({
      key: s.slug,
      label: isAr ? s.ar : s.en,
      count: points.filter((p) => p.capability_slugs.includes(s.slug)).length,
    })),
  ];

  return (
    <div className="mt-12">
      {/* Discipline filter - scrollable on mobile */}
      <div className="flex w-full items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:pb-0">
        {pills.map((p) => {
          const on = filter === p.key;
          const empty = p.count === 0;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => {
                setFilter(p.key);
                setSelected(null);
              }}
              aria-pressed={on}
              className="label-mono inline-flex shrink-0 items-center gap-1.5 sm:gap-2 border px-3 py-2 sm:px-4 sm:py-2.5 text-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--iw-dark-accent)]"
              style={{
                borderColor: on ? "var(--iw-dark-accent)" : "var(--iw-dark-border)",
                backgroundColor: on
                  ? "color-mix(in oklab, var(--iw-dark-accent) 16%, transparent)"
                  : "transparent",
                color: on
                  ? "var(--iw-dark-accent)"
                  : "var(--iw-dark-text-muted)",
                opacity: empty && !on ? 0.45 : 1,
              }}
            >
              {p.label}
              <span style={{ opacity: 0.65 }}>{String(p.count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_23rem]">
        {/* Authored vector stage */}
        <div
          className="relative w-full overflow-hidden border"
          style={{
            borderColor: "var(--iw-dark-border)",
            backgroundColor: "var(--iw-dark-deep)",
          }}
        >
          <div className="iw-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative p-3 sm:p-6">
            <EgyptStage
              nodes={nodes}
              selectedId={active?.slug ?? null}
              onSelect={(id) => setSelected(id)}
              onHover={(id, pos) => {
                if (!id || !pos) return setHover(null);
                const point = points.find((p) => p.slug === id);
                if (!point) return setHover(null);
                setHover({ slug: id, x: pos.x, y: pos.y });
              }}
              ariaLabel={t(
                "Vector map of Egypt showing Infeworks project governorates",
                "خريطة متجهية لمصر تُظهر محافظات مشروعات إنفيوركس",
              )}
            />

            {/* Glass hover card */}
            {hovered ? (
              <div
                className="iw-glass-dark iw-reveal pointer-events-none absolute z-20 w-64 p-4"
                style={{
                  left: `${Math.min(Math.max(hover!.x, 6), 72)}%`,
                  top: `${Math.min(Math.max(hover!.y, 4), 82)}%`,
                  transform: "translate(12px, -50%)",
                  boxShadow: "0 26px 60px -30px rgba(0,0,0,0.75)",
                }}
              >
                {hoveredMeta ? (
                  <img
                    src={hoveredMeta.cover}
                    alt=""
                    className="mb-3 h-24 w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
                <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
                  {hovered.display_name ?? t("Egypt", "مصر")}
                </p>
                <p className="display-md mt-2 text-sm leading-snug">{hovered.title}</p>
                {hoveredMeta ? (
                  <dl className="mt-3 space-y-1.5">
                    <div>
                      <dt className="label-mono" style={{ color: "var(--iw-dark-text-muted)" }}>
                        {t("Capacity", "الطاقة")}
                      </dt>
                      <dd className="text-xs">
                        {isAr ? hoveredMeta.capacity.ar : hoveredMeta.capacity.en}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono" style={{ color: "var(--iw-dark-text-muted)" }}>
                        {t("Client", "جهة التعاقد")}
                      </dt>
                      <dd className="text-xs leading-snug">
                        {isAr ? hoveredMeta.client.ar : hoveredMeta.client.en}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </div>
            ) : null}
          </div>
          <p
            className="label-mono pointer-events-none absolute bottom-0 w-full px-4 py-3 text-xs"
            style={{
              backgroundColor: "rgba(7,14,26,0.82)",
              color: "var(--iw-dark-text-muted)",
            }}
          >
            {t(
              "Locations shown at governorate / city level only",
              "المواقع معروضة على مستوى المحافظة أو المدينة فقط",
            )}
          </p>
        </div>


        {/* Detail drawer */}
        <aside
          className="iw-glass-dark border p-4 sm:p-6 lg:p-8 lg:border-s-0 lg:border-t-0"
          style={{ borderColor: "var(--iw-dark-border)" }}
        >
          {active ? (
            <div key={active.slug} className="iw-reveal">
              <p
                className="label-mono inline-flex items-center gap-2 text-xs"
                style={{ color: "var(--iw-dark-accent)" }}
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {active.display_name ?? t("Egypt", "مصر")}
              </p>
              <h3 className="display-md mt-4 sm:mt-6 text-lg sm:text-xl leading-snug md:text-2xl">
                {active.title}
              </h3>

              {meta ? (
                <p
                  className="label-mono mt-3 sm:mt-4 inline-block border px-2.5 py-1 text-xs"
                  style={{
                    borderColor: "var(--iw-dark-accent)",
                    color: "var(--iw-dark-accent)",
                  }}
                >
                  {isAr ? meta.capacity.ar : meta.capacity.en}
                </p>
              ) : null}

              {active.challenge ? (
                <p
                  className="body-reading mt-4 sm:mt-6 text-xs sm:text-sm"
                  style={{ color: "var(--iw-dark-text-muted)" }}
                >
                  {active.challenge.length > 190
                    ? `${active.challenge.slice(0, 190)}…`
                    : active.challenge}
                </p>
              ) : null}

              {meta ? (
                <dl
                  className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 border-t pt-4 sm:pt-6"
                  style={{ borderColor: "var(--iw-dark-border)" }}
                >
                  <div>
                    <dt className="label-mono text-xs" style={{ color: "var(--iw-dark-text-muted)" }}>
                      {t("Delivered", "سنة التنفيذ")}
                    </dt>
                    <dd className="display-md mt-1 text-base sm:text-lg">{meta.year}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-xs" style={{ color: "var(--iw-dark-text-muted)" }}>
                      {t("Region", "النطاق")}
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm leading-snug">
                      {isAr ? meta.region.ar : meta.region.en}
                    </dd>
                  </div>
                </dl>
              ) : null}

              <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                {active.capability_slugs.map((slug) => {
                  const s = SECTORS.find((x) => x.slug === slug);
                  if (!s) return null;
                  return (
                    <span
                      key={slug}
                      className="label-mono border px-2 py-1 text-[11px] sm:text-xs"
                      style={{
                        borderColor: "var(--iw-dark-border)",
                        color: "var(--iw-dark-text-muted)",
                      }}
                    >
                      {isAr ? s.ar : s.en}
                    </span>
                  );
                })}
              </div>

              <Link
                to="/$locale/work/$slug"
                params={{ locale, slug: active.slug }}
                className="label-mono mt-6 sm:mt-10 inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm"
                style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
              >
                {t("View case study", "عرض دراسة الحالة")}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          ) : (
            <p className="body-reading text-xs sm:text-sm" style={{ color: "var(--iw-dark-text-muted)" }}>
              {t(
                "No delivered projects carry this discipline yet.",
                "لا توجد مشروعات منفذة تحت هذا التخصص حتى الآن.",
              )}
            </p>
          )}

          {/* Site index */}
          <ul className="mt-8 sm:mt-10 border-t" style={{ borderColor: "var(--iw-dark-border)" }}>
            {visible.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setSelected(p.slug)}
                  className="flex w-full items-center justify-between gap-3 border-b py-3 sm:py-4 text-start transition-colors"
                  style={{
                    borderColor: "var(--iw-dark-border)",
                    color:
                      active?.slug === p.slug
                        ? "var(--iw-dark-accent)"
                        : "var(--iw-dark-text-muted)",
                  }}
                >
                  <span className="text-xs sm:text-sm leading-snug break-words">
                    {p.display_name ?? p.title}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
