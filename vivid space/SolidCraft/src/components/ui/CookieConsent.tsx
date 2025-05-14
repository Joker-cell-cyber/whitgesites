"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCookieConsent } from "../../app/context/CookieConsentContext";

const CookieConsent: React.FC = () => {
  const { consents, updateConsent, hasConsented } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [localConsents, setLocalConsents] = useState(consents);

  // Show the banner if the user hasn't consented
  useEffect(() => {
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  // Update local consents when the context changes
  useEffect(() => {
    setLocalConsents(consents);
  }, [consents]);

  const handleAcceptAll = () => {
    const allConsents = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    };
    
    updateConsent(allConsents);
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
    
    updateConsent(minimalConsents);
    setLocalConsents(minimalConsents);
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#141414] border-t border-gray-800 shadow-xl">
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {!isSettingsOpen ? (
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="md:pr-6 mb-4 md:mb-0">
                <p className="text-gray-300 text-sm">
                  We use cookies to enhance your experience on our website. By clicking &quot;Accept All&quot;, you consent to the use of all cookies. You can also customize your preferences by clicking &quot;Customize&quot;.{" "}
                  <Link href="/legal/cookies" className="underline text-indigo-400 hover:text-indigo-300">
                    Learn more
                  </Link>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleOpenSettings}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) :
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Cookie Settings</h3>
                <button
                  onClick={handleCloseSettings}
                  className="text-zinc-400 hover:text-white transition-colors"
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
                <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-white font-medium">Strictly Necessary</h4>
                      <span className="ml-2 px-2 py-0.5 bg-zinc-700 text-white text-xs rounded">Required</span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-1">
                      These cookies are necessary for the website to function and cannot be switched off.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.necessary}
                      disabled
                      className="w-4 h-4 accent-indigo-600 bg-zinc-700 border-zinc-600 rounded focus:ring-indigo-600"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Preferences</h4>
                    <p className="text-zinc-400 text-sm mt-1">
                      These cookies enable personalized features and functionality.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.preferences}
                      onChange={() => toggleConsent("preferences")}
                      className="w-4 h-4 accent-indigo-600 bg-zinc-700 border-zinc-600 rounded focus:ring-indigo-600"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Analytics</h4>
                    <p className="text-zinc-400 text-sm mt-1">
                      These cookies help us improve our website by collecting anonymous information.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.analytics}
                      onChange={() => toggleConsent("analytics")}
                      className="w-4 h-4 accent-indigo-600 bg-zinc-700 border-zinc-600 rounded focus:ring-indigo-600"
                    />
                  </div>
                </div>
                
                <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Marketing</h4>
                    <p className="text-zinc-400 text-sm mt-1">
                      These cookies are used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={localConsents.marketing}
                      onChange={() => toggleConsent("marketing")}
                      className="w-4 h-4 accent-indigo-600 bg-zinc-700 border-zinc-600 rounded focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCloseSettings}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomSave}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CookieConsent; 