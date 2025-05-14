import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { COMPANY } from "./constants/company";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} | Professional SEO Content Services`,
  description: "High-quality SEO content services to optimize your online presence and improve your search engine rankings.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-indigo-50 text-indigo-900`}>
        <CheckoutProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <NewsletterPopup />
        </CheckoutProvider>
      </body>
    </html>
  );
}

