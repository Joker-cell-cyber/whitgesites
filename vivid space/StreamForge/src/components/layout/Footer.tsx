"use client";

import { useState } from 'react';
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import { COMPANY } from '@/app/constants/company';

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="w-full bg-[--cyber-deep] border-t border-[--neon-red]/20 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-xl flex items-center gap-2 hover:text-[--neon-red] transition-colors">
            <span className="text-[--neon-lightred]">Stream</span>
            <span className="text-[--neon-contrast]">Forge</span>
          </Link>
          
          {/* Description */}
          <p className="mt-2 text-gray-400 text-sm text-center max-w-md">
            Professional streaming setup and management tools for content creators
          </p>
          
          {/* Contact Information */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#0b0b1e]/40 p-4 rounded-lg border border-[--neon-purple]/10">
            <a 
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2 text-gray-200 hover:text-[--neon-blue] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[--neon-purple]/10 flex items-center justify-center group-hover:bg-[--neon-purple]/20 transition-all">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[--neon-blue]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <span className="text-base">{COMPANY.email}</span>
            </a>
            
            <a 
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 text-gray-200 hover:text-[--neon-blue] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[--neon-purple]/10 flex items-center justify-center group-hover:bg-[--neon-purple]/20 transition-all">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[--neon-blue]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
              </div>
              <span className="text-base">{COMPANY.phone}</span>
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => openPopup('privacy')}
              className="text-gray-400 hover:text-[--neon-red] transition-colors text-sm"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => openPopup('terms')}
              className="text-gray-400 hover:text-[--neon-red] transition-colors text-sm"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => openPopup('cookies')}
              className="text-gray-400 hover:text-[--neon-red] transition-colors text-sm"
            >
              Cookie Policy
            </button>
            <Link 
              href="/contact"
              className="text-gray-400 hover:text-[--neon-red] transition-colors text-sm"
            >
              Contact Us
            </Link>
            <Link 
              href="/about"
              className="text-gray-400 hover:text-[--neon-red] transition-colors text-sm"
            >
              About Us
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
            <p className="mt-2 text-xs text-[--neon-red]/60">
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