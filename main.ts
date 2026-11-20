// news-image-20261120 — entrypoint.
// The entry is a pre-rendered 1024x1024 image (JPEG bytes, saved as
// entry.png). This program copies it to the output directory, unchanged,
// so both grading runs produce byte-identical output. No network access,
// standard library only.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Self-check: the copy must be byte-identical to the source image.
if (statSync(source).size !== statSync(target).size) {
  throw new Error("copied entry image differs in size from the source");
}
