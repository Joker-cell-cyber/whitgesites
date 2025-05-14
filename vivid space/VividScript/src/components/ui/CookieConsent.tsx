"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'full');
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-vid-blue-900 text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 pr-4 max-w-3xl">
            <p className="text-sm mb-2">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="text-xs text-vid-blue-300">
              <Link href="/legal/cookies" className="underline hover:text-white">
                Read our Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptNecessary}
              className="px-4 py-2 border border-vid-white-100 text-white rounded hover:bg-vid-white-100 hover:text-vid-blue-900 transition-colors text-sm font-medium heading-font"
            >
              Necessary Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded button-glow transition-colors text-sm font-medium heading-font"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 