"use client";

import { useState } from 'react';
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import { COMPANY } from "../../app/constants/company";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="bg-book-blue-50 py-12 border-t border-book-blue-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="mt-4 text-book-blue-700">
              Professional e-book writing services for businesses, educators, and creative authors
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-book-blue-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-book-blue-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-book-blue-700 hover:text-book-blue-900 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-4 pt-2 border-t border-book-blue-100">
                <span className="text-xs text-book-blue-600 block mb-2">Quick view:</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="text-xs text-book-blue-600 hover:text-book-blue-900 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="text-xs text-book-blue-600 hover:text-book-blue-900 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                  <button 
                    onClick={() => openPopup('cookies')}
                    className="text-xs text-book-blue-600 hover:text-book-blue-900 transition-colors cursor-pointer"
                  >
                    Cookies
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-book-blue-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-book-blue-700">
                Email: <a href={`mailto:${COMPANY.email}`} className="hover:text-book-blue-900 transition-colors">{COMPANY.email}</a>
              </li>
              <li className="text-book-blue-700">
                Phone: <a href={`tel:${COMPANY.phone}`} className="hover:text-book-blue-900 transition-colors">{COMPANY.phone}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-book-blue-100 mt-8 pt-8 text-center text-book-blue-600">
          <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-book-blue-500 text-xs mt-2">
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