export const catalogUrl =
  "https://www.traxsource.com/label/53294/lukulu-recordings";

export type CatalogRelease = {
  id: string;
  title: string;
  artist: string;
  date: string;
  dateTime: string;
  code: string;
  href: string;
  previewUrl?: string;
};

export type CatalogArtist = {
  id: string;
  name: string;
  href: string;
};

export type PublicCatalog = {
  releases: CatalogRelease[];
  artists: CatalogArtist[];
  source: "fallback" | "platforms" | "supabase";
};

const fallbackReleases: CatalogRelease[] = [
  {
    id: "CAT1948348",
    title: "Amalangabi",
    artist: "DJ Nastor & Zamachunu Mchunu",
    date: "10 JUL 2026",
    dateTime: "2026-07-10",
    code: "CAT1948348",
    href: catalogUrl,
  },
  {
    id: "CAT1920022",
    title: "Malupha",
    artist: "DJ Mukumu",
    date: "01 JUL 2026",
    dateTime: "2026-07-01",
    code: "CAT1920022",
    href: catalogUrl,
  },
  {
    id: "CAT1905905",
    title: "Plastic Thunder",
    artist: "Da Cord",
    date: "26 JUN 2026",
    dateTime: "2026-06-26",
    code: "CAT1905905",
    href: catalogUrl,
  },
];

const fallbackArtistNames = [
  "DJ Nastor",
  "Dubnakave",
  "Vorn Annunaki",
  "Da Cord",
  "DJ Mukumu",
  "Quexdeep",
  "Lukulu",
  "Crash Zulu",
];

const fallbackArtists = fallbackArtistNames.map((name) => ({
  id: name.toLocaleLowerCase("en-ZA").replace(/[^a-z0-9]+/g, "-"),
  name,
  href: catalogUrl,
}));

export const fallbackCatalog: PublicCatalog = {
  releases: fallbackReleases,
  artists: fallbackArtists,
  source: "fallback",
};

function asObject(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asPublicUrl(value: unknown): string | null {
  const candidate = asText(value);

  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function releaseHref(dspLinks: unknown): string {
  const links = asObject(dspLinks);

  if (!links) {
    return catalogUrl;
  }

  for (const key of [
    "traxsource",
    "spotify",
    "beatport",
    "apple_music",
    "appleMusic",
    "youtube",
    "soundcloud",
  ]) {
    const value = links[key];
    const directUrl = asPublicUrl(value);

    if (directUrl) {
      return directUrl;
    }

    const nestedUrl = asPublicUrl(asObject(value)?.url);

    if (nestedUrl) {
      return nestedUrl;
    }
  }

  return catalogUrl;
}

function releasePreviewUrl(row: Record<string, unknown>): string | undefined {
  const links = asObject(row.dsp_links);
  const directUrl =
    asPublicUrl(row.previewUrl) ??
    asPublicUrl(row.preview_url) ??
    asPublicUrl(row.audio_preview_url);

  if (directUrl) {
    return directUrl;
  }

  for (const key of ["preview_url", "previewUrl", "audioPreviewUrl"]) {
    const value = links?.[key];
    const nestedUrl = asPublicUrl(value) ?? asPublicUrl(asObject(value)?.url);

    if (nestedUrl) {
      return nestedUrl;
    }
  }

  return undefined;
}

function displayDate(date: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const parsed = new Date(date + "T00:00:00Z");

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(parsed)
    .toLocaleUpperCase("en-ZA");
}

function normalizeRelease(value: unknown): CatalogRelease | null {
  const row = asObject(value);

  if (!row) {
    return null;
  }

  const title = asText(row.title);
  const artist = asText(row.artist_name);
  const dateTime = asText(row.release_date);
  const date = dateTime ? displayDate(dateTime) : null;

  if (!title || !artist || !dateTime || !date) {
    return null;
  }

  const code = asText(row.catalog_number) ?? "LUKULU";
  const stableTitle = title
    .toLocaleLowerCase("en-ZA")
    .replace(/[^a-z0-9]+/g, "-");

  return {
    id: code === "LUKULU" ? stableTitle + "-" + dateTime : code,
    title,
    artist,
    date,
    dateTime,
    code,
    href: releaseHref(row.dsp_links),
    previewUrl: releasePreviewUrl(row),
  };
}

function mergeReleases(releases: CatalogRelease[]): CatalogRelease[] {
  const merged = [...releases, ...fallbackCatalog.releases];
  const seen = new Set<string>();

  return merged
    .filter((release) => {
      const key = release.id + "|" + release.title.toLocaleLowerCase("en-ZA");

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 3);
}

function mergeArtists(releases: CatalogRelease[]): CatalogArtist[] {
  const liveArtists = releases.map((release) => ({
    id: release.artist
      .toLocaleLowerCase("en-ZA")
      .replace(/[^a-z0-9]+/g, "-"),
    name: release.artist,
    href: release.href,
  }));
  const seen = new Set<string>();

  return [...liveArtists, ...fallbackCatalog.artists]
    .filter((artist) => {
      const key = artist.name.toLocaleLowerCase("en-ZA");

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 8);
}

export function normalizePublicCatalog(value: unknown): PublicCatalog {
  const normalized = Array.isArray(value)
    ? value
        .map(normalizeRelease)
        .filter((release): release is CatalogRelease => release !== null)
    : [];

  if (normalized.length === 0) {
    return fallbackCatalog;
  }

  return catalogFromReleases(normalized, "supabase");
}

export function catalogFromReleases(
  releases: CatalogRelease[],
  source: PublicCatalog["source"],
): PublicCatalog {
  if (releases.length === 0) {
    return fallbackCatalog;
  }

  return {
    releases: mergeReleases(releases),
    artists: mergeArtists(releases),
    source,
  };
}
