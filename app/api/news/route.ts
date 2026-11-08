import { fallbackNewsPayload, type NewsItem, type NewsPayload } from "../../news-data";

export const dynamic = "force-dynamic";

const defaultFeedUrls = [
  "https://musictech.com/feed/",
  "https://www.attackmagazine.com/feed/",
];
const feedUrls = process.env.SOCIAL_FEED_URLS
  ? process.env.SOCIAL_FEED_URLS.split(",").map((url) => url.trim()).filter(Boolean)
  : defaultFeedUrls;

export async function GET() {
  const items = await collectFeedItems();
  const payload: NewsPayload = {
    generatedAt: new Date().toISOString(),
    source: items.length ? "aggregated" : "fallback",
    items: items.length ? items : fallbackNewsPayload().items,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=900",
    },
  });
}

async function collectFeedItems(): Promise<NewsItem[]> {
  // Read independent sources concurrently so one slow publisher cannot delay the others.
  const feedResults = await Promise.all(feedUrls.map(async (feedUrl) => {
    try {
      const response = await fetchWithTimeout(feedUrl);
      if (!response.ok) return [];

      const body = await response.text();
      const parsedJson = parseJsonFeed(feedUrl, body);
      return parsedJson.length ? parsedJson : parseXmlFeed(feedUrl, body);
    } catch {
      return [];
    }
  }));

  const unique = new Map(feedResults.flat().map((item) => [item.href, item]));
  return [...unique.values()]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 9);
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    return await fetch(url, {
      headers: { Accept: "application/feed+json, application/rss+xml, application/json, text/xml" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function parseJsonFeed(feedUrl: string, body: string): NewsItem[] {
  try {
    const parsed = JSON.parse(body) as {
      items?: unknown[];
      posts?: unknown[];
      feed?: unknown[];
    } | unknown[];
    const items = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.items)
        ? parsed.items
        : Array.isArray(parsed.posts)
          ? parsed.posts
          : Array.isArray(parsed.feed)
            ? parsed.feed
            : [];

    return items.slice(0, 12).map((item, index) => {
      const row = asRecord(item);
      const title = asText(row.title) || asText(row.text) || "Lukulu update";
      const summary =
        (asText(row.summary) || asText(row.content) || asText(row.text) || title)
          .slice(0, 200);

      return {
        id: asText(row.id) || "json-" + index + "-" + hashText(title),
        title,
        summary,
        source: asText(row.source) || hostname(feedUrl),
        href: safeUrl(row.href) || safeUrl(row.url) || feedUrl,
        publishedAt: asText(row.publishedAt) || asText(row.date) || new Date().toISOString(),
        type: "industry",
      };
    });
  } catch {
    return [];
  }
}

function parseXmlFeed(feedUrl: string, body: string): NewsItem[] {
  const blocks = [
    ...body.matchAll(/<item[\s\S]*?<\/item>/gi),
    ...body.matchAll(/<entry[\s\S]*?<\/entry>/gi),
  ].map((match) => match[0]);

  return blocks.slice(0, 12).map((block, index) => {
    const title = stripTags(tagText(block, "title") || "Lukulu update");
    const summary = stripTags(
      tagText(block, "description") ||
        tagText(block, "summary") ||
        tagText(block, "content") ||
        title,
    ).slice(0, 200);
    const href = atomLink(block) || safeUrl(tagText(block, "link")) || feedUrl;

    return {
      id: "xml-" + index + "-" + hashText(title),
      title,
      summary,
      source: hostname(feedUrl),
      href,
      publishedAt:
        tagText(block, "pubDate") ||
        tagText(block, "published") ||
        tagText(block, "updated") ||
        new Date().toISOString(),
      type: "industry",
    };
  });
}

// Atom entries commonly use <link href="..." rel="alternate" /> instead of RSS link text.
function atomLink(block: string): string {
  const links = [...block.matchAll(/<link\\b([^>]*)\\/?>/gi)]
    .map((match) => {
      const attributes = match[1];
      const href = attributes.match(/\\bhref\\s*=\\s*(?:"([^"]*)"|'([^']*)')/i);
      const rel = attributes.match(/\\brel\\s*=\\s*(?:"([^"]*)"|'([^']*)')/i);
      return {
        href: safeUrl(decodeHtml(href?.[1] || href?.[2] || "")),
        rel: rel?.[1] || rel?.[2] || "",
      };
    })
    .filter((link) => link.href);

  return links.find((link) => link.rel === "alternate")?.href ||
    links.find((link) => !link.rel)?.href ||
    links[0]?.href || "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeUrl(value: unknown): string {
  const candidate = asText(value);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function tagText(block: string, tagName: string): string {
  const pattern = new RegExp(
    "<(?:[\\w-]+:)?" + tagName + "[^>]*>([\\s\\S]*?)<\\/(?:[\\w-]+:)?" + tagName + ">",
    "i",
  );
  const match = block.match(pattern);
  return match ? decodeHtml(match[1].trim()) : "";
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Connected feed";
  }
}

function hashText(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}
