// @vitest-environment happy-dom
import { act, createElement, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { Route } from "../routes/$locale.work.index";

const state = vi.hoisted(() => ({
  search: {} as Record<string, unknown>,
  navigate: vi.fn(),
  projects: [] as Array<{
    project_id: string;
    slug: string;
    title: string;
    capability_slugs: string[];
  }>,
}));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => ({
    options,
    useParams: () => ({ locale: "en" }),
    useSearch: () => state.search,
    useNavigate: () => state.navigate,
    useLoaderData: () => ({
      projects: state.projects,
      capabilities: [{ slug: "water-treatment", en_name: "Water", ar_name: "مياه" }],
    }),
  }),
  Link: ({ children }: { children: unknown }) => children,
}));
vi.mock("./public.functions", () => ({ getCapabilities: vi.fn(), getPublicProjects: vi.fn() }));
vi.mock("@/components/infeworks/HeroMetrics", () => ({ default: () => null }));
vi.mock("@/components/infeworks/CatalogueSnapshotNotice", () => ({ default: () => null }));
afterEach(() => {
  vi.useRealTimers();
  state.navigate.mockReset();
  state.search = {};
  state.projects = [];
});

it("cancels pending typing when reset is clicked and preserves a pending query on sector change", async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.useFakeTimers();
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => root.render(createElement(Route.options.component as ComponentType)));
    const input = container.querySelector<HTMLInputElement>('input[type="search"]')!;
    expect(input).not.toBeNull();
    const type = async (value: string) =>
      act(async () => {
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!.call(
          input,
          value,
        );
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    await type("pending");
    const sector = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Water",
    )!;
    await act(async () => sector.click());
    expect(state.navigate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        search: { q: "pending", sector: "water-treatment" },
        replace: false,
        resetScroll: false,
      }),
    );
    await act(async () => vi.advanceTimersByTimeAsync(400));
    expect(state.navigate).toHaveBeenCalledTimes(1);
    await type("another");
    const reset = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Reset filters",
    )!;
    await act(async () => reset.click());
    expect(state.navigate).toHaveBeenLastCalledWith(
      expect.objectContaining({ search: {}, resetScroll: false }),
    );
    const calls = state.navigate.mock.calls.length;
    await act(async () => vi.advanceTimersByTimeAsync(400));
    expect(state.navigate).toHaveBeenCalledTimes(calls);
    expect(input.value).toBe("");
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
});

// This exercises URL-driven rendering with a mocked route, not browser scroll restoration.
it("restores expanded URL results, filters visible cards, and clears query without losing sector", async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  state.projects = Array.from({ length: 15 }, (_, i) => ({
    project_id: String(i),
    slug: "fixture-" + i,
    title: "Water Station " + i,
    capability_slugs: ["water-treatment"],
  }));
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const render = () =>
    act(async () => root.render(createElement(Route.options.component as ComponentType)));
  try {
    await render();
    expect(container.querySelectorAll("h2")).toHaveLength(12);
    expect(container.textContent).not.toMatch(/Showing \d+ of \d+/);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    const more = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Load More Projects",
    )!;
    await act(async () => more.click());
    expect(state.navigate).toHaveBeenLastCalledWith(
      expect.objectContaining({ search: { limit: 15 }, replace: true, resetScroll: false }),
    );
    const input = container.querySelector<HTMLInputElement>("#project-search")!;
    await act(async () => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!.call(
        input,
        "pending",
      );
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(more.disabled).toBe(true);
    await act(async () => more.click());
    expect(state.navigate).toHaveBeenCalledTimes(1);
    state.search = { limit: 15 };
    await render();
    expect(container.querySelectorAll("h2")).toHaveLength(15);
    state.search = { q: "Station 14", sector: "water-treatment" };
    await render();
    expect([...container.querySelectorAll("h2")].map((el) => el.textContent)).toEqual([
      "Water Station 14",
    ]);
    expect(container.querySelector<HTMLInputElement>("#project-search")!.value).toBe("Station 14");
    const clear = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Clear search",
    )!;
    await act(async () => clear.click());
    expect(state.navigate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        search: { sector: "water-treatment" },
        replace: true,
        resetScroll: false,
      }),
    );
    state.search = { limit: 15 };
    await render();
    expect(container.querySelectorAll("h2")).toHaveLength(15);
    expect(container.querySelector<HTMLInputElement>("#project-search")!.value).toBe("");
    expect(container.querySelector('[role="group"] button[aria-pressed="true"]')?.textContent).toBe(
      "All Sectors",
    );
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
});
