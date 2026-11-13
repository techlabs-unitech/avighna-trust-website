import sheet from "./sheet.json";
import type { ImageKey } from "./images";

/* ------------------------------------------------------------------ */
/*  Content model                                                      */
/* ------------------------------------------------------------------ */

export type Block =
  | { t: "p"; text: string }
  | { t: "list"; title?: string; items: string[] }
  | { t: "defs"; items: { term: string; text: string }[] }
  | { t: "cards"; items: { title: string; text: string; sa?: string; href?: string }[] }
  | { t: "steps"; items: { title: string; text: string }[] }
  | { t: "note"; title: string; text: string }
  | { t: "quote"; sa: string; en: string }
  | { t: "links"; items: { label: string; href: string; ghost?: boolean }[] };

export type Section = {
  id: string;
  title: string;
  sa?: string;
  intro?: string;
  blocks: Block[];
};

export type Page = {
  path: string;
  title: string;
  sa: string;
  /** Short line above the title */
  kicker: string;
  lead: string;
  image: ImageKey;
  sections: Section[];
  actions?: { label: string; href: string; ghost?: boolean }[];
  /** Pages to suggest at the end */
  next?: { label: string; href: string; sa?: string }[];
};

const t = sheet;
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const contactLink = (label = "Write to us"): Block => ({
  t: "links",
  items: [{ label, href: "/contact" }],
});

/** Donation categories: sheet keys → routes */
const donationMeta = [
  { key: "VIDYADANAM", slug: "vidyadanam", title: "Vidyādānam", sa: "विद्यादानम्", tagline: "The gift of learning", image: "ganeshaMiniature" as ImageKey },
  { key: "ANNADANAM", slug: "annadanam", title: "Annadānam", sa: "अन्नदानम्", tagline: "The gift of food", image: "ganeshaStatue" as ImageKey },
  { key: "GO DANAM", slug: "go-danam", title: "Go Dānam", sa: "गोदानम्", tagline: "Care for Gomata", image: "keralaTemple" as ImageKey },
  { key: "VEDA RAKSHANAM", slug: "veda-rakshanam", title: "Veda Rakṣaṇam", sa: "वेदरक्षणम्", tagline: "Protecting the Vedas", image: "yajna" as ImageKey },
  { key: "DEVA DANAM", slug: "deva-danam", title: "Deva Dānam", sa: "देवदानम्", tagline: "Offerings to the temple", image: "madurai2" as ImageKey },
  { key: "AROGHYADANAM", slug: "aroghyadanam", title: "Ārogyadānam", sa: "आरोग्यदानम्", tagline: "The gift of health", image: "ganeshaMedieval" as ImageKey },
  { key: "VRDDHASHRAMA DANAM", slug: "vrddhashrama-danam", title: "Vṛddhāśrama Dānam", sa: "वृद्धाश्रमदानम्", tagline: "Shelter for our elders", image: "dravidaTemple" as ImageKey },
] as const;

export const donationCategories = donationMeta.map((m) => {
  const d = (t.donation as Record<string, { name: string; text: string; sponsorTitle: string; sponsor: string[] }>)[m.key];
  return { ...m, text: clean(d.text), sponsorTitle: d.sponsorTitle, sponsor: d.sponsor.map(clean) };
});

/* ------------------------------------------------------------------ */
/*  OUR STORY                                                          */
/* ------------------------------------------------------------------ */

const wings = t.story.extras.slice(1).map((line) => line.replace(/^Institutional Wings Managed by the Trust:\s*/, ""));
const wingCards = wings.map((w) => {
  const i = w.indexOf(":");
  return { title: clean(w.slice(0, i)).replace(/\s*\(OLD AGE HOME\)\s*$/i, " (Old-age home)").replace("Community Outreach(E-Jnana-kendram)", "Community Outreach (E-Jñāna-kendram)"), text: clean(w.slice(i + 1)) };
});
const wingLinks = [
  "/knowledge-centre/vedavani-pathashala",
  "/knowledge-centre/granthalayam",
  "/retired-living",
  "/knowledge-centre/e-jnana-kendram",
];

