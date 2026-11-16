# LAMARVA Business Services — Website

Bilingual (English / Arabic RTL) static website for LAMARVA Business Services.

- No build step: open `index.html` or serve the folder (`python -m http.server 8080`).
- English text: `assets/js/content-en.js` · Arabic text: `assets/js/content-ar.js`
- Contact details and placeholders: `CONFIG` at the top of `assets/js/app.js`
- Security policy: every page carries a Content-Security-Policy tag. After changing any inline `<script>` in an HTML file, run `python tools/update-csp.py`.
- Cache: bump the `?v=N` number on the CSS/JS links in all HTML files whenever CSS or JS changes.
