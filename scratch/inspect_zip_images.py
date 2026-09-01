import zipfile
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

zip_path = 'Infeworks_all_project_images.zip'

with zipfile.ZipFile(zip_path, 'r') as z:
    for folder in [
        '05-مشروع تغذيه مطار العريش العرجاني جروب',
        '2- البيوت البدوية رفح',
        '3- مدينة السيسى عقد الصرف',
        '07- مشروع شبكات مزرعة الابقار - مدينة السلام',
        '03-محطة تحلية وتنقية المياه ب(الحمام-قبلي قارون-الوادي الجديد-وادي النطرون) عقد 136-2019مكمل 1',
        '07-(محطة تنقية مياه الشرب بمزرعة توشكي سعة 150م3-يوم (عقد 115-2020',
        '05-محطات الصرف والمياه ف توشكى عقد(115-2020) مكمل'
    ]:
        files = [info for info in z.infolist() if info.filename.startswith(folder) and info.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        print(f"\nFolder: {folder} -> {len(files)} image files")
        # Print sample filenames and sizes
        for f in files[:8]:
            print(f"  - {os.path.basename(f.filename)} ({f.file_size // 1024} KB)")
