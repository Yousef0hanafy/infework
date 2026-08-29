import os
import zipfile
import json
import csv
import io
import subprocess
import sys
from PIL import Image

ZIP_FILE = 'final_supplier_logos_ready.zip'
OUT_DIR = 'src/assets/suppliers'
LIB_FILE = 'src/lib/suppliers.ts'

if not os.path.exists(OUT_DIR):
    os.makedirs(OUT_DIR)

with zipfile.ZipFile(ZIP_FILE, 'r') as z:
    manifest_raw = z.read('supplier_logo_manifest.csv').decode('utf-8-sig')
    manifest_rows = list(csv.DictReader(io.StringIO(manifest_raw)))
    
    registry_raw = z.read('supplier_registry_final.csv').decode('utf-8-sig')
    registry_rows = list(csv.DictReader(io.StringIO(registry_raw)))
    
    reg_by_file = {}
    for r in registry_rows:
        lf = r.get('logo_file', '').strip()
        if lf:
            reg_by_file[lf] = r

    png_files = [f for f in z.namelist() if f.startswith('supplier_logo_pack/') and f.endswith('.png')]
    png_files.sort()
    
    suppliers_data = []
    
    for png_path in png_files:
        filename = os.path.basename(png_path)
        base_name = os.path.splitext(filename)[0]
        out_webp_name = f"{base_name}.webp"
        out_path = os.path.join(OUT_DIR, out_webp_name)
        
        with z.open(png_path) as f:
            img = Image.open(f)
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            img.thumbnail((512, 512), Image.Resampling.LANCZOS)
            img.save(out_path, 'WEBP', quality=90, lossless=False)
            
        m_info = next((m for m in manifest_rows if m.get('logo_file') == filename), None)
        r_info = reg_by_file.get(filename, {})
        
        ar_name = ""
        en_name = ""
        
        if m_info:
            ar_name = m_info.get('dataset_name', '')
            en_name = m_info.get('canonical_name', '')
        elif r_info:
            ar_name = r_info.get('dataset_name', '')
            en_name = r_info.get('canonical_name', '')
            
        if not en_name:
            en_name = base_name.replace('_', ' ').title()
        if not ar_name:
            ar_name = en_name
            
        cat_lower = (en_name + " " + ar_name).lower()
        if any(w in cat_lower for w in ['pipe', 'بايب', 'مواسير', 'plast', 'roxy', 'seif', 'redsea', 'hegaz', 'rvk', 'ductile']):
            cat_id = 'pipes_piping'
            cat_en = 'Pipes & Piping Systems'
            cat_ar = 'أنظمة الأنابيب والمواسير'
        elif any(w in cat_lower for w in ['pump', 'مضخ', 'طلمب', 'allweiler', 'grundfos', 'esc', 'flow', 'water treatment', 'معالجة']):
            cat_id = 'pumps_treatment'
            cat_en = 'Pumps & Water Treatment'
            cat_ar = 'المضخات ومحطات المعالجة'
        elif any(w in cat_lower for w in ['foundry', 'مسابك', 'سباكة', 'إخلاص', 'ekf', 'gcf', 'cairo']):
            cat_id = 'foundries_castings'
            cat_en = 'Foundries & Castings'
            cat_ar = 'المسابك والمسبوكات الهندسية'
        elif any(w in cat_lower for w in ['fire', 'حريق', 'protec', 'safeco', 'egyfire', 'إطفاء']):
            cat_id = 'safety_fire'
            cat_en = 'Fire Protection & Safety'
            cat_ar = 'مكافحة الحريق والسلامة'
        elif any(w in cat_lower for w in ['ventilation', 'air', 'univent', 'تهوية', 'تكييف']):
            cat_id = 'hvac_ventilation'
            cat_en = 'HVAC & Ventilation'
            cat_ar = 'أنظمة التهوية والتكييف'
        else:
            cat_id = 'materials_engineering'
            cat_en = 'Materials & Engineering'
            cat_ar = 'المواد والتوريدات الهندسية'
            
        # Ensure identifier is a valid JS variable name (e.g. s01SeifPipes)
        cleaned_parts = [part.capitalize() for part in base_name.split('_')]
        var_name = "s" + "".join(cleaned_parts)
        
        suppliers_data.append({
            'var_name': var_name,
            'file_name': out_webp_name,
            'id': base_name,
            'en': en_name,
            'ar': ar_name,
            'categoryId': cat_id,
            'categoryEn': cat_en,
            'categoryAr': cat_ar,
        })

