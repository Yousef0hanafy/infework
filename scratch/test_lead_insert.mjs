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

async function testLeadInsert() {
  console.log("--- Testing Lead Insertion with Form Values ---");

  // Test 1: state + turnkey (Valid per DB schema)
  const res1 = await supabase.from("leads").insert({
    audience_type: "state",
    need_type: "turnkey",
    location_text: "Cairo",
    email: "test@example.com",
    message: "Test message 1",
    status: "new",
  });
  console.log("Test 1 (state, turnkey): error =", res1.error?.message ?? "None (SUCCESS)");

  // Test 2: developer + water-treatment (Form values selectable in UI)
  const res2 = await supabase.from("leads").insert({
    audience_type: "developer",
    need_type: "water-treatment",
    location_text: "Cairo",
    email: "test@example.com",
    message: "Test message 2",
    status: "new",
  });
  console.log(
    "Test 2 (developer, water-treatment - UI choices): error =",
    res2.error?.message ?? "None (SUCCESS)",
  );

  // Test 3: general inquiry (inquiry_type = 'general', need_type = 'general')
  const res3 = await supabase.from("leads").insert({
    audience_type: "other",
    need_type: "general",
    location_text: "Cairo",
    email: "test@example.com",
    message: "Test message 3",
    status: "new",
  });
  console.log("Test 3 (need_type: general): error =", res3.error?.message ?? "None (SUCCESS)");
}

testLeadInsert().catch(console.error);
