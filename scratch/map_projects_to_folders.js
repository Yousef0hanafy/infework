import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cnmuvufxndpiqgqwkkzr.supabase.co";
const supabaseKey = "sb_publishable_1i2gdC4GdA6puNs6Ajm77w_EU393GBK";
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // 1. Fetch 43 published projects with EN and AR titles
  const { data: enProjects } = await supabase
    .from("vw_public_projects")
    .select("project_id, slug, locale, title, challenge, outcome, created_at")
    .eq("locale", "en");

  const { data: arProjects } = await supabase
    .from("vw_public_projects")
    .select("project_id, slug, locale, title, challenge, outcome, created_at")
    .eq("locale", "ar");

  const manifest = JSON.parse(fs.readFileSync("all_images_manifest.json", "utf8"));
  const inventory = JSON.parse(fs.readFileSync("project_inventory_master.json", "utf8"));

  const zipFolders = manifest.projects.map((p) => ({
    folder: p.project,
    count: p.images.length,
    images: p.images,
  }));

  const projects = (enProjects || []).map((en) => {
    const ar = (arProjects || []).find((a) => a.project_id === en.project_id);
    const inv = inventory.find((i) => i.slug === en.slug || (i.kb_id && en.slug.includes(i.kb_id)));
    return {
      id: en.project_id,
      slug: en.slug,
      title_en: en.title,
      title_ar: ar?.title || "",
      challenge_en: en.challenge,
      challenge_ar: ar?.challenge,
      inv_folder: inv?.image_source_folder || null,
      inv_images_count: inv?.images_count || 0,
      inv_kb_id: inv?.kb_id || null,
    };
  });

  console.log(`Total projects fetched: ${projects.length}`);
  console.log(`Total zip folders: ${zipFolders.length}`);

  // Output details for each project to assist mapping
  fs.writeFileSync(
    "scratch/full_project_mapping_context.json",
    JSON.stringify(
      {
        projects,
        zipFolders,
      },
      null,
      2,
    ),
  );

  console.log("Saved to scratch/full_project_mapping_context.json");
}

run();
