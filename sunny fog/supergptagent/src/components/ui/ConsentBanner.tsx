"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  
  const handleCustomize = () => {
    // This would typically open a modal with more detailed cookie preferences
    // For simplicity, we're just accepting all in this demo
    localStorage.setItem('cookieConsent', 'true');
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
          className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-ai-blue-500/30"
        >
          <div className="container mx-auto px-4 py-4 md:py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-sm md:pr-8">
                <p>
                  This website uses cookies to enhance user experience and analyze site usage. 
                  By continuing to use our site, you consent to our use of cookies in accordance with our{' '}
                  <Link href="/legal/cookies" className="text-ai-blue-400 hover:underline">
                    Cookie Policy
                  </Link>.
                </p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleCustomize}
                  className="px-4 py-2 text-sm font-medium text-white border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Customize
                </button>
                
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 rounded-md hover:from-ai-blue-700 hover:to-ai-purple-700 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 