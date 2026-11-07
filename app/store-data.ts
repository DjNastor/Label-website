export const storeCategories = [
  "VST Plugins",
  "FL Studio Scripts",
  "Production Apps",
  "Studio Tech",
] as const;

export type StoreCategory = (typeof storeCategories)[number];

export type StoreProduct = {
  id: string;
  name: string;
  category: StoreCategory;
  description: string;
  status: "coming_soon" | "available";
  priceZar: number | null;
  checkoutUrl: string | null;
  compatibility?: string;
};

export type StorePayload = {
  source: "connected" | "preview";
  products: StoreProduct[];
  updatedAt: string;
};

// These are roadmap categories, not finished goods or items for sale.
export const storeConcepts: StoreProduct[] = [
  {
    id: "vst-lab",
    name: "Lukulu VST Lab",
    category: "VST Plugins",
    description: "Original instruments and effects for producers. Product releases will appear here once they're ready.",
    status: "coming_soon",
    priceZar: null,
    checkoutUrl: null,
    compatibility: "Formats and DAW compatibility to be confirmed",
  },
  {
    id: "fl-workflow",
    name: "FL Studio Workflow Scripts",
    category: "FL Studio Scripts",
    description: "Workflow helpers for making music faster, including future scripting and control tools.",
    status: "coming_soon",
    priceZar: null,
    checkoutUrl: null,
    compatibility: "FL Studio compatibility to be confirmed",
  },
  {
    id: "producer-apps",
    name: "Lukulu Producer Apps",
    category: "Production Apps",
    description: "Creative utilities for organising sessions, sounds and everyday studio tasks.",
    status: "coming_soon",
    priceZar: null,
    checkoutUrl: null,
    compatibility: "Platforms and requirements to be confirmed",
  },
  {
    id: "studio-tech",
    name: "Studio Tech",
    category: "Studio Tech",
    description: "A future collection of practical digital studio tools and music technology.",
    status: "coming_soon",
    priceZar: null,
    checkoutUrl: null,
  },
];

export function publicStoreProduct(value: unknown): StoreProduct | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const id = typeof row.id === "string" ? row.id.trim().slice(0, 80) : "";
  const name = typeof row.name === "string" ? row.name.trim().slice(0, 100) : "";
  const description =
    typeof row.description === "string" ? row.description.trim().slice(0, 360) : "";
  const category = storeCategories.find((entry) => entry === row.category);
  if (!id || !name || !category || !description) return null;

  const rawCheckout = typeof row.checkoutUrl === "string" ? row.checkoutUrl : "";
  let checkoutUrl: string | null = null;
  try {
    const url = new URL(rawCheckout);
    if (url.protocol === "https:") checkoutUrl = url.toString();
  } catch {
    // Never expose malformed checkout links to buyers.
  }

  const price =
    typeof row.priceZar === "number" && Number.isFinite(row.priceZar) &&
    row.priceZar > 0 && row.priceZar <= 1000000
      ? Math.round(row.priceZar * 100) / 100
      : null;
  const available =
    row.status === "available" && checkoutUrl !== null && price !== null;

  return {
    id,
    name,
    category,
    description,
    status: available ? "available" : "coming_soon",
    checkoutUrl: available ? checkoutUrl : null,
    priceZar: available ? price : null,
    compatibility:
      typeof row.compatibility === "string"
        ? row.compatibility.trim().slice(0, 160)
        : undefined,
  };
}
