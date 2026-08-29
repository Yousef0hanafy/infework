import os
import zipfile
import json
import subprocess
import sys
import shutil

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image, ExifTags
except ImportError:
    install('Pillow')
    from PIL import Image, ExifTags

ZIP_FILE = 'Infeworks_all_project_images.zip'
MANIFEST_FILE = 'all_images_manifest.json'
OUT_DIR = 'public/images/projects'

# Mappings: Project slug -> Folders in ZIP
MAPPINGS = {
    'sadat-city-ro': ['03-(محطه التحليه بالسادات بطاقة 1500م3 (بمصنع المكرونه)عقد 120-2020 مكمل( 1'],
    'toshka-pumping-stations': [
        '07-(محطة تنقية مياه الشرب بمزرعة توشكي سعة 150م3-يوم (عقد 115-2020',
        '05-محطات الصرف والمياه ف توشكى عقد(115-2020) مكمل'
    ],
    'food-city-treatment': ['04-محطة معالجة مياه صرف حلابات ب(الحمام-وادي النطرون-السادات-يشع) عقد 136-2019مكمل 2'],
    'arish-water-supply': ['05-مشروع تغذيه مطار العريش العرجاني جروب'],
    'awlad-el-sheikh-pumping': ['01- محطه رفع بقريه اولاد الشيخ'],
    'north-coast-desalination': ['03-محطة تحلية وتنقية المياه ب(الحمام-قبلي قارون-الوادي الجديد-وادي النطرون) عقد 136-2019مكمل 1'],
    'east-delta-wastewater': ['07- مشروع شبكات مزرعة الابقار - مدينة السلام']
}

MAX_IMAGES_PER_PROJECT = 6
MAX_DIMENSION = 1920

with open(MANIFEST_FILE, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

# Find all images for each folder
folder_to_images = {}
for p in manifest['projects']:
    folder_to_images[p['project']] = [img['file'] for img in p['images']]

def fix_orientation(img):
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = img._getexif()
        if exif is not None:
            orientation = exif.get(orientation, 1)
            if orientation == 3:
                img = img.rotate(180, expand=True)
            elif orientation == 6:
                img = img.rotate(270, expand=True)
            elif orientation == 8:
                img = img.rotate(90, expand=True)
    except Exception:
        pass
    return img

def process_image(z, zip_path, out_path):
    with z.open(zip_path) as f:
        img = Image.open(f)
        img = fix_orientation(img)
        # Convert to RGB if needed
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        
        # Resize if too large
        img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
        
        # Save as WEBP for better compression
        img.save(out_path, 'WEBP', quality=85)

# Process projects
stats = {}
with zipfile.ZipFile(ZIP_FILE, 'r') as z:
    for slug, folders in MAPPINGS.items():
        project_dir = os.path.join(OUT_DIR, slug)
        
        # Collect all valid image paths
        all_images = []
        for folder in folders:
            if folder in folder_to_images:
                all_images.extend([img for img in folder_to_images[folder] if img.lower().endswith(('.jpg', '.jpeg', '.png'))])
        
        if not all_images:
            print(f"No images found for {slug}. Skipping.")
            continue
            
        print(f"Processing {slug} - found {len(all_images)} images.")
        
        # Clear existing images except maybe some we want to keep?
        # Actually, let's clear all .jpg / .webp
        if os.path.exists(project_dir):
            for f in os.listdir(project_dir):
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    os.remove(os.path.join(project_dir, f))
        else:
            os.makedirs(project_dir)
            
        # Select best images (for now, we just pick the first few, 
        # ideally we sort them by size assuming larger file size = better quality/composition, 
        # or we just take the first N which might be sorted alphabetically)
        # Let's get sizes from zip
        image_sizes = []
        for img in all_images:
            try:
                info = z.getinfo(img)
                image_sizes.append((img, info.file_size))
            except KeyError:
                pass
        
        # Sort by size descending as a proxy for detail/quality
        image_sizes.sort(key=lambda x: x[1], reverse=True)
        selected = image_sizes[:MAX_IMAGES_PER_PROJECT]
        
        count = 0
        for i, (zip_path, _) in enumerate(selected):
            filename = 'cover.webp' if i == 0 else f'gallery-{i}.webp'
            out_path = os.path.join(project_dir, filename)
            try:
                process_image(z, zip_path, out_path)
                count += 1
            except Exception as e:
                print(f"Failed to process {zip_path}: {e}")
        
        stats[slug] = count

print("Extraction and optimization complete.")
print("Extracted counts:", stats)

# Write stats to file for the next step
with open('extracted_stats.json', 'w') as f:
    json.dump(stats, f)
