import type { CatalogRelease } from "../../catalog";

export type CatalogPlatform = "traxsource" | "beatport";

type ReleaseCandidate = Partial<CatalogRelease> & { href: string };

const releasePaths: Record<CatalogPlatform, RegExp> = {
  traxsource: /\/title\/\d+(?:\/|$)|\/release\/\d+(?:\/|$)/i,
  beatport: /\/(?:release|track)\/[^/?#]+\/\d+(?:\/|$)/i,
};

/**
 * Parse public release metadata embedded in a platform page. Structured page
 * data is preferred; link extraction is limited to known release URL patterns.
 * Unknown fields stay explicitly unknown instead of being fabricated.
 */
export function parsePlatformHtml(
  platform: CatalogPlatform,
  pageUrl: string,
  html: string,
): CatalogRelease[] {
  const candidates = [
    ...extractStructuredCandidates(platform, pageUrl, html),
    ...extractLinkCandidates(platform, pageUrl, html),
  ];
  const seen = new Set<string>();
  const releases: CatalogRelease[] = [];

  for (const candidate of candidates) {
    const title = clean(candidate.title ?? "");
    const href = safeReleaseUrl(platform, pageUrl, candidate.href);
    if (!title || !href || !isUsefulTitle(title)) continue;

    const key = href.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const dateTime = normalizeDate(candidate.dateTime);
    releases.push({
      id: platform + "-" + releaseId(href, title),
      title,
      artist: clean(candidate.artist ?? "") || "Artist unavailable",
      date: dateTime ? formatDate(dateTime) : "Date unavailable",
      dateTime: dateTime ?? "",
      code: clean(candidate.code ?? "") || platform.toUpperCase(),
      href,
    });
  }

  return releases.slice(0, 12);
}

function extractStructuredCandidates(
  platform: CatalogPlatform,
  pageUrl: string,
  html: string,
): ReleaseCandidate[] {
  const candidates: ReleaseCandidate[] = [];
  const scripts = html.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,
  );

  for (const match of scripts) {
    const attributes = match[1];
    if (
      !/application\/(?:ld\+json|json)/i.test(attributes) &&
      !/__NEXT_DATA__|__NUXT__/i.test(attributes)
    ) {
      continue;
    }

    try {
      const payload = JSON.parse(match[2].trim()) as unknown;
      visitStructuredData(payload, platform, pageUrl, candidates);
    } catch {
      // A malformed or framework-specific script must not break catalog sync.
    }
  }

  return candidates;
}

function visitStructuredData(
  value: unknown,
  platform: CatalogPlatform,
  pageUrl: string,
  candidates: ReleaseCandidate[],
): void {
  if (Array.isArray(value)) {
    for (const entry of value) {
      visitStructuredData(entry, platform, pageUrl, candidates);
    }
    return;
  }

  if (!value || typeof value !== "object") return;
  const row = value as Record<string, unknown>;
  const hrefValue = firstString(row.url, row.href, row["@id"], row.link);
  const href = hrefValue ? safeReleaseUrl(platform, pageUrl, hrefValue) : null;
  const title = firstString(row.name, row.title, row.trackTitle);
  const artist = artistName(row.byArtist ?? row.artist ?? row.artists);
  const dateTime = firstString(
    row.datePublished,
    row.releaseDate,
    row.dateCreated,
    row.release_date,
  );
  const code = firstString(
    row.catalogNumber,
    row.catalog_number,
    row.sku,
    row.isrc,
  );

  if (href && title) {
    candidates.push({
      href,
      title,
      artist: artist ?? undefined,
      dateTime: dateTime ?? undefined,
      code: code ?? undefined,
    });
  }

  for (const child of Object.values(row)) {
    if (child && typeof child === "object") {
      visitStructuredData(child, platform, pageUrl, candidates);
    }
  }
}

