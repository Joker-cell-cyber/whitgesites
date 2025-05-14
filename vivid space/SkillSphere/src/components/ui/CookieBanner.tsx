"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-[#080808] border-t border-[#44D62C]/30 p-4 md:p-6 shadow-lg">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-2">
              {COMPANY.serviceName} uses cookies to enhance your experience, analyze site traffic, and for marketing purposes.
              By continuing to use this site, you consent to our use of cookies in accordance with our{' '}
              <Link href="/legal/cookies" className="text-[#44D62C] underline hover:text-[#44D62C]/80">
                Cookie Policy
              </Link>.
            </p>
          </div>
          
          <div className="flex flex-shrink-0 space-x-4">
            <Link 
              href="/legal/cookies" 
              className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
            >
              Learn More
            </Link>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm text-white bg-[#44D62C] rounded-md hover:bg-[#44D62C]/80 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 