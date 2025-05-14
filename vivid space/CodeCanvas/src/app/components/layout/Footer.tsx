import React, { useState } from "react";
import { Container } from "../ui/Container";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../legal/LegalContent";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "../../constants/company";
import { useNewsletter } from "../../context/NewsletterContext";

const currentYear = new Date().getFullYear();

export function Footer() {
  const [activePopup, setActivePopup] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const { openNewsletter } = useNewsletter();
  
  const openPopup = (type: 'privacy' | 'terms' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
              {COMPANY.name}
            </div>
            <div className="text-sm text-zinc-500">
              <p>{COMPANY.address}</p>
              <p className="mt-2">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-cyan-400 transition-colors">
                  {COMPANY.email}
                </a>
              </p>
              <p className="mt-2">
                <a href={`tel:${COMPANY.phone}`} className="hover:text-cyan-400 transition-colors">
                  {COMPANY.phone}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about"
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('privacy')}
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('terms')}
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Terms and Conditions of Sale
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('cookies')}
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-zinc-500 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <button
              onClick={openNewsletter}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-500 mb-4 md:mb-0">
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </Container>

      {/* Legal Popups */}
      <LegalPopup 
        isOpen={activePopup === 'privacy'} 
        onClose={closePopup} 
        title="Privacy Policy"
      >
        <LegalContent type="privacy" title="Privacy Policy" />
      </LegalPopup>
      
      <LegalPopup 
        isOpen={activePopup === 'terms'} 
        onClose={closePopup} 
        title="Terms and Conditions of Sale"
      >
        <LegalContent type="terms" title="Terms and Conditions of Sale" />
      </LegalPopup>

      <LegalPopup 
        isOpen={activePopup === 'cookies'} 
        onClose={closePopup} 
        title="Cookie Policy"
      >
        <LegalContent type="cookies" title="Cookie Policy" />
      </LegalPopup>
    </footer>
  );
} 