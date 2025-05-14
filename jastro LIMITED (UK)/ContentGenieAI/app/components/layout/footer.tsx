'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { MapPin, Phone, Mail, Droplet, Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import Modal from '@/app/components/ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';

// Définition du composant WaveIcon
const WaveIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </svg>
);

const Footer: FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: typeof termsContent) => (
    <div className="space-y-8">
      {content.content.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="text-gray-300 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Conditions d\'utilisation', href: '/legal-pages/terms' },
    { name: 'Politique de confidentialité', href: '/legal-pages/privacy' },
    { name: 'Politique de remboursement', href: '/legal-pages/refund' },
    { name: 'Mentions légales', href: '/legal-pages/legal-notice' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0D2F3F] to-[#1A3A4A] py-20 text-white overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-5 left-0 w-full h-96 bg-[url('/images/wave-pattern.svg')] bg-repeat opacity-5 transform rotate-180"></div>
      </div>
      <div className="absolute bottom-0 right-0 opacity-10">
        <WaveIcon className="h-64 w-64 text-[#26A69A]" />
      </div>
      <div className="absolute top-40 left-20 opacity-10">
        <Droplet className="h-48 w-48 text-[#26A69A] transform rotate-45" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo et description */}
          <div className="md:col-span-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] flex items-center justify-center mr-3">
                <WaveIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ContentGenieAI</span>
            </div>
            <p className="text-[#B6E0E9] mb-8 leading-relaxed">
              Propulsez votre stratégie SEO avec notre plateforme d'IA qui génère des contenus optimisés, articles de blog et descriptions de produits parfaitement structurés pour les moteurs de recherche.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-5 text-base flex items-center">
              <Droplet className="h-4 w-4 mr-2 text-[#26A69A]" />
              Juridique
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setActiveModal('terms')} 
                  className="text-[#B6E0E9] hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-[#26A69A]">Conditions d'utilisation</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="text-[#B6E0E9] hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-[#26A69A]">Politique de confidentialité</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('refund')} 
                  className="text-[#B6E0E9] hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-[#26A69A]">Politique de remboursement</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('legal')} 
                  className="text-[#B6E0E9] hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="border-b border-transparent hover:border-[#26A69A]">Mentions légales</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-5 text-base flex items-center">
              <Droplet className="h-4 w-4 mr-2 text-[#26A69A]" />
              Contact
            </h3>
            <ul className="space-y-4 text-[#B6E0E9]">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#26A69A] shrink-0 mt-0.5" />
                <span>
                  Suite 10 12 Durie Street<br />
                  Leven, Fife<br />
                  United Kingdom, KY8 4HE
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#26A69A] shrink-0" />
                <span>(850) 783-4170</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#26A69A] shrink-0" />
                <span>support@contentgenie-ai.com</span>
              </li>
              <li className="text-[#B6E0E9]">
                <span>Company No. 836841</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright et liens légaux */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#B6E0E9] text-sm mb-4 md:mb-0">
            &copy; {currentYear} Jastro Limited. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <span className="text-[#B6E0E9] text-sm">
              Suite 10 12 Durie Street, Leven, Fife, United Kingdom, KY8 4HE
            </span>
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
        {renderModalContent({...privacyContent, updated: privacyContent.lastUpdated})}
      </Modal>
      
      <Modal
        isOpen={activeModal === 'refund'}
        onClose={() => setActiveModal(null)}
        title={refundContent.title}
      >
        {renderModalContent({...refundContent, updated: refundContent.lastUpdated})}
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
};

export default Footer; 