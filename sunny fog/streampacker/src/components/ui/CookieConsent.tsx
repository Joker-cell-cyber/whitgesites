"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCookieConsent } from '@/app/context/CookieConsentContext';

const CookieConsent: React.FC = () => {
  const { consents, updateConsent, hasConsented } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [localConsents, setLocalConsents] = useState(consents);

  if (hasConsented && !isVisible) return null;

  const handleAcceptAll = () => {
    const allConsents = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    };
    
    updateConsent(allConsents);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsents = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    };
    
    updateConsent(minimalConsents);
    setIsVisible(false);
  };

  const handleCustomSave = () => {
    updateConsent(localConsents);
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f1a] border-t border-[--neon-purple]/20 shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!isSettingsOpen ? (
            <div className="container mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row items-center md:items-start md:justify-between">
              <div className="mb-4 md:mb-0 max-w-3xl">
                <h3 className="text-white font-medium mb-2">We Value Your Privacy</h3>
                <p className="text-gray-400 text-sm">
                  This website uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                  <Link href="/legal/cookies" className="text-[--neon-blue] hover:text-[--neon-blue]/80 underline">
                    Cookie Policy
                  </Link>{" "}
                  to learn more.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleOpenSettings}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] hover:opacity-90 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Cookie Settings</h3>
                <button
                  onClick={handleCloseSettings}
                  className="text-gray-400 hover:text-white transition-colors"
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
              
              <p className="text-gray-400 text-sm mb-6">
                Manage your cookie preferences. Necessary cookies are required for the website to function properly.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Necessary</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      These cookies are essential for the website to function properly.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.necessary}
                      disabled
                      className="w-4 h-4 accent-[--neon-purple] bg-gray-700 border-gray-600 rounded focus:ring-[--neon-purple]"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Preferences</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      These cookies allow the website to remember choices you make and provide enhanced functionality.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.preferences}
                      onChange={() => toggleConsent("preferences")}
                      className="w-4 h-4 accent-[--neon-purple] bg-gray-700 border-gray-600 rounded focus:ring-[--neon-purple]"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Analytics</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      These cookies help us improve our website by collecting anonymous information.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.analytics}
                      onChange={() => toggleConsent("analytics")}
                      className="w-4 h-4 accent-[--neon-purple] bg-gray-700 border-gray-600 rounded focus:ring-[--neon-purple]"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Marketing</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      These cookies are used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.marketing}
                      onChange={() => toggleConsent("marketing")}
                      className="w-4 h-4 accent-[--neon-purple] bg-gray-700 border-gray-600 rounded focus:ring-[--neon-purple]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseSettings}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomSave}
                  className="px-4 py-2 bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] hover:opacity-90 text-white rounded-lg text-sm font-medium transition-colors"
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
};

export default CookieConsent; 