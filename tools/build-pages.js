/*
  Builds every page of the site from the text in assets/js/content-en.js and content-ar.js:
    - one HTML file per page and per language (English: name.html, Arabic: name-ar.html),
      each with its own title, description, link-preview tags (WhatsApp, LinkedIn...),
      canonical address and language alternates for Google;
    - business details for Google on the home pages (JSON-LD);
    - sitemap.xml and robots.txt;
    - the Content-Security-Policy tag on every page.

  Run after changing any page text, adding a service/story/guide, or changing CSS/JS:
      node tools/build-pages.js
  Raise VERSION whenever CSS or JS changes so returning visitors get the new files.
  Change SITE_URL when the site moves to its own domain.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const SITE_URL = "https://abdullahshbat23.github.io/lamarva-website/";
const VERSION = 10;
const ROOT = path.join(__dirname, "..");
const LANGS = ["en", "ar"];
const OG_IMAGE = { file: "assets/img/og-image.jpg", width: 1200, height: 630 };

// When the booking form is connected to an outside service (e.g. Formspree), add its address here.
const CSP_CONNECT = ["'self'"];
const CSP_FORM_ACTION = ["'self'"];

/* ---------- Load the site text ---------- */
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ["content-en.js", "content-ar.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js", f), "utf8"), sandbox, { filename: f });
}
const CONTENT = sandbox.window.CONTENT;
const appJs = fs.readFileSync(path.join(ROOT, "assets/js/app.js"), "utf8");
const PHONE = (appJs.match(/phone:\s*"([^"]+)"/) || [])[1] || "";
const EMAIL = (appJs.match(/email:\s*"([^"]+)"/) || [])[1] || "";

/* ---------- Addresses (keep in step with pageFile() in assets/js/app.js) ---------- */
const FILE_FOR = { home: "index", how: "how-we-work", stories: "success-stories", thanks: "thank-you" };
function fileName(page, o, lang) {
  let f = FILE_FOR[page] || page;
  if (page === "service") f = "service-" + o.s + (o.sub ? "-" + o.sub : "");
  else if (page === "story" || page === "article") f = page + "-" + o.id;
  else if (page === "legal") f = "legal-" + o.p;
  return f + (lang === "ar" ? "-ar" : "") + ".html";
}
const absUrl = (file) => SITE_URL + (file === "index.html" ? "" : file);

/* ---------- Helpers ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function plain(s) { return String(s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
function clip(s, n) {
  s = plain(s);
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s—–-]+$/, "") + "…";
}

/* ---------- Every page, with its title and description ---------- */
function pagesFor(lang) {
  const T = CONTENT[lang], M = T.meta, out = [];
  const add = (page, o, title, desc, extra) => out.push(Object.assign({ page, o, lang, title, desc, index: true }, extra || {}));
  const t = (key) => M.titles[key] + " | " + M.siteName;

  add("home", {}, M.titles.home, T.home.hero.lead, { home: true });
  add("services", {}, t("services"), T.servicesPage.lead);
  T.services.forEach((s) => {
    add("service", { s: s.slug }, s.heroTitle + " | " + M.siteName, s.heroText);
    s.subs.forEach((sub) => add("service", { s: s.slug, sub: sub.slug }, sub.title + " | " + M.siteName, sub.text));
  });
  add("investors", {}, t("investors"), T.investors.lead);
  add("advisor", {}, t("advisor"), T.advisor.welcomeText);
  add("how", {}, t("how"), T.how.lead);
  add("about", {}, t("about"), T.about.story[0] || T.about.lead);
  add("stories", {}, t("stories"), T.storiesPage.lead);
  T.stories.forEach((st) => add("story", { id: st.id }, st.title + " | " + M.siteName, st.summary));
  add("knowledge", {}, t("knowledge"), T.knowledgePage.lead);
  T.articles.forEach((a) => add("article", { id: a.id }, a.title + " | " + M.siteName, a.summary, { ogType: "article" }));
  add("contact", {}, t("contact"), T.contact.lead);
  add("thanks", {}, t("thanks"), T.thanks.text, { index: false });
  Object.keys(T.legal.pages).forEach((p) => add("legal", { p }, T.legal.pages[p].title + " | " + M.siteName, T.legal.pages[p].body[0].p));
  out.forEach((pg) => { pg.file = fileName(pg.page, pg.o, lang); pg.desc = clip(pg.desc, 160); });
  return out;
}

