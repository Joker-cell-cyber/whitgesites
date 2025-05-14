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
    <footer className="relative bg-[#0A0A0A] py-12 border-t border-[#44D62C]/20 overflow-hidden">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Hexagon decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 border-[1px] border-[#44D62C]/20 transform rotate-45 opacity-30"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 border-[1px] border-[#00FFFF]/20 transform rotate-45 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white uppercase font-['Saira_Condensed'] tracking-wider">
                DONT<span className="text-[#44D62C]">BE</span>NOOB
              </span>
            </Link>
            <p className="mt-4 text-gray-400 font-['Chakra_Petch'] text-sm">
              ELITE GAMING COACHING SERVICES FOR COMPETITIVE PLAYERS. DOMINATE YOUR FAVORITE GAMES.
            </p>
          </div>
          
          <div>
            <h3 className="font-['Saira_Condensed'] uppercase text-[#44D62C] tracking-wider mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#44D62C] mr-2 align-middle"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#44D62C] mr-2 align-middle"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#44D62C] mr-2 align-middle"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#44D62C] mr-2 align-middle"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Saira_Condensed'] uppercase text-[#00FFFF] tracking-wider mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#00FFFF] mr-2 align-middle"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#00FFFF] mr-2 align-middle"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors font-['Chakra_Petch'] text-sm uppercase block">
                  <span className="inline-block w-3 h-[1px] bg-[#00FFFF] mr-2 align-middle"></span>
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-4 pt-2 border-t border-[#00FFFF]/10">
                <span className="text-xs text-gray-500 block mb-2 font-['Chakra_Petch'] uppercase">Quick view:</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="text-xs text-gray-500 hover:text-[#00FFFF] transition-colors cursor-pointer font-['Chakra_Petch'] uppercase"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="text-xs text-gray-500 hover:text-[#00FFFF] transition-colors cursor-pointer font-['Chakra_Petch'] uppercase"
                  >
                    Terms
                  </button>
                  <button 
                    onClick={() => openPopup('cookies')}
                    className="text-xs text-gray-500 hover:text-[#00FFFF] transition-colors cursor-pointer font-['Chakra_Petch'] uppercase"
                  >
                    Cookies
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Saira_Condensed'] uppercase text-[#9147FF] tracking-wider mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 font-['Chakra_Petch'] text-sm flex items-start">
                <span className="inline-block w-3 h-[1px] bg-[#9147FF] mt-3 mr-2"></span>
                <div>
                  <span className="text-[#9147FF] uppercase block text-xs">Email</span>
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="text-gray-400 font-['Chakra_Petch'] text-sm flex items-start">
                <span className="inline-block w-3 h-[1px] bg-[#9147FF] mt-3 mr-2"></span>
                <div>
                  <span className="text-[#9147FF] uppercase block text-xs">Phone</span>
                  <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#44D62C]/10 mt-8 pt-8 text-center">
          <div className="relative">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#44D62C]/30 to-transparent absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4"></div>
            <p className="text-gray-500 font-['Chakra_Petch'] text-xs uppercase tracking-wider">
              &copy; {new Date().getFullYear()} {COMPANY.website} {/* ALL RIGHTS RESERVED */}
            </p>
            <p className="text-gray-600 font-['Chakra_Petch'] text-xs mt-3 tracking-wider">
              <span className="text-[#00FFFF]/70">{COMPANY.website} IS A SERVICE OF {COMPANY.name}</span><br />
              <span className="text-gray-500">EIN: {COMPANY.ein}</span><br />
              <span className="text-gray-500">{COMPANY.address}</span>
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