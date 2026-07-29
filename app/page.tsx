/* eslint-disable @next/next/no-img-element */

import MobileMenu from "./mobile-menu";
import { AudioPreviewProvider, PreviewPlayer } from "./audio-preview-player";
import { CatalogProvider, ReleaseList } from "./catalog-client";
import MusicExperience from "./music-experience";
import NewsFeed from "./news-client";

const catalogUrl = "https://www.traxsource.com/label/53294/lukulu-recordings";
const beatportUrl = "https://www.beatport.com/label/lukulu-recordings/53294";
const labelRadarUrl = "https://www.labelradar.com/labels/LukuluRecordings/portal";
const spotifyPlaylistUrl =
  "https://open.spotify.com/playlist/6skrxjmzEL0trnVnysbDdW";

const artists = [
  "DJ Nastor",
  "Dubnakave",
  "Vorn Annunaki",
  "Da Cord",
  "DJ Mukumu",
  "Quexdeep",
  "Lukulu",
  "Crash Zulu",
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
          <a href="#news">News</a>
          <a href="#artists">Artists</a>
          <a href="#submissions">Submit</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
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
              Independent Afro House and Afro-Tech from Ladysmith —
              shaped by African soul, modern electronic energy and dance-floor purpose.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#releases">
                Explore releases <span aria-hidden="true">&darr;</span>
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

            <dl className="label-dossier" aria-label="Lukulu label notes">
              <div>
                <dt>Base</dt>
                <dd>Ladysmith, ZA</dd>
              </div>
              <div>
                <dt>Catalog</dt>
                <dd>Afro House / Afro-Tech</dd>
              </div>
              <div>
                <dt>Send</dt>
                <dd>Unreleased demos only</dd>
              </div>
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
            <a href="#news">News</a>
            <a href="#artists">Artists</a>
            <a href="#submissions">Submit</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
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
              <span /> Fresh from Lukulu
            </p>
            <h2>Latest releases</h2>
            <p>
              A working release desk for new cuts, catalog staples and the next
              movement in the Lukulu story.
            </p>
            <div className="section-links" aria-label="Release links">
              <a href={catalogUrl} target="_blank" rel="noreferrer">
                View the full catalog <ExternalArrow />
              </a>
              <a href="/labels">Explore Afro House labels <ExternalArrow /></a>
            </div>
          </div>

          <div className="release-layout">
            <CatalogProvider>
              <ReleaseList />
            </CatalogProvider>

            <aside className="coming-next">
              <p className="mini-label">COMING NEXT</p>
              <div className="coming-main">
                <time dateTime="2026-07-20">
                  20 &middot; 07 &middot; 2026
                </time>
                <h3>
                  LOST
                  <br />
                  IN A DREAM
                </h3>
                <p>DJ NASTOR</p>
              </div>
              <div className="coming-footer">
                <span>Aba&apos;Belive</span>
                <time dateTime="2026-08-28">
                  28 &middot; 08 &middot; 2026
                </time>
              </div>
            </aside>
          </div>
        </section>

        <section className="section highlights" aria-labelledby="sounds-title">
          <div className="section-heading section-heading-compact">
            <p className="eyebrow">
              <span /> From the catalog
            </p>
            <h2 id="sounds-title">Selected sounds</h2>
          </div>

          <MusicExperience catalogUrl={catalogUrl} spotifyUrl={spotifyPlaylistUrl} />
        </section>

        <section className="section news" id="news" aria-labelledby="news-title">
          <div className="section-heading">
            <p className="eyebrow">
              <span /> Signal feed
            </p>
            <h2 id="news-title">News</h2>
            <a href="/api/news" target="_blank" rel="noreferrer">
              Live feed <ExternalArrow />
            </a>
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
              Lukulu Recordings is a South African independent label focused on
              quality Afro House and Afro-Tech. We release music with heritage,
              feeling and forward movement&mdash;sounds made to travel.
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

        <section className="section artists" id="artists">
          <div className="artist-intro">
            <p className="eyebrow">
              <span /> The family
            </p>
            <h2>
              Artists moving
              <br />
              the sound forward.
            </h2>
            <p>
              Producers, vocalists and collaborators shaping the Lukulu
              catalog.
            </p>
          </div>

          <div className="artist-list">
            {artists.map((artist, index) => (
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                key={artist}
                aria-label={artist + " on Traxsource"}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{artist}</strong>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
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
            <h2 id="submissions-title">LabelRadar submissions</h2>
            <p>
              Send unreleased Afro House, Afro-Tech and 3-Step demos through the
              Lukulu Recordings LabelRadar portal. Keep the file focused, leave
              room for the groove, and tell us where the record belongs.
            </p>
            <div className="story-links">
              <a href={labelRadarUrl} target="_blank" rel="noreferrer">
                Open LabelRadar <ExternalArrow />
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

        <section className="spotlight" aria-labelledby="spotlight-title">
          <div className="spotlight-image">
            <img
              src="/assets/dj-nastor.jpg"
              alt="DJ Nastor performing"
              width="1200"
              height="1200"
              loading="lazy"
              decoding="async"
            />
            <span aria-hidden="true">LUKULU / LABEL DIRECTOR</span>
          </div>
          <div className="spotlight-copy">
            <p className="mini-label">LABEL SPOTLIGHT</p>
            <h2 id="spotlight-title">DJ NASTOR</h2>
            <p>
              Founder, label director, producer and DJ championing Afro House
              from South Africa to the world.
            </p>
            <a
              href="https://open.spotify.com/artist/4LrRxXahvTwwytwPFl3vgF"
              target="_blank"
              rel="noreferrer"
            >
              Explore the artist <ExternalArrow />
            </a>
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
            <h2>Send us your sound.</h2>
            <p>
              Demo submissions, licensing enquiries, collaborations and label
              business.
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
