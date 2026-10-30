// Custom signals are intentionally separate from GA4's automatic click/file_download events.
// Never pass submitted fields, destination URLs, link text or arbitrary page/query strings.
type Locale = "en" | "ar";
function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}
function send(name: string, parameters: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    const gtag = (globalThis as typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") gtag("event", name, parameters);
  } catch {
    // Analytics must never change form success or navigation behavior.
  }
}
export function trackEnquiryResult({
  success,
  inquiryType,
  locale,
  honeypot,
}: {
  success: unknown;
  inquiryType: string;
  locale: string;
  honeypot: boolean;
}) {
  if (
    success !== true ||
    honeypot ||
    !isLocale(locale) ||
    !["technical", "general", "supplier"].includes(inquiryType)
  )
    return;
  send(inquiryType === "technical" ? "generate_lead" : "enquiry_saved", {
    inquiry_type: inquiryType,
    locale,
    page_type: "contact",
  });
}
export function trackPublicLink(target: EventTarget | null, locale: string) {
  if (typeof Element === "undefined" || !(target instanceof Element) || !isLocale(locale)) return;
  const link = target.closest("a[href]");
  if (!link) return;
  try {
    const url = new URL(link.getAttribute("href")!, "https://www.infeworks.com");
    const method =
      url.protocol === "tel:"
        ? "phone"
        : url.protocol === "mailto:"
          ? "email"
          : url.protocol === "https:" &&
              ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)
            ? "whatsapp"
            : null;
    if (method) send("contact_intent", { method, locale });
    else if (["http:", "https:"].includes(url.protocol) && /\.pdf$/i.test(url.pathname)) {
      send("document_download_intent", { document_type: "pdf", locale });
    }
  } catch {
    // Ignore malformed links; leave the browser's navigation untouched.
  }
}
