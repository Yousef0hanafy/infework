// Infeworks — official brand lockup: the authentic Infeworks logo graphic
// (continuous-line "iw" hydraulic mark with the "Infeworks" wordmark beneath)
// rendered from the official image asset, with the dual registered trade names
// stacked vertically beside (or below) the graphic.

import logoDark from "@/assets/infeworks-logo.webp";
import logoWhite from "@/assets/infeworks-logo-white.webp";

type Variant = "light" | "dark";
type Layout = "inline" | "stacked";

const INK = {
  light: {
    legacy: "var(--iw-dark-text)",
    legacyMuted: "var(--iw-dark-text-muted)",
    divider: "var(--iw-dark-border)",
  },
  dark: {
    legacy: "var(--iw-text-primary)",
    legacyMuted: "var(--iw-text-secondary)",
    divider: "var(--iw-border)",
  },
} as const;

/** The official logo graphic. Direct high-density WebP with crisp transparency. */
export function LogoMark({
  variant = "dark",
  className = "h-10 sm:h-11 md:h-12 w-auto shrink-0 object-contain",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <img
      src={variant === "light" ? logoWhite : logoDark}
      alt="Infeworks — International for Engineering Works"
      width={150}
      height={112}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

/** Official logo graphic block, as in the corporate identity. */
function LogoGraphic({ variant }: { variant: Variant }) {
  return (
    <span className="flex shrink-0 items-center">
      <LogoMark variant={variant} className="h-10 sm:h-11 md:h-12 w-auto shrink-0 object-contain" />
    </span>
  );
}

export default function Logo({
  variant = "dark",
  isAr = false,
  markOnly = false,
  layout = "inline",
  className = "",
}: {
  variant?: Variant;
  isAr?: boolean;
  markOnly?: boolean;
  layout?: Layout;
  className?: string;
}) {
  const ink = INK[variant];

  if (markOnly) {
    return (
      <LogoMark variant={variant} className={`h-12 w-auto shrink-0 object-contain ${className}`} />
    );
  }

  // Both registered trade names, stacked — Arabic above the English line, set
  // like a registration block on an engineering title sheet.
  const arabicName = (
    <span
      className="block text-[13px] leading-tight whitespace-nowrap"
      style={{ fontFamily: "var(--font-arabic)", color: ink.legacy }}
    >
      الشركة الدولية للأعمال الهندسية
    </span>
  );

  const englishName = (
    <span
      className="mt-0.5 block text-[9.5px] leading-tight font-medium tracking-[0.16em] uppercase whitespace-nowrap"
      style={{ color: ink.legacyMuted }}
    >
      International for Engineering Works
    </span>
  );

  const tradeBlock = (
    <span className="flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      {arabicName}
      {englishName}
    </span>
  );

  if (layout === "stacked") {
    return (
      <span className={`flex flex-col items-start gap-3 ${className}`}>
        <LogoGraphic variant={variant} />
        {tradeBlock}
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoGraphic variant={variant} />
      <span
        aria-hidden="true"
        className="hidden h-9 w-px shrink-0 sm:block"
        style={{ backgroundColor: ink.divider }}
      />
      <span className="hidden sm:block">{tradeBlock}</span>
    </span>
  );
}