const ourStory: Page = {
  path: "/our-story",
  title: "Our Story",
  sa: "अस्माकं कथा",
  kicker: "Asmākaṁ Kathā",
  lead: clean(t.story.overview),
  image: "ganeshaStatue",
  sections: [
    {
      id: "journey",
      title: "A free home for the Vedas",
      sa: "आश्रयः",
      blocks: [
        { t: "p", text: clean(t.story.extras[0].replace(/^100% Free Residential Provision:\s*/, "100% free residential provision — ")) },
        {
          t: "cards",
          items: wingCards.map((c, i) => ({ ...c, href: wingLinks[i] })),
        },
      ],
    },
    {
      id: "vision",
      title: "Vision",
      sa: "दृष्टिः",
      blocks: [{ t: "quote", sa: "लोकाः समस्ताः सुखिनो भवन्तु", en: clean(t.vision) }],
    },
    {
      id: "mission",
      title: "Mission",
      sa: "लक्ष्यम्",
      blocks: [{ t: "quote", sa: "सर्वे भवन्तु सुखिनः", en: clean(t.mission) }],
    },
    {
      id: "values",
      title: "Guiding values",
      sa: "मूल्यानि",
      blocks: [
        {
          t: "cards",
          items: t.values.map((v) => ({ title: `${v.en} — ${v.title}`, sa: v.sa, text: clean(v.text) })),
        },
      ],
    },
    {
      id: "darsanam",
      title: "Darśanam",
      sa: "दर्शनम्",
      blocks: [
        { t: "p", text: clean(t.trust.darsanam) },
        { t: "links", items: [{ label: "Explore our temple rituals", href: "/ritual" }, { label: "Pilgrimages", href: "/pilgrimage", ghost: true }] },
      ],
    },
    {
      id: "devaseva-karya",
      title: "Devaseva Kārya",
      sa: "देवसेवाकार्यम्",
      blocks: [
        { t: "p", text: clean(t.trust.devaseva) },
        { t: "links", items: [{ label: "Pūjā, Homa & Yajña", href: "/ritual/puja" }] },
      ],
    },
    {
      id: "recognition",
      title: "Recognition",
      sa: "मान्यता",
      blocks: [
        {
          t: "note",
          title: "Certificates & registrations",
          text: "Our registration certificates and recognitions will be published here. Please write to us if you would like to see them in the meantime.",
        },
      ],
    },
    {
      id: "samsthapaka",
      title: "Saṁsthāpaka",
      sa: "संस्थापकाः",
      intro: "The founders",
      blocks: [
        {
          t: "note",
          title: "Our founders",
          text: "The story and names of those who founded the Trust will be shared on this page.",
        },
      ],
    },
    {
      id: "nyasinaha",
      title: "Nyāsinaḥ",
      sa: "न्यासिनः",
      intro: "Trustees & governance",
      blocks: [{ t: "p", text: clean(t.trust.nyasinaha) }],
    },
  ],
  next: [
    { label: "Ritual", sa: "सेवा", href: "/ritual" },
    { label: "Knowledge Centre", sa: "गुरुकुलम्", href: "/knowledge-centre" },
  ],
};

/* ------------------------------------------------------------------ */
/*  RITUAL                                                             */
/* ------------------------------------------------------------------ */

const defs = (g: { items: { term: string; text: string }[] }) => g.items.filter((i) => i.term).map((i) => ({ term: i.term, text: clean(i.text) }));

