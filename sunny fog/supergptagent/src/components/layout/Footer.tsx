"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
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
    <footer className="bg-[#0c0c14] py-12 border-t border-ai-blue-500/20 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 195, 245, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 195, 245, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-blue-500 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-px h-32 bg-gradient-to-t from-ai-blue-500 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-px h-48 bg-gradient-to-t from-ai-blue-500 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">
                SuperGPTAgent
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Create powerful custom AI agents with advanced capabilities for your specific business needs
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#use-cases" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-4 pt-2 border-t border-gray-800">
                <span className="text-xs text-gray-500 block mb-2">Quick view:</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="text-xs text-gray-500 hover:text-ai-blue-400 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="text-xs text-gray-500 hover:text-ai-blue-400 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                  <button 
                    onClick={() => openPopup('cookies')}
                    className="text-xs text-gray-500 hover:text-ai-blue-400 transition-colors cursor-pointer"
                  >
                    Cookies
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-ai-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="text-gray-400">
                Email: {COMPANY.email}
              </li>
              <li className="text-gray-400">
                Phone: <a href={`tel:${COMPANY.phone}`} className="hover:text-ai-blue-400 transition-colors">{COMPANY.phone}</a>
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-ai-green-500 mr-2 animate-pulse"></span>
                24/7 Support Available
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
              <p className="text-gray-600 text-xs mt-2 opacity-70">
                <span className="text-ai-blue-400">{COMPANY.serviceName} is a service of {COMPANY.name}</span><br />
                EIN: {COMPANY.ein}<br />
                {COMPANY.address}
              </p>
            </div>
            <div className="ml-4">
              <Image 
                src="/corp logo whitye.png" 
                alt="Corporate Logo"
                width={60}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
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

      {/* Cookies Policy Popup */}
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