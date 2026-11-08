"use client";

import { useEffect, useMemo, useState } from "react";
import {
  storeCategories,
  storeConcepts,
  type StoreCategory,
  type StorePayload,
  type StoreProduct,
} from "./store-data";

const currency = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 2,
});

type CategoryFilter = "All tools" | StoreCategory;

export default function Storefront({ compact = false }: { compact?: boolean }) {
  const [products, setProducts] = useState<StoreProduct[]>(storeConcepts);
  const [source, setSource] = useState<StorePayload["source"]>("preview");
  const [filter, setFilter] = useState<CategoryFilter>("All tools");

  useEffect(() => {
    let mounted = true;
    async function loadStore() {
      try {
        const response = await fetch("/api/store", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;
        const payload = (await response.json()) as StorePayload;
        if (!mounted || !Array.isArray(payload.products) || !payload.products.length) return;
        setProducts(payload.products);
        setSource(payload.source === "connected" ? "connected" : "preview");
      } catch {
        // Show the clearly marked roadmap until a product feed is available.
      }
    }
    void loadStore();
    return () => { mounted = false; };
  }, []);

  const shown = useMemo(
    () => products.filter((product) => filter === "All tools" || product.category === filter),
    [filter, products],
  );

  const displayed = compact ? products.slice(0, 4) : shown;

  return (
    <div className="storefront" data-store-source={source}>
      <div className="store-toolbar">
        <p>
          <span className="store-status-dot" aria-hidden="true" />
          {source === "connected" ? "Connected product catalog" : "Product roadmap — not yet for sale"}
        </p>
        {!compact ? (
          <div className="store-filters" aria-label="Filter production tools">
            {(["All tools", ...storeCategories] as CategoryFilter[]).map((category) => (
              <button
                type="button"
                key={category}
                className={filter === category ? "is-active" : ""}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <a className="store-all-link" href="/store">Explore the store <span aria-hidden="true">↗</span></a>
        )}
      </div>
      <div className="store-grid">
        {displayed.map((product, index) => {
          const ready =
            product.status === "available" &&
            product.checkoutUrl !== null &&
            product.priceZar !== null;
          const subject = encodeURIComponent("Lukulu Store: " + product.name);
          return (
            <article className="store-product" key={product.id}>
              <div className="store-product-top">
                <span className="store-product-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="store-product-icon" aria-hidden="true">
                  {product.category === "VST Plugins" ? "◉" :
                   product.category === "FL Studio Scripts" ? "⌘" :
                   product.category === "Production Apps" ? "▤" : "◇"}
                </span>
              </div>
              <p className="store-product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="store-product-description">{product.description}</p>
              {product.compatibility ? <p className="store-compatibility">{product.compatibility}</p> : null}
              <div className="store-product-bottom">
                <span className="store-product-price">
                  {ready ? currency.format(product.priceZar!) : "Coming soon"}
                </span>
                {ready ? (
                  <a href={product.checkoutUrl!} target="_blank" rel="noopener noreferrer">
                    Buy now <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <a href={"mailto:lukulurecordings@gmail.com?subject=" + subject}>
                    Enquire <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {!displayed.length ? <p className="store-empty">No tools in this category yet. Check back for updates.</p> : null}
      {!compact ? (
        <p className="store-footnote">
          Only products with a configured secure checkout link and ZAR price can be purchased.
          Digital downloads, licensing and support details will be provided with each released product.
        </p>
      ) : null}
    </div>
  );
}
