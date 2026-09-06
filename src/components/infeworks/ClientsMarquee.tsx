import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  LayoutGrid,
  Sparkles,
  Building2,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";

import abnaaSinai from "@/assets/clients/01_abnaa_sinai.webp";
import armedForces from "@/assets/clients/02_egyptian_armed_forces.webp";
import ministryInterior from "@/assets/clients/03_ministry_interior.webp";
import nspo from "@/assets/clients/04_nspo.webp";
import nopwasd from "@/assets/clients/05_nopwasd.webp";
import engineeringAuthority from "@/assets/clients/06_engineering_authority.webp";
import redSeaWater from "@/assets/clients/07_red_sea_water_company.webp";
import malr from "@/assets/clients/08_malr.webp";
import nationalContracting from "@/assets/clients/09_national_contracting.webp";
import eastOwainat from "@/assets/clients/10_east_owainat.webp";
import environment from "@/assets/clients/11_environment.webp";
import egyptGas from "@/assets/clients/12_egypt_gas.webp";
import gieco from "@/assets/clients/13_gieco.webp";
import ebdaInitiative from "@/assets/clients/14_ebda_initiative.png";
import alsharqConstruction from "@/assets/clients/15_alsharq_construction.png";
import elzahyGroup from "@/assets/clients/16_elzahy_group.png";
import elnubyGroup from "@/assets/clients/17_elnuby_group.png";

export type ClientCategory = "all" | "sovereign" | "utilities" | "contractors";

export type Client = {
  id: string;
  src: string;
  en: string;
  ar: string;
  category: "sovereign" | "utilities" | "contractors";
  categoryLabel: { en: string; ar: string };
  projectHighlight?: { en: string; ar: string; slug?: string };
};

