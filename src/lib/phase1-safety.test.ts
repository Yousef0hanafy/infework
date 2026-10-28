import { afterEach, describe, expect, it, vi } from "vitest";
import { safeJsonLd } from "./safe-json-ld";
import { createBoundedFetch } from "./upstream-fetch.server";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

afterEach(() => vi.useRealTimers());

describe("safe JSON-LD", () => {
  it("keeps closing-script text as data and preserves engineering characters", () => {
    const data = {
      name: "</script><script>alert(1)</script>",
      scope: "مياه < 10 m³/day & pressure",
    };
    const json = safeJsonLd(data);
    expect(json).not.toMatch(/</);
    expect(JSON.parse(json)).toEqual(data);
  });
});

describe("bounded upstream fetch", () => {
  it("bounds a black-holed connection even if the transport ignores cancellation", async () => {
    vi.useFakeTimers();
    const transport = vi.fn(() => new Promise<Response>(() => {}));
    const request = createBoundedFetch({ timeoutMs: 100, fetchImpl: transport });
    const pending = expect(request("https://source.test/rest/v1/projects")).rejects.toThrow(
      /timed out/i,
    );
    await vi.advanceTimersByTimeAsync(101);
    await pending;
    expect(transport.mock.calls).toHaveLength(1);
  });

  it("bounds the response body too", async () => {
    vi.useFakeTimers();
    const request = createBoundedFetch({
      timeoutMs: 100,
      fetchImpl: async () => new Response(new ReadableStream()),
    });
    const pending = expect(request("https://source.test/rest/v1/projects")).rejects.toThrow(
      /timed out/i,
    );
    await vi.advanceTimersByTimeAsync(101);
    await pending;
  });

  it("backs off transport failures briefly, probes recovery and never caches results", async () => {
    vi.useFakeTimers();
    const transport = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(new Response("first live"))
      .mockResolvedValueOnce(new Response("fresh live"));
    const request = createBoundedFetch({ timeoutMs: 100, backoffMs: 500, fetchImpl: transport });
    await expect(request("https://source.test/a")).rejects.toThrow();
    await expect(request("https://source.test/b")).rejects.toThrow();
    expect(transport).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(501);
    expect(await (await request("https://source.test/a")).text()).toBe("first live");
    expect(await (await request("https://source.test/a")).text()).toBe("fresh live");
  });

  it("does not back off denials or retry a write", async () => {
    const transport = vi
      .fn<typeof fetch>()
      .mockImplementation(async () => new Response("denied", { status: 403 }));
    const request = createBoundedFetch({ fetchImpl: transport, backoffMs: 500 });
    expect((await request("https://source.test/a")).status).toBe(403);
    expect((await request("https://source.test/a")).status).toBe(403);
    transport.mockRejectedValue(new TypeError("fetch failed"));
    await expect(request("https://source.test/leads", { method: "POST" })).rejects.toThrow();
    expect(transport).toHaveBeenCalledTimes(3);
  });

  it("preserves caller cancellation", async () => {
    const controller = new AbortController();
    controller.abort();
    const transport = vi.fn<typeof fetch>();
    await expect(
      createBoundedFetch({ fetchImpl: transport })("https://source.test/a", {
        signal: controller.signal,
      }),
    ).rejects.toThrow();
    expect(transport).not.toHaveBeenCalled();
  });

  it("preserves mid-flight cancellation", async () => {
    const controller = new AbortController();
    const request = createBoundedFetch({ fetchImpl: () => new Promise<Response>(() => {}) });
    const pending = expect(
      request("https://source.test/a", { signal: controller.signal }),
    ).rejects.toThrow("caller cancelled");
    controller.abort(new Error("caller cancelled"));
    await pending;
  });

  it("preserves null-body response status", async () => {
    const request = createBoundedFetch({
      fetchImpl: async () => new Response(null, { status: 204 }),
    });
    expect((await request("https://source.test/a")).status).toBe(204);
  });

  it("rejects oversized bodies without an unhandled stream-cancellation error", async () => {
    const request = createBoundedFetch({
      fetchImpl: async () =>
        new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(new Uint8Array(4 * 1024 * 1024 + 1));
            },
            cancel() {
              throw new Error("cancel rejected");
            },
          }),
        ),
    });
    await expect(request("https://source.test/a")).rejects.toThrow(/public data limit/);
  });
});

describe("service-worker freshness", () => {
  it("bypasses dynamic and authenticated GET requests and caches only static assets", async () => {
    const handlers: Record<string, (event: unknown) => void> = {};
    const respondWith = vi.fn();
    const read = vi.fn().mockResolvedValue(undefined);
    const write = vi.fn();
    const waitUntil = vi.fn();
    runInNewContext(readFileSync("public/sw.js", "utf8"), {
      self: {
        location: { origin: "https://site.test" },
        addEventListener: (name: string, fn: (e: unknown) => void) => {
          handlers[name] = fn;
        },
      },
      URL,
      Response,
      fetch: vi.fn().mockResolvedValue(new Response("asset")),
      caches: {
        match: read,
        open: vi.fn().mockResolvedValue({ put: write, keys: async () => [], delete: vi.fn() }),
      },
    });
    for (const path of ["/_serverFn/catalogue", "/admin/data", "/something-dynamic"]) {
      handlers["fetch"]?.({ request: new Request("https://site.test" + path), respondWith });
    }
    handlers["fetch"]?.({
      request: new Request("https://site.test/assets/app.js", {
        headers: { Authorization: "Bearer test" },
      }),
      respondWith,
    });
    expect(respondWith).not.toHaveBeenCalled();
    handlers["fetch"]?.({
      request: new Request("https://site.test/assets/app.js"),
      respondWith,
      waitUntil,
    });
    expect(respondWith).toHaveBeenCalledOnce();
    const response = await respondWith.mock.calls[0]![0];
    expect(await response.text()).toBe("asset");
    await Promise.all(waitUntil.mock.calls.map(([promise]) => promise));
    expect(write).toHaveBeenCalledOnce();
  });
});
