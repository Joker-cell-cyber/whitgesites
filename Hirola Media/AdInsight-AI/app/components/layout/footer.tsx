'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Link from 'next/link';
import { Mail, MapPin, Phone, Zap } from "lucide-react";

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  // Informations de contact protégées
  const protectedCompanyName = obfuscateText("Hirola Media Ltd");
  const protectedAddress = obfuscateText("137 Fletcher Way, Hemel Hempstead, England, HP2 5RZ");
  const protectedEmail = obfuscateText("support@adinisghtai.com");
  const protectedPhone = obfuscateText("(971) 315-8948");
  const protectedRegistration = obfuscateText("Company Number: 16312592");
  const protectedVAT = obfuscateText("VAT: GB123456789");
  const protectedRegDate = obfuscateText("Registration Date: 25/09/2024");
  const protectedHours = obfuscateText("Lun-Ven: 9h-18h");

  const contactInfo = {
    address: "137 Fletcher Way, Hemel Hempstead, England, HP2 5RZ",
    phone: "(971) 315-8948",
    email: "support@adinisghtai.com"
  };

  return (
    <footer className="bg-adfi-slate-900 text-white pt-20 pb-10">
      {/* Séparateur ondulé */}
      <div className="relative">
        <div className="absolute -top-20 left-0 right-0 h-20 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-20 text-adfi-slate-900" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              className="fill-adfi-slate-900"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Logo et info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-adfi-blue-600 to-adfi-blue-500 flex items-center justify-center shadow-lg shadow-adfi-blue-500/20">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                AdInsight<span className="text-adfi-blue-500">AI</span>
              </span>
            </div>
            
            <p className="text-adfi-slate-400 text-sm leading-relaxed">
              Plateforme d'analyse publicitaire alimentée par l'IA, 
              offrant des insights précis pour vos campagnes marketing.
            </p>
          </div>
          
          {/* Pages légales */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Pages légales
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-adfi-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Mentions légales", modal: 'legal' },
                { label: "Politique de confidentialité", modal: 'privacy' },
                { label: "Conditions d'utilisation", modal: 'terms' },
                { label: "Politique de remboursement", modal: 'refund' }
              ].map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => setActiveModal(link.modal)}
                    className="text-adfi-slate-400 hover:text-white transition-colors duration-200 flex items-center cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-adfi-blue-500 mr-2"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-adfi-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-adfi-blue-500 mt-0.5" />
                <span className="text-adfi-slate-400">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-adfi-blue-500" />
                <span className="text-adfi-slate-400">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-adfi-blue-500" />
                <span className="text-adfi-slate-400">{contactInfo.email}</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-adfi-slate-400">
                  {protectedCompanyName}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-adfi-slate-400">
                  {protectedRegistration}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="h-px bg-adfi-slate-800 my-10"></div>
        
        {/* Bas de page */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-adfi-slate-500 text-sm mb-4 md:mb-0">
            © {currentYear} {protectedCompanyName}. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="text-adfi-slate-500 hover:text-adfi-slate-400 transition-colors duration-200 cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <button 
              onClick={() => setActiveModal('terms')}
              className="text-adfi-slate-500 hover:text-adfi-slate-400 transition-colors duration-200 cursor-pointer"
            >
              Conditions d'utilisation
            </button>
            <button 
              onClick={() => setActiveModal('legal')}
              className="text-adfi-slate-500 hover:text-adfi-slate-400 transition-colors duration-200 cursor-pointer"
            >
              Mentions légales
            </button>
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