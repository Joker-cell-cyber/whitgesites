import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "./constants/company";
import CookieConsent from "@/components/ui/CookieConsent";
import NewsletterPopup from "@/components/ui/NewsletterPopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Professional ELO Boosting Services`,
  description: "Professional ELO boosting services for competitive games. Secure, reliable and fast rank-boosting by expert players.",
  keywords: "elo boosting, rank boosting, league of legends, valorant, competitive gaming, professional boosting, rank up",
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


