import "dotenv/config";
import { fetchPublicProjects } from "./src/lib/public-data.server";
import fs from "fs";

async function run() {
  const projects = await fetchPublicProjects("en");
  const map = {};
  for (const p of projects) {
    map[p.slug] = p.capability_slugs;
  }
  fs.writeFileSync("scratch/project_sectors.json", JSON.stringify(map, null, 2));
  console.log("Done fetching " + Object.keys(map).length + " projects.");
}
run();
