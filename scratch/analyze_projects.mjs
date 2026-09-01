import fs from "fs";

// Let's analyze all projects in supabase_projects.json vs disk
const dbProjects = JSON.parse(fs.readFileSync("supabase_projects.json", "utf-8"));
const uniqueDbSlugs = Array.from(new Set(dbProjects.map((p) => p.slug)));

console.log("Total unique DB projects published:", uniqueDbSlugs.length);

// Check disk images
const diskProjects = fs.readdirSync("public/images/projects");
console.log("Total project folders on disk in public/images/projects:", diskProjects.length);

// Check if any slug in DB is missing from disk
const missingFromDisk = uniqueDbSlugs.filter((s) => !diskProjects.includes(s));
console.log("DB slugs missing from public/images/projects:", missingFromDisk);

// Check if any disk folder is not in DB
const diskNotInDb = diskProjects.filter((s) => !uniqueDbSlugs.includes(s));
console.log("Disk folders not in DB (published):", diskNotInDb);

// Read all_images_manifest if present
if (fs.existsSync("all_images_manifest.json")) {
  const manifest = JSON.parse(fs.readFileSync("all_images_manifest.json", "utf-8"));
  console.log("all_images_manifest keys count:", Object.keys(manifest).length);
}

// Check project_inventory_master.json if present
if (fs.existsSync("project_inventory_master.json")) {
  const inv = JSON.parse(fs.readFileSync("project_inventory_master.json", "utf-8"));
  console.log("project_inventory_master item count:", inv.length);
}
