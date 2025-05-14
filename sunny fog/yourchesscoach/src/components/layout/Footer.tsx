"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import { KingIcon } from '@/components/ui/ChessIcons';

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="bg-[#081020] py-12 border-t border-gray-800/30">
      <div className="divider-chess -mt-20 mb-8"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <KingIcon size={24} className="mr-2 text-chess-gold-500" />
              <span className="text-xl font-bold gradient-text">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Unleash the strategic mind of a grandmaster through tactical training designed to elevate your ELO rating
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-chess-gold-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Contact Command
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Email: {COMPANY.email}
              </li>
              <li className="text-gray-400">
                Phone: {COMPANY.phone}
              </li>
            </ul>
            <div className="mt-4 pt-2 border-t border-gray-800">
              <span className="text-xs text-gray-500 block mb-2">Legal:</span>
              <div className="flex space-x-4">
                <Link 
                  href="/about" 
                  className="text-xs text-gray-500 hover:text-chess-gold-400 transition-colors cursor-pointer"
                >
                  About Us
                </Link>
                <button 
                  onClick={() => openPopup('privacy')}
                  className="text-xs text-gray-500 hover:text-chess-gold-400 transition-colors cursor-pointer"
                >
                  Privacy
                </button>
                <button 
                  onClick={() => openPopup('terms')}
                  className="text-xs text-gray-500 hover:text-chess-gold-400 transition-colors cursor-pointer"
                >
                  Terms
                </button>
                <button 
                  onClick={() => openPopup('cookies')}
                  className="text-xs text-gray-500 hover:text-chess-gold-400 transition-colors cursor-pointer"
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-2">
            {COMPANY.serviceName} is a service of {COMPANY.name}<br />
            EIN: {COMPANY.ein}<br />
            {COMPANY.address}
          </p>
        </div>
      </div>
      
      {/* Legal Popups */}
      {activePopup && (
        <LegalPopup onClose={closePopup}>
          <LegalContent type={activePopup} />
        </LegalPopup>
      )}
    </footer>
  );
} 