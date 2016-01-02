#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# サムネイル作成スクリプト

from PIL import Image
import glob
from os.path import join, relpath, exists
import re

path = './static/images/'

files = glob.glob(join(path, '*.*'))
for f in files:
    print 'Generating thumbnail: ' + f
    img = Image.open(f)
    img.thumbnail((768, 768), Image.ANTIALIAS)
    img.save(join(path, relpath(f, path)))
