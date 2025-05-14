import type { Metadata } from "next";
import { Inter, Chakra_Petch, Space_Mono, Orbitron } from "next/font/google";
import "../styles/globals.css";  // Import Tailwind CSS v4
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientLayout from "@/components/layout/ClientLayout";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { NewsletterProvider } from "./context/NewsletterContext";
import CookieConsentWrapper from "@/components/ui/CookieConsentWrapper";
import NewsletterPopupWrapper from "@/components/ui/NewsletterPopupWrapper";

// Chargement des polices avec display: swap pour améliorer le LCP (Largest Contentful Paint)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', 
});

const chakraPetch = Chakra_Petch({ 
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ["latin"],
  variable: "--font-chakra-petch",
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: 'swap',
});

const orbitron = Orbitron({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "StreamPacker - Premium Stream Overlays, Alerts & Graphics",
  description: "Professional stream overlays, alerts and graphics packages for Twitch, Kick, and DLive streamers. Elevate your stream with custom designs.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${chakraPetch.variable} ${spaceMono.variable} ${orbitron.variable} font-sans cyber-grid-bg`}>
        <CookieConsentProvider>
          <NewsletterProvider>
            {/* ClientLayout: Gère les effets visuels, particules et éléments d'UI fixés 
                qui ne font pas partie du flux de document (position: fixed) */}
            <ClientLayout />
            
            {/* Structure principale du site avec approche traditionnelle :
                - Conteneur flex vertical qui s'étend sur toute la hauteur minimale de l'écran
                - Navbar en haut
                - Contenu principal qui prend l'espace disponible (flex-grow)
                - Footer en bas, qui défile naturellement avec le contenu */}
            <div className="site-wrapper flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            
            {/* Cookie Consent Banner */}
            <CookieConsentWrapper />
            
            {/* Newsletter Popup */}
            <NewsletterPopupWrapper />
          </NewsletterProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

