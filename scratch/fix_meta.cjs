const fs = require("fs");
const stats = require("./curated_portfolio_stats.json");

let content = fs.readFileSync("src/lib/project-meta.ts", "utf-8");

// First, make the fields optional in the type definition
content = content.replace(
  `export type ProjectMeta = {
  cover: string;
  gallery: string[];
  capacity: Bi;
  client: Bi;
  consultant: Bi | null;
  scope: Bi;
  year: string;
  region: Bi;
};`,
  `export type ProjectMeta = {
  cover: string;
  gallery: string[];
  capacity?: Bi;
  client?: Bi;
  consultant?: Bi | null;
  scope?: Bi;
  year?: string;
  region?: Bi;
};`,
);

// We need to inject the 35 missing projects into PROJECT_META.
// Let's find where PROJECT_META ends.
const endOfObj = content.lastIndexOf("};");

let additions = "";

const existingSlugs = [
  "sadat-city-ro",
  "toshka-pumping-stations",
  "arish-water-supply",
  "food-city-treatment",
  "awlad-el-sheikh-pumping",
  "north-coast-desalination",
  "ameriya-cold-storage",
  "east-delta-wastewater",
];

for (const [slug, stat] of Object.entries(stats)) {
  const galleryStr = stat.gallery.map((g) => `      "${g}"`).join(",\n");

  if (existingSlugs.includes(slug)) {
    // Update existing project's cover and gallery
    // We match the specific block for this slug.
    const regex = new RegExp(`("${slug}"|${slug}):\\s*\\{[\\s\\S]*?capacity:`, "m");
    content = content.replace(
      regex,
      `"${slug}": {
    cover: "${stat.cover}",
    gallery: [
${galleryStr}
    ],
    capacity:`,
    );
  } else {
    // Add new project
    additions += `  "${slug}": {
    cover: "${stat.cover}",
    gallery: [
${galleryStr}
    ]
  },\n`;
  }
}

// Inject additions before the last '};'
content = content.substring(0, endOfObj) + additions + content.substring(endOfObj);

fs.writeFileSync("src/lib/project-meta.ts", content);
console.log("Successfully updated src/lib/project-meta.ts");
