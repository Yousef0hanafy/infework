import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Languages, Menu, X } from "lucide-react";

import Logo from "@/components/infeworks/Logo";

type Locale = "en" | "ar";

const NAV = [
  { to: "/$locale/what-we-do" as const, en: "What We Do", ar: "ما نفعله" },
  { to: "/$locale/work" as const, en: "Our Work", ar: "أعمالنا" },
  { to: "/$locale/about" as const, en: "About", ar: "من نحن" },
  { to: "/$locale/contact" as const, en: "Contact", ar: "اتصل بنا" },
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale: Locale = pathname.startsWith("/ar") ? "ar" : "en";
  const isAr = locale === "ar";
  const other: Locale = isAr ? "en" : "ar";
  const rest = pathname.replace(/^\/(en|ar)/, "");
  const otherHref = `/${other}${rest}`;
  const [open, setOpen] = useState(false);

  const arabicFont = { fontFamily: "var(--font-arabic)" } as const;

  return (
    <>
      <header
        className="iw-glass-light sticky top-0 z-50 border-b"
        style={{
          boxShadow: "0 1px 0 0 color-mix(in oklab, var(--iw-text-primary) 6%, transparent)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center gap-6 px-6 py-4">
          <Link
            to="/$locale"
            params={{ locale }}
            aria-label={isAr ? "إنفيوركس — الصفحة الرئيسية" : "Infeworks — home"}
            className="transition-opacity hover:opacity-80"
          >
            <Logo variant="dark" isAr={isAr} />
          </Link>

          <nav className="ms-auto hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                params={{ locale }}
                activeProps={{
                  style: {
                    color: "var(--iw-accent)",
                    backgroundColor: "color-mix(in oklab, var(--iw-accent) 10%, transparent)",
                  },
                }}
                className="rounded-full px-4 py-2 text-sm transition-all duration-300 hover:bg-[color-mix(in_oklab,var(--iw-text-primary)_6%,transparent)] hover:text-[var(--iw-text-primary)]"
                style={{
                  color: "var(--iw-text-secondary)",
                  ...(isAr ? arabicFont : {}),
                }}
              >
                {isAr ? item.ar : item.en}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-3 md:ms-0">
            <a
              href={otherHref}
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
              className="inline-flex items-center gap-2 rounded-sm border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)] hover:bg-[color-mix(in_oklab,var(--iw-accent)_8%,transparent)]"
              style={{
                borderColor: "var(--iw-border)",
                color: "var(--iw-text-secondary)",
                ...(other === "ar" ? arabicFont : {}),
              }}
            >
              <Languages className="size-3.5" aria-hidden="true" />
              {isAr ? "English" : "عربي"}
            </a>

            <Link
              to="/$locale/contact"
              params={{ locale }}
              search={{ type: "technical" }}
              className="hidden rounded-sm px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--iw-accent-hover)] hover:shadow-[0_10px_28px_-8px_color-mix(in_oklab,var(--iw-accent)_75%,transparent)] md:inline-block"
              style={{
                backgroundColor: "var(--iw-accent)",
                color: "#ffffff",
                ...(isAr ? arabicFont : {}),
              }}
            >
              {isAr ? "استفسار فني" : "Technical Enquiry"}
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden"
              style={{ color: "var(--iw-text-primary)" }}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="iw-glass-light iw-reveal fixed left-0 right-0 top-[73px] z-40 flex flex-col gap-6 px-6 py-10 md:hidden border-b shadow-lg"
          style={{ backgroundColor: "color-mix(in oklab, var(--iw-surface) 94%, transparent)" }}
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={{ locale }}
              onClick={() => setOpen(false)}
              className="display-md text-2xl"
              style={{
                color: "var(--iw-text-primary)",
                ...(isAr ? arabicFont : {}),
              }}
            >
              {isAr ? item.ar : item.en}
            </Link>
          ))}
          <Link
            to="/$locale/contact"
            params={{ locale }}
            search={{ type: "technical" }}
            onClick={() => setOpen(false)}
            className="mt-4 rounded-sm px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[var(--iw-accent-hover)]"
            style={{
              backgroundColor: "var(--iw-accent)",
              color: "#ffffff",
              ...(isAr ? arabicFont : {}),
            }}
          >
            {isAr ? "استفسار فني" : "Technical Enquiry"}
          </Link>
        </div>
      ) : null}
    </>
  );
}
