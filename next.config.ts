import type { NextConfig } from "next";

/** Old addresses → their new homes, so existing links and bookmarks keep working. */
const moved: [string, string][] = [
  ["/about", "/our-story"],
  ["/darshanam", "/our-story#darsanam"],
  ["/gurukulam", "/knowledge-centre/vedavani-pathashala"],
  ["/panchamukhi-shikshana", "/knowledge-centre/vedavani-pathashala#panchamukhi-shikshana"],
  ["/programmes", "/knowledge-centre"],
  ["/samskritam", "/knowledge-centre/e-jnana-kendram#sanskritam"],
  ["/research", "/knowledge-centre/granthalayam"],
  ["/spiritual-services", "/ritual"],
  ["/vanaprastham", "/retired-living"],
  ["/community", "/our-story"],
  ["/events", "/ritual"],
  ["/testimonials", "/"],
  ["/donate", "/donation"],
  ["/volunteer", "/volunteers"],
  ["/volunteer-registration", "/volunteers"],
];

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  async redirects() {
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
