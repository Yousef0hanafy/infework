import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  LayoutGrid,
  Sparkles,
  Factory,
  CheckCircle2,
  Boxes,
} from "lucide-react";

import {
  SUPPLIERS,
  SUPPLIER_CATEGORIES,
  CATEGORY_BADGES,
  type Supplier,
  type SupplierCategory,
} from "@/lib/suppliers";

function SupplierCard({
  supplier,
  isAr,
  viewMode = "marquee",
}: {
  supplier: Supplier;
  isAr: boolean;
  viewMode?: "marquee" | "grid";
}) {
  const badge = CATEGORY_BADGES[supplier.category] || { en: "Partner", ar: "شريك" };

  return (
    <figure
      className={`group relative flex select-none flex-col justify-between rounded-xl border bg-white p-3.5 sm:p-4 md:p-5 transition-all duration-200 ${
        viewMode === "marquee"
          ? "mx-2 sm:mx-2.5 h-44 w-56 shrink-0 sm:h-46 sm:w-60 md:h-48 md:w-68 hover:-translate-y-1 hover:shadow-md"
          : "h-46 sm:h-48 w-full hover:-translate-y-1 hover:shadow-md"
      }`}
      style={{
        borderColor: "var(--iw-border, rgba(11,22,40,0.1))",
        boxShadow: "0 2px 12px -4px rgba(11, 22, 40, 0.05)",
      }}
    >
      {/* Category micro badge */}
      <div className="flex w-full items-center justify-between gap-1">
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase sm:text-[9.5px]"
          style={{
            backgroundColor: "rgba(11, 22, 40, 0.05)",
            color: "var(--iw-text-secondary, #4b5563)",
          }}
        >
          <Factory className="h-2.5 w-2.5 shrink-0 text-slate-500" />
          <span className="whitespace-nowrap font-medium">{isAr ? badge.ar : badge.en}</span>
        </span>

        <span
          className="flex items-center gap-0.5 text-[9px] font-medium transition-colors group-hover:text-[var(--iw-accent)] sm:text-[9.5px]"
          style={{ color: "var(--iw-text-muted, #9ca3af)" }}
        >
          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
          <span className="hidden sm:inline">{isAr ? "معتمد" : "Verified"}</span>
        </span>
      </div>

      {/* Centered logo presentation with retina bounds */}
      <div className="flex h-16 sm:h-20 w-full items-center justify-center p-1 md:h-22">
        <img
          src={supplier.src}
          alt={isAr ? supplier.ar : supplier.en}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="max-h-full max-w-[85%] object-contain transition-transform duration-200 filter group-hover:scale-105"
        />
      </div>

      {/* Bilingual caption */}
      <figcaption className="mt-1 flex flex-col items-center justify-center text-center">
        <span
          className="line-clamp-2 min-h-[2.4em] leading-snug w-full text-[11px] font-semibold tracking-tight sm:text-xs md:text-[13px]"
          style={{ color: "var(--iw-text-primary, #0b1628)" }}
        >
          {isAr ? supplier.ar : supplier.en}
        </span>
      </figcaption>

      {/* Accent edge indicator */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-b-xl origin-center scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
        style={{ backgroundColor: "var(--iw-accent, #c27803)" }}
      />
    </figure>
  );
}

export default function SuppliersShowcase({ isAr }: { isAr: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");
  const [activeCategory, setActiveCategory] = useState<SupplierCategory>("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Animation state in refs (reverse direction from clients for visual harmony)
  const positionRef = useRef(0);
  const baseSpeedRef = useRef(0.65); // Pixels per frame
  const animFrameId = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);

  // Drag tracking refs
  const startXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const filteredSuppliers = useMemo(() => {
    if (activeCategory === "all") return SUPPLIERS;
    return SUPPLIERS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Ensure marquee set always has enough items (at least 8 cards, ~2000px+) to span any monitor width
  const displaySuppliers = useMemo(() => {
    if (filteredSuppliers.length === 0) return [];
    if (filteredSuppliers.length >= 8) return filteredSuppliers;
    const repeatCount = Math.ceil(8 / filteredSuppliers.length);
    const repeated: Supplier[] = [];
    for (let i = 0; i < repeatCount; i++) {
      repeated.push(...filteredSuppliers);
    }
    return repeated;
  }, [filteredSuppliers]);

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
          positionRef.current += baseSpeedRef.current * delta;
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
        trackRef.current.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isDragging, isPlaying, isHovered, viewMode, isAr]);

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

    velocityRef.current = ((currentX - lastXRef.current) / dt) * 15;
    lastXRef.current = currentX;
    lastTimeRef.current = now;

    const setWidth = singleSetWidthRef.current;
    let newPos = dragStartPosRef.current - deltaX;

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

    if (isNext) {
      positionRef.current = (positionRef.current + cardWidth) % (setWidth || 1);
    } else {
      positionRef.current =
        (((positionRef.current - cardWidth) % (setWidth || 1)) + (setWidth || 1)) % (setWidth || 1);
    }
  };

  // Only 2 sets needed for seamless infinite looping (33% performance gain)
  const sets = [0, 1];

  return (
    <section
      aria-label={isAr ? "الموردون المعتمدون" : "Approved Suppliers"}
      className="relative mt-8 sm:mt-10 w-full select-none"
    >
      {/* Unified Controls Bar — 2-tier responsive layout preventing any element collisions */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 mb-6 flex flex-col gap-3.5">
        {/* Sub-bar: Status indicator & View/Playback Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full border-b border-gray-200/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--iw-accent)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--iw-accent)]"></span>
            </span>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--iw-accent, #c27803)" }}
            >
              {isAr ? "شركاء التوريد والتصنيع" : "Verified Supply Chain"}
            </span>
          </div>

          {/* View mode toggle & playback controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto" dir="ltr">
            {/* View Mode Toggle: Ribbon vs Grid */}
            <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("marquee")}
                aria-label={isAr ? "شريط متحرك" : "Marquee Ribbon"}
                className={`flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors ${
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
                className={`flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors ${
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

        {/* Category filtering tabs — full width, scrollable on mobile with smooth cushioning */}
        <div className="flex w-full items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth px-1 sm:px-0 pb-1 sm:flex-wrap">
          {SUPPLIER_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id as SupplierCategory);
                  positionRef.current = 0;
                }}
                className={`shrink-0 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--iw-text-primary,#0b1628)] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            );
          })}
          {/* Mobile end cushion to prevent edge clipping */}
          <div className="w-4 shrink-0 sm:hidden" aria-hidden="true" />
        </div>
      </div>

      {/* VIEW 1: Marquee Kinetic Ribbon */}
      {viewMode === "marquee" && (
        <div
          ref={containerRef}
          dir="ltr"
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
                {displaySuppliers.map((supplier, idx) => (
                  <SupplierCard
                    key={`${sIdx}-${supplier.id}-${idx}`}
                    supplier={supplier}
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
          {filteredSuppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} isAr={isAr} viewMode="grid" />
          ))}
        </div>
      )}
    </section>
  );
}
