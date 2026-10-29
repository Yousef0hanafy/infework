export const CATALOGUE_BATCH = 12;
export type CatalogueSearch = { q?: string; sector?: string; limit?: number };

/** Parse untrusted query values; the loaded capability list supplies semantic validation. */
export function catalogueSearch(
  raw: Record<string, unknown>,
  sectors?: readonly string[],
): CatalogueSearch {
  const result: CatalogueSearch = {};
  const q = typeof raw["q"] === "string" ? raw["q"].slice(0, 200) : "";
  if (q.trim()) result.q = q;
  if (
    typeof raw["sector"] === "string" &&
    /^[a-z0-9-]+$/.test(raw["sector"]) &&
    raw["sector"].length <= 100 &&
    raw["sector"] !== "all" &&
    (!sectors || sectors.includes(raw["sector"]))
  )
    result.sector = raw["sector"];
  const limit =
    typeof raw["limit"] === "number"
      ? raw["limit"]
      : typeof raw["limit"] === "string" && /^\d+$/.test(raw["limit"])
        ? Number(raw["limit"])
        : NaN;
  if (Number.isSafeInteger(limit) && limit > 0 && limit !== CATALOGUE_BATCH) result.limit = limit;
  return result;
}

export function normaliseCatalogueText(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesCatalogueQuery(
  query: string,
  fields: readonly (string | null | undefined)[],
): boolean {
  const text = normaliseCatalogueText(fields.filter(Boolean).join(" "));
  return normaliseCatalogueText(query)
    .split(" ")
    .every((word) => text.includes(word));
}

export function catalogueLanguageHref(pathname: string, search: string): string {
  const otherPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, (_, locale: string) =>
    locale === "en" ? "/ar" : "/en",
  );
  if (!/^\/(en|ar)\/work\/?$/.test(pathname)) return otherPath;
  const params = new URLSearchParams(search);
  const safe = catalogueSearch({
    q: params.get("q"),
    sector: params.get("sector"),
    limit: params.get("limit"),
  });
  const next = new URLSearchParams();
  if (safe.q) next.set("q", safe.q);
  if (safe.sector) next.set("sector", safe.sector);
  if (safe.limit) next.set("limit", String(safe.limit));
  return otherPath + (next.size ? "?" + next.toString() : "");
}
