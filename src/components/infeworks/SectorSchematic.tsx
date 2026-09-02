// Infeworks — authored conceptual engineering schematics, one per capability sector.
// Illustrative only: these are drafting-style diagrams, not fabrication drawings.

import type { SectorSlug } from "@/lib/sectors";

const LINE = "#8aa4c0";
const ACCENT = "#00c8d5";
const COPPER = "#b05e2a";

type Box = { x: number; y: number; w: number; h: number; l: string; sub?: string };

function Unit({ x, y, w, h, l, sub }: Box) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={LINE} strokeWidth="1.2" />
      <line
        x1={x}
        y1={y + 16}
        x2={x + w}
        y2={y + 16}
        stroke={LINE}
        strokeWidth="0.6"
        opacity="0.5"
      />
      <text x={x + 8} y={y + 11} fontSize="7.5" letterSpacing="1.1" fill={ACCENT}>
        {l.toUpperCase()}
      </text>
      {sub ? (
        <text x={x + 8} y={y + 32} fontSize="9" fill="#e8e2d6">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Flow({
  x1,
  y1,
  x2,
  y2,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={dashed ? COPPER : ACCENT}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "4 4" : undefined}
        opacity="0.85"
      />
      <polygon
        points={`${x2},${y2} ${x2 - 6},${y2 - 3.4} ${x2 - 6},${y2 + 3.4}`}
        fill={dashed ? COPPER : ACCENT}
        opacity="0.9"
        transform={y1 === y2 ? undefined : `rotate(90 ${x2} ${y2})`}
      />
    </g>
  );
}

function Tag({
  x,
  y,
  text,
  colour = COPPER,
}: {
  x: number;
  y: number;
  text: string;
  colour?: string;
}) {
  return (
    <text x={x} y={y} fontSize="7.5" letterSpacing="1.1" fill={colour}>
      {text.toUpperCase()}
    </text>
  );
}

function Pump({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={LINE} strokeWidth="1.2" fill="none">
      <circle cx={x} cy={y} r="13" />
      <polygon
        points={`${x - 5},${y - 7} ${x - 5},${y + 7} ${x + 8},${y}`}
        fill={ACCENT}
        opacity="0.5"
        stroke="none"
      />
    </g>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 900 300"
      className="h-full w-full"
      fontFamily="var(--font-mono, ui-monospace)"
    >
      <rect x="0" y="0" width="900" height="300" fill="#0b1628" />
      <g stroke={ACCENT} strokeOpacity="0.07" strokeWidth="0.7">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={300} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 50} x2={900} y2={i * 50} />
        ))}
      </g>
      {children}
    </svg>
  );
}

/* ── water treatment: RO train ────────────────────────────────────────────── */
function WaterTreatment() {
  return (
    <Frame>
      <Tag x={24} y={30} text="RO Treatment Train" colour={ACCENT} />
      <Unit x={24} y={110} w={112} h={70} l="01 Intake" sub="Raw water" />
      <Flow x1={136} y1={145} x2={172} y2={145} />
      <Unit x={172} y={110} w={112} h={70} l="02 Clarify" sub="Coag / floc" />
      <Flow x1={284} y1={145} x2={320} y2={145} />
      <Unit x={320} y={110} w={112} h={70} l="03 Filter" sub="Multimedia" />
      <Flow x1={432} y1={145} x2={468} y2={145} />
      <Pump x={484} y={145} />
      <Flow x1={500} y1={145} x2={532} y2={145} />
      <Unit x={532} y={96} w={140} h={98} l="04 RO Membranes" sub="Pressure vessels" />
      {[118, 140, 162].map((y) => (
        <line
          key={y}
          x1={544}
          y1={y}
          x2={660}
          y2={y}
          stroke={ACCENT}
          strokeWidth="3"
          opacity="0.35"
        />
      ))}
      <Flow x1={672} y1={145} x2={708} y2={145} />
      <Unit x={708} y={110} w={168} h={70} l="05 Post-treatment" sub="Disinfect · remineralise" />
      {/* dosing */}
      <Unit x={172} y={30} w={112} h={44} l="Dosing" />
      <Flow x1={228} y1={74} x2={228} y2={104} dashed />
      <Unit x={532} y={30} w={140} h={44} l="Antiscalant" />
      <Flow x1={602} y1={74} x2={602} y2={90} dashed />
      {/* reject */}
      <Flow x1={602} y1={194} x2={602} y2={232} dashed />
      <Tag x={618} y={236} text="Brine reject → managed discharge" />
      <Tag x={24} y={268} text="Product to storage · metered distribution" colour={ACCENT} />
    </Frame>
  );
}

