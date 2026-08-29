// Infeworks — precision milestone rail. Stations are reduced to pure
// datum marks (year + node on the line); all narrative weight moves to the
// synchronized detail panel below, connected by a descending branch.
import { useEffect, useRef, useState } from "react";

export type MilestoneEntry = {
  label: string;
  note?: string | undefined;
};

export type Milestone = {
  years: string;
  title: string;
  detail: string;
  meta?: string;
  entries?: MilestoneEntry[];
};

export default function MilestoneTrack({
  items,
  isAr = false,
}: {
  items: Milestone[];
  isAr?: boolean;
}) {
  const [active, setActive] = useState(items.length - 1);
  const [drawn, setDrawn] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = items[active] ?? items[0];
  if (!current) return null;

  const count = items.length;
  const step = 100 / count;
  const progress = count > 1 ? step / 2 + active * step : 100;
  const side = isAr ? "right" : "left";

  return (
    <div ref={rootRef}>
      {/* ── Rail: pure stations on the datum line ─────────────────── */}
      <div className="relative">
        {/* Baseline */}
        <div
          className="absolute top-1/2 hidden h-px w-full -translate-y-1/2 md:block"
          style={{ backgroundColor: "var(--iw-dark-border)" }}
        />
        {/* Progress trace */}
        <div
          className="absolute top-1/2 hidden h-px -translate-y-1/2 md:block"
          style={{
            backgroundColor: "var(--iw-dark-accent)",
            width: drawn ? `${progress}%` : "0%",
            transition: "width 700ms cubic-bezier(0.16,1,0.3,1)",
            [side]: 0,
          }}
        />

        <ol
          className="grid gap-y-10 md:gap-y-0"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {items.map((item, idx) => {
            const isActive = idx === active;
            const isPast = idx <= active;
            return (
              <li key={item.years} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-current={isActive}
                  className="group flex w-full flex-col items-center gap-0 md:h-[7.5rem]"
                >
                  {/* Year — sits above the line */}
                  <span
                    className="label-mono order-1 block text-[11px] tracking-[0.18em] transition-all duration-300 md:mb-auto md:pt-0"
                    style={{
                      color: isActive
                        ? "var(--iw-dark-accent)"
                        : "var(--iw-dark-text-muted)",
                      opacity: isActive ? 1 : 0.7,
                      transform: isActive ? "translateY(-2px)" : "none",
                    }}
                  >
                    {item.years}
                  </span>

                  {/* Node — exactly on the line */}
                  <span
                    className="relative order-3 my-4 flex items-center justify-center md:order-2 md:my-0 md:flex-1"
                    aria-hidden
                  >
                    {/* Tick below the line */}
                    <span
                      className="absolute top-full mt-2 hidden h-4 w-px transition-all duration-500 md:block"
                      style={{
                        backgroundColor: isActive
                          ? "var(--iw-dark-accent)"
                          : "var(--iw-dark-border)",
                        height: isActive ? "1.4rem" : "0.75rem",
                      }}
                    />
                    <span
                      className="block rounded-full transition-all duration-500"
                      style={{
                        width: isActive ? 15 : 9,
                        height: isActive ? 15 : 9,
                        backgroundColor: isPast
                          ? "var(--iw-dark-accent)"
                          : "var(--iw-dark-bg)",
                        border: "1.5px solid var(--iw-dark-accent)",
                        boxShadow: isActive
                          ? "0 0 0 7px color-mix(in oklab, var(--iw-dark-accent) 16%, transparent), 0 0 22px color-mix(in oklab, var(--iw-dark-accent) 45%, transparent)"
                          : "none",
                        opacity: drawn ? 1 : 0,
                        transitionDelay: `${idx * 70}ms`,
                      }}
                    />
                  </span>

                  {/* Short index — mobile-only divider line */}
                  <span
                    className="order-2 mb-1 block text-[10px] tracking-[0.3em] md:hidden"
                    style={{
                      color: isActive
                        ? "var(--iw-dark-accent)"
                        : "var(--iw-dark-text-muted)",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="order-4 block h-px w-10 transition-all duration-500 md:hidden"
                    style={{
                      backgroundColor: isActive
                        ? "var(--iw-dark-accent)"
                        : "var(--iw-dark-border)",
                    }}
                  />
                </button>
              </li>
            );
          })}
        </ol>

        {/* Descending branch from the active node */}
        <div
          className="pointer-events-none absolute hidden md:block"
          style={{
            top: "50%",
            [side]: `calc(${progress}% - 0.5px)`,
            width: 1,
            height: drawn ? "9.5rem" : 0,
            background:
              "linear-gradient(to bottom, var(--iw-dark-accent), transparent)",
            opacity: 0.55,
            transition:
              "height 600ms cubic-bezier(0.16,1,0.3,1), left 500ms cubic-bezier(0.16,1,0.3,1), right 500ms cubic-bezier(0.16,1,0.3,1)",
          }}
          aria-hidden
        />
      </div>

      {/* ── Detail panel ──────────────────────────────────────────── */}
      <div
        className="mt-14 border-t pt-10 md:mt-36"
        style={{ borderColor: "var(--iw-dark-border)" }}
      >
        <div
          key={current.years}
          className="iw-fade-rise grid gap-10 lg:grid-cols-[11rem_1fr]"
        >
          <div>
            <span className="display-lg block text-[clamp(1.75rem,4vw,3rem)]">
              {current.years}
            </span>
            {current.meta ? (
              <span
                className="label-mono mt-2 block"
                style={{ color: "var(--iw-dark-accent)" }}
              >
                {current.meta}
              </span>
            ) : null}
          </div>
          <div className="max-w-3xl">
            <h3 className="display-md text-2xl md:text-3xl">{current.title}</h3>
            <p
              className="body-reading mt-4 text-lg"
              style={{ color: "var(--iw-dark-text-muted)" }}
            >
              {current.detail}
            </p>

            {current.entries?.length ? (
              <ul
                className="mt-8 border-s ps-6"
                style={{ borderColor: "var(--iw-dark-border)" }}
              >
                {current.entries.map((entry, i) => (
                  <li
                    key={entry.label}
                    className="iw-fade-rise relative py-3"
                    style={{ animationDelay: `${120 + i * 80}ms` }}
                  >
                    <span
                      className="absolute top-[1.35rem] block h-px w-4"
                      style={{
                        backgroundColor: "var(--iw-dark-accent)",
                        [side]: "-1.5rem",
                      }}
                      aria-hidden
                    />
                    <span
                      className="block text-base"
                      style={{ color: "var(--iw-dark-text)" }}
                    >
                      {entry.label}
                    </span>
                    {entry.note ? (
                      <span
                        className="label-mono mt-1 block text-[10.5px]"
                        style={{ color: "var(--iw-dark-text-muted)" }}
                      >
                        {entry.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