const ritual: Page = {
  path: "/ritual",
  title: "Ritual",
  sa: "सेवा",
  kicker: "Sevā",
  lead: "Daily worship, devotional pujas, sacred fires, life-cycle rites and grand collective yajnas — all conducted with scriptural authenticity under qualified Acharyas.",
  image: "yajna",
  sections: [
    {
      id: "kinds",
      title: "Four ways of offering",
      sa: "उपासना",
      blocks: [
        {
          t: "cards",
          items: [
            { title: "Pūjā", sa: "पूजा", text: clean(t.puja.intro), href: "/ritual/puja" },
            { title: "Homa", sa: "होमः", text: clean(t.homa.intro), href: "/ritual/homa" },
            { title: "Yajña", sa: "यज्ञः", text: clean(t.yagna.intro), href: "/ritual/yagna" },
            { title: "Saṁskāras", sa: "संस्कारः", text: clean(t.samskaras.intro), href: "#samskaras" },
          ],
        },
      ],
    },
    {
      id: "nitya-seva",
      title: "Nitya Sevā",
      sa: "नित्यसेवा",
      intro: clean(t.nitya.intro),
      blocks: [{ t: "defs", items: defs(t.nitya) }],
    },
    {
      id: "samskaras",
      title: "Saṁskāras",
      sa: "संस्कारः",
      intro: clean(t.samskaras.intro),
      blocks: [{ t: "defs", items: defs(t.samskaras) }, contactLink("Arrange a samskara")],
    },
  ],
  next: [
    { label: "Pūjā", sa: "पूजा", href: "/ritual/puja" },
    { label: "Homa", sa: "होमः", href: "/ritual/homa" },
    { label: "Yajña", sa: "यज्ञः", href: "/ritual/yagna" },
  ],
};

const ritualChild = (slug: "puja" | "homa" | "yagna", title: string, sa: string, kicker: string, image: ImageKey, src: typeof t.puja, next: Page["next"]): Page => ({
  path: `/ritual/${slug}`,
  title,
  sa,
  kicker,
  lead: clean(src.intro),
  image,
  sections: [
    {
      id: slug,
      title: `${title} at Avighna Trust`,
      sa,
      blocks: [
        { t: "defs", items: defs(src) },
        {
          t: "note",
          title: "To request this seva",
          text: "Please write to us through the Contact page, and the temple office will respond about dates and arrangements.",
        },
        { t: "links", items: [{ label: "Request a seva", href: "/contact" }, { label: "All rituals", href: "/ritual", ghost: true }] },
      ],
    },
  ],
  next,
});

const rituals: Page[] = [
  ritualChild("puja", "Pūjā", "पूजा", "Devotional worship", "ganeshaStatue", t.puja, [
    { label: "Homa", sa: "होमः", href: "/ritual/homa" },
    { label: "Yajña", sa: "यज्ञः", href: "/ritual/yagna" },
  ]),
  ritualChild("homa", "Homa", "होमः", "Sacred fire", "yajna", t.homa, [
    { label: "Pūjā", sa: "पूजा", href: "/ritual/puja" },
    { label: "Yajña", sa: "यज्ञः", href: "/ritual/yagna" },
  ]),
  ritualChild("yagna", "Yajña", "यज्ञः", "Collective ceremonies for universal welfare", "ganeshaMedieval", t.yagna, [
    { label: "Pūjā", sa: "पूजा", href: "/ritual/puja" },
    { label: "Homa", sa: "होमः", href: "/ritual/homa" },
  ]),
];

/* ------------------------------------------------------------------ */
/*  PILGRIMAGE                                                         */
/* ------------------------------------------------------------------ */

const stripNote = (s: string) =>
  clean(
    s
      .replace(/\(Note:[^)]*\)\.?/g, "")
      .replace(/^\(द्रविडदेशम्\)\s*/, "")
      .replace(/^\(कर्णाटकराज्यम्\):\s*/, "")
      .replace(/\s+\./g, "."),
  );

const regions = [
  { slug: "keralam", title: "Keralam", sa: "केरळम्", image: "keralaTemple" as ImageKey, text: stripNote(t.pilgrimage.keralam) },
  { slug: "dravida-desham", title: "Draviḍa Deśam", sa: "द्रविडदेशम्", image: "dravidaTemple" as ImageKey, text: stripNote(t.pilgrimage.dravida) },
  { slug: "karnataka-rajyam", title: "Karnāṭaka Rājyam", sa: "कर्णाटकराज्यम्", image: "ganeshaStatue" as ImageKey, text: stripNote(t.pilgrimage.karnataka) },
  { slug: "andhra-pradesha", title: "Andhra Pradeśa", sa: "आन्ध्रप्रदेशः", image: "ganeshaMedieval" as ImageKey, text: stripNote(t.pilgrimage.andhra) },
];
export const pilgrimageRegions = regions;

