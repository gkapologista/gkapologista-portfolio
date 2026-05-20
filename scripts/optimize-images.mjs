// One-shot image optimizer for public/images.
//
// For every PNG/JPG it: (1) writes a .webp sibling (what modern browsers load via
// <picture><source>), and (2) downscales the original in place to a sane max dimension
// as the <img> fallback. Re-run after adding new screenshots:  node scripts/optimize-images.mjs
//
// Requires the `sharp` devDependency.

import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const IMAGES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const MAX_DIM = 1400; // longest side; covers card, hero, and lightbox display sizes
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 72;

const isRaster = (f) => /\.(png|jpe?g)$/i.test(f);

const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;

let beforeTotal = 0;
let afterTotal = 0;

const files = (await readdir(IMAGES_DIR)).filter(isRaster);
if (files.length === 0) {
  console.log('No raster images found in', IMAGES_DIR);
  process.exit(0);
}

for (const file of files) {
  const srcPath = join(IMAGES_DIR, file);
  const ext = extname(file);
  const name = basename(file, ext);
  const webpPath = join(IMAGES_DIR, `${name}.webp`);

  const before = (await stat(srcPath)).size;
  beforeTotal += before;

  // Decode once; resize only if larger than MAX_DIM (never upscale).
  const input = sharp(srcPath);
  const meta = await input.metadata();
  const resize = {
    width: MAX_DIM,
    height: MAX_DIM,
    fit: 'inside',
    withoutEnlargement: true,
  };

  // 1) WebP sibling
  await sharp(srcPath).resize(resize).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

  // 2) Resized fallback in the original format (to a buffer, then overwrite the file)
  const isPng = /\.png$/i.test(file);
  const fallbackPipeline = sharp(srcPath).resize(resize);
  const fallbackBuf = isPng
    ? await fallbackPipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
    : await fallbackPipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  await sharp(fallbackBuf).toFile(srcPath);

  const webpSize = (await stat(webpPath)).size;
  const fallbackSize = (await stat(srcPath)).size;
  afterTotal += webpSize + fallbackSize;

  console.log(
    `${file}  ${meta.width}x${meta.height}  ${fmt(before)} -> webp ${fmt(webpSize)} | fallback ${fmt(fallbackSize)}`,
  );
}

console.log(
  `\nTotal: ${fmt(beforeTotal)} originals -> ${fmt(afterTotal)} (webp + fallback). ` +
    'Browsers fetch only the webp.',
);