export const CLIENTS: Client[] = [
  {
    id: "nspo",
    src: nspo,
    en: "National Service Projects Organization",
    ar: "جهاز مشروعات الخدمة الوطنية",
    category: "sovereign",
    categoryLabel: { en: "Sovereign Authority", ar: "جهة سيادية" },
    projectHighlight: {
      en: "Sadat City RO & Food City Complex",
      ar: "محطة تحلية السادات ومجمع الصناعات الغذائية",
      slug: "sadat-city-ro",
    },
  },
  {
    id: "engineeringAuthority",
    src: engineeringAuthority,
    en: "Engineering Authority of the Armed Forces",
    ar: "الهيئة الهندسية للقوات المسلحة",
    category: "sovereign",
    categoryLabel: { en: "Major Projects", ar: "مشروعات كبرى" },
    projectHighlight: {
      en: "Arish Airport Regional Trunk Lines",
      ar: "خطوط نقل مياه مطار العريش",
      slug: "arish-water-supply",
    },
  },
  {
    id: "armedForces",
    src: armedForces,
    en: "Egyptian Armed Forces",
    ar: "القوات المسلحة المصرية",
    category: "sovereign",
    categoryLabel: { en: "Strategic Projects", ar: "أعمال استراتيجية" },
    projectHighlight: {
      en: "Strategic Lifting & Water Systems",
      ar: "منظومات الرفع والمياه الاستراتيجية",
    },
  },
  {
    id: "ministryInterior",
    src: ministryInterior,
    en: "Ministry of Interior",
    ar: "وزارة الداخلية المصرية",
    category: "sovereign",
    categoryLabel: { en: "Government", ar: "جهة حكومية" },
  },
  {
    id: "nopwasd",
    src: nopwasd,
    en: "NOPWASD — Potable Water & Sanitary Drainage",
    ar: "الهيئة القومية لمياه الشرب والصرف الصحي",
    category: "utilities",
    categoryLabel: { en: "Water Authority", ar: "مرفق المياه" },
    projectHighlight: {
      en: "Awlad El-Sheikh Potable Water Hub",
      ar: "محطة رفع وتغذية أولاد الشيخ",
      slug: "awlad-el-sheikh-pumping",
    },
  },
  {
    id: "redSeaWater",
    src: redSeaWater,
    en: "Red Sea Water & Wastewater Company",
    ar: "شركة مياه الشرب والصرف الصحي بالبحر الأحمر",
    category: "utilities",
    categoryLabel: { en: "Regional Utility", ar: "مياه إقليمية" },
  },
  {
    id: "malr",
    src: malr,
    en: "Ministry of Agriculture & Land Reclamation",
    ar: "وزارة الزراعة واستصلاح الأراضي",
    category: "sovereign",
    categoryLabel: { en: "Reclamation", ar: "استصلاح وزراعة" },
  },
  {
    id: "environment",
    src: environment,
    en: "Ministry of Environment (EEAA)",
    ar: "وزارة البيئة وجهاز شؤون البيئة",
    category: "utilities",
    categoryLabel: { en: "Environment", ar: "شؤون البيئة" },
  },
  {
    id: "egyptGas",
    src: egyptGas,
    en: "Egypt Gas",
    ar: "غاز مصر",
    category: "utilities",
    categoryLabel: { en: "Energy Sector", ar: "قطاع الطاقة" },
  },
  {
    id: "eastOwainat",
    src: eastOwainat,
    en: "East Owainat Land Reclamation Co.",
    ar: "شركة شرق العوينات لاستصلاح الأراضي",
    category: "sovereign",
    categoryLabel: { en: "Land Reclamation", ar: "استصلاح أراضي" },
    projectHighlight: {
      en: "Toshka & Owainat Pumping Stations",
      ar: "محطات رفع وتغذية توشكى والعوينات",
      slug: "toshka-pumping-stations",
    },
  },
  {
    id: "nationalContracting",
    src: nationalContracting,
    en: "National Co. for General Contracting & Supplies",
    ar: "الشركة الوطنية للمقاولات العامة والتوريدات",
    category: "contractors",
    categoryLabel: { en: "General Contracting", ar: "مقاولات عامة" },
    projectHighlight: {
      en: "East Delta Infrastructure Networks",
      ar: "شبكات ومحطات دلتا الشرق",
      slug: "east-delta-wastewater",
    },
  },
  {
    id: "abnaaSinai",
    src: abnaaSinai,
    en: "Abnaa Sinai Construction & Building",
    ar: "أبناء سيناء للتشييد والبناء — العرجاني جروب",
    category: "contractors",
    categoryLabel: { en: "Infrastructure", ar: "بنية تحتية" },
    projectHighlight: {
      en: "Arish Strategic Water Supply",
      ar: "مشروع تغذية العريش وشمال سيناء",
      slug: "arish-water-supply",
    },
  },
  {
    id: "gieco",
    src: gieco,
    en: "GIECO — Gharably Integrated Engineering",
    ar: "مجموعة الغرابلي للأعمال الهندسية المتكاملة",
    category: "contractors",
    categoryLabel: { en: "Heavy Engineering", ar: "هندسة متكاملة" },
  },
  {
    id: "ebdaInitiative",
    src: ebdaInitiative,
    en: "National Initiative for Egyptian Industry — EBDA",
    ar: "المبادرة الوطنية لتطوير الصناعة المصرية — ابدأ",
    category: "sovereign",
    categoryLabel: { en: "National Initiative", ar: "مبادرة وطنية" },
    projectHighlight: {
      en: "Industrial Infrastructure & Factories",
      ar: "بنية تحتية للمصانع والمناطق الصناعية",
    },
  },
  {
    id: "alsharqConstruction",
    src: alsharqConstruction,
    en: "AlShark Construction",
    ar: "شركة الشرق للمقاولات",
    category: "contractors",
    categoryLabel: { en: "Contracting", ar: "مقاولات وتشييد" },
    projectHighlight: {
      en: "Infrastructure & Civil Works Delivery",
      ar: "تنفيذ مشروعات البنية التحتية والأعمال المدنية",
    },
  },
  {
    id: "elzahyGroup",
    src: elzahyGroup,
    en: "EL-ZAHY GROUP",
    ar: "الزاهي جروب",
    category: "contractors",
    categoryLabel: { en: "Industrial Group", ar: "مجموعة صناعية" },
    projectHighlight: {
      en: "Industrial & Electromechanical Packages",
      ar: "حزم الأعمال الكهروميكانيكية والمنشآت",
    },
  },
  {
    id: "elnubyGroup",
    src: elnubyGroup,
    en: "El Nuby Group",
    ar: "مجموعة النوبى",
    category: "contractors",
    categoryLabel: { en: "Civil Contracting", ar: "مقاولات وتنفيذ" },
    projectHighlight: {
      en: "Regional Utility Networks & Earthworks",
      ar: "تنفيذ شبكات المرافق والأعمال الترابية",
    },
  },
];

