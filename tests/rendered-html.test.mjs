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
  const [pageSource, mobileMenuSource] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/mobile-menu.tsx", import.meta.url), "utf8"),
  ]);
  const mobileMenu = evaluateTsx(
    mobileMenuSource,
    "app/mobile-menu.tsx",
  );
  const page = evaluateTsx(pageSource, "app/page.tsx", {
    "./mobile-menu": mobileMenu,
  });

  return renderToStaticMarkup(page.default());
}

test("renders the Lukulu Recordings landing page", async () => {
  const html = await renderPage();

  assert.match(html, /<main id="main-content">/);
  assert.match(html, /Rooted in <em>rhythm\.<\/em>/);
  assert.match(html, /Built for the <em>world\.<\/em>/);
  assert.match(html, /id="releases"/);
  assert.match(html, /id="artists"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /Lukulu wooden Africa logo with speakers and African drums/);
  assert.match(html, /lukulurecordings@gmail\.com/);
  assert.match(html, /https:\/\/www\.traxsource\.com\/label\/53294\/lukulu-recordings/);
  assert.match(html, /https:\/\/open\.spotify\.com\/playlist\/6skrxjmzEL0trnVnysbDdW/);
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
    ".artist-list",
    "prefers-reduced-motion: reduce",
  ]) {
    assert.ok(css.includes(selector), `Expected globals.css to include ${selector}`);
  }

  for (const asset of [
    "lukulu-metal-logo.png",
    "reach-deep.jpg",
    "massive.jpg",
    "winter-go2.jpg",
    "lukulu-pattern.jpg",
    "dj-nastor.jpg",
  ]) {
    await access(new URL(`../public/assets/${asset}`, import.meta.url));
  }

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
