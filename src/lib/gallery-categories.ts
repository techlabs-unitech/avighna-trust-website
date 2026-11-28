/**
 * Gallery categories — no server-only imports, so both the server (reads captions.json) and the
 * browser (draws the filter chips) can use this file.
 *
 * The donation categories come first and match the seven ways of giving (Dhaanam); the others follow.
 */
export const DONATION_CATEGORIES = [
  "Vidya Dhaanam",
  "Anna Dhaanam",
  "Go Dhaanam",
  "Veda Rakshanam",
  "Deva Dhaanam",
  "Arogya Dhaanam",
  "Vriddhashrama Dhaanam",
] as const;

export const ACTIVITY_CATEGORIES = [
  "Campus Life",
  "Temple & Goshala",
  "Classroom Learning",
  "Yoga Sessions",
  "Vedic Teaching",
  "Rituals (Homams & Pujas)",
  "Virtual Campus Tours",
  "Community Seva",
] as const;

export const GALLERY_CATEGORIES = [...DONATION_CATEGORIES, ...ACTIVITY_CATEGORIES] as const;

/** A short write-up for each category, shown above its pictures on the Gallery page. */
export const CATEGORY_INFO: Record<string, { sa: string; blurb: string }> = {
  "Vidya Dhaanam": {
    sa: "विद्यादानम्",
    blurb:
      "Vidya Dhaanam is the gift of learning. It stands behind a student’s education — from tuition and books to the tools a learner needs, such as a laptop. These pictures show learners and well-wishers at the moment that gift is handed over.",
  },
  "Anna Dhaanam": {
    sa: "अन्नदानम्",
    blurb:
      "Anna Dhaanam is the gift of food, offered with respect to everyone who comes. Here are provision bags being packed, carried and handed over, and the volunteers whose hands make the seva possible.",
  },
  "Go Dhaanam": {
    sa: "गोदानम्",
    blurb:
      "Go Dhaanam is the care of Gomata, the cow. These pictures show cows being fed and looked after, with fresh fodder and gentle hands, in the goshala that is part of the life of the Trust.",
  },
  "Veda Rakshanam": {
    sa: "वेदरक्षणम्",
    blurb:
      "Veda Rakshanam is the protection of the Vedas — supporting the Gurus, the students and the oral tradition that has carried this wisdom, voice to voice, for thousands of years.",
  },
  "Deva Dhaanam": {
    sa: "देवदानम्",
    blurb:
      "Deva Dhaanam is the offering made to the temple: the daily worship, the festivals, and the raising of temples that were lost or ruined, so that worship can begin there again.",
  },
  "Arogya Dhaanam": {
    sa: "आरोग्यदानम्",
    blurb:
      "Arogya Dhaanam is the gift of health. These pictures show the Trust standing beside people in need of medical help — with care, with dignity, and with the support of its volunteers.",
  },
  "Vriddhashrama Dhaanam": {
    sa: "वृद्धाश्रमदानम्",
    blurb:
      "Vriddhashrama Dhaanam gives shelter to our elders, so that later life can be lived with dignity, reflection and the company of a spiritual family.",
  },
  "Campus Life": {
    sa: "गुरुकुलम्",
    blurb:
      "A day at the Pathashala: students living close to their Gurus, studying, working and resting together in the Guru–Shishya way.",
  },
  "Temple & Goshala": {
    sa: "देवालयः गोशाला च",
    blurb: "The temple and the goshala, the heart of daily worship and of the care of cows on our campus.",
  },
  "Classroom Learning": {
    sa: "कक्षा",
    blurb: "Students at their lessons — Sanskrit, the scriptures and the school subjects that sit beside them.",
  },
  "Yoga Sessions": {
    sa: "योगः",
    blurb: "Mornings of yoga, prāṇāyāma and meditation, for a steady body and a quiet mind.",
  },
  "Vedic Teaching": {
    sa: "वेदाध्ययनम्",
    blurb: "The Vedas taught by ear, the way they have always been handed down — a Guru’s voice and a student’s careful repetition.",
  },
  "Rituals (Homams & Pujas)": {
    sa: "यज्ञः पूजा च",
    blurb: "Homams and pujas performed with the Vedic mantras by learned Acharyas, for the welfare of families and of the world.",
  },
  "Virtual Campus Tours": {
    sa: "दर्शनम्",
    blurb: "A look around the campus for those who cannot yet visit in person.",
  },
  "Community Seva": {
    sa: "सेवा",
    blurb: "Moments of everyday seva from the life of Avighna Foundation and Vedavani Pathashala.",
  },
};

/** A safe id for a category, for jump links. */
export const categorySlug = (c: string) => c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
