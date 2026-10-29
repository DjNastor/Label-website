import { fallbackCatalog, type CatalogRelease } from "../../catalog";
import { parsePlatformHtml, type CatalogPlatform } from "./parser";

export const dynamic = "force-dynamic";

const traxsourceUrl =
  process.env.TRAXSOURCE_LABEL_URL ||
  "https://www.traxsource.com/label/53294/lukulu-recordings";
const beatportUrl =
  process.env.BEATPORT_LABEL_URL ||
  "https://www.beatport.com/label/lukulu-recordings/90528";

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
        traxsource: { url: traxsourceUrl, releases: traxsourceRows.length },
        beatport: { url: beatportUrl, releases: beatportRows.length },
      },
      refresh: {
        cadence: "s-maxage=300, stale-while-revalidate=1800",
        note:
          "The sync reads public release links and structured page data. A platform block or page-format change uses the curated fallback.",
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
  platform: CatalogPlatform,
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
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    return await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "LukuluRecordingsBot/1.0 (+https://lukulu-recordings.vercel.app/)",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function mergeReleases(releases: CatalogRelease[]): CatalogRelease[] {
  const seen = new Set<string>();
  return releases.filter((release) => {
    const key = release.href.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
