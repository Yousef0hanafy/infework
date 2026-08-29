import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/sadat-city-ro")({
  beforeLoad: () => {
    throw redirect({
      to: "/$locale/work/$slug",
      params: { locale: "en", slug: "sadat-city-ro" },
    });
  },
  component: () => null,
});
