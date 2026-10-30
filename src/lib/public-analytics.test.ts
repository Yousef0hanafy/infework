// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEnquiryResult, trackPublicLink } from "./public-analytics";
const send = vi.fn();
beforeEach(() => {
  vi.stubGlobal("gtag", send);
  send.mockClear();
});
afterEach(() => vi.unstubAllGlobals());
describe("public conversion signals", () => {
  it("records a technical enquiry only after confirmed success, with fixed non-personal parameters", () => {
    const event = Object.assign(
      { success: true, inquiryType: "technical", locale: "ar", honeypot: false },
      { email: "private@example.test", message: "confidential tender", phone: "01000000000" },
    );
    trackEnquiryResult(event);
    expect(send).toHaveBeenCalledExactlyOnceWith("event", "generate_lead", {
      inquiry_type: "technical",
      locale: "ar",
      page_type: "contact",
    });
    expect(JSON.stringify(send.mock.calls)).not.toMatch(/private|confidential|01000000000/);
  });
  it.each(["supplier", "general"])(
    "keeps %s enquiries separate from technical leads",
    (inquiryType) => {
      trackEnquiryResult({ success: true, inquiryType, locale: "en", honeypot: false });
      expect(send).toHaveBeenCalledExactlyOnceWith("event", "enquiry_saved", {
        inquiry_type: inquiryType,
        locale: "en",
        page_type: "contact",
      });
    },
  );
  it("does not count unsuccessful, spam-trap, malformed or unknown submissions", () => {
    for (const values of [
      { success: false },
      { success: undefined },
      { honeypot: true },
      { inquiryType: "private@example.test" },
      { locale: "private@example.test" },
    ]) {
      trackEnquiryResult({
        success: true,
        inquiryType: "technical",
        locale: "en",
        honeypot: false,
        ...values,
      });
    }
    expect(send).not.toHaveBeenCalled();
  });
  it("ignores missing or throwing analytics so an enquiry can still succeed", () => {
    vi.stubGlobal("gtag", undefined);
    expect(() =>
      trackEnquiryResult({
        success: true,
        inquiryType: "technical",
        locale: "en",
        honeypot: false,
      }),
    ).not.toThrow();
    vi.stubGlobal("gtag", () => {
      throw new Error("blocked");
    });
    expect(() =>
      trackEnquiryResult({
        success: true,
        inquiryType: "technical",
        locale: "en",
        honeypot: false,
      }),
    ).not.toThrow();
  });
});
describe("contact and document click intent", () => {
  it.each([
    ["https://wa.me/201006249420?text=secret", "whatsapp"],
    ["tel:+201006249420", "phone"],
    ["mailto:private@example.test?body=secret", "email"],
  ])("classifies %s without sending its destination or text", (href, method) => {
    const link = document.createElement("a");
    link.href = href;
    link.innerHTML = "<span>secret</span>";
    trackPublicLink(link.firstChild, "en");
    expect(send).toHaveBeenCalledExactlyOnceWith("event", "contact_intent", {
      method,
      locale: "en",
    });
    expect(JSON.stringify(send.mock.calls)).not.toMatch(/secret|201006|private/);
  });
  it("records PDF intent without duplicating GA4's automatic file_download event", () => {
    const link = document.createElement("a");
    link.href = "/downloads/infeworks-company-profile.pdf";
    trackPublicLink(link, "ar");
    expect(send).toHaveBeenCalledExactlyOnceWith("event", "document_download_intent", {
      document_type: "pdf",
      locale: "ar",
    });
  });
  it("ignores normal navigation, lookalike domains and non-elements", () => {
    for (const href of ["/en/work", "https://wa.me.attacker.test/1", "javascript:alert(1)"]) {
      const link = document.createElement("a");
      link.href = href;
      trackPublicLink(link, "en");
    }
    trackPublicLink(null, "en");
    expect(send).not.toHaveBeenCalled();
  });
});
