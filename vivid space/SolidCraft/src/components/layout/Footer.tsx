"use client";

import { useState } from 'react';
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import { COMPANY } from '@/app/constants/company';
import { useNewsletter } from '@/app/context/NewsletterContext';

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  const { openNewsletter } = useNewsletter();
  
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="relative bg-[#fffdf7] py-16 border-t border-[#e05e41]/10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#e05e41]/5 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#c35a38]/0 via-[#c35a38]/20 to-[#c35a38]/0"></div>
      <div className="absolute top-12 left-12 w-24 h-24 bg-[#0d7682]/5 shape-blob"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-3">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative">
                <span className="text-2xl font-bold font-fraunces text-[#0d7682]">
                  Solid<span className="text-[#c35a38]">Craft</span>
                </span>
              </div>
            </Link>
            <p className="text-[#3b332b]/80 mb-6 text-sm leading-relaxed">
              We design high-converting landing pages tailored to your business needs.
              Expert design, quick turnaround, no monthly subscriptions.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2 md:ml-6">
            <h3 className="font-fraunces text-lg text-[#3b332b] mb-5">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-fraunces text-lg text-[#3b332b] mb-5">Legal Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/privacy" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-[#3b332b]/80 hover:text-[#c35a38] transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li className="mt-5 pt-3 border-t border-[#c35a38]/10">
                <span className="text-xs text-[#3b332b]/60 block mb-2">Quick view:</span>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => openPopup('privacy')}
                    className="text-xs text-[#3b332b]/60 hover:text-[#c35a38] transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => openPopup('terms')}
                    className="text-xs text-[#3b332b]/60 hover:text-[#c35a38] transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                  <button 
                    onClick={() => openPopup('cookies')}
                    className="text-xs text-[#3b332b]/60 hover:text-[#c35a38] transition-colors cursor-pointer"
                  >
                    Cookies
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-4">
            <div className="p-6 clay-effect">
              <h3 className="font-fraunces text-lg text-[#3b332b] mb-4">Get in Touch</h3>
              <ul className="space-y-3 mb-6">
                <li className="text-[#3b332b]/80 text-sm flex items-start">
                  <svg className="w-5 h-5 text-[#c35a38] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span><a href={`mailto:${COMPANY.email}`} className="hover:text-[#c35a38] transition-colors">{COMPANY.email}</a></span>
                </li>
                <li className="text-[#3b332b]/80 text-sm flex items-start">
                  <svg className="w-5 h-5 text-[#c35a38] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span><a href={`tel:${COMPANY.phone}`} className="hover:text-[#c35a38] transition-colors">{COMPANY.phone}</a></span>
                </li>
                <li className="text-[#3b332b]/80 text-sm flex items-start">
                  <svg className="w-5 h-5 text-[#c35a38] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>{COMPANY.address}</span>
                </li>
              </ul>
              <button
                onClick={openNewsletter}
                className="w-full px-5 py-3 bg-[#c35a38] hover:bg-[#a2482d] text-white rounded-full transition-all duration-300 text-sm font-medium button-glow"
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#c35a38]/10 mt-12 pt-8 text-center">
          <p className="text-[#3b332b]/70">© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-[#3b332b]/60 text-xs mt-2">
            SolidCraft is a service of {COMPANY.name}<br />
            EIN: {COMPANY.ein}
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