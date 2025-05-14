import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import NewsletterPopupProvider from "@/app/providers/NewsletterProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerVivid - Professional Career Preparation Services",
  description: "Expert career preparation services including resume/CV creation, interview coaching, and application preparation for professional opportunities.",
  keywords: "career preparation, resume writing, CV creation, interview coaching, job application, professional development, career services",
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
        <NewsletterPopupProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </NewsletterPopupProvider>
      </body>
    </html>
  );
}

