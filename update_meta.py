import os
with open('src/lib/project-meta.ts', 'r', encoding='utf-8') as f:
    content = f.read()

slugs = ['sadat-city-ro', 'toshka-pumping-stations', 'food-city-treatment', 'arish-water-supply', 'awlad-el-sheikh-pumping', 'north-coast-desalination', 'east-delta-wastewater']

for slug in slugs:
    content = content.replace(f'/images/projects/{slug}/cover.jpg', f'/images/projects/{slug}/cover.webp')
    for i in range(1, 6):
        content = content.replace(f'/images/projects/{slug}/gallery-{i}.jpg', f'/images/projects/{slug}/gallery-{i}.webp')

with open('src/lib/project-meta.ts', 'w', encoding='utf-8') as f:
    f.write(content)
