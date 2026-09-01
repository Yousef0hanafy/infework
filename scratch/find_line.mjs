import fs from "fs";
import path from "path";

const metaFilePath = path.resolve("src/lib/project-meta.ts");
const lines = fs.readFileSync(metaFilePath, "utf8").split("\n");

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("salam-city")) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
