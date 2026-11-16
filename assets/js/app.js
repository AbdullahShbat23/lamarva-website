/* =========================================================
   LAMARVA Business Services — site renderer
   Static, no build step. Pages are thin HTML shells with
   <body data-page="...">; this file renders them in EN or AR.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Site configuration (PLACEHOLDERS — replace before launch) ---------- */
  var CONFIG = {
    whatsapp: "971553036644",          // From company profile (assumed to be the WhatsApp number too)
    phone: "+971 55 303 6644",         // From company profile
    email: "lamarva016@gmail.com",     // From company profile
    address: { en: "Office address, United Arab Emirates", ar: "عنوان المكتب، الإمارات العربية المتحدة" }, // PLACEHOLDER
    // PLACEHOLDER trust-bar figures. Use real numbers; numeric values animate.
    trust: [{ v: "00", s: "+" }, { v: "000", s: "+" }, { v: "00", s: "+" }, { v: "00", s: "%" }],
    waGreeting: {
      en: "Hello LAMARVA, I'd like to know more about your services.",
      ar: "مرحباً لامارڤا، أود معرفة المزيد عن خدماتكم."
    },
    timeSlots: ["10:00", "11:30", "13:00", "15:00", "16:30"]
  };

  /* ---------- State ---------- */
  var params = new URLSearchParams(location.search);
  var page = document.body.getAttribute("data-page") || "home";
  var lang = getStored("lmv-lang") || "en";
  if (params.get("lang") === "ar" || params.get("lang") === "en") { lang = params.get("lang"); setStored("lmv-lang", lang); }
  var T;

  function getStored(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function setStored(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function getSession(k) { try { return JSON.parse(sessionStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function setSession(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Motion preference ---------- */
  var motionPref = getStored("lmv-motion");
  var systemReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function reduceMotion() { return motionPref ? motionPref === "reduce" : systemReduce; }
  function applyMotion() { document.documentElement.classList.toggle("reduce-motion", reduceMotion()); }

  /* ---------- Icons ---------- */
  var ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    building: '<path d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M3 21h18M8 8h3M8 12h3M8 16h3"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
    landmark: '<path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10L12 4l10 6H2z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
    bank: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
    doc: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.6 1.4 1.4.6-1.4.6L19 20l-.6-1.4-1.4-.6 1.4-.6z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0114 0M16 4.5a3.5 3.5 0 010 7M18 14a6 6 0 014 6"/>',
    refresh: '<path d="M20 11a8 8 0 00-14.9-3M4 4v4h4M4 13a8 8 0 0014.9 3M20 20v-4h-4"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
    home: '<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  var WA_PATH = '<path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.39z"/>';
  function ico(name, cls) {
    if (name === "whatsapp") return '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : "") + ">" + WA_PATH + "</svg>";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : "") + ">" + (ICONS[name] || "") + "</svg>";
  }
  function arrow() { return ico("arrow", "flip-rtl"); }

  /* ---------- Logo (official artwork, extracted from the door-sign file) ---------- */
  function logoLockup() {
    return '<img class="logo-img" src="assets/img/logo-lockup.png" width="760" height="229" alt="LAMARVA Business Services">';
  }
  function markImg(cls) {
    return '<img class="' + (cls || "") + '" src="assets/img/logo-mark.png" width="520" height="551" alt="" draggable="false">';
  }

  /* ---------- Helpers ---------- */
  function waLink() { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.waGreeting[lang]); }
  function svcHref(s, sub) { return "service.html?s=" + s + (sub ? "&sub=" + sub : ""); }
  function findService(slug) { return T.services.filter(function (s) { return s.slug === slug; })[0]; }
  function findArticle(id) { return T.articles.filter(function (a) { return a.id === id; })[0]; }
  function findStory(id) { return T.stories.filter(function (a) { return a.id === id; })[0]; }
  function num(n) { return n < 10 ? "0" + n : "" + n; }
  // Lookups keyed by URL values must ignore inherited names like "constructor".
  function own(o, k) { return k != null && Object.prototype.hasOwnProperty.call(o, k); }

  function sectionHead(eyebrow, title, text, center) {
    return '<div class="section-head reveal' + (center ? " center" : "") + '"><span class="eyebrow">' + eyebrow + "</span><h2>" + title + "</h2>" + (text ? "<p>" + text + "</p>" : "") + "</div>";
  }
  function pageHero(o) {
    var crumbs = "";
    if (o.crumbs) {
      crumbs = '<nav class="crumbs" aria-label="Breadcrumb">' + o.crumbs.map(function (c, i) {
        var sep = i < o.crumbs.length - 1 ? ' <span aria-hidden="true">/</span>' : "";
        return (c.href ? '<a href="' + c.href + '">' + c.t + "</a>" : '<span aria-current="page">' + c.t + "</span>") + sep;
      }).join(" ") + "</nav>";
    }
    return '<section class="page-hero"><div class="container">' + crumbs +
      (o.eyebrow ? '<span class="eyebrow reveal">' + o.eyebrow + "</span>" : "") +
      '<h1 class="reveal d1">' + o.title + "</h1>" +
      (o.lead ? '<p class="lead reveal d2">' + o.lead + "</p>" : "") +
      (o.ctas ? '<div class="hero-ctas reveal d3">' + o.ctas + "</div>" : "") +
      (o.extra || "") + "</div></section>";
  }
  function primaryCtas() {
    return '<a class="btn btn--gold" href="contact.html">' + T.common.bookCta + arrow() + "</a>" +
      '<a class="btn btn--ghost" href="' + waLink() + '" target="_blank" rel="noopener">' + ico("whatsapp") + T.common.whatsapp + "</a>";
  }
  function bookingBar() {
    return '<div class="booking-bar reveal"><div><h3>' + T.common.bookingBarTitle + "</h3><p>" + T.common.bookingBarText + '</p></div><div class="btns">' +
      '<a class="btn btn--dark" href="contact.html">' + T.common.bookCta + arrow() + "</a>" +
      '<a class="btn btn--ghost btn--wa" href="' + waLink() + '" target="_blank" rel="noopener">' + ico("whatsapp") + T.common.whatsapp + "</a></div></div>";
  }
  function bookingSection(spaceAbove) {
    return '<section class="section--tight"><div class="container"' + (spaceAbove ? ' style="padding-top:80px"' : "") + ">" + bookingBar() + "</div></section><div style=\"height:80px\"></div>";
  }
  function whoCards() {
    return T.home.who.items.map(function (w, i) {
      return '<div class="who-card reveal d' + (i + 1) + '"><span class="ico">' + ico(w.icon) + "</span><h3>" + w.t + "</h3><p>" + w.d + "</p></div>";
    }).join("");
  }
  function ctaBand(title, text) {
    return '<section class="section"><div class="container"><div class="cta-band reveal">' +
      '<h2>' + title + "</h2><p>" + text + '</p><div class="hero-ctas">' + primaryCtas() + "</div></div></div></section>";
  }
  function checkList(items, cls) {
    return '<ul class="check-list ' + (cls || "") + '">' + items.map(function (i) { return "<li>" + ico("check") + "<span>" + i + "</span></li>"; }).join("") + "</ul>";
  }
  function faqList(items) {
    return '<div class="faq">' + items.map(function (f) {
      return '<details><summary>' + f.q + '<span class="pm">' + ico("plus") + '</span></summary><div class="ans">' + f.a + "</div></details>";
    }).join("") + "</div>";
  }
  function storyCard(s, i) {
    return '<a class="card story-card reveal d' + ((i % 3) + 1) + '" href="story.html?id=' + s.id + '"><span class="tag">' + s.tag + "</span><h3>" + s.title + '</h3><div class="story-metrics">' +
      s.metrics.map(function (m) { return '<div><b class="gold-text">' + m.v + "</b><small>" + m.l + "</small></div>"; }).join("") +
      "</div><p>" + s.summary + '</p><div class="meta"><span class="sample-flag">' + T.common.sample + '</span><span class="link-arrow">' + T.common.readStory + arrow() + "</span></div></a>";
  }
  function articleCard(a, i) {
    return '<a class="card article-card reveal d' + ((i % 3) + 1) + '" href="article.html?id=' + a.id + '"><span class="tag">' + a.tag + "</span><h3>" + a.title + "</h3><p>" + a.summary +
      '</p><div class="meta"><span>' + a.mins + " " + T.common.minRead + '</span><span class="link-arrow">' + T.common.readMore + arrow() + "</span></div></a>";
  }
  function teamCards() {
    return '<div class="grid grid-4">' + T.about.team.map(function (m, i) {
      return '<div class="card team-card reveal d' + (i + 1) + '"><div class="team-photo" data-pending="' + T.common.pendingPhoto + '"><span>' + m.initials + '</span></div><div class="team-body"><h3>' + m.name + '</h3><div class="role">' + m.role + "</div><p>" + m.bio + "</p></div></div>";
    }).join("") + "</div>";
  }

  /* ---------- Header / Footer ---------- */
  function renderHeader() {
    var n = T.nav;
    var cur = function (p) { return page === p ? ' aria-current="page"' : ""; };
    var megaCols = T.services.map(function (s) {
      return '<div class="mega-col"><h4><span class="ico">' + ico(s.icon) + '</span><a href="' + svcHref(s.slug) + '">' + s.title + "</a></h4><ul>" +
        (s.subs.length ? s.subs.map(function (sub) { return '<li><a href="' + svcHref(s.slug, sub.slug) + '">' + sub.title + "</a></li>"; }).join("")
          : '<li><a href="' + svcHref(s.slug) + '">' + s.short + "</a></li>") + "</ul></div>";
    }).join("");
    var drawerSvcs = T.services.map(function (s) {
      return '<a class="d-pillar" href="' + svcHref(s.slug) + '">' + s.title + "</a>" + s.subs.map(function (sub) { return '<a href="' + svcHref(s.slug, sub.slug) + '">— ' + sub.title + "</a>"; }).join("");
    }).join("");
    var langBtn = '<button class="lang-switch" id="langSwitch" type="button" aria-label="' + n.langAria + '" lang="' + (lang === "en" ? "ar" : "en") + '"><span class="' + (lang === "en" ? "ar" : "") + '">' + n.langLabel + "</span></button>";

    document.getElementById("header").innerHTML =
      '<a class="skip-link" href="#main">' + n.skip + "</a>" +
      '<header class="site-header" id="siteHeader"><div class="container header-inner">' +
      '<a class="logo" href="index.html">' + logoLockup() + "</a>" +
      '<nav class="main-nav" aria-label="Main">' +
      '<button class="nav-link" id="megaBtn" type="button" aria-expanded="false" aria-controls="mega"' + (page === "services" || page === "service" ? ' aria-current="page"' : "") + ">" + n.services + ico("chevron") + "</button>" +
      '<a class="nav-link" href="investors.html"' + cur("investors") + ">" + n.investors + "</a>" +
      '<a class="nav-link" href="advisor.html"' + cur("advisor") + ">" + n.advisor + "</a>" +
      '<a class="nav-link" href="how-we-work.html"' + cur("how") + ">" + n.how + "</a>" +
      '<a class="nav-link" href="about.html"' + cur("about") + ">" + n.about + "</a>" +
      '<a class="nav-link" href="knowledge.html"' + (page === "knowledge" || page === "article" ? ' aria-current="page"' : "") + ">" + n.knowledge + "</a>" +
      "</nav>" +
      '<div class="header-actions">' + langBtn + '<a class="btn btn--gold btn--sm" href="contact.html">' + n.book + "</a>" +
      '<button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="drawer" aria-label="' + n.menu + '">' + ico("menu") + "</button></div>" +
      "</div>" +
      '<div class="mega" id="mega" role="region" aria-label="' + n.services + '"><div class="container"><div class="mega-grid">' + megaCols + '</div><div class="mega-foot"><p>' + n.megaNote + '</p><div class="hero-ctas"><a class="btn btn--ghost btn--sm" href="services.html">' + n.allServices + '</a><a class="btn btn--gold btn--sm" href="advisor.html">' + T.common.tryAdvisor + arrow() + "</a></div></div></div></div>" +
      "</header>" +
      '<div class="drawer" id="drawer" aria-label="' + n.menu + '">' +
      "<details><summary>" + n.services + ico("chevron") + '</summary><div class="d-sub">' + drawerSvcs + '<a href="services.html">' + n.allServices + "</a></div></details>" +
      '<a class="d-link" href="investors.html">' + n.investors + "</a>" +
      '<a class="d-link" href="advisor.html">' + n.advisor + "</a>" +
      '<a class="d-link" href="how-we-work.html">' + n.how + "</a>" +
      '<a class="d-link" href="about.html">' + n.about + "</a>" +
      '<a class="d-link" href="success-stories.html">' + n.stories + "</a>" +
      '<a class="d-link" href="knowledge.html">' + n.knowledge + "</a>" +
      '<a class="btn btn--gold btn--block" href="contact.html">' + n.book + arrow() + "</a>" +
      "</div>" +
      '<a class="wa-float" href="' + waLink() + '" target="_blank" rel="noopener" aria-label="' + T.common.whatsappAria + '">' + ico("whatsapp") + "</a>";
  }

  function renderFooter() {
    var f = T.footer;
    var year = new Date().getFullYear();
    document.getElementById("footer").innerHTML =
      '<footer class="site-footer"><div class="container"><div class="footer-top">' +
      '<div class="footer-brand"><a class="logo logo--footer" href="index.html">' + logoLockup() + "</a><p>" + f.about + '</p><div class="footer-tagline">' + T.meta.tagline + "</div></div>" +
      "<div><h4>" + f.services + "</h4><ul>" + T.services.map(function (s) { return '<li><a href="' + svcHref(s.slug) + '">' + s.title + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>" + f.company + '</h4><ul><li><a href="about.html">' + f.links.about + '</a></li><li><a href="how-we-work.html">' + f.links.how + '</a></li><li><a href="success-stories.html">' + f.links.stories + '</a></li><li><a href="investors.html">' + f.links.investors + '</a></li><li><a href="advisor.html">' + f.links.advisor + "</a></li></ul></div>" +
      "<div><h4>" + f.knowledge + '</h4><ul><li><a href="knowledge.html">' + f.links.guides + "</a></li>" + T.articles.map(function (a) { return '<li><a href="article.html?id=' + a.id + '">' + a.title.split(":")[0] + "</a></li>"; }).join("") +
      '<li><a href="assets/docs/LAMARVA-Company-Profile.pdf" target="_blank" rel="noopener">' + T.common.profileDownload + "</a></li>" +
      '<li><a href="assets/docs/LAMARVA-Logo.jpg" download>' + T.common.logoDownload + "</a></li></ul></div>" +
      "<div><h4>" + f.contact + '</h4><ul class="footer-contact">' +
      "<li>" + ico("phone") + '<a href="tel:' + CONFIG.phone.replace(/\s/g, "") + '" dir="ltr">' + CONFIG.phone + "</a></li>" +
      "<li>" + ico("mail") + '<a href="mailto:' + CONFIG.email + '">' + CONFIG.email + "</a></li>" +
      "<li>" + ico("whatsapp") + '<a href="' + waLink() + '" target="_blank" rel="noopener">' + T.common.whatsapp + "</a></li>" +
      "<li>" + ico("pin") + "<span>" + CONFIG.address[lang] + "</span></li>" +
      '<li><a class="btn btn--gold btn--sm" href="contact.html">' + f.links.contact + "</a></li></ul></div>" +
      "</div>" +
      '<div class="footer-licences"><strong>' + f.licences + ":</strong><span>" + f.licencePlaceholder + "</span></div>" +
      '<div class="footer-bottom"><span>© ' + year + " LAMARVA Business Services. " + f.rights + "</span><nav>" +
      '<a href="legal.html?p=privacy">' + f.legal.privacy + '</a><a href="legal.html?p=terms">' + f.legal.terms + '</a><a href="legal.html?p=cookies">' + f.legal.cookies + "</a>" +
      '<button class="motion-toggle" id="motionToggle" type="button" aria-pressed="' + reduceMotion() + '"><i></i>' + f.motion + "</button></nav></div>" +
      "</div></footer>";
  }

  /* ---------- Pages ---------- */
  var PAGES = {};

  PAGES.home = function () {
    var h = T.home;
    var layers = "";
    for (var i = 10; i >= 1; i--) {
      layers += '<div class="mono-layer mono-back" style="transform:translateZ(' + (-i * 1.5) + 'px)">' + markImg() + "</div>";
    }
    layers += '<div class="mono-layer" style="transform:translateZ(1px)">' + markImg() + "</div>";

    var trust = CONFIG.trust.map(function (t, i) {
      return '<div class="trust-item reveal d' + (i + 1) + '"><div class="trust-num gold-text" data-count="' + t.v + '" data-suffix="' + t.s + '">' + t.v + t.s + '</div><div class="trust-label">' + h.trustLabels[i] + "</div></div>";
    }).join("");
    var partners = [1, 2, 3, 4, 5].map(function () { return '<span class="partner-slot">' + h.partnerSlot + "</span>"; }).join("");

    var svcCards = T.services.map(function (s, i) {
      return '<a class="card svc-card reveal d' + ((i % 3) + 1) + '" href="' + svcHref(s.slug) + '"><span class="num">' + num(i + 1) + '</span><span class="ico">' + ico(s.icon) + "</span><h3>" + s.title + "</h3><p>" + s.short + "</p><ul>" + s.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("") + '</ul><span class="link-arrow">' + T.common.explore + arrow() + "</span></a>";
    }).join("");

    var jSteps = h.journey.steps.map(function (s, i) {
      return '<div class="j-step" data-i="' + i + '"><span class="step-n">' + num(i + 1) + "</span><h3>" + s.t + "</h3><p>" + s.d + "</p></div>";
    }).join("");

    var paths = T.advisor.paths;
    var choices = Object.keys(paths).map(function (k) {
      return '<a class="choice" href="advisor.html?path=' + k + '"><span class="c-ico">' + ico(paths[k].icon) + "</span><span><b>" + paths[k].t + "</b><small>" + paths[k].d + "</small></span>" + ico("arrow", "c-arrow flip-rtl") + "</a>";
    }).join("");

    var why = h.why.items.map(function (w, i) {
      return '<div class="card why-card reveal d' + ((i % 3) + 1) + '"><span class="ico">' + ico(w.icon) + "</span><h3>" + w.t + "</h3><p>" + w.d + "</p></div>";
    }).join("");
    var who = whoCards();

    return '<section class="hero"><div class="hero-grid-bg"></div><div class="container hero-inner">' +
      '<div><span class="eyebrow reveal">' + h.hero.eyebrow + '</span><h1 class="reveal d1">' + h.hero.title + '</h1><p class="hero-lead reveal d2">' + h.hero.lead + "</p>" +
      '<div class="hero-ctas reveal d3"><a class="btn btn--gold" href="contact.html">' + T.common.bookCta + arrow() + '</a><a class="btn btn--ghost" href="advisor.html">' + ico("spark") + T.common.tryAdvisor + "</a></div>" +
      '<p class="hero-note reveal d4">' + ico("shield") + h.hero.note + "</p></div>" +
      '<div class="mono-stage reveal d2" id="monoStage" aria-hidden="true"><div class="mono-orbit o1"></div><div class="mono-orbit o2"></div><div class="mono-glow"></div><div class="mono-3d" id="mono3d"><div class="mono-spin">' + layers + "</div></div></div>" +
      '</div><div class="scroll-cue" aria-hidden="true">' + h.scroll + "<i></i></div></section>" +

      '<section class="trust" aria-label="' + h.partnersLabel + '"><div class="container"><div class="trust-grid">' + trust + '</div><div class="partners"><small>' + h.partnersLabel + "</small>" + partners + "</div></div></section>" +

      '<section class="section"><div class="container">' + sectionHead(h.services.eyebrow, h.services.title, h.services.text) + '<div class="svc-grid">' + svcCards + "</div></div></section>" +

      '<section class="section section--ink"><div class="container journey"><div class="journey-sticky">' + sectionHead(h.journey.eyebrow, h.journey.title, h.journey.text) +
      '<div class="journey-visual"><svg class="journey-ring" viewBox="0 0 100 100"><defs><linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1dca6"/><stop offset="1" stop-color="#8f6d33"/></linearGradient></defs><circle class="track" cx="50" cy="50" r="46" fill="none" stroke-width="1.2"/><circle class="prog" id="jProg" cx="50" cy="50" r="46" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="289.03" stroke-dashoffset="240.9" transform="rotate(-90 50 50)"/></svg>' +
      '<div class="journey-center"><div><b class="gold-text" id="jNum">01</b><span>' + h.journey.ringLabel + " / " + num(h.journey.steps.length) + "</span></div></div></div></div>" +
      '<div class="journey-steps">' + jSteps + "</div></div></section>" +

      '<section class="section"><div class="container advisor-preview"><div>' + sectionHead(h.advisor.eyebrow, h.advisor.title, h.advisor.text) +
      '<a class="btn btn--ghost reveal" href="advisor.html">' + T.common.tryAdvisor + arrow() + "</a></div>" +
      '<div class="advisor-box reveal d2"><div class="ab-top"><span class="ab-dot">' + ico("spark") + "</span><div><b>" + h.advisor.boxTitle + "</b><small>" + h.advisor.boxSub + '</small></div></div><div class="choice-list">' + choices + "</div></div></div></section>" +

      '<section class="section section--ink"><div class="container">' + sectionHead(h.why.eyebrow, h.why.title, "", true) + '<div class="grid grid-3">' + why + "</div></div></section>" +

      '<section class="section section--light"><div class="container">' + sectionHead(h.who.eyebrow, h.who.title, "", true) + '<div class="who-grid">' + who + "</div></div></section>" +

      '<section class="section"><div class="container"><div class="intl-band reveal"><div class="intl-copy"><span class="eyebrow">' + h.intl.eyebrow + "</span><h2>" + h.intl.title + '</h2><p class="muted">' + h.intl.text + '</p><a class="btn btn--gold" href="investors.html">' + h.intl.cta + arrow() + '</a></div><div class="intl-visual">' + globeSvg() + "</div></div></div></section>" +

      '<section class="section section--ink"><div class="container">' + sectionHead(h.stories.eyebrow, h.stories.title) + '<div class="grid grid-3">' + T.stories.map(storyCard).join("") + "</div>" +
      '<div class="section--tight reveal" style="padding-bottom:0"><span class="quote-mark gold-text">“</span><p class="quote">' + h.testimonial.quote + '</p><p class="muted" style="text-align:center;margin-top:18px;font-size:.88rem">' + h.testimonial.who + "</p></div>" +
      '<div style="text-align:center;margin-top:36px"><a class="link-arrow" href="success-stories.html">' + T.common.allStories + arrow() + "</a></div></div></section>" +

      '<section class="section"><div class="container">' + sectionHead(h.team.eyebrow, h.team.title) + teamCards() + '<div style="margin-top:32px"><a class="link-arrow" href="about.html#team">' + h.team.cta + arrow() + "</a></div></div></section>" +

      '<section class="section section--light"><div class="container">' + sectionHead(h.knowledge.eyebrow, h.knowledge.title) + '<div class="grid grid-3">' + T.articles.slice(0, 3).map(articleCard).join("") + '</div><div style="margin-top:32px"><a class="link-arrow" href="knowledge.html">' + T.common.allArticles + arrow() + "</a></div></div></section>" +

      ctaBand(h.final.title, h.final.text);
  };

  function globeSvg() {
    return '<svg class="globe" viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="goldStroke2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f1dca6"/><stop offset="1" stop-color="#c9a45c"/></linearGradient></defs>' +
      '<circle class="lat" cx="100" cy="100" r="80" stroke-width="1"/>' +
      '<ellipse class="lat" cx="100" cy="100" rx="80" ry="28" stroke-width=".7"/><ellipse class="lat" cx="100" cy="100" rx="80" ry="56" stroke-width=".7"/>' +
      '<ellipse class="lat" cx="100" cy="100" rx="28" ry="80" stroke-width=".7"/><ellipse class="lat" cx="100" cy="100" rx="56" ry="80" stroke-width=".7"/><line class="lat" x1="100" y1="20" x2="100" y2="180" stroke-width=".7"/>' +
      '<path class="route" d="M48 70 Q90 30 128 96"/><path class="route" d="M60 140 Q100 150 128 96"/><path class="route" d="M160 60 Q150 70 128 96"/>' +
      '<circle class="pin" cx="48" cy="70" r="3"/><circle class="pin" cx="60" cy="140" r="3"/><circle class="pin" cx="160" cy="60" r="3"/>' +
      '<circle cx="128" cy="96" r="9" fill="none" stroke="#ecd39a" stroke-width="1"/><circle class="pin" cx="128" cy="96" r="4.5"/></svg>';
  }

  PAGES.services = function () {
    var sp = T.servicesPage;
    var rows = T.services.map(function (s, i) {
      return '<div class="pillar-row reveal"><span class="pnum">' + num(i + 1) + "</span><div><h2>" + s.title + "</h2><p>" + s.short + '</p></div><ul class="subs">' +
        (s.subs.length ? s.subs : [{ slug: "", title: s.heroTitle }]).map(function (sub) { return '<li><a href="' + svcHref(s.slug, sub.slug) + '">' + ico("arrow", "flip-rtl") + sub.title + "</a></li>"; }).join("") +
        '</ul><a class="btn btn--ghost btn--sm" href="' + svcHref(s.slug) + '">' + T.common.explore + "</a></div>";
    }).join("");
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.services }], eyebrow: sp.eyebrow, title: sp.title, lead: sp.lead, ctas: '<a class="btn btn--gold" href="advisor.html">' + ico("spark") + T.common.tryAdvisor + '</a><a class="btn btn--ghost" href="contact.html">' + T.common.bookCta + "</a>" }) +
      '<section class="section"><div class="container">' + rows + "</div></section>" +
      bookingSection();
  };

  PAGES.service = function () {
    var s = findService(params.get("s"));
    if (!s) return PAGES.notFound();
    var sub = s.subs.filter(function (x) { return x.slug === params.get("sub"); })[0];
    var sp = T.servicesPage, b = sp.blocks;
    document.title = (sub ? sub.title : s.title) + " | " + T.meta.siteName;

    var crumbs = [{ t: T.nav.home, href: "index.html" }, { t: T.nav.services, href: "services.html" }];
    if (sub) { crumbs.push({ t: s.title, href: svcHref(s.slug) }); crumbs.push({ t: sub.title }); } else crumbs.push({ t: s.title });

    var tabs = s.subs.length ? '<div class="sub-tabs reveal d3"><a href="' + svcHref(s.slug) + '"' + (!sub ? ' class="active"' : "") + ">" + b.overview + "</a>" +
      s.subs.map(function (x) { return '<a href="' + svcHref(s.slug, x.slug) + '"' + (sub && sub.slug === x.slug ? ' class="active"' : "") + ">" + x.title + "</a>"; }).join("") + "</div>" : "";

    var related = s.related.map(findArticle).filter(Boolean);
    var navItems = [["for", sp.nav.for], ["includes", sp.nav.includes], ["stages", sp.nav.stages], ["documents", sp.nav.documents], ["faq", sp.nav.faq]];
    if (related.length) navItems.push(["related", sp.nav.related]);

    var blocks =
      '<div class="svc-block" id="for"><h2 class="reveal">' + b.forTitle + '</h2><div class="for-grid">' + s.for.map(function (f, i) { return '<div class="for-item reveal d' + ((i % 4) + 1) + '"><span class="dot"></span>' + f + "</div>"; }).join("") + "</div></div>" +
      '<div class="svc-block" id="includes"><h2 class="reveal">' + b.includesTitle + '</h2><div class="reveal">' + checkList(sub ? sub.includes : s.includes, "cols-2") + "</div>" +
      (!sub && s.subs.length ? '<h3 style="margin-top:40px" class="reveal">' + b.subTitle + '</h3><div class="grid grid-2">' + s.subs.map(function (x, i) { return '<a class="card reveal d' + ((i % 2) + 1) + '" href="' + svcHref(s.slug, x.slug) + '"><h3>' + x.title + "</h3><p>" + x.text + '</p><span class="link-arrow">' + T.common.learnMore + arrow() + "</span></a>"; }).join("") + "</div>" : "") +
      "</div>" +
      '<div class="svc-block" id="stages"><h2 class="reveal">' + b.stagesTitle + '</h2><ol class="timeline reveal">' + s.stages.map(function (st) { return "<li><h4>" + st.t + ' <span class="dur">' + st.dur + "</span></h4><p>" + st.d + "</p></li>"; }).join("") + "</ol>" +
      '<div class="price-promise reveal">' + ico("clock") + "<p><strong>" + T.common.duration + ":</strong> " + s.totalDuration + "</p></div>" +
      '<div class="price-promise reveal">' + ico("shield") + "<p>" + T.common.noPrices + "</p></div></div>" +
      '<div class="svc-block" id="documents"><h2 class="reveal">' + b.documentsTitle + '</h2><div class="doc-grid">' + s.documents.map(function (d, i) { return '<div class="doc-item reveal d' + ((i % 2) + 1) + '">' + ico("doc") + "<span>" + d + "</span></div>"; }).join("") + '</div><p class="muted reveal" style="margin-top:18px;font-size:.92rem">' + b.documentsNote + "</p></div>" +
      '<div class="svc-block" id="faq"><h2 class="reveal">' + b.faqTitle + '</h2><div class="reveal">' + faqList(s.faq) + "</div></div>" +
      (related.length ? '<div class="svc-block" id="related"><h2 class="reveal">' + b.relatedTitle + '</h2><div class="grid grid-2">' + related.map(articleCard).join("") + "</div></div>" : "");

    return pageHero({ crumbs: crumbs, eyebrow: sub ? s.title : sp.eyebrow, title: sub ? sub.title : s.heroTitle, lead: sub ? sub.text : s.heroText, ctas: primaryCtas(), extra: tabs }) +
      '<section class="section"><div class="container svc-layout"><aside class="svc-aside"><nav aria-label="' + (sub ? sub.title : s.title) + '">' +
      navItems.map(function (n) { return '<a href="#' + n[0] + '">' + n[1] + "</a>"; }).join("") +
      '</nav><div class="aside-cta"><h4>' + sp.asideTitle + "</h4><p>" + sp.asideText + '</p><a class="btn btn--gold btn--sm btn--block" href="contact.html">' + T.common.bookCta + "</a></div></aside>" +
      "<div>" + blocks + "</div></div></section>" +
      bookingSection();
  };

  PAGES.investors = function () {
    var v = T.investors;
    var who = whoCards();
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.investors }], eyebrow: v.eyebrow, title: v.title, lead: v.lead, ctas: primaryCtas() }) +
      '<section class="section"><div class="container journey"><div class="journey-sticky">' + sectionHead(v.journeyEyebrow, v.journeyTitle) +
      '<div class="card reveal"><h3>' + v.remoteTitle + "</h3>" + checkList(v.remote) + '<p class="muted" style="margin:20px 0 0;font-size:.92rem">' + v.remoteNote + "</p></div></div>" +
      '<div><ol class="timeline">' + v.steps.map(function (s, i) { return '<li class="reveal d' + ((i % 3) + 1) + '"><h4>' + s.t + "</h4><p>" + s.d + "</p></li>"; }).join("") + "</ol></div></div></section>" +
      '<section class="section section--light"><div class="container">' + sectionHead(T.home.who.eyebrow, v.whoTitle, "", true) + '<div class="who-grid">' + who + "</div></div></section>" +
      ctaBand(v.cta.title, v.cta.text);
  };

  PAGES.how = function () {
    var h = T.how;
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.how }], eyebrow: h.eyebrow, title: h.title, lead: h.lead }) +
      '<section class="section"><div class="container"><div class="steps6">' + h.steps.map(function (s, i) {
        return '<div class="card step6 reveal d' + ((i % 3) + 1) + '"><span class="sn gold-text"></span><h3>' + s.t + "</h3><p>" + s.d + "</p></div>";
      }).join("") + "</div></div></section>" +
      '<section class="section section--light"><div class="container advisor-preview"><div>' + sectionHead(T.about.eyebrow, h.promiseTitle) + '</div><div class="reveal">' + checkList(h.promise) + '<div class="price-promise" style="background:#fff;border-color:rgba(156,122,60,.3)">' + ico("shield") + '<p style="color:var(--text-dark)">' + T.common.noPrices + "</p></div></div></div></section>" +
      bookingSection(true);
  };

  PAGES.about = function () {
    var a = T.about;
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.about }], eyebrow: a.eyebrow, title: a.title, lead: a.lead }) +
      '<section class="section"><div class="container vm-grid">' +
      '<div class="reveal"><span class="eyebrow">' + a.storyTitle + "</span>" + a.story.map(function (p) { return '<p style="font-size:1.1rem">' + p + "</p>"; }).join("") + (a.storyNote ? '<p class="sample-flag" style="display:inline-block">' + a.storyNote + "</p>" : "") +
      '<a class="btn btn--ghost" style="margin-top:12px" href="assets/docs/LAMARVA-Company-Profile.pdf" target="_blank" rel="noopener">' + ico("doc") + T.common.profileDownload + "</a></div>" +
      '<div class="card reveal d1"><span class="ico">' + ico("compass") + "</span><h3>" + a.vision.t + "</h3><p>" + a.vision.d + "</p></div>" +
      '<div class="card reveal d2"><span class="ico">' + ico("target") + "</span><h3>" + a.mission.t + "</h3><p>" + a.mission.d + "</p></div>" +
      "</div></section>" +
      '<section class="section section--light"><div class="container">' + sectionHead(a.eyebrow, a.valuesTitle, "", true) + '<div class="values-grid">' + a.values.map(function (v, i) {
        return '<div class="value reveal d' + ((i % 3) + 1) + '"><span class="vn">' + num(i + 1) + "</span><h3>" + v.t + "</h3><p>" + v.d + "</p></div>";
      }).join("") + "</div></div></section>" +
      '<section class="section section--ink"><div class="container advisor-preview"><div>' + sectionHead(a.eyebrow, a.commitTitle) + '</div><div class="reveal">' + checkList(a.commit, "cols-2") + "</div></div></section>" +
      '<section class="section" id="team"><div class="container">' + sectionHead(a.eyebrow, a.teamTitle, a.teamText) + teamCards() + "</div></section>" +
      ctaBand(T.home.final.title, T.home.final.text);
  };

  PAGES.stories = function () {
    var s = T.storiesPage;
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.stories }], eyebrow: s.eyebrow, title: s.title, lead: s.lead }) +
      '<section class="section"><div class="container"><div class="grid grid-3">' + T.stories.map(storyCard).join("") + "</div></div></section>" +
      ctaBand(s.ctaTitle, T.home.final.text);
  };

  PAGES.story = function () {
    var st = findStory(params.get("id"));
    if (!st) return PAGES.notFound();
    var s = T.storiesPage;
    document.title = st.title + " | " + T.meta.siteName;
    var others = T.stories.filter(function (x) { return x.id !== st.id; });
    var block = function (t, d, icon) { return '<div class="card reveal"><span class="ico">' + ico(icon) + "</span><h3>" + t + "</h3><p>" + d + "</p></div>"; };
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.stories, href: "success-stories.html" }, { t: st.tag }], eyebrow: st.tag, title: st.title, lead: st.summary,
      extra: '<div class="story-metrics reveal d3" style="margin-top:28px">' + st.metrics.map(function (m) { return '<div><b class="gold-text">' + m.v + "</b><small>" + m.l + "</small></div>"; }).join("") + '</div><span class="sample-flag">' + T.common.sample + "</span>" }) +
      '<section class="section"><div class="container"><div class="grid grid-3">' + block(s.challenge, st.challenge, "target") + block(s.approach, st.approach, "compass") + block(s.result, st.result, "check") + "</div></div></section>" +
      '<section class="section section--ink"><div class="container"><div class="grid grid-2">' + others.map(storyCard).join("") + "</div></div></section>" +
      ctaBand(s.ctaTitle, T.home.final.text);
  };

  PAGES.knowledge = function () {
    var k = T.knowledgePage;
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.knowledge }], eyebrow: k.eyebrow, title: k.title, lead: k.lead }) +
      '<section class="section"><div class="container"><div class="grid grid-3">' + T.articles.map(articleCard).join("") + '</div><p class="muted" style="margin-top:32px;font-size:.9rem">' + k.disclaimer + "</p></div></section>" +
      bookingSection();
  };

  PAGES.article = function () {
    var a = findArticle(params.get("id"));
    if (!a) return PAGES.notFound();
    document.title = a.title + " | " + T.meta.siteName;
    var body = a.body.map(function (b) {
      if (b.h) return '<h2 class="reveal">' + b.h + "</h2>";
      if (b.list) return '<ul class="reveal">' + b.list.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>";
      if (b.callout) return '<div class="callout reveal">' + b.callout + "</div>";
      return '<p class="reveal">' + b.p + "</p>";
    }).join("");
    var others = T.articles.filter(function (x) { return x.id !== a.id; });
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.knowledge, href: "knowledge.html" }, { t: a.tag }], eyebrow: a.tag + " · " + a.mins + " " + T.common.minRead, title: a.title, lead: a.summary }) +
      '<section class="section"><div class="container"><article class="prose">' + body + '<p class="muted" style="font-size:.9rem;margin-top:40px">' + T.knowledgePage.disclaimer + "</p></article></div></section>" +
      '<section class="section--tight"><div class="container">' + bookingBar() + "</div></section>" +
      '<section class="section section--light"><div class="container">' + sectionHead(T.knowledgePage.eyebrow, T.common.relatedArticles) + '<div class="grid grid-2">' + others.map(articleCard).join("") + "</div></div></section>";
  };

  PAGES.legal = function () {
    var key = params.get("p");
    var p = own(T.legal.pages, key) ? T.legal.pages[key] : T.legal.pages.privacy;
    document.title = p.title + " | " + T.meta.siteName;
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: p.title }], title: p.title }) +
      '<section class="section"><div class="container legal"><div class="draft-banner">' + T.legal.draft + "</div>" +
      p.body.map(function (b) { return "<h2>" + b.h + "</h2><p>" + b.p + "</p>"; }).join("") + "</div></section>";
  };

  PAGES.notFound = function () {
    var n = T.notFound;
    document.title = T.meta.titles.notFound + " | " + T.meta.siteName;
    return '<section class="nf"><div><div class="big gold-text">404</div><h1 style="font-size:clamp(1.8rem,4vw,2.8rem)">' + n.title + '</h1><p class="muted">' + n.text + '</p><div class="hero-ctas" style="justify-content:center;margin-top:28px"><a class="btn btn--gold" href="index.html">' + n.home + '</a><a class="btn btn--ghost" href="advisor.html">' + n.advisor + "</a></div></div></section>";
  };

  /* ---------- Smart Advisor ---------- */
  var adv = { step: "welcome", path: null, qi: 0, answers: {}, contact: {} };

  PAGES.advisor = function () {
    var a = T.advisor;
    var start = params.get("path");
    if (own(a.questions, start) && adv.step === "welcome" && !adv._init) { adv.path = start; adv.step = "q"; adv.qi = 0; }
    adv._init = true;
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.advisor }], eyebrow: a.eyebrow, title: a.welcomeTitle, lead: a.welcomeText }) +
      '<section class="section"><div class="container"><div class="advisor-shell" id="advisorShell" aria-live="polite"></div></div></section>';
  };

  // Path question + that path's questions + optional contact screen.
  // Before a path is chosen, assume the longest path.
  function advTotal() {
    var q = T.advisor.questions;
    var n = adv.path ? q[adv.path].length : Math.max.apply(null, Object.keys(q).map(function (k) { return q[k].length; }));
    return n + 2;
  }
  function advIndex() {
    if (adv.step === "q1") return 1;
    if (adv.step === "q") return 2 + adv.qi;
    if (adv.step === "contact") return advTotal();
    return 0;
  }
  function progressBar() {
    var i = advIndex();
    return '<div class="advisor-progress"><div class="bar"><i style="width:' + (i / advTotal() * 100) + '%"></i></div><span>' + T.common.stepWord + " " + i + " " + T.common.of + " " + advTotal() + "</span></div>";
  }
  function backBtn() { return '<button class="btn-text" type="button" data-adv="back">' + ico("back", "flip-rtl") + T.common.back + "</button>"; }

  function renderAdvisor() {
    var shell = document.getElementById("advisorShell");
    if (!shell) return;
    var a = T.advisor, html = "";
    if (adv.step === "welcome") {
      html = '<div class="advisor-box advisor-screen"><div class="ab-top"><span class="ab-dot">' + ico("spark") + "</span><div><b>" + a.eyebrow + "</b><small>" + T.meta.tagline + "</small></div></div>" +
        "<h2>" + a.welcomeTitle + "</h2>" + checkList(a.welcomePoints) +
        '<div class="advisor-nav"><span></span><button class="btn btn--gold" type="button" data-adv="start">' + a.start + arrow() + "</button></div></div>";
    } else if (adv.step === "q1") {
      html = progressBar() + '<div class="advisor-screen"><h2>' + a.q1 + '</h2><div class="choice-list">' + Object.keys(a.paths).map(function (k) {
        var p = a.paths[k];
        return '<button class="choice' + (adv.path === k ? " selected" : "") + '" type="button" data-path="' + k + '"><span class="c-ico">' + ico(p.icon) + "</span><span><b>" + p.t + "</b><small>" + p.d + "</small></span>" + ico("arrow", "c-arrow flip-rtl") + "</button>";
      }).join("") + '</div><div class="advisor-nav">' + backBtn() + "</div></div>";
    } else if (adv.step === "q") {
      var q = a.questions[adv.path][adv.qi];
      html = progressBar() + '<div class="advisor-screen"><span class="tag">' + a.paths[adv.path].t + "</span><h2>" + q.q + '</h2><div class="choice-list">' + Object.keys(q.opts).map(function (k) {
        return '<button class="choice' + (adv.answers[q.id] === k ? " selected" : "") + '" type="button" data-opt="' + k + '"><span><b>' + q.opts[k] + "</b></span>" + ico("arrow", "c-arrow flip-rtl") + "</button>";
      }).join("") + '</div><div class="advisor-nav">' + backBtn() + "</div></div>";
    } else if (adv.step === "contact") {
      var f = a.fields, c = adv.contact;
      html = progressBar() + '<form class="advisor-screen form-card" id="advContact" novalidate><h2>' + a.contactTitle + '</h2><p class="muted">' + a.contactText + '</p><div class="form-grid">' +
        '<div class="field full"><label for="ac-name">' + f.name + '</label><input class="input" id="ac-name" name="name" autocomplete="name" value="' + esc(c.name) + '"></div>' +
        '<div class="field"><label for="ac-email">' + f.email + '</label><input class="input" id="ac-email" name="email" type="email" autocomplete="email" value="' + esc(c.email) + '"></div>' +
        '<div class="field"><label for="ac-phone">' + f.phone + '</label><input class="input" id="ac-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" value="' + esc(c.phone) + '"></div>' +
        '</div><div class="advisor-nav">' + backBtn() + '<div class="hero-ctas"><button class="btn btn--ghost" type="button" data-adv="skip">' + a.contactSkip + '</button><button class="btn btn--gold" type="submit">' + a.contactSubmit + arrow() + "</button></div></div></form>";
    } else if (adv.step === "result") {
      html = renderResult();
    }
    shell.innerHTML = html;
    var focusEl = shell.querySelector("h2");
    if (focusEl && adv._moved) { focusEl.setAttribute("tabindex", "-1"); focusEl.focus({ preventScroll: true }); }
  }

  function computeResult() {
    var ans = adv.answers, p = adv.path, key, notes = [];
    if (p === "new") {
      key = (ans.clients === "gov" || ans.clients === "local" || ans.activity === "industrial") ? "new_mainland" : "new_freezone";
      if (ans.clients === "gov") notes.push("gov");
      else if (ans.activity === "industrial") notes.push("industrial");
      else if (ans.clients === "local") notes.push("local");
      else notes.push("intl");
      if (ans.visas === "v3") notes.push("v3");
    } else if (p === "existing") {
      key = { renew: "ex_renew", amend: "ex_amend", transfer: "ex_transfer", liquidate: "ex_liquidate", staff: "ex_staff" }[ans.need] || "ex_renew";
      if (ans.juris === "unsure") notes.push("unsure");
      if (ans.urgency === "urgent") notes.push("urgent");
    } else if (p === "visas") {
      key = { investor: "visa_investor", employee: "visa_employee", family: "visa_family", visit: "visa_visit" }[ans.who] || "visa_investor";
      notes.push(ans.location === "outside" ? "outside" : "inside");
      if (ans.count === "c2" || ans.count === "c3") notes.push("many");
    } else {
      key = { account: "bank_account", tax: "bank_tax", both: "bank_both" }[ans.need] || "bank_account";
      if (ans.stage === "notyet") notes.push("notyet");
      if (ans.residency === "some" || ans.residency === "none") notes.push("nonres");
    }
    return { key: key, notes: notes };
  }

  function renderResult() {
    var a = T.advisor, r = computeResult(), res = a.results[r.key];
    setSession("lmv-advisor", { path: adv.path, answers: adv.answers, key: r.key, contact: adv.contact });
    return '<div class="advisor-screen"><div class="result-head"><span class="badge">' + a.resultBadge + "</span><h2>" + res.title + '</h2><p class="muted" style="max-width:600px;margin:0 auto">' + res.summary + "</p></div>" +
      '<div class="result-grid"><div class="card"><h3>' + ico("compass") + a.stagesTitle + '</h3><ol class="timeline">' + res.stages.map(function (s) { return "<li><h4>" + s + "</h4></li>"; }).join("") + "</ol></div>" +
      '<div class="grid" style="align-content:start"><div class="card"><h3>' + ico("clock") + a.durationTitle + '</h3><p style="font-size:1.4rem;color:var(--gold-light);font-family:var(--font-display);margin-bottom:6px">' + res.duration + '</p><p style="font-size:.85rem;margin:0">' + a.durationNote + "</p></div>" +
      '<div class="card"><h3>' + ico("doc") + a.docsTitle + "</h3>" + checkList(res.docs) + "</div></div></div>" +
      (r.notes.length ? '<div class="card" style="margin-top:22px"><h3 style="display:flex;gap:10px;align-items:center">' + ico("info").replace("<svg", '<svg style="width:20px;height:20px;color:var(--gold)"') + a.notesTitle + "</h3>" + checkList(r.notes.map(function (n) { return a.notes[n]; })) + "</div>" : "") +
      '<div class="price-promise">' + ico("shield") + "<p>" + T.common.noPrices + "</p></div>" +
      '<div class="advisor-nav"><button class="btn-text" type="button" data-adv="restart">' + ico("refresh") + a.restart + '</button><a class="btn btn--gold" href="contact.html?from=advisor">' + a.bookWithSummary + arrow() + "</a></div></div>";
  }

  function bindAdvisor() {
    var shell = document.getElementById("advisorShell");
    if (!shell) return;
    renderAdvisor();
    shell.addEventListener("click", function (e) {
      var t = e.target.closest("button");
      if (!t) return;
      var a = T.advisor;
      adv._moved = true;
      if (t.dataset.adv === "start") adv.step = "q1";
      else if (t.dataset.adv === "restart") { adv = { step: "q1", path: null, qi: 0, answers: {}, contact: adv.contact, _init: true, _moved: true }; }
      else if (t.dataset.adv === "skip") adv.step = "result";
      else if (t.dataset.adv === "back") {
        if (adv.step === "q1") adv.step = "welcome";
        else if (adv.step === "q") { if (adv.qi > 0) adv.qi--; else adv.step = "q1"; }
        else if (adv.step === "contact") { adv.step = "q"; adv.qi = a.questions[adv.path].length - 1; }
      } else if (t.dataset.path) {
        if (adv.path !== t.dataset.path) adv.answers = {};
        adv.path = t.dataset.path; adv.step = "q"; adv.qi = 0;
      } else if (t.dataset.opt) {
        var qs = a.questions[adv.path];
        adv.answers[qs[adv.qi].id] = t.dataset.opt;
        if (adv.qi < qs.length - 1) adv.qi++; else adv.step = "contact";
      } else return;
      renderAdvisor();
      var top = shell.getBoundingClientRect().top + window.scrollY - 120;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: reduceMotion() ? "auto" : "smooth" });
    });
    shell.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      adv.contact = { name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim() };
      adv.step = "result"; adv._moved = true;
      renderAdvisor();
    });
  }

  /* ---------- Contact / booking ---------- */
  var SERVICE_FOR_PATH = { new: "company-formation", existing: "company-management", visas: "visas-residency", banking: "banking-tax" };

  PAGES.contact = function () {
    var c = T.contact, f = c.fields;
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    var minDate = today.toISOString().slice(0, 10);
    var opts = T.services.map(function (s) { return '<option value="' + s.slug + '">' + s.title + "</option>"; }).join("") + '<option value="other">' + f.other + "</option>";
    var slots = CONFIG.timeSlots.map(function (t, i) { return '<label class="chip"><input type="radio" name="time" value="' + t + '"' + (i === 0 ? " checked" : "") + '><span dir="ltr">' + t + "</span></label>"; }).join("");
    var modes = Object.keys(c.modes).map(function (k, i) { return '<label class="chip"><input type="radio" name="mode" value="' + k + '"' + (i === 0 ? " checked" : "") + "><span>" + c.modes[k] + "</span></label>"; }).join("");
    var req = function (id, label, type, extra) {
      return '<div class="field' + (extra && extra.full ? " full" : "") + '"><label for="' + id + '">' + label + '</label><input class="input" id="' + id + '" name="' + id + '" type="' + type + '"' + (extra && extra.attrs ? " " + extra.attrs : "") + ' required><span class="err">' + (type === "email" ? c.errors.email : c.errors.required) + "</span></div>";
    };
    return pageHero({ crumbs: [{ t: T.nav.home, href: "index.html" }, { t: T.nav.book }], eyebrow: c.eyebrow, title: c.title, lead: c.lead }) +
      '<section class="section"><div class="container form-layout">' +
      '<form class="form-card reveal" id="bookingForm" novalidate><div id="prefillNote"></div><div class="form-grid">' +
      req("name", f.name, "text", { full: true, attrs: 'autocomplete="name"' }) +
      req("email", f.email, "email", { attrs: 'autocomplete="email"' }) +
      req("phone", f.phone, "tel", { attrs: 'autocomplete="tel" dir="ltr"' }) +
      '<div class="field"><label for="country">' + f.country + ' <span class="opt">' + f.optional + '</span></label><input class="input" id="country" name="country" autocomplete="country-name"></div>' +
      '<div class="field"><label for="service">' + f.service + '</label><select class="input" id="service" name="service" required><option value="">' + f.servicePlaceholder + "</option>" + opts + '</select><span class="err">' + c.errors.required + "</span></div>" +
      '<div class="field"><label for="date">' + f.date + '</label><input class="input" id="date" name="date" type="date" min="' + minDate + '" required><span class="err">' + c.errors.required + "</span></div>" +
      '<div class="field"><span class="label" id="timeLbl">' + f.time + '</span><div class="chips" role="radiogroup" aria-labelledby="timeLbl">' + slots + "</div></div>" +
      '<div class="field full"><span class="label" id="modeLbl">' + f.mode + '</span><div class="chips" role="radiogroup" aria-labelledby="modeLbl">' + modes + "</div></div>" +
      '<div class="field full"><label for="message">' + f.message + ' <span class="opt">' + f.optional + '</span></label><textarea class="input" id="message" name="message" placeholder="' + f.messagePlaceholder + '"></textarea></div>' +
      '<div class="field full"><label class="chip-check" style="display:flex;gap:12px;align-items:flex-start;font-weight:400;font-size:.9rem;cursor:pointer"><input type="checkbox" id="consent" name="consent" required style="margin-top:5px;accent-color:#c9a45c;width:18px;height:18px;flex-shrink:0"><span>' + f.consent.replace("Privacy Policy", '<a href="legal.html?p=privacy" style="color:var(--gold-light);text-decoration:underline">Privacy Policy</a>').replace("سياسة الخصوصية", '<a href="legal.html?p=privacy" style="color:var(--gold-light);text-decoration:underline">سياسة الخصوصية</a>') + '</span></label><span class="err">' + c.errors.consent + "</span></div>" +
      '</div><button class="btn btn--gold btn--block" type="submit" style="margin-top:26px">' + c.submit + arrow() + '</button><p class="form-note">' + c.note + "</p></form>" +
      '<aside class="contact-aside"><div class="card wa-card reveal d1"><h3>' + c.asideTitle + "</h3><p>" + c.asideText + '</p><a class="btn btn--wa-solid btn--block" href="' + waLink() + '" target="_blank" rel="noopener">' + ico("whatsapp") + T.common.whatsapp + "</a></div>" +
      '<div class="card reveal d2"><h3>' + c.contactTitle + '</h3><div class="contact-aside">' +
      '<div class="contact-line">' + ico("phone") + "<div><small>" + c.labels.phone + '</small><a href="tel:' + CONFIG.phone.replace(/\s/g, "") + '" dir="ltr">' + CONFIG.phone + "</a></div></div>" +
      '<div class="contact-line">' + ico("mail") + "<div><small>" + c.labels.email + '</small><a href="mailto:' + CONFIG.email + '">' + CONFIG.email + "</a></div></div>" +
      '<div class="contact-line">' + ico("pin") + "<div><small>" + c.labels.address + "</small>" + CONFIG.address[lang] + "</div></div>" +
      '<div class="contact-line">' + ico("clock") + "<div><small>" + c.labels.hours + "</small>" + c.hours + "</div></div></div></div>" +
      '<div class="card reveal d3"><h3>' + c.nextTitle + '</h3><ol class="timeline">' + c.next.map(function (n) { return "<li><h4>" + n + "</h4></li>"; }).join("") + "</ol></div></aside>" +
      "</div></section>";
  };

  function advisorSummaryText(data) {
    var a = T.advisor;
    if (!data || !a.questions[data.path]) return "";
    var res = a.results[data.key];
    var lines = [a.eyebrow + " — " + a.paths[data.path].t, a.recTitle + ": " + (res ? res.title : "")];
    a.questions[data.path].forEach(function (q) {
      if (data.answers[q.id]) lines.push("• " + q.q + " " + q.opts[data.answers[q.id]]);
    });
    return lines.join("\n");
  }

  function bindContact() {
    var form = document.getElementById("bookingForm");
    if (!form) return;
    var data = getSession("lmv-advisor");
    if (data && data.path) {
      var c = data.contact || {};
      if (c.name) form.name.value = c.name;
      if (c.email) form.email.value = c.email;
      if (c.phone) form.phone.value = c.phone;
      if (SERVICE_FOR_PATH[data.path]) form.service.value = SERVICE_FOR_PATH[data.path];
      form.message.value = advisorSummaryText(data);
      document.getElementById("prefillNote").innerHTML = '<div class="prefill-note">' + ico("spark") + "<span>" + T.contact.prefill + "</span></div>";
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      ["name", "email", "phone", "service", "date"].forEach(function (n) {
        var el = form[n], field = el.closest(".field");
        var valid = el.value.trim() !== "" && (n !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        field.classList.toggle("invalid", !valid);
        el.setAttribute("aria-invalid", String(!valid));
        if (!valid) { ok = false; first = first || el; }
      });
      var cf = form.consent.closest(".field");
      cf.classList.toggle("invalid", !form.consent.checked);
      if (!form.consent.checked) { ok = false; first = first || form.consent; }
      if (!ok) { first.focus(); return; }
      // NOTE: No backend yet. Connect this to a CRM / booking calendar / email service before launch.
      setSession("lmv-booking", { name: form.name.value.trim() });
      location.href = "thank-you.html";
    });
    form.addEventListener("input", function (e) {
      var field = e.target.closest(".field");
      if (field && field.classList.contains("invalid")) field.classList.remove("invalid");
    });
  }

  PAGES.thanks = function () {
    var t = T.thanks, b = getSession("lmv-booking");
    var name = b && b.name ? (lang === "ar" ? " يا " : ", ") + esc(b.name.split(" ")[0]) : "";
    return '<section class="nf"><div style="max-width:640px"><div class="thanks-icon">' + ico("check") + '</div><h1 style="font-size:clamp(2rem,4.5vw,3.2rem)">' + t.title.replace("{name}", function () { return name; }) + '</h1><p class="muted" style="font-size:1.1rem">' + t.text + '</p><div class="hero-ctas" style="justify-content:center;margin-top:28px"><a class="btn btn--gold" href="index.html">' + t.home + '</a><a class="btn btn--ghost" href="knowledge.html">' + t.read + '</a><a class="btn btn--ghost" href="' + waLink() + '" target="_blank" rel="noopener">' + ico("whatsapp") + T.common.whatsapp + "</a></div></div></section>";
  };

  /* ---------- Enhancements ---------- */
  // Current header controls. Global listeners (bound once in bindGlobal) call
  // whichever version the latest render created, so re-rendering on a
  // language switch never stacks up duplicate window/document listeners.
  var ui = { setMega: null, setDrawer: null };
  var observers = [];
  function watch(io) { observers.push(io); return io; }

  function syncHeaderScroll() {
    var h = document.getElementById("siteHeader");
    if (h) h.classList.toggle("scrolled", window.scrollY > 10);
  }

  function bindGlobal() {
    window.addEventListener("scroll", syncHeaderScroll, { passive: true });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && ui.setMega) { ui.setMega(false); ui.setDrawer(false); }
    });
    // Close the mobile drawer (and unlock scrolling) if the window grows to desktop width.
    var wide = window.matchMedia("(min-width: 1241px)");
    var onWide = function () { if (wide.matches && ui.setDrawer) ui.setDrawer(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide); else wide.addListener(onWide);
  }

  function initHeader() {
    var header = document.getElementById("siteHeader");
    syncHeaderScroll();

    var megaBtn = document.getElementById("megaBtn"), mega = document.getElementById("mega"), closeT;
    function setMega(open) { mega.classList.toggle("open", open); megaBtn.setAttribute("aria-expanded", String(open)); header.classList.toggle("menu-open", open); }
    megaBtn.addEventListener("click", function (e) {
      var open = !mega.classList.contains("open");
      setMega(open);
      // Opened from the keyboard (detail 0): move focus into the panel so its links come next.
      if (open && e.detail === 0) { var first = mega.querySelector("a"); if (first) first.focus(); }
    });
    [megaBtn, mega].forEach(function (el) {
      el.addEventListener("mouseenter", function () { clearTimeout(closeT); if (window.matchMedia("(hover: hover)").matches) setMega(true); });
      el.addEventListener("mouseleave", function () { closeT = setTimeout(function () { setMega(false); }, 180); });
      el.addEventListener("focusout", function (e) { if (!mega.contains(e.relatedTarget) && e.relatedTarget !== megaBtn) setMega(false); });
    });

    var toggle = document.getElementById("menuToggle"), drawer = document.getElementById("drawer");
    function setDrawer(open) {
      drawer.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? T.nav.close : T.nav.menu);
      toggle.innerHTML = ico(open ? "close" : "menu");
      header.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); });
    ui.setMega = setMega;
    ui.setDrawer = setDrawer;

    document.getElementById("langSwitch").addEventListener("click", function () {
      lang = lang === "en" ? "ar" : "en";
      setStored("lmv-lang", lang);
      document.body.style.overflow = "";
      renderAll();
      window.scrollTo(0, 0);
    });
  }

  function initFooter() {
    var btn = document.getElementById("motionToggle");
    btn.addEventListener("click", function () {
      motionPref = reduceMotion() ? "full" : "reduce";
      setStored("lmv-motion", motionPref);
      btn.setAttribute("aria-pressed", String(reduceMotion()));
      applyMotion();
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (reduceMotion() || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = watch(new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }));
    els.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    els.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10), suffix = el.getAttribute("data-suffix") || "";
      if (!target || reduceMotion() || !("IntersectionObserver" in window)) return; // placeholders ("00") stay static
      var io = watch(new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        io.disconnect();
        var start = performance.now(), dur = 1600;
        (function tick(now) {
          var p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      }));
      io.observe(el);
    });
  }

  function initHero() {
    var stage = document.getElementById("monoStage"), mono = document.getElementById("mono3d");
    if (!stage || !mono) return;
    var hero = stage.closest(".hero");
    hero.addEventListener("mousemove", function (e) {
      if (reduceMotion()) return;
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      mono.style.transform = "rotateY(" + (x * 22) + "deg) rotateX(" + (-y * 18) + "deg)";
    });
    hero.addEventListener("mouseleave", function () { mono.style.transform = ""; });
  }

  function initJourney() {
    var steps = document.querySelectorAll(".journey .j-step");
    var prog = document.getElementById("jProg"), numEl = document.getElementById("jNum");
    if (!steps.length || !prog || !("IntersectionObserver" in window)) return;
    var C = 289.03, n = steps.length;
    function activate(i) {
      steps.forEach(function (s, k) { s.classList.toggle("active", k === i); });
      prog.style.strokeDashoffset = String(C * (1 - (i + 1) / n));
      numEl.textContent = num(i + 1);
    }
    activate(0);
    var io = watch(new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) activate(parseInt(en.target.dataset.i, 10)); });
    }, { rootMargin: "-45% 0px -45% 0px" }));
    steps.forEach(function (s) { io.observe(s); });
  }

  function initSpotlight() {
    document.querySelectorAll(".svc-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  function initServiceAside() {
    var links = document.querySelectorAll(".svc-aside nav a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var io = watch(new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" }));
    document.querySelectorAll(".svc-block").forEach(function (b) { io.observe(b); });
  }

  /* ---------- Boot ---------- */
  function renderAll() {
    observers.forEach(function (o) { o.disconnect(); });
    observers = [];
    T = window.CONTENT[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    applyMotion();
    var key = own(PAGES, page) ? page : "notFound"; // body data-page="404" falls through to notFound
    var titles = T.meta.titles;
    document.title = page === "home" ? titles.home : ((titles[key] || titles.notFound) + " | " + T.meta.siteName);
    renderHeader();
    var main = document.getElementById("main");
    main.innerHTML = PAGES[key]();
    renderFooter();
    initHeader();
    initFooter();
    if (key === "advisor") bindAdvisor();
    if (key === "contact") bindContact();
    initReveal();
    initCounters();
    initHero();
    initJourney();
    initSpotlight();
    initServiceAside();
  }

  bindGlobal();
  renderAll();
  // Content is drawn by JS after load, so the browser's own jump to #anchor
  // (e.g. about.html#team) found nothing; do it now that the target exists.
  if (location.hash.length > 1) {
    var anchor = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (anchor) anchor.scrollIntoView();
  }
})();
