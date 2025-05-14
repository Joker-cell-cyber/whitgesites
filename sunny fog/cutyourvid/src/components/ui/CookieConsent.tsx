"use client";

import { useState, useEffect } from 'react';
import { COMPANY } from '@/app/constants/company';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-gray-900 border-t border-gray-800 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-300">
            We use cookies to enhance your browsing experience. By continuing to use our website, you consent to our use of cookies in accordance with our{' '}
            <Link 
              href="/legal/cookies" 
              className="text-vid-red-400 hover:text-vid-red-300 underline"
            >
              Cookie Policy
            </Link>.
          </div>
          <div className="flex gap-3">
            <button 
              onClick={acceptCookies}
              className="px-4 py-2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Accept
            </button>
            <Link 
              href="/legal/cookies"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 