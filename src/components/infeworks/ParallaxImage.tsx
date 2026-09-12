// Infeworks — subtle image parallax used on case-study photography.
import { useEffect, useRef, useState } from "react";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  ratio = "16/9",
  strength = 0.12,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  strength?: number;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const frame = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // -1 (below fold) → 1 (above fold)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const offsetVal = progress * rect.height * strength;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${offsetVal.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={frame}
      className={`relative w-full overflow-hidden ${className}`.trim()}
      style={{ aspectRatio: ratio, backgroundColor: "var(--iw-surface-alt)" }}
    >
      {!hasError && src ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          onError={() => setHasError(true)}
          className="absolute inset-0 h-[124%] w-full object-cover will-change-transform"
          style={{ top: "-12%", transform: `translate3d(0, 0px, 0)` }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[var(--iw-surface-alt)]">
          <span className="label-mono text-xs text-[var(--iw-text-muted)]">
            Infeworks Infrastructure
          </span>
        </div>
      )}
    </div>
  );
}
