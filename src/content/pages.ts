import sheet from "./sheet.json";
import type { ImageKey } from "./images";
import { pilgrimageDirections } from "./pilgrimage-data";

/* ------------------------------------------------------------------ */
/*  Content model                                                      */
/* ------------------------------------------------------------------ */

export type Block =
  | { t: "p"; text: string }
  | { t: "list"; title?: string; items: string[] }
  | { t: "defs"; items: { term: string; text: string }[] }
  | { t: "cards"; items: { title: string; text: string; sa?: string; href?: string; image?: ImageKey }[] }
  | { t: "steps"; items: { title: string; text: string }[] }
  | { t: "note"; title: string; text: string }
  | { t: "quote"; sa: string; en: string }
  | { t: "links"; items: { label: string; href: string; ghost?: boolean }[] }
  | { t: "people"; groups: { title: string; sa?: string; members: { name: string; designation: string }[] }[] }
  | { t: "docs"; items: { label: string; text: string; href: string }[] }
  | { t: "options"; groups: { title: string; text?: string; items: { label: string; text: string; unit?: string; amount?: string }[] }[] }
  | { t: "resources"; items: { label: string; text: string; href: string; source: string }[] }
  | { t: "feature"; src: string; alt: string; name: string; sa?: string; caption?: string; paragraphs: string[] }
  | { t: "plannedTripForm" }
  | { t: "carousel"; label: string; items: { src: string; alt: string; caption: string }[] }
  | { t: "tabs"; items: { id: string; label: string; sa?: string; blocks: Block[] }[] };

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
  /** Optional override. By default "Continue exploring" is built from the menu (see relatedFor). */
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
  { key: "VIDYADANAM", slug: "vidyadanam", title: "Vidya Dhaanam", sa: "विद्यादानम्", tagline: "The gift of learning", image: "donVidya" as ImageKey },
  { key: "ANNADANAM", slug: "annadanam", title: "Anna Dhaanam", sa: "अन्नदानम्", tagline: "The gift of food", image: "donAnna" as ImageKey },
  { key: "GO DANAM", slug: "go-danam", title: "Go Dhaanam", sa: "गोदानम्", tagline: "Care for Gomata", image: "donGo" as ImageKey },
  { key: "VEDA RAKSHANAM", slug: "veda-rakshanam", title: "Veda Rakshanam", sa: "वेदरक्षणम्", tagline: "Protecting the Vedas", image: "donVeda" as ImageKey },
  { key: "DEVA DANAM", slug: "deva-danam", title: "Deva Dhaanam", sa: "देवदानम्", tagline: "Offerings to the temple", image: "donDeva" as ImageKey },
  { key: "AROGHYADANAM", slug: "aroghyadanam", title: "Arogya Dhaanam", sa: "आरोग्यदानम्", tagline: "The gift of health", image: "donArogya" as ImageKey },
  { key: "VRDDHASHRAMA DANAM", slug: "vrddhashrama-danam", title: "Vriddhashrama Dhaanam", sa: "वृद्धाश्रमदानम्", tagline: "Shelter for our elders", image: "donVriddha" as ImageKey },
] as const;

export const donationCategories = donationMeta.map((m) => {
  const d = (t.donation as Record<string, { name: string; text: string; sponsorTitle: string; sponsor: string[] }>)[m.key];
  return { ...m, text: clean(d.text), sponsorTitle: d.sponsorTitle, sponsor: d.sponsor.map(clean) };
});

/* ------------------------------------------------------------------ */
/*  OUR STORY                                                          */
/* ------------------------------------------------------------------ */

/** Placeholder rows for each governing body. Replace with the real names and designations. */
const tbd = (n: number) => Array.from({ length: n }, () => ({ name: "Name to be added", designation: "Designation to be added" }));