/* ---------- Business details for Google (home pages) ---------- */
function businessJsonLd(lang) {
  const T = CONTENT[lang];
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LAMARVA Business Services",
    alternateName: CONTENT.ar.meta.siteName,
    url: SITE_URL,
    logo: SITE_URL + "assets/img/apple-touch-icon.png",
    image: SITE_URL + OG_IMAGE.file,
    description: plain(T.home.hero.lead),
    slogan: T.meta.tagline,
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    knowsLanguage: ["en", "ar"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: T.nav.services,
      itemListElement: T.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: plain(s.short), url: absUrl(fileName("service", { s: s.slug }, lang)) }
      }))
    }
  };
  if (PHONE) data.telephone = PHONE.replace(/\s+/g, "");
  if (EMAIL) data.email = EMAIL;
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/* ---------- HTML ---------- */
function cspTag(html) {
  const hashes = [];
  html.replace(/<script>([\s\S]*?)<\/script>/g, (m, body) => {
    const h = crypto.createHash("sha256").update(body, "utf8").digest("base64");
    if (!hashes.includes(h)) hashes.push(h);
  });
  const policy = [
    "default-src 'self'",
    "script-src 'self'" + hashes.map((h) => " 'sha256-" + h + "'").join(""),
    "style-src 'self' 'unsafe-inline'", // inline style attributes are used in the markup
    "font-src 'self'",
    "img-src 'self' data:",
    "connect-src " + CSP_CONNECT.join(" "),
    "form-action " + CSP_FORM_ACTION.join(" "),
    "base-uri 'self'",
    "object-src 'none'"
  ].join("; ");
  return '<meta http-equiv="Content-Security-Policy" content="' + policy + '">';
}

const NOSCRIPT = {
  en: "Please enable JavaScript to view this site.",
  ar: "يرجى تفعيل JavaScript لعرض هذا الموقع."
};
// 404 only: GitHub serves it for missing addresses at any depth, so point relative links at the site root,
// and pick the visitor's last language (there is no Arabic 404 file).
const BASE_FIX = '<script>(function(){var m=location.pathname.match(/^\\/lamarva-website\\//);document.write("<base href=\\""+(m?m[0]:"/")+"\\">");})();</script>';
const LANG_FROM_STORAGE = '<script>(function(){try{var l=new URLSearchParams(location.search).get("lang")||localStorage.getItem("lmv-lang");if(l==="ar"){document.documentElement.lang="ar";document.documentElement.dir="rtl";}}catch(e){}})();</script>';

function page(o) {
  const lang = o.lang || "en";
  const head = [
    '<meta charset="utf-8">',
    o.baseFix ? BASE_FIX : "",
    "@@CSP@@",
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    "<title>" + esc(o.title) + "</title>",
    '<meta name="description" content="' + esc(o.desc) + '">',
    o.index ? "" : '<meta name="robots" content="noindex">',
    '<meta name="theme-color" content="#0a0a0b">',
    o.canonical ? '<link rel="canonical" href="' + o.canonical + '">' : "",
    (o.alternates || []).map((a) => '<link rel="alternate" hreflang="' + a.hreflang + '" href="' + a.href + '">').join("\n"),
    o.og ? [
      '<meta property="og:type" content="' + (o.og.type || "website") + '">',
      '<meta property="og:site_name" content="' + esc(CONTENT[lang].meta.siteName) + '">',
      '<meta property="og:title" content="' + esc(o.og.title) + '">',
      '<meta property="og:description" content="' + esc(o.desc) + '">',
      '<meta property="og:url" content="' + o.canonical + '">',
      '<meta property="og:image" content="' + SITE_URL + OG_IMAGE.file + '">',
      '<meta property="og:image:width" content="' + OG_IMAGE.width + '">',
      '<meta property="og:image:height" content="' + OG_IMAGE.height + '">',
      '<meta property="og:image:alt" content="LAMARVA Business Services — Your Business. Our Expertise.">',
      '<meta property="og:locale" content="' + (lang === "ar" ? "ar_AE" : "en_US") + '">',
      '<meta property="og:locale:alternate" content="' + (lang === "ar" ? "en_US" : "ar_AE") + '">',
      '<meta name="twitter:card" content="summary_large_image">'
    ].join("\n") : "",
    '<link rel="icon" href="assets/img/favicon-64.png" type="image/png">',
    '<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">',
    '<link rel="preload" href="assets/img/logo-lockup.webp" as="image" type="image/webp">',
    o.langFromStorage ? LANG_FROM_STORAGE : "",
    '<link rel="stylesheet" href="assets/css/fonts.css?v=' + VERSION + '">',  // self-hosted, see tools/fetch-fonts.py
    '<link rel="stylesheet" href="assets/css/styles.css?v=' + VERSION + '">',
    o.jsonLd ? '<script type="application/ld+json">' + o.jsonLd + "</script>" : ""
  ].filter(Boolean).join("\n");

  const data = Object.entries(o.data).filter(([, v]) => v != null && v !== "").map(([k, v]) => " data-" + k + '="' + esc(v) + '"').join("");
  let html = [
    "<!doctype html>",
    '<html lang="' + lang + '" dir="' + (lang === "ar" ? "rtl" : "ltr") + '">',
    "<head>", head, "</head>",
    "<body" + data + ">",
    '<div id="header"></div>',
    '<main id="main" tabindex="-1"></main>',
    '<div id="footer"></div>',
    '<noscript><p style="padding:120px 24px;text-align:center;color:#ece6da">' + NOSCRIPT[lang] + "</p></noscript>",
    '<script src="assets/js/content-en.js?v=' + VERSION + '"></script>',
    '<script src="assets/js/content-ar.js?v=' + VERSION + '"></script>',
    '<script src="assets/js/app.js?v=' + VERSION + '"></script>',
    "</body>", "</html>", ""
  ].join("\n");
  return html.replace("@@CSP@@", cspTag(html));
}

