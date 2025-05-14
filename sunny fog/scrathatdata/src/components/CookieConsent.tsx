'use client';

import { useState, useEffect } from 'react';
import { COMPANY } from '@/app/constants/company';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // In a real implementation, this would open cookie preferences
    // For now, just accept all
    handleAccept();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4 max-w-2xl">
          <p className="text-gray-700 text-sm">
            {COMPANY.serviceName} uses cookies to enhance your experience on our website. 
            By continuing to browse, you agree to our use of cookies as described in our{' '}
            <button onClick={handleCustomize} className="text-primary underline hover:text-primary-dark">
              Cookie Policy
            </button>.
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleCustomize}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Customize
          </button>
          <button 
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
} 