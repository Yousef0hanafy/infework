// Infeworks — Verified Suppliers & Manufacturing Partners registry.
// Sourced strictly from the official supplier assets package.

import s01SeifPipes from "@/assets/suppliers/01_seif_pipes.webp";
import s02Entc from "@/assets/suppliers/02_entc.webp";
import s03FalconMisr from "@/assets/suppliers/03_falcon_misr.webp";
import s04Bimex from "@/assets/suppliers/04_bimex.webp";
import s05GreaterCairoFoundries from "@/assets/suppliers/05_greater_cairo_foundries.webp";
import s06Rvk from "@/assets/suppliers/06_rvk.webp";
import s07EkfFoundry from "@/assets/suppliers/07_ekf_foundry.webp";
import s08Afaaq from "@/assets/suppliers/08_afaaq.webp";
import s09EcologiSolutions from "@/assets/suppliers/09_ecologi_solutions.webp";
import s10Egyfire from "@/assets/suppliers/10_egyfire.webp";
import s11AdvanceWaterTreatment from "@/assets/suppliers/11_advance_water_treatment.webp";
import s12SystemVentilation from "@/assets/suppliers/12_system_ventilation.webp";
import s13EgyAir from "@/assets/suppliers/13_egy_air.webp";
import s14ProtecEgypt from "@/assets/suppliers/14_protec_egypt.webp";
import s15Safeco from "@/assets/suppliers/15_safeco.webp";
import s16EscPumps from "@/assets/suppliers/16_esc_pumps.webp";
import s17Egat from "@/assets/suppliers/17_egat.webp";
import s18Gemka from "@/assets/suppliers/18_gemka.webp";
import s19Grundfos from "@/assets/suppliers/19_grundfos.webp";
import s20Alrowad from "@/assets/suppliers/20_alrowad.webp";
import s21Sis from "@/assets/suppliers/21_sis.webp";
import s22InternationalTanks from "@/assets/suppliers/22_international_tanks.webp";
import s23Univent from "@/assets/suppliers/23_univent.webp";
import s24Rheoserve from "@/assets/suppliers/24_rheoserve.webp";
import s25Alamin from "@/assets/suppliers/25_alamin.webp";
import s26Andalosia from "@/assets/suppliers/26_andalosia.webp";
import s27RedseaPipes from "@/assets/suppliers/27_redsea_pipes.webp";
import s28AllweilerFarid from "@/assets/suppliers/28_allweiler_farid.webp";
import s29Kirmary from "@/assets/suppliers/29_kirmary.webp";
import s30MisrElhegaz from "@/assets/suppliers/30_misr_elhegaz.webp";
import s31Marmox from "@/assets/suppliers/31_marmox.webp";
import s32Planetx from "@/assets/suppliers/32_planetx.webp";
import s33RoxyPlast from "@/assets/suppliers/33_roxy_plast.webp";
import s34Kenana from "@/assets/suppliers/34_kenana.webp";
import s35Hammam from "@/assets/suppliers/35_hammam.webp";
import s36MisrElnour from "@/assets/suppliers/36_misr_elnour.webp";
import s37FalconEngineering from "@/assets/suppliers/37_falcon_engineering.webp";
import s38EgyGulf from "@/assets/suppliers/38_egy_gulf.webp";

export type SupplierCategory =
  | "all"
  | "pipes_piping"
  | "pumps_treatment"
  | "foundries_castings"
  | "safety_fire"
  | "hvac_ventilation"
  | "materials_engineering";

export type Supplier = {
  id: string;
  src: string;
  en: string;
  ar: string;
  category: SupplierCategory;
  categoryLabel: { en: string; ar: string };
};

export const CATEGORY_BADGES: Record<SupplierCategory, { en: string; ar: string }> = {
  all: { en: "Partner", ar: "شريك" },
  pipes_piping: { en: "Piping", ar: "أنابيب ومحابس" },
  pumps_treatment: { en: "Pumps", ar: "مضخات ومعالجة" },
  foundries_castings: { en: "Foundries", ar: "مسابك ومسبوكات" },
  safety_fire: { en: "Fire Safety", ar: "مكافحة حريق" },
  hvac_ventilation: { en: "HVAC", ar: "تهوية وتكييف" },
  materials_engineering: { en: "Engineering", ar: "توريدات هندسية" },
};

