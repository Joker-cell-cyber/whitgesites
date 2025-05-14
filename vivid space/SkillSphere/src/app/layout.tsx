import type { Metadata } from "next";
import { Inter, Montserrat, Space_Grotesk } from "next/font/google";
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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Dominate The Game | Pro Gaming Coaching`,
  description: "Level up your gameplay with elite coaching for Fortnite, COD, LoL, CS:GO, and more. Master the meta, climb the ranks, and crush your competition.",
  keywords: "pro gaming coaching, esports training, gaming meta, rank up, competitive gaming, Fortnite coaching, COD coaching, League of Legends coaching, CS:GO coaching, Apex Legends coaching",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} ${spaceGrotesk.variable} antialiased grid-pattern`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <NewsletterPopup />
      </body>
    </html>
  );
}

