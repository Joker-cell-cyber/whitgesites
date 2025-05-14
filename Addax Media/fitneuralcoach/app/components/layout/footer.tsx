'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Link from 'next/link';
import { SITE_NAME } from "@/app/lib/constants";

// Définition des types pour les liens du footer
interface FooterLink {
  name: string;
  href: string;
  modal?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    title: "Contact",
    links: [
      { name: "Email: support@fitneuralcoach.com", href: "mailto:support@fitneuralcoach.com" },
      { name: "(803) 886-0993", href: "tel:+18038860993" },
    ]
  },
  {
    title: "Entreprise",
    links: [
      { name: "Addax Media Ltd", href: "#" },
      { name: "Company Number: 16314045", href: "#" },
      { name: "Flat 5, 9 Langley Road", href: "#" },
      { name: "Watford, England, WD17 4PS", href: "#" },
    ]
  },
  {
    title: "Juridique",
    links: [
      { name: "Politique de confidentialité", href: "#", modal: "privacy" },
      { name: "Conditions d'utilisation", href: "#", modal: "terms" },
      { name: "Mentions légales", href: "#", modal: "legal" },
      { name: "Politique de remboursement", href: "#", modal: "refund" },
    ]
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: typeof termsContent) => (
    <div className="space-y-8">
      {content.content.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">{section.title}</h3>
          <p className="text-gray-700 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo et infos */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-bold text-white">{SITE_NAME}</h2>
              <p className="text-gray-400 text-sm">
                Plateforme de coaching fitness propulsée par l'intelligence artificielle pour des programmes personnalisés.
              </p>
            </div>
          </div>
          
          {/* Liens */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.modal ? (
                      <button 
                        onClick={() => setActiveModal(link.modal as string)}
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Séparateur */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} {SITE_NAME}. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
              <button onClick={() => setActiveModal('privacy')} className="text-gray-400 hover:text-red-400 text-sm">
              Confidentialité
            </button>
              <button onClick={() => setActiveModal('terms')} className="text-gray-400 hover:text-red-400 text-sm">
              Conditions
            </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={termsContent.title}
      >
        {renderModalContent(termsContent)}
      </Modal>
      
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={privacyContent.title}
      >
        {renderModalContent(privacyContent)}
      </Modal>
      
      <Modal
        isOpen={activeModal === 'refund'}
        onClose={() => setActiveModal(null)}
        title={refundContent.title}
      >
        {renderModalContent(refundContent)}
      </Modal>
      
      <Modal
        isOpen={activeModal === 'legal'}
        onClose={() => setActiveModal(null)}
        title={legalContent.title}
      >
        {renderModalContent(legalContent)}
      </Modal>
    </footer>
  );
} 