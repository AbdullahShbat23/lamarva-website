"""Write the Content-Security-Policy <meta> tag into every HTML page.

Run this again whenever an inline <script> in any page changes:
    python tools/update-csp.py

The policy only allows scripts that ship with the site. The few inline scripts
(language detection, the 404 base-path fix) are allowed by their SHA-256 hash,
so editing them without re-running this script will make the browser block them.

When the booking form is connected to an outside service (e.g. Formspree),
add that service's address to CONNECT_SRC and FORM_ACTION below.
"""
import base64
import glob
import hashlib
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CONNECT_SRC = ["'self'"]
FORM_ACTION = ["'self'"]

INLINE_SCRIPT = re.compile(r"<script>(.*?)</script>", re.S)
EXISTING = re.compile(r'<meta http-equiv="Content-Security-Policy"[^>]*>\n?')
CHARSET = '<meta charset="utf-8">\n'


def policy(hashes):
    script_src = ["'self'"] + ["'sha256-%s'" % h for h in hashes]
    parts = [
        "default-src 'self'",
        "script-src " + " ".join(script_src),
        # Inline style attributes are used throughout the rendered markup.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src " + " ".join(CONNECT_SRC),
        "form-action " + " ".join(FORM_ACTION),
        "base-uri 'self'",
        "object-src 'none'",
    ]
    return "; ".join(parts)


def main():
    for path in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
        with open(path, encoding="utf-8", newline="") as fh:
            html = fh.read().replace("\r\n", "\n")
        html = EXISTING.sub("", html)
        hashes = []
        for body in INLINE_SCRIPT.findall(html):
            digest = base64.b64encode(hashlib.sha256(body.encode("utf-8")).digest()).decode()
            if digest not in hashes:
                hashes.append(digest)
        if CHARSET not in html:
            raise SystemExit("no charset meta in " + path)
        meta = '<meta http-equiv="Content-Security-Policy" content="%s">\n' % policy(hashes)
        html = html.replace(CHARSET, CHARSET + meta, 1)
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(html)
        print(os.path.basename(path), "- inline scripts allowed:", len(hashes))


if __name__ == "__main__":
    main()
