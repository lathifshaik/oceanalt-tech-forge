#!/usr/bin/env python3
"""Turn a founder-made sprite sheet into an animation strip for the site.

Usage:
  python3 scripts/make-wave-strip.py SHEET.png NAME --grid 10x2 [--order all] [--still 1]

SHEET is a grid of frames (frame 1 top-left, reading across). It can have real
transparency, or a light/checkerboard background drawn in, which is keyed out.
Frame-number badges (small dark circles) are removed. Every frame is cropped to
one shared box so the character never jumps between frames.

Writes public/avatars/NAME.webp (still), NAME-strip.webp (frames in play order)
and prints the frame count for STRIPS in src/components/Story.tsx.
"""
import argparse
from collections import deque
from pathlib import Path
from PIL import Image

p = argparse.ArgumentParser()
p.add_argument("sheet"); p.add_argument("name")
p.add_argument("--grid", default="5x4")
p.add_argument("--order", default="all", help='"all" or e.g. 1,2,3,2,1')
p.add_argument("--still", default="1", help="frame(s) saved as stills, e.g. 1 or 1:,11:-call")
p.add_argument("--size", type=int, default=192)
a = p.parse_args()

cols, rows = map(int, a.grid.split("x"))
im = Image.open(a.sheet).convert("RGBA")
W, H = im.size
px = im.load()

def neutral_light(c):
    r, g, b, al = c
    return al > 0 and max(r, g, b) - min(r, g, b) <= 18 and (r + g + b) / 3 >= 150

# 1. Background drawn into the image: flood-fill light neutral pixels from the edges.
if im.getextrema()[3][0] == 255:
    seen = bytearray(W * H)
    q = deque()
    for x in range(W):
        for y in (0, H - 1):
            q.append((x, y))
    for y in range(H):
        for x in (0, W - 1):
            q.append((x, y))
    while q:
        x, y = q.popleft()
        i = y * W + x
        if seen[i] or not neutral_light(px[x, y]):
            continue
        seen[i] = 1
        px[x, y] = (0, 0, 0, 0)
        if x > 0: q.append((x - 1, y))
        if x < W - 1: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y < H - 1: q.append((x, y + 1))

    # Pockets of background enclosed by the character (between an arm and the
    # head, say) aren't reached from the edges. Clear light neutral regions that
    # carry the two-tone checkerboard; eye whites and teeth are one tone and stay.
    seen = bytearray(W * H)
    for y0 in range(H):
        for x0 in range(W):
            if seen[y0 * W + x0] or not neutral_light(px[x0, y0]):
                continue
            comp, q = [], deque([(x0, y0)]); seen[y0 * W + x0] = 1
            while q:
                x, y = q.popleft(); comp.append((x, y))
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < W and 0 <= ny < H and not seen[ny * W + nx] and neutral_light(px[nx, ny]):
                        seen[ny * W + nx] = 1; q.append((nx, ny))
            if len(comp) < 40:
                continue
            light = sum(1 for c in comp if px[c][0] >= 245) / len(comp)
            grey = sum(1 for c in comp if 200 <= px[c][0] <= 230) / len(comp)
            if light > 0.2 and grey > 0.2:
                for c in comp:
                    px[c] = (0, 0, 0, 0)

# 2. Remove number badges: small, dark, neutral, filled-circle components.
seen = bytearray(W * H)
for y0 in range(H):
    for x0 in range(W):
        if seen[y0 * W + x0] or px[x0, y0][3] < 20:
            continue
        comp, q = [], deque([(x0, y0)])
        seen[y0 * W + x0] = 1
        while q:
            x, y = q.popleft(); comp.append((x, y))
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < W and 0 <= ny < H and not seen[ny * W + nx] and px[nx, ny][3] >= 20:
                    seen[ny * W + nx] = 1; q.append((nx, ny))
        if len(comp) > 6000:
            continue
        xs = [c[0] for c in comp]; ys = [c[1] for c in comp]
        bw, bh = max(xs) - min(xs) + 1, max(ys) - min(ys) + 1
        fill = len(comp) / (bw * bh)
        dark = sum(1 for c in comp if sum(px[c][:3]) / 3 < 110) / len(comp)
        if 0.6 < bw / bh < 1.6 and fill > 0.55 and dark > 0.5 and bw > 18:
            for c in comp:
                px[c] = (0, 0, 0, 0)

