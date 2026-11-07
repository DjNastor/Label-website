/* eslint-disable @next/next/no-img-element */

import MobileMenu from "./mobile-menu";
import { AudioPreviewProvider, PreviewPlayer } from "./audio-preview-player";
import { CatalogProvider, ReleaseList } from "./catalog-client";
import MusicExperience from "./music-experience";
import Storefront from "./store-client";
import NewsFeed from "./news-client";

const catalogUrl = "https://www.traxsource.com/label/53294/lukulu-recordings";
const beatportUrl = "https://www.beatport.com/label/lukulu-recordings/53294";
const labelRadarUrl = "https://www.labelradar.com/labels/LukuluRecordings/portal";
const spotifyPlaylistUrl =
  "https://open.spotify.com/playlist/6skrxjmzEL0trnVnysbDdW";

const proofPoints = [
  { value: "2012", label: "Founded in Ladysmith" },
  { value: "Independent", label: "Music label & creative studio" },
  { value: "3", label: "Core sounds: Afro House, Afro-Tech, 3-Step" },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <AudioPreviewProvider>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Lukulu Recordings home">
          <img
            src="/assets/lukulu-silver-mark.jpg"
            alt=""
            width="400"
            height="400"
          />
          <span>
            <strong>LUKULU</strong>
            <small>RECORDINGS</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#releases">Releases</a>
          <a href="#news">Updates</a>
          <a href="#store">Store</a>
          <a href="#submissions">Submit</a>
          <a href="#about">About</a>
        </nav>

        <a
          className="header-cta"
          href={labelRadarUrl}
          target="_blank"
          rel="noreferrer"
        >
          Send a demo <ExternalArrow />
        </a>

        <MobileMenu />
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span /> Ladysmith &middot; South Africa
            </p>

            <h1 id="hero-title">
              Rooted in <em>rhythm.</em>
              <br />
              Built for the <em>world.</em>
            </h1>

            <p className="hero-intro">
              Independent Afro House, Afro-Tech and 3-Step from Ladysmith,
              South Africa — carrying African soul, modern electronic energy and
              dance-floor purpose to DJs, listeners and global stages.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#releases">
                Explore the catalog <span aria-hidden="true">&darr;</span>
              </a>
              <a
                className="button button-ghost"
                href={spotifyPlaylistUrl}
                target="_blank"
                rel="noreferrer"
              >
                Listen on Spotify <ExternalArrow />
              </a>
            </div>

            <div className="sound-tags" aria-label="Label genres">
              <span>AFRO HOUSE</span>
              <span>AFRO-TECH</span>
              <span>3-STEP</span>
            </div>

            <dl className="hero-proof" aria-label="Lukulu Recordings highlights">
              {proofPoints.map((point) => (
                <div key={point.label}>
                  <dt>{point.value}</dt>
                  <dd>{point.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="hero-art">
            <span className="hero-catalog" aria-hidden="true">
              LR &middot; EST. 2012
            </span>
            <div className="hero-frame">
              <div className="hero-vinyl-ring" aria-hidden="true" />
              <img
                src="/assets/lukulu-silver-mark.jpg"
                alt="Silver metallic Lukulu Africa mark with a speaker and African instruments"
                width="400"
                height="400"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>THE SOUND OF</span>
              <strong>
                AFRICA
                <br />
                IN MOTION
              </strong>
            </figcaption>
          </figure>
        </section>

        <div className="rhythm-strip" aria-hidden="true">
          <div className="rhythm-track">
            {[0, 1].map((group) => (
              <div className="rhythm-group" key={group}>
                <span>AFRO HOUSE</span>
                <b>&#9670;</b>
                <span>AFRO-TECH</span>
                <b>&#9670;</b>
                <span>SOUTH AFRICA</span>
                <b>&#9670;</b>
                <span>LUKULU RECORDINGS</span>
                <b>&#9670;</b>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky-rail">
          <a href="#top" className="sticky-brand" aria-label="Back to top">
            LUKULU <span>REC.</span>
          </a>
          <nav aria-label="Sticky navigation">
            <a href="#releases">Releases</a>
            <a href="#news">Updates</a>
            <a href="#store">Store</a>
            <a href="#submissions">Submit</a>
            <a href="#about">About</a>
            </nav>
          <a
            className="sticky-demo"
            href={labelRadarUrl}
            target="_blank"
            rel="noreferrer"
          >
            Send a demo <ExternalArrow />
          </a>
        </div>

        <section className="section releases" id="releases">
          <div className="section-heading">
            <p className="eyebrow">
              <span /> From the catalog
            </p>
            <h2>Latest from the catalog</h2>
            <p>
              Explore recent Lukulu Recordings releases across Afro House,
              Afro-Tech and 3-Step — built for deep listening, radio support
              and dance-floor movement.
            </p>
            <a href={catalogUrl} target="_blank" rel="noreferrer">
              Listen to recent releases <ExternalArrow />
            </a>
            <a href="/labels">Explore Afro House labels <ExternalArrow /></a>
          </div>

          <div className="release-layout">
            <CatalogProvider>
              <ReleaseList />
            </CatalogProvider>

            <aside className="coming-next" aria-labelledby="catalog-spotlight-title">
              <p className="mini-label">CATALOG SPOTLIGHT</p>
              <div className="coming-main">
                <span className="coming-meta">LUKULU SELECTS</span>
                <h3 id="catalog-spotlight-title">
                  LOST
                  <br />
                  IN A DREAM
                </h3>
                <p>DJ NASTOR</p>
              </div>
              <div className="coming-footer">
                <span>Discover the catalog</span>
                <a href={catalogUrl} target="_blank" rel="noreferrer">
                  Listen now <ExternalArrow />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="section highlights" id="listen" aria-labelledby="sounds-title">
          <div className="section-heading section-heading-compact">
            <p className="eyebrow">
              <span /> Listen first
            </p>
            <h2 id="sounds-title">Selected sounds</h2>
          </div>

          <MusicExperience catalogUrl={catalogUrl} spotifyUrl={spotifyPlaylistUrl} />
        </section>

        <section className="section lukulu-store" id="store" aria-labelledby="store-title">
          <div className="section-heading section-heading-compact">
            <p className="eyebrow"><span /> Made for producers</p>
            <h2 id="store-title">Lukulu Store</h2>
            <p>
              VST instruments, FL Studio scripts, producer apps and music tech.
              Browse the product roadmap and future releases in one place.
            </p>
          </div>
          <Storefront compact />
        </section>

        <section className="section signal-news" id="news" aria-labelledby="news-title">
          <div className="section-heading section-heading-compact">
            <p className="eyebrow"><span /> The signal</p>
            <h2 id="news-title">Updates</h2>
            <p>Short updates from the label, refreshed from connected sources whenever available.</p>
          </div>
          <NewsFeed />
        </section>

        <section className="story" id="about">
          <div className="story-art">
            <div className="story-pattern-crop">
              <img
                src="/assets/lukulu-textile-wordmark.jpg"
                alt="Lukulu wordmark over richly colored African textile artwork"
                width="1200"
                height="630"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="story-pattern-field" aria-hidden="true">
              <span className="story-index">EST &middot; 2012</span>
              <span className="story-place">LADYSMITH</span>
              <strong>
                AFRICAN ROOTS
                <br />
                ELECTRONIC PULSE
              </strong>
            </div>
          </div>

          <div className="story-copy">
            <p className="eyebrow eyebrow-light">
              <span /> Our story
            </p>
            <h2>
              From Ladysmith
              <br />
              to global dance floors.
            </h2>
            <p>
              Lukulu Recordings was founded in Ladysmith, South Africa, with a
              clear purpose: to carry African-rooted electronic music beyond
              borders. The label champions producers, vocalists and collaborators
              creating music with identity, groove and emotional depth.
            </p>
            <blockquote>
              &ldquo;African roots. Electronic pulse. Music without
              borders.&rdquo;
            </blockquote>
            <div className="story-links">
              <a href={catalogUrl} target="_blank" rel="noreferrer">
                Traxsource <ExternalArrow />
              </a>
              <a href={beatportUrl} target="_blank" rel="noreferrer">
                Beatport <ExternalArrow />
              </a>
              <a
                href={spotifyPlaylistUrl}
                target="_blank"
                rel="noreferrer"
              >
                Spotify <ExternalArrow />
              </a>
            </div>
          </div>
        </section>

        <section
          className="submission-portal"
          id="submissions"
          aria-labelledby="submissions-title"
        >
          <div className="submission-copy">
            <p className="eyebrow eyebrow-light">
              <span /> Demo portal
            </p>
            <h2 id="submissions-title">Send your sound to Lukulu.</h2>
            <p>
              We accept unreleased Afro House, Afro-Tech and 3-Step demos through
              LabelRadar. Send focused music with strong rhythm, clear identity
              and a release vision.
            </p>
            <div className="demo-brief" aria-label="Demo submission checklist">
              <span className="demo-brief-kicker">Before you send</span>
              <ul>
                <li>
                  <strong>Unreleased music only</strong>
                  <span>No public links, bootlegs or uncleared samples.</span>
                </li>
                <li>
                  <strong>Label fit matters</strong>
                  <span>Afro House, Afro-Tech and 3-Step with a clear groove.</span>
                </li>
                <li>
                  <strong>Context helps</strong>
                  <span>Include credits, collaborators, story and release plan.</span>
                </li>
              </ul>
            </div>
            <div className="story-links">
              <a href={labelRadarUrl} target="_blank" rel="noreferrer">
                Submit through LabelRadar <ExternalArrow />
              </a>
              <a href={catalogUrl} target="_blank" rel="noreferrer">
                Study the catalog <ExternalArrow />
              </a>
            </div>
          </div>
          <div
            className="portal-frame"
            aria-label="Lukulu Recordings LabelRadar Portal"
          >
            <iframe
              title="Lukulu Recordings LabelRadar Portal"
              src={labelRadarUrl}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="portal-fallback">
              <strong>LabelRadar portal</strong>
              <span>
                Embedded preview may be blocked by LabelRadar security headers.
              </span>
              <a href={labelRadarUrl} target="_blank" rel="noreferrer">
                Launch portal <ExternalArrow />
              </a>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <img
            src="/assets/lukulu-wood-mark.jpg"
            alt="Wooden Lukulu Africa mark with a speaker and drum"
            width="400"
            height="400"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="eyebrow eyebrow-light">
              <span /> Work with us
            </p>
            <h2>Work with us.</h2>
            <p>
              For licensing, collaborations, press, bookings, catalog opportunities
              and label business, contact the Lukulu Recordings team directly.
            </p>
          </div>
          <a
            className="contact-button"
            href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Recordings%20enquiry"
          >
            lukulurecordings@gmail.com <ExternalArrow />
          </a>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>LUKULU RECORDINGS</strong>
          <span>Ladysmith &middot; South Africa</span>
        </div>
        <div className="footer-links">
          <a
            href="https://www.instagram.com/lukulurecordings"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a href={spotifyPlaylistUrl} target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a href={catalogUrl} target="_blank" rel="noreferrer">
            Traxsource
          </a>
          <a href={beatportUrl} target="_blank" rel="noreferrer">
            Beatport
          </a>
          <a href={labelRadarUrl} target="_blank" rel="noreferrer">
            LabelRadar
          </a>
        </div>
        <p>&copy; 2026 Lukulu Recordings</p>
      </footer>
      <PreviewPlayer />
    </AudioPreviewProvider>
  );
}
