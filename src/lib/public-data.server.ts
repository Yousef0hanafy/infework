// Infeworks — server-only public data access (publishable key, RLS as anon)
import { createClient } from "@supabase/supabase-js";
import { getProjectMeta } from "./project-meta";
import type { Database } from "@/integrations/supabase/types";
import type {
  PublicCapability,
  PublicClaim,
  PublicLocation,
  PublicMedia,
  PublicProject,
  PublicProjectDetail,
  PublicProjectFacts,
  SiteSettings,
} from "./public-types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function normaliseLocale(locale: string): "en" | "ar" {
  return locale === "ar" ? "ar" : "en";
}

function cleanProjectTitle(title: string): string {
  return title
    .replace(/\s*\((?:Contract|عقد)[^)]+\)/gi, "")
    .replace(/\s*—\s*مكمل\s*\d+/gi, "")
    .trim();
}

function resolveCanonicalLocation(
  slug: string | null,
  locale: string,
  location: PublicLocation | null,
): PublicLocation | null {
  if (!slug) return location;
  const isAr = locale === "ar";
  const meta = getProjectMeta(slug);

  if (slug === "shubra-shahab-industrial-wastewater") {
    return {
      lat: location?.lat ?? 30.265,
      lng: location?.lng ?? 31.25,
      display_name: isAr ? "شبرا شهاب، القليوبية" : "Shubra Shahab, Qalyubia",
    };
  }
  if (slug === "qabs-min-nour-mosque") {
    return {
      lat: location?.lat ?? 30.015,
      lng: location?.lng ?? 31.685,
      display_name: isAr ? "العاصمة الإدارية الجديدة" : "New Administrative Capital",
    };
  }
  if (slug === "marble-factory-desalination-plants") {
    return {
      lat: location?.lat ?? 29.59,
      lng: location?.lng ?? 32.71,
      display_name: isAr ? "رأس سدر (جنوب سيناء)" : "Ras Sedr, South Sinai",
    };
  }
  if (slug === "multi-site-desalination-purification") {
    return {
      lat: location?.lat ?? 30.84, // Approx El Hamam / North Coast
      lng: location?.lng ?? 29.3,
      display_name: isAr ? "متعدد المواقع" : "Multi-Site",
    };
  }

  // If Arabic locale and meta has region, always return localized Arabic region
  if (isAr && meta?.region?.ar) {
    return {
      lat: location?.lat ?? 30.0444,
      lng: location?.lng ?? 31.2357,
      display_name: meta.region.ar,
    };
  }

  // Clean up any remaining "Governorate" trailing text in English
  if (location?.display_name) {
    return {
      ...location,
      display_name: location.display_name.replace(/\s+Governorate$/i, "").trim(),
    };
  }

  return location;
}

function toProject(
  row: {
    project_id: string | null;
    slug: string | null;
    locale: string | null;
    title: string | null;
    challenge: string | null;
    outcome: string | null;
    created_at: string | null;
  },
  capability_slugs: string[] = [],
  location: PublicLocation | null = null,
  cover_url: string | null = null,
  featured: boolean = false,
): PublicProject | null {
  if (!row.project_id || !row.slug || !row.title) return null;
  const locLang = row.locale ?? "en";
  let finalCapabilitySlugs = capability_slugs;
  if (row.slug === "toshka-pumping-stations") {
    finalCapabilitySlugs = ["wastewater", ...capability_slugs.filter((s) => s !== "pumping-wells")];
  }

  return {
    project_id: row.project_id,
    slug: row.slug,
    locale: locLang,
    title: cleanProjectTitle(row.title),
    challenge: row.challenge,
    outcome: row.outcome,
    created_at: row.created_at,
    capability_slugs: finalCapabilitySlugs,
    location: resolveCanonicalLocation(row.slug, locLang, location),
    cover_url,
    featured,
  };
}

