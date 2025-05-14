"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      // Show the banner if consent hasn't been given
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0c1410] border-t border-rank-emerald-900/30 p-4 z-50 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-300 md:max-w-3xl">
            <p>
              This website uses cookies to enhance your browsing experience and provide personalized services. 
              By clicking &quot;Accept,&quot; you consent to our use of cookies as described in our{" "}
              <Link href="/legal/cookies" className="text-rank-emerald-400 underline hover:text-rank-emerald-300">
                Cookie Policy
              </Link>
              {" "}and{" "}
              <Link href="/legal/privacy" className="text-rank-emerald-400 underline hover:text-rank-emerald-300">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={declineCookies}
              className="px-4 py-2 bg-card-accent text-gray-200 text-sm font-medium rounded-md hover:bg-rank-emerald-900/20 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-gradient-to-r from-rank-emerald-600 to-rank-emerald-500 text-white text-sm font-medium rounded-md hover:shadow-lg hover:shadow-rank-emerald-500/20 transition-all"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 