function ClientCard({
  client,
  isAr,
  viewMode = "marquee",
}: {
  client: Client;
  isAr: boolean;
  viewMode?: "marquee" | "grid";
}) {
  return (
    <figure
      className={`group relative flex select-none flex-col justify-between rounded-xl border bg-white p-3.5 sm:p-4 md:p-5 transition-all duration-200 ${
        viewMode === "marquee"
          ? "mx-2 sm:mx-2.5 h-38 w-48 shrink-0 sm:h-44 sm:w-60 md:h-48 md:w-68 hover:-translate-y-1 hover:shadow-md"
          : "h-44 sm:h-48 w-full hover:-translate-y-1 hover:shadow-md"
      }`}
      style={{
        borderColor: "var(--iw-border, rgba(11,22,40,0.1))",
        boxShadow: "0 2px 12px -4px rgba(11, 22, 40, 0.05)",
      }}
    >
      {/* Category micro badge */}
      <div className="flex w-full items-center justify-between">
        <span
          className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[9px] font-semibold tracking-wide uppercase sm:text-[9.5px]"
          style={{
            backgroundColor: "rgba(194, 120, 3, 0.08)",
            color: "var(--iw-accent, #c27803)",
          }}
        >
          <ShieldCheck className="h-2.5 w-2.5 shrink-0" />
          <span className="whitespace-nowrap font-medium">
            {isAr ? client.categoryLabel.ar : client.categoryLabel.en}
          </span>
        </span>
      </div>

      {/* Centered logo presentation with retina bounds */}
      <div className="flex h-16 sm:h-20 w-full items-center justify-center p-1 md:h-24">
        <img
          src={client.src}
          alt={isAr ? client.ar : client.en}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="max-h-full max-w-[85%] object-contain transition-transform duration-200 filter group-hover:scale-105"
        />
      </div>

      {/* Bilingual caption */}
      <figcaption className="mt-1 flex flex-col items-center justify-center text-center">
        <span
          className="line-clamp-1 w-full text-[11px] font-semibold tracking-tight sm:text-xs md:text-[13px]"
          style={{ color: "var(--iw-text-primary, #0b1628)" }}
        >
          {isAr ? client.ar : client.en}
        </span>
        {client.projectHighlight && (
          <span
            className="mt-0.5 line-clamp-1 text-[9px] sm:text-[10px] md:text-[11px]"
            style={{ color: "var(--iw-text-secondary, #6b7280)" }}
          >
            {isAr ? client.projectHighlight.ar : client.projectHighlight.en}
          </span>
        )}
      </figcaption>

      {/* Copper accent edge indicator */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-b-xl origin-center scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
        style={{ backgroundColor: "var(--iw-accent, #c27803)" }}
      />
    </figure>
  );
}

export default function ClientsMarquee({ isAr }: { isAr: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [activeCategory, setActiveCategory] = useState<ClientCategory>("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Animation state in refs
  const positionRef = useRef(0);
  const baseSpeedRef = useRef(0.7); // Pixels per frame
  const animFrameId = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);

  // Drag tracking refs
  const startXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const filteredClients = useMemo(() => {
    if (activeCategory === "all") return CLIENTS;
    return CLIENTS.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  // Ensure marquee set always has enough items (at least 8 cards, ~2000px+) to span any monitor width
  const displayClients = useMemo(() => {
    if (filteredClients.length === 0) return [];
    if (filteredClients.length >= 8) return filteredClients;
    const repeatCount = Math.ceil(8 / filteredClients.length);
    const repeated: Client[] = [];
    for (let i = 0; i < repeatCount; i++) {
      repeated.push(...filteredClients);
    }
    return repeated;
  }, [filteredClients]);

  const updateMetrics = useCallback(() => {
    if (singleSetRef.current) {
      singleSetWidthRef.current = singleSetRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics, activeCategory, viewMode]);

  // Reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
    const handler = (e: MediaQueryListEvent) => {
      setIsPlaying(!e.matches);
    };
    mediaQuery.addEventListener?.("change", handler);
    return () => mediaQuery.removeEventListener?.("change", handler);
  }, []);

  // Continuous animation loop (hardware accelerated translate3d)
  useEffect(() => {
    if (viewMode !== "marquee") return;

    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const delta = Math.min((timestamp - lastTimestamp) / 16.67, 2.5);
      lastTimestamp = timestamp;

      const setWidth = singleSetWidthRef.current;

      if (!isDragging && setWidth > 0) {
        if (isPlaying && !isHovered) {
          positionRef.current += baseSpeedRef.current * speedMultiplier * delta;
        }

        // Apply drag inertia decay
        if (Math.abs(velocityRef.current) > 0.05) {
          positionRef.current -= velocityRef.current;
          velocityRef.current *= 0.92;
        }

        // Seamless 2-set infinite loop wrap
        if (positionRef.current >= setWidth) {
          positionRef.current = positionRef.current % setWidth;
        } else if (positionRef.current < 0) {
          positionRef.current = (positionRef.current % setWidth) + setWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${isAr ? positionRef.current : -positionRef.current}px, 0, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isDragging, isPlaying, isHovered, speedMultiplier, viewMode, isAr]);

  // Drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode !== "marquee") return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    dragStartPosRef.current = positionRef.current;
    velocityRef.current = 0;

    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || viewMode !== "marquee") return;

    const currentX = e.clientX;
    const deltaX = currentX - startXRef.current;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);

    const directionFactor = isAr ? -1 : 1;

    velocityRef.current = (((currentX - lastXRef.current) * directionFactor) / dt) * 15;
    lastXRef.current = currentX;
    lastTimeRef.current = now;

    const setWidth = singleSetWidthRef.current;
    let newPos = dragStartPosRef.current - deltaX * directionFactor;

    if (setWidth > 0) {
      if (newPos >= setWidth) {
        newPos = newPos % setWidth;
      } else if (newPos < 0) {
        newPos = (newPos % setWidth) + setWidth;
      }
    }

    positionRef.current = newPos;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleStep = (direction: "prev" | "next") => {
    const cardWidth = 280;
    const setWidth = singleSetWidthRef.current;

    const isNext = direction === "next";
    const shouldIncrease = isAr ? !isNext : isNext;

    if (shouldIncrease) {
      positionRef.current = (positionRef.current + cardWidth) % (setWidth || 1);
    } else {
      positionRef.current =
        (((positionRef.current - cardWidth) % (setWidth || 1)) + (setWidth || 1)) % (setWidth || 1);
    }
  };

  // Only 2 sets needed for seamless infinite looping (33% performance gain)
  const sets = [0, 1];

  const categories = [
    { id: "all", en: "All Partners", ar: "جميع الشركاء" },
    { id: "sovereign", en: "Sovereign & Defense", ar: "جهات سيادية ودفاعية" },
    { id: "utilities", en: "National Utilities", ar: "مرافق وطنية وبيئية" },
    { id: "contractors", en: "Key Contractors", ar: "كبرى شركات المقاولات" },
  ];

  return (
    <section
      aria-label={isAr ? "عملاؤنا وشركاؤنا" : "Our Clients & Partners"}
      className="relative mt-8 sm:mt-10 w-full select-none"
    >
      {/* Unified Controls Bar — 2-tier responsive layout preventing any element collisions */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-6 flex flex-col gap-3.5">
        {/* Sub-bar: Status indicator & View/Playback Controls */}
        <div className="flex items-center justify-between gap-3 w-full border-b border-gray-200/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--iw-accent)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--iw-accent)]"></span>
            </span>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--iw-accent, #c27803)" }}
            >
              {isAr ? "سجل التعاقدات والشراكات" : "Contracting Record"}
            </span>
          </div>

          {/* View mode toggle & playback controls */}
          <div className="flex items-center gap-2.5" dir="ltr">
            {/* View Mode Toggle: Ribbon vs Grid */}
            <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("marquee")}
                aria-label={isAr ? "شريط متحرك" : "Marquee Ribbon"}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === "marquee"
                    ? "bg-gray-100 text-gray-900 font-semibold shadow-xs"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isAr ? "شريط" : "Ribbon"}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label={isAr ? "شبكة الكل" : "Grid Directory"}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-gray-100 text-gray-900 font-semibold shadow-xs"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>{isAr ? "شبكة" : "Grid"}</span>
              </button>
            </div>

            {/* Marquee Playback Controls */}
            {viewMode === "marquee" && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStep("prev")}
                  aria-label={isAr ? "السابق" : "Previous"}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)] active:scale-95 sm:h-9 sm:w-9"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? (isAr ? "إيقاف مؤقت" : "Pause") : isAr ? "تشغيل" : "Play"}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)] active:scale-95 sm:h-9 sm:w-9"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleStep("next")}
                  aria-label={isAr ? "التالي" : "Next"}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)] active:scale-95 sm:h-9 sm:w-9"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category filtering tabs — full width, scrollable on mobile, wraps on tablet/desktop */}
        <div className="flex w-full items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id as ClientCategory);
                  positionRef.current = 0;
                }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--iw-text-primary,#0b1628)] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: Marquee Kinetic Ribbon */}
      {viewMode === "marquee" && (
        <div
          ref={containerRef}
          className="relative w-full cursor-grab overflow-hidden active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent)",
          }}
        >
          <div
            ref={trackRef}
            className="flex w-max will-change-transform py-3"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {sets.map((sIdx) => (
              <div
                key={sIdx}
                ref={sIdx === 0 ? singleSetRef : undefined}
                className="flex shrink-0"
                aria-hidden={sIdx > 0}
              >
                {displayClients.map((client, idx) => (
                  <ClientCard
                    key={`${sIdx}-${client.id}-${idx}`}
                    client={client}
                    isAr={isAr}
                    viewMode="marquee"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Grid Directory View */}
      {viewMode === "grid" && (
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-2">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} isAr={isAr} viewMode="grid" />
          ))}
        </div>
      )}
    </section>
  );
}
