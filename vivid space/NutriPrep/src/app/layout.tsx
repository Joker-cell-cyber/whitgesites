import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GDPRBanner from "@/components/ui/GDPRBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import { COMPANY } from "./constants/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Nutrition & Meal Prep Services`,
  description: "Customized nutrition plans, delicious recipes, and convenient meal prep guides delivered to your inbox. Make healthy eating simple and enjoyable.",
  keywords: "meal prep, nutrition, healthy eating, meal plans, recipes, food prep, meal subscription, healthy recipes, weekly meal planning",
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
        <GDPRBanner />
        <NewsletterPopup />
      </body>
    </html>
  );
}

