import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale", params: { locale: "en" }, statusCode: 302 });
  },
});
