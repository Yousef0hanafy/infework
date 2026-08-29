import os
from PIL import Image
import numpy as np

SRC_IMG = r'C:\Users\user\.gemini\antigravity-ide\brain\d29673b7-0df2-4a73-b2b8-54ab75ef58cd\.user_uploaded\media_1787955187513.png'
OUT_DIR = 'src/assets'

orig = Image.open(SRC_IMG).convert('RGBA')
print(f"Original size: {orig.size}")

# Crop tight transparent margins
bbox = orig.getbbox()
if bbox:
    w, h = orig.size
    pad_x = int((bbox[2] - bbox[0]) * 0.02)
    pad_y = int((bbox[3] - bbox[1]) * 0.02)
    crop_box = (
        max(0, bbox[0] - pad_x),
        max(0, bbox[1] - pad_y),
        min(w, bbox[2] + pad_x),
        min(h, bbox[3] + pad_y)
    )
    cropped = orig.crop(crop_box)
else:
    cropped = orig

# Scale to high-DPI retina width (480px width)
cropped.thumbnail((480, 480), Image.Resampling.LANCZOS)
print(f"Cropped & scaled size: {cropped.size}")

# 1. Dark logo (Navy on transparent)
dark_path = os.path.join(OUT_DIR, 'infeworks-logo.webp')
cropped.save(dark_path, 'WEBP', quality=95, lossless=False)
print(f"Saved: {dark_path}")

# 2. White logo (Pure White on transparent for dark sections / footer)
arr = np.array(cropped)
white_arr = np.copy(arr)
# Set RGB to 255, 255, 255 while keeping alpha identical
white_arr[:, :, 0] = 255
white_arr[:, :, 1] = 255
white_arr[:, :, 2] = 255
white_img = Image.fromarray(white_arr)
white_path = os.path.join(OUT_DIR, 'infeworks-logo-white.webp')
white_img.save(white_path, 'WEBP', quality=95, lossless=False)
print(f"Saved: {white_path}")

# 3. Public PNG
public_path = os.path.join('public', 'logo.png')
cropped.save(public_path, 'PNG')
print(f"Saved: {public_path}")
