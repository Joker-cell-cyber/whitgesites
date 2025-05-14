import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import { SITE_NAME, SITE_DESCRIPTION, SECURITY_HEADERS } from "./lib/constants";
import { LoadingProvider } from "./providers/loading-provider";
import { AuthProvider } from './providers/auth-provider';
import { StatsProvider } from "./context/stats-context";
import ClientLayout from "./client-layout";
import StatsInitializer from "./components/stats-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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

export const headers = () => {
  return {
    ...SECURITY_HEADERS,
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 pointer-events-none z-0"></div>
        <LoadingProvider>
          <AuthProvider>
            <StatsProvider>
              <StatsInitializer />
              <ClientLayout>
                <main className="min-h-screen">
                  {children}
                </main>
              </ClientLayout>
            </StatsProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
