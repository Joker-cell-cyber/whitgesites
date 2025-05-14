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
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  });
  const [hasConsented, setHasConsented] = useState(false);

  // Load saved consents on component mount
  useEffect(() => {
    const savedConsents = localStorage.getItem('cookieConsents');
    if (savedConsents) {
      setConsents(JSON.parse(savedConsents));
      setHasConsented(true);
    }
  }, []);

  const updateConsent = (newConsents: ConsentOptions) => {
    setConsents(newConsents);
    setHasConsented(true);
    localStorage.setItem('cookieConsents', JSON.stringify(newConsents));
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsents');
    setConsents({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    });
    setHasConsented(false);
  };

  return (
    <CookieConsentContext.Provider value={{ consents, updateConsent, hasConsented, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}; 