export const catalogUrl =
  "https://www.traxsource.com/label/53294/lukulu-recordings";

export const beatportLabelUrl =
  "https://www.beatport.com/label/lukulu-recordings/53294";

export const beatportGreenroomLabel = {
  id: 12524,
  resourceId: 90528,
  type: "Label",
  name: "Lukulu Recordings",
};

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
    href: beatportLabelUrl,
  },
  {
    id: "beatport-malupha-2026-07-01",
    title: "Malupha",
    artist: "DJ Mukumu & DJ Nastor",
    date: "01 JUL 2026",
    dateTime: "2026-07-01",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-plastic-thunder-2026-06-26",
    title: "Plastic Thunder",
    artist: "Da Cord",
    date: "26 JUN 2026",
    dateTime: "2026-06-26",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-a-zulu-man-2026-06-19",
    title: "A zulu man",
    artist: "DJ Nastor & Crash Zulu",
    date: "19 JUN 2026",
    dateTime: "2026-06-19",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-unauthorized-2026-06-19",
    title: "Unauthorized",
    artist: "Lukulu & Vorn Annunaki",
    date: "19 JUN 2026",
    dateTime: "2026-06-19",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-faces-2026-06-19",
    title: "Faces",
    artist: "DJ Nastor & Lukulu",
    date: "19 JUN 2026",
    dateTime: "2026-06-19",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-mtaka-2026-06-19",
    title: "Mtaka",
    artist: "Mah Marvin & Da Cord",
    date: "19 JUN 2026",
    dateTime: "2026-06-19",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-deep-deep-2026-06-15",
    title: "Deep Deep",
    artist: "Dubnakave",
    date: "15 JUN 2026",
    dateTime: "2026-06-15",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-trooth-2026-06-12",
    title: "Trooth",
    artist: "DJ Nastor",
    date: "12 JUN 2026",
    dateTime: "2026-06-12",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-inhliziyo-dj-nastor-dubnakave-2026-06-05",
    title: "Inhliziyo",
    artist: "DJ Nastor & Dubnakave",
    date: "05 JUN 2026",
    dateTime: "2026-06-05",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-ilanga-ii-2026-06-01",
    title: "Ilanga (II)",
    artist: "Tyro & DJ Nastor",
    date: "01 JUN 2026",
    dateTime: "2026-06-01",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-massive-2026-06-01",
    title: "Massive",
    artist: "DJ Nastor",
    date: "01 JUN 2026",
    dateTime: "2026-06-01",
    code: "GREENROOM",
    href: beatportLabelUrl,
    previewUrl: "/audio/dj-nastor-massive.mp3",
  },
  {
    id: "beatport-follow-the-sign-2026-05-29",
    title: "Follow the sign",
    artist: "DJ Nastor & Lukulu",
    date: "29 MAY 2026",
    dateTime: "2026-05-29",
    code: "GREENROOM",
    href: beatportLabelUrl,
    previewUrl: "/audio/dj-nastor-follow-the-sign.mp3",
  },
  {
    id: "beatport-phezulu-2026-05-22",
    title: "Phezulu",
    artist: "DJ Mbuso, DJ Nastor & The Skyscraper",
    date: "22 MAY 2026",
    dateTime: "2026-05-22",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-goodtime-2026-05-22",
    title: "Goodtime",
    artist: "DJ Nastor",
    date: "22 MAY 2026",
    dateTime: "2026-05-22",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-sunday-2026-05-22",
    title: "Sunday",
    artist: "DJ Nastor",
    date: "22 MAY 2026",
    dateTime: "2026-05-22",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-twelapele-2026-05-16",
    title: "Twelapele",
    artist: "DJ Nastor, Lukulu & Victor Matalane",
    date: "16 MAY 2026",
    dateTime: "2026-05-16",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-cheza-chini-2026-05-15",
    title: "Cheza chini",
    artist: "DJ Nastor",
    date: "15 MAY 2026",
    dateTime: "2026-05-15",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-mayeh-2026-05-09",
    title: "Mayeh",
    artist: "Lukulu",
    date: "09 MAY 2026",
    dateTime: "2026-05-09",
    code: "GREENROOM",
    href: beatportLabelUrl,
  },
  {
    id: "beatport-reach-deep-2026-05-08",
    title: "Reach Deep",
    artist: "DJ Nastor & Lukulu",
    date: "08 MAY 2026",
    dateTime: "2026-05-08",
    code: "GREENROOM",
    href: beatportLabelUrl,
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
    .slice(0, 20);
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
