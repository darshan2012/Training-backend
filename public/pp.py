import sys
from PIL import Image
import os
import base64

from io import BytesIO

img = Image.open(sys.argv[1] + '/' + sys.argv[2])

img = img.convert("L")

newPath = sys.argv[1] + "/b&w/" + sys.argv[2] + "b&w" + sys.argv[3]
img = img.save(newPath)

with open(newPath, "rb") as f:
    im_b64 = base64.b64encode(f.read())

print(im_b64.decode('utf-8'))

os.remove(newPath)
# img.show()

