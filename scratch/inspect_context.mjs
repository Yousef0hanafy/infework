import fs from "fs";
import path from "path";

const mappingPath = path.resolve("scratch/full_project_mapping_context.json");
if (fs.existsSync(mappingPath)) {
  const data = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
  console.log("Projects in mapping context:", data.length || Object.keys(data).length);

  const slugsToCheck = [
    "qabs-min-nour-mosque",
    "rafah-bedouin-housing",
    "sisi-city-wastewater",
    "salam-city-cattle-farm-networks",
    "salam-city-water-pipeline",
    "ameriya-cold-storage",
  ];

  for (const slug of slugsToCheck) {
    const item = Array.isArray(data) ? data.find((p) => p.slug === slug) : data[slug];
    console.log(`\n=== ${slug} ===`);
    console.log(JSON.stringify(item, null, 2));
  }
} else {
  console.log("File not found");
}