export const SUPPLIERS: Supplier[] = [
  {
    id: "01_seif_pipes",
    src: s01SeifPipes,
    en: "Seif Pipes",
    ar: "سيف النصر",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "02_entc",
    src: s02Entc,
    en: "ENTC For Investment & Trading",
    ar: "ENTC",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "03_falcon_misr",
    src: s03FalconMisr,
    en: "Falcon Misr / FMC",
    ar: "فالكون مصر",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "04_bimex",
    src: s04Bimex,
    en: "Al Andalus for Engineering Industries / BIMEX",
    ar: "الاندلس BIMEX",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "05_greater_cairo_foundries",
    src: s05GreaterCairoFoundries,
    en: "Greater Cairo Foundries / GCF",
    ar: "مسابك القاهرة",
    category: "foundries_castings",
    categoryLabel: { en: "Foundries & Castings", ar: "المسابك والمسبوكات الهندسية" },
  },
  {
    id: "06_rvk",
    src: s06Rvk,
    en: "RVK Ductile Iron Pipes & Fittings",
    ar: "RVK",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "07_ekf_foundry",
    src: s07EkfFoundry,
    en: "EKF Foundry / Egyptian Kuwaiti Foundry",
    ar: "الإخلاص",
    category: "foundries_castings",
    categoryLabel: { en: "Foundries & Castings", ar: "المسابك والمسبوكات الهندسية" },
  },
  {
    id: "08_afaaq",
    src: s08Afaaq,
    en: "AFAAQ for Trading and Information Technology",
    ar: "Afaaq - Trade",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "09_ecologi_solutions",
    src: s09EcologiSolutions,
    en: "Ecologi Solutions",
    ar: "Ecologi Solutions",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "10_egyfire",
    src: s10Egyfire,
    en: "EGY-FIRE Company for Firefighting Works",
    ar: "Egyfire",
    category: "safety_fire",
    categoryLabel: { en: "Fire Protection & Safety", ar: "مكافحة الحريق والسلامة" },
  },
  {
    id: "11_advance_water_treatment",
    src: s11AdvanceWaterTreatment,
    en: "Advance Water Treatment",
    ar: "Advance Water Treatment",
    category: "pumps_treatment",
    categoryLabel: { en: "Pumps & Water Treatment", ar: "المضخات ومحطات المعالجة" },
  },
  {
    id: "12_system_ventilation",
    src: s12SystemVentilation,
    en: "System Ventilation Egypt",
    ar: "System Ventilation Egypt",
    category: "hvac_ventilation",
    categoryLabel: { en: "HVAC & Ventilation", ar: "أنظمة التهوية والتكييف" },
  },
  {
    id: "13_egy_air",
    src: s13EgyAir,
    en: "Egy Air",
    ar: "Egy Air / Egyptian air systems candidate",
    category: "hvac_ventilation",
    categoryLabel: { en: "HVAC & Ventilation", ar: "أنظمة التهوية والتكييف" },
  },
  {
    id: "14_protec_egypt",
    src: s14ProtecEgypt,
    en: "PRO-TEC EGYPT",
    ar: "Pro-tec Egypt",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "15_safeco",
    src: s15Safeco,
    en: "SAF ECO Group",
    ar: "Safeco-Group",
    category: "safety_fire",
    categoryLabel: { en: "Fire Protection & Safety", ar: "مكافحة الحريق والسلامة" },
  },
  {
    id: "16_esc_pumps",
    src: s16EscPumps,
    en: "ESC Pumps / Engineering for Supplies & Consultancy",
    ar: "Esc Engineering for supplies",
    category: "pumps_treatment",
    categoryLabel: { en: "Pumps & Water Treatment", ar: "المضخات ومحطات المعالجة" },
  },
  {
    id: "17_egat",
    src: s17Egat,
    en: "EGAT Air Treatment Co.",
    ar: "EGAT / Egat",
    category: "hvac_ventilation",
    categoryLabel: { en: "HVAC & Ventilation", ar: "أنظمة التهوية والتكييف" },
  },
  {
    id: "18_gemka",
    src: s18Gemka,
    en: "Gemka Group",
    ar: "Gemka",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "19_grundfos",
    src: s19Grundfos,
    en: "Grundfos Egypt",
    ar: "جراندفوس",
    category: "pumps_treatment",
    categoryLabel: { en: "Pumps & Water Treatment", ar: "المضخات ومحطات المعالجة" },
  },
  {
    id: "20_alrowad",
    src: s20Alrowad,
    en: "Alrowad HDPE Pipes",
    ar: "الرواد",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "21_sis",
    src: s21Sis,
    en: "Smith Integrated Services / SIS",
    ar: "الكتروميكانيكال انتجريتد سيرفيس",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "22_international_tanks",
    src: s22InternationalTanks,
    en: "International Water Tanks / Coleman Tank",
    ar: "الدولية لصناعة الخزانات",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "23_univent",
    src: s23Univent,
    en: "Univent",
    ar: "Univent",
    category: "hvac_ventilation",
    categoryLabel: { en: "HVAC & Ventilation", ar: "أنظمة التهوية والتكييف" },
  },
  {
    id: "24_rheoserve",
    src: s24Rheoserve,
    en: "Rheoserve Industrial Solutions",
    ar: "RheoServe",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "25_alamin",
    src: s25Alamin,
    en: "Alamin Co. for Pipes & Plastic Products",
    ar: "الأمين",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "26_andalosia",
    src: s26Andalosia,
    en: "Andalosia for Air Outlet",
    ar: "الاندلسية",
    category: "hvac_ventilation",
    categoryLabel: { en: "HVAC & Ventilation", ar: "أنظمة التهوية والتكييف" },
  },
  {
    id: "27_redsea_pipes",
    src: s27RedseaPipes,
    en: "Red Sea Pipes / RSP",
    ar: "البحر الأحمر",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "28_allweiler_farid",
    src: s28AllweilerFarid,
    en: "Allweiler-Farid Hassanein Pumps",
    ar: "وايلر فريد",
    category: "pumps_treatment",
    categoryLabel: { en: "Pumps & Water Treatment", ar: "المضخات ومحطات المعالجة" },
  },
  {
    id: "29_kirmary",
    src: s29Kirmary,
    en: "KirMary Company for Engineering Supplies and Fire Fighting Systems",
    ar: "كيرماري",
    category: "safety_fire",
    categoryLabel: { en: "Fire Protection & Safety", ar: "مكافحة الحريق والسلامة" },
  },
  {
    id: "30_misr_elhegaz",
    src: s30MisrElhegaz,
    en: "Misr Elhegaz Group",
    ar: "مصر الحجاز",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "31_marmox",
    src: s31Marmox,
    en: "Marmox Egypt / CMB Group",
    ar: "مارموكس",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "32_planetx",
    src: s32Planetx,
    en: "Planet X Egypt",
    ar: "شركة / Planet X",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "33_roxy_plast",
    src: s33RoxyPlast,
    en: "Roxy Plast / Roxy for Modern Water Systems",
    ar: "روكسى",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "34_kenana",
    src: s34Kenana,
    en: "Kenana Automation",
    ar: "كنانة مصر",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "35_hammam",
    src: s35Hammam,
    en: "Hammam Industries & Co.",
    ar: "همام",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "36_misr_elnour",
    src: s36MisrElnour,
    en: "Misr El Nour Plastic & Metals",
    ar: "مصر النور",
    category: "pipes_piping",
    categoryLabel: { en: "Pipes & Piping Systems", ar: "أنظمة الأنابيب والمواسير" },
  },
  {
    id: "37_falcon_engineering",
    src: s37FalconEngineering,
    en: "Falcon Engineering CO. / FALCON CO.",
    ar: "Falcon Engineering",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
  {
    id: "38_egy_gulf",
    src: s38EgyGulf,
    en: "Egyptian Gulf for Engineering Industries / Egy Gulf",
    ar: "Egy Gulf",
    category: "materials_engineering",
    categoryLabel: { en: "Materials & Engineering", ar: "المواد والتوريدات الهندسية" },
  },
];

export const SUPPLIER_CATEGORIES = [
  { id: "all", en: "All Suppliers", ar: "جميع الموردين" },
  { id: "pipes_piping", en: "Piping & Valves", ar: "الأنابيب والمحابس" },
  { id: "pumps_treatment", en: "Pumps & Treatment", ar: "المضخات ومحطات المعالجة" },
  { id: "foundries_castings", en: "Foundries & Castings", ar: "المسابك والمسبوكات" },
  { id: "safety_fire", en: "Fire Protection", ar: "مكافحة الحريق والسلامة" },
  { id: "hvac_ventilation", en: "HVAC & Ventilation", ar: "التهوية والتكييف" },
  { id: "materials_engineering", en: "Engineering Supplies", ar: "التوريدات والمواد الهندسية" },
];
