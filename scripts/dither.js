/*
 Floyd–Steinberg dithering utility using Jimp.
 Usage:
   node scripts/dither.js "/absolute/path/to/image.png" [levels]
 - levels: number of quantization steps per channel (default 6; try 4 for harsher look)
 Outputs a sibling file with "-dithered.png" suffix.
*/

const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

function quantizeChannel(value, levels) {
  const step = 255 / (levels - 1);
  const q = Math.round(value / step) * step;
  return Math.min(255, Math.max(0, Math.round(q)));
}

async function floydSteinbergDither(inputPath, levels = 6) {
  const img = await Jimp.read(inputPath);
  const { width, height, data } = img.bitmap;

  // Float error buffers per channel
  const errR = new Float32Array(width * height);
  const errG = new Float32Array(width * height);
  const errB = new Float32Array(width * height);

  function idx(x, y) {
    return y * width + x;
  }

  // Process left-to-right, top-to-bottom
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const di = (y * width + x) * 4;
      const r = data[di] + errR[idx(x, y)];
      const g = data[di + 1] + errG[idx(x, y)];
      const b = data[di + 2] + errB[idx(x, y)];

      const rq = quantizeChannel(r, levels);
      const gq = quantizeChannel(g, levels);
      const bq = quantizeChannel(b, levels);

      data[di] = rq;
      data[di + 1] = gq;
      data[di + 2] = bq;

      const er = r - rq;
      const eg = g - gq;
      const eb = b - bq;

      // Distribute error
      // (x+1, y)   += 7/16
      if (x + 1 < width) {
        const i1 = idx(x + 1, y);
        errR[i1] += er * (7 / 16);
        errG[i1] += eg * (7 / 16);
        errB[i1] += eb * (7 / 16);
      }
      // (x-1, y+1) += 3/16
      if (x - 1 >= 0 && y + 1 < height) {
        const i2 = idx(x - 1, y + 1);
        errR[i2] += er * (3 / 16);
        errG[i2] += eg * (3 / 16);
        errB[i2] += eb * (3 / 16);
      }
      // (x, y+1)   += 5/16
      if (y + 1 < height) {
        const i3 = idx(x, y + 1);
        errR[i3] += er * (5 / 16);
        errG[i3] += eg * (5 / 16);
        errB[i3] += eb * (5 / 16);
      }
      // (x+1, y+1) += 1/16
      if (x + 1 < width && y + 1 < height) {
        const i4 = idx(x + 1, y + 1);
        errR[i4] += er * (1 / 16);
        errG[i4] += eg * (1 / 16);
        errB[i4] += eb * (1 / 16);
      }
    }
  }

  const { dir, name } = path.parse(inputPath);
  const outPath = path.join(dir, `${name}-dithered.png`);
  await img.writeAsync(outPath);
  return outPath;
}

async function main() {
  const input = process.argv[2];
  const levelsArg = process.argv[3];
  if (!input) {
    console.error('Usage: node scripts/dither.js "path/to/image.png" [levels]');
    console.error('Example: node scripts/dither.js "assets/image.png" 6');
    console.error('Example: node scripts/dither.js "/absolute/path/to/image.png" 6');
    process.exit(1);
  }
  const levels = Math.max(2, parseInt(levelsArg || '6', 10));
  
  // Resolve path - supports both relative and absolute paths
  const resolvedPath = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
  
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: Input file not found: ${resolvedPath}`);
    console.error(`Original path: ${input}`);
    process.exit(1);
  }
  
  try {
    console.log(`Processing: ${resolvedPath}`);
    console.log(`Dithering levels: ${levels}`);
    const out = await floydSteinbergDither(resolvedPath, levels);
    console.log(`✓ Success! Wrote: ${out}`);
  } catch (error) {
    console.error('Error processing image:', error.message);
    if (error.message.includes('Unsupported MIME type')) {
      console.error('Tip: Jimp supports PNG, JPEG, BMP, TIFF, GIF');
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


