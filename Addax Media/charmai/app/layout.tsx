import type { Metadata, Viewport } from "next";
import { Poppins, Italiana } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SECURITY_HEADERS } from "./lib/constants";
import { LoadingProvider } from "./providers/loading-provider";
import { AuthProvider } from './providers/auth-provider';
import { StatsProvider } from "./context/stats-context";
import { LegalProvider } from "./context/legal-context";
import ClientLayout from "./client-layout";
import StatsInitializer from "./components/stats-initializer";
import { headers as nextHeaders } from 'next/headers';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const italiana = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Les en-têtes de sécurité sont maintenant définis dans next.config.js
// pour éviter les erreurs de typage dans les nouvelles versions de Next.js

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${italiana.variable} antialiased min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-white`}
      >
        <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 pointer-events-none z-0"></div>
        <LoadingProvider>
          <AuthProvider>
            <LegalProvider>
              <ClientLayout>
                <StatsProvider>
                  <StatsInitializer />
                  {children}
                </StatsProvider>
              </ClientLayout>
            </LegalProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
