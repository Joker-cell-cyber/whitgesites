import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import CookieConsent from "@/components/ui/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProTranslator - Professional Online Translation Services",
  description: "Fast, accurate and affordable online translation services for text documents and video subtitling in multiple languages.",
  keywords: "translation services, online translation, document translation, video subtitling, professional translators, multilingual services",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#0a1221] text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <NewsletterPopup />
        <CookieConsent />
      </body>
    </html>
  );
}

