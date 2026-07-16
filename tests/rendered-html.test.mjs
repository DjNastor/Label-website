import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const projectRoot = new URL("../", import.meta.url);

function evaluateTsx(source, fileName, localModules = {}) {
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName,
  });
  const loadedModule = { exports: {} };
  const moduleRequire = (specifier) => localModules[specifier] ?? require(specifier);

  new Function("require", "module", "exports", compiled.outputText)(
    moduleRequire,
    loadedModule,
    loadedModule.exports,
  );

  return loadedModule.exports;
}

async function renderPage() {
  const [
    pageSource,
    mobileMenuSource,
    catalogSource,
    catalogConfigSource,
    audioPreviewSource,
    audioPreviewPlayerSource,
    catalogClientSource,
    musicExperienceSource,
    newsDataSource,
    newsClientSource,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/mobile-menu.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/catalog-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/audio-preview.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/audio-preview-player.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/catalog-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/music-experience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/news-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/news-client.tsx", import.meta.url), "utf8"),
  ]);
  const mobileMenu = evaluateTsx(
    mobileMenuSource,
    "app/mobile-menu.tsx",
  );
  const catalog = evaluateTsx(catalogSource, "app/catalog.ts");
  const catalogConfig = evaluateTsx(catalogConfigSource, "app/catalog-config.ts");
  const audioPreview = evaluateTsx(audioPreviewSource, "app/audio-preview.ts", {
    "./catalog": catalog,
  });
  const audioPreviewPlayer = evaluateTsx(
    audioPreviewPlayerSource,
    "app/audio-preview-player.tsx",
    {
      "./audio-preview": audioPreview,
    },
  );
  const catalogClient = evaluateTsx(
    catalogClientSource,
    "app/catalog-client.tsx",
    {
      "./audio-preview": audioPreview,
      "./audio-preview-player": audioPreviewPlayer,
      "./catalog": catalog,
      "./catalog-config": catalogConfig,
    },
  );
  const musicExperience = evaluateTsx(
    musicExperienceSource,
    "app/music-experience.tsx",
    {
      "./audio-preview": audioPreview,
      "./audio-preview-player": audioPreviewPlayer,
    },
  );
  const newsData = evaluateTsx(newsDataSource, "app/news-data.ts");
  const newsClient = evaluateTsx(newsClientSource, "app/news-client.tsx", {
    "./news-data": newsData,
  });
  const page = evaluateTsx(pageSource, "app/page.tsx", {
    "./audio-preview-player": audioPreviewPlayer,
    "./catalog-client": catalogClient,
    "./mobile-menu": mobileMenu,
    "./music-experience": musicExperience,
    "./news-client": newsClient,
  });

  return renderToStaticMarkup(page.default());
}

test("renders the Lukulu Recordings landing page", async () => {
  const html = await renderPage();

  assert.match(html, /<main id="main-content">/);
  assert.match(html, /Rooted in <em>rhythm\.<\/em>/);
  assert.match(html, /Built for the <em>world\.<\/em>/);
  assert.match(html, /id="releases"/);
  assert.match(html, /id="news"/);
  assert.match(html, /id="artists"/);
  assert.match(html, /id="submissions"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /Silver metallic Lukulu Africa mark with a speaker and African instruments/);
  assert.match(html, /Lukulu wordmark over richly colored African textile artwork/);
  assert.match(html, /Wooden Lukulu Africa mark with a speaker and drum/);
  assert.match(html, /lukulurecordings@gmail\.com/);
  assert.match(html, /https:\/\/www\.traxsource\.com\/label\/53294\/lukulu-recordings/);
  assert.match(html, /https:\/\/www\.beatport\.com\/label\/lukulu-recordings\/53294/);
  assert.match(html, /https:\/\/www\.labelradar\.com\/labels\/LukuluRecordings\/portal/);
  assert.match(html, /https:\/\/open\.spotify\.com\/playlist\/6skrxjmzEL0trnVnysbDdW/);
  assert.match(html, /LabelRadar submissions/);
  assert.match(html, /Signal feed/);
  assert.match(html, /aria-label="Audio preview player"/);
  assert.match(html, /Select a catalog track/);
  assert.match(html, /Preview unavailable/);
  assert.match(html, /Preview Reach Deep by DJ Nastor/);
  assert.match(html, /↗/);
  assert.doesNotMatch(html, /&amp;nearr;|&nearr;/);
  assert.doesNotMatch(html, /SkeletonPreview|react-loading-skeleton|Codex is working/);
});

test("keeps Lukulu metadata, assets, and responsive styles production-ready", async () => {
  const [layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(packageJson);

  assert.match(layout, /Lukulu Recordings \| Afro House & Afro-Tech/);
  assert.match(layout, /themeColor:\s*"#120d0a"/);
  assert.doesNotMatch(layout, /next\/font|fonts\.googleapis\.com/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.equal(manifest.dependencies?.["react-loading-skeleton"], undefined);

  for (const selector of [
    ".mobile-menu",
    ".sticky-rail",
    ".release-row",
    ".cover-card",
    ".audio-preview-player",
    ".audio-preview-waveform",
    ".news-grid",
    ".submission-portal",
    ".artist-list",
    "@font-face",
    "Maputo",
    "Afrika TUbuntu",
    "prefers-reduced-motion: reduce",
  ]) {
    assert.ok(css.includes(selector), `Expected globals.css to include ${selector}`);
  }

  for (const asset of [
    "lukulu-silver-mark.jpg",
    "lukulu-favicon.jpg",
    "reach-deep.jpg",
    "massive.jpg",
    "winter-go2.jpg",
    "lukulu-textile-wordmark.jpg",
    "lukulu-wood-mark.jpg",
    "dj-nastor.jpg",
  ]) {
    await access(new URL(`../public/assets/${asset}`, import.meta.url));
  }

  for (const font of [
    "Maputo-lgvyw.ttf",
    "Maputo-vm9zL.otf",
    "AfrikaTUbuntu-nAOV.ttf",
  ]) {
    await access(new URL(`../public/fonts/${font}`, import.meta.url));
  }

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
