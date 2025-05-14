"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    
    if (!cookiesAccepted) {
      // Show banner after a short delay
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
  
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1F2937] border-t border-gray-800 shadow-xl">
      <div className="container mx-auto px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-gray-300 text-sm mb-4 sm:mb-0 sm:mr-6">
          <p>
            {COMPANY.serviceName} uses cookies to ensure you get the best experience on our website. 
            By continuing to browse, you agree to our use of cookies as described in our{" "}
            <Link href="/legal/cookies" className="text-lead-blue-400 hover:text-lead-blue-300 underline">
              Cookie Policy
            </Link>.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-lead-blue-600 hover:bg-lead-blue-700 rounded-md text-white font-medium text-sm transition-colors"
          >
            Accept
          </button>
          <Link
            href="/legal/cookies"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium text-sm transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
} 