export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  href: string;
  publishedAt: string;
  type: "release" | "press" | "social";
};

export type NewsPayload = {
  generatedAt: string;
  source: "fallback" | "aggregated";
  items: NewsItem[];
};

export const fallbackNews: NewsItem[] = [
  {
    id: "greenroom-catalog-sync",
    title: "Beatport Greenroom catalog snapshot added",
    summary:
      "The latest Lukulu Recordings Greenroom upload confirms the label account and expands the public release lane with the newest 2026 Beatport rows.",
    source: "Beatport Greenroom",
    href: "https://greenroom-app.beatport.com/music",
    publishedAt: "2026-07-16T14:45:00.000Z",
    type: "release",
  },
  {
    id: "release-amalangabi",
    title: "Amalangabi lands in the Lukulu release lane",
    summary:
      "DJ Nastor and Zamachunu Mchunu carry the newest Lukulu Recordings chapter with a warm, vocal-led Afro House release.",
    source: "Lukulu catalog",
    href: "https://www.traxsource.com/label/53294/lukulu-recordings",
    publishedAt: "2026-07-10T08:00:00.000Z",
    type: "release",
  },
  {
    id: "chart-winter-go2",
    title: "Winter GO2 keeps the selector energy moving",
    summary:
      "The label chart highlights club-ready records for Afro House and Afro-Tech DJs following the Lukulu sound.",
    source: "Traxsource",
    href: "https://www.traxsource.com/label/53294/lukulu-recordings",
    publishedAt: "2026-07-08T08:00:00.000Z",
    type: "press",
  },
  {
    id: "social-demo-call",
    title: "Demo lane open through LabelRadar",
    summary:
      "Artists can now route demos through the dedicated Lukulu Recordings LabelRadar portal for cleaner A&R review.",
    source: "LabelRadar",
    href: "https://www.labelradar.com/labels/LukuluRecordings/portal",
    publishedAt: "2026-07-01T08:00:00.000Z",
    type: "social",
  },
];

export function fallbackNewsPayload(): NewsPayload {
  return {
    generatedAt: new Date().toISOString(),
    source: "fallback",
    items: fallbackNews,
  };
}
