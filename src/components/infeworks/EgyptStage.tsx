// Infeworks — authored SVG vector stage of Egypt.
// Not a tile map: hand-plotted territory, coastlines, Nile ribbon and coordinate
// graticule, with illuminated nodes for delivered projects. Governorate / city
// centroids only — never a precise facility position.

export type StageNode = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  count?: number;
  sublabel?: string | null;
  dimmed?: boolean;
};

/* ── projection ───────────────────────────────────────────────────────────── */
const LON0 = 24;
const LON1 = 37;
const LAT0 = 21.2;
const LAT1 = 32.2;
const VW = 1000;
const SX = VW / (LON1 - LON0); // px per degree longitude
const SY = SX / Math.cos((27 * Math.PI) / 180); // px per degree latitude
const VH = Math.round((LAT1 - LAT0) * SY);

const px = (lng: number) => (lng - LON0) * SX;
const py = (lat: number) => (LAT1 - lat) * SY;

const poly = (pts: [number, number][]) =>
  pts
    .map(([lng, lat], i) => `${i ? "L" : "M"}${px(lng).toFixed(1)} ${py(lat).toFixed(1)}`)
    .join(" ");

/* ── authored geometry (lon, lat) ─────────────────────────────────────────── */
const TERRITORY: [number, number][] = [
  // Mediterranean coast, west to east
  [24.7, 31.34],
  [25.15, 31.59],
  [25.85, 31.51],
  [26.7, 31.42],
  [27.4, 31.33],
  [28.2, 31.11],
  [28.9, 30.86],
  [29.45, 30.98],
  [29.88, 31.2],
  [30.15, 31.33],
  [30.42, 31.46],
  [30.95, 31.53],
  [31.35, 31.6],
  [31.55, 31.47],
  [31.85, 31.42],
  [32.15, 31.32],
  [32.32, 31.25],
  // Sinai north coast → Rafah
  [32.9, 31.12],
  [33.35, 31.07],
  [33.8, 31.13],
  [34.05, 31.2],
  [34.26, 31.22],
  // Israel border to Taba
  [34.55, 30.4],
  [34.78, 29.86],
  [34.9, 29.49],
  // Gulf of Aqaba, west shore south to Ras Muhammad
  [34.72, 28.9],
  [34.6, 28.4],
  [34.42, 28.0],
  [34.28, 27.75],
  [34.22, 27.72],
  // Gulf of Suez, east shore north to Suez
  [33.85, 28.3],
  [33.4, 28.9],
  [32.95, 29.45],
  [32.63, 29.85],
  [32.56, 29.93],
  // Red Sea, African shore south
  [32.42, 29.62],
  [32.62, 29.2],
  [33.02, 28.6],
  [33.28, 28.05],
  [33.62, 27.35],
  [33.95, 26.7],
  [34.25, 26.0],
  [34.72, 25.35],
  [35.15, 24.5],
  [35.48, 23.9],
  [35.68, 23.2],
  [36.05, 22.5],
  [36.9, 22.0],
  // Southern border along 22°N (with the Wadi Halfa salient simplified)
  [33.2, 21.99],
  [31.5, 21.99],
  [24.98, 21.99],
  // Libyan border north
  [24.98, 25.0],
  [24.98, 29.2],
  [24.7, 30.0],
];

const NILE: [number, number][] = [
  [32.9, 22.05],
  [32.95, 22.9],
  [32.9, 23.6],
  [32.9, 24.09],
  [32.72, 24.6],
  [32.6, 25.05],
  [32.66, 25.7],
  [32.4, 26.15],
  [31.9, 26.35],
  [31.5, 26.9],
  [31.2, 27.4],
  [30.95, 28.1],
  [31.02, 28.7],
  [31.14, 29.4],
  [31.24, 30.05],
];

const NILE_ROSETTA: [number, number][] = [
  [31.24, 30.05],
  [30.95, 30.6],
  [30.62, 31.05],
  [30.42, 31.46],
];
const NILE_DAMIETTA: [number, number][] = [
  [31.24, 30.05],
  [31.42, 30.6],
  [31.65, 31.05],
  [31.85, 31.42],
];
const NASSER: [number, number][] = [
  [32.88, 23.95],
  [32.65, 23.4],
  [32.6, 22.7],
  [32.4, 22.2],
  [32.9, 22.02],
  [33.1, 22.6],
  [33.05, 23.2],
  [32.98, 23.9],
];
const SUEZ_CANAL: [number, number][] = [
  [32.32, 31.25],
  [32.35, 30.85],
  [32.32, 30.4],
  [32.56, 29.93],
];

