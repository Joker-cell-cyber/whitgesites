import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import { COMPANY } from './constants/company';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: `${COMPANY.serviceName} - Custom Automation Services`,
  description: `We build one-time custom automations with Make.com and Zapier that connect your apps and streamline your business processes.`,
  robots: "noindex, nofollow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <NewsletterPopup />
      </body>
    </html>
  )
}