cw = W / cols
# Rows: split at the emptiest horizontal line near each nominal boundary,
# because drawn sheets often let one row overhang the next.
rowsum = [sum(1 for x in range(0, W, 2) if px[x, y][3] >= 20) for y in range(H)]
cuts = [0]
for k in range(1, rows):
    nominal = round(k * H / rows); lo, hi = nominal - round(H / rows / 4), nominal + round(H / rows / 4)
    cuts.append(min(range(lo, hi), key=lambda y: (rowsum[y], abs(y - nominal))))
cuts.append(H)

def components(f):
    fp = f.load(); w, h = f.size; seen = bytearray(w * h); comps = []
    for y0 in range(h):
        for x0 in range(w):
            if seen[y0 * w + x0] or fp[x0, y0][3] < 20:
                continue
            comp, q = [], deque([(x0, y0)]); seen[y0 * w + x0] = 1
            while q:
                x, y = q.popleft(); comp.append((x, y))
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and fp[nx, ny][3] >= 20:
                        seen[ny * w + nx] = 1; q.append((nx, ny))
            comps.append(comp)
    return comps

def cell(n):
    """One frame: the character (largest piece) plus small marks such as motion
    lines, minus slivers of the neighbouring frames that touch the cell's sides.
    Returns the image and an anchor: the centre of the shoulders/bottom edge."""
    r, c = divmod(n - 1, cols)
    f = im.crop((round(c * cw), cuts[r], round((c + 1) * cw), cuts[r + 1]))
    w, h = f.size
    comps = components(f)
    main = max(comps, key=len)
    keep = Image.new("RGBA", f.size, (0, 0, 0, 0)); kp = keep.load(); fp = f.load()
    for comp in comps:
        xs = [x for x, _ in comp]; ys = [y for _, y in comp]
        touches = min(xs) == 0 or max(xs) == w - 1 or min(ys) == 0 or max(ys) == h - 1
        if comp is main or (len(comp) >= 60 and not touches):
            for x, y in comp:
                kp[x, y] = fp[x, y]
    bottom = max(y for _, y in main)
    band = [x for x, y in main if y >= bottom - h * 0.12]
    return keep, (sum(band) / len(band), bottom)

order = list(range(1, cols * rows + 1)) if a.order == "all" else [int(x) for x in a.order.split(",")]
stills = []
for part in a.still.split(","):
    n, _, suffix = part.partition(":")
    stills.append((int(n), suffix))
frames = {n: cell(n) for n in set(order) | {n for n, _ in stills}}

# Line every frame up on its anchor, then use one square box that fits them all.
ext = [0, 0, 0, 0]  # left, up, right, down from the anchor
for f, (ax, ay) in frames.values():
    l, t, r_, b_ = f.getbbox()
    ext = [max(ext[0], ax - l), max(ext[1], ay - t), max(ext[2], r_ - ax), max(ext[3], b_ - ay)]
side = int(max(ext[0] + ext[2], ext[1] + ext[3])) + 4
def square(n):
    f, (ax, ay) = frames[n]
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = side / 2 - (ext[2] - ext[0]) / 2 - ax  # centre the union box horizontally
    oy = side - 2 - ext[3] - ay                # anchor sits near the bottom
    canvas.paste(f, (round(ox), round(oy)), f)
    return canvas.resize((a.size, a.size), Image.LANCZOS)

out = Path(__file__).resolve().parent.parent / "public" / "avatars"
strip = Image.new("RGBA", (a.size * len(order), a.size), (0, 0, 0, 0))
for k, n in enumerate(order):
    strip.paste(square(n), (k * a.size, 0))
strip.save(out / f"{a.name}-strip.webp", quality=86, method=6)
for n, suffix in stills:
    square(n).save(out / f"{a.name}{suffix}.webp", quality=88, method=6)
print(f"{a.name}: {len(order)} frames")
