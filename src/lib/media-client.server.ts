import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { createBoundedFetch } from "./upstream-fetch.server";

export function isMediaSigningConfigured(): boolean {
  return Boolean(process.env["SUPABASE_URL"] && process.env["SUPABASE_SERVICE_ROLE_KEY"]);
}

/** Project-owned signing adapter; generated Supabase integrations remain unchanged. */
export function getMediaSigningClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) throw new Error("Media signing is not configured.");
  const boundedFetch = createBoundedFetch({ timeoutMs: 2000 });
  return createClient<Database>(url, key, {
    db: { retry: false },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
          headers.delete("Authorization");
        headers.set("apikey", key);
        return boundedFetch(input, { ...init, headers });
      },
    },
  });
}