const ourStory: Page = {
  path: "/our-story",
  title: "Our Story",
  sa: "अस्माकं कथा",
  kicker: "Asmākaṁ Kathā",
  lead: clean(t.story.overview),
  image: "ganeshaStatue",
  sections: [
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
      title: "Guiding Values",
      sa: "मूल्यानि",
      blocks: [
        {
          t: "cards",
          items: t.values.map((v) => ({ title: `${v.en} — ${v.title}`, sa: v.sa, text: clean(v.text) })),
        },
      ],
    },
    {
      id: "guru-smaranam",
      title: "Guru Smaraṇam",
      sa: "गुरुस्मरणम्",
      intro: "Remembering great Gurus of the Vedic tradition",
      blocks: [
        {
          t: "feature",
          src: "/images/gurus/kanchi-maha-periyava.jpg",
          alt: "Portrait of Kanchi Maha Periyava, Sri Chandrasekharendra Saraswati Swamigal",
          name: "Kanchi Maha Periyava",
          sa: "काञ्चीमहापेरियवा",
          caption: "Sri Chandrasekharendra Saraswati Swamigal (1894–1994), 68th Jagadguru of the Kanchi Kamakoti Peetham",
          paragraphs: [
            "Sri Chandrasekharendra Saraswati Swamigal, lovingly known as Kanchi Maha Periyava, was the 68th Jagadguru of the Kanchi Kamakoti Peetham, the ancient Shankaracharya monastery at Kanchipuram. He took charge of the Peetham as a boy of thirteen and led it for nearly nine decades.",
            "He taught that the Vedas must be kept alive by being chanted and handed down from Guru to disciple, and he encouraged Veda Pathashalas, the study of Sanskrit and the restoration of temples. He also walked across much of Bharat, teaching dharma and urging people to feed the hungry and care for cows.",
            "These are the same ideals that Vedavani Pathashala works for — the unbroken Guru–Shishya Parampara, temple worship, anna dhaanam and go seva.",
          ],
        },
        {
          t: "feature",
          src: "/images/gurus/bharati-tirtha.jpg",
          alt: "Portrait of Jagadguru Sri Bharati Tirtha Mahaswamiji of Sringeri",
          name: "Śrī Bhāratī Tīrtha Mahāswāmī",
          sa: "श्रीभारतीतीर्थमहास्वामिनः",
          caption: "36th Jagadguru of the Sringeri Sharada Peetham (Sringeri Math)",
          paragraphs: [
            "Jagadguru Sri Bharati Tirtha Mahaswamiji is the 36th Jagadguru of the Sringeri Sharada Peetham, the southern (Dakshinamnaya) Peetham of Adi Shankaracharya, which stands on the banks of the river Tunga in Karnataka. Born Seetharama Anjaneyulu in 1951 in Andhra Pradesh, he went to his Guru, Jagadguru Sri Abhinava Vidyatirtha Mahaswamiji, as a boy of fifteen and began a life of study and discipline.",
            "He received sannyasa in 1974 and took charge of the Peetham in 1989. A scholar of the Shastras, he is known for his humility and for guiding seekers through discourses on Advaita Vedanta and everyday dharma. The Peetham under his guidance supports Vedic learning, temple worship and service to the community.",
            "In 2015 he named his successor, Sri Vidhushekhara Bharati, continuing the unbroken Guru–Shishya lineage that reaches back to Adi Shankaracharya. It is this living lineage, with its stress on chanting, study and service, that Vedavani Pathashala also follows.",
          ],
        },
        {
          t: "feature",
          src: "/images/gurus/ramana-maharshi.jpg",
          alt: "Portrait of Sri Ramana Maharshi of Tiruvannamalai",
          name: "Śrī Ramaṇa Maharṣi",
          sa: "श्रीरमणमहर्षिः",
          caption: "Sri Ramana Maharshi (1879–1950), the sage of Arunachala, Tiruvannamalai",
          paragraphs: [
            "Sri Ramana Maharshi was a sage of Tiruvannamalai in Tamil Nadu. Born Venkataraman at Tiruchuzhi in 1879, he had a profound experience of the Self at the age of sixteen and soon left home for Arunachala, the sacred hill at Tiruvannamalai, where he lived for the rest of his life until 1950.",
            "He taught self-inquiry, the question “Who am I?”, as the direct way to know the Self, and he often taught through silence. Seekers from India and from across the world sat with him, and he received everyone, rich or poor, with the same kindness. The ashram kitchen fed all who came.",
            "His life reflects the values the Trust holds dear — humility, stillness, equality and anna dhaanam. Sri Ramanasramam, at the foot of Arunachala, continues his work today.",
          ],
        },
      ],
    },
    {
      id: "service",
      title: "Nara Seva Nārāyaṇa Seva",
      sa: "नरसेवा नारायणसेवा",
      intro: "Service to Man is Service to God. Every part of the Trust’s work is an offering, and each of these five paths begins with serving people.",
      blocks: [
        {
          t: "cards",
          items: [
            { title: "Gurukulam", sa: "गुरुकुलम्", text: "A free residential school where children learn the Vedas, Sanskrit and recognised academics.", href: "/traditional-school" },
            { title: "Vriddhashramam", sa: "वृद्धाश्रमम्", text: "A peaceful home for elders, with worship, study and the company of students.", href: "/senior-living" },
            { title: "Tirtha Yatra", sa: "तीर्थयात्रा", text: "Guided pilgrimages to sacred temples and tirthas across Bharat.", href: "/pilgrimage" },
            { title: "Devaseva Karya", sa: "देवसेवाकार्यम्", text: "Pujas, homas, nitya seva and samskaras, performed under qualified Acharyas.", href: "/ritual" },
            { title: "Dhaanam", sa: "दानम्", text: "Give food, learning, health and shelter, and turn giving into seva.", href: "/donation" },
          ],
        },
      ],
    },
    {
      id: "samsthapaka",
      title: "Founders",
      sa: "संस्थापकाः",
      intro: "The Trust and its Management",
      blocks: [
        {
          t: "p",
          text: "Avighna Trust is a charitable trust established to preserve, practise and propagate the Vedas, Sanskrit and the spiritual heritage of Bharat through the unbroken Guru–Shishya Parampara. It runs Vedavani Pathashala, a residential gurukulam, together with a library and research division, an elders’ home and community learning, and offers all of this free of cost.",
        },
        {
          t: "p",
          text: "The Trust is run by its Management, who are responsible for its aims, its finances and the care of every person who lives and studies here. They are guided by learned advisors, so that the Trust’s work stays transparent, honest and accountable to the people it serves.",
        },
        {
          t: "note",
          title: "To be added",
          text: "The founders’ names, their photographs and a short account of how the Trust began will be shared here.",
        },
      ],
    },
    {
      id: "management",
      title: "Management",
      sa: "व्यवस्थापनम्",
      intro: "Management & governance",
      blocks: [
        { t: "p", text: clean(t.trust.nyasinaha) },
        {
          t: "people",
          groups: [
            { title: "Management Committee", sa: "प्रबन्धसमितिः", members: tbd(3) },
            { title: "Advisory Board", sa: "मार्गदर्शकमण्डलम्", members: tbd(3) },
            { title: "Gurukula Governing Council", sa: "गुरुकुलपरिषद्", members: tbd(3) },
          ],
        },
      ],
    },
    {
      id: "manyatha",
      title: "Recognitions",
      sa: "मान्यता",
      intro: "Registrations, accounts and tax exemptions",
      blocks: [
        {
          t: "docs",
          items: [
            { label: "Trust Incorporation", text: "Deed and registration of the Trust", href: "/documents/trust-incorporation.pdf" },
            { label: "Bank Account", text: "The Trust’s bank account details", href: "/documents/bank-account.pdf" },
            { label: "Darpan Certificate", text: "NITI Aayog NGO Darpan registration", href: "/documents/darpan-certificate.pdf" },
            { label: "Income Tax Exemption 12A", text: "Exemption of the Trust’s income", href: "/documents/income-tax-exemption-12a.pdf" },
            { label: "Income Tax Exemption 80G", text: "Tax benefit for donors", href: "/documents/income-tax-exemption-80g.pdf" },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  RITUAL · Devaseva Kārya                                            */
/* ------------------------------------------------------------------ */

const defs = (g: { items: { term: string; text: string }[] }) => g.items.filter((i) => i.term).map((i) => ({ term: i.term, text: clean(i.text) }));

const requestNote: Block = {
  t: "note",
  title: "To request this seva",
  text: "Please write to us through the Contact page, and the temple office will respond about dates and arrangements.",
};

const ritualLinks = (label: string): Block => ({
  t: "links",
  items: [
    { label, href: "/contact" },
    { label: "All rituals", href: "/ritual", ghost: true },
  ],
});

const mandiraIntro =
  "Mandira Purnanirmanam is the rebuilding of a temple that has been lost, damaged beyond repair or left unfinished — raised again according to the Āgamas and the Śilpa Śāstra, so that worship can begin once more.";

/** Overview cards: a short writeup on each, linking to its own page. */
const ritualOverview = [
  { title: "Pūjā", sa: "पूजा", text: clean(t.puja.intro), href: "/ritual/puja" },
  { title: "Homa", sa: "होमः", text: clean(t.homa.intro), href: "/ritual/homa" },
  { title: "Nitya Sevā", sa: "नित्यसेवा", text: clean(t.nitya.intro), href: "/ritual/nitya-seva" },
  { title: "Saṁskāras", sa: "संस्काराः", text: clean(t.samskaras.intro), href: "/ritual/samskaras" },
  { title: "Mandira Purnanirmanam", sa: "मन्दिरपुनर्निर्माणम्", text: mandiraIntro, href: "/ritual/mandira-purnanirmanam" },
];
export const ritualCards = ritualOverview;

const ritual: Page = {
  path: "/ritual",
  title: "Ritual",
  sa: "देवसेवाकार्यम्",
  kicker: "Devaseva Kārya",
  lead: "Devaseva Kārya — the service of the Divine. Daily worship, devotional pujas, sacred fires, life-cycle rites and the care of temples, all conducted with scriptural authenticity under qualified Acharyas.",
  image: "yajna",
  sections: [
    {
      id: "kinds",
      title: "Five ways of offering",
      sa: "उपासना",
      intro: "Choose a seva to read more about it, and to request it through the temple office.",
      blocks: [{ t: "cards", items: ritualOverview }],
    },
  ],
};

const ritualPage = (slug: string, title: string, sa: string, kicker: string, image: ImageKey, lead: string, sections: Section[]): Page => ({
  path: `/ritual/${slug}`,
  title,
  sa,
  kicker,
  lead,
  image,
  sections,
});

const rituals: Page[] = [
  ritualPage("puja", "Pūjā", "पूजा", "Devotional worship", "ganeshaStatue", clean(t.puja.intro), [
    { id: "puja", title: "Pūjā", sa: "पूजा", blocks: [{ t: "defs", items: defs(t.puja) }, requestNote, ritualLinks("Request a seva")] },
  ]),
  ritualPage("homa", "Homa", "होमः", "Sacred fire", "yajna", clean(t.homa.intro), [
    { id: "homa", title: "Homa", sa: "होमः", blocks: [{ t: "defs", items: defs(t.homa) }, requestNote, ritualLinks("Request a seva")] },
  ]),
  ritualPage("nitya-seva", "Nitya Sevā", "नित्यसेवा", "Daily temple worship", "ganeshaMedieval", clean(t.nitya.intro), [
    { id: "nitya-seva", title: "Daily worship at the temple", sa: "नित्यसेवा", blocks: [{ t: "defs", items: defs(t.nitya) }, ritualLinks("Sponsor a daily seva")] },
  ]),
  ritualPage("samskaras", "Saṁskāras", "संस्काराः", "Life-cycle rites of passage", "ganeshaMiniature", clean(t.samskaras.intro), [
    { id: "samskaras", title: "Saṁskāras", sa: "संस्काराः", blocks: [{ t: "defs", items: defs(t.samskaras) }, requestNote, ritualLinks("Arrange a samskara")] },
  ]),
  ritualPage("mandira-purnanirmanam", "Mandira Purnanirmanam", "मन्दिरपुनर्निर्माणम्", "Rebuilding the temple", "dravidaTemple", mandiraIntro, [
    {
      id: "meaning",
      title: "Raising a temple again",
      sa: "मन्दिरम्",
      blocks: [
        { t: "p", text: "A temple is a living centre of worship, learning and community. When one is lost to time, neglect or calamity, rebuilding it is counted among the greatest works of merit. The work is led by learned Acharyas and Sthapatis, so that every stage follows the śāstras." },
      ],
    },
    {
      id: "stages",
      title: "Stages of the work",
      sa: "क्रमः",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Sthala nirṇaya", text: "Choosing and purifying the site, with the guidance of the Āgamas." },
            { title: "Vāstu and Śilpa", text: "Planning the sanctum, the mandapas and the prākāra according to Vāstu and Śilpa Śāstra." },
            { title: "Śilā nyāsa", text: "Laying the foundation stone with Vedic rites." },
            { title: "Construction and installation", text: "Raising the structure and preparing the deity for installation." },
            { title: "Prāṇa pratiṣṭhā and Kumbhābhiṣekam", text: "Establishing the deity and consecrating the temple, so that daily worship can begin." },
          ],
        },
      ],
    },
    {
      id: "take-part",
      title: "How one can take part",
      sa: "सहभागिता",
      blocks: [
        { t: "list", items: ["Contribute to the construction fund through Deva Dhaanam.", "Sponsor a part of the temple — a stone, a pillar, a lamp or a ritual.", "Offer your skills or time through our volunteers."] },
        { t: "note", title: "Temple projects", text: "Details of the Trust’s current and planned temple projects will be shared on this page." },
        { t: "links", items: [{ label: "Give through Deva Dhaanam", href: "/donation/deva-danam" }, { label: "Write to us", href: "/contact", ghost: true }] },
      ],
    },
  ]),
];

/* ------------------------------------------------------------------ */
/*  PILGRIMAGE · Tīrtha Yātrā                                          */
/* ------------------------------------------------------------------ */

/** A region is shown with the photograph of its best-known state, so every tile matches its place. */
const directionImage: Record<string, ImageKey> = {
  "south-india": "stDravida",
  "north-india": "stUttarakhand",
  "east-india": "stOdisha",
  "west-india": "stGujarat",
  "central-india": "stMadhyaPradesh",
  others: "stKailasa",
};
/** One photograph for every state — each shows a temple or sacred site of that very state. */
const stateImage: Record<string, ImageKey> = {
  keralam: "stKeralam",
  "dravida-desham": "stDravida",
  "karnataka-rajyam": "stKarnataka",
  "andhra-pradesha": "stAndhra",
  "uttar-pradesh": "stUttarPradesh",
  uttarakhand: "stUttarakhand",
  "himachal-pradesh": "stHimachal",
  "jammu-kashmir": "stKashmir",
  "punjab-haryana": "stPunjabHaryana",
  odisha: "stOdisha",
  "west-bengal": "stWestBengal",
  "bihar-jharkhand": "stBihar",
  assam: "stAssam",
  gujarat: "stGujarat",
  maharashtra: "stMaharashtra",
  telangana: "stTelangana",
  puducherry: "stPuducherry",
  lakshadweep: "stLakshadweep",
  rajasthan: "stRajasthan",
  goa: "stGoa",
  "madhya-pradesh": "stMadhyaPradesh",
  chhattisgarh: "stChhattisgarh",
  nepal: "stNepal",
  "kailasa-manasarovara": "stKailasa",
  "sri-lanka": "stSriLanka",
};

/** Used by the home page tiles. */
export const pilgrimageTiles = pilgrimageDirections.map((d) => ({ slug: d.slug, title: d.title, sa: d.sa, text: d.text, image: directionImage[d.slug] }));

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
      title: "Temples of India",
      sa: "क्षेत्राणि",
      intro: "Bharat is divided here into six regions. Choose a region, then a state, to see its sacred centres.",
      blocks: [
        { t: "cards", items: pilgrimageDirections.map((d) => ({ title: d.title, sa: d.sa, text: d.text, href: `/pilgrimage/${d.slug}`, image: directionImage[d.slug] })) },
        { t: "links", items: [{ label: "Plan your own trip", href: "/pilgrimage/planned-trips" }, { label: "Ask about a journey", href: "/contact", ghost: true }] },
      ],
    },
    ...pilgrimageDirections.map(
      (d): Section => ({
        id: d.slug,
        title: d.title,
        sa: d.sa,
        intro: d.text,
        blocks: [
          { t: "cards", items: d.states.map((st) => ({ title: st.title, sa: st.sa, text: st.text, href: `/pilgrimage/${d.slug}/${st.slug}`, image: stateImage[st.slug] })) },
          { t: "links", items: [{ label: `Explore ${d.title}`, href: `/pilgrimage/${d.slug}`, ghost: true }] },
        ],
      }),
    ),
  ],
};

