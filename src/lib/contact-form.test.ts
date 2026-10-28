// @vitest-environment happy-dom
import { act, createElement, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { Route } from "../routes/$locale.contact";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => ({
    options,
    useParams: () => ({ locale: "en" }),
    useSearch: () => ({}),
  }),
  Link: ({ children }: { children: unknown }) => children,
}));
vi.mock("./contact.functions", () => ({ submitContact: vi.fn() }));

it("shows and associates required technical-select errors after an invalid submit", async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => {
      root.render(createElement(Route.options.component as ComponentType));
    });
    await act(async () => {
      container.querySelector<HTMLInputElement>("#consent")!.click();
    });
    await act(async () => {
      container
        .querySelector("form")!
        .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    for (const name of ["audience_type", "need_type"]) {
      const field = container.querySelector("#" + name)!;
      expect(field.getAttribute("aria-invalid")).toBe("true");
      const errorId = field.getAttribute("aria-describedby");
      expect(errorId).toBe(name + "-error");
      expect(container.querySelector("#" + errorId)?.textContent).toContain("Please select");
    }
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
});
