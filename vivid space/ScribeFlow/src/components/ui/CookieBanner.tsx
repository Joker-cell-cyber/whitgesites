"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "../../app/constants/company";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [localConsents, setLocalConsents] = useState({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookieConsent');
    if (!cookiesAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsents = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(allConsents));
    setLocalConsents(allConsents);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsents = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsents));
    setLocalConsents(minimalConsents);
    setIsVisible(false);
  };

  const handleCustomSave = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(localConsents));
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const toggleConsent = (type: keyof typeof localConsents) => {
    if (type === "necessary") return; // Cannot be disabled
    
    setLocalConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-book-blue-800 shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!isSettingsOpen ? (
            <div className="container mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row items-center md:items-start md:justify-between">
              <div className="mb-4 md:mb-0 max-w-3xl">
                <h3 className="text-black font-medium mb-2">We Value Your Privacy</h3>
                <p className="text-gray-800 text-sm">
                  This website uses cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{" "}
                  <Link href="/legal/cookies" className="text-book-gold-400 hover:text-book-gold-300 underline">
                    Cookie Policy
                  </Link>{" "}
                  to learn more.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleOpenSettings}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-black font-medium">Cookie Settings</h3>
                <button
                  onClick={handleCloseSettings}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between p-4 bg-book-blue-800/50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-black font-medium">Strictly Necessary</h4>
                      <span className="ml-2 px-2 py-0.5 bg-book-blue-700 text-black text-xs rounded">Required</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">
                      These cookies are necessary for the website to function and cannot be switched off.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.necessary}
                      disabled
                      className="w-4 h-4 accent-book-blue-600 bg-book-blue-700 border-book-blue-600 rounded focus:ring-book-blue-600"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-book-blue-800/50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Preferences</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      These cookies enable personalized features and functionality.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.preferences}
                      onChange={() => toggleConsent("preferences")}
                      className="w-4 h-4 accent-book-blue-600 bg-book-blue-700 border-book-blue-600 rounded focus:ring-book-blue-600"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-book-blue-800/50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Analytics</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      These cookies help us improve our website by collecting anonymous information.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.analytics}
                      onChange={() => toggleConsent("analytics")}
                      className="w-4 h-4 accent-book-blue-600 bg-book-blue-700 border-book-blue-600 rounded focus:ring-book-blue-600"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-book-blue-800/50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Marketing</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      These cookies are used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.marketing}
                      onChange={() => toggleConsent("marketing")}
                      className="w-4 h-4 accent-book-blue-600 bg-book-blue-700 border-book-blue-600 rounded focus:ring-book-blue-600"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCloseSettings}
                  className="px-4 py-2 bg-book-blue-800 hover:bg-book-blue-700 text-black rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomSave}
                  className="px-4 py-2 bg-gradient-to-r from-book-blue-600 to-book-green-600 hover:from-book-blue-700 hover:to-book-green-700 text-black rounded-lg text-sm font-medium transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 