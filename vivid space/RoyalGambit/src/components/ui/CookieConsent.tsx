"use client";

import React, { useState, useEffect } from "react";
import { COMPANY } from "@/app/constants/company";
import Link from "next/link";
import { useCookieConsent } from "@/app/context/CookieConsentContext";

const CookieConsent = () => {
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
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#0c1d3d] border-t border-[#1e365a] shadow-2xl">
      {!isSettingsOpen ? (
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="md:pr-8">
              <h3 className="text-xl font-bold text-white mb-2">Cookie Consent</h3>
              <p className="text-sm text-gray-300">
                {COMPANY.serviceName} uses cookies to enhance your experience and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                <Link href="/legal/cookies" className="underline text-chess-gold-400 hover:text-chess-gold-300 ml-1">
                  Learn more
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-[#1a2e4f] hover:bg-[#253a5e] text-white rounded-lg text-sm transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleOpenSettings}
                className="px-4 py-2 bg-[#1a2e4f] hover:bg-[#253a5e] text-white rounded-lg text-sm transition-colors"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 hover:from-chess-blue-700 hover:to-chess-gold-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Cookie Settings</h3>
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
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start justify-between p-4 bg-[#1a2e4f]/50 rounded-lg">
              <div>
                <div className="flex items-center">
                  <h4 className="text-white font-medium">Strictly Necessary</h4>
                  <span className="ml-2 px-2 py-0.5 bg-[#253a5e] text-white text-xs rounded">Required</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={localConsents.necessary}
                  disabled
                  className="w-4 h-4 accent-chess-gold-500 bg-[#1a2e4f] border-[#1e365a] rounded focus:ring-chess-gold-500"
                />
              </div>
            </div>
            
            <div className="flex items-start justify-between p-4 bg-[#1a2e4f]/50 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Preferences</h4>
                <p className="text-gray-400 text-sm mt-1">
                  These cookies enable personalized features and functionality.
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={localConsents.preferences}
                  onChange={() => toggleConsent("preferences")}
                  className="w-4 h-4 accent-chess-gold-500 bg-[#1a2e4f] border-[#1e365a] rounded focus:ring-chess-gold-500"
                />
              </div>
            </div>
            
            <div className="flex items-start justify-between p-4 bg-[#1a2e4f]/50 rounded-lg">
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
                  className="w-4 h-4 accent-chess-gold-500 bg-[#1a2e4f] border-[#1e365a] rounded focus:ring-chess-gold-500"
                />
              </div>
            </div>
            
            <div className="flex items-start justify-between p-4 bg-[#1a2e4f]/50 rounded-lg">
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
                  className="w-4 h-4 accent-chess-gold-500 bg-[#1a2e4f] border-[#1e365a] rounded focus:ring-chess-gold-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCloseSettings}
              className="px-4 py-2 bg-[#1a2e4f] hover:bg-[#253a5e] text-white rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCustomSave}
              className="px-4 py-2 bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 hover:from-chess-blue-700 hover:to-chess-gold-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsent; 