/* ── wastewater: biological aeration ─────────────────────────────────────── */
function Wastewater() {
  return (
    <Frame>
      <Tag x={24} y={30} text="Biological Treatment Line" colour={ACCENT} />
      <Unit x={24} y={110} w={104} h={70} l="01 Screening" sub="Coarse / fine" />
      <Flow x1={128} y1={145} x2={160} y2={145} />
      <Unit x={160} y={110} w={104} h={70} l="02 Grease" sub="DAF / trap" />
      <Flow x1={264} y1={145} x2={296} y2={145} />
      <Unit x={296} y={110} w={104} h={70} l="03 Balance" sub="Equalisation" />
      <Flow x1={400} y1={145} x2={432} y2={145} />
      <Unit x={432} y={96} w={148} h={98} l="04 Aeration" sub="Extended / MBBR" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={452 + i * 28} cy={178} r="3.2" fill={ACCENT} opacity="0.55" />
          <circle cx={452 + i * 28} cy={164} r="2.2" fill={ACCENT} opacity="0.35" />
        </g>
      ))}
      <Flow x1={580} y1={145} x2={612} y2={145} />
      <Unit x={612} y={110} w={116} h={70} l="05 Clarifier" sub="Settlement" />
      <Flow x1={728} y1={145} x2={760} y2={145} />
      <Unit x={760} y={110} w={116} h={70} l="06 Polishing" sub="Filter · UV" />
      {/* blower */}
      <Unit x={432} y={30} w={148} h={44} l="Blowers" />
      <Flow x1={506} y1={74} x2={506} y2={90} dashed />
      {/* RAS / sludge */}
      <path
        d="M670 180 L670 236 L500 236"
        fill="none"
        stroke={COPPER}
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <Flow x1={520} y1={236} x2={500} y2={236} dashed />
      <Tag x={520} y={252} text="Return activated sludge" />
      <Unit x={760} y={30} w={116} h={44} l="Reuse" />
      <Flow x1={818} y1={104} x2={818} y2={78} />
      <Tag
        x={24}
        y={268}
        text="Discharge compliance verified by laboratory sampling"
        colour={ACCENT}
      />
    </Frame>
  );
}

/* ── pumping: booster manifold ───────────────────────────────────────────── */
function Pumping() {
  return (
    <Frame>
      <Tag x={24} y={30} text="Booster Pumping Manifold" colour={ACCENT} />
      <Unit x={24} y={120} w={116} h={60} l="Suction" sub="Wet well" />
      {/* suction header */}
      <line x1={140} y1={150} x2={220} y2={150} stroke={ACCENT} strokeWidth="1.6" />
      <line x1={220} y1={70} x2={220} y2={240} stroke={ACCENT} strokeWidth="2.2" />
      {[80, 150, 220].map((y, i) => (
        <g key={y}>
          <line x1={220} y1={y} x2={276} y2={y} stroke={ACCENT} strokeWidth="1.3" />
          <Pump x={292} y={y} />
          <line x1={308} y1={y} x2={352} y2={y} stroke={ACCENT} strokeWidth="1.3" />
          {/* check + isolation valve symbols */}
          <polygon
            points={`${360},${y - 8} ${360},${y + 8} ${374},${y}`}
            fill="none"
            stroke={LINE}
            strokeWidth="1.1"
          />
          <line x1={374} y1={y} x2={430} y2={y} stroke={ACCENT} strokeWidth="1.3" />
          <Tag
            x={252}
            y={y - 20}
            text={i === 2 ? "Standby" : `Duty 0${i + 1}`}
            colour={i === 2 ? COPPER : ACCENT}
          />
        </g>
      ))}
      {/* discharge header */}
      <line x1={430} y1={70} x2={430} y2={240} stroke={ACCENT} strokeWidth="2.2" />
      <line x1={430} y1={150} x2={520} y2={150} stroke={ACCENT} strokeWidth="1.6" />
      <Unit x={520} y={120} w={132} h={60} l="Surge vessel" sub="Anti-hammer" />
      <line x1={652} y1={150} x2={700} y2={150} stroke={ACCENT} strokeWidth="1.6" />
      <Unit x={700} y={120} w={176} h={60} l="Rising main" sub="To network" />
      <Unit x={520} y={30} w={356} h={44} l="VFD control panel · flow · pressure · level" />
      <Flow x1={698} y1={74} x2={698} y2={112} dashed />
      <Tag
        x={24}
        y={268}
        text="Duty point set from measured system curve · witnessed performance test"
        colour={ACCENT}
      />
    </Frame>
  );
}

/* ── infrastructure-networks: pipeline laying ───────────────────────────────── */
function InfrastructureNetworks() {
  return (
    <Frame>
      <Tag x={24} y={30} text="Infrastructure & Pipeline Network" colour={ACCENT} />
      <Unit x={24} y={110} w={120} h={70} l="01 Trenching" sub="Excavation" />
      <Flow x1={144} y1={145} x2={180} y2={145} />
      <Unit x={180} y={110} w={120} h={70} l="02 Pipe Laying" sub="HDPE / DI" />
      <Flow x1={300} y1={145} x2={336} y2={145} />
      <Unit x={336} y={110} w={120} h={70} l="03 Valves" sub="Chambers" />
      <Flow x1={456} y1={145} x2={492} y2={145} />
      <Unit x={492} y={110} w={120} h={70} l="04 Testing" sub="Hydrostatic" />
      <Flow x1={612} y1={145} x2={648} y2={145} />
      <Unit x={648} y={110} w={120} h={70} l="05 Handover" sub="Backfill" />
      <Tag x={24} y={268} text="Tested & commissioned utility networks" colour={ACCENT} />
    </Frame>
  );
}

