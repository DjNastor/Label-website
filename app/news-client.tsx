"use client";

import { useEffect, useState } from "react";
import { fallbackNewsPayload, type NewsPayload } from "./news-data";

const refreshMs = 5 * 60 * 1000;
const rotationMs = 8000;

function formatDate(value: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Label update";
  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function NewsFeed() {
  const [payload, setPayload] = useState<NewsPayload>(fallbackNewsPayload);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [status, setStatus] = useState("Curated label highlights");

  useEffect(() => {
    let active = true;
    async function loadNews() {
      try {
        const response = await fetch("/api/news", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;

        const next = (await response.json()) as NewsPayload;
        if (!active || !Array.isArray(next.items) || !next.items.length) return;
        setPayload(next);
        setActiveIndex(0);
        setStatus(next.source === "aggregated"
          ? "Connected feeds · refreshes every 5 minutes"
          : "Curated label highlights · connect a feed for live news");
      } catch {
        if (active) setStatus("Curated label highlights · feeds currently unavailable");
      }
    }
    void loadNews();
    const refreshTimer = window.setInterval(() => void loadNews(), refreshMs);
    return () => { active = false; window.clearInterval(refreshTimer); };
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || payload.items.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % payload.items.length);
    }, rotationMs);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, payload.items.length]);

  const total = payload.items.length;
  const active = payload.items[Math.min(activeIndex, Math.max(0, total - 1))];
  if (!active) return null;

  function move(direction: 1 | -1) {
    setActiveIndex((current) => (current + direction + total) % total);
  }

  return (
    <div className="signal-carousel" data-news-source={payload.source}>
      <div className="signal-topline">
        <p>
          <span className="signal-dot" aria-hidden="true" />
          {payload.source === "aggregated" ? "Connected news" : "From Lukulu"}
        </p>
        <span>{status}</span>
      </div>
      <article className="signal-feature" key={active.id} aria-live="off">
        <div className="signal-feature-meta">
          <span>{active.type === "industry" ? "MUSIC TECH" : active.type === "release" ? "RELEASE" : active.type === "press" ? "FEATURE" : "LABEL NOTE"}</span>
          <time dateTime={active.publishedAt}>{formatDate(active.publishedAt)}</time>
        </div>
        <h3>{active.title}</h3>
        <p>{active.summary}</p>
        <a href={active.href} target="_blank" rel="noopener noreferrer">
          {active.source} <span aria-hidden="true">↗</span>
        </a>
      </article>
      <div className="signal-controls">
        <p aria-label={"Update " + (activeIndex + 1) + " of " + total}>
          {String(activeIndex + 1).padStart(2, "0")} <span>/</span> {String(total).padStart(2, "0")}
        </p>
        <div className="signal-control-buttons">
          <button type="button" onClick={() => move(-1)} disabled={total < 2} aria-label="Previous update">←</button>
          <button type="button" onClick={() => move(1)} disabled={total < 2} aria-label="Next update">→</button>
          <button type="button" onClick={() => setPaused((value) => !value)} disabled={total < 2 || reducedMotion}>
            {paused ? "Resume" : reducedMotion ? "Manual" : "Pause"} rotation
          </button>
        </div>
      </div>
    </div>
  );
}
