// Infeworks — animated hydraulic-flow / drafting-grid backdrop for dark hero sections.

import heroMega from "@/assets/hero-mega.jpg.asset.json";

export default function BlueprintBackdrop({
  className = "",
  photo = false,
  photoUrl = heroMega.url,
}: {
  className?: string;
  /** Layer real infrastructure photography beneath the blueprint grid. */
  photo?: boolean;
  photoUrl?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ backgroundColor: "var(--iw-dark-deep)" }}
    >
      {/* real infrastructure photography */}
      {photo ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url("${photoUrl}")` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,14,26,0.82) 0%, rgba(7,14,26,0.86) 55%, rgba(7,14,26,0.97) 100%)",
            }}
          />
        </>
      ) : null}

      {/* deep oceanic depth field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 12% 0%, color-mix(in oklab, var(--iw-dark-accent) 14%, transparent), transparent 62%), radial-gradient(ellipse 70% 50% at 88% 12%, color-mix(in oklab, var(--iw-accent) 12%, transparent), transparent 60%)",
        }}
      />

      {/* drafting grid */}
      <div className="iw-blueprint-grid absolute inset-0" />

      {/* hydraulic streams */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="iw-stream" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--iw-dark-accent)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--iw-dark-accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--iw-accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {[
          "M-100 250 C 260 250, 340 140, 640 140 S 1060 320, 1540 300",
          "M-100 430 C 300 430, 420 520, 760 520 S 1180 400, 1540 430",
          "M-100 640 C 240 640, 380 700, 700 700 S 1140 610, 1540 660",
          "M-100 810 C 320 810, 470 760, 820 780 S 1220 840, 1540 800",
        ].map((d, i) => (
          <g key={d}>
            <path d={d} stroke="var(--iw-dark-border)" strokeWidth="1" />
            <path
              className="iw-flow-stream"
              d={d}
              stroke="url(#iw-stream)"
              strokeWidth="1.5"
              style={{ animationDelay: `${i * 2.2}s` }}
            />
          </g>
        ))}

        {/* glowing hydraulic nodes on the drafting lines */}
        {[
          [640, 140],
          [760, 520],
          [700, 700],
          [1180, 400],
          [820, 780],
        ].map(([cx, cy], i) => (
          <g key={`${cx}-${cy}`}>
            {/* High-performance fake blur underlay */}
            <circle
              className="iw-node-pulse"
              cx={cx}
              cy={cy}
              r="12"
              fill="var(--iw-dark-accent)"
              opacity="0.15"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
            <circle
              className="iw-radar"
              cx={cx}
              cy={cy}
              r="6"
              fill="none"
              stroke="var(--iw-dark-accent)"
              strokeWidth="1"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
            <circle
              className="iw-node-pulse"
              cx={cx}
              cy={cy}
              r="3.5"
              fill="var(--iw-dark-accent)"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
          </g>
        ))}
      </svg>

      {/* legibility wash */}
      <div className="iw-hero-wash absolute inset-0" />
    </div>
  );
}
