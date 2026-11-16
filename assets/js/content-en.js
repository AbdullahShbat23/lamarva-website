/* LAMARVA — English content (primary language).
   Items marked PLACEHOLDER must be replaced with approved client content
   (see section 11 of the structure document). */
window.CONTENT = window.CONTENT || {};
window.CONTENT.en = {
  meta: {
    siteName: "LAMARVA Business Services",
    tagline: "Your Business. Our Expertise.",
    titles: {
      home: "LAMARVA Business Services — One Stop Business Solution in the UAE",
      services: "Services",
      investors: "International Investors",
      advisor: "Smart Advisor",
      how: "How We Work",
      about: "About Us",
      stories: "Success Stories",
      knowledge: "Knowledge",
      contact: "Book a Consultation",
      thanks: "Thank You",
      legal: "Legal",
      notFound: "Page Not Found"
    }
  },

  nav: {
    services: "Services",
    investors: "International Investors",
    advisor: "Smart Advisor",
    how: "How We Work",
    about: "About Us",
    knowledge: "Knowledge",
    stories: "Success Stories",
    book: "Book a Consultation",
    langLabel: "العربية",
    langAria: "Switch to Arabic",
    menu: "Open menu",
    close: "Close menu",
    allServices: "View all services",
    megaNote: "Not sure where to start? Let the Smart Advisor map your route in two minutes.",
    skip: "Skip to content",
    home: "Home"
  },

  common: {
    learnMore: "Learn more",
    explore: "Explore service",
    readMore: "Read more",
    readStory: "Read the story",
    bookCta: "Book a Consultation",
    tryAdvisor: "Try the Smart Advisor",
    whatsapp: "Chat on WhatsApp",
    whatsappAria: "Chat with LAMARVA on WhatsApp",
    back: "Back",
    next: "Continue",
    minRead: "min read",
    sample: "Sample — replace with approved content",
    pendingPhoto: "Photo pending",
    noPrices: "We never publish fixed prices. After your consultation you receive a detailed written proposal listing every item — no surprises.",
    bookingBarTitle: "Ready to move forward?",
    bookingBarText: "Speak with a specialist and receive a clear, written proposal.",
    relatedArticles: "Related guides",
    allStories: "All success stories",
    allArticles: "All guides",
    exploreAll: "Explore all services",
    duration: "Indicative duration",
    profileDownload: "Download company profile (PDF)",
    logoDownload: "Download logo",
    downloads: "Downloads",
    stepWord: "Step",
    of: "of"
  },

  services: [
    {
      slug: "company-formation",
      icon: "building",
      title: "Company Formation",
      short: "Mainland and free zone set-up — from choosing your activity to holding your licence.",
      tags: ["Mainland", "Free Zone", "Licensing"],
      heroTitle: "Company Formation in the UAE",
      heroText: "We help you choose the right structure, activity and licensing authority — then handle every step until your licence is issued.",
      for: [
        "Entrepreneurs launching their first UAE company",
        "International companies opening a regional base",
        "Startups that need a fast, well-structured set-up",
        "Existing businesses adding a new entity or branch"
      ],
      includes: [
        "Structure and jurisdiction advisory",
        "Business activity selection",
        "Trade name reservation and initial approval",
        "Memorandum of Association and legal documents",
        "Licence application and issuance",
        "Establishment card and immigration file",
        "Office or flexi-desk coordination",
        "Hand-over checklist for your next steps"
      ],
      stages: [
        { t: "Consultation and structure", d: "We understand your plans and recommend jurisdiction, legal form and activity.", dur: "1–3 days" },
        { t: "Trade name and initial approval", d: "We reserve your trade name and obtain the authority's initial approval.", dur: "2–5 days" },
        { t: "Documents and signing", d: "We prepare the legal documents and coordinate signing, in person or remotely where allowed.", dur: "3–7 days" },
        { t: "Licence issuance", d: "We submit the final application and collect your trade licence.", dur: "3–10 days" },
        { t: "Establishment card and next steps", d: "We open your immigration file so you can apply for visas and a bank account.", dur: "3–5 days" }
      ],
      totalDuration: "Typically 2–6 weeks, depending on jurisdiction and activity.",
      documents: [
        "Passport copies of all shareholders and managers",
        "Recent passport-size photographs",
        "UAE visa and Emirates ID, if resident",
        "Proof of residential address",
        "Short description of the planned activity",
        "Attested corporate documents for corporate shareholders"
      ],
      faq: [
        { q: "Should I choose mainland or a free zone?", a: "A mainland company can trade directly across the UAE market and with government entities. Free zones suit international trade, services and holding structures and are often simpler to set up. We recommend the right option once we understand your activity and your clients." },
        { q: "Do I need to be in the UAE to set up?", a: "Many steps can be completed remotely. Some authorities require you to attend for signing or biometrics — we tell you exactly when, and plan your visit around it." },
        { q: "Can I own 100% of my company?", a: "Free zone companies allow full foreign ownership, and most mainland activities now do as well. A few strategic activities carry conditions — we confirm this for your activity before you commit." },
        { q: "How much will it cost?", a: "It depends on jurisdiction, activity, number of visas and office type. After your consultation you receive a detailed written proposal listing every item." }
      ],
      related: ["mainland-vs-free-zone", "uae-corporate-tax-basics"],
      subs: [
        { slug: "mainland", title: "Mainland Company Formation", text: "Licensed by the economic department of your emirate, a mainland company can trade anywhere in the UAE and contract directly with government entities.", includes: ["Choosing the activity and legal form", "Trade name reservation and initial approvals", "Document preparation and follow-up", "Licence issuance and renewal", "Licence amendments and added activities", "Partner and manager services", "Cancellation and liquidation"] },
        { slug: "free-zone", title: "Free Zone Company Formation", text: "Free zones offer full foreign ownership, streamlined set-up and sector-focused communities — ideal for international trade, services and holding structures.", includes: ["Choosing the right free zone", "Company formation and licensing", "Licence renewal and activity amendments", "Partner changes and manager updates", "Ownership transfer and establishment cards", "Visa and residency services", "Cancellation, liquidation and follow-up"] }
      ]
    },
    {
      slug: "visas-residency",
      icon: "passport",
      title: "Visas & Residency",
      short: "Investor, partner, employee and family visas — including medical test and Emirates ID.",
      tags: ["Investors", "Employees", "Family"],
      heroTitle: "Visas & Residency",
      heroText: "From investor and partner visas to employee and family sponsorship, we prepare, submit and follow up every application — including the medical test and Emirates ID.",
      for: [
        "Investors and partners in UAE companies",
        "Companies hiring and onboarding staff",
        "Residents sponsoring their families",
        "Visitors who need to change status inside the UAE"
      ],
      includes: [
        "Investor and partner visas",
        "Employee visas",
        "Family member visas",
        "Visit visas",
        "Residency issuance and renewal",
        "Visa status amendments",
        "Visa cancellation",
        "Medical check-up and Emirates ID",
        "Establishment visa transactions"
      ],
      stages: [
        { t: "Eligibility review", d: "We confirm the right visa route and list the exact documents for each applicant.", dur: "1 day" },
        { t: "Entry permit or status change", d: "We file the entry permit, or change status if the applicant is already in the UAE.", dur: "3–7 days" },
        { t: "Medical test and biometrics", d: "We book the medical fitness test and Emirates ID biometrics and guide the applicant through them.", dur: "2–5 days" },
        { t: "Residence issuance", d: "We complete the residence application and deliver the Emirates ID.", dur: "3–7 days" }
      ],
      totalDuration: "Typically 2–4 weeks per applicant.",
      documents: [
        "Passport with at least six months' validity",
        "Recent photograph on a white background",
        "Sponsor documents (trade licence, establishment card or tenancy contract)",
        "Attested certificates where required (degree, marriage or birth certificate)",
        "Valid health insurance"
      ],
      faq: [
        { q: "Am I eligible for a long-term (Golden) visa?", a: "Eligibility depends on criteria such as investment, property, profession or achievements. We assess your profile and explain your options honestly." },
        { q: "Can my family join me later?", a: "Yes. Once you hold residency and meet the salary and housing requirements, you can sponsor your spouse, children and, in some cases, parents." },
        { q: "Is a medical test required?", a: "Residence applicants generally complete a medical fitness test. We book it and tell the applicant exactly what to bring." },
        { q: "What does it cost?", a: "Fees vary by visa type and authority. You receive a written proposal with every item listed after your consultation." }
      ],
      related: ["family-visa-guide", "mainland-vs-free-zone"],
      subs: [
        { slug: "investors-partners", title: "Investor & Partner Visas", text: "Residency for shareholders and partners in UAE companies, linked to your company's licence.", includes: ["Investor and partner residence", "Long-term visa eligibility review", "Renewal planning"] },
        { slug: "employees", title: "Employee Visas", text: "Work permits and residence for your team — from offer to Emirates ID.", includes: ["Work permit and labour contract", "Entry permit or status change", "Medical test and Emirates ID", "Renewals and cancellations"] },
        { slug: "family", title: "Family Visas", text: "Sponsor your spouse, children and parents with a clear checklist and full follow-up.", includes: ["Eligibility and document checklist", "Attestation coordination", "Entry permit and residence", "Medical test and Emirates ID"] },
        { slug: "visit-status", title: "Visit Visas & Status Change", text: "Visit visas and change of status inside the UAE, including the medical test and Emirates ID.", includes: ["Tourist and visit visas", "Status change without leaving the country", "Medical fitness test", "Emirates ID biometrics"] }
      ]
    },
    {
      slug: "government-services",
      icon: "landmark",
      title: "Government Services",
      short: "Approvals, attestations and transactions with UAE authorities — handled for you.",
      tags: ["Approvals", "Attestation", "PRO"],
      heroTitle: "Government Services",
      heroText: "One point of contact for your transactions with government departments — approvals, attestations, renewals and follow-up — so you never have to queue or chase.",
      for: [
        "Companies without an in-house government relations officer",
        "Founders who want to focus on running the business",
        "Individuals who need documents processed or attested",
        "Companies with recurring labour and immigration transactions"
      ],
      includes: [
        "Economic & commercial — licence issuance and renewal, company data amendments, partner and manager procedures",
        "Residency & immigration — visas and residency, status amendments and cancellation, establishment transactions",
        "Identity — Emirates ID follow-up and residency-related services",
        "Labour — establishment transactions, employee procedures and labour relations services",
        "Other services — local and federal transactions, document attestation, government approvals follow-up"
      ],
      stages: [
        { t: "Request review", d: "We confirm what is required and which authority handles it.", dur: "Same day" },
        { t: "Document preparation", d: "We prepare, translate and organise every document.", dur: "1–3 days" },
        { t: "Submission", d: "We submit through the correct channel on your behalf.", dur: "1–2 days" },
        { t: "Follow-up and delivery", d: "We track the transaction and deliver the result to you.", dur: "Varies by authority" }
      ],
      totalDuration: "Most transactions complete within a few days to two weeks.",
      documents: [
        "Trade licence and establishment card",
        "Passport and Emirates ID of the authorised signatory",
        "Power of attorney where applicable",
        "The documents to be processed or attested"
      ],
      faq: [
        { q: "Do I need to visit any government office?", a: "In most cases, no. We act on your behalf and only ask you to attend when the authority requires it." },
        { q: "Can you handle documents issued outside the UAE?", a: "Yes. We coordinate attestation through the required chain and arrange certified legal translation." },
        { q: "Can I use you on a recurring basis?", a: "Yes. Many clients use us as their ongoing government relations team. We agree the scope in a written proposal." }
      ],
      related: ["mainland-vs-free-zone"],
      subs: []
    },
    {
      slug: "company-management",
      icon: "briefcase",
      title: "Company Management",
      short: "Renewals, amendments, ownership transfers, liquidation and employee services after formation.",
      tags: ["Renewals", "Amendments", "Liquidation"],
      heroTitle: "Company Management After Formation",
      heroText: "Our relationship does not end when the licence is issued — we continue supporting your company's administrative needs, keeping licences, activities, partners and staff files compliant and up to date.",
      for: [
        "Established companies in mainland or free zones",
        "Owners changing partners, managers or activities",
        "Shareholders transferring or selling ownership",
        "Companies closing or restructuring"
      ],
      includes: [
        "Licence renewal — tracking renewal dates, procedures and required documents",
        "Company amendments — activity, partners, managers and registered data",
        "Ownership transfer",
        "Employee services — following up employee procedures, visas and residency",
        "Establishment services — government procedures required to keep the company active",
        "Company cancellation — licence cancellation and liquidation per approved requirements"
      ],
      stages: [
        { t: "Status review", d: "We review your licence, documents and any deadlines.", dur: "1–2 days" },
        { t: "Plan and documents", d: "We confirm the requirements and prepare resolutions and forms.", dur: "2–5 days" },
        { t: "Submission and approvals", d: "We submit to the authority and obtain the approvals.", dur: "3–15 days" },
        { t: "Updated records", d: "You receive the updated licence and documents.", dur: "1–3 days" }
      ],
      totalDuration: "From a few days for renewals to several weeks for liquidation.",
      documents: [
        "Current trade licence and Memorandum of Association",
        "Shareholder and manager passports and Emirates IDs",
        "Board or shareholder resolution where required",
        "Tenancy contract (for renewals that require it)"
      ],
      faq: [
        { q: "What happens if my licence expires?", a: "Late renewal can lead to fines and can block visas and banking. We track your dates and start renewals in good time." },
        { q: "How long does liquidation take?", a: "It depends on the jurisdiction and whether there are open visas, liabilities or tax registrations. We map every step at the start." },
        { q: "Can I add a new activity to my licence?", a: "Usually yes, subject to authority approval and compatibility with your current licence. We check before you apply." }
      ],
      related: ["uae-corporate-tax-basics"],
      subs: [
        { slug: "renewals", title: "Licence Renewals", text: "On-time renewal of your trade licence, establishment card and related registrations.", includes: ["Renewal reminders", "Tenancy and approval checks", "Renewal processing"] },
        { slug: "amendments", title: "Activities, Partners & Managers", text: "Add or remove activities, partners and managers with the right resolutions and approvals.", includes: ["Activity changes", "Partner entry and exit", "Manager appointment", "Updated legal documents"] },
        { slug: "ownership-transfer", title: "Ownership Transfer", text: "Transfer of shares or full ownership with properly prepared and notarised documents.", includes: ["Share transfer agreements", "Notarisation coordination", "Licence update"] },
        { slug: "liquidation", title: "Cancellation & Liquidation", text: "Orderly closure of your company, with visas, registrations and liabilities settled correctly.", includes: ["Liquidator coordination", "Visa and labour cancellations", "Final clearances", "Licence cancellation"] },
        { slug: "employee-services", title: "Employee Services", text: "Ongoing management of your team's labour and residence files.", includes: ["Onboarding", "Contract updates", "Renewals", "Cancellations"] }
      ]
    },
    {
      slug: "banking-tax",
      icon: "bank",
      title: "Banking & Tax",
      short: "Corporate bank accounts and UAE corporate tax registration and compliance.",
      tags: ["Bank account", "Corporate tax"],
      heroTitle: "Banking & Tax Services",
      heroText: "We prepare a strong application for your corporate bank account and keep your company on track with UAE corporate tax registration and filing.",
      for: [
        "Newly formed companies opening their first account",
        "Companies with non-resident shareholders",
        "Businesses that need corporate tax registration",
        "Owners who want compliance handled correctly"
      ],
      includes: [
        "Bank selection based on your profile",
        "Account application file and compliance documents",
        "Coordination of the bank meeting",
        "Corporate tax registration",
        "Corporate tax filing coordination",
        "Ongoing compliance reminders"
      ],
      stages: [
        { t: "Profile review", d: "We review your company, shareholders and expected transactions.", dur: "1–2 days" },
        { t: "Application file", d: "We prepare a complete, consistent application.", dur: "2–5 days" },
        { t: "Bank and authority submission", d: "We submit to the bank or tax authority and handle questions.", dur: "1–4 weeks" },
        { t: "Activation and follow-up", d: "Your account or registration is active, and we set reminders.", dur: "1–3 days" }
      ],
      totalDuration: "Bank accounts usually take 2–6 weeks; tax registration is usually faster.",
      documents: [
        "Trade licence, MOA and establishment card",
        "Shareholder passports, visas and Emirates IDs",
        "Proof of address for shareholders",
        "Business plan or company profile",
        "Expected transaction volumes and main counterparties"
      ],
      faq: [
        { q: "Do I need a UAE residence visa to open a corporate account?", a: "Requirements differ between banks. Some accept non-resident shareholders with additional documents. We match you to suitable banks." },
        { q: "Does my company need to register for corporate tax?", a: "Most UAE businesses, including many free zone companies, must register for corporate tax even if they owe no tax. We confirm your obligations." },
        { q: "Do you provide accounting or VAT services?", a: "If accounting and VAT services are added, they will sit within Banking & Tax. Ask us during your consultation." }
      ],
      related: ["uae-corporate-tax-basics"],
      subs: [
        { slug: "bank-account", title: "Corporate Bank Account", text: "A well-prepared application to the right bank — the most important factor in a smooth approval.", includes: ["Bank shortlisting", "Application preparation", "Meeting coordination", "Follow-up until activation"] },
        { slug: "corporate-tax", title: "Corporate Tax", text: "Registration and filing support so your company meets its UAE corporate tax obligations.", includes: ["Registration", "Deadline tracking", "Filing coordination"] }
      ]
    }
  ],

  home: {
    hero: {
      eyebrow: "One Stop Business Solution",
      title: "Your business in the UAE, <span class=\"gold-text\">guided end to end.</span>",
      lead: "One point of contact for investors — from the first idea to company formation, visas, banking and every renewal after.",
      note: "Consultation-led. Every proposal is written, detailed and itemised."
    },
    scroll: "Scroll",
    trustLabels: ["Years of experience", "Files completed", "Nationalities served", "Client satisfaction"],
    partnersLabel: "Accredited authorities & partners",
    partnerSlot: "Partner logo",
    services: { eyebrow: "What we do", title: "Five pillars. One trusted partner.", text: "Everything a company needs in the UAE, managed by one team that knows the procedures." },
    journey: {
      eyebrow: "The investor journey",
      title: "From idea to renewal — we stay with you.",
      text: "Most providers stop at the licence. We plan the whole journey and stay with you after it.",
      ringLabel: "Stage",
      steps: [
        { t: "Project idea", d: "We listen to your plans, your market and your timeline." },
        { t: "Activity study", d: "We study your business activity and what it requires in the UAE." },
        { t: "Mainland or free zone", d: "We compare jurisdictions and recommend the one that fits your clients and goals." },
        { t: "Activity & legal form", d: "We confirm the licensed activity and the right legal structure." },
        { t: "Formation & licensing", d: "Name, approvals, documents and licence — handled step by step." },
        { t: "Establishment services", d: "Establishment card and the government files your company needs to operate." },
        { t: "Visas & residency", d: "Residency for you, your partners, your team and your family." },
        { t: "Government services & renewal", d: "Renewals, amendments and government transactions — for as long as you need us." }
      ]
    },
    advisor: {
      eyebrow: "Smart Advisor",
      title: "Know your route in two minutes.",
      text: "Answer a few short questions and get a recommended structure, the stages, an indicative duration and the documents you'll need — no prices, no commitment.",
      boxTitle: "What brings you to LAMARVA?",
      boxSub: "Choose one to start"
    },
    why: {
      eyebrow: "Why LAMARVA",
      title: "Built around trust, not transactions.",
      items: [
        { icon: "target", t: "Single point of contact", d: "Instead of dealing with multiple offices and authorities." },
        { icon: "compass", t: "Procedural expertise", d: "We understand every transaction's requirements and the authority behind it." },
        { icon: "clock", t: "Time savings", d: "We handle the bulk of the administrative follow-up." },
        { icon: "user", t: "Personal service", d: "We understand each project's needs before proposing a solution." },
        { icon: "refresh", t: "Continuous follow-up", d: "We track transaction status and complete requirements as needed." },
        { icon: "users", t: "Solutions for companies & individuals", d: "Investors, companies, employees and families — one ecosystem." }
      ]
    },
    who: {
      eyebrow: "Who we serve",
      title: "Partners for every stage of business.",
      items: [
        { icon: "crown", t: "Entrepreneurs & investors", d: "Launching and growing in the UAE." },
        { icon: "spark", t: "Startups", d: "Fast, well-structured set-ups." },
        { icon: "globe", t: "International companies", d: "Regional bases and branches." },
        { icon: "building", t: "Established companies", d: "Ongoing compliance and growth." },
        { icon: "home", t: "Families & employees", d: "Residency and relocation." }
      ]
    },
    intl: {
      eyebrow: "International investors",
      title: "Coming from abroad? We map the whole route.",
      text: "From your first call to your Emirates ID, we guide investors from outside the UAE through every decision — formation, residency, family, banking and after.",
      cta: "The investor guide"
    },
    stories: { eyebrow: "Success stories", title: "Results our clients can build on." },
    testimonial: { quote: "They took a process we expected to be complicated and made it clear at every step. We always knew what came next.", who: "Client testimonial — to be replaced with an approved quote" },
    team: { eyebrow: "Our team", title: "The people behind your file.", cta: "Meet the team" },
    knowledge: { eyebrow: "Knowledge", title: "Guides for confident decisions." },
    final: {
      title: "Your gateway to doing business in the UAE.",
      text: "From company formation to ongoing support. Book a consultation — we'll listen, recommend the right route and send you a detailed written proposal."
    }
  },

  servicesPage: {
    eyebrow: "Our services",
    title: "Everything your company needs, under one roof.",
    lead: "Five pillars that cover the full life of a UAE company — from formation to the day-to-day work that keeps it compliant.",
    nav: { for: "Who it's for", includes: "What's included", stages: "Stages & duration", documents: "Documents", faq: "FAQ", related: "Related guides" },
    blocks: {
      forTitle: "Who this service is for",
      includesTitle: "What's included",
      stagesTitle: "Stages and duration",
      documentsTitle: "Documents required",
      documentsNote: "Your final checklist depends on your nationality, activity and authority. We confirm it during consultation.",
      faqTitle: "Frequently asked questions",
      relatedTitle: "Related guides",
      subTitle: "Services in this area",
      overview: "Overview"
    },
    asideTitle: "Talk to a specialist",
    asideText: "Get a clear plan and a written proposal for your case."
  },

  investors: {
    eyebrow: "International investors",
    title: "Your UAE business, planned from abroad.",
    lead: "If you are investing from outside the UAE, you need more than a licence. You need a partner who plans the whole route — and walks it with you.",
    journeyEyebrow: "Your journey",
    journeyTitle: "Eight stages, one point of contact.",
    steps: [
      { t: "Initial consultation", d: "We learn about your business, your markets and your plans for living or travelling to the UAE." },
      { t: "Formation options", d: "We compare mainland and free zone options for your activity, clients and budget." },
      { t: "Activity and licensing authority", d: "We select the business activity and the authority that fits your plans." },
      { t: "Company formation", d: "We handle the name, approvals, documents and licence — remotely wherever possible." },
      { t: "Visas and residency", d: "We arrange your investor or partner residency, including medical test and Emirates ID." },
      { t: "Family and employee services", d: "We sponsor your family and onboard your first employees." },
      { t: "Government follow-up", d: "We manage transactions with authorities so you don't have to." },
      { t: "After formation", d: "Renewals, amendments, banking and tax — we stay with you." }
    ],
    whoTitle: "Who we work with",
    remoteTitle: "What you can do remotely",
    remote: [
      "Initial consultation by video call",
      "Structure and activity decisions",
      "Trade name and initial approval",
      "Most document preparation",
      "Bank application preparation"
    ],
    remoteNote: "Some steps — such as signing with certain authorities, medical tests and biometrics — need you in the UAE. We plan your trip so it is as short as possible.",
    cta: { title: "Start with a consultation.", text: "Tell us about your plans. We'll recommend a route and send a written proposal." }
  },

  advisor: {
    eyebrow: "Smart Advisor",
    welcomeTitle: "Find your route in about two minutes.",
    welcomeText: "Answer three or four short questions. You'll get a recommended structure, the stages, an indicative duration and the documents you need.",
    welcomePoints: ["No prices, no commitment", "One question per screen", "Your summary carries into your booking"],
    start: "Start",
    q1: "What brings you to LAMARVA?",
    paths: {
      new: { t: "Start a new company", d: "Formation in mainland or a free zone", icon: "building" },
      existing: { t: "I have a company and need services", d: "Renewals, changes, staff, closure", icon: "briefcase" },
      visas: { t: "Visas & residency", d: "For investors, employees or family", icon: "passport" },
      banking: { t: "Bank account & tax", d: "Corporate account and corporate tax", icon: "bank" }
    },
    questions: {
      new: [
        { id: "activity", q: "What kind of business will it be?", opts: { trading: "Trading — buying and selling goods", services: "Professional or consulting services", tech: "Technology, media or e-commerce", industrial: "Industrial, manufacturing or contracting" } },
        { id: "clients", q: "Who will your main clients be?", opts: { local: "Companies and consumers inside the UAE", gov: "UAE government entities", intl: "Mostly international or online clients" } },
        { id: "visas", q: "How many residence visas will you need in the first year?", opts: { v1: "1–2", v2: "3–5", v3: "6 or more" } }
      ],
      existing: [
        { id: "need", q: "What do you need?", opts: { renew: "Renew my licence", amend: "Change activities, partners or managers", transfer: "Transfer ownership", liquidate: "Cancel or liquidate the company", staff: "Employee services" } },
        { id: "juris", q: "Where is your company licensed?", opts: { mainland: "Mainland", freezone: "A free zone", unsure: "I'm not sure" } },
        { id: "urgency", q: "How soon do you need it done?", opts: { urgent: "Within 30 days", soon: "In the next 1–3 months", flexible: "No fixed deadline" } }
      ],
      visas: [
        { id: "who", q: "Who is the visa for?", opts: { investor: "Myself, as investor or partner", employee: "My employees", family: "My family", visit: "A visitor or a change of status" } },
        { id: "location", q: "Is the applicant in the UAE now?", opts: { inside: "Yes, inside the UAE", outside: "No, outside the UAE" } },
        { id: "count", q: "How many people?", opts: { c1: "One", c2: "2–5", c3: "More than 5" } }
      ],
      banking: [
        { id: "need", q: "What do you need?", opts: { account: "Open a corporate bank account", tax: "Corporate tax registration or filing", both: "Both" } },
        { id: "stage", q: "Where is your company today?", opts: { notyet: "Not formed yet", young: "Formed less than a year ago", est: "Operating for more than a year" } },
        { id: "residency", q: "Do the shareholders live in the UAE?", opts: { all: "Yes, all of them", some: "Some of them", none: "None of them" } }
      ]
    },
    contactTitle: "Where should we send your summary?",
    contactText: "Optional — we'll use this to pre-fill your booking so you don't type it twice.",
    contactSkip: "Skip and see my result",
    contactSubmit: "See my result",
    fields: { name: "Full name", email: "Email", phone: "Phone or WhatsApp" },
    resultBadge: "Your recommended route",
    recTitle: "Recommendation",
    stagesTitle: "Stages",
    durationTitle: "Indicative duration",
    docsTitle: "Documents you'll need",
    notesTitle: "Based on your answers",
    bookWithSummary: "Book a consultation with this summary",
    restart: "Start again",
    durationNote: "Indicative only. We confirm timelines once we review your documents.",
    notes: {
      gov: "Working with UAE government entities generally requires a mainland licence.",
      industrial: "Industrial and contracting activities usually need a mainland licence and specific approvals.",
      intl: "With mainly international clients, a free zone is often the efficient choice.",
      local: "Selling directly to the UAE market points towards a mainland licence; some free zones offer routes to trade locally through distributors.",
      v3: "Six or more visas usually means a physical office. Visa quotas depend on office size.",
      outside: "As the applicant is outside the UAE, we start with an entry permit.",
      inside: "As the applicant is inside the UAE, we can usually change status without leaving the country.",
      urgent: "With a deadline under 30 days, we prioritise your file from day one.",
      unsure: "Not sure of your jurisdiction? Your trade licence tells us — we'll check it in the consultation.",
      nonres: "Non-resident shareholders often need extra documents for the bank. We prepare them in advance.",
      notyet: "Your company needs to be formed first. We can combine formation, bank and tax into one plan.",
      many: "For several applicants, we run the applications in parallel."
    },
    results: {
      new_freezone: { title: "Free zone company", summary: "A free zone company fits your activity and client base: full foreign ownership, a streamlined set-up and the right community for your sector.", stages: ["Choose the right free zone and package", "Reserve the name and obtain initial approval", "Sign the documents and obtain the licence", "Open the immigration file and apply for visas", "Prepare the bank account application"], duration: "About 2–4 weeks", docs: ["Shareholder passport copies", "Photographs", "Proof of address", "Short activity description"] },
      new_mainland: { title: "Mainland company", summary: "A mainland company gives you direct access to the UAE market and to government contracts, with the flexibility to grow your team.", stages: ["Confirm the legal form and activity", "Reserve the trade name and obtain initial approval", "Sign the Memorandum of Association", "Secure an office and register the tenancy", "Issue the licence and open the immigration file"], duration: "About 3–6 weeks", docs: ["Shareholder and manager passport copies", "Photographs", "Proof of address", "Office tenancy contract (we help you secure one)"] },
      ex_renew: { title: "Licence renewal", summary: "We review your licence, tenancy and approvals, then renew your licence and related registrations on time.", stages: ["Check expiry dates and outstanding requirements", "Renew or confirm the tenancy where needed", "Submit the renewal", "Update the establishment card"], duration: "About 3–10 days", docs: ["Current trade licence", "Tenancy contract", "Owner or manager passport and Emirates ID"] },
      ex_amend: { title: "Licence amendment", summary: "We prepare the resolutions and approvals to change your activities, partners or managers, and issue the updated licence.", stages: ["Confirm what can be changed and how", "Draft resolutions and amended documents", "Notarise and submit", "Collect the updated licence"], duration: "About 1–3 weeks", docs: ["Trade licence and MOA", "Passports and Emirates IDs of current and new partners or managers", "Shareholder resolution"] },
      ex_transfer: { title: "Ownership transfer", summary: "We structure the share transfer, prepare the agreements and update your licence and records.", stages: ["Review company status and clearances", "Draft the share transfer agreement", "Notarise and submit", "Issue the updated licence and records"], duration: "About 2–4 weeks", docs: ["Trade licence and MOA", "Seller and buyer passports and Emirates IDs", "Board or shareholder resolution"] },
      ex_liquidate: { title: "Cancellation & liquidation", summary: "We close your company in the right order — visas, registrations and liabilities first, then licence cancellation.", stages: ["Review open visas, liabilities and registrations", "Appoint the liquidator where required", "Cancel visas and labour files", "Obtain clearances", "Cancel the licence"], duration: "Several weeks, depending on jurisdiction", docs: ["Trade licence and MOA", "Shareholder resolution to liquidate", "List of employees and visas", "Recent financial statements where required"] },
      ex_staff: { title: "Employee services", summary: "We manage your team's work permits and residence files — onboarding, renewals and cancellations.", stages: ["Review the employee list and dates", "Prepare contracts and permits", "Process entry, medical and Emirates ID", "Track renewals"], duration: "About 2–4 weeks per new employee", docs: ["Trade licence and establishment card", "Employee passport and photo", "Attested degree where required"] },
      visa_investor: { title: "Investor or partner residency", summary: "Residency linked to your shareholding, with a review of long-term visa eligibility.", stages: ["Confirm eligibility and visa route", "Entry permit or status change", "Medical test and biometrics", "Residence and Emirates ID"], duration: "About 2–3 weeks", docs: ["Passport and photo", "Trade licence and MOA showing your shareholding", "Establishment card", "Health insurance"] },
      visa_employee: { title: "Employee visas", summary: "Work permits and residence for your team, managed from offer to Emirates ID.", stages: ["Work permit and labour contract", "Entry permit or status change", "Medical test and biometrics", "Residence and Emirates ID"], duration: "About 2–4 weeks per employee", docs: ["Employee passport and photo", "Attested degree where required", "Company licence and establishment card"] },
      visa_family: { title: "Family sponsorship", summary: "Residency for your spouse, children or parents, with a clear checklist and attestation support.", stages: ["Check sponsor eligibility", "Attest marriage and birth certificates", "Entry permit or status change", "Medical test, biometrics and residence"], duration: "About 2–4 weeks", docs: ["Sponsor's residence visa and Emirates ID", "Salary certificate or employment contract", "Tenancy contract", "Attested marriage and birth certificates"] },
      visa_visit: { title: "Visit visa or status change", summary: "A visit visa, or a change of status inside the UAE, including medical test and Emirates ID where needed.", stages: ["Confirm the right visa type", "Apply for the visa or status change", "Medical test and biometrics if moving to residence", "Issue the visa"], duration: "About 3–10 days", docs: ["Passport and photo", "Current visa or entry stamp", "Sponsor documents where applicable"] },
      bank_account: { title: "Corporate bank account", summary: "A complete, consistent application to the banks that fit your profile — the key to a smooth approval.", stages: ["Review company and shareholder profile", "Shortlist suitable banks", "Prepare the application file", "Coordinate the bank meeting", "Follow up until activation"], duration: "About 2–6 weeks", docs: ["Trade licence, MOA and establishment card", "Shareholder passports, visas and Emirates IDs", "Business plan or company profile", "Expected transactions and counterparties"] },
      bank_tax: { title: "Corporate tax registration", summary: "We register your company for UAE corporate tax and track your deadlines so you stay compliant.", stages: ["Confirm your obligations", "Prepare registration details", "Submit the registration", "Set filing reminders"], duration: "About 1–3 weeks", docs: ["Trade licence and MOA", "Owner passport and Emirates ID", "Financial year details"] },
      bank_both: { title: "Bank account and corporate tax", summary: "One plan for your corporate bank account and corporate tax registration, prepared together for consistency.", stages: ["Review your profile", "Prepare the bank application and tax registration", "Submit both", "Follow up and set compliance reminders"], duration: "About 2–6 weeks", docs: ["Trade licence, MOA and establishment card", "Shareholder passports and Emirates IDs", "Business plan or company profile", "Financial year details"] }
    }
  },

  how: {
    eyebrow: "How we work",
    title: "Six clear stages. No surprises.",
    lead: "Every file follows the same disciplined method, so you always know where things stand and what comes next.",
    steps: [
      { t: "Listen", d: "We understand your needs and the nature of your project." },
      { t: "Analyse", d: "We review the options and the requirements." },
      { t: "Define the route", d: "We set the procedures, the competent authority and the documents." },
      { t: "Execute", d: "We start the transaction in line with official requirements." },
      { t: "Follow up", d: "We track the application and any additional requirements." },
      { t: "Complete", d: "We finalise the transaction and hand over documents and results." }
    ],
    promiseTitle: "What you can expect",
    promise: [
      "A written proposal listing every item before we begin",
      "A dedicated contact who knows your file",
      "Regular updates — you never have to chase",
      "Organised documents you can find later"
    ]
  },

  about: {
    eyebrow: "About LAMARVA",
    title: "Your business. Our expertise.",
    lead: "One Stop Business Solution — a single point of contact for your business in the UAE.",
    storyTitle: "Who we are",
    story: [
      "LAMARVA Business Services is a specialised firm offering integrated solutions for entrepreneurs, investors and companies looking to establish or grow their business in the UAE — from activity planning and company formation to visas, residency, government services and ongoing follow-up.",
      "Mainland and free zone set-up under one roof. From the initial idea to renewal and follow-up. And personal service — we understand your needs first."
    ],
    storyNote: "",
    vision: { t: "Our vision", d: "To become one of the most trusted names in business formation and transaction services in the UAE — delivering speed, accuracy, procedural expertise and genuine care for client experience." },
    mission: { t: "Our mission", d: "To provide practical, integrated solutions for entrepreneurs, investors and companies, simplifying the process of formation, licensing, visas and government services — and following every transaction through to completion." },
    valuesTitle: "Our values",
    values: [
      { t: "Professionalism", d: "A clear, structured approach with every client and every transaction." },
      { t: "Accuracy", d: "Careful review of data and documents before submission." },
      { t: "Confidentiality", d: "Client data and documents are treated with full privacy." },
      { t: "Transparency", d: "Clarity on service, requirements and costs." },
      { t: "Speed", d: "Organised, continuous follow-up to save time and effort." },
      { t: "Partnership", d: "We build lasting relationships, not one-off transactions." }
    ],
    commitTitle: "Our commitment to you",
    commit: ["Clear requirements from the start", "Organised documents", "Continuous follow-up", "Confidentiality of your information", "Responsive communication", "Full compliance with official procedures"],
    teamTitle: "Our team",
    teamText: "Specialists in formation, residency, government relations and compliance.",
    team: [
      { initials: "LB", name: "Name to be confirmed", role: "Managing Director", bio: "Years of experience and specialities to be added." },
      { initials: "LB", name: "Name to be confirmed", role: "Company Formation Lead", bio: "Years of experience and specialities to be added." },
      { initials: "LB", name: "Name to be confirmed", role: "Visas & Residency Lead", bio: "Years of experience and specialities to be added." },
      { initials: "LB", name: "Name to be confirmed", role: "Banking & Tax Lead", bio: "Years of experience and specialities to be added." }
    ]
  },

  stories: [
    { id: "tech-founder-free-zone", tag: "Company Formation", title: "A European software founder, licensed and banking-ready", summary: "Free zone formation, investor residency and a corporate bank account — planned as one route.", metrics: [{ v: "3", l: "services in one plan" }, { v: "1", l: "point of contact" }], challenge: "The founder was relocating from Europe and needed a company, residency and a bank account — with limited time in the UAE.", approach: "We recommended a free zone suited to software services, completed most steps remotely and planned a single short visit for signing, medical test and biometrics.", result: "The company was licensed, the founder became resident and the bank application was submitted with a complete file." },
    { id: "trading-mainland-expansion", tag: "Visas & Residency", title: "A trading company scales its team on the mainland", summary: "Mainland licence amendment and visas for a growing team, coordinated in parallel.", metrics: [{ v: "12", l: "employee visas" }, { v: "1", l: "licence amendment" }], challenge: "A growing trading business needed to add activities and bring in a team quickly.", approach: "We amended the licence, planned the office and visa quota, and ran the employee applications in parallel.", result: "The team was onboarded with all residence files complete, and the company's records were up to date." },
    { id: "family-relocation", tag: "Family Visas", title: "An investor family settles in the UAE", summary: "Investor residency followed by sponsorship for a spouse and three children.", metrics: [{ v: "5", l: "residence visas" }, { v: "0", l: "office visits for the family" }], challenge: "An investor wanted the whole family resident before the new school year.", approach: "We arranged the investor's residency first, coordinated attestation of family documents abroad and booked every appointment in one plan.", result: "The whole family received residency and Emirates IDs in time for school." }
  ],
  storiesPage: { eyebrow: "Success stories", title: "Real routes, clearly delivered.", lead: "How we helped investors, companies and families get where they needed to be.", challenge: "The challenge", approach: "Our approach", result: "The result", ctaTitle: "Have a similar plan?" },

  articles: [
    {
      id: "mainland-vs-free-zone", tag: "Guide", mins: 6,
      title: "Mainland vs Free Zone: choosing the right structure",
      summary: "The questions that decide where your UAE company should be licensed.",
      body: [
        { p: "Choosing between a mainland and a free zone licence is usually the first major decision when you set up in the UAE. The right answer depends less on preference than on how and where you plan to do business." },
        { h: "Start with your clients" },
        { p: "If you will sell directly to customers across the UAE, or bid for government contracts, a mainland licence is usually the natural fit. If most of your clients are abroad or online, a free zone can be the efficient choice." },
        { h: "Consider your activity" },
        { p: "Some activities — such as many industrial, contracting and regulated activities — are typically licensed on the mainland. Free zones often specialise by sector, offering a community and facilities built for your industry." },
        { h: "Think about your team" },
        { list: ["Visa quotas are usually linked to your office space", "A larger team usually means a physical office", "Flexi-desk options suit small teams and early stages"] },
        { callout: "There is no universally better option. We recommend a structure after understanding your activity, clients, team and plans." }
      ]
    },
    {
      id: "uae-corporate-tax-basics", tag: "Tax", mins: 5,
      title: "UAE corporate tax: what new companies should know",
      summary: "Registration, deadlines and the basics every founder should understand.",
      body: [
        { p: "The UAE introduced a federal corporate tax for financial years starting on or after 1 June 2023. Most businesses are within scope, including many free zone companies." },
        { h: "Registration comes first" },
        { p: "Most companies need to register for corporate tax, even if they expect to pay little or no tax. Registration deadlines depend on when your licence was issued, so it is worth acting early." },
        { h: "Know your financial year" },
        { p: "Your filing obligations follow your financial year. Keep clear records from the start — it makes filing simpler and reduces the risk of penalties." },
        { h: "Free zone companies" },
        { p: "Qualifying free zone persons may benefit from a 0% rate on qualifying income, subject to conditions. Whether your company qualifies depends on its activities and substance." },
        { callout: "This guide is general information, not tax advice. We confirm your specific obligations during consultation." }
      ]
    },
    {
      id: "family-visa-guide", tag: "Residency", mins: 4,
      title: "Sponsoring your family in the UAE: a practical guide",
      summary: "Eligibility, documents and the steps to bring your family with you.",
      body: [
        { p: "Once you hold UAE residency, you can usually sponsor your spouse and children, and in some cases your parents. Preparation is what keeps the process smooth." },
        { h: "Check eligibility" },
        { p: "Sponsors generally need to meet minimum salary and suitable housing requirements. The exact conditions depend on your situation." },
        { h: "Prepare documents early" },
        { list: ["Attested marriage certificate", "Attested birth certificates for children", "Your tenancy contract", "Salary certificate or employment contract", "Passports and photographs"] },
        { p: "Documents issued abroad usually need attestation in the country of issue and in the UAE. This step takes the longest, so start it first." },
        { callout: "We give you a checklist tailored to your family and coordinate every appointment." }
      ]
    }
  ],
  knowledgePage: { eyebrow: "Knowledge", title: "Guides for doing business in the UAE.", lead: "Clear, practical explanations of formation, residency, banking and tax.", disclaimer: "General information only — not legal or tax advice." },

  contact: {
    eyebrow: "Book a consultation",
    title: "Let's talk about your plans.",
    lead: "Tell us a little about what you need. A specialist will confirm your appointment and prepare for the conversation.",
    prefill: "We've added your Smart Advisor summary to the form.",
    fields: {
      name: "Full name", email: "Email", phone: "Phone or WhatsApp", country: "Country of residence",
      service: "What do you need help with?", servicePlaceholder: "Choose a service", other: "Not sure yet",
      date: "Preferred date", time: "Preferred time", mode: "Meeting type",
      message: "Anything we should know?", messagePlaceholder: "Your plans, timelines or questions",
      optional: "(optional)", consent: "I agree to LAMARVA contacting me about my request, in line with the Privacy Policy."
    },
    modes: { video: "Video call", office: "At our office", phone: "Phone call" },
    errors: { required: "Please complete this field.", email: "Please enter a valid email.", consent: "Please confirm to continue." },
    submit: "Request my consultation",
    note: "Times are in UAE time (GST, UTC+4). We confirm by email or WhatsApp.",
    asideTitle: "Prefer to talk now?",
    asideText: "WhatsApp is the fastest way to reach us.",
    contactTitle: "Contact details",
    labels: { phone: "Phone", email: "Email", address: "Office", hours: "Hours" },
    hours: "Monday–Friday, 9:00–18:00",
    nextTitle: "What happens next",
    next: ["We confirm your appointment", "A specialist reviews your summary", "We meet and recommend your route", "You receive a detailed written proposal"]
  },
  thanks: {
    title: "Thank you{name}.",
    text: "Your request is in. We'll confirm your appointment shortly by email or WhatsApp.",
    next: "While you wait",
    home: "Back to home",
    read: "Read our guides"
  },

  legal: {
    draft: "Draft text — to be reviewed and approved by LAMARVA's legal adviser before launch.",
    pages: {
      privacy: { title: "Privacy Policy", body: [
        { h: "Information we collect", p: "We collect the details you share with us through our forms, Smart Advisor and WhatsApp, such as your name, contact details and information about your business needs." },
        { h: "How we use it", p: "We use your information to respond to your request, prepare your consultation and proposal, and provide the services you ask for." },
        { h: "Sharing", p: "We share information with government authorities, banks and service partners only as needed to deliver your services." },
        { h: "Your rights", p: "You can ask us to access, correct or delete your information at any time by contacting us." }
      ]},
      terms: { title: "Terms of Use", body: [
        { h: "Use of this website", p: "This website provides general information about our services. It does not constitute legal, tax or financial advice." },
        { h: "Proposals", p: "Services are provided under a written proposal agreed with each client. Indicative timelines shown on this site are not guarantees." },
        { h: "Changes", p: "Government requirements change from time to time. We update our guidance accordingly." }
      ]},
      cookies: { title: "Cookie Policy", body: [
        { h: "What we use", p: "This website stores your language and motion preferences in your browser. It does not use advertising cookies." },
        { h: "Analytics", p: "If analytics are added, we will describe them here and ask for your consent where required." }
      ]}
    }
  },
  notFound: { title: "This page has moved on.", text: "The page you're looking for doesn't exist or has been moved.", home: "Back to home", advisor: "Try the Smart Advisor" },

  footer: {
    about: "Your gateway to doing business in the UAE — from company formation to ongoing support.",
    services: "Services",
    company: "Company",
    knowledge: "Knowledge",
    contact: "Contact",
    links: { about: "About us", how: "How we work", stories: "Success stories", investors: "International investors", advisor: "Smart Advisor", guides: "Guides", contact: "Book a consultation" },
    legal: { privacy: "Privacy", terms: "Terms", cookies: "Cookies" },
    licences: "Licences & accreditations",
    licencePlaceholder: "Licence details to be added",
    rights: "All rights reserved.",
    motion: "Reduce motion"
  }
};
