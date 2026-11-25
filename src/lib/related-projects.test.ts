import { expect, it } from "vitest";
import type { PublicProject } from "./public-types";
import { selectRelatedProjects } from "./related-projects";

function project(slug: string, capability_slugs: string[], featured = false): PublicProject {
  return {
    project_id: slug,
    slug,
    locale: "en",
    title: slug,
    challenge: null,
    outcome: null,
    created_at: null,
    capability_slugs,
    location: null,
    cover_url: null,
    featured,
  };
}

const all = [
  project("current", ["wastewater", "pumping-wells"]),
  project("networks-only", ["infrastructure-networks"]),
  project("wastewater-a", ["wastewater"]),
  project("both", ["pumping-wells", "wastewater"]),
  project("wastewater-featured", ["wastewater"], true),
  project("pumping-b", ["pumping-wells"]),
];

it("lists other projects from the same disciplines, closest match first", () => {
  const related = selectRelatedProjects(all[0]!, all).map((p) => p.slug);
  expect(related).toEqual(["both", "wastewater-featured", "wastewater-a"]);
});

it("never includes the current project or unrelated disciplines", () => {
  const related = selectRelatedProjects(all[0]!, all, 10).map((p) => p.slug);
  expect(related).not.toContain("current");
  expect(related).not.toContain("networks-only");
  expect(related).toHaveLength(4);
});

it("returns nothing when no other project shares a discipline", () => {
  expect(selectRelatedProjects(project("solo", ["civil-buildings"]), all)).toEqual([]);
  expect(selectRelatedProjects(project("untagged", []), all)).toEqual([]);
});
