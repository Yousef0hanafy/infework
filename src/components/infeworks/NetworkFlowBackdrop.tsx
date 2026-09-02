import { useEffect, useState } from "react";

export default function NetworkFlowBackdrop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#070e1a] pointer-events-none select-none">
      <style>{`
        @keyframes fluid-blob-1 {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            transform: translate(20%, 15%) scale(1.15);
          }
          66% {
            transform: translate(-15%, 25%) scale(0.9);
          }
        }
        @keyframes fluid-blob-2 {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            transform: translate(-25%, -20%) scale(1.2);
          }
          66% {
            transform: translate(15%, -15%) scale(0.85);
          }
        }
        @keyframes fluid-blob-3 {
          0%, 100% {
            transform: translate(0%, 0%) scale(1.1);
          }
          33% {
            transform: translate(15%, -25%) scale(0.95);
          }
          66% {
            transform: translate(-20%, 15%) scale(1.2);
          }
        }
        @keyframes fluid-blob-4 {
          0%, 100% {
            transform: translate(0%, 0%) scale(0.9);
          }
          50% {
            transform: translate(-15%, -20%) scale(1.15);
          }
        }
      `}</style>

      {/* Layer 1: Ambient Fluid Glows */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Bright Cyan Orb Top-Left */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 200, 213, 0.45) 0%, rgba(0, 200, 213, 0.15) 45%, transparent 70%)",
            animation: "fluid-blob-1 18s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        />

        {/* Warm Copper/Orange Orb Right */}
        <div
          className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(176, 94, 42, 0.45) 0%, rgba(176, 94, 42, 0.15) 45%, transparent 70%)",
            animation: "fluid-blob-2 22s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        />

        {/* Deep Ocean Blue Center-Bottom */}
        <div
          className="absolute bottom-[-20%] left-[20%] w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(15, 60, 140, 0.5) 0%, rgba(15, 60, 140, 0.2) 50%, transparent 75%)",
            animation: "fluid-blob-3 26s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        />

        {/* Electric Cyan Secondary Accent Center */}
        <div
          className="absolute top-[40%] left-[35%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 230, 245, 0.25) 0%, transparent 65%)",
            animation: "fluid-blob-4 15s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        />
      </div>

      {/* Layer 2: Subtle Precision Grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />
    </div>
  );
}