/* ── civil-buildings: turnkey construction ───────────────────────────────── */
function CivilBuildings() {
  return (
    <Frame>
      <Tag x={24} y={30} text="Turnkey Building Construction" colour={ACCENT} />
      <Unit x={24} y={110} w={120} h={70} l="01 Foundation" sub="Raft / Footing" />
      <Flow x1={144} y1={145} x2={180} y2={145} />
      <Unit x={180} y={110} w={120} h={70} l="02 Structure" sub="Concrete" />
      <Flow x1={300} y1={145} x2={336} y2={145} />
      <Unit x={336} y={110} w={120} h={70} l="03 MEP Rough-in" sub="Conduits" />
      <Flow x1={456} y1={145} x2={492} y2={145} />
      <Unit x={492} y={110} w={120} h={70} l="04 Finishing" sub="Architectural" />
      <Flow x1={612} y1={145} x2={648} y2={145} />
      <Unit x={648} y={110} w={120} h={70} l="05 Turnover" sub="Snagging" />
      <Tag
        x={24}
        y={268}
        text="Delivering fully functional commercial and institutional facilities"
        colour={ACCENT}
      />
    </Frame>
  );
}

/* ── electrical & control: SCADA telemetry ───────────────────────────────── */
function ElectricalControl() {
  return (
    <Frame>
      <Tag x={24} y={30} text="Control & Telemetry Architecture" colour={ACCENT} />
      {/* field layer */}
      {[
        { x: 24, l: "Level TX", s: "4–20 mA" },
        { x: 168, l: "Flow meter", s: "Electromagnetic" },
        { x: 312, l: "Pressure TX", s: "Loop powered" },
        { x: 456, l: "Analyser", s: "pH · EC · Cl" },
      ].map((f) => (
        <g key={f.l}>
          <Unit x={f.x} y={226} w={128} h={56} l={f.l} sub={f.s} />
          <Flow x1={f.x + 64} y1={226} x2={f.x + 64} y2={196} />
        </g>
      ))}
      {/* IO bus */}
      <line x1={24} y1={192} x2={876} y2={192} stroke={ACCENT} strokeWidth="2.2" />
      <Tag x={700} y={184} text="Instrument bus" colour={ACCENT} />
      {/* control layer */}
      <Unit x={24} y={112} w={196} h={64} l="MCC" sub="Starters · VFDs" />
      <Unit x={252} y={112} w={196} h={64} l="PLC" sub="Interlocks · sequences" />
      <Unit x={480} y={112} w={196} h={64} l="HMI" sub="Trends · alarms" />
      <Unit x={708} y={112} w={168} h={64} l="Telemetry" sub="Remote gateway" />
      <Flow x1={122} y1={192} x2={122} y2={180} />
      <Flow x1={350} y1={192} x2={350} y2={180} />
      <Flow x1={220} y1={144} x2={252} y2={144} />
      <Flow x1={448} y1={144} x2={480} y2={144} />
      <Flow x1={676} y1={144} x2={708} y2={144} />
      {/* supervisory */}
      <Unit
        x={480}
        y={30}
        w={396}
        h={52}
        l="Operations dashboard"
        sub="Output logging · alarm escalation · monthly report"
      />
      <Flow x1={792} y1={112} x2={792} y2={86} />
      <Tag x={24} y={72} text="Unmanned sites monitored remotely" colour={COPPER} />
      <Tag x={24} y={92} text="Every alarm resolves to a named responsibility" colour={ACCENT} />
    </Frame>
  );
}

const MAP: Record<SectorSlug, () => React.ReactElement> = {
  "water-treatment": WaterTreatment,
  wastewater: Wastewater,
  "pumping-wells": Pumping,
  "infrastructure-networks": InfrastructureNetworks,
  "civil-buildings": CivilBuildings,
  "industrial-mep": ElectricalControl,
};

export default function SectorSchematic({
  slug,
  isAr,
  className = "",
}: {
  slug: SectorSlug;
  isAr: boolean;
  className?: string;
}) {
  const Diagram = MAP[slug];
  return (
    <figure
      className={`border ${className}`}
      style={{ borderColor: "var(--iw-dark-border)", backgroundColor: "#0b1628" }}
    >
      <div
        className="aspect-[2/1] sm:aspect-[5/2] md:aspect-[3/1] w-full overflow-x-auto no-scrollbar"
        dir="ltr"
      >
        <Diagram />
      </div>
      <figcaption
        className="label-mono border-t px-4 py-3"
        style={{
          borderColor: "var(--iw-dark-border)",
          color: "var(--iw-dark-text-muted)",
        }}
      >
        {isAr
          ? "مخطط هندسي توضيحي — لأغراض الشرح فقط وليس مستند تنفيذ"
          : "Conceptual engineering schematic — illustrative, not a construction document"}
      </figcaption>
    </figure>
  );
}
