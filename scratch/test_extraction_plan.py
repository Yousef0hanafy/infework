import os
import zipfile
import json
import io
import sys
from PIL import Image, ExifTags

sys.stdout.reconfigure(encoding='utf-8')

ZIP_FILE = 'Infeworks_all_project_images.zip'
MANIFEST_FILE = 'all_images_manifest.json'
OUT_DIR = 'public/images/projects'
MAX_DIMENSION = 1920
WEBP_QUALITY = 85
MAX_GALLERY_IMAGES = 11  # 1 cover + up to 11 gallery = up to 12 total

# Authentic mappings: Project Slug -> List of Manifest Project Names
AUTHENTIC_MAPPINGS = {
    'sadat-city-ro': [
        '03-(محطه التحليه بالسادات بطاقة 1500م3 (بمصنع المكرونه)عقد 120-2020 مكمل( 1'
    ],
    'toshka-pumping-stations': [
        '05-محطات الصرف والمياه ف توشكى عقد(115-2020) مكمل'
    ],
    'toshka-farm-potable-water-plant': [
        '07-(محطة تنقية مياه الشرب بمزرعة توشكي سعة 150م3-يوم (عقد 115-2020'
    ],
    'toshka-expanded-water-networks': [
        'محطات توشكا محطتي صرف و مياه (الاستصلاح الزراعي) عقد رقم 39-2022',
        'توشكا'
    ],
    'arish-water-supply': [
        '05-مشروع تغذيه مطار العريش العرجاني جروب'
    ],
    'awlad-el-sheikh-pumping': [
        '01- محطه رفع بقريه اولاد الشيخ'
    ],
    'north-coast-desalination': [
        '03-محطة تحلية وتنقية المياه ب(الحمام-قبلي قارون-الوادي الجديد-وادي النطرون) عقد 136-2019مكمل 1'
    ],
    'multi-site-desalination-purification': [
        '03-محطة تحلية وتنقية المياه ب(الحمام-قبلي قارون-الوادي الجديد-وادي النطرون) عقد 136-2019مكمل 1'
    ],
    'dairy-effluent-treatment-network': [
        '04-محطة معالجة مياه صرف حلابات ب(الحمام-وادي النطرون-السادات-يشع) عقد 136-2019مكمل 2'
    ],
    'food-city-treatment': [
        '04-محطة معالجة مياه صرف حلابات ب(الحمام-وادي النطرون-السادات-يشع) عقد 136-2019مكمل 2'
    ],
    'qabs-min-nour-mosque': [
        '1- مسجد قبس من نور'
    ],
    'rafah-bedouin-housing': [
        '2- البيوت البدوية رفح'
    ],
    'sisi-city-wastewater': [
        '3- مدينة السيسى عقد الصرف'
    ],
    'salam-city-cattle-farm-networks': [
        '07- مشروع شبكات مزرعة الابقار - مدينة السلام'
    ]
}

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

def inspect_extraction_plan():
    with open(MANIFEST_FILE, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    folder_to_images = {}
    for p in manifest['projects']:
        folder_to_images[p['project']] = [img['file'] for img in p['images']]

    with zipfile.ZipFile(ZIP_FILE, 'r') as z:
        print("=== EXTRACTION INSPECTION PLAN ===")
        for slug, folders in AUTHENTIC_MAPPINGS.items():
            all_zip_images = []
            for folder in folders:
                if folder in folder_to_images:
                    all_zip_images.extend(folder_to_images[folder])
            
            print(f"\n[Project: {slug}]")
            print(f"  Source Folders: {folders}")
            print(f"  Available Raw Images in ZIP: {len(all_zip_images)}")
            
            # Inspect first few images to see dimensions and aspect ratios
            valid_images = []
            for img_path in all_zip_images:
                try:
                    info = z.getinfo(img_path)
                    if info.file_size < 15000: # Skip icons or thumbnails < 15KB
                        continue
                    valid_images.append((img_path, info.file_size))
                except KeyError:
                    pass
            print(f"  Valid Candidate Images (>15KB): {len(valid_images)}")

if __name__ == '__main__':
    inspect_extraction_plan()
