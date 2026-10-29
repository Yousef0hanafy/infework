import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchCapabilities,
  fetchPublicProjectBySlug,
  fetchPublicProjects,
} from "./public-data.server";

const state = vi.hoisted(() => ({
  mode: "outage" as
    | "outage"
    | "empty"
    | "live"
    | "denied"
    | "partial"
    | "partial_denied"
    | "media_failure"
    | "bilingual"
    | "title_outage"
    | "title_denied",
}));
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from(table: string) {
      let selection = "";
      let requestedLocale = "en";
      const result = (single = false) => {
        if (state.mode === "outage")
          return { data: null, error: { message: "TypeError: fetch failed", code: "" } };
        if (state.mode === "denied")
          return { data: null, error: { message: "permission denied", code: "42501" } };
        if (table === "vw_public_projects" && selection === "project_id, locale, title") {
          if (state.mode === "title_outage" || state.mode === "title_denied")
            return {
              data: null,
              error:
                state.mode === "title_outage"
                  ? { message: "TypeError: fetch failed", code: "" }
                  : { message: "permission denied", code: "42501" },
            };
          if (state.mode === "bilingual")
            return {
              data: [
                {
                  project_id: "live-id",
                  locale: "en",
                  title: "English published title (Contract 12)",
                },
                { project_id: "live-id", locale: "ar", title: "عنوان عربي" },
                { project_id: "other-id", locale: "en", title: "Other locale only" },
              ],
              error: null,
            };
        }
        if (table === "locations" && (state.mode === "partial" || state.mode === "partial_denied"))
          return {
            data: null,
            error:
              state.mode === "partial"
                ? { message: "TypeError: fetch failed", code: "" }
                : { message: "permission denied", code: "42501" },
          };
        if (
          table === "vw_public_projects" &&
          [
            "live",
            "partial",
            "partial_denied",
            "media_failure",
            "bilingual",
            "title_outage",
            "title_denied",
          ].includes(state.mode)
        ) {
          const row = {
            project_id: "live-id",
            slug: "current-live-project",
            locale: requestedLocale,
            title: requestedLocale === "ar" ? "عنوان عربي" : "Current live title",
            challenge: requestedLocale === "ar" ? "التحدي" : null,
            outcome: requestedLocale === "ar" ? "النتيجة" : null,
            created_at: null,
          };
          return { data: single ? row : [row], error: null };
        }
        if (table === "media_assets" && state.mode === "media_failure")
          return {
            data: [
              {
                id: "media-id",
                project_id: "live-id",
                storage_path: "approved.webp",
                media_type: "photo",
                mime_type: "image/webp",
                sort_order: 1,
                alt_en: null,
                alt_ar: null,
              },
            ],
            error: null,
          };
        return { data: single ? null : [], error: null };
      };
      const query = {
        select: (value: string) => {
          selection = value;
          return query;
        },
        eq: (key: string, value: string) => {
          if (key === "locale") requestedLocale = value;
          return query;
        },
        in: () => query,
        order: () => query,
        maybeSingle: () => Promise.resolve(result(true)),
        then: (resolve: (r: unknown) => unknown) => Promise.resolve(result()).then(resolve),
      };
      return query;
    },
  }),
}));

beforeEach(() => {
  state.mode = "outage";
  process.env["SUPABASE_URL"] = "https://test.example";
  process.env["SUPABASE_PUBLISHABLE_KEY"] = "sb_publishable_test";
});

