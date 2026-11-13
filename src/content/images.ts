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
  src: (width?: number) => string;
  alt: string;
  /** Shown if the photo cannot load. */
  glyph: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  focus?: string;
  credit: string;
};

const make = (file: string, alt: string, glyph: string, credit: string, focus = "50% 40%"): SiteImage => ({
  src: (w = 1600) => commons(file, w),
  alt,
  glyph,
  focus,
  credit,
});

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
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const imageCredits = Array.from(new Set(Object.values(images).map((i) => i.credit)));

/**
 * A one-line description of every registry photograph. These are shown on the home page next to
 * each picture. Edit the wording here when the Trust's own photographs replace the stand-ins.
 */
export const imageCaptions: Record<ImageKey, string> = {
  ganeshaStatue: "A stone statue of Lord Ganesha, remover of obstacles, in a temple — the guiding spirit of Avighna.",
  ganeshaMedieval: "A carved 13th-century statue of Lord Ganesha, from the long tradition of Ganesha worship.",
  ganeshaMiniature: "A traditional Basohli miniature painting (c. 1730) of Lord Ganesha in classical Indian court-art style.",
  yajna: "Priests chanting Vedic mantras around the sacred fire during a yajña.",
  dravidaTemple: "The towering gopuram of the Meenakshi Amman Temple, Madurai — a landmark of Dravida temple architecture.",
  keralaTemple: "Padmanabhaswamy Temple in Thiruvananthapuram, Kerala, one of the great temples of the South.",
  madurai2: "Gopurams of the Meenakshi Amman Temple at Madurai, Tamil Nadu, rising above the temple town.",
};
