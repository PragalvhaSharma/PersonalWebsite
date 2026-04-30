// Fetches the Substack RSS feed and updates substack-fallback.json before next build.
// Non-fatal: if the fetch fails, the existing fallback JSON is kept unchanged.
const https = require("https");
const fs = require("fs");
const path = require("path");

const FEED_URL = "https://pragalvha.substack.com/feed";
const FALLBACK_PATH = path.join(__dirname, "../src/app/lib/substack-fallback.json");
const MAX_POSTS = 9;
const TIMEOUT_MS = 5000;

function extractTagValue(source, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)</${escaped}>`,
    "i",
  );
  return (pattern.exec(source)?.[1] ?? "").trim();
}

function stripCdata(value) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeHtmlEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const n = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(n) ? _ : String.fromCodePoint(n);
    }
    if (entity.startsWith("#")) {
      const n = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(n) ? _ : String.fromCodePoint(n);
    }
    return named[entity] ?? _;
  });
}

function stripHtml(value) {
  return decodeHtmlEntities(
    value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/p>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength);
  const boundary = shortened.lastIndexOf(" ");
  return `${(boundary > 0 ? shortened.slice(0, boundary) : shortened).trim()}...`;
}

function parsePost(item) {
  const title = decodeHtmlEntities(stripCdata(extractTagValue(item, "title")));
  const url = stripCdata(extractTagValue(item, "link"));
  const publishedAt = stripCdata(extractTagValue(item, "pubDate"));
  const content = stripCdata(extractTagValue(item, "content:encoded"));
  const excerpt = truncate(stripHtml(content), 220);

  if (!title || !url || !publishedAt || !excerpt) return null;
  return { title, url, publishedAt, excerpt };
}

function fetchFeed() {
  return new Promise((resolve, reject) => {
    const req = https.get(
      FEED_URL,
      {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml",
          "User-Agent": "PragPersonalWebsite/1.0 (+https://pragalvha.substack.com)",
        },
        timeout: TIMEOUT_MS,
      },
      (res) => {
        if (res.statusCode >= 300) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      },
    );

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });

    req.on("error", reject);
  });
}

async function main() {
  try {
    const xml = await fetchFeed();
    const posts = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g))
      .map((m) => parsePost(m[1]))
      .filter(Boolean)
      .slice(0, MAX_POSTS);

    if (posts.length === 0) throw new Error("No posts parsed from feed");

    fs.writeFileSync(FALLBACK_PATH, JSON.stringify(posts, null, 2) + "\n");
    console.log(`✓ substack-fallback.json updated with ${posts.length} posts`);
  } catch (err) {
    console.warn(`⚠ Substack fetch skipped (${err.message}) — using existing fallback`);
  }
}

main();
