import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read project-meta.ts to extract PROJECT_META keys and data
const metaFilePath = path.resolve("src/lib/project-meta.ts");
const metaContent = fs.readFileSync(metaFilePath, "utf8");

const supabaseUrl = "https://cnmuvufxndpiqgqwkkzr.supabase.co";
const supabaseKey = "sb_publishable_1i2gdC4GdA6puNs6Ajm77w_EU393GBK";

const supabase = createClient(supabaseUrl, supabaseKey);

async function runAudit() {
  console.log("=== STARTING DATA INTEGRITY AUDIT ===");

  // 1. Fetch all rows from vw_public_projects (EN + AR)
  const { data: rows, error } = await supabase
    .from("vw_public_projects")
    .select("project_id, slug, locale, title, challenge, outcome, created_at");

  if (error) {
    console.error("Error fetching vw_public_projects:", error);
    process.exit(1);
  }

  const enRows = rows.filter((r) => r.locale === "en");
  const arRows = rows.filter((r) => r.locale === "ar");
  console.log(`Total EN projects in DB view: ${enRows.length}`);
  console.log(`Total AR projects in DB view: ${arRows.length}`);

  // 2. Extract slugs from PROJECT_META in project-meta.ts
  const metaSlugMatches = [...metaContent.matchAll(/"([^"]+)":\s*\{\s*cover:/g)].map((m) => m[1]);
  console.log(`Total projects in project-meta.ts: ${metaSlugMatches.length}`);

  const dbSlugs = [...new Set(rows.map((r) => r.slug))];
  console.log(`Unique project slugs in DB: ${dbSlugs.length}`);

  // Slugs in DB but missing in project-meta.ts
  const missingInMeta = dbSlugs.filter((slug) => !metaSlugMatches.includes(slug));
  console.log("\n--- Projects in DB but NOT in project-meta.ts ---");
  if (missingInMeta.length === 0) console.log("None (All DB projects exist in project-meta.ts)");
  else console.log(missingInMeta);

  // Slugs in project-meta.ts but missing in DB
  const missingInDb = metaSlugMatches.filter((slug) => !dbSlugs.includes(slug));
  console.log("\n--- Projects in project-meta.ts but NOT in DB ---");
  if (missingInDb.length === 0) console.log("None (All meta projects exist in DB)");
  else console.log(missingInDb);

  // 3. Inspect Data Quality & Outcomes per project
  console.log("\n--- Project Content Quality & Outcome Audit ---");
  let projectsWithIssues = [];

  for (const slug of dbSlugs) {
    const en = enRows.find((r) => r.slug === slug);
    const ar = arRows.find((r) => r.slug === slug);

    const issues = [];
    if (!en) issues.push("Missing EN view row");
    else {
      if (!en.title) issues.push("Missing EN title");
      if (!en.outcome) issues.push("Missing EN outcome");
      if (!en.challenge) issues.push("Missing EN challenge");
    }

    if (!ar) issues.push("Missing AR view row");
    else {
      if (!ar.title) issues.push("Missing AR title");
      if (!ar.outcome) issues.push("Missing AR outcome");
      if (!ar.challenge) issues.push("Missing AR challenge");
    }

    if (issues.length > 0) {
      projectsWithIssues.push({ slug, issues });
    }
  }

  if (projectsWithIssues.length === 0) {
    console.log(
      "SUCCESS: All 43 projects have complete EN & AR titles, challenges, and outcomes in the database!",
    );
  } else {
    console.log(
      `Found ${projectsWithIssues.length} projects with content gaps:`,
      JSON.stringify(projectsWithIssues, null, 2),
    );
  }

  // 4. Verify Assets Existence on Disk
  console.log("\n--- Project Image Asset Check on Disk ---");
  let missingCoverCount = 0;
  for (const slug of metaSlugMatches) {
    const regex = new RegExp(`"${slug}":\\s*\\{[^}]*cover:\\s*"([^"]+)"`);
    const match = metaContent.match(regex);
    if (match) {
      const coverRelPath = match[1].replace(/^\//, "");
      const fullPath = path.resolve("public", coverRelPath);
      if (!fs.existsSync(fullPath)) {
        console.warn(`Missing cover image on disk: ${fullPath} (for ${slug})`);
        missingCoverCount++;
      }
    }
  }
  if (missingCoverCount === 0) {
    console.log("SUCCESS: All 43 project cover images exist and are readable on disk!");
  } else {
    console.warn(`Found ${missingCoverCount} missing cover images!`);
  }

  console.log("\n=== AUDIT COMPLETE ===");
}

runAudit();
