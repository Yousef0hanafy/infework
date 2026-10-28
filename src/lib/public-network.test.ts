import { afterEach, expect, it, vi } from "vitest";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it("uses the real Supabase SDK without retry delays during an outage", async () => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.stubEnv("SUPABASE_URL", "https://source.test");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
  const transport = vi.fn().mockRejectedValue(new TypeError("fetch failed"));
  vi.stubGlobal("fetch", transport);
  const { fetchPublicProjects } = await import("./public-data.server");
  let resolved = false;
  const result = fetchPublicProjects("en").then((rows) => {
    resolved = true;
    return rows;
  });
  await vi.advanceTimersByTimeAsync(2100);
  expect(resolved).toBe(true);
  expect((await result).every((row) => row.catalogue_snapshot_date)).toBe(true);
  expect(transport).toHaveBeenCalledOnce();
});

it.each(["timeout", "server", "backoff", "denied"])(
  "handles %s through the actual SDK boundary",
  async (mode) => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.stubEnv("SUPABASE_URL", "https://source.test");
    vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    const transport = vi
      .fn()
      .mockImplementation(() =>
        mode === "timeout"
          ? new Promise<Response>(() => {})
          : mode === "server"
            ? Promise.resolve(new Response("unavailable", { status: 503 }))
            : mode === "denied"
              ? Promise.resolve(
                  Response.json({ code: "42501", message: "permission denied" }, { status: 403 }),
                )
              : Promise.reject(new TypeError("fetch failed")),
      );
    vi.stubGlobal("fetch", transport);
    const { fetchPublicProjects } = await import("./public-data.server");
    const result = fetchPublicProjects("en").then(
      (rows) => ({ rows, error: null }),
      (error) => ({ rows: null, error }),
    );
    await vi.advanceTimersByTimeAsync(2100);
    const outcome = await result;
    if (mode === "denied") expect(outcome.error).toBeInstanceOf(Error);
    else
      expect(outcome.rows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ catalogue_snapshot_date: "2026-10-18" }),
        ]),
      );
    if (mode === "backoff") {
      await expect(fetchPublicProjects("en")).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ catalogue_snapshot_date: "2026-10-18" }),
        ]),
      );
      expect(transport).toHaveBeenCalledOnce();
    }
  },
);
