import { describe, expect, it } from "vitest";
import { getProjectTitle, groupProjectTitles } from "./project-title";

describe("project display titles", () => {
  it.each(["en", "ar"])("prefers cleaned English on the %s interface", (locale) => {
    expect(
      getProjectTitle({
        title: "عنوان محلي",
        locale,
        title_en: " English (Contract 12) ",
        title_ar: "عنوان",
      }),
    ).toEqual({ text: "English", lang: "en" });
  });
  it("falls back to Arabic when English cleans to blank", () => {
    expect(
      getProjectTitle({
        title: "Local",
        title_en: " (Contract 12) ",
        title_ar: " عنوان — مكمل 2 ",
      }),
    ).toEqual({ text: "عنوان", lang: "ar" });
  });
  it("retains display and localized fallbacks without inferring translations", () => {
    expect(
      getProjectTitle({
        title: "محلي",
        locale: "ar",
        display_title: "Saved display",
        display_title_lang: "en",
      }),
    ).toEqual({ text: "Saved display", lang: "en" });
    expect(getProjectTitle({ title: "محلي (عقد 2)", locale: "ar" })).toEqual({
      text: "محلي",
      lang: "ar",
    });
  });
  it.each([
    ["en", "Project"],
    ["ar", "مشروع"],
  ])("keeps a generic %s label when all titles clean to blank", (locale, text) => {
    expect(
      getProjectTitle({ title: " (Contract 12) ", locale, title_en: " ", title_ar: " " }),
    ).toEqual({ text, lang: locale });
  });
  it("isolates translations by authoritative ID", () => {
    const groups = groupProjectTitles([
      { project_id: "first", locale: "en", title: "First" },
      { project_id: "second", locale: "ar", title: "ثان" },
      { project_id: null, locale: "en", title: "Unidentified" },
    ]);
    expect(groups.get("first")).toEqual({ title_en: "First" });
    expect(groups.get("second")).toEqual({ title_ar: "ثان" });
    expect(groups.size).toBe(2);
  });
});
