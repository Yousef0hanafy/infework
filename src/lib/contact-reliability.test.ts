import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./contact.functions";

const db = vi.hoisted(() => ({ insert: vi.fn() }));
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({ validator: () => ({ handler: (fn: unknown) => fn }) }),
}));
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({ from: () => ({ insert: db.insert }) }),
}));
const valid = {
  inquiry_type: "general" as const,
  name: "Site visitor",
  phone: "+201000000000",
  email: "visitor@example.test",
  message: "Please contact us about the engineering scope.",
  consent: true as const,
};
beforeEach(() => {
  db.insert.mockReset();
  vi.stubEnv("SUPABASE_URL", "https://test.example");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});
describe("enquiry acceptance", () => {
  it("never reports receipt or logs private fields if the backend is unconfigured", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    const log = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect((await submitContact({ data: valid })).success).toBe(false);
    expect(db.insert).not.toHaveBeenCalled();
    expect(JSON.stringify(log.mock.calls)).not.toContain(valid.email);
  });
  it("accepts only after durable storage succeeds", async () => {
    db.insert.mockResolvedValue({ error: null });
    expect((await submitContact({ data: valid })).success).toBe(true);
    expect(db.insert).toHaveBeenCalledOnce();
    db.insert.mockResolvedValue({ error: { message: "upstream unavailable" } });
    expect((await submitContact({ data: valid })).success).toBe(false);
  });
  it("enforces required name and phone on the server", async () => {
    db.insert.mockResolvedValue({ error: null });
    expect((await submitContact({ data: { ...valid, name: "", phone: "" } })).success).toBe(false);
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("silently discards a filled honeypot without processing it", async () => {
    expect((await submitContact({ data: { ...valid, honeypot: "bot" } })).success).toBe(true);
    expect(db.insert).not.toHaveBeenCalled();
  });
});
