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
  const { data, error } = await supabase
    .from("vw_public_projects")
    .select("project_id, slug, title, locale");
  if (error) {
    console.error(error);
  } else {
    fs.writeFileSync("supabase_projects.json", JSON.stringify(data, null, 2));
    console.log("Success", data.length, "projects fetched.");
  }
}

run();
