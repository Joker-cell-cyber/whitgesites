'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ConsentOptions = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consents: ConsentOptions;
  updateConsent: (newConsents: ConsentOptions) => void;
  hasConsented: boolean;
  resetConsent: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consents, setConsents] = useState<ConsentOptions>({
    necessary: true, // Always true as necessary cookies are required
    preferences: false,
    analytics: false,
    marketing: false
  });
  
  const [hasConsented, setHasConsented] = useState(false);
  
  // Check for existing consent on component mount
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setConsents(parsedConsent);
        setHasConsented(true);
      } catch {
        // If parsing fails, reset to default
        localStorage.removeItem('cookieConsent');
      }
    }
  }, []);
  
  const updateConsent = (newConsents: ConsentOptions) => {
    // Ensure necessary cookies are always consented to
    const updatedConsents = { ...newConsents, necessary: true };
    setConsents(updatedConsents);
    setHasConsented(true);
    localStorage.setItem('cookieConsent', JSON.stringify(updatedConsents));
  };
  
  const resetConsent = () => {
    setConsents({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    });
    setHasConsented(false);
    localStorage.removeItem('cookieConsent');
  };
  
  return (
    <CookieConsentContext.Provider value={{ consents, updateConsent, hasConsented, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}; 