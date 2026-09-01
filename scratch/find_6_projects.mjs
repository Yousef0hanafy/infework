import fs from "fs";
import path from "path";

const mappingPath = path.resolve("scratch/full_project_mapping_context.json");
const data = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
const projects = data.projects || [];

const slugsToCheck = [
  "qabs-min-nour-mosque",
  "rafah-bedouin-housing",
  "sisi-city-wastewater",
  "salam-city-cattle-farm-networks",
  "salam-city-water-pipeline",
  "ameriya-cold-storage",
];

for (const slug of slugsToCheck) {
  const item = projects.find((p) => p.slug === slug);
  console.log(`\n=== ${slug} ===`);
  console.log(JSON.stringify(item, null, 2));
}
