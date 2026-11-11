import type { Metadata } from "next";
import { Cormorant_Garamond, Mukta, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "./globals.css";
import { ChatbotPlaceholder } from "./_components/chatbot-placeholder";

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
  title: "Vedavani Pathashala | Vedic Learning & Living Wisdom",
  description:
    "Preserving the eternal wisdom of the Vedas, nurturing values, and inspiring future generations through Vedic studies, Sanskrit, and holistic learning.",
  openGraph: {
    title: "Vedavani Pathashala | Vedic Learning & Living Wisdom",
    description:
      "Preserving the eternal wisdom of the Vedas, nurturing values, and inspiring future generations through Vedic studies, Sanskrit, and holistic learning.",
    siteName: "Avighna Trust · Avighna Foundation © All Rights Reserved 2026",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vedavani Pathashala | Vedic Learning & Living Wisdom",
    description:
      "Preserving the eternal wisdom of the Vedas, nurturing values, and inspiring future generations.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${mukta.variable} ${tiro.variable}`}>
      <body>
        {children}
        <ChatbotPlaceholder />
      </body>
    </html>
  );
}
