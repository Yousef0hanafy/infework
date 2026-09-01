import zipfile
import sys

zip_path = "Infeworks_Project_Intelligence.zip"

try:
    with zipfile.ZipFile(zip_path, 'r') as z:
        for file_info in z.infolist():
            print(file_info.filename)
except Exception as e:
    print(f"Error reading zip: {e}")
