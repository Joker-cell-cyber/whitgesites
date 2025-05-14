import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { NewsletterProvider } from "./context/NewsletterContext";
import GDPRWrapper from "@/components/GDPRWrapper";
import NewsletterPopupWrapper from "@/components/NewsletterPopupWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SolidCraft - Custom Landing Page Design Services",
  description: "Professional landing page design services that convert. Get a custom-built landing page with no monthly fees.",
  keywords: "landing page design, custom landing pages, website design, conversion optimization, sales pages, lead generation",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${fraunces.variable} antialiased`}>
        <CookieConsentProvider>
          <NewsletterProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <GDPRWrapper />
            <NewsletterPopupWrapper />
          </NewsletterProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

