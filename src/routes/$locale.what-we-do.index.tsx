import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Droplets, Gauge, Recycle, Sprout, Zap } from "lucide-react";

import { getSector } from "@/lib/sectors";
import { getCapabilities } from "@/lib/public.functions";
import type { PublicCapability } from "@/lib/public-types";

const TITLE = "What We Do — Capabilities | Infeworks";
const DESC =
  "Five engineering disciplines delivered under one accountable contract: water treatment, wastewater, pumping, irrigation, electrical & control.";

export const Route = createFileRoute("/$locale/what-we-do/")({
  loader: async () => ({ capabilities: await getCapabilities() }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CapabilityIndex,
});

const ICONS = {
  droplets: Droplets,
  recycle: Recycle,
  gauge: Gauge,
  sprout: Sprout,
  zap: Zap,
} as const;

function CapabilityIndex() {
  const { capabilities } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-40">
          <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
            {t("Capabilities", "قدراتنا")}
          </p>
          <h1 className="display-xl mt-8 max-w-4xl text-[clamp(2.25rem,6vw,5rem)]">
            {t("What We Do", "ما نفعله")}
          </h1>
          <p
            className="body-reading mt-8 max-w-2xl text-lg"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {t(
              "Five engineering disciplines, delivered under one accountable contract — design, supply, installation, testing, and operation.",
              "خمس تخصصات هندسية تُنفَّذ تحت عقد واحد مسؤول — التصميم والتوريد والتنفيذ والاختبار والتشغيل.",
            )}
          </p>
        </div>
      </section>

      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div
            className="grid grid-cols-1 border-t border-s md:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: "var(--iw-border)" }}
          >
            {capabilities.map((capability) => (
              <SectorCard
                key={capability.id}
                capability={capability}
                locale={locale}
                isAr={isAr}
              />
            ))}
            <div
              className="hidden border-b border-e lg:block"
              style={{ borderColor: "var(--iw-border)" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectorCard({
  capability,
  locale,
  isAr,
}: {
  capability: PublicCapability;
  locale: string;
  isAr: boolean;
}) {
  const sector = getSector(capability.slug);
  const Icon = ICONS[sector?.icon ?? "droplets"];
  const name = isAr ? capability.ar_name : capability.en_name;
  const definition = isAr ? sector?.defAr : sector?.defEn;
  return (
    <Link
      to="/$locale/what-we-do/$sector"
      params={{ locale, sector: capability.slug }}
      className="group flex flex-col justify-between border-b border-e p-8 transition-colors hover:bg-[var(--iw-surface)] md:p-10"
      style={{ borderColor: "var(--iw-border)" }}
    >
      <div>
        <Icon
          className="h-8 w-8"
          strokeWidth={1.25}
          style={{ color: "var(--iw-accent)" }}
        />
        <h2 className="display-md mt-8 text-2xl md:text-3xl">
          {name}
        </h2>
        {definition ? (
          <p className="body-reading mt-4 text-[var(--iw-text-secondary)]">{definition}</p>
        ) : null}
      </div>
      <span
        className="label-mono mt-10 inline-flex items-center gap-3"
        style={{ color: "var(--iw-accent)" }}
      >
        {isAr ? "اعرف المزيد" : "Learn more"}
        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
      </span>
    </Link>
  );
}
