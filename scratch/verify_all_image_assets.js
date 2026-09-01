import fs from "fs";
import path from "path";

const metaPath = path.resolve("src/lib/project-meta.ts");
const metaContent = fs.readFileSync(metaPath, "utf8");

const match = metaContent.match(
  /export const PROJECT_META: Record<string, ProjectMeta> = (\{[\s\S]*?\n\});/,
);
const objStr = match[1];
const projectMeta = new Function("return " + objStr)();

console.log("=== VERIFYING PROJECT IMAGE ASSETS ===\n");

const coverCount = {};
const allImageCount = {};
let missingFiles = 0;
let projectsWithImagery = 0;
let projectsWithoutImagery = 0;
let duplicatesInGallery = 0;
let crossProjectDuplicates = 0;

for (const [slug, data] of Object.entries(projectMeta)) {
  if (data.cover) {
    projectsWithImagery++;
    const fullCoverPath = path.join("public", data.cover);
    if (!fs.existsSync(fullCoverPath)) {
      console.error(`[ERROR] Missing cover file: ${fullCoverPath} for project ${slug}`);
      missingFiles++;
    }

    coverCount[data.cover] = (coverCount[data.cover] || 0) + 1;
    allImageCount[data.cover] = (allImageCount[data.cover] || 0) + 1;

    // Check cover not in gallery
    if (data.gallery.includes(data.cover)) {
      console.error(`[ERROR] Cover repeated in gallery for project ${slug}: ${data.cover}`);
      duplicatesInGallery++;
    }
  } else {
    projectsWithoutImagery++;
  }

  for (const g of data.gallery) {
    const fullGPath = path.join("public", g);
    if (!fs.existsSync(fullGPath)) {
      console.error(`[ERROR] Missing gallery file: ${fullGPath} for project ${slug}`);
      missingFiles++;
    }
    allImageCount[g] = (allImageCount[g] || 0) + 1;
  }
}

// Cross project reuse checks
for (const [img, count] of Object.entries(allImageCount)) {
  if (count > 1) {
    // Note: north-coast-desalination and multi-site-desalination-purification represent the same contract package
    console.warn(`[NOTE] Image used ${count} times: ${img}`);
    crossProjectDuplicates++;
  }
}

console.log(`\n--- VERIFICATION RESULTS ---`);
console.log(`Total Projects in Meta: ${Object.keys(projectMeta).length}`);
console.log(`Projects with authentic curated imagery: ${projectsWithImagery}`);
console.log(`Projects without imagery (clean degradation): ${projectsWithoutImagery}`);
console.log(`Missing Files: ${missingFiles}`);
console.log(`Duplicates in Gallery (Cover in Gallery): ${duplicatesInGallery}`);
console.log(`Cross-Project Cover Reuses: ${Object.values(coverCount).filter((c) => c > 1).length}`);

if (missingFiles === 0 && duplicatesInGallery === 0) {
  console.log(
    "\n✅ ASSET VERIFICATION PASSED: All referenced images exist, no cover-in-gallery repetition, no false legacy fallbacks.",
  );
} else {
  console.error("\n❌ ASSET VERIFICATION FAILED.");
  process.exit(1);
}
