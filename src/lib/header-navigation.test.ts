// @vitest-environment happy-dom
import { act, createElement, type AnchorHTMLAttributes, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { Header } from "../components/infeworks/Header";

const state = vi.hoisted(() => ({ pathname: "/en/work", searchStr: "" }));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select: (state: unknown) => unknown }) =>
    select({ location: state }),
  Link: ({
    to,
    params,
    activeProps: _active,
    search: _search,
    children,
    ...rest
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    params: { locale: string };
    activeProps?: unknown;
    search?: unknown;
    children: ReactNode;
  }) => createElement("a", { ...rest, href: to.replace("$locale", params.locale) }, children),
}));
vi.mock("@/components/infeworks/Logo", () => ({
  default: () => createElement("span", null, "Infeworks"),
}));

const cleanups: Array<() => Promise<void>> = [];
afterEach(async () => {
  for (const cleanup of cleanups.splice(0)) await cleanup();
  state.pathname = "/en/work";
  state.searchStr = "";
  vi.restoreAllMocks();
});
async function mount() {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  await act(async () => root.render(createElement(Header)));
  cleanups.push(async () => {
    await act(async () => root.unmount());
    host.remove();
  });
  const toggle = () => host.querySelector<HTMLButtonElement>("button")!;
  return {
    host,
    toggle,
    rerender: async () => act(async () => root.render(createElement(Header))),
  };
}
it("exposes the disclosure state and labelled navigation, and Escape restores focus from a menu link", async () => {
  const { host, toggle } = await mount();
  expect(toggle().getAttribute("aria-expanded")).toBe("false");
  await act(async () => toggle().click());
  expect(toggle().getAttribute("aria-expanded")).toBe("true");
  const panel = document.getElementById(toggle().getAttribute("aria-controls")!)!;
  expect(panel.tagName).toBe("NAV");
  expect(panel.getAttribute("aria-label")).toBe("Mobile navigation");
  panel.querySelector<HTMLAnchorElement>("a")!.focus();
  await act(async () =>
    document.activeElement!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    ),
  );
  expect(toggle().getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(toggle());
  expect(host.querySelector('nav[aria-label="Mobile navigation"]')).toBeNull();
});
it("localizes mobile control labels without changing catalogue language-switch state", async () => {
  state.pathname = "/ar/work";
  state.searchStr = "?q=Ameriya&sector=water-treatment";
  const { host, toggle } = await mount();
  expect(toggle().getAttribute("aria-label")).toBe("فتح القائمة");
  expect(host.querySelector('a[aria-label="Switch to English"]')?.getAttribute("href")).toBe(
    "/en/work?q=Ameriya&sector=water-treatment",
  );
  await act(async () => toggle().click());
  expect(toggle().getAttribute("aria-label")).toBe("إغلاق القائمة");
  expect(host.querySelector('nav[aria-label="التنقل على الهاتف"]')).not.toBeNull();
});
it("closes an open menu when location changes through browser navigation", async () => {
  const { toggle, rerender } = await mount();
  await act(async () => toggle().click());
  state.pathname = "/en/about";
  await rerender();
  expect(toggle().getAttribute("aria-expanded")).toBe("false");
});
it("closes on the desktop breakpoint and removes the resize subscription on unmount", async () => {
  const media = window.matchMedia("(min-width: 768px)");
  const add = vi.spyOn(media, "addEventListener");
  const remove = vi.spyOn(media, "removeEventListener");
  vi.spyOn(window, "matchMedia").mockReturnValue(media);
  const { toggle } = await mount();
  await act(async () => toggle().click());
  await act(async () => media.dispatchEvent(Object.assign(new Event("change"), { matches: true })));
  expect(toggle().getAttribute("aria-expanded")).toBe("false");
  expect(add).toHaveBeenCalledWith("change", expect.any(Function));
  await cleanups.pop()!();
  expect(remove).toHaveBeenCalledWith("change", add.mock.calls[0]![1]);
});
