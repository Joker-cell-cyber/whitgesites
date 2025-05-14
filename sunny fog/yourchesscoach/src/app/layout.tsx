import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductProvider } from "@/components/context/ProductContext";
import { CookieConsentProvider } from "@/app/context/CookieConsentContext";
import { NewsletterProvider } from "@/app/context/NewsletterContext";
import GDPRWrapper from "@/components/GDPRWrapper";
import NewsletterPopupWrapper from "@/components/NewsletterPopupWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YourChessCoach - Premium Online Chess Coaching",
  description: "Elevate your chess game with personalized coaching, strategic analysis, and proven methods to improve your ELO rating.",
  keywords: "chess coaching, chess lessons, improve ELO rating, chess strategy, opening preparation, endgame mastery, online chess coach",
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
            <ProductProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <GDPRWrapper />
              <NewsletterPopupWrapper />
            </ProductProvider>
          </NewsletterProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

