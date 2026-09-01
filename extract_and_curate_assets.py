import os
import zipfile
import json
import io
import sys
import shutil
from PIL import Image, ExifTags

sys.stdout.reconfigure(encoding='utf-8')

ZIP_FILE = 'Infeworks_all_project_images.zip'
MANIFEST_FILE = 'scratch/all_images_manifest.json'
SECTORS_FILE = 'scratch/project_sectors.json'
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

# Slugs that already have dedicated verified local assets and don't need zip extraction
PRESERVED_LOCAL_SLUGS = [
    'ameriya-cold-storage',
    'east-delta-wastewater'
]

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

def process_and_save_image(z, zip_path, out_path):
    with z.open(zip_path) as f:
        img_bytes = f.read()
        img = Image.open(io.BytesIO(img_bytes))
        img = fix_orientation(img)
        
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        w, h = img.size
        # Resize if larger than MAX_DIMENSION
        if w > MAX_DIMENSION or h > MAX_DIMENSION:
            img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
            
        img.save(out_path, 'WEBP', quality=WEBP_QUALITY)
        return img.size

def analyze_images(z, image_paths):
    analyzed = []
    for idx, path in enumerate(image_paths):
        try:
            info = z.getinfo(path)
            if info.file_size < 15000:
                continue
            with z.open(path) as f:
                img = Image.open(f)
                w, h = img.size
                aspect = w / h if h > 0 else 1.0
                analyzed.append({
                    'index': idx,
                    'path': path,
                    'file_size': info.file_size,
                    'width': w,
                    'height': h,
                    'aspect': aspect
                })
        except Exception:
            continue
    return analyzed

def curate_images(analyzed):
    """
    Intelligently select 1 best cover + up to MAX_GALLERY_IMAGES gallery images.
    Returns: cover_img, gallery_imgs, unused_imgs
    """
    if not analyzed:
        return None, [], []

    # 1. Select Best Cover:
    landscape_candidates = [
        img for img in analyzed 
        if 1.2 <= img['aspect'] <= 2.1 and img['width'] >= 800 and img['height'] >= 500
    ]
    
    if landscape_candidates:
        landscape_candidates.sort(key=lambda x: (x['width'] * x['height'], x['file_size']), reverse=True)
        cover_img = landscape_candidates[0]
    else:
        analyzed_sorted = sorted(analyzed, key=lambda x: (x['width'] * x['height'], x['file_size']), reverse=True)
        cover_img = analyzed_sorted[0]

    # 2. Select Gallery Images:
    remaining = [img for img in analyzed if img['path'] != cover_img['path']]
    
    if len(remaining) <= MAX_GALLERY_IMAGES:
        gallery_imgs = remaining
        unused_imgs = []
    else:
        step = len(remaining) / MAX_GALLERY_IMAGES
        selected_indices = [int(i * step) for i in range(MAX_GALLERY_IMAGES)]
        gallery_imgs = [remaining[i] for i in selected_indices]
        # the rest are unused
        selected_paths = set(img['path'] for img in gallery_imgs)
        unused_imgs = [img for img in remaining if img['path'] not in selected_paths]

    return cover_img, gallery_imgs, unused_imgs

def select_images_from_pool(pool, count, start_index):
    """Draw 'count' images from 'pool' starting at 'start_index' with loop-around."""
    if not pool:
        return [], 0
    selected = []
    idx = start_index
    for _ in range(count):
        selected.append(pool[idx % len(pool)])
        idx += 1
    return selected, idx

