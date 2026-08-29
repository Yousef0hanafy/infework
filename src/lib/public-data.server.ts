// Infeworks — server-only public data access (publishable key, RLS as anon)
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type {
  PublicCapability,
  PublicClaim,
  PublicLocation,
  PublicMedia,
  PublicProject,
  PublicProjectDetail,
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

function toProject(row: {
  project_id: string | null;
  slug: string | null;
  locale: string | null;
  title: string | null;
  challenge: string | null;
  outcome: string | null;
  created_at: string | null;
}, capability_slugs: string[] = [], location: PublicLocation | null = null): PublicProject | null {
  if (!row.project_id || !row.slug || !row.title) return null;
  return {
    project_id: row.project_id,
    slug: row.slug,
    locale: row.locale ?? "en",
    title: row.title,
    challenge: row.challenge,
    outcome: row.outcome,
    created_at: row.created_at,
    capability_slugs,
    location,
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

export async function fetchPublicProjects(locale: string): Promise<PublicProject[]> {
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
  const [caps, locs] = await Promise.all([
    fetchCapabilitySlugs(client, ids),
    fetchLocations(client, ids),
  ]);
  return rows
    .map((row) =>
      toProject(
        row,
        caps.get(row.project_id ?? "") ?? [],
        locs.get(row.project_id ?? "") ?? null,
      ),
    )
    .filter((p): p is PublicProject => p !== null);
}

export async function fetchPublicProjectBySlug(
  slug: string,
  locale: string,
): Promise<PublicProjectDetail | null> {
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

  const [locationRes, claimsRes, mediaRes] = await Promise.all([
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
      .select("id, storage_path, alt_en, alt_ar")
      .eq("project_id", project.project_id)
      .eq("is_public", true)
      .order("created_at", { ascending: true }),
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

  const mediaRows = mediaRes.data ?? [];
  let media: PublicMedia[] = [];
  if (mediaRows.length > 0) {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const signed = await supabaseAdmin.storage
        .from("project-media")
        .createSignedUrls(
          mediaRows.map((m) => m.storage_path),
          60 * 60,
        );
      media = mediaRows.flatMap((m, i) => {
        const url = signed.data?.[i]?.signedUrl;
        if (!url) return [];
        return [
          {
            id: m.id,
            url,
            alt: (lang === "ar" ? m.alt_ar : m.alt_en) ?? null,
          },
        ];
      });
    } catch (err) {
      console.error("[Infeworks] media signing failed", err);
    }
  }

  project.location = location;

  return { project, location, claims, media };
}

export async function fetchCapabilities(): Promise<PublicCapability[]> {
  const { data, error } = await publicClient()
    .from("capabilities")
    .select("id, slug, en_name, ar_name")
    .order("en_name", { ascending: true });

  if (error) {
    console.error("[Infeworks] fetchCapabilities failed", error.message);
    return [];
  }
  return data ?? [];
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
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
}