ts_lines = [
    '// Infeworks — Verified Suppliers & Manufacturing Partners registry.',
    '// Sourced strictly from the official supplier assets package.',
    '',
]

for s in suppliers_data:
    ts_lines.append(f'import {s["var_name"]} from "@/assets/suppliers/{s["file_name"]}";')

ts_lines.append('')
ts_lines.append('export type SupplierCategory =')
ts_lines.append('  | "all"')
ts_lines.append('  | "pipes_piping"')
ts_lines.append('  | "pumps_treatment"')
ts_lines.append('  | "foundries_castings"')
ts_lines.append('  | "safety_fire"')
ts_lines.append('  | "hvac_ventilation"')
ts_lines.append('  | "materials_engineering";')
ts_lines.append('')
ts_lines.append('export type Supplier = {')
ts_lines.append('  id: string;')
ts_lines.append('  src: string;')
ts_lines.append('  en: string;')
ts_lines.append('  ar: string;')
ts_lines.append('  category: SupplierCategory;')
ts_lines.append('  categoryLabel: { en: string; ar: string };')
ts_lines.append('};')
ts_lines.append('')
ts_lines.append('export const SUPPLIERS: Supplier[] = [')

for s in suppliers_data:
    en_clean = s["en"].replace('"', '\\"')
    ar_clean = s["ar"].replace('"', '\\"')
    cat_en_clean = s["categoryEn"].replace('"', '\\"')
    cat_ar_clean = s["categoryAr"].replace('"', '\\"')
    
    ts_lines.append('  {')
    ts_lines.append(f'    id: "{s["id"]}",')
    ts_lines.append(f'    src: {s["var_name"]},')
    ts_lines.append(f'    en: "{en_clean}",')
    ts_lines.append(f'    ar: "{ar_clean}",')
    ts_lines.append(f'    category: "{s["categoryId"]}",')
    ts_lines.append(f'    categoryLabel: {{ en: "{cat_en_clean}", ar: "{cat_ar_clean}" }},')
    ts_lines.append('  },')

ts_lines.append('];')
ts_lines.append('')
ts_lines.append('export const SUPPLIER_CATEGORIES = [')
ts_lines.append('  { id: "all", en: "All Suppliers (38)", ar: "جميع الموردين (٣٨)" },')
ts_lines.append('  { id: "pipes_piping", en: "Piping & Valves", ar: "الأنابيب والمحابس" },')
ts_lines.append('  { id: "pumps_treatment", en: "Pumps & Treatment", ar: "المضخات ومحطات المعالجة" },')
ts_lines.append('  { id: "foundries_castings", en: "Foundries & Castings", ar: "المسابك والمسبوكات" },')
ts_lines.append('  { id: "safety_fire", en: "Fire Protection", ar: "مكافحة الحريق والسلامة" },')
ts_lines.append('  { id: "hvac_ventilation", en: "HVAC & Ventilation", ar: "التهوية والتكييف" },')
ts_lines.append('  { id: "materials_engineering", en: "Engineering Supplies", ar: "التوريدات والمواد الهندسية" },')
ts_lines.append('];')
ts_lines.append('')

with open(LIB_FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print(f"Successfully processed {len(suppliers_data)} supplier logos and generated valid {LIB_FILE}!")
