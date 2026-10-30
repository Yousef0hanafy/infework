import { describe, expect, it, vi } from "vitest";
import { Route as AboutRoute } from "../routes/$locale.about";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => ({ options }),
  Link: () => null,
}));
import {
  caseStudySchema,
  organizationReference,
  organizationSchema,
  isPublicLocalePath,
} from "./site-schema";
import { safeJsonLd } from "./safe-json-ld";

describe("public semantic graph", () => {
  it("resolves one company identity without adding unverified facts", () => {
    expect(organizationReference()).toEqual({ "@id": organizationSchema["@id"] });
    expect(organizationSchema.url).toBe("https://www.infeworks.com");
    expect(organizationSchema.contactPoint[0]!.telephone).toBe("+20224103130");
    expect(organizationSchema).not.toHaveProperty("numberOfEmployees");
    expect(organizationSchema).not.toHaveProperty("sameAs");
  });
  it.each(["en", "ar"])("describes the case study separately from the project (%s)", (locale) => {
    const url = `https://www.infeworks.com/${locale}/work/example`;
    const graph = caseStudySchema({
      title: "English title",
      description: "مياه < 10 m³/day",
      url,
      locale,
      image: "https://www.infeworks.com/hero/example.webp",
      location: { display_name: "Cairo", lat: 30, lng: 31 },
    });
    expect(graph["@type"]).toBe("WebPage");
    expect(graph.inLanguage).toBe(`${locale}-EG`);
    expect(graph.publisher).toEqual(organizationReference());
    expect(graph.about).toMatchObject({
      "@type": "Project",
      "@id": "https://www.infeworks.com/en/work/example#project",
      location: { "@type": "Place", name: "Cairo" },
    });
    expect(graph.name).toBe("English title");
    expect(graph.image).toBe("https://www.infeworks.com/hero/example.webp");
    for (const key of ["customer", "contributor", "provider", "locationCreated", "inLanguage"])
      expect(graph.about).not.toHaveProperty(key);
    expect(graph).not.toHaveProperty("customer");
    expect(JSON.parse(safeJsonLd(graph)).description).toBe("مياه < 10 m³/day");
  });
  it("omits absent images and locations instead of manufacturing them", () => {
    const graph = caseStudySchema({
      title: "Project",
      description: "Scope",
      url: "https://www.infeworks.com/en/work/example",
      locale: "en",
    });
    expect(JSON.parse(safeJsonLd(graph))).not.toHaveProperty("image");
    expect(JSON.parse(safeJsonLd(graph)).about).not.toHaveProperty("location");
  });
  it("does not attach public-company markup to administrative and unknown language routes", () => {
    for (const path of ["/en", "/ar/", "/en/work/example"])
      expect(isPublicLocalePath(path)).toBe(true);
    for (const path of ["/admin", "/admin/login", "/enough", "/de", "/"])
      expect(isPublicLocalePath(path)).toBe(false);
  });
});

it.each(["en", "ar"])(
  "the actual About route references the same company in server head (%s)",
  (locale) => {
    const head = AboutRoute.options.head as unknown as (context: {
      params: { locale: string };
    }) => { scripts: Array<{ type: string; children: string }> };
    const response = head({ params: { locale } });
    const json = response.scripts.find((script) => script.type === "application/ld+json")!;
    const about = JSON.parse(json.children);
    expect(about["@type"]).toBe("AboutPage");
    expect(about.url).toBe(`https://www.infeworks.com/${locale}/about`);
    expect(about.mainEntity).toEqual(organizationReference());
    expect(about.mainEntity).not.toHaveProperty("numberOfEmployees");
  },
);
