import fs from "fs";
import path from "path";

const data = JSON.parse(fs.readFileSync("scratch/full_project_mapping_context.json", "utf8"));
const { projects, zipFolders } = data;

// Let's analyze every project and map it
console.log(`Analyzing ${projects.length} projects...`);

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  console.log(`\n[${i + 1}] Slug: ${p.slug}`);
  console.log(`    EN: ${p.title_en}`);
  console.log(`    AR: ${p.title_ar}`);
  console.log(`    Inv Folder: ${p.inv_folder}`);
}
