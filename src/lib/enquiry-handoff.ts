// When online enquiry storage is unavailable, the visitor can still send the same enquiry
// straight to the engineering desk. This builds that ready-written message.
//
// The URLs carry the visitor's private details. Open them from a button handler; never
// render them as an <a href>, because analytics outbound-click tracking records link URLs.

import { COMPANY_WHATSAPP_URL } from "./company-facts";

const DESK_EMAIL = "info@infeworks.com";

// Encoded-length budgets. Arabic costs six URL characters per letter, and desktop mail
// clients reject long mailto links, so the limits are on the encoded form.
const WHATSAPP_TEXT_BUDGET = 6000;
const MAILTO_BODY_BUDGET = 1500;

type Locale = "en" | "ar";

export type EnquiryHandoffInput = {
  locale: Locale;
  inquiryType: "technical" | "general" | "supplier";
  name: string;
  organization?: string;
  email: string;
  phone: string;
  /** Human-readable labels of the selected options, in the visitor's language. */
  audience?: string;
  scope?: string;
  supplierCategory?: string;
  location?: string;
  capacity?: string;
  website?: string;
  message: string;
};

const LABELS = {
  en: {
    heading: "Enquiry from infeworks.com",
    type: { technical: "Technical / Projects", general: "General", supplier: "Supplier" },
    typeLabel: "Type",
    name: "Name",
    organization: "Organization",
    email: "Email",
    phone: "Phone",
    audience: "Client type",
    scope: "Scope",
    location: "Location",
    capacity: "Capacity",
    supplierCategory: "Supply category",
    website: "Website",
    subject: "Enquiry from infeworks.com",
    shortened: "… (message shortened; full details to follow)",
  },
  ar: {
    heading: "استفسار من موقع إنفيوركس",
    type: { technical: "فني ومشاريع", general: "عام", supplier: "مورد" },
    typeLabel: "النوع",
    name: "الاسم",
    organization: "الجهة",
    email: "البريد",
    phone: "الهاتف",
    audience: "نوع الجهة",
    scope: "نطاق الأعمال",
    location: "الموقع",
    capacity: "الطاقة",
    supplierCategory: "تصنيف التوريد",
    website: "الموقع الإلكتروني",
    subject: "استفسار من موقع إنفيوركس",
    shortened: "… (تم اختصار الرسالة؛ التفاصيل الكاملة لاحقاً)",
  },
} as const;

function composeText(header: string, message: string) {
  return `${header}\n\n${message}`;
}

/** Shortens only the free-text message, keeping whole characters, until the encoded text fits. */
function fitMessage(header: string, message: string, note: string, budget: number) {
  const full = composeText(header, message);
  if (encodeURIComponent(full).length <= budget) return full;
  const chars = Array.from(message);
  let low = 0;
  let high = chars.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const candidate = composeText(header, chars.slice(0, mid).join("").trimEnd() + note);
    if (encodeURIComponent(candidate).length <= budget) low = mid;
    else high = mid - 1;
  }
  return composeText(header, chars.slice(0, low).join("").trimEnd() + note);
}

export function buildEnquiryHandoff(input: EnquiryHandoffInput) {
  const l = LABELS[input.locale];
  const technical = input.inquiryType === "technical";
  const supplier = input.inquiryType === "supplier";
  const header = [
    l.heading,
    [l.typeLabel, l.type[input.inquiryType]],
    [l.name, input.name],
    [l.organization, input.organization],
    [l.email, input.email],
    [l.phone, input.phone],
    [l.audience, technical ? input.audience : ""],
    [l.scope, technical ? input.scope : ""],
    [l.location, technical ? input.location : ""],
    [l.capacity, technical ? input.capacity : ""],
    [l.supplierCategory, supplier ? input.supplierCategory : ""],
    [l.website, supplier ? input.website : ""],
  ]
    .map((line) => {
      if (typeof line === "string") return line;
      const value = line[1]?.trim();
      return value ? `${line[0]}: ${value}` : "";
    })
    .filter(Boolean)
    .join("\n");
  const message = input.message.trim();

  return {
    /** The complete, unshortened enquiry. */
    text: composeText(header, message),
    whatsappUrl:
      `${COMPANY_WHATSAPP_URL}?text=` +
      encodeURIComponent(fitMessage(header, message, l.shortened, WHATSAPP_TEXT_BUDGET)),
    mailtoUrl:
      `mailto:${DESK_EMAIL}?subject=${encodeURIComponent(l.subject)}&body=` +
      encodeURIComponent(fitMessage(header, message, l.shortened, MAILTO_BODY_BUDGET)),
  };
}
