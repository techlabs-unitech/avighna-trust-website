import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ChatbotPlaceholder } from "./_components/chatbot-placeholder";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
    siteName: "Avighna Trust · Vedavani Pathashala",
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
    <html lang="en" className={geistSans.variable}>
      <body>
        {children}
        <ChatbotPlaceholder />
      </body>
    </html>
  );
}