describe("published catalogue recovery", () => {
  it.each(["ar", "en"])(
    "retains all 22 verified published projects during an outage (%s)",
    async (locale) => {
      const projects = await fetchPublicProjects(locale);
      expect(projects).toHaveLength(22);
      expect(new Set(projects.map((p) => p.slug)).size).toBe(22);
      expect(projects.every((p) => p.catalogue_snapshot_date === "2026-10-18")).toBe(true);
      expect(projects.some((p) => p.slug === "gas-egypt-stations-electromechanical")).toBe(false);
      for (const project of projects) expect(project.project_id).toMatch(/^[a-f0-9-]{36}$/);
    },
  );

  it.each(["ar", "en"])(
    "opens a previously missing project from the published snapshot (%s)",
    async (locale) => {
      const detail = await fetchPublicProjectBySlug("qabs-min-nour-mosque", locale);
      expect(detail?.project.slug).toBe("qabs-min-nour-mosque");
      expect(detail?.project.catalogue_snapshot_date).toBe("2026-10-18");
      expect(detail?.project.title).toBeTruthy();
      expect(detail?.project.cover_url).toContain("qabs-min-nour-mosque");
    },
  );

  it("never fabricates a case study for a draft or unknown slug", async () => {
    expect(await fetchPublicProjectBySlug("gas-egypt-stations-electromechanical", "en")).toBeNull();
    expect(await fetchPublicProjectBySlug("not-a-project", "en")).toBeNull();
  });

  it("honours a healthy empty published list and an unpublished known slug", async () => {
    state.mode = "empty";
    expect(await fetchPublicProjects("en")).toEqual([]);
    expect(await fetchPublicProjectBySlug("qabs-min-nour-mosque", "en")).toBeNull();
  });

  it("uses recovered live results without merging in stale projects", async () => {
    state.mode = "live";
    const rows = await fetchPublicProjects("en");
    expect(rows.map((p) => p.slug)).toEqual(["current-live-project"]);
    expect(rows[0]?.catalogue_snapshot_date).toBeUndefined();
  });

  it("does not convert permission denials into a successful snapshot response", async () => {
    state.mode = "denied";
    await expect(fetchPublicProjects("en")).rejects.toThrow();
    await expect(fetchPublicProjectBySlug("qabs-min-nour-mosque", "en")).rejects.toThrow();
  });

  it("retains the six public sector filters during an outage", async () => {
    expect((await fetchCapabilities()).map((c) => c.slug).sort()).toEqual([
      "civil-buildings",
      "industrial-mep",
      "infrastructure-networks",
      "pumping-wells",
      "wastewater",
      "water-treatment",
    ]);
  });
});

describe("authoritative live membership", () => {
  it.each(["en", "ar"])(
    "enriches %s rows with published English titles while preserving localized content",
    async (locale) => {
      state.mode = "bilingual";
      const rows = await fetchPublicProjects(locale);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        project_id: "live-id",
        locale,
        display_title: "English published title",
        display_title_lang: "en",
        title_ar: "عنوان عربي",
      });
      const detail = await fetchPublicProjectBySlug("current-live-project", locale);
      expect(detail?.project.display_title).toBe("English published title");
      expect(detail?.project.locale).toBe(locale);
      if (locale === "ar")
        expect(detail?.project).toMatchObject({
          title: "عنوان عربي",
          challenge: "التحدي",
          outcome: "النتيجة",
        });
    },
  );

  it("degrades title enrichment transport failure to current live titles", async () => {
    state.mode = "title_outage";
    const rows = await fetchPublicProjects("ar");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      slug: "current-live-project",
      display_title: "عنوان عربي",
      display_title_lang: "ar",
    });
    expect(rows[0]?.catalogue_snapshot_date).toBeUndefined();
    expect(
      (await fetchPublicProjectBySlug("current-live-project", "ar"))?.project.display_title,
    ).toBe("عنوان عربي");
  });

  it("surfaces title enrichment denial without restoring archive membership", async () => {
    state.mode = "title_denied";
    await expect(fetchPublicProjects("en")).rejects.toThrow();
    await expect(fetchPublicProjectBySlug("current-live-project", "en")).rejects.toThrow();
  });

  it("uses matching published snapshot IDs for English titles on either locale", async () => {
    const en = await fetchPublicProjects("en");
    const ar = await fetchPublicProjects("ar");
    for (const row of ar) {
      const matching = en.find((item) => item.project_id === row.project_id);
      expect(row.display_title).toBe(matching?.title);
      expect(row.display_title_lang).toBe("en");
      expect(row.locale).toBe("ar");
    }
  });
  it.each(["partial", "partial_denied"] as const)(
    "surfaces %s metadata failure without restoring archived rows",
    async (mode) => {
      state.mode = mode;
      await expect(fetchPublicProjects("en")).rejects.toThrow();
      await expect(fetchPublicProjectBySlug("current-live-project", "en")).rejects.toThrow();
    },
  );
});

vi.mock("./media-client.server", () => ({
  isMediaSigningConfigured: () => true,
  getMediaSigningClient: () => ({
    storage: {
      from: () => ({
        createSignedUrls: async () => ({ data: null, error: new TypeError("fetch failed") }),
      }),
    },
  }),
}));
it("keeps live-approved entries usable when image signing alone is unavailable", async () => {
  state.mode = "media_failure";
  const rows = await fetchPublicProjects("en");
  expect(rows.map((p) => p.slug)).toEqual(["current-live-project"]);
  expect(rows[0]?.media_unavailable).toBe(true);
  const detail = await fetchPublicProjectBySlug("current-live-project", "en");
  expect(detail?.project.slug).toBe("current-live-project");
  expect(detail?.project.media_unavailable).toBe(true);
});
