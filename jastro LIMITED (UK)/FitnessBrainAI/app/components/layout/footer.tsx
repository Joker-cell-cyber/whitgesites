'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Link from 'next/link';
import { SITE_NAME } from "@/app/lib/constants";
import { FC } from 'react';
import { DumbbellIcon, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import ObfuscatedText from '../legal/ObfuscatedText';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

// Fonction pour empêcher la copie de texte
const preventCopy = (e: React.ClipboardEvent) => {
  e.preventDefault();
  return false;
};

// Fonction pour empêcher le clic droit
const preventRightClick = (e: React.MouseEvent) => {
  e.preventDefault();
  return false;
};

// Fonction pour empêcher la sélection de texte
const preventSelection = (e: React.MouseEvent) => {
  e.preventDefault();
  return false;
};

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
      { name: "Email: support@fitnessbrainai.com", href: "mailto:support@fitnessbrainai.com" },
      { name: "(850) 783-4170", href: "tel:+18507834170" },
    ]
  },
  {
    title: "Entreprise",
    links: [
      { name: "Jastro Limited", href: "#" },
      { name: "Company Number: 836841", href: "#" },
      { name: "Suite 10 12 Durie Street", href: "#" },
      { name: "Leven, Fife, United Kingdom, KY8 4HE", href: "#" },
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

const Footer: FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: typeof termsContent) => (
    <div className="space-y-8">
      {content.content.map((section, index) => (
        <div key={index} className="space-y-3 pb-4 border-b border-[#E2D9F3] last:border-0">
          <h3 className="text-lg font-semibold text-[#2A303D] bg-[#F5F2FC]/30 p-2 rounded-md">
            {section.title}
          </h3>
          <p className="text-[#414B5A] leading-relaxed text-base">
            {section.text}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <footer 
      className="footer p-10 bg-base-200 text-base-content" 
      onCopy={preventCopy}
      onContextMenu={preventRightClick}
      onMouseDown={preventSelection}
      style={{ userSelect: 'none' }}
    >
      <div className="container mx-auto px-6">
        {/* Logo et information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[#F5F2FC] flex items-center justify-center mr-3">
                <DumbbellIcon className="h-5 w-5 text-[#A590DC]" />
              </div>
              <span className="text-xl font-medium text-[#2A303D]">FitnessBrainAI</span>
            </div>
            <p className="text-[#6C7080] mb-8 leading-relaxed">
              Plateforme de coaching fitness propulsée par l'intelligence artificielle pour des programmes personnalisés.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[#2A303D] font-medium mb-5 text-base">Juridique</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setActiveModal('terms')} 
                  className="text-[#6C7080] hover:text-[#A590DC] transition-colors duration-300"
                >
                  Conditions d'utilisation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="text-[#6C7080] hover:text-[#A590DC] transition-colors duration-300"
                >
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('refund')} 
                  className="text-[#6C7080] hover:text-[#A590DC] transition-colors duration-300"
                >
                  Politique de remboursement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('legal')} 
                  className="text-[#6C7080] hover:text-[#A590DC] transition-colors duration-300"
                >
                  Mentions légales
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter et Contact */}
          <div className="md:col-span-3">
            <h3 className="text-[#2A303D] font-medium mb-5 text-base">Contact</h3>
            <ul className="space-y-3 text-[#6C7080]">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#A590DC] shrink-0 mt-0.5" />
                <span>
                  <ObfuscatedText text="Suite 10 12 Durie Street" className="text-[#6C7080]" /><br />
                  <ObfuscatedText text="Leven, Fife" className="text-[#6C7080]" /><br />
                  <ObfuscatedText text="United Kingdom, KY8 4HE" className="text-[#6C7080]" />
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#A590DC] shrink-0" />
                <ObfuscatedText text="(850) 783-4170" className="text-[#6C7080]" />
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#A590DC] shrink-0" />
                <ObfuscatedText text="support@fitnessbrainai.com" className="text-[#6C7080]" />
              </li>
              <li className="text-[#6C7080]">
                <ObfuscatedText text="Company No. 836841" className="text-[#6C7080]" />
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-[#E5E7EB] my-10"></div>

        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#6C7080] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <ObfuscatedText text="Jastro Limited" className="text-[#6C7080] text-sm" />. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <span className="text-[#6C7080] text-sm">
              <ObfuscatedText text="Suite 10 12 Durie Street, Leven, Fife, United Kingdom, KY8 4HE" className="text-[#6C7080] text-sm" />
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
};

export default Footer; 