"use client";

import { useState } from 'react';
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import { COMPANY } from "@/lib/company";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  
  // Used for opening popups from link clicks
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="bg-[#070a14] border-t border-gray-800 relative">
      {/* Glow effects */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-toxic-green-900/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-plasma-purple-900/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* CONTACT INFO SECTION - Added for better visibility */}
        <div className="py-6 mb-6 border-b border-gray-800 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Email with icon */}
            <a 
              href={`mailto:${COMPANY.email}`}
              className="flex items-center px-5 py-3 bg-[#0c1424] border border-toxic-green-500/30 rounded-lg hover:bg-[#0d1830] transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/20 flex items-center justify-center border border-toxic-green-500/30 mr-3">
                <svg className="w-5 h-5 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-toxic-green-500 font-mono uppercase">Email Us</p>
                <p className="text-lg font-medium text-white group-hover:text-toxic-green-400 transition-colors">{COMPANY.email}</p>
              </div>
            </a>
            
            {/* Phone with icon */}
            <a 
              href={`tel:${COMPANY.phone}`}
              className="flex items-center px-5 py-3 bg-[#0c1424] border border-plasma-purple-500/30 rounded-lg hover:bg-[#0d1830] transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-plasma-purple-900/30 to-plasma-purple-700/20 flex items-center justify-center border border-plasma-purple-500/30 mr-3">
                <svg className="w-5 h-5 text-plasma-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-plasma-purple-500 font-mono uppercase">Call Us</p>
                <p className="text-lg font-medium text-white group-hover:text-plasma-purple-400 transition-colors">{COMPANY.phone}</p>
              </div>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Virtual farming resources and in-game currencies for popular online games.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link href="/" className="text-gray-400 hover:text-toxic-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-toxic-green-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-toxic-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-toxic-green-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-plasma-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-plasma-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-400 hover:text-plasma-purple-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="text-gray-500 text-sm font-mono">
            <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
            <p className="text-gray-600 text-xs mt-2">
              {COMPANY.serviceName} is a service of {COMPANY.name}<br />
              EIN: {COMPANY.ein}<br />
              {COMPANY.address}
            </p>
          </div>
        </div>
      </div>
      
      {/* Terms and Conditions Popup */}
      <LegalPopup 
        isOpen={activePopup === 'terms'} 
        onClose={closePopup} 
        title="Terms of Service"
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