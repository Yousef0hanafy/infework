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
const client = createClient(env["SUPABASE_URL"], env["SUPABASE_PUBLISHABLE_KEY"]);

async function simulateMapper(payload) {
  const audienceMap = {
    state: "state",
    industrial: "industrial",
    agricultural: "agricultural",
    developer: "other",
    contractor: "other",
    other: "other",
    general: "other",
    supplier: "other",
    technical: "other",
  };
  const rawAudience = payload.audience_type || payload.inquiry_type || "other";
  const dbAudience = audienceMap[rawAudience];
  if (!dbAudience) return { success: false, message: "Invalid client type selected." };

  const needMap = {
    turnkey: "turnkey",
    "water-treatment": "other",
    wastewater: "other",
    pumping: "other",
    networks: "other",
    mep: "other",
    om: "om",
    design: "design",
    other: "other",
    general: "other",
    supplier: "other",
    technical: "other",
  };
  const rawNeed = payload.need_type || payload.inquiry_type || "other";
  const dbNeed = needMap[rawNeed];
  if (!dbNeed) return { success: false, message: "Invalid project scope selected." };

  return { success: true, dbAudience, dbNeed };
}

async function runTests() {
  console.log("--- Testing Explicit Payload Mapper ---");

  // Test 1: Valid mapping
  const res1 = await simulateMapper({ audience_type: "developer", need_type: "water-treatment" });
  console.log("Test 1 (developer, water-treatment):", res1);

  // Test 2: Valid fallback
  const res2 = await simulateMapper({ inquiry_type: "technical" });
  console.log("Test 2 (technical):", res2);

  // Test 3: Invalid UI value injected by malicious user
  const res3 = await simulateMapper({ audience_type: "hacker", need_type: "design" });
  console.log("Test 3 (hacker, design):", res3);

  // Test 4: Another invalid
  const res4 = await simulateMapper({ audience_type: "state", need_type: "DROP TABLE leads" });
  console.log("Test 4 (state, injection):", res4);
}

runTests().catch(console.error);
