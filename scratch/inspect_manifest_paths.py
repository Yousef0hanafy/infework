import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('all_images_manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

for p in manifest['projects']:
    if p['images']:
        print(f"\nProject: {p['project']} ({len(p['images'])} images)")
        for img in p['images'][:3]:
            print(f"  - {img['file']} (width={img.get('width')}, height={img.get('height')})")
