import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "./components/CursorProvider";
import { NewsletterProvider } from "./context/NewsletterContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YourSuperDev | Agence de Développement Web",
  description: "Nous créons des sites web et applications modernes avec les dernières technologies pour propulser votre entreprise",
  keywords: ["développement web", "react", "nextjs", "agence web", "sites web modernes"],
  authors: [{ name: "YourSuperDev" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <CookieConsentProvider>
          <NewsletterProvider>
            <CursorProvider>
              {children}
            </CursorProvider>
          </NewsletterProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

