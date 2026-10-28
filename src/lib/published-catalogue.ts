import snapshot from "./published-catalogue.snapshot.json";
import { getProjectMeta } from "./project-meta";
import { SECTORS } from "./sectors";
import type { PublicCapability, PublicProject, PublicProjectDetail } from "./public-types";

/** Only transport/service outages use the public archive; permissions and valid empty results do not. */
export function isCatalogueTransportError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { message?: unknown; code?: unknown; status?: unknown; cause?: unknown };
  const code = String(e.code ?? "");
  if (["42501", "PGRST301", "PGRST302"].includes(code) || e.status === 401 || e.status === 403)
    return false;
  if (typeof e.status === "number" && e.status >= 500) return true;
  if (
    [
      "ENOTFOUND",
      "EAI_AGAIN",
      "ETIMEDOUT",
      "ECONNREFUSED",
      "ECONNRESET",
      "UND_ERR_CONNECT_TIMEOUT",
    ].includes(code)
  )
    return true;
  if (
    /fetch failed|failed to fetch|networkerror|network request failed|signal timed out/i.test(
      String(e.message ?? ""),
    )
  )
    return true;
  return e.cause ? isCatalogueTransportError(e.cause) : false;
}

export function getPublishedCatalogueSnapshot(locale: string): PublicProject[] {
  const lang = locale === "ar" ? "ar" : "en";
  const caps = snapshot.capability_slugs as Record<string, string[]>;
  const locations = snapshot.locations as Record<
    string,
    { lat: number; lng: number; display_name: string }
  >;
  return snapshot.profiles
    .filter((row) => row.locale === lang)
    .map((row) => {
      const meta = getProjectMeta(row.slug);
      const recordedLocation = locations[row.slug];
      return {
        ...row,
        title: row.title
          .replace(/\s*\((?:Contract|عقد)[^)]+\)/gi, "")
          .replace(/\s*—\s*مكمل\s*\d+/gi, "")
          .trim(),
        capability_slugs: [...(caps[row.slug] ?? [])],
        location: recordedLocation
          ? {
              ...recordedLocation,
              display_name:
                (lang === "en" ? meta?.region?.en : meta?.region?.ar) ??
                recordedLocation.display_name,
            }
          : null,
        cover_url: meta?.cover ?? null,
        featured: false,
        catalogue_snapshot_date: snapshot.published_set_verified_at,
      };
    });
}

export function getPublishedCatalogueDetail(
  slug: string,
  locale: string,
): PublicProjectDetail | null {
  const project = getPublishedCatalogueSnapshot(locale).find((p) => p.slug === slug);
  if (!project) return null;
  const meta = getProjectMeta(slug);
  const lang = locale === "ar" ? "ar" : "en";
  return {
    project,
    location: project.location,
    claims: [],
    media: [],
    schema: null,
    facts: meta
      ? {
          client: meta.client?.[lang] ?? "",
          consultant: meta.consultant?.[lang] ?? "",
          capacity: meta.capacity?.[lang] ?? "",
          scope: meta.scope?.[lang] ?? "",
          year: meta.year ?? "",
          region: meta.region?.[lang] ?? "",
        }
      : null,
  };
}

export function getSnapshotCapabilities(): PublicCapability[] {
  // Read-only public filter identifiers; never used for database editing.
  return SECTORS.map((s) => ({
    id: "snapshot-" + s.slug,
    slug: s.slug,
    en_name: s.en,
    ar_name: s.ar,
  }));
}
