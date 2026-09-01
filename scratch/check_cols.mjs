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
async function run() {
  const { data, error } = await supabase.from("leads").select("*").limit(1);
  console.log("Data:", data);
  console.log("Error:", error);
}
run();
