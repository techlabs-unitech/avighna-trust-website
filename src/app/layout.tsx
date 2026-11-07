import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";
import { ChatbotPlaceholder } from "./_components/chatbot-placeholder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
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
    <html lang="en" className={`${geistSans.variable} ${lora.variable}`}>
      <body>
        {children}
        <ChatbotPlaceholder />
      </body>
    </html>
  );
}
