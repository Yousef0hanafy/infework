import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
});

const supabaseUrl = envVars["VITE_SUPABASE_URL"];
const supabaseKey = envVars["VITE_SUPABASE_PUBLISHABLE_KEY"];
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // 1. Fetch 43 published projects
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, slug, status")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching projects:", error);
    return;
  }
  console.log(`Found ${projects.length} published projects.`);

  // 2. Parse project-meta.ts
  const metaPath = path.resolve("src/lib/project-meta.ts");
  const metaContent = fs.readFileSync(metaPath, "utf8");

  // Extract PROJECT_META object string roughly
  const match = metaContent.match(
    /export const PROJECT_META: Record<string, ProjectMeta> = (\{[\s\S]*?\n\});/,
  );
  let projectMeta = {};
  if (match) {
    // We'll use a hack to parse it since it's JS object literal notation, not JSON
    // Replacing single quotes with double quotes, removing trailing commas
    const objStr = match[1];
    // To safely parse JS object, we can use Function
    try {
      projectMeta = new Function("return " + objStr)();
    } catch (e) {
      console.error("Error parsing PROJECT_META:", e);
    }
  }

  // 3. Inspect public/images/projects/
  const imagesBaseDir = path.resolve("public/images/projects");
  let allFolders = [];
  try {
    allFolders = fs
      .readdirSync(imagesBaseDir)
      .filter((f) => fs.statSync(path.join(imagesBaseDir, f)).isDirectory());
  } catch (e) {
    console.error("Error reading images dir:", e);
  }

  const report = {
    underUtilized: [],
    missingFolders: [],
    coverReuse: [],
    coverInGallery: [],
    missingMeta: [],
    noGallery: [],
  };

  const imageUsageCount = {};

  for (const p of projects) {
    const slug = p.slug;
    const meta = projectMeta[slug];

    if (!meta) {
      report.missingMeta.push(slug);
      continue;
    }

    const folderPath = path.join(imagesBaseDir, slug);
    let availableImages = [];
    if (fs.existsSync(folderPath)) {
      availableImages = fs
        .readdirSync(folderPath)
        .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
    } else {
      report.missingFolders.push(slug);
    }

    const cover = meta.cover;
    const gallery = meta.gallery || [];

    // Track usage
    if (cover) {
      imageUsageCount[cover] = (imageUsageCount[cover] || 0) + 1;
    }
    for (const img of gallery) {
      imageUsageCount[img] = (imageUsageCount[img] || 0) + 1;
    }

    // Check cover == gallery
    if (cover && gallery.includes(cover)) {
      report.coverInGallery.push({ slug, cover });
    }

    // Check utilization
    if (availableImages.length > gallery.length) {
      report.underUtilized.push({
        slug,
        usedGallery: gallery.length,
        available: availableImages.length,
        availableImages,
        usedCover: cover,
      });
    }

    if (gallery.length === 0) {
      report.noGallery.push({ slug, available: availableImages.length });
    }
  }

  for (const [img, count] of Object.entries(imageUsageCount)) {
    if (count > 1) {
      report.coverReuse.push({ image: img, count });
    }
  }

  console.log("\n--- AUDIT RESULTS ---\n");
  console.log(`Under-utilized Galleries: ${report.underUtilized.length}`);
  report.underUtilized.forEach((u) => {
    console.log(`  - ${u.slug}: ${u.usedGallery} used vs ${u.available} available in folder`);
  });

  console.log(`\nReused Images (Cover/Gallery across projects): ${report.coverReuse.length}`);
  report.coverReuse.forEach((r) => {
    console.log(`  - ${r.image}: used ${r.count} times`);
  });

  console.log(`\nCover Image also in Gallery: ${report.coverInGallery.length}`);
  report.coverInGallery.forEach((c) => {
    console.log(`  - ${c.slug}: ${c.cover}`);
  });

  console.log(`\nMissing Image Folders: ${report.missingFolders.length}`);
  console.log(`Missing Meta Entries: ${report.missingMeta.length}`);
  console.log(`No Gallery Defined: ${report.noGallery.length}`);

  fs.writeFileSync("scratch/image_audit_report.json", JSON.stringify(report, null, 2));
  console.log("\nDetailed report saved to scratch/image_audit_report.json");
}

run();
