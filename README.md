# LAMARVA Business Services — Website

Bilingual (English / Arabic RTL) static website for LAMARVA Business Services.

- No server needed: serve the folder (`python -m http.server 8080`) or host it on GitHub Pages.
- English text: `assets/js/content-en.js` · Arabic text: `assets/js/content-ar.js`
- Contact details and placeholders: `CONFIG` at the top of `assets/js/app.js`

## Pages are generated

Every page exists once per language: `about.html` (English) and `about-ar.html` (Arabic),
`service-visas-residency-family.html`, `story-family-relocation-ar.html`, and so on.
Each has its own title, description, link-preview tags, Google language links and the
security policy. They are written by:

```
node tools/build-pages.js
```

Run it after changing page text, adding a service / story / guide, or changing CSS/JS
(raise `VERSION` in the script first so returning visitors get the new files).
It also writes `sitemap.xml` and `robots.txt`. Change `SITE_URL` in the script when the
site moves to its own domain. When the booking form is connected to an outside service,
add its address to `CSP_CONNECT` / `CSP_FORM_ACTION` in the script.

Old addresses (`service.html?s=…`, `?lang=ar`) still work and forward to the new pages.

## Fonts

Fonts are served from `assets/fonts/` (no requests to Google). To refresh or change them, edit the list in
`tools/fetch-fonts.py`, run `python tools/fetch-fonts.py`, then `node tools/build-pages.js`.
