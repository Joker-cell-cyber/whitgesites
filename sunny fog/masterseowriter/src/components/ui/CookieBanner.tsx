"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      // If not, show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-4 md:flex md:items-center md:justify-between">
        <div className="text-sm text-gray-700 mb-4 md:mb-0 md:mr-8">
          <p>
            This website uses cookies to ensure you get the best experience on our website. 
            By continuing to use this site, you consent to our use of cookies in accordance with our{" "}
            <Link href="/legal/cookie" className="text-turquoise-600 underline hover:text-turquoise-700">
              Cookie Policy
            </Link> and {" "}
            <Link href="/legal/privacy" className="text-turquoise-600 underline hover:text-turquoise-700">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex space-x-3 shrink-0">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm text-white bg-turquoise-600 hover:bg-turquoise-700 rounded-md transition-colors"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
} 