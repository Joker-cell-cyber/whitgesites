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

// Configuration combinée des métadonnées
export const generateMetadata = (): Metadata => {
  return {
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
    other: {
      ...SECURITY_HEADERS,
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
    },
  };
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${italiana.variable} antialiased min-h-screen flex flex-col bg-yfc-cream-100 text-[#1a1814]`}
      >
        <div className="fixed inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-5 pointer-events-none z-0"></div>
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
