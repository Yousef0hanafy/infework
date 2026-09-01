import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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
  console.log("Fetching existing capabilities...");
  const { data: existingCaps, error: capsError } = await supabase.from("capabilities").select("*");
  if (capsError) throw capsError;

  let capsMap = {};
  existingCaps.forEach((c) => (capsMap[c.slug] = c));

  console.log("Updating existing capabilities...");
  for (const cap of updatedCapabilities) {
    let existing = capsMap[cap.slug] || capsMap[cap.old_slug];
    if (existing) {
      console.log(`Updating ${existing.slug} to ${cap.slug}`);
      const { error } = await supabase
        .from("capabilities")
        .update({ slug: cap.slug, en_name: cap.en_name, ar_name: cap.ar_name })
        .eq("id", existing.id);
      if (error) console.error(`Error updating ${cap.slug}:`, error);
      capsMap[cap.slug] = {
        ...existing,
        slug: cap.slug,
        en_name: cap.en_name,
        ar_name: cap.ar_name,
      };
    }
  }

  console.log("Inserting new capabilities...");
  for (const cap of newCapabilities) {
    if (!capsMap[cap.slug]) {
      console.log(`Inserting ${cap.slug}`);
      const { error } = await supabase.from("capabilities").insert([
        {
          id: cap.id,
          slug: cap.slug,
          en_name: cap.en_name,
          ar_name: cap.ar_name,
        },
      ]);
      if (error) console.error(`Error inserting ${cap.slug}:`, error);
      else capsMap[cap.slug] = cap;
    } else {
      console.log(`${cap.slug} already exists.`);
    }
  }

  // Delete old unused capability (irrigation)
  if (capsMap["irrigation"]) {
    console.log("Deleting irrigation capability...");
    await supabase.from("capabilities").delete().eq("slug", "irrigation");
    delete capsMap["irrigation"];
  }

  // Get all projects
  console.log("Fetching projects...");
  const { data: projects, error: projError } = await supabase.from("projects").select("id, slug");
  if (projError) throw projError;

  const projMap = {};
  projects.forEach((p) => (projMap[p.slug] = p.id));

  console.log("Wiping old project_capabilities...");
  // Instead of wipe all which might cause FK issues, we can just delete all mappings
  const { error: wipeError } = await supabase
    .from("project_capabilities")
    .delete()
    .neq("project_id", "00000000-0000-0000-0000-000000000000");
  if (wipeError) console.error("Error wiping mappings:", wipeError);

  console.log("Inserting new project_capabilities...");
  const newMappings = [];
  for (const [capSlug, projectSlugs] of Object.entries(projectMappings)) {
    const capId = capsMap[capSlug]?.id;
    if (!capId) {
      console.log(`Warning: cap ${capSlug} not found in DB`);
      continue;
    }
    for (const pSlug of projectSlugs) {
      const pId = projMap[pSlug];
      if (!pId) {
        console.log(`Warning: project ${pSlug} not found in DB`);
        continue;
      }
      newMappings.push({ project_id: pId, capability_id: capId });
    }
  }

  if (newMappings.length > 0) {
    // Chunk insert since it might be a bit large, but 43 is small.
    const { error: insertError } = await supabase.from("project_capabilities").insert(newMappings);
    if (insertError) {
      console.error("Error inserting mappings:", insertError);
    } else {
      console.log(`Successfully inserted ${newMappings.length} mappings.`);
    }
  }

  console.log("Migration complete.");
}

main().catch(console.error);