async function fetchCapabilitySlugs(
  client: ReturnType<typeof publicClient>,
  projectIds: string[],
): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (projectIds.length === 0) return map;
  const { data, error } = await client
    .from("project_capabilities")
    .select("project_id, capabilities(slug)")
    .in("project_id", projectIds);
  if (error) {
    console.error("[Infeworks] fetchCapabilitySlugs failed", error.message);
    return map;
  }
  for (const row of data ?? []) {
    const slug = row.capabilities?.slug;
    if (!row.project_id || !slug) continue;
    map.set(row.project_id, [...(map.get(row.project_id) ?? []), slug]);
  }
  return map;
}

async function fetchLocations(
  client: ReturnType<typeof publicClient>,
  projectIds: string[],
): Promise<Map<string, PublicLocation>> {
  const map = new Map<string, PublicLocation>();
  if (projectIds.length === 0) return map;
  const { data, error } = await client
    .from("locations")
    .select("project_id, lat, lng, display_name")
    .in("project_id", projectIds);
  if (error) {
    console.error("[Infeworks] fetchLocations failed", error.message);
    return map;
  }
  for (const row of data ?? []) {
    if (!row.project_id) continue;
    map.set(row.project_id, {
      lat: row.lat,
      lng: row.lng,
      display_name: row.display_name,
    });
  }
  return map;
}

async function fetchCoverMedia(
  client: ReturnType<typeof publicClient>,
  projectIds: string[],
): Promise<Map<string, string | null>> {
  const map = new Map<string, string | null>();
  if (projectIds.length === 0) return map;

  let rows: Array<{ id: string; project_id: string | null; storage_path: string }> = [];

  const { data, error } = await client
    .from("media_assets")
    .select("id, project_id, storage_path, sort_order")
    .in("project_id", projectIds)
    .eq("is_public", true)
    .eq("media_type", "photo")
    .order("sort_order", { ascending: true });

  if (error) {
    const fallbackRes = await client
      .from("media_assets")
      .select("id, project_id, storage_path")
      .in("project_id", projectIds)
      .eq("is_public", true);
    if (!fallbackRes.error && fallbackRes.data) {
      rows = fallbackRes.data;
    }
  } else if (data) {
    rows = data;
  }

  const firstPhotoByProject = new Map<string, string>();
  for (const row of rows) {
    if (row.project_id && !firstPhotoByProject.has(row.project_id)) {
      firstPhotoByProject.set(row.project_id, row.storage_path);
    }
  }

  if (firstPhotoByProject.size === 0) return map;

  try {
    const { supabaseAdmin, isServiceRoleConfigured } =
      await import("@/integrations/supabase/client.server");
    const paths = Array.from(firstPhotoByProject.values());
    const pIds = Array.from(firstPhotoByProject.keys());

    if (isServiceRoleConfigured()) {
      const signed = await supabaseAdmin.storage
        .from("project-media")
        .createSignedUrls(paths, 60 * 60);
      signed.data?.forEach((s, idx) => {
        const pId = pIds[idx];
        if (pId && s.signedUrl) {
          map.set(pId, s.signedUrl);
        }
      });
    } else {
      pIds.forEach((pId, idx) => {
        const pPath = paths[idx];
        if (pId && pPath) {
          const { data: pubUrl } = client.storage
            .from("project-media")
            .getPublicUrl(pPath);
          map.set(pId, pubUrl.publicUrl);
        }
      });
    }
  } catch (err) {
    console.error("[Infeworks] fetchCoverMedia signing failed", err);
  }

  return map;
}

async function fetchFeaturedMap(
  client: ReturnType<typeof publicClient>,
  projectIds: string[],
): Promise<Map<string, boolean>> {
  const map = new Map<string, boolean>();
  if (projectIds.length === 0) return map;
  const { data, error } = await client
    .from("projects")
    .select("id, featured")
    .in("id", projectIds);
  if (error) {
    console.error("[Infeworks] fetchFeaturedMap failed", error.message);
    return map;
  }
  for (const row of data ?? []) {
    map.set(row.id, !!row.featured);
  }
  return map;
}

