import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import fs from "fs";

const supabaseUrl = "https://cnmuvufxndpiqgqwkkzr.supabase.co";
const supabaseKey = "sb_publishable_1i2gdC4GdA6puNs6Ajm77w_EU393GBK";
const supabase = createClient(supabaseUrl, supabaseKey);

const updatedCapabilities = [
  {
    slug: "water-treatment",
    en_name: "Water Treatment & Desalination",
    ar_name: "معالجة المياه والتحلية",
  },
  { slug: "wastewater", en_name: "Wastewater & Effluent", ar_name: "معالجة الصرف الصحي والصناعي" },
  {
    slug: "pumping-wells",
    en_name: "Pumping & Deep Wells",
    ar_name: "محطات الرفع والآبار العميقة",
    old_slug: "pumping",
  },
  {
    slug: "industrial-mep",
    en_name: "Industrial & Electromechanical",
    ar_name: "الأنظمة الصناعية والكهروميكانيكية",
    old_slug: "electrical-control",
  },
];

const newCapabilities = [
  {
    id: crypto.randomUUID(),
    slug: "infrastructure-networks",
    en_name: "Infrastructure Networks & Pipelines",
    ar_name: "شبكات المرافق وخطوط النقل",
  },
  {
    id: crypto.randomUUID(),
    slug: "civil-buildings",
    en_name: "Civil & Institutional Buildings",
    ar_name: "الأعمال المدنية والمباني الخدمية",
  },
];

const projectMappings = {
  "water-treatment": [
    "sadat-city-ro",
    "north-coast-desalination",
    "marble-factory-desalination-plants",
    "multi-site-desalination-purification",
    "future-of-egypt-potato-storage-softener",
    "qibili-qarun-water-purification",
    "toshka-farm-potable-water-plant",
    "infrastructure-sand-procurement",
  ],
  wastewater: [
    "food-city-treatment",
    "east-delta-wastewater",
    "dairy-effluent-treatment-network",
    "shubra-shahab-industrial-wastewater",
    "shubra-shahab-technical-works",
    "beni-suef-water-wastewater",
    "abu-zaabal-landfill-environmental-works",
  ],
  "pumping-wells": [
    "toshka-pumping-stations",
    "awlad-el-sheikh-pumping",
    "manshiyat-nasser-pumping-station",
    "toshka-reclamation-pumping-package",
    "toshka-pumping-basket-screens",
    "toshka-expanded-water-networks",
    "rural-egypt-wells-minya",
    "abu-minqar-agricultural-farm-utilities",
  ],
  "infrastructure-networks": [
    "arish-water-supply",
    "salam-city-water-pipeline",
    "sisi-city-water-supply-network",
    "sisi-city-wastewater",
    "nuweiba-infrastructure-works",
    "capital-island-infrastructure",
    "palm-hills-infrastructure-utilities",
    "bianchi-resort-infrastructure-utilities",
    "north-sinai-dc-infrastructure",
  ],
  "civil-buildings": [
    "qabs-min-nour-mosque",
    "al-azhar-institute-minya",
    "rafah-bedouin-housing",
    "hayat-karima-health-unit",
    "al-marreikh-stadium-civil-mep",
  ],
  "industrial-mep": [
    "salam-city-cattle-farm-networks",
    "qibili-qarun-goat-farm-utilities",
    "ameriya-cold-storage",
    "date-palm-cold-storage-mep",
    "gas-egypt-stations-electromechanical",
    "cargas-grounding-systems",
  ],
};

async function main() {
  const { data: existingCaps } = await supabase.from("capabilities").select("*");
  let capsMap = {};
  existingCaps.forEach((c) => (capsMap[c.slug] = c));

  let sql = "BEGIN;\n\n";

  for (const cap of updatedCapabilities) {
    let existing = capsMap[cap.slug] || capsMap[cap.old_slug];
    if (existing) {
      sql += `UPDATE capabilities SET slug = '${cap.slug}', en_name = '${cap.en_name.replace(/'/g, "''")}', ar_name = '${cap.ar_name.replace(/'/g, "''")}' WHERE id = '${existing.id}';\n`;
      capsMap[cap.slug] = { ...existing, id: existing.id, slug: cap.slug };
    }
  }

  for (const cap of newCapabilities) {
    if (!capsMap[cap.slug]) {
      sql += `INSERT INTO capabilities (id, slug, en_name, ar_name) VALUES ('${cap.id}', '${cap.slug}', '${cap.en_name.replace(/'/g, "''")}', '${cap.ar_name.replace(/'/g, "''")}');\n`;
      capsMap[cap.slug] = cap;
    }
  }

  if (capsMap["irrigation"]) {
    sql += `DELETE FROM capabilities WHERE slug = 'irrigation';\n`;
  }

  const { data: projects } = await supabase.from("projects").select("id, slug");
  const projMap = {};
  projects.forEach((p) => (projMap[p.slug] = p.id));

  sql += `\nDELETE FROM project_capabilities;\n\n`;

  for (const [capSlug, projectSlugs] of Object.entries(projectMappings)) {
    const capId = capsMap[capSlug]?.id;
    if (!capId) continue;
    for (const pSlug of projectSlugs) {
      const pId = projMap[pSlug];
      if (pId) {
        sql += `INSERT INTO project_capabilities (project_id, capability_id) VALUES ('${pId}', '${capId}');\n`;
      }
    }
  }

  sql += "\nCOMMIT;\n";
  fs.writeFileSync("taxonomy_migration.sql", sql);
  console.log("SQL generated.");
}
main();
