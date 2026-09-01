import zipfile
import re
import sys

zip_path = "Infeworks_Project_Intelligence.zip"
query = "Palm Hills"

try:
    with zipfile.ZipFile(zip_path, 'r') as z:
        for file_info in z.infolist():
            if file_info.filename.endswith('.md') or file_info.filename.endswith('.json'):
                try:
                    with z.open(file_info) as f:
                        content = f.read().decode('utf-8', errors='ignore')
                        if re.search(query, content, re.IGNORECASE):
                            print(f"Found in: {file_info.filename}")
                except Exception as e:
                    pass
except Exception as e:
    print(f"Error reading zip: {e}")
