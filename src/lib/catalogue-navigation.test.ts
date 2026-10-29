import { describe, expect, it } from "vitest";
import {
  catalogueLanguageHref,
  catalogueSearch,
  matchesCatalogueQuery,
  normaliseCatalogueText,
} from "./catalogue-navigation";

describe("catalogue URL state", () => {
  it("omits defaults and safely rejects malformed input", () => {
    expect(catalogueSearch({ q: [], sector: {}, limit: Infinity })).toEqual({});
    for (const limit of [-1, 0, 1.2, "1e8", "12x", [], Number.MAX_SAFE_INTEGER + 1]) {
      expect(catalogueSearch({ limit })).toEqual({});
    }
    expect(catalogueSearch({ q: "   ", sector: "all", limit: "12" })).toEqual({});
    expect(catalogueSearch({ q: "Sadat", sector: "water-treatment", limit: "24" })).toEqual({
      q: "Sadat",
      sector: "water-treatment",
      limit: 24,
    });
    expect(catalogueSearch({ q: "x".repeat(300) }).q).toHaveLength(200);
    expect(catalogueSearch({ q: " ".repeat(200) + "x" })).toEqual({});
  });
  it("normalizes unknown sectors without dropping the query", () => {
    expect(
      catalogueSearch({ q: "pump", sector: "made-up", limit: 24 }, ["water-treatment"]),
    ).toEqual({ q: "pump", limit: 24 });
  });
  it("carries validated catalogue state across locale switches only on catalogue routes", () => {
    expect(
      catalogueLanguageHref("/en/work", "?q=Sadat&sector=water-treatment&limit=24&unsafe=x"),
    ).toBe("/ar/work?q=Sadat&sector=water-treatment&limit=24");
    expect(catalogueLanguageHref("/ar/work/", "?q=%D9%85%D9%8A%D8%A7%D9%87&limit=bad")).toBe(
      "/en/work/?q=%D9%85%D9%8A%D8%A7%D9%87",
    );
    expect(catalogueLanguageHref("/en/work/sadat-city-ro", "?limit=24")).toBe(
      "/ar/work/sadat-city-ro",
    );
    expect(catalogueLanguageHref("/en/contact", "?q=pump")).toBe("/ar/contact");
  });
});

describe("catalogue matching", () => {
  it("normalizes English and common Arabic variants without rewriting user text", () => {
    expect(normaliseCatalogueText("  إِنْفـيوركس  ")).toBe("انفيوركس");
    expect(matchesCatalogueQuery("WATER", ["Water Treatment"])).toBe(true);
    expect(matchesCatalogueQuery("ابار", ["آبار المياه"])).toBe(true);
    expect(matchesCatalogueQuery("missing", ["Water Treatment", null])).toBe(false);
    expect(matchesCatalogueQuery("", [null])).toBe(true);
    expect(matchesCatalogueQuery("pump minya", ["Pump Station", "Minya"])).toBe(true);
  });
});
