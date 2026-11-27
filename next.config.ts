import type { NextConfig } from "next";

/** Old addresses → their new homes, so existing links and bookmarks keep working. */
const moved: [string, string][] = [
  ["/about", "/our-story"],
  ["/darshanam", "/our-story#darsanam"],
  ["/gurukulam", "/Indian-school"],
  ["/panchamukhi-shikshana", "/Indian-school/panchamukhi-shikshana"],
  ["/programmes", "/knowledge-centre"],
  ["/samskritam", "/knowledge-centre/e-jnana-kendram"],
  ["/research", "/knowledge-centre/granthalayam"],
  ["/spiritual-services", "/ritual"],
  ["/vanaprastham", "/senior-living"],
  ["/retired-living", "/senior-living"],
  ["/community", "/our-story"],
  ["/events", "/ritual"],
  ["/testimonials", "/"],
  ["/donate", "/donation"],
  ["/volunteer", "/volunteers"],
  ["/volunteer-registration", "/volunteers"],
  // Yajña was removed from the Ritual menu
  ["/ritual/yagna", "/ritual"],
  // Vedavani Pathashala moved from the Knowledge Centre to the indian School
  ["/knowledge-centre/vedavani-pathashala", "/indian-school"],
  // Devalaya Jirnoddhara page was removed
  ["/ritual/devalaya-jirnoddhara", "/ritual"],
  // Pilgrimage states now sit under a region
  ["/pilgrimage/keralam", "/pilgrimage/south-india/keralam"],
  ["/pilgrimage/dravida-desham", "/pilgrimage/south-india/dravida-desham"],
  ["/pilgrimage/karnataka-rajyam", "/pilgrimage/south-india/karnataka-rajyam"],
  ["/pilgrimage/andhra-pradesha", "/pilgrimage/south-india/andhra-pradesha"],
];

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // The view-only PDFs are read from disk by the /documents route, so make sure they ship with it.
  outputFileTracingIncludes: { "/documents/[file]": ["./private-documents/**/*"] },
  async redirects() {
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
