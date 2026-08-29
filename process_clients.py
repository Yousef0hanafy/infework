import os
import zipfile
import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image
except ImportError:
    install('Pillow')
    from PIL import Image

ZIP_FILE = 'final_client_logos_ready.zip'
OUT_DIR = 'src/assets/clients'

if not os.path.exists(OUT_DIR):
    os.makedirs(OUT_DIR)

# Clear old .json files
for f in os.listdir(OUT_DIR):
    if f.endswith('.json'):
        os.remove(os.path.join(OUT_DIR, f))

# We prefer the .png versions since the background is white, and a transparent PNG 
# is safest to avoid mismatched off-white backgrounds if the JPG isn't purely #FFFFFF.
# We will convert the PNGs to WEBP for optimal web delivery.
with zipfile.ZipFile(ZIP_FILE, 'r') as z:
    png_files = [f for f in z.namelist() if f.endswith('.png')]
    for png in png_files:
        filename = os.path.basename(png)
        if not filename:
            continue
        base_name = os.path.splitext(filename)[0]
        out_path = os.path.join(OUT_DIR, f"{base_name}.webp")
        
        with z.open(png) as f:
            img = Image.open(f)
            # Convert to RGBA to preserve transparency
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # The tile is roughly 256px max width in desktop (h-24 -> 96px height). 
            # We will resize to max 512px width/height for Retina crispness.
            img.thumbnail((512, 512), Image.Resampling.LANCZOS)
            img.save(out_path, 'WEBP', quality=90, lossless=False)
            print(f"Processed {filename} -> {base_name}.webp")
