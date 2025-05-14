"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was previously given
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200 md:flex md:items-center md:justify-between"
        >
          <div className="md:flex-1 md:pr-4 mb-4 md:mb-0">
            <p className="text-gray-700 text-sm">
              We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/legal/cookies', '_blank');
                }}
                className="text-notion-accent-600 hover:underline ml-1"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium bg-notion-accent-500 text-white rounded-md hover:bg-notion-accent-600 transition-colors"
            >
              Accept All Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 