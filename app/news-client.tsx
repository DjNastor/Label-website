"use client";

import { useEffect, useState } from "react";

import { fallbackNewsPayload, type NewsPayload } from "./news-data";

const refreshMs = 5 * 60 * 1000;

export default function NewsFeed() {
  const [payload, setPayload] = useState<NewsPayload>(fallbackNewsPayload);
  const [status, setStatus] = useState("Checking connected news sources...");

  useEffect(() => {
    let active = true;

    async function loadNews() {
      try {
        const response = await fetch("/api/news", {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("News route returned " + response.status);
        }

        const nextPayload = (await response.json()) as NewsPayload;
        if (!active) return;

        setPayload(nextPayload);
        setStatus(
          nextPayload.source === "aggregated"
            ? "Auto-refreshing from connected sources."
            : "Using curated fallback until social and press feeds are connected.",
        );
      } catch {
        if (!active) return;

        setPayload(fallbackNewsPayload());
        setStatus("Using curated fallback until live feeds are reachable.");
      }
    }

    void loadNews();
    const interval = window.setInterval(loadNews, refreshMs);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="news-shell" data-news-source={payload.source}>
      <div className="news-status">
        <span>{payload.source === "aggregated" ? "Live" : "Fallback"}</span>
        <p>{status}</p>
      </div>
      <div className="news-grid">
        {payload.items.map((item) => (
          <article className="news-card" key={item.id}>
            <time dateTime={item.publishedAt}>
              {new Intl.DateTimeFormat("en-ZA", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(item.publishedAt))}
            </time>
            <p>{item.type}</p>
            <h3>{item.title}</h3>
            <span>{item.summary}</span>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.source}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
