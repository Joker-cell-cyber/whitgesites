'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Brain, Shield, Mail, Phone, MapPin } from 'lucide-react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import { SITE_NAME } from "@/app/lib/constants";

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

// Définition des types pour les liens du footer
interface FooterLink {
  name: string;
  href: string;
  modal?: string;
  external?: boolean;
  isNew?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const renderModalContent = (content: any) => (
    <div className="space-y-8">
      {content.content.map((section: any, index: number) => (
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
  const protectedEmail = obfuscateText("support@fitsageai.com");
  const protectedPhone = obfuscateText("(971) 315-8948");
  const protectedRegistration = obfuscateText("Company Number: 16312592");

  return (
    <footer 
      ref={ref}
      className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-b from-fs-slate-900 via-fs-slate-950 to-fs-slate-950"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      
      {/* Cercles lumineux */}
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-fs-blue-500/5 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/5 w-64 h-64 rounded-full bg-fs-teal-500/5 blur-3xl"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.1s'
          }}
        >
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fs-teal-500 to-fs-blue-600 flex items-center justify-center shadow-lg shadow-fs-teal-500/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <Brain className="h-6 w-6 text-white relative z-10" />
                </div>
                <div className="ml-3">
                  <Link href="/" className="inline-block">
                    <h2 className="text-2xl font-bold text-white">{SITE_NAME}</h2>
                    <p className="text-xs text-fs-teal-400 -mt-1">IA Fitness Coach</p>
                  </Link>
                </div>
              </div>
              
              <p className="text-fs-slate-700">
                Découvrez notre technologie d'IA avancée pour le fitness et la nutrition. Des algorithmes sophistiqués créent des programmes d'entraînement et des plans nutritionnels optimisés.
              </p>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-5">
            <h3 className="text-sm font-medium text-fs-teal-400 uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-fs-teal-500 mr-2"></span>
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-fs-teal-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-fs-slate-700">{protectedCompanyName}</p>
                  <p className="text-sm text-fs-slate-700">{protectedRegistration}</p>
                  <p className="text-sm text-fs-slate-700">{protectedAddress}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-fs-teal-500 flex-shrink-0" />
                <p className="text-sm text-fs-slate-700">{protectedEmail}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-fs-teal-500 flex-shrink-0" />
                <p className="text-sm text-fs-slate-700">{protectedPhone}</p>
              </div>
            </div>
          </div>
          
          {/* Liens juridiques */}
          {footerLinks.map((section, sectionIndex) => (
            <div 
              key={section.title} 
              className="space-y-5"
              style={{ 
                transitionDelay: `${0.1 * (sectionIndex + 3)}s`
              }}
            >
              <h3 className="text-sm font-medium text-fs-teal-400 uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-fs-teal-500 mr-2"></span>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => setActiveModal(link.modal || null)}
                      className="text-fs-slate-700 hover:text-fs-teal-500 transition-colors text-sm flex items-center group"
                    >
                      {link.name}
                      {link.isNew && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-fs-teal-500/20 text-fs-teal-400">Nouveau</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Barre de séparation */}
        <div className="h-px bg-gradient-to-r from-transparent via-fs-slate-800 to-transparent mb-8"></div>
        
        {/* Copyright et mentions légales */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.2s'
          }}
        >
          <div className="flex items-center space-x-4">
            <Shield className="h-4 w-4 text-fs-teal-500" />
            <p className="text-sm text-fs-slate-700">
              © {currentYear} <span className="font-medium text-white">{SITE_NAME}</span>. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveModal("privacy")}
              className="text-sm text-fs-slate-700 hover:text-fs-teal-500 transition-colors"
            >
              Confidentialité
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="text-sm text-fs-slate-700 hover:text-fs-teal-500 transition-colors"
            >
              Conditions
            </button>
            <button
              onClick={() => setActiveModal("refund")}
              className="text-sm text-fs-slate-700 hover:text-fs-teal-500 transition-colors"
            >
              Remboursement
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Politique de confidentialité"
      >
        {renderModalContent(privacyContent)}
      </Modal>
      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Conditions d'utilisation"
      >
        {renderModalContent(termsContent)}
      </Modal>
      <Modal
        isOpen={activeModal === "refund"}
        onClose={() => setActiveModal(null)}
        title="Politique de remboursement"
      >
        {renderModalContent(refundContent)}
      </Modal>
      <Modal
        isOpen={activeModal === "legal"}
        onClose={() => setActiveModal(null)}
        title="Mentions légales"
      >
        {renderModalContent(legalContent)}
      </Modal>
    </footer>
  );
} 