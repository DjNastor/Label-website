import { fallbackCatalog, type CatalogRelease } from "../../catalog";

export const dynamic = "force-dynamic";

const traxsourceUrl =
  process.env.TRAXSOURCE_LABEL_URL ||
  "https://www.traxsource.com/label/53294/lukulu-recordings";
const beatportUrl =
  process.env.BEATPORT_LABEL_URL ||
  "https://www.beatport.com/label/lukulu-recordings/53294";

export async function GET() {
  const [traxsourceRows, beatportRows] = await Promise.all([
    importPlatformReleases("traxsource", traxsourceUrl),
    importPlatformReleases("beatport", beatportUrl),
  ]);
  const releases = mergeReleases([...traxsourceRows, ...beatportRows]);

  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      source: releases.length ? "platforms" : "fallback",
      sources: {
        traxsource: traxsourceUrl,
        beatport: beatportUrl,
      },
      refresh: {
        cadence: "s-maxage=300, stale-while-revalidate=1800",
        note: "Set TRAXSOURCE_LABEL_URL and BEATPORT_LABEL_URL if platform URLs change.",
      },
      releases: releases.length ? releases : fallbackCatalog.releases,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=1800",
      },
    },
  );
}

async function importPlatformReleases(
  platform: "traxsource" | "beatport",
  url: string,
): Promise<CatalogRelease[]> {
  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) return [];

    const html = await response.text();
    return parsePlatformHtml(platform, url, html);
  } catch {
    return [];
  }
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    return await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "LukuluRecordingsBot/1.0 catalog refresh",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function parsePlatformHtml(
  platform: "traxsource" | "beatport",
  url: string,
  html: string,
): CatalogRelease[] {
  const titleMatches = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([^<]{2,90})<\/a>/gi)];
  const rows = titleMatches
    .map((match) => ({
      href: absolutize(url, match[1]),
      title: clean(match[2]),
    }))
    .filter((row) => row.title && !/label|genre|artist|chart|login/i.test(row.title))
    .slice(0, 12);

  const seen = new Set<string>();
  return rows
    .filter((row) => {
      const key = row.title.toLocaleLowerCase("en-ZA");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((row, index) => ({
      id: platform + "-" + slug(row.title),
      title: row.title,
      artist: "Lukulu Recordings",
      date: "AUTO SYNC",
      dateTime: new Date().toISOString().slice(0, 10),
      code: platform.toUpperCase() + "-" + String(index + 1).padStart(2, "0"),
      href: row.href,
    }));
}

function mergeReleases(releases: CatalogRelease[]): CatalogRelease[] {
  const seen = new Set<string>();
  return releases.filter((release) => {
    const key = release.title.toLocaleLowerCase("en-ZA") + "|" + release.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function absolutize(base: string, href: string): string {
  try {
    return new URL(href, base).toString();
  } catch {
    return base;
  }
}

function clean(value: string): string {
  return value.replace(/\s+/g, " ").replace(/&amp;/g, "&").trim();
}

function slug(value: string): string {
  return value
    .toLocaleLowerCase("en-ZA")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
