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
    <footer className="bg-[#0a0f0d] py-16 border-t border-rank-emerald-900/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-gradient-to-br from-rank-emerald-500 to-rank-orange-500 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white font-poppins">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="mt-5 text-gray-400 leading-relaxed">
              Professional rank boosting services for competitive gaming, helping players reach their desired skill level with expert support.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-5 border-b border-rank-emerald-900/30 pb-2">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-5 border-b border-rank-emerald-900/30 pb-2">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-400 hover:text-rank-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-4 pt-2 border-t border-rank-emerald-900/30">
                <span className="text-xs text-gray-500 block mb-3">Quick View</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="px-3 py-1 text-xs rounded-full bg-rank-emerald-900/40 text-rank-emerald-200 hover:bg-rank-emerald-900/60 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="px-3 py-1 text-xs rounded-full bg-rank-emerald-900/40 text-rank-emerald-200 hover:bg-rank-emerald-900/60 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="font-semibold text-white mb-5 border-b border-rank-emerald-900/30 pb-2">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-rank-emerald-900/30 flex items-center justify-center text-rank-emerald-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <a href={`mailto:${COMPANY.email}`} className="text-gray-300 hover:text-rank-emerald-400 transition-colors">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-rank-emerald-900/30 flex items-center justify-center text-rank-emerald-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <a href={`tel:${COMPANY.phone}`} className="text-gray-300 hover:text-rank-emerald-400 transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-rank-emerald-900/30 flex items-center justify-center text-rank-emerald-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Address</div>
                  <address className="text-gray-300 not-italic">
                    {COMPANY.address}
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="divider-apex my-10"></div>
        
        <div className="text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-3">
            {COMPANY.serviceName} is a service of {COMPANY.name} | EIN: {COMPANY.ein}
          </p>
        </div>
      </div>
      
      {/* Legal Popups */}
      <LegalPopup 
        isOpen={activePopup === 'terms'} 
        onClose={closePopup} 
        title="Terms & Conditions"
      >
        <LegalContent type="terms" />
      </LegalPopup>
      
      <LegalPopup 
        isOpen={activePopup === 'privacy'} 
        onClose={closePopup} 
        title="Privacy Policy"
      >
        <LegalContent type="privacy" />
      </LegalPopup>
      
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