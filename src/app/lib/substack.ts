import type { SubstackPost } from "./substack-types";
import fallbackPosts from "./substack-fallback.json";

const SUBSTACK_FEED_URL = "https://pragalvha.substack.com/feed";
const MAX_POSTS = 6;
const SUBSTACK_REVALIDATE_SECONDS = 60 * 60;
const SUBSTACK_REQUEST_HEADERS = {
  Accept: "application/rss+xml, application/xml, text/xml",
  "User-Agent": "PragPersonalWebsite/1.0 (+https://pragalvha.substack.com)",
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractTagValue(source: string, tagName: string) {
  const pattern = new RegExp(
    `<${escapeRegex(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRegex(tagName)}>`,
    "i",
  );

  return pattern.exec(source)?.[1] ?? "";
}

function stripCdata(value: string) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeHtmlEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const parsed = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(parsed) ? _ : String.fromCodePoint(parsed);
    }

    if (entity.startsWith("#")) {
      const parsed = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(parsed) ? _ : String.fromCodePoint(parsed);
    }

    return namedEntities[entity] ?? _;
  });
}

function stripHtml(value: string) {
  return decodeHtmlEntities(
    value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/p>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  const shortened = value.slice(0, maxLength);
  const boundary = shortened.lastIndexOf(" ");

  return `${(boundary > 0 ? shortened.slice(0, boundary) : shortened).trim()}...`;
}

function parsePost(item: string): SubstackPost | null {
  const title = decodeHtmlEntities(stripCdata(extractTagValue(item, "title")));
  const url = stripCdata(extractTagValue(item, "link"));
  const publishedAt = stripCdata(extractTagValue(item, "pubDate"));
  const content = stripCdata(extractTagValue(item, "content:encoded"));
  const excerpt = truncate(stripHtml(content), 220);

  if (!title || !url || !publishedAt || !excerpt) {
    return null;
  }

  return {
    title,
    url,
    publishedAt,
    excerpt,
  };
}

function getFallbackPosts() {
  return (fallbackPosts as SubstackPost[]).slice(0, MAX_POSTS);
}

export async function getRecentSubstackPosts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(SUBSTACK_FEED_URL, {
      headers: SUBSTACK_REQUEST_HEADERS,
      signal: controller.signal,
      next: {
        revalidate: SUBSTACK_REVALIDATE_SECONDS,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Substack feed request failed with ${response.status}`);
    }

    const xml = await response.text();
    const posts = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g))
      .map((match) => parsePost(match[1]))
      .filter((post): post is SubstackPost => post !== null)
      .slice(0, MAX_POSTS);

    if (posts.length === 0) {
      throw new Error("Substack feed returned no posts");
    }

    return posts;
  } catch (error) {
    console.error("Failed to fetch Substack posts", error);
    return getFallbackPosts();
  }
}
