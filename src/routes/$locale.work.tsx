import { Outlet, createFileRoute } from "@tanstack/react-router";

const TITLE = "Selected Work — Infeworks";
const DESC =
  "Selected water and wastewater infrastructure projects delivered by Infeworks across Egypt.";

export const Route = createFileRoute("/$locale/work")({
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
