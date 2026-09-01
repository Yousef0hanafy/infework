import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowUpRight, Maximize2 } from "lucide-react";

export type MilestoneEntry = {
  label: string;
  note?: string | undefined;
  slug?: string | undefined;
  slugLabel?: string | undefined;
};

export type Milestone = {
  years: string;
  title: string;
  detail: string;
  meta?: string | undefined;
  image?: string | undefined;
  entries?: MilestoneEntry[] | undefined;
};

export default function MilestoneTrack({
  items,
  locale = "en",
  isAr = false,
}: {
  items: Milestone[];
  locale?: string;
  isAr?: boolean;
}) {
  const [active, setActive] = useState(items.length - 1);
  const [drawn, setDrawn] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mobileTabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Center active tab on mobile when active changes
  useEffect(() => {
    if (!mobileTabsRef.current) return;
    const container = mobileTabsRef.current;
    const activeButton = container.children[active] as HTMLElement | undefined;
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  const current = items[active] ?? items[0];
  if (!current) return null;

  const count = items.length;
  const step = 100 / count;
  const progress = count > 1 ? step / 2 + active * step : 100;
  const side = isAr ? "right" : "left";

  const handlePrev = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  // Find the first linked project dossier slug if available
  const primarySlugEntry = current.entries?.find((e) => e.slug);

  return (
    <div ref={rootRef} className="relative w-full">
      {/* ── Mobile Horizontal Snap Station Bar (< md) ─────────────────── */}
      <div className="block md:hidden mb-8">
        <div
          ref={mobileTabsRef}
          className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={item.years}
                type="button"
                onClick={() => setActive(idx)}
                style={{
                  scrollSnapAlign: "center",
                  backgroundColor: isActive ? "var(--iw-dark-accent)" : "rgba(255, 255, 255, 0.05)",
                  borderColor: isActive ? "var(--iw-dark-accent)" : "var(--iw-dark-border)",
                  color: isActive ? "#070e1a" : "var(--iw-dark-text-muted)",
                }}
                className="label-mono flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer"
              >
                <span>{item.years}</span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: isActive ? "#070e1a" : "var(--iw-dark-border)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop Rail: Precision stations on datum line (>= md) ─────── */}
      <div className="relative hidden md:block mb-12">
        {/* Baseline */}
        <div
          className="absolute top-1/2 h-px w-full -translate-y-1/2"
          style={{ backgroundColor: "var(--iw-dark-border)" }}
        />
        {/* Progress trace */}
        <div
          className="absolute top-1/2 h-px -translate-y-1/2"
          style={{
            backgroundColor: "var(--iw-dark-accent)",
            width: drawn ? `${progress}%` : "0%",
            transition: "width 500ms cubic-bezier(0.16,1,0.3,1)",
            [side]: 0,
          }}
        />

        <ol className="grid" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
          {items.map((item, idx) => {
            const isActive = idx === active;
            const isPast = idx <= active;
            return (
              <li key={item.years} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-current={isActive}
                  className="group flex h-[7rem] w-full flex-col items-center gap-0 cursor-pointer"
                >
                  {/* Year label above the line */}
                  <span
                    className="label-mono order-1 mb-auto block text-[11px] font-semibold tracking-[0.16em] transition-all duration-300"
                    style={{
                      color: isActive ? "var(--iw-dark-accent)" : "var(--iw-dark-text-muted)",
                      opacity: isActive ? 1 : 0.65,
                      transform: isActive ? "translateY(-3px) scale(1.08)" : "none",
                    }}
                  >
                    {item.years}
                  </span>

                  {/* Node on the datum line */}
                  <span
                    className="relative order-2 my-0 flex flex-1 items-center justify-center"
                    aria-hidden
                  >
                    <span
                      className="absolute top-full mt-2 hidden h-4 w-px transition-all duration-500 md:block"
                      style={{
                        backgroundColor: isActive
                          ? "var(--iw-dark-accent)"
                          : "var(--iw-dark-border)",
                        height: isActive ? "1.25rem" : "0.5rem",
                      }}
                    />
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 16 : 10,
                        height: isActive ? 16 : 10,
                        backgroundColor: isPast ? "var(--iw-dark-accent)" : "var(--iw-dark-bg)",
                        border: "1.5px solid var(--iw-dark-accent)",
                        boxShadow: isActive
                          ? "0 0 0 7px color-mix(in oklab, var(--iw-dark-accent) 20%, transparent), 0 0 20px color-mix(in oklab, var(--iw-dark-accent) 60%, transparent)"
                          : "none",
                        opacity: drawn ? 1 : 0,
                        transitionDelay: `${idx * 40}ms`,
                      }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Active Milestone Split Showcase (Narrative + Visual Proof) ─── */}
      <div
        className="rounded-xl border p-6 md:p-10 transition-all duration-300"
        style={{
          borderColor: "var(--iw-dark-border)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        {/* Header Ribbon with Stepper Navigation */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b pb-6"
          style={{ borderColor: "var(--iw-dark-border)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="label-mono text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--iw-dark-accent)" }}
            >
              {isAr
                ? `المحطة ${String(active + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`
                : `Station ${String(active + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}
            </span>
            {current.meta ? (
              <span
                className="label-mono rounded-xs border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  color: "var(--iw-dark-accent)",
                  borderColor: "rgba(0, 200, 213, 0.3)",
                  backgroundColor: "rgba(0, 200, 213, 0.06)",
                }}
              >
                {current.meta}
              </span>
            ) : null}
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={isAr ? "المحطة السابقة" : "Previous milestone"}
              className="flex h-9 w-9 items-center justify-center rounded-sm border transition-colors hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)] text-white/80 cursor-pointer"
              style={{
                borderColor: "var(--iw-dark-border)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={isAr ? "المحطة التالية" : "Next milestone"}
              className="flex h-9 w-9 items-center justify-center rounded-sm border transition-colors hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)] text-white/80 cursor-pointer"
              style={{
                borderColor: "var(--iw-dark-border)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Content Body: Split Grid (Left Text / Right Cinematic Image Card) */}
        <div
          key={current.years}
          className="iw-fade-rise mt-8 grid gap-8 lg:grid-cols-12 lg:items-center"
        >
          {/* Left Column: Narrative & Project Scope (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-4">
              <span className="display-lg text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-none">
                {current.years}
              </span>
            </div>

            <h3 className="display-md mt-4 text-xl font-bold md:text-2xl text-white">
              {current.title}
            </h3>

            <p
              className="body-reading mt-4 text-base leading-relaxed"
              style={{ color: "var(--iw-dark-text-muted)" }}
            >
              {current.detail}
            </p>

            {current.entries?.length ? (
              <ul
                className="mt-6 grid gap-3 border-s ps-4 sm:grid-cols-2"
                style={{ borderColor: "var(--iw-dark-accent)" }}
              >
                {current.entries.map((entry) => (
                  <li
                    key={entry.label}
                    className="relative rounded-sm border p-3.5 transition-all duration-200 hover:border-[var(--iw-dark-accent)]"
                    style={{
                      borderColor: "var(--iw-dark-border)",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <span className="block text-xs font-semibold text-white">{entry.label}</span>
                    {entry.note ? (
                      <span
                        className="label-mono mt-1 block text-[11px]"
                        style={{ color: "var(--iw-dark-text-muted)" }}
                      >
                        {entry.note}
                      </span>
                    ) : null}

                    {entry.slug ? (
                      <Link
                        to="/$locale/work/$slug"
                        params={{ locale, slug: entry.slug }}
                        preload={false}
                        className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
                        style={{ color: "var(--iw-dark-accent)" }}
                      >
                        <span>
                          {entry.slugLabel ||
                            (isAr ? "استعراض ملف المشروع" : "View Project Dossier")}
                        </span>
                        <ArrowUpRight className="h-3 w-3 rtl:rotate-90" />
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Right Column: Framed Cinematic Image Card (5 cols) */}
          <div className="lg:col-span-5">
            {current.image ? (
              <div className="group relative overflow-hidden rounded-lg border border-[var(--iw-dark-border)] bg-[#040810] shadow-2xl transition-all duration-300 hover:border-[var(--iw-dark-accent)]">
                {/* Image Container with 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={current.image}
                    alt={current.title}
                    width={600}
                    height={450}
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback in case of any network image glitch
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.5";
                    }}
                  />
                  {/* Subtle Gradient Scrim at bottom */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7, 14, 26, 0.9) 0%, rgba(7, 14, 26, 0.2) 50%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                  <span className="label-mono text-xs font-semibold text-white/90 drop-shadow-md">
                    {current.years} ·{" "}
                    {current.meta || (isAr ? "سابقة أعمال موثقة" : "Delivered Benchmark")}
                  </span>
                  {primarySlugEntry?.slug && (
                    <Link
                      to="/$locale/work/$slug"
                      params={{ locale, slug: primarySlugEntry.slug }}
                      preload={false}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--iw-dark-accent)] text-[#070e1a] transition-transform hover:scale-110"
                      aria-label={isAr ? "فتح ملف المشروع" : "Open Project Dossier"}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                {/* Decorative Engineering Corner Accents */}
                <div className="absolute top-2 end-2 h-2 w-2 border-t border-e border-[var(--iw-dark-accent)] pointer-events-none opacity-80" />
                <div className="absolute top-2 start-2 h-2 w-2 border-t border-s border-[var(--iw-dark-accent)] pointer-events-none opacity-80" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
