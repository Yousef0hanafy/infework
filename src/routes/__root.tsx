import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

import Logo from "@/components/infeworks/Logo";
import CustomCursor from "@/components/infeworks/CustomCursor";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const locale = isArabic ? "ar" : "en";

  return (
    <div
      className="iw-section-dark relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={isArabic ? { fontFamily: "var(--font-arabic)" } : undefined}
    >
      <div className="iw-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto w-full max-w-xl text-center">
        <div className="flex justify-center">
          <Logo variant="light" isAr={isArabic} />
        </div>
        <p className="display-xl mt-12 text-[clamp(4rem,10vw,7rem)]" style={{ color: "var(--iw-dark-accent)" }}>
          404
        </p>
        <h1 className="display-md mt-4 text-2xl md:text-3xl text-white">
          {isArabic ? "الصفحة المطلوبة غير موجودة" : "Page Not Found"}
        </h1>
        <p className="body-reading mt-4 text-base text-[var(--iw-dark-text-muted)]">
          {isArabic
            ? "الصفحة التي تبحث عنها قد تم نقلها أو لم تعد متوفرة."
            : "The page or engineering record you requested could not be located or has been relocated."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/$locale"
            params={{ locale }}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
          >
            {isArabic ? "الرئيسية" : "Return Home"}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <Link
            to="/$locale/work"
            params={{ locale }}
            className="iw-glass-dark inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:-translate-y-0.5"
            style={{ color: "var(--iw-dark-text)" }}
          >
            {isArabic ? "استكشف أعمالنا" : "Explore Portfolio"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const locale = isArabic ? "ar" : "en";

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div
      className="iw-section-dark relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      style={isArabic ? { fontFamily: "var(--font-arabic)" } : undefined}
    >
      <div className="iw-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto w-full max-w-xl text-center">
        <div className="flex justify-center">
          <Logo variant="light" isAr={isArabic} />
        </div>
        <p className="label-mono mt-10" style={{ color: "var(--iw-error)" }}>
          {isArabic ? "خطأ في تحميل الصفحة" : "System Error"}
        </p>
        <h1 className="display-md mt-4 text-2xl md:text-3xl text-white">
          {isArabic ? "تعذر تحميل هذه الصفحة" : "This Page Didn't Load"}
        </h1>
        <p className="body-reading mt-4 text-sm text-[var(--iw-dark-text-muted)]">
          {isArabic
            ? "حدث خطأ غير متوقع أثناء معالجة الطلب. يمكنك إعادة المحاولة أو العودة للصفحة الرئيسية."
            : "An unexpected technical fault occurred while loading this view. You can reload or return to the main portal."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
          >
            <RotateCcw className="h-4 w-4" />
            {isArabic ? "إعادة المحاولة" : "Try Again"}
          </button>
          <Link
            to="/$locale"
            params={{ locale }}
            className="iw-glass-dark inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:border-[var(--iw-dark-accent)] hover:-translate-y-0.5"
            style={{ color: "var(--iw-dark-text)" }}
          >
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#070e1a" },
      { title: "Infeworks — International for Engineering Works" },
      {
        name: "description",
        content:
          "Infeworks (International for Engineering Works) — turnkey EPC contractor for water, wastewater, agricultural irrigation, and electromechanical infrastructure in Egypt since 2006.",
      },
      { name: "author", content: "Infeworks" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:site_name", content: "Infeworks — International for Engineering Works" },
      { property: "og:title", content: "Infeworks — Water & Infrastructure Contractor Egypt" },
      {
        property: "og:description",
        content:
          "Turnkey engineering contractor delivering water treatment, desalination, wastewater networks, pumping stations, and industrial electromechanical systems across Egypt.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://infeworks.com/logo.png" },
      { property: "og:image:alt", content: "Infeworks International for Engineering Works Logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Infeworks" },
      { name: "twitter:image", content: "https://infeworks.com/logo.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const lang = isArabic ? "ar" : "en";
  const dir = isArabic ? "rtl" : "ltr";

  // Build canonical and alternate hreflang URLs
  const cleanPath = pathname.replace(/^\/(?:en|ar)(?=\/|$)/, "") || "/";
  const enUrl = `https://infeworks.com/en${cleanPath === "/" ? "" : cleanPath}`;
  const arUrl = `https://infeworks.com/ar${cleanPath === "/" ? "" : cleanPath}`;
  const currentCanonical = isArabic ? arUrl : enUrl;

  return (
    <html lang={lang} dir={dir}>
      <head>
        <HeadContent />
        <link rel="canonical" href={currentCanonical} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="ar" href={arUrl} />
        <link rel="alternate" hrefLang="x-default" href={enUrl} />
      </head>
      <body>
        <CustomCursor />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
