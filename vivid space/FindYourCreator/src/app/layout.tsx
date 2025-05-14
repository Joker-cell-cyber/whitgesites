import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { NewsletterProvider } from "./context/NewsletterContext";
import GDPRWrapper from "@/components/ui/GDPRWrapper";
import NewsletterPopupWrapper from "@/components/ui/NewsletterPopupWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/checkout/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FindYourCreator - Professional UGC Creator Sourcing Service",
  description: "Professional service to connect brands with the perfect UGC creators for your marketing campaigns. One-time service with quality results.",
  keywords: "UGC creators, creator sourcing, brand content, TikTok creators, Instagram creators, UGC marketing, content creators",
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
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <GDPRWrapper />
              <NewsletterPopupWrapper />
            </CartProvider>
          </NewsletterProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

