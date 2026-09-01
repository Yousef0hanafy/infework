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

async function testLeadInsert() {
  console.log("--- Testing Payload Mapper Logic ---");

  const payload = {
    inquiry_type: "technical",
    name: "John Doe",
    email: "john@example.com",
    organization: "Global Real Estate Corp",
    phone: "+201012345678",
    capacity: "10000 m3/day",
    supplier_category: "",
    website: "https://example.com",
    audience_type: "developer",
    need_type: "water-treatment",
    location_text: "New Cairo",
    message: "We need a complete water treatment solution for our new compound.",
  };

  const metaHeaders = [
    payload.inquiry_type ? `[Type: ${payload.inquiry_type.toUpperCase()}]` : "",
    payload.name ? `[Name: ${payload.name}]` : "",
    payload.organization ? `[Org: ${payload.organization}]` : "",
    payload.phone ? `[Phone: ${payload.phone}]` : "",
    payload.capacity ? `[Capacity: ${payload.capacity}]` : "",
    payload.supplier_category ? `[Supplier Category: ${payload.supplier_category}]` : "",
    payload.website ? `[Link: ${payload.website}]` : "",
    payload.audience_type && payload.audience_type !== "other"
      ? `[Audience: ${payload.audience_type}]`
      : "",
    payload.need_type && payload.need_type !== "other" ? `[Scope: ${payload.need_type}]` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const fullMessage = metaHeaders ? `${metaHeaders}\n\n${payload.message}` : payload.message;

  const validAudiences = ["state", "industrial", "agricultural", "other"];
  const rawAudience = payload.audience_type || payload.inquiry_type || "other";
  const dbAudience = validAudiences.includes(rawAudience) ? rawAudience : "other";

  const validNeeds = ["design", "execution", "om", "turnkey", "other"];
  const rawNeed = payload.need_type || payload.inquiry_type || "other";
  const dbNeed = validNeeds.includes(rawNeed) ? rawNeed : "other";

  console.log("Mapped Audience:", dbAudience);
  console.log("Mapped Need:", dbNeed);
  console.log("Full Message:\n" + fullMessage);

  const { data, error } = await client
    .from("leads")
    .insert({
      audience_type: dbAudience,
      need_type: dbNeed,
      location_text: payload.location_text || null,
      email: payload.email,
      message: fullMessage,
      status: "new",
    })
    .select();

  console.log("Insert Error:", error?.message || "None");
  if (data && data.length > 0) {
    console.log("Successfully inserted record ID:", data[0].id);
  }
}

testLeadInsert().catch(console.error);
