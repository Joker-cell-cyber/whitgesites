import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { NewsletterProvider } from "./context/NewsletterContext";
import GDPRWrapper from "@/components/GDPRWrapper";
import NewsletterPopupWrapper from "@/components/NewsletterPopupWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClickForge - Custom Landing Page Design Services",
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
      <body className={`${inter.variable} antialiased`}>
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

