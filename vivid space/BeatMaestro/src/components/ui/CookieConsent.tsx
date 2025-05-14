"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has been given before
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 p-4 md:p-6 z-50 animate-fade-in-up shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">We Value Your Privacy</h3>
            <p className="text-gray-300 text-sm">
              {COMPANY.serviceName} uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking &quot;Accept&quot;, you consent to our use of cookies. For more information, please read our <Link href="/legal/cookies" className="text-beat-purple-400 hover:text-beat-purple-300 underline">Cookie Policy</Link>.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md transition-colors duration-200"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 hover:from-beat-purple-700 hover:to-beat-gold-600 text-white text-sm rounded-md transition-colors duration-200"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 