"use client";

import { useState } from 'react';
import Link from "next/link";
import { COMPANY } from "../../app/constants/company";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import PokerChip from "../ui/PokerChip";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="relative overflow-hidden border-t border-felt-800">
      {/* Felt background */}
      <div className="absolute inset-0 felt-texture opacity-90 z-0"></div>
      
      {/* Card patterns background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">♠</div>
        <div className="absolute bottom-10 right-10 text-6xl">♥</div>
        <div className="absolute top-40 right-40 text-6xl">♦</div>
        <div className="absolute bottom-40 left-40 text-6xl">♣</div>
      </div>
      
      {/* Subtle diagonal line pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/signature-bg.png')] bg-repeat opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 mr-2">
                <PokerChip color="gold" size="sm" />
              </div>
              <span className="text-xl font-bold text-white font-playfair">
                Poker<span className="text-chip-gold-500">Sharper</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-300 font-raleway">
              Premium poker coaching to help you consistently crush your games, whether cash games, tournaments, or Spin & Go formats.
            </p>
            
            {/* Newsletter signup styled as "all-in" button */}
            <div className="mt-6 bg-black/30 rounded-lg p-4 border border-felt-800">
              <p className="text-gray-300 text-sm mb-3 font-raleway">Sign up for our strategies newsletter:</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-3 py-2 bg-black/50 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-chip-gold-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-poker-red-700 to-poker-red-800 text-white rounded-r-md font-special-elite uppercase tracking-wider hover:from-poker-red-600 hover:to-poker-red-700 transition-colors">
                  ALL IN
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-4 font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♠</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♥</span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#coaches" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♦</span>
                  Coaches
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♣</span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♠</span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♥</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♦</span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-semibold text-white mb-4 font-playfair">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♦</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♣</span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-300 hover:text-chip-gold-500 transition-colors font-raleway flex items-center">
                  <span className="text-xs mr-2">♠</span>
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-4 pt-2 border-t border-gray-700">
                <span className="text-xs text-gray-400 block mb-2 font-raleway">Quick view:</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="text-xs text-gray-400 hover:text-chip-gold-500 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="text-xs text-gray-400 hover:text-chip-gold-500 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                  <button 
                    onClick={() => openPopup('cookies')}
                    className="text-xs text-gray-400 hover:text-chip-gold-500 transition-colors cursor-pointer"
                  >
                    Cookies
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-semibold text-white mb-4 font-playfair">Connect With Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 font-raleway flex items-start">
                <svg className="w-5 h-5 mr-2 text-chip-gold-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-chip-gold-500 transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-gray-300 font-raleway flex items-start">
                <svg className="w-5 h-5 mr-2 text-chip-gold-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-chip-gold-500 transition-colors">
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