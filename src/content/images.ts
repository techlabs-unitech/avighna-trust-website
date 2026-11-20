/**
 * Central image registry.
 *
 * Every photo on the site comes from this one file, so swapping in the Trust's own
 * photographs later means editing a single line per image (or pointing `src` at a
 * file inside /public/images/).
 *
 * The current photographs are freely-licensed images served from Wikimedia Commons
 * (via Special:FilePath, which resolves the file by name). They are stand-ins until
 * the Trust's own photographs are available. Credits are listed in `credits` below
 * and shown in the site footer.
 *
 * Any image that fails to load falls back to a tinted panel with a Devanagari glyph,
 * so no slot is ever empty or broken.
 */

const commons = (file: string, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file.replace(/ /g, "_"))}?width=${width}`;

export type SiteImage = {
  /** First candidate — kept for code that needs a single URL. */
  src: (width?: number) => string;
  /**
   * Every candidate URL, best first. If one fails to load the next is tried; only when all fail
   * does the tinted glyph panel appear. An entry starting with "/" is a file in /public.
   */
  srcs: (width?: number) => string[];
  alt: string;
  /** Shown if the photo cannot load. */
  glyph: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  focus?: string;
  credit: string;
};

const resolve = (file: string, w: number) => (file.startsWith("/") ? file : commons(file, w));
const label = (file: string) => file.replace(/^.*\//, "").replace(/\.[a-z]+$/i, "");

const make = (file: string | string[], alt: string, glyph: string, credit?: string, focus = "50% 40%"): SiteImage => {
  const files = Array.isArray(file) ? file : [file];
  return {
    src: (w = 1600) => resolve(files[0], w),
    srcs: (w = 1600) => files.map((f) => resolve(f, w)),
    alt,
    glyph,
    focus,
    credit: credit ?? `${label(files.find((f) => !f.startsWith("/")) ?? files[0])} · Wikimedia Commons`,
  };
};

export const images = {
  ganeshaStatue: make(
    "God Ganesh statue. 01.JPG",
    "Stone statue of Lord Ganesha in a temple",
    "ॐ",
    "God Ganesh statue 01 · Tulsi Bhagat · Wikimedia Commons",
    "50% 30%",
  ),
  ganeshaMedieval: make(
    "13th century Ganesha statue.jpg",
    "Ancient carved statue of Lord Ganesha",
    "गं",
    "13th century Ganesha statue · Quadell · Wikimedia Commons (CC BY-SA 2.0)",
    "50% 35%",
  ),
  ganeshaMiniature: make(
    "Ganesha Basohli miniature circa 1730 Dubost p73.jpg",
    "Traditional miniature painting of Lord Ganesha",
    "गणेश",
    "Ganesha, Basohli miniature c. 1730 · Wikimedia Commons (public domain)",
    "50% 40%",
  ),
  yajna: make(
    "Yajna1.jpg",
    "Priests performing a Vedic fire ceremony",
    "यज्ञ",
    "Yajna · Wikimedia Commons",
    "50% 50%",
  ),
  dravidaTemple: make(
    "Madurai Temple Gopuram1 TamilNadu.jpg",
    "Towering gopuram of the Meenakshi Amman Temple, Madurai",
    "द्रविड",
    "Madurai Temple Gopuram · Wikimedia Commons",
    "50% 40%",
  ),
  keralaTemple: make(
    "Thiruvananthapuram Padmanabhaswamy Temple.jpg",
    "Padmanabhaswamy Temple, Thiruvananthapuram, Kerala",
    "केरळ",
    "Padmanabhaswamy Temple · Prasanth Prakash · Wikimedia Commons",
    "50% 45%",
  ),
  madurai2: make(
    "Madurai Meenakshi temple 2.jpg",
    "Gopuram of the Meenakshi Amman Temple at Madurai",
    "तीर्थ",
    "Madurai Meenakshi temple 2 · Kumar Appaiah · Wikimedia Commons",
    "50% 30%",
  ),
  /** Donation slide — a decorated cow, for Go Dhaanam and the seva of giving. */
  gomata: make(
    "Mysore, painted cow (9902663093).jpg",
    "A cow decorated with colour and flowers for the Sankranti festival in Mysore",
    "गो",
    "Mysore, painted cow · Arian Zwegers · Wikimedia Commons",
    "50% 45%",
  ),
  /** Knowledge Centre slide — Vedic palm-leaf manuscript, for the Granthālayam. */
  palmLeaf: make(
    "16th century Vedas palm leaf manuscript, Malayalam Script, Sanskrit, Kerala.jpg",
    "A 16th-century palm-leaf manuscript of the Vedas from Kerala, in Malayalam script",
    "ग्रन्थ",
    "Vedas palm leaf manuscript, Kerala · Wikimedia Commons (SAHA / British Library)",
    "50% 50%",
  ),
  /** Gurukulam slide — a guru teaching students. */
  gurukulam: make(
    "Parmarth4.jpg",
    "A guru teaching students in a gurukul",
    "गुरु",
    "Guru teaching students in a gurukul · Wikimedia Commons",
    "50% 50%",
  ),
  /** Library (Granthālayam) — the reading room. */
  library: make(["/images/library/library.jpg"], "Readers browsing the shelves of a bright library", "ग्रन्थ", "Avighna Trust website", "50% 50%"),
  /** Senior Living (Vṛddhāśrama) — the elders' family. */
  seniorLiving: make(["/images/senior-living/senior-living.jpg"], "Smiling elders together — Senior Living", "वृद्ध", "Avighna Trust website", "50% 35%"),
  /** Senior Living section on the home page — a real photograph of the elders. */
  seniorLivingHome: make(["/images/senior-living/senior-living.jpg"], "Smiling elders together — Senior Living", "वृद्ध", "Avighna Trust website", "45% 40%"),
  /** Contact page. */
  contactUs: make(["/images/contact/contact-us.jpg"], "A friendly member of the Trust office, ready to help", "सम्पर्कः", "Avighna Trust website", "50% 30%"),

  /* ───────── Donation cards (home page) — a picture for every dhaanam.
   * A file you put at /public/images/donation/<name>.jpg is used first; the illustration beside it is the fallback. ───────── */
  donVidya: make(["/images/donation/vidyadanam.jpg"], "Students studying together — Vidya Dhaanam", "विद्या", "Avighna Trust website", "50% 50%"),
  donAnna: make(["/images/donation/annadanam.jpg"], "Devotees being served a sattvic meal — Anna Dhaanam", "अन्न", "Avighna Trust website", "50% 50%"),
  donGo: make(["/images/donation/go-danam.jpg"], "Villagers feeding fresh fodder to cows — Go Dhaanam", "गो", "Avighna Trust website", "50% 45%"),
  donVeda: make(["/images/donation/veda-rakshanam.jpg"], "The Vedas and the sacred syllable Om — Veda Rakshanam", "वेद", "Avighna Trust website", "50% 50%"),
  donDeva: make(["/images/donation/deva-danam.jpg"], "A golden temple gateway with an offering hand — Deva Dhaanam", "देव", "Avighna Trust website", "50% 45%"),
  donArogya: make(["/images/donation/arogyadanam.jpg"], "A doctor examining a child at a free health camp — Arogya Dhaanam", "आरोग्य", "Avighna Trust website", "50% 50%"),
  donVriddha: make(["/images/donation/vriddhashrama.jpg", "/images/donation/vriddhashrama.svg"], "Elders resting under a banyan tree — Vriddhashrama Dhaanam", "वृद्ध", "Illustration · Avighna Trust website", "50% 50%"),

  /* ───────── Gallery categories (home page) — add your own at /public/images/gallery/<name>.jpg and it is used first ───────── */
  galCampus: make(["/images/gallery/campus-life.jpg", "Parmarth4.jpg"], "Campus life at the Pathashala", "गुरुकुल", undefined, "50% 50%"),
  galTemple: make(["/images/gallery/temple-goshala.jpg"], "The goshala — cows in the care of the Trust", "गो", "Avighna Trust website", "50% 45%"),
  galClass: make(["/images/gallery/classroom-learning.jpg", "/images/gallery/classroom.svg"], "Classroom learning", "कक्षा", "Illustration · Avighna Trust website", "50% 50%"),
  galYoga: make(["/images/gallery/yoga-sessions.jpg", "/images/gallery/yoga.svg"], "Yoga sessions", "योग", "Illustration · Avighna Trust website", "50% 50%"),
  galChant: make(["/images/gallery/vedic-chanting.jpg", "Vedic students chanting.jpg", "16th century Vedas palm leaf manuscript, Malayalam Script, Sanskrit, Kerala.jpg"], "Vedic chanting", "वेद", undefined, "50% 50%"),
  galRitual: make(["/images/gallery/rituals.jpg", "Yajna1.jpg"], "Homams and pujas", "यज्ञ", undefined, "50% 50%"),
  galFestival: make(["/images/gallery/festivals.jpg", "/images/gallery/festivals.svg"], "Festivals and lamps", "उत्सव", "Illustration · Avighna Trust website", "50% 50%"),
  galSeminar: make(["/images/gallery/seminars.jpg", "/images/gallery/seminars.svg"], "Seminars and conferences", "सभा", "Illustration · Avighna Trust website", "50% 50%"),
  galTour: make(["/images/gallery/virtual-campus-tours.jpg", "Thiruvananthapuram Padmanabhaswamy Temple.jpg", "Madurai Temple Gopuram1 TamilNadu.jpg"], "A virtual tour of the campus", "दर्शन", undefined, "50% 45%"),

  /* ───────── Pilgrimage — one photograph for every state (see `stateImage` in pages.ts) ─────────
   * Each state lists several candidate Commons files, best first. Run `node scripts/check-images.mjs`
   * to see which resolve; delete the ones that do not. Replace with the Trust's own photographs by
   * putting a "/images/..." path at the front of any list. */
  stKeralam: make(["Thiruvananthapuram Padmanabhaswamy Temple.jpg", "009392022 Guruvayur temple, Kerala 004.jpg"], "Padmanabhaswamy Temple, Thiruvananthapuram, Kerala", "केरळ", undefined, "50% 45%"),
  stDravida: make(["Madurai Temple Gopuram1 TamilNadu.jpg", "Rameswaram temple (11).jpg", "Arunachalam temple.jpg"], "Gopuram of the Meenakshi Amman Temple, Madurai, Tamil Nadu", "द्रविड", undefined, "50% 40%"),
  stKarnataka: make(["Sringeri Sharadamba Temple.jpg", "Udupi Krishna Temple.jpg", "Banashankari Temple.jpg"], "Temple in Karnataka", "कर्णाट"),
  stAndhra: make(["Tirumala Venkateswara Temple.jpg", "Tirumala temple.jpg", "Srisailam temple.jpg"], "Temple at Tirumala, Andhra Pradesh", "आन्ध्र"),
  stUttarPradesh: make(["Varanasi Ghats.jpg", "Kashi Vishwanath Temple.jpg", "Dashashwamedh Ghat, Varanasi.jpg"], "The ghats of the Ganga at Varanasi, Uttar Pradesh", "काशी"),
  stUttarakhand: make(["Badrinath Temple, Uttarakhand (Photo- Vishwanath Negi).jpg", "Ganga temple of Gangotri.jpg", "Devotees at the Badrinath Temple in Uttarakhand, India.jpg"], "Badrinath Temple in the Himalaya, Uttarakhand", "बद्री", undefined, "50% 55%"),
  stHimachal: make(["Jwalamukhi Temple.jpg", "Jwala Ji Temple.jpg", "Naina Devi Temple.jpg"], "Devi temple in Himachal Pradesh", "हिमाचल"),
  stKashmir: make(["Shankaracharya Temple, Srinagar.jpg", "Shankaracharya Temple.jpg", "Vaishno Devi Bhawan.jpg"], "Shankaracharya Temple above Srinagar, Kashmir", "कश्मीर"),
  stPunjabHaryana: make(["Brahma Sarovar, Kurukshetra.jpg", "Brahma Sarovar Kurukshetra.jpg", "Kurukshetra Brahma Sarovar.jpg"], "Brahma Sarovar, Kurukshetra, Haryana", "कुरुक्षेत्र"),
  stOdisha: make(["Temple-Jagannath.jpg", "PURI JAGANATHA TEMPLE, PURI, ORISSA, INDIA, ASIA.jpg"], "Jagannath Temple, Puri, Odisha", "जगन्नाथ", undefined, "50% 35%"),
  stWestBengal: make(["Dakshineswar Kali Temple.jpg", "Dakshineswar temple.jpg", "Kalighat Kali Temple.jpg"], "Dakshineswar Kali Temple on the Hooghly, West Bengal", "काली"),
  stBihar: make(["Vishnupad Temple, Gaya.jpg", "Vishnupad Mandir.jpg", "Baidyanath Temple, Deoghar.jpg"], "Vishnupad Temple, Gaya, Bihar", "गया"),
  stAssam: make(["Kamakhya Temple.jpg", "Kamakhya temple, Guwahati.jpg", "Kamakhya Temple Assam.jpg"], "Kamakhya Temple, Guwahati, Assam", "कामाख्या"),
  stTelangana: make(["Yadagirigutta Temple.jpg", "Bhadrachalam Temple.jpg", "Thousand Pillar Temple, Warangal.jpg"], "Temple in Telangana", "तेलङ्गाना"),
  stPuducherry: make(["Manakula Vinayagar Temple.jpg", "Manakula Vinayagar Temple, Puducherry.jpg"], "Manakula Vinayagar Temple, Puducherry", "पुदुच्चेरी"),
  stLakshadweep: make(["Lakshadweep.jpg", "Kavaratti island.jpg"], "The islands of Lakshadweep", "लक्षद्वीपम्"),
  stGujarat: make(["Dwarkadheesh temple.jpg", "Somnath temple.jpg"], "Dwarkadhish Temple, Dwarka, Gujarat", "द्वारका"),
  stMaharashtra: make(["Trimbakeshwar Temple.jpg", "Vitthal Temple, Pandharpur.jpg", "Pandharpur Vitthal Temple.jpg"], "Temple in Maharashtra", "महाराष्ट्र"),
  stRajasthan: make(["Brahma Temple, Pushkar.jpg", "Pushkar Brahma Temple.jpg", "Pushkar Lake.jpg"], "Brahma Temple at Pushkar, Rajasthan", "पुष्कर"),
  stGoa: make(["Mangueshi Temple.jpg", "Shri Mangeshi Temple.jpg", "Mangeshi Temple, Goa.jpg"], "Shri Mangeshi Temple, Goa", "गोमन्तक"),
  stMadhyaPradesh: make(["Mahakaleshwar Temple, Ujjain.jpg", "Mahakaleshwar Jyotirlinga.jpg", "Kandariya Mahadeva Temple.jpg"], "Mahakaleshwar Temple, Ujjain, Madhya Pradesh", "उज्जयिनी"),
  stChhattisgarh: make(["Rajiv Lochan Temple, Rajim.jpg", "Rajim temple.jpg", "Rajiv Lochan Temple.jpg"], "Rajiv Lochan Temple, Rajim, Chhattisgarh", "कोसल"),
  stNepal: make(["Pashupatinath Temple.jpg", "Pashupatinath Temple, Kathmandu.jpg", "Pashupatinath.jpg"], "Pashupatinath Temple, Kathmandu, Nepal", "नेपाल"),
  stKailasa: make(["Mount Kailash.jpg", "Kailash.jpg", "Mount Kailash from Manasarovar.jpg"], "Mount Kailash and Lake Manasarovar, Tibet", "कैलास"),
  stSriLanka: make(["Koneswaram Temple.jpg", "Koneswaram temple Trincomalee.jpg", "Koneswaram Kovil.jpg"], "Koneswaram Temple, Trincomalee, Sri Lanka", "लङ्का"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;


/**
 * A one-line description of every registry photograph. These are shown on the home page next to
 * each picture. Edit the wording here when the Trust's own photographs replace the stand-ins.
 */
export const imageCaptions: Partial<Record<ImageKey, string>> = {
  ganeshaStatue: "A stone statue of Lord Ganesha, remover of obstacles, in a temple — the guiding spirit of Avighna.",
  ganeshaMedieval: "A carved 13th-century statue of Lord Ganesha, from the long tradition of Ganesha worship.",
  ganeshaMiniature: "A traditional Basohli miniature painting (c. 1730) of Lord Ganesha in classical Indian court-art style.",
  yajna: "Priests chanting Vedic mantras around the sacred fire during a yajña.",
  dravidaTemple: "The towering gopuram of the Meenakshi Amman Temple, Madurai — a landmark of Dravida temple architecture.",
  keralaTemple: "Padmanabhaswamy Temple in Thiruvananthapuram, Kerala, one of the great temples of the South.",
  library: "Readers among the shelves of the library — the reading room of our Granthālayam.",
  seniorLiving: "Elders of the Trust’s family, together — a life of dignity, reflection and purpose.",
  gomata: "A cow decorated with colour and flowers — Gomata, whose care is one of the Trust’s sevas of giving.",
  palmLeaf: "A 16th-century Vedic palm-leaf manuscript from Kerala — the kind of text our Granthālayam preserves.",
  gurukulam: "A guru teaching his students in the traditional gurukul, the Guru–Śiṣya Paramparā we carry forward.",
  madurai2: "Gopurams of the Meenakshi Amman Temple at Madurai, Tamil Nadu, rising above the temple town.",
};

/* ------------------------------------------------------------------ */
/*  Home-page hero slider — a separate picture for desktop and for     */
/*  mobile, so each is cropped for its own screen.                     */
/*                                                                     */
/*  All twelve files live in /public/images/hero/ (nothing is fetched  */
/*  from another website). To use the Trust's own photographs, replace */
/*  a file there keeping its name: <slide>-desktop.jpg / -mobile.jpg.  */
/*  Desktop: landscape ~1920×1080.  Mobile: portrait ~900×1400.        */
/* ------------------------------------------------------------------ */

export type HeroSlideImage = { desktop: SiteImage; mobile: SiteImage };

const hero = (slide: string, glyph: string, alt: string, focus = "50% 40%"): HeroSlideImage => ({
  desktop: make([`/images/hero/${slide}-desktop.jpg`], alt, glyph, "Avighna Trust website", focus),
  mobile: make([`/images/hero/${slide}-mobile.jpg`], alt, glyph, "Avighna Trust website", focus),
});

export const heroImages = {
  story: hero("story", "ॐ", "A meditating figure at the heart of a luminous mandala"),
  ritual: hero("ritual", "यज्ञ", "A devotee making an offering before a temple being built"),
  pilgrimage: hero("pilgrimage", "तीर्थ", "Pilgrims walking towards a golden temple gateway", "50% 40%"),
  donation: hero("donation", "दान", "Trust volunteers handing out Avighna Foundation provision bags — Anna Dhaanam", "50% 40%"),
  gurukulam: hero("gurukulam", "गुरु", "Students seated in a circle for study and meditation"),
  knowledge: hero("knowledge", "ग्रन्थ", "Readers among the shelves of a library"),
} satisfies Record<string, HeroSlideImage>;

export type HeroKey = keyof typeof heroImages;

export const imageCredits = Array.from(
  new Set([...Object.values(images), ...Object.values(heroImages).flatMap((h) => [h.desktop, h.mobile])].map((i) => i.credit)),
).filter((c) => !c.startsWith("images · ") && !c.startsWith("Illustration"));
