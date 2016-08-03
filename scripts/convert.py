from __future__ import print_function
import os, sys
from PIL import Image

size = (600, 400)

for infile in sys.argv[1:]:
    outfile = os.path.splitext(infile)[0] + ".thumbnail.jpg"
    if infile != outfile:
        try:
            im = Image.open(infile)
            im.thumbnail(size)
            im.save(outfile, "JPEG")
        except IOError:
            print("cannot create thumbnail for", infile)