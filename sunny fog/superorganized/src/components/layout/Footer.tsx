"use client";

import { useState } from "react";
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "@/app/legal/LegalContent";
import { COMPANY } from "@/app/constants/company";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);

  // Function to open a popup
  const openPopup = (popupType: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(popupType);
  };

  // Function to close the popup
  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">About Us</h3>
            <p className="text-gray-600 mb-4">
              {COMPANY.serviceName} helps individuals and businesses create efficient organization systems, designed for maximum productivity.
            </p>
            <Link href="/about" className="text-notion-accent-500 hover:text-notion-accent-600 transition-colors">
              Learn more about us
            </Link>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-black transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => openPopup('terms')} 
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('privacy')} 
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('cookies')} 
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a 
                  href={`mailto:${COMPANY.email}`} 
                  className="hover:text-black transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${COMPANY.phone}`} 
                  className="hover:text-black transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-2">
            {COMPANY.serviceName} is a service of {COMPANY.name}<br />
            EIN: {COMPANY.ein}<br />
            {COMPANY.address}
          </p>
        </div>
      </div>
      
      {/* Terms and Conditions Popup */}
      <LegalPopup 
        isOpen={activePopup === 'terms'} 
        onClose={closePopup} 
        title="Terms & Conditions"
      >
        <LegalContent type="terms" />
      </LegalPopup>
      
      {/* Privacy Policy Popup */}
      <LegalPopup 
        isOpen={activePopup === 'privacy'} 
        onClose={closePopup} 
        title="Privacy Policy"
      >
        <LegalContent type="privacy" />
      </LegalPopup>

      {/* Cookie Policy Popup */}
      <LegalPopup 
        isOpen={activePopup === 'cookies'} 
        onClose={closePopup} 
        title="Cookie Policy"
      >
        <LegalContent type="cookies" />
      </LegalPopup>
    </footer>
  );
} 