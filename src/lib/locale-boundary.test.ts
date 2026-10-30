import { describe, expect, it, vi } from "vitest";
import { Route } from "../routes/$locale";
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  createFileRoute: () => (options: unknown) => ({ options }),
}));
vi.mock("@/components/infeworks/Header", () => ({ Header: () => null }));
vi.mock("@/components/infeworks/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/infeworks/ScrollExperience", () => ({ default: () => null }));
vi.mock("@/components/infeworks/FloatingWhatsApp", () => ({ default: () => null }));
const guard = Route.options.beforeLoad as (context: { params: { locale: string } }) => void;
describe("public locale boundary", () => {
  it.each(["en", "ar"])("retains the %s locale", (locale) => {
    expect(() => guard({ params: { locale } })).not.toThrow();
  });
  it.each(["missing", "missing.pdf", "llms.txt", "de", "EN"])(
    "returns notFound for %s rather than redirecting to the homepage",
    (locale) => {
      let caught: unknown;
      try {
        guard({ params: { locale } });
      } catch (error) {
        caught = error;
      }
      expect(caught).toMatchObject({ isNotFound: true });
    },
  );
});
