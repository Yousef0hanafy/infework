import { useEffect, useId, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Languages, Menu, X } from "lucide-react";

import { catalogueLanguageHref } from "@/lib/catalogue-navigation";

import Logo from "@/components/infeworks/Logo";

type Locale = "en" | "ar";

const NAV = [
  { to: "/$locale/what-we-do" as const, en: "What We Do", ar: "ما نقوم به" },
  { to: "/$locale/work" as const, en: "Our Work", ar: "أعمالنا" },
  { to: "/$locale/about" as const, en: "About", ar: "من نحن" },
  { to: "/$locale/contact" as const, en: "Contact", ar: "اتصل بنا" },
];

export function Header() {
  const { pathname, searchStr } = useRouterState({ select: (s) => s.location });
  const locale: Locale = pathname.startsWith("/ar") ? "ar" : "en";
  const isAr = locale === "ar";
  const other: Locale = isAr ? "en" : "ar";
  const otherHref = catalogueLanguageHref(pathname, searchStr);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => setOpen(false), [pathname, searchStr]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

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
            className="inline-flex min-h-11 min-w-11 items-center transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--iw-accent)]"
          >
            <Logo variant="dark" isAr={isAr} />
          </Link>

          <nav
            aria-label={isAr ? "التنقل الرئيسي" : "Primary navigation"}
            className="ms-auto hidden items-center gap-1 lg:flex"
          >
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

          <div className="ms-auto flex items-center gap-3 lg:ms-0">
            <a
              href={otherHref}
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border px-3.5 py-1.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)] transition-all duration-300 hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)] hover:bg-[color-mix(in_oklab,var(--iw-accent)_8%,transparent)]"
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
              className="hidden rounded-sm px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--iw-accent-hover)] hover:shadow-[0_10px_28px_-8px_color-mix(in_oklab,var(--iw-accent)_75%,transparent)] lg:inline-block"
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
              ref={toggleRef}
              aria-label={
                isAr ? (open ? "إغلاق القائمة" : "فتح القائمة") : open ? "Close menu" : "Open menu"
              }
              aria-expanded={open}
              aria-controls={open ? menuId : undefined}
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iw-accent)] lg:hidden"
              style={{ color: "var(--iw-text-primary)" }}
            >
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {open ? (
          <nav
            id={menuId}
            aria-label={isAr ? "التنقل على الهاتف" : "Mobile navigation"}
            className="iw-glass-light iw-reveal absolute left-0 right-0 top-full z-40 flex max-h-[calc(100dvh-5rem)] flex-col gap-6 overflow-y-auto px-6 py-10 lg:hidden border-b shadow-lg"
            style={{ backgroundColor: "var(--iw-surface)" }}
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                params={{ locale }}
                onClick={() => setOpen(false)}
                className="display-md flex min-h-11 items-center text-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--iw-accent)]"
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
          </nav>
        ) : null}
      </header>
    </>
  );
}