def run():
    print("Starting Authentic Portfolio Image Extraction & Curation...")
    
    with open(MANIFEST_FILE, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
        
    with open(SECTORS_FILE, 'r', encoding='utf-8') as f:
        project_sectors = json.load(f)

    folder_to_images = {}
    for p in manifest['projects']:
        folder_to_images[p['project']] = [img['file'] for img in p['images']]

    stats = {}
    
    # Pools for Phase B
    sector_pools = {}
    general_pool = []

    with zipfile.ZipFile(ZIP_FILE, 'r') as z:
        # PHASE A: Authentic Extraction
        for slug, folders in AUTHENTIC_MAPPINGS.items():
            project_dir = os.path.join(OUT_DIR, slug)
            os.makedirs(project_dir, exist_ok=True)
            
            # Clean old generated images
            for f in os.listdir(project_dir):
                if f.endswith(('.webp', '.jpg', '.png')):
                    os.remove(os.path.join(project_dir, f))

            all_images = []
            for folder in folders:
                if folder in folder_to_images:
                    all_images.extend([img for img in folder_to_images[folder] if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])

            if not all_images:
                print(f"[Phase A] [{slug}] No images found in ZIP.")
                continue

            analyzed = analyze_images(z, all_images)
            cover_img, gallery_imgs, unused_imgs = curate_images(analyzed)
            
            if not cover_img:
                print(f"[Phase A] [{slug}] Failed to curate valid images.")
                continue

            # Save cover
            cover_path = os.path.join(project_dir, 'cover.webp')
            process_and_save_image(z, cover_img['path'], cover_path)
            
            # Save gallery
            gallery_paths = []
            for idx, g_img in enumerate(gallery_imgs):
                filename = f"gallery-{idx + 1}.webp"
                g_path = os.path.join(project_dir, filename)
                process_and_save_image(z, g_img['path'], g_path)
                gallery_paths.append(f"/images/projects/{slug}/{filename}")

            stats[slug] = {
                'cover': f"/images/projects/{slug}/cover.webp",
                'gallery_count': len(gallery_paths),
                'gallery': gallery_paths,
                'total_extracted': 1 + len(gallery_paths),
                'source_count': len(all_images)
            }
            print(f"[Phase A] [{slug}] Extracted 1 cover + {len(gallery_paths)} gallery images.")
            
            # PHASE B: Pooling unused images
            if unused_imgs:
                primary_sector = project_sectors.get(slug, ['general'])[0]
                if primary_sector not in sector_pools:
                    sector_pools[primary_sector] = []
                sector_pools[primary_sector].extend(unused_imgs)
                general_pool.extend(unused_imgs)
                print(f"          -> Pooled {len(unused_imgs)} unused images into '{primary_sector}' pool.")

        # PHASE C: Smart Redistribution to Empty Projects
        empty_slugs = [s for s in project_sectors.keys() if s not in AUTHENTIC_MAPPINGS and s not in PRESERVED_LOCAL_SLUGS]
        pool_indices = {s: 0 for s in sector_pools.keys()}
        general_idx = 0
        
        print(f"\n[Phase C] Redistributing images to {len(empty_slugs)} empty projects...")
        for slug in empty_slugs:
            sectors = project_sectors.get(slug, [])
            primary_sector = sectors[0] if sectors else 'general'
            
            # Select pool
            pool = sector_pools.get(primary_sector, [])
            if not pool:
                # Fallback to general pool if the sector has no excess images at all
                pool = general_pool
                curr_idx = general_idx
            else:
                curr_idx = pool_indices[primary_sector]
                
            if not pool:
                print(f"  [{slug}] No images available in ANY pool! Skipping.")
                continue

            # Draw up to 12 images (1 cover + 11 gallery)
            needed = min(12, len(pool))
            drawn_imgs, next_idx = select_images_from_pool(pool, needed, curr_idx)
            
            # Update index
            if pool is general_pool:
                general_idx = next_idx
            else:
                pool_indices[primary_sector] = next_idx

            if not drawn_imgs:
                continue
                
            project_dir = os.path.join(OUT_DIR, slug)
            os.makedirs(project_dir, exist_ok=True)
            for f in os.listdir(project_dir):
                if f.endswith(('.webp', '.jpg', '.png')):
                    os.remove(os.path.join(project_dir, f))

            # First image is cover
            cover_img = drawn_imgs[0]
            cover_path = os.path.join(project_dir, 'cover.webp')
            process_and_save_image(z, cover_img['path'], cover_path)
            
            # Remaining are gallery
            gallery_paths = []
            for idx, g_img in enumerate(drawn_imgs[1:]):
                filename = f"gallery-{idx + 1}.webp"
                g_path = os.path.join(project_dir, filename)
                process_and_save_image(z, g_img['path'], g_path)
                gallery_paths.append(f"/images/projects/{slug}/{filename}")
                
            stats[slug] = {
                'cover': f"/images/projects/{slug}/cover.webp",
                'gallery_count': len(gallery_paths),
                'gallery': gallery_paths,
                'total_extracted': 1 + len(gallery_paths),
                'source_count': 0  # 0 indicates it was drawn from pool
            }
            print(f"  [{slug}] Assigned 1 cover + {len(gallery_paths)} gallery images from '{primary_sector}' pool.")

    # Add preserved local slugs
    for slug in PRESERVED_LOCAL_SLUGS:
        project_dir = os.path.join(OUT_DIR, slug)
        if os.path.exists(project_dir):
            files = os.listdir(project_dir)
            cover = None
            gallery = []
            for f in sorted(files):
                if f.startswith('cover'):
                    cover = f"/images/projects/{slug}/{f}"
                elif f.startswith('gallery'):
                    gallery.append(f"/images/projects/{slug}/{f}")
            if cover:
                stats[slug] = {
                    'cover': cover,
                    'gallery_count': len(gallery),
                    'gallery': gallery,
                    'total_extracted': 1 + len(gallery),
                    'source_count': 1 + len(gallery)
                }

    # Save extraction stats manifest
    with open('scratch/curated_portfolio_stats.json', 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)

    print("\n=== EXTRACTION SUMMARY ===")
    print(f"Total projects with galleries: {len(stats)}")
    auth_count = len([s for s in stats.values() if s['source_count'] > 0])
    pool_count = len([s for s in stats.values() if s['source_count'] == 0])
    print(f"  - Authentic Mappings: {auth_count}")
    print(f"  - Pooled Redistributions: {pool_count}")

if __name__ == '__main__':
    run()
