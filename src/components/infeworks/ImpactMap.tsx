// Infeworks — Egypt footprint section: authored SVG stage, filter pills, detail drawer.
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, X } from "lucide-react";

import EgyptStage, { type StageNode } from "@/components/infeworks/EgyptStage";
import { SECTORS } from "@/lib/sectors";
import { getProjectMeta } from "@/lib/project-meta";
import type { PublicProject } from "@/lib/public-types";

type ImpactProject = {
  slug: string;
  title: string;
  challenge: string | null;
  capability_slugs: string[];
};

type ImpactLocation = {
  id: string;
  lat: number;
  lng: number;
  display_name: string;
  projects: ImpactProject[];
};

function toLocations(projects: PublicProject[]): ImpactLocation[] {
  const map = new Map<string, ImpactLocation>();
  for (const p of projects) {
    if (!p.location) continue;
    const { lat, lng, display_name } = p.location;
    // Exact match for grouping
    const id = `${lat.toFixed(4)},${lng.toFixed(4)}`;

    if (!map.has(id)) {
      map.set(id, {
        id,
        lat,
        lng,
        display_name: display_name ?? "Egypt",
        projects: [],
      });
    }
    map.get(id)!.projects.push({
      slug: p.slug,
      title: p.title,
      challenge: p.challenge,
      capability_slugs: p.capability_slugs,
    });
  }
  return Array.from(map.values());
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
  const locations = useMemo(() => toLocations(projects), [projects]);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null);

  const hovered = hover ? (locations.find((l) => l.id === hover.id) ?? null) : null;
  // Hovered meta is optional, if there's only 1 project we can show its image, otherwise we just show count.
  const hoveredMeta =
    hovered?.projects.length === 1 ? getProjectMeta(hovered.projects[0]!.slug) : undefined;

  const visibleLocations = useMemo(() => {
    if (filter === "all") return locations;
    return locations
      .map((loc) => ({
        ...loc,
        projects: loc.projects.filter((p) => p.capability_slugs.includes(filter)),
      }))
      .filter((loc) => loc.projects.length > 0);
  }, [locations, filter]);

  const activeLocation = visibleLocations.find((l) => l.id === selectedId) ?? null;

  const handleSelectLocation = (id: string | null) => {
    setSelectedId(id);
    if (id && typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        const drawer = document.getElementById("impact-map-drawer");
        if (drawer) {
          drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 50);
    }
  };

  const nodes: StageNode[] = locations.map((loc) => ({
    id: loc.id,
    lat: loc.lat,
    lng: loc.lng,
    label: loc.display_name,
    count: loc.projects.length,
    dimmed: !visibleLocations.some((v) => v.id === loc.id),
  }));

  const pills = [
    {
      key: "all",
      label: t("All disciplines", "كل التخصصات"),
      count: projects.filter((p) => p.location).length,
    },
    ...SECTORS.map((s) => ({
      key: s.slug,
      label: isAr ? s.ar : s.en,
      count: projects.filter((p) => p.location && p.capability_slugs.includes(s.slug)).length,
    })),
  ];

  return (
    <div className="mt-12">
      {/* Discipline filter */}
      <div className="flex w-full items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:pb-0">
        {pills.map((p) => {
          const on = filter === p.key;
          const empty = p.count === 0;
          return (
            <button
              key={p.key}
              type="button"
              disabled={empty}
              onClick={() => {
                setFilter(p.key);
                setSelectedId(null);
              }}
              className={`label-mono shrink-0 px-3.5 py-1.5 text-xs transition-all ${
                on
                  ? "bg-[var(--iw-dark-accent)] font-semibold text-[var(--iw-dark-deep)] shadow-sm"
                  : empty
                    ? "opacity-30 cursor-not-allowed border"
                    : "border hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)]"
              }`}
              style={
                on
                  ? undefined
                  : {
                      borderColor: "var(--iw-dark-border)",
                      color: "var(--iw-dark-text-muted)",
                      backgroundColor: "rgba(255,255,255,0.02)",
                    }
              }
            >
              {p.label}
              <span className="ms-1.5 opacity-60">({p.count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Map + Detail grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Stage container */}
        <div
          className="relative overflow-hidden rounded-sm border lg:col-span-2"
          style={{
            borderColor: "var(--iw-dark-border)",
            backgroundColor: "var(--iw-dark-deep)",
          }}
        >
          <div className="iw-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative p-3 sm:p-6">
            <EgyptStage
              nodes={nodes}
              selectedId={activeLocation?.id ?? null}
              onSelect={(id) => handleSelectLocation(id)}
              onHover={(id, pos) => {
                if (!id || !pos) return setHover(null);
                setHover({ id, x: pos.x, y: pos.y });
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
                  {hovered.display_name}
                </p>
                {hovered.projects.length === 1 ? (
                  <>
                    <p className="display-md mt-2 text-sm leading-snug">
                      {hovered.projects[0]!.title}
                    </p>
                    {hoveredMeta?.capacity || hoveredMeta?.client ? (
                      <dl className="mt-3 space-y-1.5">
                        {hoveredMeta?.capacity ? (
                          <div>
                            <dt
                              className="label-mono"
                              style={{ color: "var(--iw-dark-text-muted)" }}
                            >
                              {t("Capacity", "الطاقة")}
                            </dt>
                            <dd className="text-xs">
                              {isAr ? hoveredMeta.capacity.ar : hoveredMeta.capacity.en}
                            </dd>
                          </div>
                        ) : null}
                        {hoveredMeta?.client ? (
                          <div>
                            <dt
                              className="label-mono"
                              style={{ color: "var(--iw-dark-text-muted)" }}
                            >
                              {t("Client", "جهة التعاقد")}
                            </dt>
                            <dd className="text-xs leading-snug">
                              {isAr ? hoveredMeta.client.ar : hoveredMeta.client.en}
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                    ) : null}
                  </>
                ) : (
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="display-md text-2xl" style={{ color: "var(--iw-dark-text)" }}>
                      {hovered.projects.length}
                    </span>
                    <span
                      className="label-mono text-xs"
                      style={{ color: "var(--iw-dark-text-muted)" }}
                    >
                      {t("Projects", "مشروعات")}
                    </span>
                  </div>
                )}
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

        {/* Detail drawer - constrained height with internal scroll */}
        <aside
          id="impact-map-drawer"
          className="iw-glass-dark border p-0 flex flex-col max-h-[650px] lg:max-h-[800px]"
          style={{ borderColor: "var(--iw-dark-border)" }}
        >
          {activeLocation ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between border-b p-4 sm:p-6"
                style={{
                  borderColor: "var(--iw-dark-border)",
                  backgroundColor: "var(--iw-dark-deep)",
                }}
              >
                <div>
                  <p
                    className="label-mono inline-flex items-center gap-2 text-xs"
                    style={{ color: "var(--iw-dark-accent)" }}
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {activeLocation.display_name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--iw-dark-text-muted)]">
                    {activeLocation.projects.length} {isAr ? "مشروعات" : "Projects"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="rounded-full p-2 hover:bg-white/5 transition-colors"
                  aria-label={t("Close selection", "إغلاق التحديد")}
                >
                  <X className="h-5 w-5 text-[var(--iw-dark-text-muted)]" />
                </button>
              </div>

              {/* Projects Scroll Area */}
              <div className="overflow-y-auto p-4 sm:p-6 no-scrollbar flex flex-col gap-10">
                {activeLocation.projects.map((proj) => {
                  const meta = getProjectMeta(proj.slug);
                  return (
                    <div key={proj.slug} className="iw-reveal relative">
                      <h3 className="display-md text-lg sm:text-xl leading-snug">{proj.title}</h3>
                      {meta?.capacity ? (
                        <p
                          className="label-mono mt-3 inline-block border px-2.5 py-1 text-xs"
                          style={{
                            borderColor: "var(--iw-dark-accent)",
                            color: "var(--iw-dark-accent)",
                          }}
                        >
                          {isAr ? meta.capacity.ar : meta.capacity.en}
                        </p>
                      ) : null}

                      {proj.challenge ? (
                        <p className="body-reading mt-4 text-xs sm:text-sm text-[var(--iw-dark-text-muted)]">
                          {proj.challenge.length > 190
                            ? `${proj.challenge.slice(0, 190)}…`
                            : proj.challenge}
                        </p>
                      ) : null}

                      {meta?.year || meta?.region ? (
                        <dl
                          className="mt-6 grid grid-cols-2 gap-4 border-t pt-4"
                          style={{ borderColor: "var(--iw-dark-border)" }}
                        >
                          {meta?.year ? (
                            <div>
                              <dt
                                className="label-mono text-xs"
                                style={{ color: "var(--iw-dark-text-muted)" }}
                              >
                                {t("Delivered", "سنة التنفيذ")}
                              </dt>
                              <dd className="display-md mt-1 text-base">{meta.year}</dd>
                            </div>
                          ) : null}
                          {meta?.region ? (
                            <div>
                              <dt
                                className="label-mono text-xs"
                                style={{ color: "var(--iw-dark-text-muted)" }}
                              >
                                {t("Region", "النطاق")}
                              </dt>
                              <dd className="mt-1 text-xs leading-snug">
                                {isAr ? meta.region.ar : meta.region.en}
                              </dd>
                            </div>
                          ) : null}
                        </dl>
                      ) : null}

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {proj.capability_slugs.map((slug) => {
                          const s = SECTORS.find((x) => x.slug === slug);
                          if (!s) return null;
                          return (
                            <span
                              key={slug}
                              className="label-mono border px-2 py-1 text-[11px]"
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
                        params={{ locale, slug: proj.slug }}
                        preload={false}
                        className="label-mono mt-6 inline-flex items-center gap-2 px-4 py-2.5 text-xs transition-colors hover:bg-[var(--iw-accent-hover)]"
                        style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
                      >
                        {t("View case study", "عرض دراسة الحالة")}
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div
                className="sticky top-0 z-10 border-b p-4 sm:p-6"
                style={{
                  borderColor: "var(--iw-dark-border)",
                  backgroundColor: "var(--iw-dark-deep)",
                }}
              >
                <p className="label-mono text-[var(--iw-dark-text-muted)]">
                  {t("Project Directory", "دليل المشروعات")} (
                  {visibleLocations.reduce((acc, loc) => acc + loc.projects.length, 0)})
                </p>
              </div>
              <ul className="overflow-y-auto no-scrollbar p-2 sm:p-4">
                {visibleLocations.map((loc) => (
                  <li key={loc.id} className="mb-2 last:mb-0">
                    <button
                      type="button"
                      onClick={() => handleSelectLocation(loc.id)}
                      className="group flex w-full flex-col gap-2 rounded-sm border p-4 text-start transition-all hover:bg-white/5"
                      style={{ borderColor: "var(--iw-dark-border)" }}
                    >
                      <div className="flex w-full items-start justify-between gap-3">
                        <span className="text-sm font-semibold leading-snug break-words text-[var(--iw-dark-text)] group-hover:text-[var(--iw-dark-accent)] transition-colors">
                          {loc.display_name}
                        </span>
                        <div className="label-mono shrink-0 rounded-full bg-[var(--iw-dark-bg)] px-2 py-0.5 text-[10px] text-[var(--iw-dark-accent)]">
                          {loc.projects.length}
                        </div>
                      </div>
                      <p className="text-xs text-[var(--iw-dark-text-muted)] line-clamp-1">
                        {loc.projects.map((p) => p.title).join(" • ")}
                      </p>
                    </button>
                  </li>
                ))}
                {visibleLocations.length === 0 && (
                  <li className="p-4 text-center">
                    <p className="body-reading text-sm text-[var(--iw-dark-text-muted)]">
                      {t(
                        "No projects found under this discipline.",
                        "لا توجد مشروعات تحت هذا التخصص.",
                      )}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
