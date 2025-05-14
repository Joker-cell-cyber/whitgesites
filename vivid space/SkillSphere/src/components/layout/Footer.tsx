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
    <footer className="relative bg-slate-900 py-16 border-t border-cyan-500/20 overflow-hidden">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Tech decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 border-[1px] border-cyan-500/20 transform rotate-45 opacity-30"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 border-[1px] border-indigo-600/20 transform rotate-45 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="col-span-1 md:col-span-4">
            <div className="p-6 bg-slate-900/80 border border-cyan-500/20 rounded-xl backdrop-blur-sm">
              <Link href="/" className="flex items-center mb-4">
                <span className="text-2xl font-bold text-white uppercase font-['Saira_Condensed'] tracking-wider">
                  DONT<span className="text-cyan-500">BE</span>NOOB
                </span>
              </Link>
              <p className="text-gray-300 font-['Chakra_Petch'] text-sm">
                ELITE GAMING COACHING SERVICES FOR COMPETITIVE PLAYERS. DOMINATE YOUR FAVORITE GAMES.
              </p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-6 bg-slate-900/80 border border-cyan-500/20 rounded-xl backdrop-blur-sm h-full">
                <h3 className="font-['Saira_Condensed'] uppercase text-cyan-500 tracking-wider mb-4 text-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Navigation
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-cyan-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-cyan-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-cyan-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-cyan-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-slate-900/80 border border-indigo-600/20 rounded-xl backdrop-blur-sm h-full">
                <h3 className="font-['Saira_Condensed'] uppercase text-indigo-400 tracking-wider mb-4 text-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/legal/privacy" className="text-gray-300 hover:text-indigo-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-indigo-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/terms" className="text-gray-300 hover:text-indigo-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-indigo-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/cookies" className="text-gray-300 hover:text-indigo-400 transition-colors font-['Chakra_Petch'] text-sm uppercase flex items-center group">
                      <span className="inline-block w-5 h-[1px] bg-indigo-500/50 mr-2 group-hover:w-6 transition-all"></span>
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-indigo-600/10">
                  <span className="text-xs text-gray-400 block mb-3 font-['Chakra_Petch'] uppercase">Quick view:</span>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => openPopup('privacy')}
                      className="px-3 py-1 text-xs text-indigo-400 border border-indigo-600/20 hover:bg-indigo-600/10 rounded-md transition-colors cursor-pointer font-['Chakra_Petch'] uppercase"
                    >
                      Privacy
                    </button>
                    <button 
                      onClick={() => openPopup('terms')}
                      className="px-3 py-1 text-xs text-indigo-400 border border-indigo-600/20 hover:bg-indigo-600/10 rounded-md transition-colors cursor-pointer font-['Chakra_Petch'] uppercase"
                    >
                      Terms
                    </button>
                    <button 
                      onClick={() => openPopup('cookies')}
                      className="px-3 py-1 text-xs text-indigo-400 border border-indigo-600/20 hover:bg-indigo-600/10 rounded-md transition-colors cursor-pointer font-['Chakra_Petch'] uppercase"
                    >
                      Cookies
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-900/80 border border-cyan-500/20 rounded-xl backdrop-blur-sm h-full">
                <h3 className="font-['Saira_Condensed'] uppercase text-cyan-500 tracking-wider mb-4 text-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Contact
                </h3>
                <ul className="space-y-4">
                  <li className="text-gray-300 font-['Chakra_Petch'] text-sm flex items-start">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mt-1 mr-3">
                      <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-cyan-500 uppercase block text-xs mb-1">Email</span>
                      <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                        {COMPANY.email}
                      </a>
                    </div>
                  </li>
                  <li className="text-gray-300 font-['Chakra_Petch'] text-sm flex items-start">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mt-1 mr-3">
                      <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-cyan-500 uppercase block text-xs mb-1">Phone</span>
                      <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                        {COMPANY.phone}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-cyan-500/10 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-slate-900 border border-cyan-500/20 rounded-full">
            <span className="text-cyan-500 font-['Space_Grotesk'] text-xs uppercase tracking-wider">Est. 2023</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 font-['Chakra_Petch'] text-xs uppercase tracking-wider">
              &copy; {new Date().getFullYear()} {COMPANY.website}
            </p>
            
            <p className="text-gray-500 font-['Chakra_Petch'] text-xs mt-3 sm:mt-0 tracking-wider">
              <span className="text-cyan-500/70">{COMPANY.website} IS A SERVICE OF {COMPANY.name}</span> · 
              <span className="text-gray-500 ml-2">EIN: {COMPANY.ein}</span> ·
              <span className="text-gray-500 ml-2">{COMPANY.address}</span>
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