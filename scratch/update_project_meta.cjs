const fs = require("fs");
const stats = require("./curated_portfolio_stats.json");

let content = fs.readFileSync("src/lib/project-meta.ts", "utf-8");

for (const [slug, stat] of Object.entries(stats)) {
  const pattern = new RegExp(
    `("${slug}"|${slug}):\\s*\\{\\s*(?:cover:\\s*".*?",\\s*)?gallery:\\s*\\[[^\\]]*\\],?\\s*(capacity:)`,
  );

  const galleryStr = stat.gallery.map((g) => `      "${g}"`).join(",\n");

  const replacement = `$1: {
    cover: "${stat.cover}",
    gallery: [
${galleryStr}
    ],
    $2`;

  content = content.replace(pattern, replacement);
}

fs.writeFileSync("src/lib/project-meta.ts", content);
console.log("Updated src/lib/project-meta.ts");
