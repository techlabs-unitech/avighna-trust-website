import { pilgrimageDirections } from "./pilgrimage-data";

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
  /** A heading only: its children are the real destinations (used by Pilgrimage → Scheduled Trips). */
  group?: boolean;
};

export type MenuItem = {
  label: string;
  sa: string;
  /** Sanskrit transliteration, used for screen readers and page titles */
  saRoman: string;
  href: string;
  /** Shown instead of the text label in the desktop bar (the label stays for screen readers) */
  icon?: "home";
  /** Pilgrimage: a group heading, then regions whose states open to the side on hover */
  tree?: boolean;
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
      { label: "Vision", sa: "दृष्टिः", href: "/our-story#vision" },
      { label: "Mission", sa: "लक्ष्यम्", href: "/our-story#mission" },
      { label: "Guiding Values", sa: "मूल्यानि", href: "/our-story#values" },
      { label: "Guru Smaraṇam", sa: "गुरुस्मरणम्", href: "/our-story#guru-smaranam" },
      { label: "Nara Seva Nārāyaṇa Seva", sa: "नरसेवा नारायणसेवा", href: "/our-story#service" },
      { label: "Founders", sa: "संस्थापकाः", href: "/our-story#samsthapaka" },
      { label: "Management", sa: "व्यवस्थापनम्", href: "/our-story#management" },
      { label: "Recognitions", sa: "मान्यता", href: "/our-story#manyatha" },
    ],
  },
  {
    label: "Ritual",
    sa: "देवसेवाकार्यम्",
    saRoman: "Devaseva Kārya",
    href: "/ritual",
    links: [
      { label: "Puja", sa: "पूजा", href: "/ritual/puja" },
      { label: "Homa", sa: "होमः", href: "/ritual/homa" },
      { label: "Nitya Seva", sa: "नित्यसेवा", href: "/ritual/nitya-seva" },
      { label: "Samskaras", sa: "संस्काराः", href: "/ritual/samskaras" },
      { label: "Temple Rebuilding", sa: "मन्दिरपुनर्निर्माणम्", href: "/ritual/mandira-purnanirmanam" },
    ],
  },
  {
    label: "Pilgrimage",
    sa: "तीर्थयात्रा",
    saRoman: "Tīrtha Yātrā",
    href: "/pilgrimage",
    tree: true,
    links: [
      {
        // Just a heading — it has no dropdown of its own. The six regions sit under it, and each
        // region opens its states to the side when hovered.
        label: "Scheduled Trips",
        sa: "निर्धारितयात्राः",
        href: "/pilgrimage#regions",
        group: true,
        children: pilgrimageDirections.map((d) => ({
          label: d.title,
          sa: d.sa,
          href: `/pilgrimage/${d.slug}`,
          children: d.states.map((st) => ({ label: st.title, sa: st.sa, href: `/pilgrimage/${d.slug}/${st.slug}` })),
        })),
      },
      { label: "Planned Trips", sa: "आयोजितयात्रा", href: "/pilgrimage/planned-trips" },
    ],
  },
  {
    label: "Donation",
    sa: "दानम्",
    saRoman: "Dhaanam",
    href: "/donation",
    links: [
      { label: "Vidya Dhaanam", sa: "विद्यादानम्", href: "/donation/vidyadanam" },
      { label: "Anna Dhaanam", sa: "अन्नदानम्", href: "/donation/annadanam" },
      { label: "Go Dhaanam", sa: "गोदानम्", href: "/donation/go-danam" },
      { label: "Veda Rakshanam", sa: "वेदरक्षणम्", href: "/donation/veda-rakshanam" },
      { label: "Deva Dhaanam", sa: "देवदानम्", href: "/donation/deva-danam" },
      { label: "Arogya Dhaanam", sa: "आरोग्यदानम्", href: "/donation/aroghyadanam" },
      { label: "Vriddhashrama Dhaanam", sa: "वृद्धाश्रमदानम्", href: "/donation/vrddhashrama-danam" },
    ],
  },
  {
    label: "Senior Living",
    sa: "वृद्धाश्रमम्",
    saRoman: "Vṛddhāśramam",
    href: "/senior-living",
    links: [
      { label: "Spiritual Practice", sa: "साधनाः", href: "/senior-living/sadhanas" },
      { label: "Community Kitchen", sa: "अन्नशाला", href: "/senior-living/community-kitchen" },
      { label: "Healthcare", sa: "आरोग्यम्", href: "/senior-living/aroghyam" },
      { label: "Temple", sa: "देवालयम्", href: "/senior-living/devalayam" },
      { label: "Yoga", sa: "योगः", href: "/senior-living/yoga" },
      { label: "Leisure & Service", sa: "विहारः", href: "/senior-living/vihara" },
    ],
  },
  {
    label: "Knowledge Centre",
    sa: "ज्ञानकेन्द्रम्",
    saRoman: "Jñāna Kendra",
    href: "/knowledge-centre",
    links: [
      {
        label: "Library",
        sa: "ग्रन्थालयम्",
        href: "/knowledge-centre/granthalayam",
        desc: "Library & sacred texts",
        children: [
          { label: "Library", href: "/knowledge-centre/granthalayam#library" },
          { label: "Bhagavad Gita", sa: "भगवद्गीता", href: "/knowledge-centre/granthalayam#bhagavad-gita" },
          { label: "Bhagavatam", sa: "भागवतम्", href: "/knowledge-centre/granthalayam#bhagavatham" },
          { label: "Repositories", sa: "संग्रहालयाः", href: "/knowledge-centre/granthalayam#repositories" },
        ],
      },
      {
        label: "E-Learning Centre",
        sa: "ई-ज्ञानकेन्द्रम्",
        href: "/knowledge-centre/e-jnana-kendram",
        desc: "Online & in-person classes",
        children: [
          { label: "Online Classes", sa: "अन्तर्जालकक्षा", href: "/knowledge-centre/e-jnana-kendram#antarajala-kaksha" },
          { label: "In-person Classes", sa: "साक्षात्कक्षा", href: "/knowledge-centre/e-jnana-kendram#sakshath-kaksha" },
          { label: "Repositories", sa: "संग्रहालयाः", href: "/knowledge-centre/e-jnana-kendram#repositories" },
        ],
      },
    ],
  },
  {
    label: "Traditional School",
    sa: "गुरुकुलम्",
    saRoman: "Gurukulam",
    href: "/traditional-school",
    links: [
      { label: "Five-Pillar Education", sa: "पञ्चमुखी शिक्षणम्", href: "/traditional-school/panchamukhi-shikshana" },
      { label: "Blended Learning", sa: "मिश्रशिक्षणम्", href: "/traditional-school/blended-learning" },
      { label: "Daily Routine", sa: "दिनचर्या", href: "/traditional-school/dinacharya" },
      { label: "Residence", sa: "निवासः", href: "/traditional-school/nivasa" },
    ],
  },
  { label: "Gallery", sa: "वीथिका", saRoman: "Vīthikā", href: "/gallery" },
  { label: "Contact", sa: "सम्पर्कः", saRoman: "Samparkaḥ", href: "/contact" },
];

