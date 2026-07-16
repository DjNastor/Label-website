import { fallbackNewsPayload, type NewsItem, type NewsPayload } from "../../news-data";

export const dynamic = "force-dynamic";

const feedUrls = (process.env.SOCIAL_FEED_URLS || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

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
  const imported: NewsItem[] = [];

  for (const feedUrl of feedUrls) {
    try {
      const response = await fetchWithTimeout(feedUrl);
      if (!response.ok) continue;

      const text = await response.text();
      imported.push(...parseJsonFeed(feedUrl, text));
      if (imported.length === 0) {
        imported.push(...parseXmlFeed(feedUrl, text));
      }
    } catch {
      continue;
    }
  }

  return imported
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
        asText(row.summary) || asText(row.content) || asText(row.text) || title;

      return {
        id: asText(row.id) || "json-" + index + "-" + hashText(title),
        title,
        summary,
        source: asText(row.source) || hostname(feedUrl),
        href: safeUrl(row.href) || safeUrl(row.url) || feedUrl,
        publishedAt: asText(row.publishedAt) || asText(row.date) || new Date().toISOString(),
        type: classifyType(title + " " + summary),
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
    );
    const href = safeUrl(tagText(block, "link")) || feedUrl;

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
      type: classifyType(title + " " + summary),
    };
  });
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

function classifyType(value: string): NewsItem["type"] {
  const lowered = value.toLowerCase();
  if (/(release|track|ep|album|catalog|traxsource|beatport)/.test(lowered)) {
    return "release";
  }

  if (/(press|feature|premiere|interview)/.test(lowered)) {
    return "press";
  }

  return "social";
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
