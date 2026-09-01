import fs from "fs";
import path from "path";

const data = JSON.parse(fs.readFileSync("scratch/full_project_mapping_context.json", "utf8"));
const { projects, zipFolders } = data;

// Also inspect existing public/images/projects to see what was extracted
const publicProjDir = "public/images/projects";
const existingFolders = fs.readdirSync(publicProjDir);

console.log(`Existing folders in public/images/projects: ${existingFolders.length}`);

// Let's create a detailed matching algorithm and manual verification table
const results = [];

// Folders with non-zero images in zip:
const activeZipFolders = zipFolders.filter((zf) => zf.count > 0);
console.log(`Zip folders with images > 0: ${activeZipFolders.length}`);
activeZipFolders.forEach((zf) => {
  console.log(`  - [${zf.count} imgs] ${zf.folder}`);
});

// Let's do a deep match for all 43 projects
for (const p of projects) {
  // Candidate matches:
  const candidates = [];

  for (const zf of zipFolders) {
    let score = 0;
    const folderClean = zf.folder.toLowerCase();
    const titleArClean = p.title_ar.toLowerCase();
    const slugClean = p.slug.toLowerCase();

    // Check inventory folder match
    if (p.inv_folder && zf.folder === p.inv_folder) {
      score += 100;
    }

    // Check slug keywords
    if (
      slugClean.includes("sadat") &&
      (folderClean.includes("سادات") || folderClean.includes("السادات"))
    )
      score += 50;
    if (
      slugClean.includes("toshka") &&
      (folderClean.includes("توشك") || folderClean.includes("توشكي"))
    )
      score += 50;
    if (
      slugClean.includes("arish") &&
      (folderClean.includes("عريش") || folderClean.includes("العريش"))
    )
      score += 50;
    if (
      slugClean.includes("awlad-el-sheikh") &&
      (folderClean.includes("اولاد الشيخ") || folderClean.includes("أولاد الشيخ"))
    )
      score += 50;
    if (
      slugClean.includes("north-coast") &&
      (folderClean.includes("الساحل الشمالى") || folderClean.includes("الحمام"))
    )
      score += 50;
    if (
      slugClean.includes("sisi-city") &&
      (folderClean.includes("مدينة السيسى") || folderClean.includes("السيسي"))
    )
      score += 50;
    if (
      slugClean.includes("rafah") &&
      (folderClean.includes("رفح") || folderClean.includes("البدوية"))
    )
      score += 50;
    if (slugClean.includes("qabs-min-nour") && folderClean.includes("قبس من نور")) score += 50;
    if (
      slugClean.includes("salam-city") &&
      (folderClean.includes("مدينة السلام") || folderClean.includes("مزرعة الابقار"))
    )
      score += 50;
    if (
      slugClean.includes("ameriya") &&
      (folderClean.includes("العامريه") || folderClean.includes("العامرية"))
    )
      score += 50;
    if (
      slugClean.includes("food-city") &&
      (folderClean.includes("المدينة الغذائية") || folderClean.includes("حلابات"))
    )
      score += 50;
    if (
      slugClean.includes("maged-kedwani") &&
      (folderClean.includes("maged kedwani") || folderClean.includes("ماجد الكدواني"))
    )
      score += 50;

    // Check Arabic title word overlap
    const arWords = titleArClean
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["مشروع", "أعمال", "إنشاء", "محطة", "محطات"].includes(w));
    for (const w of arWords) {
      if (folderClean.includes(w)) {
        score += 15;
      }
    }

    if (score > 0) {
      candidates.push({ folder: zf.folder, count: zf.count, score });
    }
  }

  candidates.sort((a, b) => b.score - a.score || b.count - a.count);

  results.push({
    slug: p.slug,
    title_en: p.title_en,
    title_ar: p.title_ar,
    bestCandidate: candidates[0] || null,
    allCandidates: candidates.slice(0, 3),
  });
}

fs.writeFileSync("scratch/project_matching_analysis.json", JSON.stringify(results, null, 2));
console.log("\nWrote scratch/project_matching_analysis.json");