const pilgrimage: Page = {
  path: "/pilgrimage",
  title: "Pilgrimage",
  sa: "तीर्थयात्रा",
  kicker: "Tīrtha Yātrā",
  lead: clean(t.pilgrimage.overview),
  image: "dravidaTemple",
  sections: [
    {
      id: "regions",
      title: "Journeys by region",
      sa: "क्षेत्राणि",
      blocks: [
        {
          t: "cards",
          items: regions.map((r) => ({ title: r.title, sa: r.sa, text: r.text, href: `/pilgrimage/${r.slug}` })),
        },
        { t: "links", items: [{ label: "Ask about a journey", href: "/contact" }] },
      ],
    },
  ],
  next: regions.slice(0, 2).map((r) => ({ label: r.title, sa: r.sa, href: `/pilgrimage/${r.slug}` })),
};

const pilgrimageChildren: Page[] = regions.map((r, i) => ({
  path: `/pilgrimage/${r.slug}`,
  title: r.title,
  sa: r.sa,
  kicker: "Tīrtha Yātrā",
  lead: r.text,
  image: r.image,
  sections: [
    {
      id: "journey",
      title: `Pilgrimage in ${r.title}`,
      sa: r.sa,
      blocks: [
        { t: "p", text: "These journeys explore the origins, sacred architecture and spiritual heritage of each temple, with a guide who knows its stories." },
        {
          t: "note",
          title: "Temples and dates",
          text: "The list of temples and upcoming journey dates for this region will be announced here. Write to us to be told when the next journey is planned.",
        },
        { t: "links", items: [{ label: "Ask about this journey", href: "/contact" }, { label: "All pilgrimages", href: "/pilgrimage", ghost: true }] },
      ],
    },
  ],
  next: [regions[(i + 1) % 4], regions[(i + 2) % 4]].map((x) => ({ label: x.title, sa: x.sa, href: `/pilgrimage/${x.slug}` })),
}));

/* ------------------------------------------------------------------ */
/*  DONATION                                                           */
/* ------------------------------------------------------------------ */

const donation: Page = {
  path: "/donation",
  title: "Donation",
  sa: "दानम्",
  kicker: "Dānam",
  lead: "Anna Dānam Mahā Dānam — to give is the highest offering. Choose the seva closest to your heart: a student’s learning, a day’s meals, a cow’s care, a temple lamp or an elder’s shelter.",
  image: "ganeshaMedieval",
  sections: [
    {
      id: "ways",
      title: "Seven ways to give",
      sa: "दानमार्गाः",
      blocks: [
        {
          t: "cards",
          items: donationCategories.map((c) => ({ title: c.title, sa: c.sa, text: c.text, href: `/donation/${c.slug}` })),
        },
        { t: "note", title: "Tax exemption", text: clean(t.taxNote) },
        {
          t: "p",
          text: "To contribute, or to receive bank and payment details, please write to the Trust office through the Contact page.",
        },
        { t: "links", items: [{ label: "Contact the Trust office", href: "/contact" }] },
      ],
    },
  ],
};

const donationChildren: Page[] = donationCategories.map((c, i) => ({
  path: `/donation/${c.slug}`,
  title: c.title,
  sa: c.sa,
  kicker: c.tagline,
  lead: c.text,
  image: c.image,
  sections: [
    {
      id: "sponsor",
      title: c.sponsorTitle,
      sa: "दानविषयाः",
      blocks: [
        { t: "list", items: c.sponsor },
        { t: "note", title: "Tax exemption", text: clean(t.taxNote) },
        { t: "links", items: [{ label: `Give through ${c.title}`, href: "/contact" }, { label: "All ways to give", href: "/donation", ghost: true }] },
      ],
    },
  ],
  next: [donationCategories[(i + 1) % 7], donationCategories[(i + 2) % 7]].map((x) => ({ label: x.title, sa: x.sa, href: `/donation/${x.slug}` })),
}));

/* ------------------------------------------------------------------ */
/*  RETIRED LIVING                                                     */
/* ------------------------------------------------------------------ */

const r = (title: string) => {
  const found = t.vana.routine.find((x) => x.title.toLowerCase().startsWith(title.toLowerCase()));
  if (!found) throw new Error(`Missing Vanaprastham routine item: ${title}`);
  return { title: found.title, text: clean(found.text) };
};

