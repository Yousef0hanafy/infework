import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on devices with hover capabilities (desktops)
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;

    let isVisible = false;
    let animationFrameId: number;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
      }
      currentX = e.clientX;
      currentY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or parent is an interactive element
      if (target.closest('a, button, [role="button"], input, select, textarea, label')) {
        if (cursorRef.current) {
          cursorRef.current.classList.add("w-10", "h-10", "-ml-5", "-mt-5", "bg-transparent", "border-[var(--iw-accent)]", "border-dashed");
          cursorRef.current.classList.remove("w-3", "h-3", "-ml-1.5", "-mt-1.5", "bg-[var(--iw-accent)]", "border-white");
        }
        if (iconRef.current) {
          iconRef.current.style.opacity = "1";
          iconRef.current.style.transform = "scale(1)";
        }
      } else {
        if (cursorRef.current) {
          cursorRef.current.classList.remove("w-10", "h-10", "-ml-5", "-mt-5", "bg-transparent", "border-[var(--iw-accent)]", "border-dashed");
          cursorRef.current.classList.add("w-3", "h-3", "-ml-1.5", "-mt-1.5", "bg-[var(--iw-accent)]", "border-white");
        }
        if (iconRef.current) {
          iconRef.current.style.opacity = "0";
          iconRef.current.style.transform = "scale(0.5)";
        }
      }
    };
    
    const handleMouseLeave = () => {
      isVisible = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    // Zero-lag tracking loop
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Start animation loop
    animate();

    // Add global class to hide default cursor
    document.documentElement.classList.add("iw-custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove("iw-custom-cursor-active");
    };
  }, []);

  return (
    <div className="hidden sm:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div 
        ref={cursorRef}
        className="absolute left-0 top-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[var(--iw-accent)] border-[1.5px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-[width,height,margin,background-color,border-color] duration-300 ease-out will-change-transform opacity-0 flex items-center justify-center"
      >
        <div ref={iconRef} className="opacity-0 scale-50 transition-all duration-300 ease-out text-[var(--iw-accent)]">
          <Plus className="w-4 h-4" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
