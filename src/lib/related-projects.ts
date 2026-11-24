import type { PublicProject } from "./public-types";

/** Other published projects in the same disciplines, closest match first. */
export function selectRelatedProjects(
  current: Pick<PublicProject, "slug" | "capability_slugs">,
  all: PublicProject[],
  limit = 3,
): PublicProject[] {
  const own = new Set(current.capability_slugs);
  return all
    .filter((p) => p.slug !== current.slug)
    .map((project, index) => ({
      project,
      index,
      shared: project.capability_slugs.filter((slug) => own.has(slug)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        Number(b.project.featured ?? false) - Number(a.project.featured ?? false) ||
        a.index - b.index,
    )
    .slice(0, limit)
    .map((entry) => entry.project);
}
