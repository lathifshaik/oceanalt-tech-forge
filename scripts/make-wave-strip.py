#!/usr/bin/env python3
"""Turn a founder-made sprite sheet into a wave strip for the site.

Usage:
  python3 scripts/make-wave-strip.py SHEET.png NAME --grid 5x4 --order 1,2,3,4,5,4,3,4,5,4,3,2,1

SHEET is a transparent PNG laid out in a grid (frame 1 top-left, reading
across). Each cell's top-left corner is cleared, so frame-number badges go.
Writes public/avatars/NAME.webp (rest frame), NAME-wave.webp (hand up) and
NAME-wave-strip.webp (frames in play order, all aligned to one crop). Then add
NAME to SPRITES in src/components/Story.tsx with the number of frames.
"""
import argparse
from pathlib import Path
from PIL import Image

p = argparse.ArgumentParser()
p.add_argument("sheet"); p.add_argument("name")
p.add_argument("--grid", default="5x4")
p.add_argument("--order", default="1,2,3,4,5,4,3,4,5,4,3,2,1")
p.add_argument("--wave", type=int, default=5, help="frame used as the still 'hand up' pose")
p.add_argument("--size", type=int, default=192)
p.add_argument("--badge", default="88x72", help="top-left area cleared in each cell")
a = p.parse_args()

cols, rows = map(int, a.grid.split("x"))
bw, bh = map(int, a.badge.split("x"))
order = [int(x) for x in a.order.split(",")]
im = Image.open(a.sheet).convert("RGBA")
cw, ch = im.width / cols, im.height / rows

def cell(n):
    r, c = divmod(n - 1, cols)
    f = im.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch)))
    px = f.load()
    for y in range(min(bh, f.height)):
        for x in range(min(bw, f.width)):
            px[x, y] = (0, 0, 0, 0)
    return f

frames = {n: cell(n) for n in set(order) | {a.wave}}
boxes = [frames[n].getbbox() for n in order]
l = min(b[0] for b in boxes); t = min(b[1] for b in boxes)
r = max(b[2] for b in boxes); b_ = max(b[3] for b in boxes)
side = max(r - l, b_ - t); cx, cy = (l + r) // 2, (t + b_) // 2
box = (cx - side // 2, cy - side // 2, cx - side // 2 + side, cy - side // 2 + side)

def square(n):
    return frames[n].crop(box).resize((a.size, a.size), Image.LANCZOS)

out = Path(__file__).resolve().parent.parent / "public" / "avatars"
strip = Image.new("RGBA", (a.size * len(order), a.size), (0, 0, 0, 0))
for k, n in enumerate(order):
    strip.paste(square(n), (k * a.size, 0))
strip.save(out / f"{a.name}-wave-strip.webp", quality=88, method=6)
square(order[0]).save(out / f"{a.name}.webp", quality=88, method=6)
square(a.wave).save(out / f"{a.name}-wave.webp", quality=88, method=6)
print(f"{a.name}: {len(order)} frames -> add {{ {a.name}: {len(order)} }} to SPRITES")
