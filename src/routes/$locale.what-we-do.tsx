import { Outlet, createFileRoute } from "@tanstack/react-router";

const TITLE = "What We Do — Infeworks";
const DESC =
  "Infeworks EPC capabilities: water treatment, wastewater, pumping stations, infrastructure networks, civil buildings, and electromechanical systems.";

export const Route = createFileRoute("/$locale/what-we-do")({
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
  component: () => <Outlet />,
});
