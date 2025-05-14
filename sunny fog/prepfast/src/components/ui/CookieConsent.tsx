"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleLearnMore = () => {
    // Keep banner visible, just navigate to cookie policy page
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-gray-800"
        >
          <div className="container mx-auto px-4 py-4 md:py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-sm md:pr-8">
                <p>
                  This website uses cookies to enhance user experience and analyze site usage. 
                  By continuing to use our site, you consent to our use of cookies in accordance with our{' '}
                  <Link href="/legal/cookies" className="text-[#00B2A9] hover:underline">
                    Cookie Policy
                  </Link>.
                </p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/legal/cookies"
                  className="px-4 py-2 text-sm font-medium text-white border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Link>
                
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#0078D7] to-[#00B2A9] rounded-md hover:opacity-90 transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 