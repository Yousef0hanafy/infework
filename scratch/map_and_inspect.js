import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cnmuvufxndpiqgqwkkzr.supabase.co";
const supabaseKey = "sb_publishable_1i2gdC4GdA6puNs6Ajm77w_EU393GBK";
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  // 1. Get 43 published projects
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching projects:", error);
    return;
  }

  console.log("Project columns:", Object.keys(projects[0] || {}));
  console.log(`Fetched ${projects.length} published projects from Supabase.`);

  // 2. Read manifest
  const manifest = JSON.parse(fs.readFileSync("all_images_manifest.json", "utf8"));
  console.log(`Manifest has ${manifest.projects.length} folders in zip.`);

  // 3. Read project inventory master if available
  let inventory = [];
  if (fs.existsSync("project_inventory_master.json")) {
    inventory = JSON.parse(fs.readFileSync("project_inventory_master.json", "utf8"));
    console.log(`Inventory master has ${inventory.length} entries.`);
  }

  // 4. Output all project slugs vs inventory / manifest
  const summary = projects.map((p) => {
    const inv = inventory.find((i) => i.slug === p.slug || (i.kb_id && p.slug.includes(i.kb_id)));
    return {
      ...p,
      inventoryFolder: inv?.image_source_folder || null,
      inventoryImgCount: inv?.images_count || 0,
    };
  });

  fs.writeFileSync(
    "scratch/projects_summary.json",
    JSON.stringify(
      {
        projects: summary,
        manifestProjects: manifest.projects.map((mp) => ({
          folder: mp.project,
          imageCount: mp.images.length,
          sampleImages: mp.images.slice(0, 3).map((i) => i.file),
        })),
      },
      null,
      2,
    ),
  );

  console.log("Saved scratch/projects_summary.json");
}

inspect();
