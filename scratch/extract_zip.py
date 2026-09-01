import zipfile
import os

zip_path = "Infeworks_Project_Intelligence.zip"
extract_path = "scratch/intelligence_full"

os.makedirs(extract_path, exist_ok=True)

try:
    with zipfile.ZipFile(zip_path, 'r') as z:
        for file_info in z.infolist():
            try:
                # Try to decode the filename properly if it's garbled, but just extract it raw
                z.extract(file_info, extract_path)
            except Exception as e:
                pass
    print("Extraction complete")
except Exception as e:
    print(f"Error reading zip: {e}")
