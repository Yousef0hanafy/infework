import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from "ts-morph";
import * as fs from "fs";

// Load the JSON data
const data = JSON.parse(fs.readFileSync("full_batch_projects_data.json", "utf-8"));

// Initialize ts-morph project
const project = new Project();
const sourceFile = project.addSourceFileAtPath("src/lib/project-meta.ts");

// Get the PROJECT_META variable declaration
const projectMetaVar = sourceFile.getVariableDeclarationOrThrow("PROJECT_META");
const initializer = projectMetaVar.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);

let updatedCount = 0;

// Iterate over each property (project slug) in PROJECT_META
for (const prop of initializer.getProperties()) {
  if (prop.isKind(SyntaxKind.PropertyAssignment)) {
    const slug = prop.getName().replace(/['"]/g, "");
    const objLiteral = prop.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);

    if (objLiteral) {
      // Check if it already has 'capacity' or 'client'
      const hasCapacity = objLiteral.getProperty("capacity");
      const hasClient = objLiteral.getProperty("client");

      if (!hasCapacity && !hasClient) {
        // Find the project in JSON
        const projectData = data.projects.find((p: any) => p.slug === slug);
        if (projectData && projectData.meta) {
          const m = projectData.meta;

          // Add properties
          if (m.capacity)
            objLiteral.addPropertyAssignment({
              name: "capacity",
              initializer: `{ en: ${JSON.stringify(m.capacity.en)}, ar: ${JSON.stringify(m.capacity.ar)} }`,
            });
          if (m.client)
            objLiteral.addPropertyAssignment({
              name: "client",
              initializer: `{ en: ${JSON.stringify(m.client.en)}, ar: ${JSON.stringify(m.client.ar)} }`,
            });
          if (m.consultant)
            objLiteral.addPropertyAssignment({
              name: "consultant",
              initializer: `{ en: ${JSON.stringify(m.consultant.en)}, ar: ${JSON.stringify(m.consultant.ar)} }`,
            });
          if (m.scope)
            objLiteral.addPropertyAssignment({
              name: "scope",
              initializer: `{ en: ${JSON.stringify(m.scope.en)}, ar: ${JSON.stringify(m.scope.ar)} }`,
            });
          if (m.year)
            objLiteral.addPropertyAssignment({ name: "year", initializer: JSON.stringify(m.year) });
          if (m.region)
            objLiteral.addPropertyAssignment({
              name: "region",
              initializer: `{ en: ${JSON.stringify(m.region.en)}, ar: ${JSON.stringify(m.region.ar)} }`,
            });

          updatedCount++;
        }
      }
    }
  }
}

// Save the file
sourceFile.saveSync();
console.log(`Updated ${updatedCount} projects.`);
