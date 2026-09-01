import fs from "fs";
import path from "path";

const metaFilePath = path.resolve("src/lib/project-meta.ts");
const content = fs.readFileSync(metaFilePath, "utf8");

// Extract object entries from PROJECT_META = { ... }
const projectBlocks = content.split(/\n\s*"([a-z0-9-]+)":\s*\{/g);

console.log(`Total chunks: ${projectBlocks.length}`);
const projects = [];

for (let i = 1; i < projectBlocks.length; i += 2) {
  const slug = projectBlocks[i];
  const block = projectBlocks[i + 1];

  const hasClient = /client:\s*\{/.test(block);
  const hasConsultant = /consultant:\s*\{/.test(block);
  const hasCapacity = /capacity:\s*\{/.test(block);
  const hasScope = /scope:\s*\{/.test(block);
  const hasYear = /year:\s*"/.test(block);
  const hasRegion = /region:\s*\{/.test(block);

  const missing = [];
  if (!hasClient) missing.push("client");
  if (!hasConsultant) missing.push("consultant");
  if (!hasCapacity) missing.push("capacity");
  if (!hasScope) missing.push("scope");
  if (!hasYear) missing.push("year");
  if (!hasRegion) missing.push("region");

  projects.push({
    slug,
    missing,
    hasClient,
    hasConsultant,
    hasCapacity,
    hasScope,
    hasYear,
    hasRegion,
  });
}

console.log(`Total projects parsed: ${projects.length}`);
const incomplete = projects.filter((p) => p.missing.length > 0);
console.log(`\nFound ${incomplete.length} projects with missing fields in project-meta.ts:`);
for (const item of incomplete) {
  console.log(`- ${item.slug}: missing [${item.missing.join(", ")}]`);
}
