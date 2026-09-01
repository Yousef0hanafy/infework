import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envText = fs.readFileSync(".env", "utf-8");
const env = {};
for (const line of envText.split("\n")) {
  if (line.includes("=")) {
    const [k, v] = line.split("=");
    env[k.trim()] = v.trim().replace(/^["']|["']$/g, "");
  }
}

const supabase = createClient(env["SUPABASE_URL"], env["SUPABASE_PUBLISHABLE_KEY"]);

async function auditDb() {
  console.log("=== SUPABASE LIVE DATABASE AUDIT ===");

  const [pRes, profRes, locRes, capRes, pcRes, claimRes, setRes, leadRes] = await Promise.all([
    supabase.from("projects").select("id, slug, classification, status"),
    supabase.from("public_project_profiles").select("id, project_id, locale, title"),
    supabase.from("locations").select("id, project_id, lat, lng, display_name"),
    supabase.from("capabilities").select("id, slug, en_name, ar_name"),
    supabase.from("project_capabilities").select("project_id, capability_id"),
    supabase.from("claims").select("id, project_id, locale, content"),
    supabase.from("site_settings").select("key, value"),
    supabase.from("leads").select("id, status, audience_type, need_type, email"),
  ]);

  console.log("projects table rows:", pRes.data?.length, "error:", pRes.error?.message);
  console.log(
    "public_project_profiles rows:",
    profRes.data?.length,
    "error:",
    profRes.error?.message,
  );
  console.log("locations rows:", locRes.data?.length, "error:", locRes.error?.message);
  console.log("capabilities rows:", capRes.data?.length, "error:", capRes.error?.message);
  console.log("project_capabilities rows:", pcRes.data?.length, "error:", pcRes.error?.message);
  console.log("claims rows:", claimRes.data?.length, "error:", claimRes.error?.message);
  console.log("site_settings rows:", setRes.data?.length, "error:", setRes.error?.message);
  console.log("leads rows:", leadRes.data?.length, "error:", leadRes.error?.message);

  if (capRes.data) {
    console.log(
      "\nCapabilities in DB:",
      capRes.data.map((c) => `${c.slug} (${c.en_name})`),
    );
  }
}

auditDb().catch(console.error);
