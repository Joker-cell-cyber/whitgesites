"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (!hasConsented) {
      // Show banner if no consent has been given
      setIsVisible(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  
  const handleDecline = () => {
    // Still set something in localStorage so we don't show the banner again
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#1e293b] border-t border-indigo-800/30 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-8 text-sm text-gray-300 max-w-3xl">
              <p>
                We use cookies to enhance your experience on our website. By continuing to browse this site, you agree to our use of cookies.
                <Link href="/legal/cookies" className="text-blue-400 hover:text-blue-300 ml-1">
                  Learn more
                </Link>
              </p>
            </div>
            
            <div className="flex flex-shrink-0 space-x-4">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-md transition-colors"
              >
                Decline
              </button>
              
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 