/** Planned Trips — a visitor describes the journey they want and the Trust arranges it. */
const plannedTrips: Page = {
  path: "/pilgrimage/planned-trips",
  title: "Planned Trips",
  sa: "आयोजितयात्रा",
  kicker: "Tīrtha Yātrā",
  lead: "Scheduled Trips follow dates announced by the Trust. A Planned Trip is built around you — your family, your dates and the temples you wish to visit. Tell us what you have in mind and the Trust will get back to you.",
  image: "dravidaTemple",
  sections: [
    {
      id: "how-it-works",
      title: "How a planned trip works",
      sa: "प्रक्रिया",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Tell us your plan", text: "Fill in the form below — who is travelling, for how many days and which places you wish to visit." },
            { title: "We prepare an itinerary", text: "The Trust’s office studies your request and proposes a route, stay and darshan arrangements." },
            { title: "Confirm and travel", text: "Once you are happy with the plan, dates and costs are confirmed and the journey is arranged." },
          ],
        },
      ],
    },
    {
      id: "request",
      title: "Request a planned trip",
      sa: "निवेदनम्",
      intro: "All fields are needed so that the plan suits everyone travelling.",
      blocks: [{ t: "plannedTripForm" }],
    },
  ],
};

const pilgrimageDirectionPages: Page[] = pilgrimageDirections.map((d) => ({
  path: `/pilgrimage/${d.slug}`,
  title: d.title,
  sa: d.sa,
  kicker: `Tīrtha Yātrā · ${d.saRoman}`,
  lead: d.text,
  image: directionImage[d.slug],
  sections: [
    {
      id: "states",
      title: `Sacred journeys in ${d.title}`,
      sa: d.sa,
      intro: "Choose a state to see its sacred centres and to ask about the next journey.",
      blocks: [
        { t: "cards", items: d.states.map((st) => ({ title: st.title, sa: st.sa, text: st.text, href: `/pilgrimage/${d.slug}/${st.slug}`, image: stateImage[st.slug] })) },
        { t: "links", items: [{ label: "Ask about a journey", href: "/contact" }, { label: "All pilgrimages", href: "/pilgrimage", ghost: true }] },
      ],
    },
  ],
}));