/* ---------- Build ---------- */
const written = [];
const write = (file, html) => { fs.writeFileSync(path.join(ROOT, file), html); written.push(file); };
const byKey = {};
const all = [];
LANGS.forEach((lang) => pagesFor(lang).forEach((pg) => {
  const key = pg.page + "|" + JSON.stringify(pg.o);
  (byKey[key] = byKey[key] || {})[lang] = pg;
  all.push(Object.assign(pg, { key }));
}));

all.forEach((pg) => {
  const pair = byKey[pg.key];
  const alternates = pg.index ? [
    { hreflang: "en", href: absUrl(pair.en.file) },
    { hreflang: "ar", href: absUrl(pair.ar.file) },
    { hreflang: "x-default", href: absUrl(pair.en.file) }
  ] : [];
  write(pg.file, page({
    lang: pg.lang, title: pg.title, desc: pg.desc, index: pg.index,
    canonical: absUrl(pg.file), alternates,
    og: { title: pg.title.replace(" | " + CONTENT[pg.lang].meta.siteName, "") || pg.title, type: pg.ogType },
    jsonLd: pg.home ? businessJsonLd(pg.lang) : null,
    data: Object.assign({ page: pg.page, lang: pg.lang }, pg.o)
  }));
});

// Old addresses (service.html?s=..., story.html?id=...) keep working: these shells forward to the new pages.
const EN = CONTENT.en;
["service", "story", "article", "legal"].forEach((pg) => write(pg + ".html", page({
  lang: "en", title: EN.meta.siteName, desc: plain(EN.home.hero.lead), index: false, data: { page: pg }
})));

write("404.html", page({
  lang: "en", title: EN.meta.titles.notFound + " | " + EN.meta.siteName, desc: EN.notFound.text, index: false,
  baseFix: true, langFromStorage: true, data: { page: "404" }
}));

// Sitemap with both languages linked to each other.
const today = new Date().toISOString().slice(0, 10);
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
  .concat(all.filter((pg) => pg.index).map((pg) => {
    const pair = byKey[pg.key];
    return "  <url>\n    <loc>" + absUrl(pg.file) + "</loc>\n    <lastmod>" + today + "</lastmod>\n" +
      '    <xhtml:link rel="alternate" hreflang="en" href="' + absUrl(pair.en.file) + '"/>\n' +
      '    <xhtml:link rel="alternate" hreflang="ar" href="' + absUrl(pair.ar.file) + '"/>\n' +
      '    <xhtml:link rel="alternate" hreflang="x-default" href="' + absUrl(pair.en.file) + '"/>\n  </url>';
  })).concat(["</urlset>", ""]).join("\n");
write("sitemap.xml", sitemap);
// Only read by search engines when the site sits at the root of its own domain.
write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: " + SITE_URL + "sitemap.xml\n");

console.log("Wrote " + written.length + " files (" + all.length + " pages, " + all.filter((p) => p.index).length + " in the sitemap).");
