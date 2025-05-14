'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Link from 'next/link';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: {
    title: string;
    lastUpdated: string;
    content: Array<{
      title: string;
      text: string;
      subsections?: never[];
    }>;
  }) => (
    <div className="space-y-8">
      {content.content.map((section, index) => (
        <div key={index} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-orange-400 pl-3">{section.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{section.text}</p>
          {section.subsections && section.subsections.length > 0 && (
            <div className="mt-4 pl-4 space-y-4">
              {section.subsections.map((subsection: {title: string, text: string}, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-base font-medium text-gray-700">{subsection.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{subsection.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="pt-4 mt-6 border-t border-orange-100">
        <p className="text-sm text-gray-500 italic">Dernière mise à jour: {content.lastUpdated}</p>
      </div>
    </div>
  );

  // Informations de contact protégées
  const protectedCompanyName = obfuscateText("Addax Media Ltd");
  const protectedAddress = obfuscateText("Flat 5, 9 Langley Road, Watford, England, WD17 4PS");
  const protectedEmail = obfuscateText("support@adpulse-ai.com");
  const protectedPhone = obfuscateText("(803) 886-0993");
  const protectedRegistration = obfuscateText("Company Number: 16314045");
  const protectedVAT = obfuscateText("Company Number: 16314045");
  const protectedRegDate = obfuscateText("Registration Date: 25/09/2024");
  const protectedHours = obfuscateText("Lun-Ven: 9h-18h");

  return (
    <footer className="relative overflow-hidden bg-orange-50 py-8 sm:py-12 md:py-16">
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, index) => {
          const size = Math.random() * 3 + 1;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          
          return (
            <div 
              key={index}
              className="absolute rounded-full bg-gradient-to-r from-orange-400/30 to-yellow-500/30 animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">À propos</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Notre plateforme d'analyse utilise l'IA pour optimiser vos campagnes Facebook Ads et fournir des insights précieux sur vos performances publicitaires.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span 
                  className="text-gray-600 select-none" 
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("contact@example.com");
                  }}
                  data-value="contact@example.com"
                >
                  {protectedEmail}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span 
                  className="text-gray-600 select-none" 
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("0000000000");
                  }}
                  data-value="0000000000"
                >
                  {protectedPhone}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span 
                  className="text-gray-600 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("Horaires non disponibles");
                  }}
                  data-value="Horaires non disponibles"
                >
                  {protectedHours}
                </span>
              </li>
              <li className="mt-2">
                <Link href="/contact" className="text-orange-600 hover:text-orange-500 transition flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setActiveModal('terms')} 
                  className="text-gray-600 hover:text-orange-600 transition"
                >
                  Conditions d'utilisation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="text-gray-600 hover:text-orange-600 transition"
                >
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('refund')} 
                  className="text-gray-600 hover:text-orange-600 transition"
                >
                  Politique de remboursement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('legal')} 
                  className="text-gray-600 hover:text-orange-600 transition"
                >
                  Mentions légales
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span 
                  className="text-gray-600 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("Société Anonyme");
                  }}
                >
                  {protectedCompanyName}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span 
                  className="text-gray-600 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("Adresse entreprise non divulguée");
                  }}
                >
                  {protectedAddress}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span 
                  className="text-gray-600 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("Numéro registre non divulgué");
                  }}
                >
                  {protectedRegistration}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span 
                  className="text-gray-600 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("TVA non divulguée");
                  }}
                >
                  {protectedVAT}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-orange-200 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0 mx-auto">
              © {new Date().getFullYear()} AdPulseAI. Tous droits réservés.
            </p>
          </div>
          
          <p className="text-gray-400 text-xs text-center mt-6">
            L'utilisation de ce site est soumise à nos conditions d'utilisation et à notre politique de confidentialité.
          </p>
        </div>
      </div>
      
      {/* Modales */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Conditions d'utilisation"
      >
        <div className="legal-content">
          {renderModalContent(termsContent)}
        </div>
      </Modal>
      
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Politique de confidentialité"
      >
        <div className="legal-content">
          {renderModalContent(privacyContent)}
        </div>
      </Modal>
      
      <Modal
        isOpen={activeModal === 'refund'}
        onClose={() => setActiveModal(null)}
        title="Politique de remboursement"
      >
        <div className="legal-content">
          {renderModalContent(refundContent)}
        </div>
      </Modal>
      
      <Modal
        isOpen={activeModal === 'legal'}
        onClose={() => setActiveModal(null)}
        title="Mentions légales"
      >
        <div className="legal-content">
          {renderModalContent(legalContent)}
        </div>
      </Modal>

      {/* Styles spécifiques pour le contenu légal */}
      <style jsx global>{`
        .legal-content h3 {
          position: relative;
          font-size: 1.125rem;
          transition: color 0.2s ease;
        }
        
        .legal-content h3:hover {
          color: #f97316; /* orange-500 */
        }
        
        .legal-content p {
          line-height: 1.6;
          margin-bottom: 1rem;
          text-align: justify;
        }
        
        .legal-content ul, .legal-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .legal-content ul li, .legal-content ol li {
          margin-bottom: 0.5rem;
        }
        
        .legal-content a {
          color: #f97316;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .legal-content a:hover {
          color: #ea580c;
        }
      `}</style>
    </footer>
  );
} 