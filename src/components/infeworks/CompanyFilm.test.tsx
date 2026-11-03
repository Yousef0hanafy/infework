// @vitest-environment jsdom
import { cleanup, fireEvent, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import type { ComponentType, ReactNode } from "react";

const state = vi.hoisted(() => ({ locale: "en" }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  createFileRoute: () => (options: Record<string, unknown>) => ({
    options,
    useParams: () => ({ locale: state.locale }),
  }),
}));
vi.mock("lucide-react", () =>
  Object.fromEntries(
    [
      "ShieldCheck",
      "CheckCircle2",
      "Cpu",
      "Layers",
      "Wrench",
      "Activity",
      "Award",
      "ArrowRight",
      "Sparkles",
      "Linkedin",
      "Target",
      "Eye",
      "Quote",
      "Play",
      "ArrowUpRight",
    ].map((name) => [name, () => null]),
  ),
);
vi.mock("@/components/infeworks/HeroMetrics", () => ({ default: () => null }));
vi.mock("@/components/infeworks/MilestoneTrack", () => ({ default: () => null }));
vi.mock("@/components/infeworks/Reveal", () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

import { Route } from "@/routes/$locale.about";
const About = Route.options.component as ComponentType;
afterEach(cleanup);

it.each(["en", "ar"])("defers the About film player until requested (%s)", (locale) => {
  state.locale = locale;
  const label = locale === "ar" ? "شاهد الفيلم التعريفي" : "Watch the company film";
  const html = renderToStaticMarkup(<About />);
  expect(html).not.toContain("<iframe");
  const view = render(<About />);
  const play = view.getByRole("button", { name: new RegExp(label) });
  const section = play.closest("section")!;
  expect(section.previousElementSibling?.textContent).toContain(
    locale === "ar" ? "المقاولات الهندسية المتكاملة" : "Turnkey Engineering & Contracting",
  );
  expect(section.nextElementSibling?.textContent).toContain(
    locale === "ar" ? "لماذا وُجدت إنفيوركس" : "Why Infeworks Exists",
  );
  expect(section.querySelector("img")?.getAttribute("src")).toMatch(/^\/images\//);
  expect(
    section.querySelector('a[href="https://www.youtube.com/watch?v=ydwHo_EPD-I"]'),
  ).not.toBeNull();
  fireEvent.click(play);
  const player = section.querySelector("iframe")!;
  expect(player.src).toBe(
    "https://www.youtube-nocookie.com/embed/ydwHo_EPD-I?autoplay=1&playsinline=1&rel=0",
  );
  expect(player.title).toBe("Infeworks | Engineering & Infrastructure Projects in Egypt");
  expect(document.activeElement).toBe(player);
});
