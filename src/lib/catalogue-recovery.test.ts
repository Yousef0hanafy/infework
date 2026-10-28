import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchCapabilities,
  fetchPublicProjectBySlug,
  fetchPublicProjects,
} from "./public-data.server";

const state = vi.hoisted(() => ({ mode: "outage" as "outage" | "empty" | "live" | "denied" }));
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from(table: string) {
      const result = (single = false) => {
        if (state.mode === "outage")
          return { data: null, error: { message: "TypeError: fetch failed", code: "" } };
        if (state.mode === "denied")
          return { data: null, error: { message: "permission denied", code: "42501" } };
        if (table === "vw_public_projects" && state.mode === "live") {
          const row = {
            project_id: "live-id",
            slug: "current-live-project",
            locale: "en",
            title: "Current live title",
            challenge: null,
            outcome: null,
            created_at: null,
          };
          return { data: single ? row : [row], error: null };
        }
        return { data: single ? null : [], error: null };
      };
      const query = {
        select: () => query,
        eq: () => query,
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
