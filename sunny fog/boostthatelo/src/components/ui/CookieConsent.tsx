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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-300 md:max-w-3xl">
            <p>
              This website uses cookies to enhance your browsing experience and provide personalized services. 
              By clicking &quot;Accept,&quot; you consent to our use of cookies as described in our{" "}
              <Link href="/legal/cookies" className="text-blue-400 underline">
                Cookie Policy
              </Link>
              {" "}and{" "}
              <Link href="/legal/privacy" className="text-blue-400 underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={declineCookies}
              className="px-4 py-2 bg-gray-800 text-gray-200 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 