const LON_TICKS = [25, 27, 29, 31, 33, 35];
const LAT_TICKS = [22, 24, 26, 28, 30, 32];

const CITIES: { lng: number; lat: number; name: string; anchor?: "start" | "end" }[] = [
  { lng: 31.24, lat: 30.05, name: "Cairo" },
  { lng: 29.92, lat: 31.2, name: "Alexandria", anchor: "end" },
  { lng: 32.9, lat: 24.09, name: "Aswan" },
  { lng: 32.56, lat: 29.93, name: "Suez" },
];

export default function EgyptStage({
  nodes = [],
  selectedId,
  onSelect,
  onHover,
  ariaLabel = "Map of Infeworks project locations across Egypt",
}: {
  nodes?: StageNode[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Reports the hovered node with its position as a percentage of the stage box. */
  onHover?: (id: string | null, pos?: { x: number; y: number }) => void;
  ariaLabel?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      role="group"
      aria-label={ariaLabel}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="iw-land" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#12233d" />
          <stop offset="100%" stopColor="#0c1a2e" />
        </linearGradient>
        <radialGradient id="iw-node-glow">
          <stop offset="0%" stopColor="#00c8d5" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#00c8d5" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00c8d5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="iw-nile" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00c8d5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00c8d5" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* sea */}
      <rect x="0" y="0" width={VW} height={VH} fill="#070e1a" />

      {/* coordinate graticule */}
      <g stroke="#00c8d5" strokeOpacity="0.09" strokeWidth="0.8">
        {LON_TICKS.map((l) => (
          <line key={`v${l}`} x1={px(l)} y1={0} x2={px(l)} y2={VH} />
        ))}
        {LAT_TICKS.map((l) => (
          <line key={`h${l}`} x1={0} y1={py(l)} x2={VW} y2={py(l)} />
        ))}
      </g>
      <g
        fill="#5b7794"
        fontSize="11"
        fontFamily="var(--font-mono, ui-monospace)"
        letterSpacing="1.4"
      >
        {LON_TICKS.map((l) => (
          <text key={`vt${l}`} x={px(l) + 5} y={VH - 10}>
            {l}°E
          </text>
        ))}
        {LAT_TICKS.map((l) => (
          <text key={`ht${l}`} x={8} y={py(l) - 7}>
            {l}°N
          </text>
        ))}
      </g>

      {/* territory */}
      <path
        d={`${poly(TERRITORY)} Z`}
        fill="url(#iw-land)"
        stroke="#3f6d86"
        strokeOpacity="0.85"
        strokeWidth="1.6"
      />
      {/* coastal halo */}
      <path
        d={`${poly(TERRITORY)} Z`}
        fill="none"
        stroke="#00c8d5"
        strokeOpacity="0.22"
        strokeWidth="5"
      />

      {/* Lake Nasser */}
      <path
        d={`${poly(NASSER)} Z`}
        fill="#00c8d5"
        fillOpacity="0.22"
        stroke="#00c8d5"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />

      {/* Nile + delta branches */}
      <g fill="none" stroke="url(#iw-nile)" strokeLinecap="round">
        <path d={poly(NILE)} strokeWidth="2.6" />
        <path d={poly(NILE_ROSETTA)} strokeWidth="1.8" />
        <path d={poly(NILE_DAMIETTA)} strokeWidth="1.8" />
      </g>
      {/* Suez canal */}
      <path
        d={poly(SUEZ_CANAL)}
        fill="none"
        stroke="#00c8d5"
        strokeOpacity="0.4"
        strokeWidth="1.2"
        strokeDasharray="6 5"
      />

      {/* sea / gulf annotations */}
      <g
        fill="#3f5a76"
        fontSize="11"
        letterSpacing="2.4"
        fontFamily="var(--font-mono, ui-monospace)"
      >
        <text x={px(27.6)} y={py(31.95)}>
          MEDITERRANEAN
        </text>
        <text x={px(35.55)} y={py(25.2)}>
          RED SEA
        </text>
        <text x={px(24.2) + 6} y={py(27.5)} opacity="0.7">
          WESTERN DESERT
        </text>
        <text x={px(33.6)} y={py(29.9)} opacity="0.8">
          SINAI
        </text>
      </g>

      {/* reference cities */}
      <g>
        {CITIES.map((cty) => (
          <g key={cty.name}>
            <rect
              x={px(cty.lng) - 2}
              y={py(cty.lat) - 2}
              width="4"
              height="4"
              fill="#8fa3c0"
              fillOpacity="0.7"
            />
            <text
              x={cty.anchor === "end" ? px(cty.lng) - 8 : px(cty.lng) + 8}
              y={py(cty.lat) + 4}
              textAnchor={cty.anchor === "end" ? "end" : "start"}
              fill="#8fa3c0"
              fillOpacity="0.75"
              fontSize="12"
              letterSpacing="1"
              fontFamily="var(--font-mono, ui-monospace)"
            >
              {cty.name}
            </text>
          </g>
        ))}
      </g>

      {/* project nodes */}
      {nodes.map((n) => {
        const x = px(n.lng);
        const y = py(n.lat);
        const on = selectedId === n.id;
        const dim = n.dimmed;
        return (
          <g
            key={n.id}
            role="button"
            tabIndex={0}
            aria-label={`${n.label}${n.sublabel ? ` — ${n.sublabel}` : ""}${n.count ? ` (${n.count} projects)` : ""}`}
            aria-pressed={on}
            onClick={() => onSelect?.(n.id)}
            onMouseEnter={(e) => {
              if (!onHover) return;
              const svg = e.currentTarget.ownerSVGElement;
              const ctm = e.currentTarget.getScreenCTM();
              const box = svg?.getBoundingClientRect();
              if (!box || !ctm) return onHover(n.id);
              const pt = new DOMPoint(x, y).matrixTransform(ctm);
              onHover(n.id, {
                x: ((pt.x - box.left) / box.width) * 100,
                y: ((pt.y - box.top) / box.height) * 100,
              });
            }}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(n.id);
              }
            }}
            style={{ cursor: onSelect ? "pointer" : "default", outline: "none" }}
            className="iw-stage-node"
            opacity={dim ? 0.4 : 1}
          >
            <circle
              cx={x}
              cy={y}
              r="46"
              fill="url(#iw-node-glow)"
              opacity={on ? 1 : 0.55}
              pointerEvents="none"
            />
            {/* hover/click target */}
            <circle cx={x} cy={y} r="22" fill="transparent" />
            {!dim ? (
              <>
                <circle
                  className="iw-radar"
                  pointerEvents="none"
                  cx={x}
                  cy={y}
                  r="12"
                  fill="none"
                  stroke="#00c8d5"
                  strokeWidth="1.2"
                />
                <circle
                  className="iw-radar"
                  pointerEvents="none"
                  cx={x}
                  cy={y}
                  r="12"
                  fill="none"
                  stroke="#00c8d5"
                  strokeWidth="1"
                  style={{ animationDelay: "1.4s" }}
                />
              </>
            ) : null}
            {/* crosshair ticks */}
            <g stroke="#00c8d5" strokeOpacity={on ? 0.9 : 0.45} strokeWidth="1">
              <line x1={x - 22} y1={y} x2={x - 12} y2={y} />
              <line x1={x + 12} y1={y} x2={x + 22} y2={y} />
              <line x1={x} y1={y - 22} x2={x} y2={y - 12} />
              <line x1={x} y1={y + 12} x2={x} y2={y + 22} />
            </g>
            <circle
              cx={x}
              cy={y}
              r={on ? 10 : 8}
              fill="#070e1a"
              stroke={on ? "#ffffff" : "#00c8d5"}
              strokeWidth={on ? 2.4 : 1.8}
            />
            {n.count && n.count > 1 ? (
              <text
                x={x}
                y={y + 3.5}
                textAnchor="middle"
                fill={on ? "#ffffff" : "#00c8d5"}
                fontSize="10"
                fontWeight="bold"
                fontFamily="var(--font-mono, ui-monospace)"
                pointerEvents="none"
              >
                {n.count}
              </text>
            ) : (
              <circle
                cx={x}
                cy={y}
                r={on ? 3.5 : 2.5}
                fill={on ? "#ffffff" : "#00c8d5"}
                pointerEvents="none"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
