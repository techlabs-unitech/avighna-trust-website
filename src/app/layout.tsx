import type { Metadata } from "next";
import { Cormorant_Garamond, Mukta, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "./globals.css";
import { FloatingActions } from "./_components/floating-actions";
import { OmSprite } from "./_components/om-emblem";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
});

const tiro = Tiro_Devanagari_Sanskrit({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  // Absolute base for the share-preview images. Set NEXT_PUBLIC_SITE_URL to the live domain in Vercel.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://avighna-trust-wireframe.vercel.app"),
  title: "Avighna Foundation · Preserving Sanatana Dharma & Uplifting Society",
  description:
    "Avighna Foundation preserves the Vedas, Sanskrit and Sanatana Dharma and uplifts society through free residential gurukula education, temple worship, pilgrimage, elder care and community seva.",
  applicationName: "Avighna Foundation",
  // The share-preview images (opengraph-image.png / twitter-image.png) and the icons (favicon.ico, icon.png, apple-icon.png) live in this folder and are linked automatically.
  openGraph: {
    title: "Avighna Foundation · Preserving Sanatana Dharma & Uplifting Society",
    description:
      "Avighna Foundation preserves the Vedas, Sanskrit and Sanatana Dharma and uplifts society through free residential gurukula education, temple worship, pilgrimage, elder care and community seva.",
    siteName: "Avighna Foundation",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avighna Foundation · Preserving Sanatana Dharma & Uplifting Society",
    description:
      "Preserving the eternal wisdom of the Vedas, nurturing values, and uplifting society through education, seva and compassion.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${mukta.variable} ${tiro.variable}`}>
      <body>
        <OmSprite />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
