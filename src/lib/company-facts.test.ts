import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import {
  COMPANY_PHONE,
  COMPANY_PHONE_HREF,
  COMPANY_WHATSAPP_URL,
  RESPONSE_TIME,
  WORKING_HOURS,
  WORKING_HOURS_SHORT,
} from "./company-facts";
import { organizationSchema } from "./site-schema";

const digits = (value: string) => value.replace(/\D/g, "");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

it("shows, dials, messages and declares the same number", () => {
  expect(COMPANY_PHONE.e164).toMatch(/^\+20\d{10}$/);
  expect(digits(COMPANY_PHONE.display)).toBe(digits(COMPANY_PHONE.e164));
  expect(COMPANY_PHONE_HREF).toBe("tel:" + COMPANY_PHONE.e164);
  expect(COMPANY_WHATSAPP_URL).toBe("https://wa.me/" + digits(COMPANY_PHONE.e164));
  expect(organizationSchema.contactPoint[0]!.telephone).toBe(COMPANY_PHONE.e164);
});

it("states the same working hours and response time in both languages", () => {
  for (const hours of [WORKING_HOURS, WORKING_HOURS_SHORT]) {
    for (const text of [hours.en, hours.ar]) {
      // Opening time is written before closing time, in reading order.
      expect(text.indexOf("09:00")).toBeGreaterThan(-1);
      expect(text.indexOf("09:00")).toBeLessThan(text.indexOf("04:00"));
    }
  }
  expect(RESPONSE_TIME.en).toContain("24");
  expect(RESPONSE_TIME.ar).toContain("24");
});

it("keeps contact facts in one place instead of per-page copies", () => {
  const offenders = sourceFiles("src")
    .filter((path) => !path.replace(/\\/g, "/").endsWith("src/lib/company-facts.ts"))
    .filter((path) =>
      /wa\.me\/\d|tel:\+?\d|\+20[\s\d]{8,}|\b0?9:00\b|business day|يوم عمل/.test(
        readFileSync(path, "utf8"),
      ),
    );
  expect(offenders).toEqual([]);
});

it("keeps the static offline page on the same number", () => {
  const offline = readFileSync("public/offline.html", "utf8");
  expect(offline).toContain(`href="${COMPANY_PHONE_HREF}"`);
  expect(offline).toContain(COMPANY_PHONE.display);
  expect(offline.match(/tel:[+\d]+/g)).toEqual([COMPANY_PHONE_HREF]);
});
