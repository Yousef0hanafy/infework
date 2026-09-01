import fs from "fs";
import path from "path";

// Read project-meta.ts
const metaFilePath = path.resolve("src/lib/project-meta.ts");
const content = fs.readFileSync(metaFilePath, "utf8");

// Load PROJECT_META by dynamic import or parsing
async function checkMeta() {
  const { PROJECT_META } = await import("../src/lib/project-meta.ts");

  const entries = Object.entries(PROJECT_META);
  console.log(`Total projects in PROJECT_META: ${entries.length}`);

  const incomplete = [];

  for (const [slug, data] of entries) {
    const missing = [];
    if (!data.client) missing.push("client");
    if (!data.consultant) missing.push("consultant");
    if (!data.capacity) missing.push("capacity");
    if (!data.scope) missing.push("scope");
    if (!data.year) missing.push("year");
    if (!data.region) missing.push("region");

    if (missing.length > 0) {
      incomplete.push({ slug, missing, data });
    }
  }

  console.log(`\nFound ${incomplete.length} projects with incomplete metadata:`);
  for (const item of incomplete) {
    console.log(`- ${item.slug}: missing [${item.missing.join(", ")}]`);
  }
}

checkMeta();
