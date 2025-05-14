"use client";

import { useState } from 'react';
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../ui/LegalContent";
import { COMPANY } from "@/app/constants/company";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | null>(null);
  
  const openPopup = (type: 'terms' | 'privacy') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="bg-corp-slate-50 py-12 border-t border-corp-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="mt-4 text-corp-slate-600">
              Professional script writing services for content creators across all platforms.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-corp-slate-800 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-corp-slate-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-corp-slate-600 hover:text-corp-blue-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-4 pt-2 border-t border-corp-slate-200">
                <span className="text-xs text-corp-slate-500 block mb-2">Quick view:</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="text-xs text-corp-slate-500 hover:text-corp-blue-600 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="text-xs text-corp-slate-500 hover:text-corp-blue-600 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-corp-slate-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-corp-slate-600">
                Email: <a href={`mailto:${COMPANY.email}`} className="hover:text-corp-blue-600 transition-colors">{COMPANY.email}</a>
              </li>
              <li className="text-corp-slate-600">
                Phone: <a href={`tel:${COMPANY.phone}`} className="hover:text-corp-blue-600 transition-colors">{COMPANY.phone}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-corp-slate-200 mt-8 pt-8 text-center text-corp-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-corp-slate-400 text-xs mt-2">
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
    </footer>
  );
} 