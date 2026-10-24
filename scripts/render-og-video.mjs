// Renders scripts/og-video.html into the two link preview assets:
//   public/og-image.png  frame 0 at 1200x630 (the still card)
//   public/og-video.mp4  the full loop at 1200x630, 30 fps, H.264, no audio
// Requires Playwright and ffmpeg:
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/render-og-video.mjs
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = pathToFileURL(join(root, "scripts", "og-video.html")).href + "?capture";
const FPS = 30;
const SCALE = 2; // render at 2x and downsample for crisper text

const frames = mkdtempSync(join(tmpdir(), "og-video-"));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: SCALE });
  await page.goto(source, { waitUntil: "networkidle" });
  await page.evaluate(() => window.__ready);
  const loop = await page.evaluate(() => window.__LOOP);
  const count = Math.round(loop * FPS);
  for (let f = 0; f < count; f++) {
    await page.evaluate((t) => window.__render(t), f / FPS);
    await page.screenshot({ path: join(frames, "f" + String(f).padStart(4, "0") + ".png") });
  }

  const scale = "scale=1200:630:flags=lanczos";
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", join(frames, "f0000.png"), "-vf", scale, join(root, "public", "og-image.png")]);
  execFileSync("ffmpeg", [
    "-v", "error", "-y",
    "-framerate", String(FPS),
    "-i", join(frames, "f%04d.png"),
    "-vf", scale + ",format=yuv420p",
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
    "-preset", "veryslow", "-crf", "20", "-tune", "animation",
    "-movflags", "+faststart", "-an",
    join(root, "public", "og-video.mp4"),
  ]);
  console.log("Rendered " + count + " frames to public/og-image.png and public/og-video.mp4");
} finally {
  await browser.close();
  rmSync(frames, { recursive: true, force: true });
}