/** Pages that are in the site but not in the top bar (Volunteers opens from the floating Volunteer button). */
export const hiddenPages: { label: string; sa: string; href: string }[] = [
  { label: "Volunteers", sa: "स्वयंसेवकाः", href: "/volunteers" },
];

/** True when `path` belongs to this menu item (used to highlight the current section). */
export function isActive(item: MenuItem, path: string) {
  if (item.href === "/") return path === "/";
  return path === item.href || path.startsWith(`${item.href}/`);
}

export type RelatedLink = { label: string; sa?: string; href: string };

const noAnchor = (l: MenuLink) => !l.href.includes("#");

/** Replaces a heading-only group (Scheduled Trips) with its children, so they act like normal submenu links. */
const promote = (links: MenuLink[] = []): MenuLink[] => links.flatMap((l) => (l.group ? (l.children ?? []) : [l]));

/**
 * "Continue exploring" links for a page — only boxes that belong to that page:
 *  - an overview page → its own submenus (if it only has on-page sections, those sections);
 *  - a submenu page → its sibling submenus, then its overview;
 *  - any other page → nothing (pages with their own list set it explicitly).
 * Unrelated main sections are never added.
 */
export function relatedFor(path: string): RelatedLink[] {
  const own = menu.find((m) => m.href === path);
  if (own?.links) {
    const links = promote(own.links);
    const pages = links.filter(noAnchor);
    return (pages.length ? pages : links).map((l) => ({ label: l.label, sa: l.sa, href: l.href }));
  }

  for (const m of menu) {
    if (!path.startsWith(`${m.href}/`)) continue;
    const links = promote(m.links).filter(noAnchor);
    // Third level (e.g. a state under a direction): siblings, then the direction, then the overview.
    const parentLink = links.find((l) => path.startsWith(`${l.href}/`));
    if (parentLink?.children) {
      const sibs = parentLink.children.filter((c) => c.href !== path).map((c) => ({ label: c.label, sa: c.sa, href: c.href }));
      return [...sibs, { label: parentLink.label, sa: parentLink.sa, href: parentLink.href }, { label: `${m.label} overview`, sa: m.sa, href: m.href }];
    }
    const sibs = links.filter((l) => l.href !== path).map((l) => ({ label: l.label, sa: l.sa, href: l.href }));
    return [...sibs, { label: `${m.label} overview`, sa: m.sa, href: m.href }];
  }
  return [];
}

/** Breadcrumb trail (excluding Home and the page itself) for a path of 3+ segments. */
export function parentsFor(path: string): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  for (const m of menu) {
    if (path !== m.href && path.startsWith(`${m.href}/`)) {
      out.push({ label: m.label, href: m.href });
      const mid = promote(m.links).find((l) => path.startsWith(`${l.href}/`));
      if (mid) out.push({ label: mid.label, href: mid.href });
    }
  }
  return out;
}
