import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import { COMPANY } from "./constants/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Premium Lead Generation Services`,
  description: "Professional B2B and B2C lead generation services that help businesses connect with qualified prospects and grow their customer base.",
  keywords: "lead generation, B2B leads, B2C leads, sales leads, marketing leads, qualified leads",
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
        <CookieBanner />
        <NewsletterPopup />
      </body>
    </html>
  );
}

