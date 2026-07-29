import type { Metadata } from "next";
import Link from "next/link";
import { sceneLabels } from "../labels-data";

export const metadata: Metadata = {
  title: "Afro House Labels | Lukulu Recordings",
  description: "Discover the labels, artists and sounds shaping Afro House worldwide.",
  alternates: { canonical: "/labels" },
};

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function LabelsPage() {
  const featured = sceneLabels.slice(0, 3);
  const sounds = sceneLabels.slice(3, 7);
  return <main className="labels-simple">
    <nav className="simple-nav" aria-label="Label guide navigation">
      <Link href="/" className="simple-logo">LUKULU <span>RECORDINGS</span></Link>
      <div><a href="#about">About</a><a href="#sounds">Sounds</a><a href="#submit">Submit</a></div>
      <Link className="simple-nav-cta" href="/">Visit Lukulu <Arrow /></Link>
    </nav>

    <header className="simple-hero" id="about">
      <p className="simple-kicker">A guide by Lukulu Recordings</p>
      <h1>Afro House<br /><em>together.</em></h1>
      <p className="simple-intro">A small selection of labels and artists carrying African electronic music from home to everywhere.</p>
      <a className="simple-scroll" href="#sounds">Explore the sounds <span aria-hidden="true">↓</span></a>
    </header>

    <section className="simple-featured" aria-labelledby="featured-title">
      <div className="simple-heading"><p className="simple-kicker">01 / Selected labels</p><h2 id="featured-title">The movement<br /><em>in motion.</em></h2></div>
      <div className="simple-featured-list">{featured.map((label, index) => <a className="simple-label-row" href={label.website || label.platform || "#sounds"} target="_blank" rel="noreferrer" key={label.name}><span>0{index + 1}</span><strong>{label.name}</strong><small>{label.region}</small><b aria-hidden="true">↗</b></a>)}</div>
    </section>

    <section className="simple-sounds" id="sounds" aria-labelledby="sounds-title">
      <div className="simple-heading"><p className="simple-kicker">02 / Sounds of the scene</p><h2 id="sounds-title">Follow the<br /><em>frequency.</em></h2></div>
      <div className="simple-sound-grid">{sounds.map((label) => <article className="simple-sound" key={label.name}><p>{label.region}</p><h3>{label.name}</h3><div>{label.artists.map((artist) => <span key={artist}>{artist}</span>)}</div><a href={label.website || label.platform || "#"} target="_blank" rel="noreferrer">Discover <Arrow /></a></article>)}</div>
    </section>

    <section className="simple-submit" id="submit" aria-labelledby="submit-title"><div><p className="simple-kicker">03 / For artists</p><h2 id="submit-title">Bring your<br /><em>sound.</em></h2><p>Make the record undeniable. For demos to Lukulu, use the LabelRadar portal.</p></div><a className="button button-primary" href="https://www.labelradar.com/labels/LukuluRecordings/portal" target="_blank" rel="noreferrer">Submit a demo <Arrow /></a></section>
    <footer className="simple-footer"><Link href="/">LUKULU RECORDINGS</Link><span>South Africa · Afro House · Music without borders</span></footer>
  </main>;
}