export async function fetchPublicProjects(locale: string): Promise<PublicProject[]> {
  try {
    const client = publicClient();
    const { data, error } = await client
      .from("vw_public_projects")
      .select("project_id, slug, locale, title, challenge, outcome, created_at")
      .eq("locale", normaliseLocale(locale))
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Infeworks] fetchPublicProjects failed", error.message);
      return [];
    }
    const rows = data ?? [];
    const ids = rows.map((r) => r.project_id).filter((id): id is string => !!id);
    const [caps, locs, covers, featuredMap] = await Promise.all([
      fetchCapabilitySlugs(client, ids),
      fetchLocations(client, ids),
      fetchCoverMedia(client, ids),
      fetchFeaturedMap(client, ids),
    ]);
    return rows
      .map((row) =>
        toProject(
          row,
          caps.get(row.project_id ?? "") ?? [],
          locs.get(row.project_id ?? "") ?? null,
          covers.get(row.project_id ?? "") ?? null,
          featuredMap.get(row.project_id ?? "") ?? false,
        ),
      )
      .filter((p): p is PublicProject => p !== null);
  } catch (err) {
    console.error("[Infeworks] fetchPublicProjects exception", err);
    return [];
  }
}

export async function fetchPublicProjectBySlug(
  slug: string,
  locale: string,
): Promise<PublicProjectDetail | null> {
  try {
    const client = publicClient();
    const lang = normaliseLocale(locale);

    const { data: row, error } = await client
      .from("vw_public_projects")
      .select("project_id, slug, locale, title, challenge, outcome, created_at")
      .eq("slug", slug)
      .eq("locale", lang)
      .maybeSingle();

    if (error) {
      console.error("[Infeworks] fetchPublicProjectBySlug failed", error.message);
      return null;
    }
    const project = row ? toProject(row) : null;
    if (!project) return null;
    project.capability_slugs =
      (await fetchCapabilitySlugs(client, [project.project_id])).get(project.project_id) ?? [];

    const [locationRes, claimsRes, mediaRes, projectRes] = await Promise.all([
      client
        .from("locations")
        .select("lat, lng, display_name")
        .eq("project_id", project.project_id)
        .maybeSingle(),
      client
        .from("claims")
        .select("id, content, locale")
        .eq("project_id", project.project_id)
        .eq("locale", lang)
        .order("created_at", { ascending: true }),
      client
        .from("media_assets")
        .select("id, storage_path, alt_en, alt_ar, media_type, mime_type, sort_order")
        .eq("project_id", project.project_id)
        .eq("is_public", true)
        .order("sort_order", { ascending: true }),
      client
        .from("projects")
        .select(
          "id, featured, client_en, client_ar, consultant_en, consultant_ar, scope_en, scope_ar, capacity_en, capacity_ar, year, region_en, region_ar",
        )
        .eq("id", project.project_id)
        .maybeSingle(),
    ]);

    const location: PublicLocation | null = locationRes.data
      ? {
          lat: locationRes.data.lat,
          lng: locationRes.data.lng,
          display_name: locationRes.data.display_name,
        }
      : null;

    const claims: PublicClaim[] = (claimsRes.data ?? []).map((c) => ({
      id: c.id,
      content: c.content,
      locale: c.locale,
    }));

    const meta = getProjectMeta(slug);
    const isAr = lang === "ar";
    
    let projData: any = projectRes.data;
    if (projectRes.error) {
      const fb = await client
        .from("projects")
        .select("id, featured")
        .eq("id", project.project_id)
        .maybeSingle();
      if (fb.data) {
        projData = fb.data;
      }
    }

    const facts: PublicProjectFacts = {
      client:
        (isAr ? projData?.client_ar : projData?.client_en) ??
        (isAr ? meta?.client?.ar : meta?.client?.en) ??
        "",
      consultant:
        (isAr ? projData?.consultant_ar : projData?.consultant_en) ??
        (isAr ? meta?.consultant?.ar : meta?.consultant?.en) ??
        "",
      scope:
        (isAr ? projData?.scope_ar : projData?.scope_en) ??
        (isAr ? meta?.scope?.ar : meta?.scope?.en) ??
        "",
      capacity:
        (isAr ? projData?.capacity_ar : projData?.capacity_en) ??
        (isAr ? meta?.capacity?.ar : meta?.capacity?.en) ??
        "",
      year: projData?.year ?? meta?.year ?? "",
      region:
        (isAr ? projData?.region_ar : projData?.region_en) ??
        (isAr ? meta?.region?.ar : meta?.region?.en) ??
        "",
    };

    if (projData?.featured !== undefined) {
      project.featured = projData.featured;
    }

    let rawMediaRows = mediaRes.data ?? [];
    if (mediaRes.error) {
      const fb = await client
        .from("media_assets")
        .select("id, storage_path, alt_en, alt_ar")
        .eq("project_id", project.project_id)
        .eq("is_public", true);
      if (fb.data) {
        rawMediaRows = fb.data.map((m) => ({
          ...m,
          media_type: "photo",
          mime_type: null,
          sort_order: 1,
        }));
      }
    }
    let signedMedia: Array<PublicMedia> = [];

    if (rawMediaRows.length > 0) {
      try {
        const { supabaseAdmin, isServiceRoleConfigured } =
          await import("@/integrations/supabase/client.server");
        if (isServiceRoleConfigured()) {
          const signed = await supabaseAdmin.storage.from("project-media").createSignedUrls(
            rawMediaRows.map((m) => m.storage_path),
            60 * 60,
          );
          signedMedia = rawMediaRows.flatMap((m, i) => {
            const url = signed.data?.[i]?.signedUrl;
            if (!url) return [];
            return [
              {
                id: m.id,
                url,
                alt: (isAr ? m.alt_ar : m.alt_en) ?? null,
                media_type: m.media_type as "photo" | "schema",
                mime_type: m.mime_type,
              },
            ];
          });
        } else {
          signedMedia = rawMediaRows.map((m) => {
            const { data } = client.storage.from("project-media").getPublicUrl(m.storage_path);
            return {
              id: m.id,
              url: data.publicUrl,
              alt: (isAr ? m.alt_ar : m.alt_en) ?? null,
              media_type: m.media_type as "photo" | "schema",
              mime_type: m.mime_type,
            };
          });
        }
      } catch (err) {
        console.error("[Infeworks] media signing failed", err);
      }
    }

    const photos = signedMedia.filter((m) => m.media_type === "photo");
    const schema = signedMedia.find((m) => m.media_type === "schema") ?? null;

    project.cover_url = photos[0]?.url ?? meta?.cover ?? null;
    project.location = resolveCanonicalLocation(slug, lang, location);

    return { project, location: project.location, claims, media: photos, facts, schema };
  } catch (err) {
    console.error("[Infeworks] fetchPublicProjectBySlug exception", err);
    return null;
  }
}

export async function fetchCapabilities(): Promise<PublicCapability[]> {
  try {
    const { data, error } = await publicClient()
      .from("capabilities")
      .select("id, slug, en_name, ar_name")
      .order("en_name", { ascending: true });

    if (error) {
      console.error("[Infeworks] fetchCapabilities failed", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[Infeworks] fetchCapabilities exception", err);
    return [];
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await publicClient().from("site_settings").select("key, value");
    if (error) {
      console.error("[Infeworks] fetchSiteSettings failed", error.message);
      return {};
    }
    const out: SiteSettings = {};
    for (const row of data ?? []) {
      if (row.key && row.value) out[row.key] = row.value;
    }
    return out;
  } catch (err) {
    console.error("[Infeworks] fetchSiteSettings exception", err);
    return {};
  }
}
