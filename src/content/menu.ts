/**
 * Site menu — taken from "Website Wire Frame – Draft 1.xlsx" (Sheet1).
 * Each top-level item shows the English word with its Sanskrit word beneath it.
 * Every dropdown entry points to its own page, or to a section (#anchor) of its parent page.
 */

export type MenuLink = {
  label: string;
  /** Sanskrit (Devanagari) shown beside the label */
  sa?: string;
  href: string;
  /** short line shown under the link in the Knowledge Centre mega-menu */
  desc?: string;
  /** third-level links (Knowledge Centre) */
  children?: MenuLink[];
};

export type MenuItem = {
  label: string;
  sa: string;
  /** Sanskrit transliteration, used for screen readers and page titles */
  saRoman: string;
  href: string;
  /** Shown instead of the text label in the desktop bar (the label stays for screen readers) */
  icon?: "home";
  links?: MenuLink[];
};

export const menu: MenuItem[] = [
  { label: "Home", sa: "गृहम्", saRoman: "Gṛham", href: "/", icon: "home" },
  {
    label: "Our Story",
    sa: "अस्माकं कथा",
    saRoman: "Asmākaṁ Kathā",
    href: "/our-story",
    links: [
      { label: "Darśanam", sa: "दर्शनम्", href: "/our-story#darsanam" },
      { label: "Devaseva Kārya", sa: "देवसेवाकार्यम्", href: "/our-story#devaseva-karya" },
      { label: "Recognition", sa: "मान्यता", href: "/our-story#recognition" },
      { label: "Saṁsthāpaka", sa: "संस्थापकाः", href: "/our-story#samsthapaka" },
      { label: "Nyāsinaḥ", sa: "न्यासिनः", href: "/our-story#nyasinaha" },
    ],
  },
  {
    label: "Ritual",
    sa: "सेवा",
    saRoman: "Sevā",
    href: "/ritual",
    links: [
      { label: "Pūjā", sa: "पूजा", href: "/ritual/puja" },
      { label: "Homa", sa: "होमः", href: "/ritual/homa" },
      { label: "Yajña", sa: "यज्ञः", href: "/ritual/yagna" },
    ],
  },
  {
    label: "Pilgrimage",
    sa: "तीर्थयात्रा",
    saRoman: "Tīrtha Yātrā",
    href: "/pilgrimage",
    links: [
      { label: "Keralam", sa: "केरळम्", href: "/pilgrimage/keralam" },
      { label: "Draviḍa Deśam", sa: "द्रविडदेशम्", href: "/pilgrimage/dravida-desham" },
      { label: "Karnāṭaka Rājyam", sa: "कर्णाटकराज्यम्", href: "/pilgrimage/karnataka-rajyam" },
      { label: "Andhra Pradeśa", sa: "आन्ध्रप्रदेशः", href: "/pilgrimage/andhra-pradesha" },
    ],
  },
  {
    label: "Donation",
    sa: "दानम्",
    saRoman: "Dānam",
    href: "/donation",
    links: [
      { label: "Vidyādānam", sa: "विद्यादानम्", href: "/donation/vidyadanam" },
      { label: "Annadānam", sa: "अन्नदानम्", href: "/donation/annadanam" },
      { label: "Go Dānam", sa: "गोदानम्", href: "/donation/go-danam" },
      { label: "Veda Rakṣaṇam", sa: "वेदरक्षणम्", href: "/donation/veda-rakshanam" },
      { label: "Deva Dānam", sa: "देवदानम्", href: "/donation/deva-danam" },
      { label: "Ārogyadānam", sa: "आरोग्यदानम्", href: "/donation/aroghyadanam" },
      { label: "Vṛddhāśrama Dānam", sa: "वृद्धाश्रमदानम्", href: "/donation/vrddhashrama-danam" },
    ],
  },
  {
    label: "Retired Living",
    sa: "वृद्धाश्रम",
    saRoman: "Vṛddhāśrama",
    href: "/retired-living",
    links: [
      { label: "Japa", sa: "जपः", href: "/retired-living#japa" },
      { label: "Tulasī Sevā", sa: "तुलसीसेवा", href: "/retired-living#tulasi-seva" },
      { label: "Svādhyāya", sa: "स्वाध्यायः", href: "/retired-living#svadhyaya" },
      { label: "Satsaṅgam", sa: "सत्सङ्गम्", href: "/retired-living#satsangam" },
    ],
  },
  {
    label: "Knowledge Centre",
    sa: "गुरुकुलम्",
    saRoman: "Gurukulam",
    href: "/knowledge-centre",
    links: [
      { label: "Vedavāṇī Pāṭhaśālā", sa: "वेदवाणी पाठशाला", href: "/knowledge-centre/vedavani-pathashala", desc: "The residential gurukulam" },
      {
        label: "Granthālayam",
        sa: "ग्रन्थालयम्",
        href: "/knowledge-centre/granthalayam",
        desc: "Library & sacred texts",
        children: [
          { label: "Library", href: "/knowledge-centre/granthalayam#library" },
          { label: "Bhagavad Gītā", sa: "भगवद्गीता", href: "/knowledge-centre/granthalayam#bhagavad-gita" },
          { label: "Bhāgavatam", sa: "भागवतम्", href: "/knowledge-centre/granthalayam#bhagavatham" },
        ],
      },
      {
        label: "E-Jñāna-kendram",
        sa: "ई-ज्ञानकेन्द्रम्",
        href: "/knowledge-centre/e-jnana-kendram",
        desc: "Online & offline classes",
        children: [
          { label: "Saṁskṛtam", sa: "संस्कृतम्", href: "/knowledge-centre/e-jnana-kendram#sanskritam" },
          { label: "Vedam", sa: "वेदम्", href: "/knowledge-centre/e-jnana-kendram#vedam" },
          { label: "Mantram", sa: "मन्त्रम्", href: "/knowledge-centre/e-jnana-kendram#mantram" },
          { label: "Ślokam", sa: "श्लोकम्", href: "/knowledge-centre/e-jnana-kendram#shlokam" },
          { label: "Bhāgavatam", sa: "भागवतम्", href: "/knowledge-centre/e-jnana-kendram#bhagavatham" },
        ],
      },
    ],
  },
  { label: "Gallery", sa: "वीथिका", saRoman: "Vīthikā", href: "/gallery" },
  { label: "Volunteers", sa: "स्वयंसेवकाः", saRoman: "Svayaṁsevakāḥ", href: "/volunteers" },
  { label: "Contact", sa: "सम्पर्कः", saRoman: "Samparkaḥ", href: "/contact" },
];

/** True when `path` belongs to this menu item (used to highlight the current section). */
export function isActive(item: MenuItem, path: string) {
  if (item.href === "/") return path === "/";
  return path === item.href || path.startsWith(`${item.href}/`);
}
