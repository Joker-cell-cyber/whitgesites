"use client";

import { useState, useEffect } from "react";
import { LegalPopup } from "./LegalPopup";

interface FooterClientWrapperProps {
  termsMarkdown: string;
  privacyMarkdown: string;
  cookiesMarkdown?: string;
}

export function FooterClientWrapper({ termsMarkdown, privacyMarkdown, cookiesMarkdown }: FooterClientWrapperProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'privacy' | 'cookies'>('terms');
  const [termsContent, setTermsContent] = useState<string>(termsMarkdown || 'Loading...');
  const [privacyContent, setPrivacyContent] = useState<string>(privacyMarkdown || 'Loading...');
  const [cookiesContent, setCookiesContent] = useState<string>(cookiesMarkdown || 'Loading...');

  // Fetch content from API when component mounts
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch terms
        const termsResponse = await fetch('/api/legal?type=terms');
        const termsData = await termsResponse.json();
        setTermsContent(termsData.content);
        
        // Fetch privacy
        const privacyResponse = await fetch('/api/legal?type=privacy');
        const privacyData = await privacyResponse.json();
        setPrivacyContent(privacyData.content);
        
        // Fetch cookies
        const cookiesResponse = await fetch('/api/legal?type=cookies');
        const cookiesData = await cookiesResponse.json();
        setCookiesContent(cookiesData.content);
      } catch (error) {
        console.error('Error fetching legal content:', error);
      }
    };
    
    fetchContent();
  }, []);

  const openPopup = (tab: 'terms' | 'privacy' | 'cookies') => {
    setActiveLegalTab(tab);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <ul className="mt-4 space-y-2">
         <li>
           <button onClick={() => openPopup('privacy')} className="text-base text-gray-500 hover:text-gray-900 hover:underline">
             Privacy Policy
           </button>
         </li>
         <li>
           <button onClick={() => openPopup('terms')} className="text-base text-gray-500 hover:text-gray-900 hover:underline">
             Terms of Service
           </button>
         </li>
         <li>
           <button onClick={() => openPopup('cookies')} className="text-base text-gray-500 hover:text-gray-900 hover:underline">
             Cookie Policy
           </button>
         </li>
         <li>
           <a href="/contact" className="text-base text-gray-500 hover:text-gray-900 hover:underline">
             Contact Us
           </a>
         </li>
       </ul>

      <LegalPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        initialTab={activeLegalTab}
        // Pass the content from our API
        termsMarkdown={termsContent}
        privacyMarkdown={privacyContent}
        cookiesMarkdown={cookiesContent}
      />
    </>
  );
} 