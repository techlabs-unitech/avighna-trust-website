export const brand = {
  trust: "Avighna Trust",
  pathashala: "Vedavani Pathashala",
  relationshipNote: "Institutional relationship and official naming to be confirmed.",
  logoSrc: "/images/WhatsApp%20Image%202026-10-16%20at%2010.29.45%20AM.jpeg",
};

export type NavLink = { href: string; label: string; description: string };
export type NavGroup = { label: string; links: NavLink[] };

export const navigationGroups: NavGroup[] = [
  {
    label: "Our Story",
    links: [
      { href: "/about", label: "About", description: "Our purpose and story" },
      { href: "/gurukulam", label: "Gurukulam", description: "The guru–shishya way of learning" },
      { href: "/panchamukhi-shikshana", label: "Panchamukhi Shikshana", description: "Five dimensions of education" },
    ],
  },
  {
    label: "Learning",
    links: [
      { href: "/programmes", label: "Programmes", description: "Areas of study and growth" },
      { href: "/samskritam", label: "Samskritam", description: "The language of our heritage" },
      { href: "/research", label: "Research", description: "Knowledge and publications" },
    ],
  },
  {
    label: "Tradition",
    links: [
      { href: "/spiritual-services", label: "Spiritual services", description: "Tradition expressed through service" },
      { href: "/darshanam", label: "Darśanam", description: "Sacred seeing" },
      { href: "/vanaprastham", label: "Vanaprastham", description: "A life of reflection" },
      { href: "/community", label: "Community", description: "Learning with responsibility" },
    ],
  },
  {
    label: "Engage",
    links: [
      { href: "/events", label: "Events", description: "Gatherings and activities" },
      { href: "/gallery", label: "Gallery", description: "Moments from our community" },
      { href: "/testimonials", label: "Testimonials", description: "Voices from our community" },
      { href: "/volunteer", label: "Volunteer", description: "Offer your time and skill" },
      { href: "/contact", label: "Contact", description: "Enquiries and information" },
    ],
  },
];

export type SocialPlatform = "facebook" | "instagram" | "youtube" | "x" | "whatsapp";

/**
 * TODO: replace each "#" with the trust's official profile URL.
 * Links that start with "http" open in a new tab; "#" stays on the page until replaced.
 */
export const socialLinks: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
  { platform: "x", label: "X (Twitter)", href: "#" },
  { platform: "whatsapp", label: "WhatsApp", href: "#" },
];
