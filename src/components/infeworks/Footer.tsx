import { Link, useRouterState } from "@tanstack/react-router";
import { Clock, FileDown, Linkedin, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

import Logo from "@/components/infeworks/Logo";

type Locale = "en" | "ar";

function FacebookIcon({
  className = "h-4 w-4",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const SECTORS = [
  { slug: "water-treatment", en: "Water Treatment", ar: "معالجة المياه والتحلية" },
  { slug: "wastewater", en: "Wastewater & Effluent", ar: "الصرف الصحي والصناعي" },
  { slug: "pumping-wells", en: "Pumping & Deep Wells", ar: "محطات الرفع والآبار العميقة" },
  {
    slug: "infrastructure-networks",
    en: "Infrastructure Networks",
    ar: "شبكات المرافق وخطوط النقل",
  },
  { slug: "civil-buildings", en: "Civil & Institutional", ar: "الأعمال المدنية والمباني الخدمية" },
  {
    slug: "industrial-mep",
    en: "Industrial & Electromechanical",
    ar: "الأنظمة الصناعية والكهروميكانيكية",
  },
] as const;

const NAV = [
  { to: "/$locale/what-we-do" as const, en: "What We Do", ar: "ما نفعله" },
  { to: "/$locale/work" as const, en: "Selected Work", ar: "أعمال مختارة" },
  { to: "/$locale/about" as const, en: "About Infeworks", ar: "عن إنفيوركس" },
  { to: "/$locale/contact" as const, en: "Contact", ar: "اتصل بنا" },
];

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale: Locale = pathname.startsWith("/ar") ? "ar" : "en";
  const isAr = locale === "ar";
  const arabicFont = { fontFamily: "var(--font-arabic)" } as const;
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const muted = { color: "var(--iw-dark-text-muted)" };
  const linkClass =
    "text-sm transition-all duration-300 hover:text-[var(--iw-dark-accent)] hover:translate-x-1 rtl:hover:-translate-x-1";

  return (
    <footer className="iw-section-dark">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-14">
        <h2
          className="display-lg max-w-2xl text-2xl sm:text-3xl md:text-4xl"
          style={{ color: "var(--iw-dark-text)", ...(isAr ? arabicFont : {}) }}
        >
          {t("Build with one accountable partner.", "ابنِ مع شريك واحد مسؤول.")}
        </h2>

        <div
          className="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "var(--iw-dark-border)" }}
        >
          {/* Column 1 — identity & profile */}
          <div>
            <Logo variant="light" isAr={isAr} layout="stacked" />
            <p
              className="mt-5 inline-flex rounded-sm border px-3 py-1.5 text-[11px] leading-snug"
              style={{
                borderColor: "var(--iw-dark-border)",
                color: "var(--iw-dark-accent)",
                ...(isAr ? arabicFont : {}),
              }}
            >
              {t(
                "Water & Wastewater Infrastructure Contractor — Cairo, Egypt",
                "مقاول بنية تحتية للمياه والصرف — القاهرة، مصر",
              )}
            </p>
            <a
              href="/downloads/infeworks-company-profile.pdf"
              download="infeworks-company-profile.pdf"
              className="iw-glass-dark mt-5 inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_color-mix(in_oklab,var(--iw-dark-accent)_60%,transparent)]"
              style={{ color: "var(--iw-dark-text)", ...(isAr ? arabicFont : {}) }}
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t("Download Company Profile", "تحميل ملف الشركة")}
            </a>

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/international-for-engineering-works/"
                target="_blank"
                rel="noreferrer"
                aria-label="Infeworks LinkedIn Page"
                className="flex h-8 w-8 items-center justify-center rounded-sm border transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)] hover:bg-[color-mix(in_oklab,var(--iw-dark-accent)_12%,transparent)]"
                style={{
                  borderColor: "var(--iw-dark-border)",
                  color: "var(--iw-dark-text-muted)",
                }}
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/Infeworks/"
                target="_blank"
                rel="noreferrer"
                aria-label="Infeworks Facebook Page"
                className="flex h-8 w-8 items-center justify-center rounded-sm border transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)] hover:bg-[color-mix(in_oklab,var(--iw-dark-accent)_12%,transparent)]"
                style={{
                  borderColor: "var(--iw-dark-border)",
                  color: "var(--iw-dark-text-muted)",
                }}
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/201006249420"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Contact"
                className="flex h-8 w-8 items-center justify-center rounded-sm border transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)] hover:bg-[color-mix(in_oklab,var(--iw-dark-accent)_12%,transparent)]"
                style={{
                  borderColor: "var(--iw-dark-border)",
                  color: "var(--iw-dark-text-muted)",
                }}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@infeworks.com"
                aria-label="Email Enquiry"
                className="flex h-8 w-8 items-center justify-center rounded-sm border transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:text-[var(--iw-dark-accent)] hover:bg-[color-mix(in_oklab,var(--iw-dark-accent)_12%,transparent)]"
                style={{
                  borderColor: "var(--iw-dark-border)",
                  color: "var(--iw-dark-text-muted)",
                }}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — sectors */}
          <div>
            <p
              className="label-mono"
              style={{ color: "var(--iw-dark-accent)", ...(isAr ? arabicFont : {}) }}
            >
              {t("Sectors & Capabilities", "القطاعات والقدرات")}
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {SECTORS.map((s) => (
                <Link
                  key={s.slug}
                  to="/$locale/what-we-do/$sector"
                  params={{ locale, sector: s.slug }}
                  className={linkClass}
                  style={{ ...muted, ...(isAr ? arabicFont : {}) }}
                >
                  {isAr ? s.ar : s.en}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — navigation */}
          <div>
            <p
              className="label-mono"
              style={{ color: "var(--iw-dark-accent)", ...(isAr ? arabicFont : {}) }}
            >
              {t("Company", "الشركة")}
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {NAV.map((item) => (
                <Link
                  key={item.en}
                  to={item.to}
                  params={{ locale }}
                  className={linkClass}
                  style={{ ...muted, ...(isAr ? arabicFont : {}) }}
                >
                  {isAr ? item.ar : item.en}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — engineering dispatch */}
          <div>
            <p
              className="label-mono"
              style={{ color: "var(--iw-dark-accent)", ...(isAr ? arabicFont : {}) }}
            >
              {t("Engineering Dispatch", "التواصل الهندسي")}
            </p>
            <div className="mt-4 flex flex-col gap-3.5">
              <p
                className="flex items-start gap-2.5 text-sm leading-relaxed"
                style={{ ...muted, ...(isAr ? arabicFont : {}) }}
              >
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "var(--iw-dark-accent)" }}
                  aria-hidden="true"
                />
                {t("313 Zahraa Nasr City, Cairo, Egypt", "313 زهراء مدينة نصر، القاهرة، مصر")}
              </p>

              <a
                href="https://wa.me/201006249420"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "color-mix(in oklab, var(--iw-dark-accent) 45%, transparent)",
                  backgroundColor: "color-mix(in oklab, var(--iw-dark-accent) 10%, transparent)",
                  color: "var(--iw-dark-accent)",
                }}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                +20 100 624 9420
              </a>

              <a
                href="mailto:info@infeworks.com"
                className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--iw-dark-text)" }}
              >
                <Mail
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--iw-dark-accent)" }}
                  aria-hidden="true"
                />
                info@infeworks.com
              </a>

              <a
                href="https://www.linkedin.com/company/international-for-engineering-works/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--iw-dark-text)" }}
              >
                <Linkedin
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--iw-dark-accent)" }}
                />
                linkedin.com/company/infeworks
              </a>

              <a
                href="https://www.facebook.com/Infeworks/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--iw-dark-text)" }}
              >
                <FacebookIcon
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--iw-dark-accent)" }}
                />
                facebook.com/Infeworks
              </a>

              <p
                className="flex items-start gap-2.5 text-sm leading-relaxed"
                style={{ ...muted, ...(isAr ? arabicFont : {}) }}
              >
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "var(--iw-dark-accent)" }}
                  aria-hidden="true"
                />
                {t(
                  "Single Accountable Contract • In-House Delivery",
                  "عقد واحد بمسؤولية كاملة • تنفيذ داخلي",
                )}
              </p>

              <p
                className="flex items-start gap-2.5 text-xs leading-relaxed"
                style={{ ...muted, ...(isAr ? arabicFont : {}) }}
              >
                <Clock
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: "var(--iw-dark-accent)" }}
                  aria-hidden="true"
                />
                {t(
                  "Sun–Thu, 09:00–4:00 — replies within one working day",
                  "الأحد–الخميس، 05:00–09:00 — نرد خلال يوم عمل",
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "var(--iw-dark-border)",
            color: "var(--iw-dark-text-muted)",
          }}
        >
          {/* Left: Copyright */}
          <div className="flex items-center">
            <span>
              © {new Date().getFullYear()} Infeworks. {t("All rights reserved.", "جميع الحقوق محفوظة.")}
            </span>
          </div>

          {/* Center: Developer Credit */}
          <div className="flex items-center sm:justify-center">
            <span className="inline-flex items-center gap-1.5">
              <span>{t("Developed by", "تطوير:")}</span>
              <a
                href="https://portfolio-yousef-hanafy.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium transition-colors hover:text-[var(--iw-dark-accent)] hover:underline underline-offset-2"
                style={{ color: "var(--iw-dark-text)" }}
              >
                {t("Youssef Hanafy", "يوسف حنفي")}
              </a>
            </span>
          </div>

          {/* Right: Legal */}
          <div className="flex items-center sm:justify-end">
            <Link
              to="/$locale/privacy"
              params={{ locale }}
              className="transition-colors hover:text-[var(--iw-dark-accent)] hover:underline underline-offset-2"
              style={isAr ? arabicFont : undefined}
            >
              {t("Privacy Policy", "سياسة الخصوصية")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