const retiredLiving: Page = {
  path: "/retired-living",
  title: "Retired Living",
  sa: "वृद्धाश्रम",
  kicker: "Vṛddhāśrama",
  lead: clean(t.vana.overview),
  image: "keralaTemple",
  sections: [
    {
      id: "japa",
      title: "Japa",
      sa: "जपः",
      intro: "The day begins in stillness.",
      blocks: [{ t: "cards", items: [r("Brahma Muhurta"), r("Temple Darshan"), r("Silent Meditation")] }],
    },
    {
      id: "tulasi-seva",
      title: "Tulasī Sevā",
      sa: "तुलसीसेवा",
      intro: "Gentle service keeps hands and heart useful.",
      blocks: [{ t: "cards", items: [r("Community Seva"), r("Light Physical")] }],
    },
    {
      id: "svadhyaya",
      title: "Svādhyāya",
      sa: "स्वाध्यायः",
      intro: "Quiet study and the joy of passing wisdom on.",
      blocks: [{ t: "cards", items: [r("Scriptural Study"), r("Intergenerational")] }],
    },
    {
      id: "satsangam",
      title: "Satsaṅgam",
      sa: "सत्सङ्गम्",
      intro: "Evenings in good company.",
      blocks: [{ t: "cards", items: [r("Temple Evening"), r("Satsang")] }],
    },
    {
      id: "nourishment",
      title: "Nourishment, movement & rest",
      sa: "आहारविहारः",
      blocks: [{ t: "cards", items: [r("Yoga"), r("Sattvic Breakfast"), r("Sattvic Lunch"), r("Sattvic Dinner"), r("Rest")] }],
    },
    {
      id: "pillars",
      title: "Four pillars of life here",
      sa: "स्तम्भाः",
      blocks: [{ t: "cards", items: t.vana.pillars.map((p) => ({ title: p.title, text: clean(p.text) })) }],
    },
    {
      id: "enquire",
      title: "Learn more or visit",
      blocks: [
        {
          t: "links",
          items: [
            { label: "Enquire about Vṛddhāśrama", href: "/contact" },
            { label: "Support elder care", href: "/donation/vrddhashrama-danam", ghost: true },
          ],
        },
      ],
    },
  ],
  next: [
    { label: "Knowledge Centre", sa: "गुरुकुलम्", href: "/knowledge-centre" },
    { label: "Vṛddhāśrama Dānam", sa: "वृद्धाश्रमदानम्", href: "/donation/vrddhashrama-danam" },
  ],
};

/* ------------------------------------------------------------------ */
/*  KNOWLEDGE CENTRE                                                   */
/* ------------------------------------------------------------------ */

const g = t.gurukulam as Record<string, string>;
const gk = (start: string) => {
  const k = Object.keys(g).find((x) => x.toUpperCase().startsWith(start.toUpperCase()));
  if (!k) throw new Error(`Missing gurukulam key: ${start}`);
  return clean(g[k]);
};

const dinacharya = g[Object.keys(g).find((k) => k.startsWith("DISCIPLINED DAILY"))!].split("•").map((x) => clean(x)).filter(Boolean);

const pillarSa: Record<number, string> = { 1: "वेदः", 2: "योगः", 3: "विज्ञानम्", 4: "कृषिः", 5: "कलाकौशल्यम्" };

const knowledgeCentre: Page = {
  path: "/knowledge-centre",
  title: "Knowledge Centre",
  sa: "गुरुकुलम्",
  kicker: "Gurukulam",
  lead: "Where wisdom becomes a way of life — a residential gurukulam, a library of sacred texts and classes open to all, online and offline.",
  image: "ganeshaMiniature",
  sections: [
    {
      id: "centres",
      title: "Three places of learning",
      sa: "विद्यास्थानानि",
      blocks: [
        {
          t: "cards",
          items: [
            { title: "Vedavāṇī Pāṭhaśālā", sa: "वेदवाणी पाठशाला", text: gk("GURUKULAM"), href: "/knowledge-centre/vedavani-pathashala" },
            { title: "Granthālayam", sa: "ग्रन्थालयम्", text: clean(t.library.overview), href: "/knowledge-centre/granthalayam" },
            { title: "E-Jñāna-kendram", sa: "ई-ज्ञानकेन्द्रम्", text: "Traditional wisdom, digital learning — online and offline classes in Sanskrit, Vedic chanting, mantra and shloka.", href: "/knowledge-centre/e-jnana-kendram" },
          ],
        },
        { t: "note", title: "100% free residential provision", text: gk("100% FREE") },
      ],
    },
  ],
  next: [
    { label: "Volunteers", sa: "स्वयंसेवकाः", href: "/volunteers" },
    { label: "Vidyādānam", sa: "विद्यादानम्", href: "/donation/vidyadanam" },
  ],
};

