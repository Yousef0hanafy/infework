import zipfile
import csv
import io
import json

with zipfile.ZipFile('final_supplier_logos_ready.zip') as z:
    raw_csv = z.read('supplier_registry_final.csv').decode('utf-8-sig')
    reader = csv.DictReader(io.StringIO(raw_csv))
    rows = list(reader)
    
    with open('suppliers_parsed.json', 'w', encoding='utf-8') as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)

    # Also extract supplier_final_report.md
    if 'supplier_final_report.md' in z.namelist():
        with open('supplier_final_report.md', 'w', encoding='utf-8') as f:
            f.write(z.read('supplier_final_report.md').decode('utf-8-sig'))

    # Also extract supplier_logo_manifest.csv
    if 'supplier_logo_manifest.csv' in z.namelist():
        manifest_raw = z.read('supplier_logo_manifest.csv').decode('utf-8-sig')
        manifest_rows = list(csv.DictReader(io.StringIO(manifest_raw)))
        with open('supplier_logo_manifest.json', 'w', encoding='utf-8') as f:
            json.dump(manifest_rows, f, ensure_ascii=False, indent=2)

print("Parsed successfully!")
