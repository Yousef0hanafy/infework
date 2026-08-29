import { Outlet, createFileRoute, redirect, useParams } from "@tanstack/react-router";

import { Header } from "@/components/infeworks/Header";
import { Footer } from "@/components/infeworks/Footer";
import FloatingWhatsApp from "@/components/infeworks/FloatingWhatsApp";
import ScrollExperience from "@/components/infeworks/ScrollExperience";

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!LOCALES.includes(params.locale as Locale)) {
      throw redirect({ to: "/$locale", params: { locale: "en" }, statusCode: 302 });
    }
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale } = useParams({ from: "/$locale" });
  const isAr = locale === "ar";

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--iw-bg)" }}
    >
      <ScrollExperience isAr={isAr} />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

