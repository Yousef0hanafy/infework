import { Outlet, createFileRoute } from "@tanstack/react-router";

const TITLE = "What We Do — Infeworks";
const DESC =
  "Infeworks capabilities: water treatment, wastewater, pumping, irrigation, and electrical & control systems delivered as one scope.";

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
