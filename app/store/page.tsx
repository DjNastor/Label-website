import type { Metadata } from "next";
import Storefront from "../store-client";

export const metadata: Metadata = {
  title: "Lukulu Store — Music Production Tools",
  description:
    "Discover original Lukulu Recordings VST plugins, FL Studio scripts, producer apps and studio technology.",
};

export default function StorePage() {
  return (
    <main className="store-page" id="main-content">
      <header className="store-page-header">
        <a href="/" className="store-return">← Lukulu Recordings</a>
        <span className="mini-label">TOOLS FOR MAKERS</span>
        <h1>THE LUKULU <em>STORE.</em></h1>
        <p>
          Production-first tools built around creativity, rhythm and better
          studio workflows. Browse our roadmap and released products.
        </p>
        <a className="store-page-music-link" href="/#releases">Explore Lukulu music ↗</a>
      </header>
      <section aria-label="Browse music production products">
        <Storefront />
      </section>
      <footer className="store-page-footer">
        <p>© 2026 Lukulu Recordings · South Africa</p>
        <a href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Store%20support">
          Store enquiries ↗
        </a>
      </footer>
    </main>
  );
}
