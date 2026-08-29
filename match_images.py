import zipfile
import hashlib
import os

zip_path = 'Infeworks_all_project_images.zip'
local_dir = 'public/images/projects'

# Hash local files
local_hashes = {}
for root, dirs, files in os.walk(local_dir):
    for f in files:
        if f.endswith('.jpg'):
            path = os.path.join(root, f)
            with open(path, 'rb') as fp:
                local_hashes[hashlib.md5(fp.read()).hexdigest()] = path

print(f"Hashed {len(local_hashes)} local files.")

# Scan zip and match
matches = {}
with zipfile.ZipFile(zip_path, 'r') as z:
    for info in z.infolist():
        if info.filename.lower().endswith('.jpg') or info.filename.lower().endswith('.jpeg'):
            # read first 1MB or full if we really want to hash
            # wait, the local files might have been resized/compressed!
            pass

# Since local files are 30-90KB, and original zip files are large (1MB+), 
# they were RESIZED by the previous agent! We can't match by hash.
