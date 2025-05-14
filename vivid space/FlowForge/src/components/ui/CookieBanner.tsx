"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show the banner after a short delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };
  
  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-sm md:text-base flex-1 pr-4">
          <p>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By clicking "Accept", you consent to our use of cookies. For more information, please read our{" "}
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('openCookiePolicy'))}
              className="text-flow-green-300 hover:text-flow-green-200 underline"
            >
              Cookie Policy
            </button>.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={declineCookies}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="bg-flow-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-flow-green-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
} 