type TitleLanguage = "en" | "ar";

export type ProjectTitles = { title_en?: string; title_ar?: string };
type ProjectTitleSource = {
  title: string;
  locale?: string | undefined;
  title_en?: string | undefined;
  title_ar?: string | undefined;
  display_title?: string | undefined;
  display_title_lang?: TitleLanguage | undefined;
};

export function cleanProjectTitle(title: string): string {
  return title
    .replace(/\s*\((?:Contract|عقد)[^)]+\)/gi, "")
    .replace(/\s*—\s*مكمل\s*\d+/gi, "")
    .trim();
}

/** Title language follows the selected content, independently of the interface locale. */
export function getProjectTitle(project: ProjectTitleSource): {
  text: string;
  lang: TitleLanguage;
} {
  const en = cleanProjectTitle(project.title_en ?? "");
  if (en) return { text: en, lang: "en" };
  const ar = cleanProjectTitle(project.title_ar ?? "");
  if (ar) return { text: ar, lang: "ar" };
  const lang = project.locale === "ar" ? "ar" : "en";
  const display = cleanProjectTitle(project.display_title ?? "");
  if (display) return { text: display, lang: project.display_title_lang ?? lang };
  return {
    text: cleanProjectTitle(project.title) || (lang === "ar" ? "مشروع" : "Project"),
    lang,
  };
}

/** Input rows must come from an approved published source; IDs alone join translations. */
export function groupProjectTitles(
  rows: ReadonlyArray<{ project_id: string | null; locale: string | null; title: string | null }>,
): Map<string, ProjectTitles> {
  const grouped = new Map<string, ProjectTitles>();
  for (const row of rows) {
    if (!row.project_id || (row.locale !== "en" && row.locale !== "ar")) continue;
    const title = cleanProjectTitle(row.title ?? "");
    if (!title) continue;
    const titles = grouped.get(row.project_id) ?? {};
    if (row.locale === "en") titles.title_en = title;
    else titles.title_ar = title;
    grouped.set(row.project_id, titles);
  }
  return grouped;
}

export function getProjectTitleFields(project: ProjectTitleSource) {
  const selected = getProjectTitle(project);
  return { display_title: selected.text, display_title_lang: selected.lang };
}