const pilgrimageStatePages: Page[] = pilgrimageDirections.flatMap((d) =>
  d.states.map(
    (st): Page => ({
      path: `/pilgrimage/${d.slug}/${st.slug}`,
      title: st.title,
      sa: st.sa,
      kicker: `Tīrtha Yātrā · ${d.title}`,
      lead: st.text,
      image: stateImage[st.slug],
      sections: [
        {
          id: "centres",
          title: `Sacred centres in ${st.title}`,
          sa: st.sa,
          intro: "Well-known tīrthas of this region. The Trust chooses the temples for each journey and announces them in advance.",
          blocks: [{ t: "list", items: st.centres }],
        },
        {
          id: "journey",
          title: `Pilgrimage in ${st.title}`,
          sa: "यात्रा",
          blocks: [
            { t: "p", text: "These journeys explore the origins, sacred architecture and spiritual heritage of each temple, with a guide who knows its stories." },
            { t: "note", title: "Itinerary and dates", text: "The itinerary and upcoming journey dates for this state will be announced here. Write to us to be told when the next journey is planned." },
            { t: "links", items: [{ label: "Ask about this journey", href: "/contact" }, { label: `All of ${d.title}`, href: `/pilgrimage/${d.slug}`, ghost: true }] },
          ],
        },
      ],
    }),
  ),
);

/* ------------------------------------------------------------------ */
/*  DONATION                                                           */
/* ------------------------------------------------------------------ */

type OptionGroup = { title: string; text?: string; items: { label: string; text: string; unit?: string; amount?: string }[] };

/**
 * Giving options for each donation page. Leave `amount` out until the Trust confirms it;
 * the page then shows "Amount to be confirmed". Set e.g. amount: "₹ 12,000" to show a figure.
 */
const donationOptions: Record<string, OptionGroup[]> = {
  vidyadanam: [
    {
      title: "Complete student sponsorship",
      text: "Carry the whole cost of one Veda student’s year, or choose the parts you wish to support.",
      items: [
        { label: "Tuition fee", text: "Vedic, Sanskrit and Panchamukhi Shikshana instruction under the Acharyas.", unit: "per student, per year" },
        { label: "Hostel fee", text: "Residential accommodation and utilities on the Gurukulam campus.", unit: "per student, per year" },
        { label: "Sattvic food", text: "Three wholesome vegetarian meals a day.", unit: "per student, per year" },
        { label: "Books, study materials and uniform", text: "Books, notebooks, uniforms and an educational kit.", unit: "per student, per year" },
        { label: "NIOS registration and examination fees", text: "Fees for the nationally recognised NIOS academic certificates.", unit: "per student, per year" },
        { label: "Healthcare", text: "Regular check-ups, medicines and emergency care.", unit: "per student, per year" },
        { label: "Complete sponsorship", text: "All of the above for one student.", unit: "per student, per year" },
      ],
    },
  ],
  annadanam: [
    {
      title: "Daily Anna Dhaanam",
      items: [
        { label: "One meal for one student", text: "A single sattvic meal for a Veda student.", unit: "per meal" },
        { label: "A month of meals for one student", text: "All meals for one student for a month.", unit: "per student, per month" },
        { label: "A day’s meals for the Gurukulam", text: "Meals for all students and Acharyas for one day.", unit: "per day" },
      ],
    },
    {
      title: "Festival Anna Dhaanam",
      items: [{ label: "Festival feast", text: "Anna Dhaanam for Ganesh Chaturthi, Navaratri, Shivaratri and other major celebrations.", unit: "per festival" }],
    },
    {
      title: "Guests and pilgrims",
      items: [{ label: "Feeding visitors", text: "Meals for visiting pilgrims, scholars, devotees and guests.", unit: "per day" }],
    },
    {
      title: "Special Seva Anna Dhaanam",
      items: [{ label: "On a personal occasion", text: "Sponsor food on a birthday, anniversary or memorial day.", unit: "per occasion" }],
    },
  ],
  "go-danam": [
    {
      title: "Daily care of Gomata",
      items: [
        { label: "Feed a cow", text: "Fodder and green pasture for one cow.", unit: "per cow, per month" },
        { label: "Sponsor a cow", text: "All feeding and care of one cow for a year.", unit: "per cow, per year" },
      ],
    },
    {
      title: "Health and veterinary care",
      items: [{ label: "Medical care", text: "Vaccinations, treatment and veterinary support.", unit: "per cow, per year" }],
    },
    {
      title: "Goshala shelter",
      items: [
        { label: "Shelter maintenance", text: "Upkeep of sheds, water and cleanliness.", unit: "per month" },
        { label: "Construction and expansion", text: "A new shed or an extension to the goshala.", unit: "one-time" },
      ],
    },
    {
      title: "Organic farming and dairy",
      items: [{ label: "Natural farming and dairy development", text: "Support for traditional, organic farming and dairy work.", unit: "one-time or yearly" }],
    },
  ],
  "veda-rakshanam": [
    {
      title: "Pathashala operations",
      items: [{ label: "Running costs", text: "Everyday expenses of Vedavani Pathashala.", unit: "per month" }],
    },
    {
      title: "Acharyas and Guru Dakṣiṇā",
      items: [
        { label: "Support an Acharya", text: "Sponsor a teacher of Rigveda, Yajurveda or the Upaniṣads.", unit: "per Acharya, per month" },
        { label: "Guru Dakṣiṇā", text: "An offering of gratitude to the Gurus.", unit: "one-time" },
      ],
    },
    {
      title: "Vedic assemblies",
      items: [{ label: "Chanting workshops and Veda Sammelana", text: "Sponsor intensive chanting workshops and the annual gathering.", unit: "per event" }],
    },
    {
      title: "Preservation",
      items: [{ label: "Recording and manuscript projects", text: "Oral chanting recordings, digitisation and palm-leaf preservation.", unit: "per project" }],
    },
  ],
  "deva-danam": [
    {
      title: "Daily worship materials",
      items: [
        { label: "Ghee, oil and lamps", text: "Sacred lamps for daily worship.", unit: "per day" },
        { label: "Flowers and pūjā dravyas", text: "Flowers, incense and offerings for the day’s worship.", unit: "per day" },
      ],
    },
    {
      title: "Temple construction and renovation",
      items: [
        { label: "Repair and renovation", text: "Repairs to the temple and sanctum.", unit: "one-time" },
        { label: "Construction", text: "Building new parts of the temple.", unit: "one-time" },
      ],
    },
    {
      title: "Festivals and rituals",
      items: [
        { label: "Festival arrangements", text: "Decorations, Brahmotsavam arrangements and ritual requisites.", unit: "per festival" },
        { label: "Sponsor a Homa, Yajña or Pūjā", text: "A ritual performed for societal welfare or in your name.", unit: "per ritual" },
      ],
    },
  ],
  aroghyadanam: [
    {
      title: "Health of Veda students",
      items: [
        { label: "Medical check-ups", text: "Regular health check-ups for the students.", unit: "per student, per year" },
        { label: "Medicines and emergency fund", text: "Medicines and funds for emergencies.", unit: "per year" },
      ],
    },
    {
      title: "Care of senior citizens",
      items: [{ label: "Medical and Ayurvedic care", text: "Treatment and Ayurvedic wellness care for elders in Vanaprastham.", unit: "per resident, per year" }],
    },
    {
      title: "Community outreach",
      items: [{ label: "Rural health and wellness camp", text: "A free camp organised by the Trust.", unit: "per camp" }],
    },
  ],
  "vrddhashrama-danam": [
    {
      title: "Care of residents",
      items: [{ label: "Accommodation and daily living", text: "Accommodation, utilities and daily needs of an elder.", unit: "per resident, per month" }],
    },
    {
      title: "Spiritual facilities",
      items: [
        { label: "Satsang hall", text: "A hall for group worship and discussions.", unit: "one-time" },
        { label: "Library materials and meditation space", text: "Books and a quiet space for meditation.", unit: "one-time" },
      ],
    },
    {
      title: "Intergenerational mentorship",
      items: [{ label: "Mentorship programme", text: "Programmes that bring elders and Gurukulam students together.", unit: "per programme" }],
    },
  ],
};