const pathashala: Page = {
  path: "/knowledge-centre/vedavani-pathashala",
  title: "Vedavāṇī Pāṭhaśālā",
  sa: "वेदवाणी पाठशाला",
  kicker: "The learning centre",
  lead: gk("GURUKULAM"),
  image: "ganeshaMiniature",
  sections: [
    { id: "overview", title: "Where wisdom becomes a way of life", sa: "गुरुकुलम्", blocks: [{ t: "p", text: gk("GURUKULAM OVERVIEW") }] },
    { id: "guru-shishya", title: "Guru–Śiṣya Paramparā", sa: "गुरुशिष्यपरम्परा", intro: "The sacred bond", blocks: [{ t: "p", text: gk("GURU–SHISHYA") }] },
    { id: "residential-life", title: "Residential life & campus", sa: "निवासः", blocks: [{ t: "p", text: gk("RESIDENTIAL LIFE") }] },
    {
      id: "dinacharya",
      title: "A disciplined day — Dinacarya",
      sa: "दिनचर्या",
      intro: dinacharya[0],
      blocks: [{ t: "steps", items: dinacharya.slice(1).map((s) => ({ title: s.split(":")[0], text: clean(s.split(":").slice(1).join(":")) })) }],
    },
    { id: "character", title: "Positive discipline & character", sa: "शीलम्", blocks: [{ t: "p", text: gk("POSITIVE DISCIPLINE") }] },
    { id: "vedic-studies", title: "Vedic studies", sa: "वेदाध्ययनम्", intro: "Preserving the oral tradition", blocks: [{ t: "p", text: gk("VEDIC STUDIES") }] },
    { id: "sanskrit-studies", title: "Sanskrit studies — Deva Vāṇī", sa: "देववाणी", blocks: [{ t: "p", text: gk("SANSKRIT STUDIES") }] },
    {
      id: "panchamukhi-shikshana",
      title: "Pañcamukhī Śikṣaṇa",
      sa: "पञ्चमुखी शिक्षणम्",
      intro: clean(t.panchamukhi.intro),
      blocks: [
        {
          t: "cards",
          items: t.panchamukhi.pillars.map((p) => ({
            title: p.title,
            sa: pillarSa[p.n],
            text: clean([p.text, ...p.notes.map((n) => `${n.term}: ${n.text}`)].join(" ")),
          })),
        },
      ],
    },
    { id: "dual-path", title: "Dual-path education & NIOS", sa: "द्विमार्गशिक्षा", blocks: [{ t: "p", text: gk("DUAL-PATH") }] },
    { id: "languages", title: "Languages", sa: "भाषाः", blocks: [{ t: "p", text: gk("MULTILINGUAL") }] },
    { id: "free-provision", title: "100% free residential provision", sa: "निःशुल्कम्", blocks: [{ t: "p", text: gk("100% FREE") }, { t: "links", items: [{ label: "Sponsor a student", href: "/donation/vidyadanam" }] }] },
    { id: "student-life", title: "Student life & activities", sa: "छात्रजीवनम्", blocks: [{ t: "p", text: gk("STUDENT LIFE") }] },
  ],
  actions: [
    { label: "Enquire about admission", href: "/contact" },
    { label: "Sponsor a student", href: "/donation/vidyadanam", ghost: true },
  ],
  next: [
    { label: "Granthālayam", sa: "ग्रन्थालयम्", href: "/knowledge-centre/granthalayam" },
    { label: "E-Jñāna-kendram", sa: "ई-ज्ञानकेन्द्रम्", href: "/knowledge-centre/e-jnana-kendram" },
  ],
};

