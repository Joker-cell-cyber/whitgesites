import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckoutProvider } from "@/components/checkout/CheckoutContext";
import CookieConsent from "@/components/ui/CookieConsent";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import { COMPANY } from "./constants/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Professional Organization Services`,
  description: `Transform your digital workspace with ${COMPANY.serviceName}. Professional organization services for individuals, teams, and businesses.`,
  keywords: "organization, workspace, productivity, bettersetup, team collaboration, personal knowledge base, setup specialist",
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

