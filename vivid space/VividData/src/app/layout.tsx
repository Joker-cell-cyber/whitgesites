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
  description: "Expert data extraction and visualization services that bring your data to life with clarity and insight.",
  keywords: "web scraping, data extraction, data visualization, web data, data insights, data services, vivid data",
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

