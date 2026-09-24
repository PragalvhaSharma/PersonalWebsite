// Fetches the Substack RSS feed and updates substack-fallback.json before next build.
// Non-fatal: if the fetch fails, the existing fallback JSON is kept unchanged.
const https = require("https");
const fs = require("fs");
const path = require("path");

const FEED_URL = "https://pragalvha.substack.com/feed";
// The RSS feed only carries the latest 20 posts; the archive API backfills older ones.
const ARCHIVE_URL = "https://pragalvha.substack.com/api/v1/archive?sort=new&limit=50&offset=";
const FALLBACK_PATH = path.join(__dirname, "../src/app/lib/substack-fallback.json");
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

function fetchText(url, accept) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          Accept: accept,
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

async function fetchArchive() {
  const posts = [];
  for (let offset = 0; ; offset += 50) {
    const page = JSON.parse(await fetchText(ARCHIVE_URL + offset, "application/json"));
    if (!Array.isArray(page) || page.length === 0) return posts;
    posts.push(...page);
  }
}

function parseArchivePost(post) {
  const excerpt = truncate(stripHtml(post.truncated_body_text || post.subtitle || ""), 220);
  if (!post.title || !post.canonical_url || !post.post_date || !excerpt) return null;
  return {
    title: post.title.trim(),
    url: post.canonical_url,
    publishedAt: new Date(post.post_date).toUTCString(),
    excerpt,
  };
}

async function main() {
  try {
    const xml = await fetchText(FEED_URL, "application/rss+xml, application/xml, text/xml");
    const posts = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g))
      .map((m) => parsePost(m[1]))
      .filter(Boolean);

    try {
      const known = new Set(posts.map((post) => post.url));
      for (const post of (await fetchArchive()).map(parseArchivePost)) {
        if (post && !known.has(post.url)) posts.push(post);
      }
      posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } catch (err) {
      console.warn(`⚠ Substack archive skipped (${err.message}) — using RSS posts only`);
    }

    if (posts.length === 0) throw new Error("No posts parsed from feed");

    fs.writeFileSync(FALLBACK_PATH, JSON.stringify(posts, null, 2) + "\n");
    console.log(`✓ substack-fallback.json updated with ${posts.length} posts`);
  } catch (err) {
    console.warn(`⚠ Substack fetch skipped (${err.message}) — using existing fallback`);
  }
}

main();
