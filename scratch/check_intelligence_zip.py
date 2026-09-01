import zipfile
import json

with zipfile.ZipFile('Infeworks_Project_Intelligence.zip', 'r') as z:
    names = z.namelist()
    print(f"Infeworks_Project_Intelligence.zip has {len(names)} files.")
    images = [n for n in names if n.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    print(f"Images in Project_Intelligence: {len(images)}")
    if images:
        print("Sample images:", images[:5])
