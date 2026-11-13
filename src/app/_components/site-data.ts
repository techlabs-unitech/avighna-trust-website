export const brand = {
  trust: "Avighna Trust",
  pathashala: "Vedavani Pathashala",
  relationshipNote: "Institutional relationship and official naming to be confirmed.",
  logoSrc: "/images/avighna-foundation-logo.png",
  logoWidth: 2172,
  logoHeight: 724,
  shloka: "ईशावास्यमिदं सर्वम्",
};

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