const granthalayam: Page = {
  path: "/knowledge-centre/granthalayam",
  title: "Granthālayam",
  sa: "ग्रन्थालयम्",
  kicker: "Library & research",
  lead: clean(t.library.overview),
  image: "ganeshaMedieval",
  sections: [
    { id: "library", title: "Library & Śodhasaṁsthānam", sa: "ग्रन्थसंग्रहः", blocks: [{ t: "p", text: clean(t.library.overview) }] },
    { id: "bhagavad-gita", title: "Bhagavad Gītā", sa: "भगवद्गीता", blocks: [{ t: "p", text: clean(t.library.gita) }] },
    { id: "bhagavatham", title: "Bhāgavatam", sa: "भागवतम्", blocks: [{ t: "p", text: clean(t.library.bhagavatham) }] },
    { id: "digital-archives", title: "Digital archives", sa: "अङ्कीयसंग्रहः", blocks: [{ t: "p", text: clean(t.library.archives) }, contactLink("Ask about the library")] },
  ],
  next: [
    { label: "Vedavāṇī Pāṭhaśālā", sa: "वेदवाणी पाठशाला", href: "/knowledge-centre/vedavani-pathashala" },
    { label: "E-Jñāna-kendram", sa: "ई-ज्ञानकेन्द्रम्", href: "/knowledge-centre/e-jnana-kendram" },
  ],
};

const eJnana: Page = {
  path: "/knowledge-centre/e-jnana-kendram",
  title: "E-Jñāna-kendram",
  sa: "ई-ज्ञानकेन्द्रम्",
  kicker: "Traditional wisdom, digital learning",
  lead: "Community classes in scripture, online and offline — open to anyone who wishes to learn, from wherever they are.",
  image: "ganeshaStatue",
  sections: [
    { id: "sanskritam", title: "Saṁskṛtam", sa: "संस्कृतम्", blocks: [{ t: "p", text: clean(t.classes.sanskritam) }] },
    { id: "vedam", title: "Vedam", sa: "वेदम्", blocks: [{ t: "p", text: clean(t.classes.vedam) }] },
    { id: "mantram", title: "Mantram", sa: "मन्त्रम्", blocks: [{ t: "p", text: clean(t.classes.mantram) }] },
    { id: "shlokam", title: "Ślokam", sa: "श्लोकम्", blocks: [{ t: "p", text: clean(t.classes.shlokam) }] },
    { id: "bhagavatham", title: "Bhāgavatam", sa: "भागवतम्", blocks: [{ t: "p", text: clean(t.classes.bhagavatham) }, contactLink("Join a class")] },
  ],
  next: [
    { label: "Vedavāṇī Pāṭhaśālā", sa: "वेदवाणी पाठशाला", href: "/knowledge-centre/vedavani-pathashala" },
    { label: "Granthālayam", sa: "ग्रन्थालयम्", href: "/knowledge-centre/granthalayam" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

export const pages: Page[] = [
  ourStory,
  ritual,
  ...rituals,
  pilgrimage,
  ...pilgrimageChildren,
  donation,
  ...donationChildren,
  retiredLiving,
  knowledgeCentre,
  pathashala,
  granthalayam,
  eJnana,
];

export function getPage(segments: string[]): Page | undefined {
  const path = `/${segments.join("/")}`;
  return pages.find((p) => p.path === path);
}

export const homeContent = {
  theme: clean(t.trust.home),
  celebrations: clean(t.events.celebrations).replace(/\.$/, "").replace(/\band\b/g, ",").split(",").map((x) => clean(x)).filter(Boolean),
  conferences: clean(t.events.conferences),
  galleryCategories: clean(t.gallery).replace(/\.$/, "").replace(/\band\b/g, ",").split(",").map((x) => clean(x)).filter(Boolean),
  volunteerAreas: clean(t.volunteers).replace(/\.$/, "").replace(/\band\b/g, ",").split(",").map((x) => clean(x)).filter(Boolean),
  contact: clean(t.contact),
};