function extractLinkCandidates(
  platform: CatalogPlatform,
  pageUrl: string,
  html: string,
): ReleaseCandidate[] {
  const candidates: ReleaseCandidate[] = [];
  const anchors = html.matchAll(
    /<a\b([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a\s*>/gi,
  );

  for (const match of anchors) {
    const href = safeReleaseUrl(platform, pageUrl, match[2]);
    if (!href) continue;

    const attributes = match[1] + " " + match[3];
    const title =
      attribute(attributes, "data-title") ??
      attribute(attributes, "title") ??
      attribute(attributes, "aria-label") ??
      textContent(match[4]);
    if (!title) continue;

    const contextStart = Math.max(0, match.index - 900);
    const contextEnd = Math.min(html.length, match.index + match[0].length + 900);
    const context = html.slice(contextStart, contextEnd);
    const artist =
      attribute(attributes, "data-artist") ??
      attribute(attributes, "data-artists") ??
      extractItempropArtist(context);
    const dateTime =
      attribute(attributes, "data-release-date") ??
      attribute(attributes, "datetime") ??
      extractDate(context);
    const code =
      attribute(attributes, "data-catalog-number") ??
      extractCatalogCode(context);

    candidates.push({
      href,
      title,
      artist: artist ?? undefined,
      dateTime: dateTime ?? undefined,
      code: code ?? undefined,
    });
  }

  return candidates;
}

function safeReleaseUrl(
  platform: CatalogPlatform,
  pageUrl: string,
  value: string,
): string | null {
  try {
    const page = new URL(pageUrl);
    const parsed = new URL(value, page);
    const expectedHost = platform === "traxsource" ? "traxsource.com" : "beatport.com";
    if (
      parsed.protocol !== "https:" ||
      !parsed.hostname.toLowerCase().endsWith(expectedHost) ||
      !releasePaths[platform].test(parsed.pathname)
    ) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function artistName(value: unknown): string | null {
  if (typeof value === "string") return clean(value) || null;
  if (Array.isArray(value)) {
    return value.map(artistName).filter(Boolean).join(", ") || null;
  }
  if (value && typeof value === "object") {
    const row = value as Record<string, unknown>;
    const name = firstString(row.name, row.title);
    return name ? clean(name) : null;
  }
  return null;
}

function extractItempropArtist(context: string): string | null {
  const match = context.match(
    /itemprop\s*=\s*["'](?:byArtist|artist)["'][^>]*>([\s\S]{0,240}?)<\//i,
  );
  return match ? textContent(match[1]) || null : null;
}

function extractDate(context: string): string | null {
  const datetime = context.match(/datetime\s*=\s*["']([^"']+)["']/i)?.[1];
  if (datetime) return datetime;

  return (
    context.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0] ??
    context.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/i)?.[0] ??
    context.match(/\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/i)?.[0] ??
    null
  );
}

function extractCatalogCode(context: string): string | null {
  return context.match(/\b(?:CAT|LUK)\d{4,}\b/i)?.[0] ?? null;
}

function normalizeDate(value: string | undefined): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(value + "T00:00:00Z"))
    .toLocaleUpperCase("en-ZA");
}

function releaseId(href: string, title: string): string {
  const pathId = href.match(/\/(\d+)(?:\/|$)/)?.[1];
  return pathId ?? slug(title);
}

function isUsefulTitle(value: string): boolean {
  return (
    value.length >= 2 &&
    value.length <= 120 &&
    !/^(?:label|genre|artist|chart|login|follow|add to queue|add to playlist)$/i.test(value) &&
    !/\b(?:original mix|extended mix)\s*$/i.test(value)
  );
}

function firstString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function attribute(attributes: string, name: string): string | null {
  const match = attributes.match(
    new RegExp("\\b" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i"),
  );
  return match ? decodeHtml(match[2]) : null;
}

function textContent(value: string): string {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function clean(value: string): string {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}

function slug(value: string): string {
  return value.toLocaleLowerCase("en-ZA").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
