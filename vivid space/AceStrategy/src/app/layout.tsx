import type { Metadata } from "next";
import { Playfair_Display, Raleway, Special_Elite } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import EasterEgg from "@/components/ui/EasterEgg";
import CookieBanner from "@/components/ui/CookieBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AceStrategy - Premium Poker Coaching for Consistent Profit",
  description: "Transform your poker game into consistent profit with professional coaching for cash games, tournaments, and Spin & Go formats. Learn from experts who build winners at any level.",
  keywords: "poker coaching, cash game strategy, MTT coaching, poker training, tournament strategy, poker profitability, Spin & Go strategy, GTO poker, bankroll management",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${raleway.variable} ${specialElite.variable} antialiased`}>
        <CustomCursor />
        <LoadingScreen />
        <EasterEgg />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <NewsletterPopup />
      </body>
    </html>
  );
}

