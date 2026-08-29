import json
import urllib.request
import os

env = {}
with open('.env', 'r') as f:
    for line in f:
        if '=' in line:
            k, v = line.strip().split('=', 1)
            env[k] = v.strip('"\'')

url = env['SUPABASE_URL'] + '/rest/v1/projects?select=id,slug,title_en,title_ar'
req = urllib.request.Request(url, headers={
    'apikey': env['SUPABASE_PUBLISHABLE_KEY'],
    'Authorization': 'Bearer ' + env['SUPABASE_PUBLISHABLE_KEY']
})

try:
    res = urllib.request.urlopen(req).read().decode('utf-8')
    with open('supabase_projects.json', 'w', encoding='utf-8') as f:
        f.write(res)
    print("Success")
except Exception as e:
    print("Error:", e)
