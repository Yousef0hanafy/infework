// Infeworks — engineered scroll experience.
// Inertial (Lenis) smooth scrolling, a precision scroll-progress rule at the
// top of the viewport, and a survey-style "return to datum" control.

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollExperience({ isAr = false }: { isAr?: boolean }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let cancelled = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const showTop = y > window.innerHeight * 0.9;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = `${2 * Math.PI * 20 * (1 - progress)}`;
      }
      if (textRef.current) {
        textRef.current.innerText = `${Math.round(progress * 100)}%`;
      }
      if (btnRef.current) {
        if (showTop) {
          btnRef.current.classList.add(
            "pointer-events-auto",
            "translate-y-0",
            "opacity-100",
            "scale-100",
          );
          btnRef.current.classList.remove(
            "pointer-events-none",
            "translate-y-4",
            "opacity-0",
            "scale-90",
          );
        } else {
          btnRef.current.classList.remove(
            "pointer-events-auto",
            "translate-y-0",
            "opacity-100",
            "scale-100",
          );
          btnRef.current.classList.add(
            "pointer-events-none",
            "translate-y-4",
            "opacity-0",
            "scale-90",
          );
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    if (!reduce) {
      // Native smooth-scroll fights inertial scrolling — hand over control.
      document.documentElement.classList.add("iw-lenis");
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({
          duration: 1.15,
          // Long, mechanical ease-out — settles like a damped hydraulic arm.
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
        });
        const loop = (time: number) => {
          lenis?.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.classList.remove("iw-lenis");
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      {/* Precision progress rule with understated accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]"
        style={{
          backgroundColor: "color-mix(in oklab, var(--iw-text-primary) 6%, transparent)",
        }}
      >
        <div
          ref={progressRef}
          className="relative h-full origin-left rtl:origin-right"
          style={{
            transform: `scaleX(0)`,
            transition: "transform 80ms linear",
            background:
              "linear-gradient(90deg, var(--iw-accent, #b05e2a) 0%, #c97940 70%, var(--iw-dark-accent, #00c8d5) 100%)",
          }}
        >
          {/* Subtle terminal indicator */}
          <span
            className="absolute end-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--iw-accent, #b05e2a)",
              boxShadow: "0 0 8px rgba(176, 94, 42, 0.6)",
            }}
          />
        </div>
      </div>

      {/* Return to datum / Back to top */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={isAr ? "العودة إلى الأعلى" : "Back to top"}
        className={`group fixed z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-500 pointer-events-none translate-y-4 opacity-0 scale-90 ${isAr ? "right-4 sm:right-6" : "left-4 sm:left-6"}`}
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
          borderColor: "var(--iw-border, rgba(11,22,40,0.15))",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "var(--iw-text-primary, #0b1628)",
          boxShadow: "0 10px 30px -10px rgba(11, 22, 40, 0.25), 0 0 0 1px rgba(194, 120, 3, 0.15)",
        }}
      >
        {/* Progress ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 p-0.5"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--iw-accent, #c27803)"
            strokeWidth="2"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20}
            style={{ transition: "stroke-dashoffset 80ms linear" }}
          />
        </svg>
        <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span ref={textRef} className="sr-only">
          0%
        </span>
      </button>
    </>
  );
}
