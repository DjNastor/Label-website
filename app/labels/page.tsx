import type { Metadata } from "next";
import Link from "next/link";
import { sceneLabels } from "../labels-data";

export const metadata: Metadata = {
  title: "Afro House Labels | Lukulu Recordings",
  description: "A curated guide to Afro House labels, artists and platforms shaping the sound worldwide.",
  alternates: { canonical: "/labels" },
};

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function LabelsPage() {
  const featured = sceneLabels.filter((label) => label.featured);
  const others = sceneLabels.filter((label) => !label.featured);
  return <main className="labels-page">
    <header className="labels-header">
      <Link className="labels-back" href="/">← Lukulu Recordings</Link>
      <p className="eyebrow"><span /> Scene guide</p>
      <h1>Labels shaping<br /><em>Afro House.</em></h1>
      <p className="labels-lede">A starting point for discovering the imprints, artists and communities moving African electronic music forward.</p>
    </header>
    <section className="labels-featured" aria-labelledby="featured-title">
      <div className="labels-section-heading"><p className="mini-label">01 / FOUNDATIONS</p><h2 id="featured-title">Start with the essentials.</h2></div>
      <div className="label-grid label-grid-featured">{featured.map((label) => <LabelCard key={label.name} label={label} featured />)}</div>
    </section>
    <section className="labels-directory" aria-labelledby="directory-title">
      <div className="labels-section-heading"><p className="mini-label">02 / DIRECTORY</p><h2 id="directory-title">Follow the sound.</h2><p>Explore labels by place, philosophy and the artists in their orbit.</p></div>
      <div className="label-grid">{others.map((label) => <LabelCard key={label.name} label={label} />)}</div>
    </section>
    <section className="labels-submit" aria-labelledby="submit-title">
      <div><p className="eyebrow eyebrow-light"><span /> For artists</p><h2 id="submit-title">Ready to send your sound?</h2><p>Study the catalogue, make the record undeniable, and follow each label’s own submission route. For demos to Lukulu, use our LabelRadar portal.</p></div>
      <a className="button button-primary" href="https://www.labelradar.com/labels/LukuluRecordings/portal" target="_blank" rel="noreferrer">Submit to Lukulu <Arrow /></a>
    </section>
    <footer className="labels-footer"><Link href="/">LUKULU RECORDINGS</Link><span>Editorial guide · Links open on external platforms</span></footer>
  </main>;
}

function LabelCard({ label, featured = false }: { label: (typeof sceneLabels)[number]; featured?: boolean }) {
  return <article className={`label-card${featured ? " label-card-featured" : ""}`}>
    <div className="label-card-top"><span className="label-index">{String(sceneLabels.indexOf(label) + 1).padStart(2, "0")}</span><span className="label-region">{label.region}</span></div>
    <h3>{label.name}</h3><p>{label.description}</p>
    <div className="label-artists">{label.artists.map((artist) => <span key={artist}>{artist}</span>)}</div>
    <div className="label-links">{label.website && <a href={label.website} target="_blank" rel="noreferrer">Website <Arrow /></a>}{label.platform && <a href={label.platform} target="_blank" rel="noreferrer">Listen <Arrow /></a>}</div>
  </article>;
}
