import json

with open('scratch/all_images_manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

print('Projects with ZERO images in the raw archive:')
empty_projects = []
for p in manifest['projects']:
    if p.get('imageCount', 0) == 0:
        empty_projects.append(p['project'])

with open('scratch/empty_projects.txt', 'w', encoding='utf-8') as out:
    out.write('Projects with ZERO images in the raw archive:\n')
    for idx, p in enumerate(empty_projects):
        out.write(f"{idx+1}. {p}\n")
    out.write(f'Total empty projects: {len(empty_projects)}\n')
