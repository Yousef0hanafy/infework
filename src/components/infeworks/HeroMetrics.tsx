import { useParams } from "@tanstack/react-router";

export default function HeroMetrics({ className }: { className?: string }) {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const baseClass = "grid grid-cols-2 gap-4 border-t pt-8 sm:grid-cols-4 sm:gap-6";
  const finalClass = className ? `${className} ${baseClass}` : `mt-12 ${baseClass}`;

  return (
    <div className={finalClass} style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
      <div
        className="flex flex-col border-s-2 ps-4"
        style={{ borderColor: "var(--iw-dark-accent)" }}
      >
        <span className="display-md text-2xl font-bold md:text-3xl text-white">50+</span>
        <span className="label-mono mt-1 text-xs" style={{ color: "var(--iw-dark-text-muted)" }}>
          {t("Delivered Projects", "مشروعاً منجزاً")}
        </span>
      </div>
      <div
        className="flex flex-col border-s-2 ps-4"
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <span className="display-md text-2xl font-bold md:text-3xl text-white">20+</span>
        <span className="label-mono mt-1 text-xs" style={{ color: "var(--iw-dark-text-muted)" }}>
          {t("Years of Integration", "عاماً من التكامل الهندسي")}
        </span>
      </div>
      <div
        className="flex flex-col border-s-2 ps-4"
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <span className="display-md text-2xl font-bold md:text-3xl text-white">6</span>
        <span className="label-mono mt-1 text-xs" style={{ color: "var(--iw-dark-text-muted)" }}>
          {t("Specialized Sectors", "قطاعات هندسية متخصصة")}
        </span>
      </div>
      <div
        className="flex flex-col border-s-2 ps-4"
        style={{ borderColor: "var(--iw-dark-accent)" }}
      >
        <span className="display-md text-2xl font-bold md:text-3xl text-[var(--iw-dark-accent)]">
          {isAr ? "شاملة" : "Full"}
        </span>
        <span className="label-mono mt-1 text-xs" style={{ color: "var(--iw-dark-text-muted)" }}>
          {t("Contract Accountability", "المسؤولية التعاقدية")}
        </span>
      </div>
    </div>
  );
}
