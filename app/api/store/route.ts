import { publicStoreProduct, storeConcepts, type StorePayload } from "../../store-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const configuredUrl = process.env.STORE_CATALOG_URL;
  const products = configuredUrl ? await getConfiguredProducts(configuredUrl) : [];
  const payload: StorePayload = {
    source: products.length ? "connected" : "preview",
    products: products.length ? products : storeConcepts,
    updatedAt: new Date().toISOString(),
  };

  return Response.json(payload, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=900" },
  });
}

async function getConfiguredProducts(urlText: string) {
  let url: URL;
  try {
    url = new URL(urlText);
    if (url.protocol !== "https:") return [];
  } catch {
    return [];
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) return [];
    const parsed = (await response.json()) as unknown;
    const rows = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object" && "products" in parsed
        ? (parsed as { products: unknown }).products
        : [];
    if (!Array.isArray(rows)) return [];

    const seen = new Set<string>();
    return rows
      .slice(0, 80)
      .map(publicStoreProduct)
      .filter((product) => {
        if (!product || seen.has(product.id)) return false;
        seen.add(product.id);
        return true;
      })
      .slice(0, 40);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
