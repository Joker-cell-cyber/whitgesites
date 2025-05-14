import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import ConsentBanner from "@/components/ui/ConsentBanner";
import { COMPANY } from "./constants/company";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Create Custom AI Agents & GPTs`,
  description: "Build powerful, customized AI agents and GPTs for your business needs. Advanced customization, specialized capabilities, and seamless integration with existing systems.",
  keywords: "AI agents, custom GPT, artificial intelligence, AI development, GPT customization, AI solutions, agent creation, custom AI",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <NewsletterPopup />
        <ConsentBanner />
      </body>
    </html>
  );
}

