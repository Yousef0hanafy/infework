import json
import re

# Read current project-meta.ts to extract existing non-image fields for the 8 flagship projects
with open("src/lib/project-meta.ts", "r", encoding="utf-8") as f:
    ts_content = f.read()

stats = json.load(open("scratch/curated_portfolio_stats.json", "r", encoding="utf-8"))

# We want to rewrite the PROJECT_META object entirely.
# Let's extract the existing properties for the 8 projects
existing_props = {}
for slug in stats.keys():
    match = re.search(r'(?:"?' + re.escape(slug) + r'"?):\s*\{([^}]+(?:\}|\])[^}]+(?:\}|\])[^}]*)\},', ts_content, re.DOTALL)
    # This regex is brittle. Let's just manually copy the 8 from the file string since there are only 8.
    pass

# Let's do it simply by injecting the 35 missing ones and updating the 8 existing ones.
# Actually, since there are only 8, we can just hardcode them in the script!
