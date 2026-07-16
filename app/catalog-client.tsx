"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  fallbackCatalog,
  normalizePublicCatalog,
  type PublicCatalog,
} from "./catalog";
import { publicCatalogConfig } from "./catalog-config";

const CatalogContext = createContext<PublicCatalog>(fallbackCatalog);
const publicReleaseColumns = [
  "title",
  "artist_name",
  "catalog_number",
  "release_date",
  "genre",
  "status",
  "dsp_links",
  "is_public",
  "smartlink_slug",
].join(",");

export async function fetchPublicCatalog(
  fetcher: typeof fetch = fetch,
  timeoutMs = 5000,
): Promise<PublicCatalog> {
  const endpoint = new URL("/rest/v1/releases", publicCatalogConfig.url);
  endpoint.searchParams.set("select", publicReleaseColumns);
  endpoint.searchParams.set("is_public", "eq.true");
  endpoint.searchParams.set("order", "release_date.desc.nullslast");
  endpoint.searchParams.set("limit", "50");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(endpoint, {
      headers: {
        Accept: "application/json",
        apikey: publicCatalogConfig.publishableKey,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return fallbackCatalog;
    }

    return normalizePublicCatalog(await response.json());
  } catch {
    return fallbackCatalog;
  } finally {
    clearTimeout(timeout);
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<PublicCatalog>(fallbackCatalog);

  useEffect(() => {
    let active = true;

    void fetchPublicCatalog().then((nextCatalog) => {
      if (active && nextCatalog.source === "supabase") {
        setCatalog(nextCatalog);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <CatalogContext.Provider value={catalog}>
      {children}
    </CatalogContext.Provider>
  );
}

export function ReleaseList() {
  const catalog = useContext(CatalogContext);

  return (
    <div className="release-list" data-catalog-source={catalog.source}>
      {catalog.releases.map((release, index) => (
        <a
          className="release-row"
          href={release.href}
          target="_blank"
          rel="noreferrer"
          key={release.id}
          aria-label={release.title + " by " + release.artist}
        >
          <span className="release-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <time className="release-date" dateTime={release.dateTime}>
            {release.date}
          </time>
          <span className="release-info">
            <strong>{release.title}</strong>
            <small>{release.artist}</small>
          </span>
          <span className="release-code">{release.code}</span>
          <span className="play" aria-hidden="true">
            &#9654;
          </span>
        </a>
      ))}
    </div>
  );
}

export function ArtistList() {
  const catalog = useContext(CatalogContext);

  return (
    <div className="artist-list" data-catalog-source={catalog.source}>
      {catalog.artists.map((artist, index) => (
        <a
          href={artist.href}
          target="_blank"
          rel="noreferrer"
          key={artist.id}
          aria-label={artist.name + " on a music platform"}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{artist.name}</strong>
          <b aria-hidden="true">↗</b>
        </a>
      ))}
    </div>
  );
}
