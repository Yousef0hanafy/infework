// @vitest-environment happy-dom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import ScrollExperience from "../components/infeworks/ScrollExperience";

it("keeps the invisible top control out of keyboard navigation and honors reduced motion", async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  vi.spyOn(window, "matchMedia").mockReturnValue({ ...media, matches: true } as MediaQueryList);
  const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  try {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(0);
    await act(async () => root.render(createElement(ScrollExperience)));
    const button = host.querySelector<HTMLButtonElement>('button[aria-label="Back to top"]')!;
    expect(button.tabIndex).toBe(-1);
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-hidden")).toBe("true");
    vi.spyOn(window, "scrollY", "get").mockReturnValue(window.innerHeight * 2);
    await act(async () => window.dispatchEvent(new Event("scroll")));
    expect(button.tabIndex).toBe(0);
    expect(button.disabled).toBe(false);
    expect(button.getAttribute("aria-hidden")).toBe("false");
    await act(async () => button.click());
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    vi.spyOn(window, "scrollY", "get").mockReturnValue(0);
    await act(async () => window.dispatchEvent(new Event("scroll")));
    expect(button.tabIndex).toBe(-1);
    expect(button.disabled).toBe(true);
  } finally {
    await act(async () => root.unmount());
    host.remove();
    vi.restoreAllMocks();
  }
});
