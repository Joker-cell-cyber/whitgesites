import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import NewsletterPopup from "@/components/ui/NewsletterPopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CutYourVid - Professional Video Editing Services",
  description: "Professional video editing services for short-form content, long-form videos, and advertising. Turn your raw footage into engaging content.",
  keywords: "video editing, short-form content, TikTok editing, Instagram Reels, YouTube videos, advertising videos, professional editing",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <NewsletterPopup />
      </body>
    </html>
  );
}

