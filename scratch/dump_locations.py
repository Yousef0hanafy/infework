import json

with open('full_batch_projects_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("| Project Name (en) | Slug | Current Lat | Current Lng | Location Display Name | Detected Problem |")
print("|---|---|---|---|---|---|")

for p in data:
    en_title = p.get('content', {}).get('en', {}).get('title', 'Unknown')
    slug = p.get('slug', 'Unknown')
    loc = p.get('location', {})
    if not loc:
        continue
    lat = loc.get('lat')
    lng = loc.get('lng')
    display = loc.get('display_name', {}).get('en', 'Unknown')
    
    # Check if coords look suspiciously round
    problem = ""
    if lat == round(lat, 1) and lng == round(lng, 1):
        problem = "Suspiciously round coordinates"
    
    print(f"| {en_title} | {slug} | {lat} | {lng} | {display} | {problem} |")