const donation: Page = {
  path: "/donation",
  title: "Donation",
  sa: "दानम्",
  kicker: "Dhaanam",
  lead: "To give is the highest offering. Choose the seva closest to your heart: a student’s learning, a day’s meals, a cow’s care, a temple lamp or an elder’s shelter.",
  image: "ganeshaMedieval",
  sections: [
    {
      id: "ways",
      title: "Seven ways to give",
      sa: "दानमार्गाः",
      blocks: [
        {
          t: "cards",
          items: donationCategories.map((c) => ({ title: c.title, sa: c.sa, text: c.text.replace(/\s*\(\s*["“]?Anna Dh[aā]+nam Mah[aā] Dh[aā]+nam["”]?\s*\)/i, ""), href: `/donation/${c.slug}` })),
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

const donationChildren: Page[] = donationCategories.map((c) => ({
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
      blocks: [{ t: "list", items: c.sponsor }],
    },
    {
      id: "options",
      title: "Giving options",
      sa: "दानविकल्पाः",
      intro: "Each option shows what your gift supports and how it is counted. The Trust office will confirm the amount when you write to us.",
      blocks: [
        { t: "options", groups: donationOptions[c.slug] },
        { t: "note", title: "Tax exemption", text: clean(t.taxNote) },
        { t: "links", items: [{ label: `Give through ${c.title}`, href: "/contact" }, { label: "All ways to give", href: "/donation", ghost: true }] },
      ],
    },
  ],
}));

/* ------------------------------------------------------------------ */
/*  SENIOR LIVING · Vṛddhāśrama                                        */
/* ------------------------------------------------------------------ */

const routineItem = (title: string) => {
  const found = t.vana.routine.find((x) => x.title.toLowerCase().startsWith(title.toLowerCase()));
  if (!found) throw new Error(`Missing Vanaprastham routine item: ${title}`);
  return { title: found.title, text: clean(found.text) };
};
const pillarItem = (title: string) => {
  const found = t.vana.pillars.find((x) => x.title.toLowerCase().startsWith(title.toLowerCase()));
  if (!found) throw new Error(`Missing Vanaprastham pillar: ${title}`);
  return { title: found.title, text: clean(found.text) };
};

const seniorKids = [
  { slug: "sadhanas", title: "Sādhanāḥ", sa: "साधनाः", text: "Silent mornings, meditation, japa and the study of the scriptures." },
  { slug: "community-kitchen", title: "Community Kitchen", sa: "अन्नशाला", text: "Wholesome sattvic meals, prepared with care and shared as one family." },
  { slug: "aroghyam", title: "Ārogyam", sa: "आरोग्यम्", text: "Regular health check-ups, Ayurvedic guidance and a peaceful, healing environment." },
  { slug: "devalayam", title: "Devālayam", sa: "देवालयम्", text: "Daily darshan, evening worship, bhajans and satsang at the temple." },
  { slug: "yoga", title: "Yoga", sa: "योगः", text: "Gentle Yoga, Prāṇāyāma and walks for strength and calm." },
  { slug: "vihara", title: "Vihāra", sa: "विहारः", text: "Community seva, mentoring young students and unhurried time for rest." },
];

const seniorLiving: Page = {
  path: "/senior-living",
  title: "Senior Living",
  sa: "वृद्धाश्रमम्",
  kicker: "Vṛddhāśrama",
  lead: clean(t.vana.overview),
  image: "seniorLiving",
  sections: [
    {
      id: "homes",
      title: "Our Senior Living Homes",
      sa: "वृद्धाश्रमम्",
      intro: "A home for elders at the heart of the Gurukulam",
      blocks: [
        { t: "p", text: "The Trust’s Senior Living Homes — Vṛddhāśrama, also called Vanaprastham — are a dedicated wing where elders live with dignity, in the company of worship, study and the young. Here later life is not a time of waiting but of reflection, service and spiritual security (Abhayadhaanam)." },
        { t: "p", text: "Residents share the life of the Gurukulam campus: the morning chants, the temple, the sattvic kitchen and the laughter of students. Elders become mentors, passing on stories, values and the wisdom of a lifetime, and the students gain grandparents." },
        {
          t: "carousel",
          label: "Pictures of life at the Senior Living Homes",
          items: [
            { src: "/images/senior-living/senior-living-1.svg", alt: "Elders meditating together at sunrise under a banyan tree", caption: "Mornings begin in stillness — meditation and japa beneath the banyan." },
            { src: "/images/senior-living/senior-living-2.svg", alt: "Sattvic meals being prepared and served in the community kitchen", caption: "Sattvic meals, prepared with care and shared as one family." },
            { src: "/images/senior-living/senior-living-3.svg", alt: "Elders practising gentle yoga on mats in a green garden", caption: "Gentle Yoga and Prāṇāyāma in the garden, for strength and calm." },
            { src: "/images/senior-living/senior-living-4.svg", alt: "Elders offering evening worship with lamps at the temple", caption: "Evening worship, bhajans and satsang at the temple." },
            { src: "/images/senior-living/senior-living-5.svg", alt: "An elder sharing stories with young students on the lawn", caption: "Elders and students together — grandparents for the young, mentors for life." },
            { src: "/images/senior-living/senior-living-6.svg", alt: "Two elders walking along a garden path beside flowers and a bench", caption: "Unhurried walks and quiet rest among flowers and trees." },
          ],
        },
        { t: "cards", items: t.vana.pillars.map((p) => ({ title: p.title, text: clean(p.text) })) },
      ],
    },
    {
      id: "ways",
      title: "Life at the Senior Living Homes",
      sa: "जीवनचर्या",
      intro: "Six parts of a day, each with its own page.",
      blocks: [{ t: "cards", items: seniorKids.map((k) => ({ title: k.title, sa: k.sa, text: k.text, href: `/senior-living/${k.slug}` })) }],
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
};

const seniorLink = (label = "Enquire about Vṛddhāśrama"): Block => ({
  t: "links",
  items: [
    { label, href: "/contact" },
    { label: "Support elder care", href: "/donation/vrddhashrama-danam", ghost: true },
  ],
});

const seniorPage = (slug: string, image: ImageKey, lead: string, sections: Section[]): Page => {
  const k = seniorKids.find((x) => x.slug === slug)!;
  return { path: `/senior-living/${slug}`, title: k.title, sa: k.sa, kicker: "Vṛddhāśrama", lead, image, sections };
};

const seniorPages: Page[] = [
  seniorPage("sadhanas", "ganeshaStatue", "The day begins in stillness — pre-dawn awakening, silent meditation and the quiet study of the scriptures.", [
    { id: "japa", title: "Japa and meditation", sa: "जपः", intro: "The day begins in stillness.", blocks: [{ t: "cards", items: [routineItem("Brahma Muhurta"), routineItem("Silent Meditation")] }] },
    { id: "svadhyaya", title: "Svādhyāya", sa: "स्वाध्यायः", intro: "Quiet study and reflection.", blocks: [{ t: "cards", items: [routineItem("Scriptural Study")] }, seniorLink()] },
  ]),
  seniorPage("community-kitchen", "donAnna", "Wholesome, sattvic meals prepared with care — breakfast, lunch and dinner shared by the whole family of residents.", [
    {
      id: "meals",
      title: "Sattvic meals through the day",
      sa: "आहारः",
      blocks: [
        { t: "cards", items: [routineItem("Sattvic Breakfast"), routineItem("Sattvic Lunch"), routineItem("Sattvic Dinner")] },
        { t: "links", items: [{ label: "Sponsor Anna Dhaanam", href: "/donation/annadanam" }, { label: "Enquire", href: "/contact", ghost: true }] },
      ],
    },
  ]),
  seniorPage("aroghyam", "ganeshaMedieval", "Health care for body and mind — regular check-ups, Ayurvedic guidance and a peaceful, healing environment.", [
    {
      id: "health",
      title: "Holistic healthcare",
      sa: "आरोग्यम्",
      blocks: [
        { t: "cards", items: [pillarItem("Holistic Healthcare")] },
        { t: "list", items: ["Regular health check-ups", "Ayurvedic lifestyle guidance", "Daily Yoga and Prāṇāyāma", "Walking paths and a peaceful environment"] },
        { t: "links", items: [{ label: "Support Arogya Dhaanam", href: "/donation/aroghyadanam" }, { label: "Enquire", href: "/contact", ghost: true }] },
      ],
    },
  ]),
  seniorPage("devalayam", "dravidaTemple", "The temple is the centre of the day — morning darshan, evening worship, bhajans and satsang.", [
    { id: "darshan", title: "Temple darshan and chanting", sa: "दर्शनम्", blocks: [{ t: "cards", items: [routineItem("Temple Darshan")] }] },
    { id: "evening", title: "Evening worship and satsang", sa: "सत्सङ्गम्", intro: "Evenings in good company.", blocks: [{ t: "cards", items: [routineItem("Temple Evening"), routineItem("Satsang")] }, seniorLink()] },
  ]),
  seniorPage("yoga", "yajna", "Gentle practices for strength, balance and calm — Yoga, Prāṇāyāma and quiet walks.", [
    { id: "yoga", title: "Yoga and movement", sa: "योगः", blocks: [{ t: "cards", items: [routineItem("Yoga"), routineItem("Light Physical")] }, seniorLink()] },
  ]),
  seniorPage("vihara", "keralaTemple", "Gentle service, time with the young and unhurried rest — a life of purpose and community.", [
    { id: "seva", title: "Tulasī Sevā and community", sa: "तुलसीसेवा", intro: "Gentle service keeps hands and heart useful.", blocks: [{ t: "cards", items: [routineItem("Community Seva"), routineItem("Intergenerational")] }] },
    { id: "family", title: "One spiritual family", sa: "वसुधैव कुटुम्बकम्", blocks: [{ t: "cards", items: [pillarItem("Mentorship"), pillarItem("Community Life"), routineItem("Rest")] }, seniorLink()] },
  ]),
];

/* ------------------------------------------------------------------ */
/*  KNOWLEDGE CENTRE · Gyāna Kendra                                    */
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
  sa: "ज्ञानकेन्द्रम्",
  kicker: "Gyāna Kendra",
  lead: "Where knowledge reaches everyone — a library of sacred texts and classes open to all, online and in person.",
  image: "ganeshaMiniature",
  sections: [
    {
      id: "centres",
      title: "Two places of learning",
      sa: "विद्यास्थानानि",
      blocks: [
        {
          t: "cards",
          items: [
            { title: "Granthālayam", sa: "ग्रन्थालयम्", text: clean(t.library.overview), href: "/knowledge-centre/granthalayam" },
            { title: "E-Jñāna-kendram", sa: "ई-ज्ञानकेन्द्रम्", text: "Traditional wisdom, digital learning — online and in-person classes in Sanskrit, Vedic chanting, mantra and shloka.", href: "/knowledge-centre/e-jnana-kendram" },
          ],
        },
      ],
    },
  ],
};

const granthalayam: Page = {
  path: "/knowledge-centre/granthalayam",
  title: "Granthālayam",
  sa: "ग्रन्थालयम्",
  kicker: "Library & research",
  lead: clean(t.library.overview),
  image: "library",
  sections: [
    { id: "library", title: "Library & Śodhasaṁsthānam", sa: "ग्रन्थसंग्रहः", blocks: [{ t: "p", text: clean(t.library.overview) }] },
    { id: "bhagavad-gita", title: "Bhagavad Gītā", sa: "भगवद्गीता", blocks: [{ t: "p", text: clean(t.library.gita) }] },
    { id: "bhagavatham", title: "Bhāgavatam", sa: "भागवतम्", blocks: [{ t: "p", text: clean(t.library.bhagavatham) }] },
    { id: "digital-archives", title: "Digital archives", sa: "अङ्कीयसंग्रहः", blocks: [{ t: "p", text: clean(t.library.archives) }, contactLink("Ask about the library")] },
    {
      id: "repositories",
      title: "Repositories and reference reading",
      sa: "संग्रहालयाः",
      intro: "Trusted places to read the texts online. These are outside websites, and they open in a new tab.",
      blocks: [
        {
          t: "resources",
          items: [
            { label: "Sanskrit Documents", text: "A large collection of Sanskrit texts, stotras and Vedic hymns in Devanagari and transliteration.", href: "https://sanskritdocuments.org", source: "Repository" },
            { label: "GRETIL", text: "Göttingen Register of Electronic Texts in Indian Languages — searchable Sanskrit etexts from many traditions.", href: "https://gretil.sub.uni-goettingen.de/gretil.html", source: "Repository" },
            { label: "Vedic Heritage Portal", text: "The Government of India’s digital portal for Vedic literature, recitation and study.", href: "https://vedicheritage.gov.in", source: "Repository" },
            { label: "National Mission for Manuscripts", text: "India’s national programme to document and conserve manuscripts, including palm-leaf works.", href: "https://www.namami.gov.in", source: "Repository" },
            { label: "Sanskrit Wikisource", text: "Free, community-edited texts of Sanskrit scripture and literature.", href: "https://sa.wikisource.org", source: "Wikisource" },
            { label: "Internet Archive — Sanskrit texts", text: "Scanned books, journals and manuscripts available to read or borrow.", href: "https://archive.org", source: "Digital library" },
            { label: "Bhagavad Gītā — Gita Supersite", text: "The Gītā in Sanskrit with several classical commentaries and translations, from IIT Kanpur.", href: "https://www.gitasupersite.iitk.ac.in", source: "e-book" },
            { label: "Vedabase", text: "Śrīmad Bhāgavatam, Bhagavad Gītā and other texts with word-for-word meanings.", href: "https://vedabase.io", source: "e-book" },
            { label: "Sacred Texts — Hinduism", text: "Public-domain English translations of the Vedas, Upaniṣads and Purāṇas.", href: "https://sacred-texts.com/hin/index.htm", source: "e-book" },
            { label: "Bhagavad Gita — Wikipedia", text: "An overview of the text, its structure, themes and commentaries.", href: "https://en.wikipedia.org/wiki/Bhagavad_Gita", source: "Wikipedia" },
            { label: "Bhagavata Purana — Wikipedia", text: "An overview of the Bhāgavatam, its twelve cantos and its place in the tradition.", href: "https://en.wikipedia.org/wiki/Bhagavata_Purana", source: "Wikipedia" },
            { label: "Palm-leaf manuscript — Wikipedia", text: "How palm-leaf manuscripts were made, written and preserved.", href: "https://en.wikipedia.org/wiki/Palm-leaf_manuscript", source: "Wikipedia" },
          ],
        },
      ],
    },
  ],
};

const classSubjects = [
  { id: "sanskritam", title: "Saṁskṛtam", sa: "संस्कृतम्", online: clean(t.classes.sanskritam), live: "Spoken Sanskrit is learnt best in conversation, so in-person classes give you a partner to speak with and a teacher to correct you at once." },
  { id: "vedam", title: "Vedam", sa: "वेदम्", online: clean(t.classes.vedam), live: "Vedic chanting is learnt by ear. In the classroom the Guru chants and the students repeat, and each svara is corrected directly." },
  { id: "mantram", title: "Mantram", sa: "मन्त्रम्", online: clean(t.classes.mantram), live: "Oral chanting needs the Guru’s voice, rhythm and breath, which are easiest to catch in the same room." },
  { id: "shlokam", title: "Ślokam", sa: "श्लोकम्", online: clean(t.classes.shlokam), live: "Verses are recited together in a group, with their meaning explained and their values discussed." },
  { id: "bhagavatham", title: "Bhāgavatam", sa: "भागवतम्", online: clean(t.classes.bhagavatham), live: "Discourses and storytelling are shared in satsang, with time for questions and discussion afterwards." },
];

const eJnana: Page = {
  path: "/knowledge-centre/e-jnana-kendram",
  title: "E-Jñāna-kendram",
  sa: "ई-ज्ञानकेन्द्रम्",
  kicker: "Traditional wisdom, digital learning",
  lead: "Community classes in scripture, online and in person — open to anyone who wishes to learn, from wherever they are.",
  image: "ganeshaStatue",
  sections: [
    {
      id: "classes",
      title: "Two classrooms",
      sa: "कक्षे",
      intro: "Learn online from home, or sit with the Guru at the Pathashala.",
      blocks: [
        {
          t: "tabs",
          items: [
            {
              id: "antarajala-kaksha",
              label: "Antarjāla Kakṣā — Online classroom",
              sa: "अन्तर्जालकक्षा",
              blocks: [
                { t: "p", text: "The online classroom brings the teaching of the Pathashala to learners anywhere in the world. Classes are taken live with a teacher, so you can ask questions, chant with the group and be corrected as you learn." },
                { t: "defs", items: classSubjects.map((c) => ({ term: `${c.title} · ${c.sa}`, text: c.online })) },
                {
                  t: "steps",
                  items: [
                    { title: "Write to us", text: "Tell the Trust office which subject you wish to learn and your level." },
                    { title: "Choose a subject and batch", text: "You will be told which batch and timings suit you." },
                    { title: "Join the live class", text: "Join from your phone, tablet or computer at the time of the class." },
                    { title: "Practise between classes", text: "Recite what you have learnt each day, so that the teaching settles." },
                  ],
                },
                { t: "list", title: "What you need", items: ["A quiet place to sit and chant", "A phone, tablet or computer with a camera and microphone", "A steady internet connection", "A notebook and, for Sanskrit and Veda classes, an open mind"] },
                { t: "note", title: "Timings and fees", text: "Batch timings and any fees will be shared by the Trust office when you write to us." },
                { t: "links", items: [{ label: "Join an online class", href: "/contact" }] },
              ],
            },
            {
              id: "sakshath-kaksha",
              label: "Sākṣāt Kakṣā — In-person classroom",
              sa: "साक्षात्कक्षा",
              blocks: [
                { t: "p", text: "In the in-person classroom you learn at the Pathashala itself, in the presence of the Guru. Some things, such as svara in Vedic chanting and the rhythm of a mantra, are caught most surely face to face." },
                { t: "defs", items: classSubjects.map((c) => ({ term: `${c.title} · ${c.sa}`, text: c.live })) },
                {
                  t: "steps",
                  items: [
                    { title: "Enquire", text: "Write to the Trust office, or visit during office hours." },
                    { title: "Meet the Acharya", text: "Speak with the teacher about your aim and your level." },
                    { title: "Attend a class", text: "Sit in on a class before you decide to join a regular batch." },
                    { title: "Join a batch", text: "Learn with a group on a regular schedule." },
                  ],
                },
                { t: "note", title: "Visiting hours", text: "Office: Mon–Sat, 9:00 AM – 5:30 PM. Temple: 5:00 AM – 12:00 PM and 4:00 PM – 8:30 PM." },
                { t: "links", items: [{ label: "Enquire about in-person classes", href: "/contact" }] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "repositories",
      title: "Repositories for learners",
      sa: "संग्रहालयाः",
      intro: "Free resources to practise between classes. These are outside websites, and they open in a new tab.",
      blocks: [
        {
          t: "resources",
          items: [
            { label: "Vedic Heritage Portal", text: "The Government of India’s portal for the Vedas, with recitations and study material.", href: "https://vedicheritage.gov.in", source: "Repository" },
            { label: "Sanskrit Documents", text: "Texts, stotras and mantras to read and chant, in Devanagari and transliteration.", href: "https://sanskritdocuments.org", source: "Repository" },
            { label: "Spoken Sanskrit", text: "A dictionary and tools for learning Sanskrit words and grammar.", href: "https://spokensanskrit.org", source: "Learning tool" },
            { label: "Samskrita Bharati", text: "A worldwide movement to teach spoken Sanskrit, with courses and materials.", href: "https://www.samskritabharati.in", source: "Learning" },
            { label: "Sanskrit Lexicon — Cologne", text: "Searchable Sanskrit dictionaries, including Monier-Williams, from the University of Cologne.", href: "https://www.sanskrit-lexicon.uni-koeln.de", source: "Dictionary" },
            { label: "Gita Supersite", text: "The Bhagavad Gītā in Sanskrit with commentaries and translations.", href: "https://www.gitasupersite.iitk.ac.in", source: "e-book" },
            { label: "Vedabase", text: "Śrīmad Bhāgavatam and other texts with word-for-word meanings.", href: "https://vedabase.io", source: "e-book" },
            { label: "Vedas — Wikipedia", text: "An overview of the four Vedas and the traditions of oral transmission.", href: "https://en.wikipedia.org/wiki/Vedas", source: "Wikipedia" },
            { label: "Sanskrit — Wikipedia", text: "The history and structure of the Sanskrit language.", href: "https://en.wikipedia.org/wiki/Sanskrit", source: "Wikipedia" },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  TRADITIONAL SCHOOL · Gurukulam                                     */
/* ------------------------------------------------------------------ */

const schoolActions = [
  { label: "Enquire about admission", href: "/contact" },
  { label: "Sponsor a student", href: "/donation/vidyadanam", ghost: true },
];

const schoolPage = (slug: string, title: string, sa: string, kicker: string, image: ImageKey, lead: string, sections: Section[]): Page => ({
  path: `/traditional-school/${slug}`,
  title,
  sa,
  kicker,
  lead,
  image,
  sections,
  actions: schoolActions,
});

const schoolChildren = [
  { slug: "panchamukhi-shikshana", title: "Pañcamukhī Śikṣaṇa", sa: "पञ्चमुखी शिक्षणम्", text: clean(t.panchamukhi.intro) },
  { slug: "blended-learning", title: "Blended Learning", sa: "मिश्रशिक्षणम्", text: gk("DUAL-PATH") },
  { slug: "dinacharya", title: "Dinacarya", sa: "दिनचर्या", text: dinacharya[0] },
  { slug: "nivasa", title: "Nivāsa", sa: "निवासः", text: gk("RESIDENTIAL LIFE") },
];

const traditionalSchool: Page = {
  path: "/traditional-school",
  title: "Traditional School",
  sa: "गुरुकुलम्",
  kicker: "Gurukulam",
  lead: gk("GURUKULAM"),
  image: "gurukulam",
  sections: [
    { id: "pathashala", title: "Vedavāṇī Pāṭhaśālā", sa: "वेदवाणी पाठशाला", intro: "The residential gurukulam", blocks: [{ t: "p", text: gk("GURUKULAM") }] },
    { id: "wisdom", title: "Wisdom as a way of life", sa: "ज्ञानं जीवनम्", blocks: [{ t: "p", text: gk("GURUKULAM OVERVIEW") }] },
    { id: "guru-shishya", title: "Guru–Śiṣya Paramparā", sa: "गुरुशिष्यपरम्परा", intro: "The sacred bond", blocks: [{ t: "p", text: gk("GURU–SHISHYA") }] },
    {
      id: "explore",
      title: "Explore Vedavāṇī Pāṭhaśālā",
      sa: "पाठशाला",
      intro: "Each part of the school has its own page.",
      blocks: [{ t: "cards", items: schoolChildren.map((c) => ({ title: c.title, sa: c.sa, text: c.text, href: `/traditional-school/${c.slug}` })) }],
    },
  ],
  actions: schoolActions,
};

const schoolPages: Page[] = [
  schoolPage("panchamukhi-shikshana", "Pañcamukhī Śikṣaṇa", "पञ्चमुखी शिक्षणम्", "Five dimensions of education", "ganeshaMiniature", clean(t.panchamukhi.intro), [
    {
      id: "panchamukhi-shikshana",
      title: "The Five Pillars of Education",
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
        { t: "links", items: [{ label: "Sponsor a pillar", href: "/donation/vidyadanam", ghost: true }] },
      ],
    },
  ]),
  schoolPage("blended-learning", "Blended Learning", "मिश्रशिक्षणम्", "Dual-path education", "palmLeaf", gk("DUAL-PATH"), [
    { id: "dual-path", title: "Dual-path education & NIOS", sa: "द्विमार्गशिक्षा", blocks: [{ t: "p", text: gk("DUAL-PATH") }] },
    { id: "languages", title: "Languages", sa: "भाषाः", blocks: [{ t: "p", text: gk("MULTILINGUAL") }] },
  ]),
  schoolPage("dinacharya", "Dinacarya", "दिनचर्या", "A disciplined day", "ganeshaStatue", dinacharya[0], [
    {
      id: "dinacharya",
      title: "A disciplined day — Dinacarya",
      sa: "दिनचर्या",
      intro: dinacharya[0],
      blocks: [{ t: "steps", items: dinacharya.slice(1).map((s) => ({ title: s.split(":")[0], text: clean(s.split(":").slice(1).join(":")) })) }],
    },
    { id: "character", title: "Positive discipline & character", sa: "शीलम्", blocks: [{ t: "p", text: gk("POSITIVE DISCIPLINE") }] },
  ]),
  schoolPage("nivasa", "Nivāsa", "निवासः", "Residential life & campus", "keralaTemple", gk("RESIDENTIAL LIFE"), [
    { id: "residential-life", title: "Residential life & campus", sa: "निवासः", blocks: [{ t: "p", text: gk("RESIDENTIAL LIFE") }] },
    { id: "free-provision", title: "100% free residential provision", sa: "निःशुल्कम्", blocks: [{ t: "p", text: gk("100% FREE") }, { t: "links", items: [{ label: "Sponsor a student", href: "/donation/vidyadanam" }] }] },
    { id: "student-life", title: "Student life & activities", sa: "छात्रजीवनम्", blocks: [{ t: "p", text: gk("STUDENT LIFE") }] },
  ]),
];

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

export const pages: Page[] = [
  ourStory,
  ritual,
  ...rituals,
  pilgrimage,
  plannedTrips,
  ...pilgrimageDirectionPages,
  ...pilgrimageStatePages,
  donation,
  ...donationChildren,
  seniorLiving,
  ...seniorPages,
  knowledgeCentre,
  granthalayam,
  eJnana,
  traditionalSchool,
  ...schoolPages,
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
