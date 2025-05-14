import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckoutProvider } from "@/lib/checkout-context";
import CookieConsent from "@/components/ui/CookieConsent";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import { COMPANY } from "@/lib/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} | Elite Gaming Farming Services`,
  description: "Professional gaming services for MMO and MMORPG games. Power leveling, resource farming, raid carries, and more with guaranteed results for hardcore gamers.",
  keywords: "game farming, power leveling, MMO services, MMORPG boosting, WoW farming, Diablo 4, professional gaming, boosting services",
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
        <CheckoutProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
          <NewsletterPopup />
        </CheckoutProvider>
      </body>
    </html>
  );
}

