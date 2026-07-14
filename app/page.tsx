const latestReleases = [
  {
    date: "10 JUL 2026",
    title: "Amalangabi",
    artist: "DJ Nastor & Zamachunu Mchunu",
    code: "CAT1948348",
  },
  {
    date: "01 JUL 2026",
    title: "Malupha",
    artist: "DJ Mukumu",
    code: "CAT1920022",
  },
  {
    date: "26 JUN 2026",
    title: "Plastic Thunder",
    artist: "Da Cord",
    code: "CAT1905905",
  },
];

const catalogHighlights = [
  {
    title: "Reach Deep",
    artist: "DJ Nastor",
    image: "/assets/reach-deep.jpg",
    tag: "Afro House",
  },
  {
    title: "Massive",
    artist: "DJ Nastor",
    image: "/assets/massive.jpg",
    tag: "Afro House",
  },
  {
    title: "Lukulu Winter GO2",
    artist: "Various Artists",
    image: "/assets/winter-go2.jpg",
    tag: "DJ Chart",
  },
];

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

const traxsource = "https://www.traxsource.com/label/53294/lukulu-recordings";
const spotify = "https://open.spotify.com/playlist/6skrxjmzEL0trnVnysbDdW";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Lukulu Recordings home">
          <img src="/assets/lukulu-metal-logo.png" alt="" />
          <span>
            <strong>LUKULU</strong>
            <small>RECORDINGS</small>
          </span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#releases">Releases</a>
          <a href="#artists">Artists</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-cta" href="mailto:lukulurecordings@gmail.com?subject=Demo%20submission">
          Send a demo <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Ladysmith · South Africa</p>
          <h1>
            Rooted in <em>rhythm.</em>
            <br />
            Built for the <em>world.</em>
          </h1>
          <p className="hero-intro">
            Independent Afro House and Afro-Tech shaped by African soul,
            modern electronic energy and dance-floor purpose.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#releases">
              Explore releases <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-ghost" href={spotify} target="_blank" rel="noreferrer">
              Listen on Spotify <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="sound-tags" aria-label="Label genres">
            <span>AFRO HOUSE</span>
            <span>AFRO-TECH</span>
            <span>3-STEP</span>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="Lukulu wooden Africa logo with speakers and African drums">
          <div className="hero-art-shade" />
          <p>THE SOUND OF</p>
          <strong>AFRICA<br />IN MOTION</strong>
        </div>
      </section>

      <div className="rhythm-strip" aria-hidden="true">
        <span>AFRO HOUSE</span><b>◆</b><span>AFRO-TECH</span><b>◆</b><span>SOUTH AFRICA</span><b>◆</b><span>LUKULU RECORDINGS</span><b>◆</b>
      </div>

      <section className="section releases" id="releases">
        <div className="section-heading">
          <p className="eyebrow"><span /> Fresh from Lukulu</p>
          <h2>Latest releases</h2>
          <a href={traxsource} target="_blank" rel="noreferrer">View the full catalog <span aria-hidden="true">↗</span></a>
        </div>

        <div className="release-layout">
          <div className="release-list">
            {latestReleases.map((release, index) => (
              <a className="release-row" href={traxsource} target="_blank" rel="noreferrer" key={release.title}>
                <span className="release-number">0{index + 1}</span>
                <span className="release-date">{release.date}</span>
                <span className="release-info">
                  <strong>{release.title}</strong>
                  <small>{release.artist}</small>
                </span>
                <span className="release-code">{release.code}</span>
                <span className="play" aria-hidden="true">▶</span>
              </a>
            ))}
          </div>

          <aside className="coming-next">
            <p className="mini-label">COMING NEXT</p>
            <div className="coming-main">
              <span>20 · 07 · 2026</span>
              <h3>LOST<br />IN A DREAM</h3>
              <p>DJ NASTOR</p>
            </div>
            <div className="coming-footer">
              <span>Aba&apos;Belive</span>
              <span>28 · 08 · 2026</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section highlights">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> From the catalog</p>
          <h2>Selected sounds</h2>
        </div>
        <div className="cover-grid">
          {catalogHighlights.map((release) => (
            <a className="cover-card" href={traxsource} target="_blank" rel="noreferrer" key={release.title}>
              <div className="cover-image">
                <img src={release.image} alt={`${release.title} by ${release.artist}`} />
                <span className="cover-play" aria-hidden="true">▶</span>
              </div>
              <div className="cover-copy">
                <p>{release.tag}</p>
                <h3>{release.title}</h3>
                <span>{release.artist}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="story" id="about">
        <div className="story-art" role="img" aria-label="Colorful Lukulu African pattern artwork">
          <img src="/assets/lukulu-pattern.jpg" alt="" />
        </div>
        <div className="story-copy">
          <p className="eyebrow light"><span /> Our story</p>
          <h2>From Ladysmith<br />to global dance floors.</h2>
          <p>
            Lukulu Recordings is a South African independent label focused on
            quality Afro House and Afro-Tech. We release music with heritage,
            feeling and forward movement—sounds made to travel.
          </p>
          <blockquote>
            “African roots. Electronic pulse. Music without borders.”
          </blockquote>
          <div className="story-links">
            <a href={traxsource} target="_blank" rel="noreferrer">Traxsource <span>↗</span></a>
            <a href={spotify} target="_blank" rel="noreferrer">Spotify <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="section artists" id="artists">
        <div className="artist-intro">
          <p className="eyebrow"><span /> The family</p>
          <h2>Artists moving<br />the sound forward.</h2>
          <p>Producers, vocalists and collaborators shaping the Lukulu catalog.</p>
        </div>
        <div className="artist-list">
          {artists.map((artist, index) => (
            <a href={traxsource} target="_blank" rel="noreferrer" key={artist}>
              <span>0{index + 1}</span>
              <strong>{artist}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="spotlight">
        <div className="spotlight-image">
          <img src="/assets/dj-nastor.jpg" alt="DJ Nastor performing" />
        </div>
        <div className="spotlight-copy">
          <p className="mini-label">LABEL SPOTLIGHT</p>
          <h2>DJ NASTOR</h2>
          <p>Founder, label director, producer and DJ championing Afro House from South Africa to the world.</p>
          <a href="https://open.spotify.com/artist/4LrRxXahvTwwytwPFl3vgF" target="_blank" rel="noreferrer">
            Explore the artist <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="contact" id="contact">
        <img src="/assets/lukulu-metal-logo.png" alt="Lukulu Recordings" />
        <div>
          <p className="eyebrow light"><span /> Work with us</p>
          <h2>Send us your sound.</h2>
          <p>Demo submissions, licensing enquiries, collaborations and label business.</p>
        </div>
        <a className="contact-button" href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Recordings%20enquiry">
          lukulurecordings@gmail.com <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <div className="footer-brand">
          <strong>LUKULU RECORDINGS</strong>
          <span>Ladysmith · South Africa</span>
        </div>
        <div className="footer-links">
          <a href="https://www.instagram.com/lukulurecordings" target="_blank" rel="noreferrer">Instagram</a>
          <a href={spotify} target="_blank" rel="noreferrer">Spotify</a>
          <a href={traxsource} target="_blank" rel="noreferrer">Traxsource</a>
        </div>
        <p>© 2026 Lukulu Recordings</p>
      </footer>
    </main>
  );
}
