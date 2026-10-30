// @vitest-environment happy-dom
import { act, createElement, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { Route } from "../routes/$locale.contact";
import { submitContact } from "./contact.functions";
const state = vi.hoisted(() => ({ type: "technical" }));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => ({
    options,
    useParams: () => ({ locale: "en" }),
    useSearch: () => ({ type: state.type }),
  }),
  Link: ({ children }: { children: unknown }) => children,
}));
vi.mock("./contact.functions", () => ({ submitContact: vi.fn() }));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.mocked(submitContact).mockReset();
});
it.each([
  { type: "technical", success: true, spam: false, event: "generate_lead" },
  { type: "technical", success: false, spam: false, event: null },
  { type: "technical", success: true, spam: true, event: null },
  { type: "supplier", success: true, spam: false, event: "enquiry_saved" },
  { type: "general", success: true, spam: false, event: "enquiry_saved" },
])(
  "the actual form counts $type receipt success=$success spam=$spam correctly",
  async ({ type, success, spam, event }) => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    state.type = type;
    const send = vi.fn();
    vi.stubGlobal("gtag", send);
    vi.mocked(submitContact).mockResolvedValue({ success });
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    try {
      await act(async () => root.render(createElement(Route.options.component as ComponentType)));
      expect(host.querySelector("form")?.getAttribute("data-clarity-mask")).toBe("true");
      await act(async () => {
        for (const [id, value] of Object.entries({
          name: "Test Engineer",
          email: "private@example.test",
          phone: "01000000000",
          message: "A confidential test project message",
          ...(spam ? { bot_field: "spam" } : {}),
        })) {
          const input = host.querySelector<HTMLInputElement | HTMLTextAreaElement>("#" + id)!;
          const prototype =
            input instanceof HTMLTextAreaElement
              ? HTMLTextAreaElement.prototype
              : HTMLInputElement.prototype;
          Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(input, value);
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        for (const [id, value] of Object.entries(
          type === "technical"
            ? { audience_type: "contractor", need_type: "design" }
            : type === "supplier"
              ? { supplier_category: "pumps" }
              : {},
        )) {
          const select = host.querySelector<HTMLSelectElement>("#" + id)!;
          select.value = value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
        host.querySelector<HTMLInputElement>("#consent")!.click();
      });
      await act(async () => {
        host
          .querySelector("form")!
          .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      });
      expect(submitContact).toHaveBeenCalledOnce();
      if (event)
        expect(send).toHaveBeenCalledExactlyOnceWith("event", event, {
          inquiry_type: type,
          locale: "en",
          page_type: "contact",
        });
      else expect(send).not.toHaveBeenCalled();
      expect(host.textContent).toContain(
        success ? "Enquiry Successfully Received" : "Submission Error",
      );
      expect(JSON.stringify(send.mock.calls)).not.toMatch(/private|confidential|01000000000/);
    } finally {
      await act(async () => root.unmount());
      host.remove();
    }
  },
);
