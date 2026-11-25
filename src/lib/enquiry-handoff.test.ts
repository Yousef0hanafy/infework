import { expect, it } from "vitest";
import { buildEnquiryHandoff } from "./enquiry-handoff";

const base = {
  locale: "en" as const,
  inquiryType: "technical" as const,
  name: "Mona Adel",
  organization: "Delta Farms",
  email: "mona@example.test",
  phone: "+20 100 000 0000",
  audience: "Agricultural Reclamation",
  scope: "Pumping Stations & Deep Wells",
  location: "Minya",
  capacity: "5,000 m³/day",
  supplierCategory: "Pumps & Submersible Sets",
  website: "https://example.test/catalogue",
  message: "We need two booster stations before summer.",
};

function decoded(url: string, key: string) {
  return new URL(url).searchParams.get(key) ?? "";
}

it("writes a technical enquiry the desk can act on without the form", () => {
  const { text, whatsappUrl, mailtoUrl } = buildEnquiryHandoff(base);
  for (const part of [
    "Mona Adel",
    "Delta Farms",
    "mona@example.test",
    "+20 100 000 0000",
    "Agricultural Reclamation",
    "Pumping Stations & Deep Wells",
    "Minya",
    "5,000 m³/day",
    "We need two booster stations before summer.",
  ])
    expect(text).toContain(part);
  expect(text).not.toContain("Pumps & Submersible Sets");
  expect(text).not.toContain("example.test/catalogue");
  expect(whatsappUrl.startsWith("https://wa.me/201044794499?text=")).toBe(true);
  expect(decoded(whatsappUrl, "text")).toBe(text);
  expect(mailtoUrl.startsWith("mailto:info@infeworks.com?subject=")).toBe(true);
  expect(decodeURIComponent(mailtoUrl.split("&body=")[1]!)).toBe(text);
});

it("keeps only the fields that belong to the chosen enquiry type", () => {
  const supplier = buildEnquiryHandoff({ ...base, inquiryType: "supplier" }).text;
  expect(supplier).toContain("Pumps & Submersible Sets");
  expect(supplier).toContain("https://example.test/catalogue");
  expect(supplier).not.toContain("Minya");
  expect(supplier).not.toContain("Agricultural Reclamation");

  const general = buildEnquiryHandoff({ ...base, inquiryType: "general" }).text;
  expect(general).not.toContain("Minya");
  expect(general).not.toContain("Pumps & Submersible Sets");
  expect(general).toContain("Mona Adel");
});

it("omits empty optional fields instead of printing blank labels", () => {
  const { text } = buildEnquiryHandoff({ ...base, organization: "  ", capacity: "" });
  expect(text).not.toMatch(/Organization:/);
  expect(text).not.toMatch(/Capacity:/);
  expect(text).not.toMatch(/:\s*$/m);
});

it("uses Arabic labels for Arabic visitors", () => {
  const { text } = buildEnquiryHandoff({ ...base, locale: "ar", message: "نحتاج محطتي رفع." });
  expect(text).toContain("الاسم: Mona Adel");
  expect(text).toContain("الهاتف: +20 100 000 0000");
  expect(text).toContain("نحتاج محطتي رفع.");
});

it("shortens a long message to fit link limits and never drops the contact details", () => {
  const long = "تفاصيل المشروع ".repeat(400) + "😀".repeat(50);
  const { whatsappUrl, mailtoUrl, text } = buildEnquiryHandoff({ ...base, message: long });
  expect(text).toContain(long);
  expect(whatsappUrl.length).toBeLessThanOrEqual(6200);
  expect(mailtoUrl.length).toBeLessThanOrEqual(1900);
  for (const url of [
    decoded(whatsappUrl, "text"),
    decodeURIComponent(mailtoUrl.split("&body=")[1]!),
  ]) {
    expect(url).toContain("Mona Adel");
    expect(url).toContain("+20 100 000 0000");
    expect(url).toContain("mona@example.test");
    expect(url).toContain("…");
    expect(url).not.toContain("�");
  }
});
