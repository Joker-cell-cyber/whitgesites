import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { CookieConsent } from "@/components/CookieConsent";
import { COMPANY } from "./constants/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Professional Web Scraping Services`,
  description: "Expert web scraping and data extraction services for businesses of all sizes. Get accurate data delivered directly to you.",
  keywords: "web scraping, data extraction, data scraping, web data, scraped data, data services",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <NewsletterPopup />
        <CookieConsent />
      </body>
    </html>
  );
}

