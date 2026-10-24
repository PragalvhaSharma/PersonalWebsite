// Renders scripts/og-video.html into public/og-video.mp4, the looping clip
// iMessage plays in link previews (1200x630, 30 fps, H.264, BT.709, no audio).
// The page uses three.js from node_modules, so it is served over a throwaway
// local HTTP server (ES module imports do not load over file://).
// Requires Playwright and ffmpeg. The Chromium flags use Metal, so run it on a Mac:
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/render-og-video.mjs
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { copyFileSync, createReadStream, mkdtempSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30;
const SCALE = 2; // render at 2x and downsample for smoother edges
const SERVED = ["/scripts/", "/node_modules/three/"]; // all the page needs
const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript" };

const server = createServer((req, res) => {
  let file, stat;
  try {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
    file = join(root, path);
    if (SERVED.some((dir) => path.startsWith(dir))) stat = statSync(file, { throwIfNoEntry: false });
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (!stat?.isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

let browser;
const work = mkdtempSync(join(tmpdir(), "og-video-"));
try {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const source = "http://127.0.0.1:" + server.address().port + "/scripts/og-video.html?capture";
  browser = await chromium.launch({ args: ["--use-angle=metal", "--enable-gpu"] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: SCALE });
  page.on("pageerror", (e) => console.error("page error:", e.message));
  await page.goto(source, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__ready !== undefined);
  await page.evaluate(() => window.__ready);
  const loop = await page.evaluate(() => window.__LOOP);
  const count = Math.round(loop * FPS);
  for (let f = 0; f < count; f++) {
    await page.evaluate((t) => window.__render(t), f / FPS);
    await page.screenshot({ path: join(work, "f" + String(f).padStart(4, "0") + ".png") });
  }

  // Convert with BT.709 and tag it, so iOS decodes the colors the way they were rendered.
  // Encode to a temp file first so a failed run never leaves a broken public/og-video.mp4.
  const encoded = join(work, "og-video.mp4");
  execFileSync("ffmpeg", [
    "-v", "error", "-y",
    "-framerate", String(FPS),
    "-i", join(work, "f%04d.png"),
    "-vf", "scale=1200:630:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p," +
      "setparams=range=tv:colorspace=bt709:color_primaries=bt709:color_trc=bt709",
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
    "-preset", "veryslow", "-crf", "22",
    "-movflags", "+faststart", "-an",
    encoded,
  ]);
  copyFileSync(encoded, join(root, "public", "og-video.mp4"));
  console.log("Rendered " + count + " frames to public/og-video.mp4");
} finally {
  await browser?.close();
  server.close();
  rmSync(work, { recursive: true, force: true });
}
