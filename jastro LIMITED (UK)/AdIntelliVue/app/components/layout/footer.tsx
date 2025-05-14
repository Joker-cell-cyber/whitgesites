'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Link from 'next/link';
import { Leaf, Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone, Sprout, TreePine } from 'lucide-react';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: typeof termsContent) => (
    <div className="space-y-8">
      {content.content.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-[#E8DFC7]">{section.title}</h3>
          <p className="text-[#E8DFC7]/80 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  // Informations de contact protégées
  const protectedCompanyName = obfuscateText("Jastro Limited");
  const protectedAddress = obfuscateText("Suite 10 12 Durie Street, Leven, Fife, United Kingdom, KY8 4HE");
  const protectedEmail = obfuscateText("support@adintellivue.com");
  const protectedPhone = obfuscateText("(850) 783-4170");
  const protectedRegistration = obfuscateText("Company Number: 836841");
  const protectedVAT = obfuscateText("");
  const protectedRegDate = obfuscateText("");
  const protectedHours = obfuscateText("Lun-Ven: 9h-18h");

  return (
    <footer className="relative overflow-hidden bg-[#4F4639] text-[#F8F4E9]">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[url('/patterns/wave-pattern-earth.svg')] bg-repeat-x opacity-20"></div>
      <div className="absolute -bottom-4 right-0 opacity-10">
        <TreePine className="h-40 w-40 text-[#7F8F55]" />
      </div>
      <div className="absolute top-1/4 left-10 opacity-10">
        <Leaf className="h-24 w-24 text-[#C17A56] transform rotate-45" />
      </div>
      
      {/* Section principale du footer */}
      <div className="container mx-auto px-6 pt-20 pb-12">
        {/* Logo et présentation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-start mb-6">
              <div className="bg-gradient-to-r from-[#5F7138] to-[#7F8F55] p-2 rounded-lg shadow-lg flex items-center justify-center mr-3">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#E8DFC7]">AdIntelliVue</span>
            </div>
            <p className="text-[#E8DFC7]/80 mb-8 max-w-md">
              Plateforme d'analyse avancée pour vos campagnes publicitaires. 
              Optimisez vos investissements marketing grâce à nos outils d'intelligence artificielle.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="col-span-1">
            <h3 className="text-[#E8DFC7] font-semibold mb-6 text-lg">Mentions Légales</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => setActiveModal('terms')} 
                  className="text-[#E8DFC7]/80 hover:text-[#C17A56] transition-colors duration-300 flex items-center"
                >
                  <Leaf className="h-4 w-4 mr-2 text-[#8A9D58]" />
                  Conditions d'utilisation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="text-[#E8DFC7]/80 hover:text-[#C17A56] transition-colors duration-300 flex items-center"
                >
                  <Leaf className="h-4 w-4 mr-2 text-[#8A9D58]" />
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('refund')} 
                  className="text-[#E8DFC7]/80 hover:text-[#C17A56] transition-colors duration-300 flex items-center"
                >
                  <Leaf className="h-4 w-4 mr-2 text-[#8A9D58]" />
                  Politique de remboursement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('legal')} 
                  className="text-[#E8DFC7]/80 hover:text-[#C17A56] transition-colors duration-300 flex items-center"
                >
                  <Leaf className="h-4 w-4 mr-2 text-[#8A9D58]" />
                  Mentions légales
                </button>
              </li>
              <li>
                <Link 
                  href="/unsubscribe" 
                  className="text-[#E8DFC7]/80 hover:text-[#C17A56] transition-colors duration-300 flex items-center"
                >
                  <Leaf className="h-4 w-4 mr-2 text-[#8A9D58]" />
                  Se désabonner
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations de contact */}
          <div className="col-span-1">
            <h3 className="text-[#E8DFC7] font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#8A9D58] mt-0.5" />
                <span className="text-[#E8DFC7]/80">
                  Suite 10 12 Durie Street<br />
                  Leven, Fife<br />
                  United Kingdom, KY8 4HE
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#8A9D58]" />
                <span className="text-[#E8DFC7]/80">(850) 783-4170</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#8A9D58]" />
                <span className="text-[#E8DFC7]/80">support@adintellivue.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#E8DFC7]/80">Company Number: 836841</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#E8DFC7]/80">Incorporated: 07/02/2025</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de bas de page */}
        <div className="mt-8 border-t border-[#5F7138]/20 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs text-[#7F7259]/80">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-2xl font-bold tracking-tighter text-[#E8DFC7]">Jastro Limited</span>
            . Tous droits réservés.
          </p>
        </div>
      </div>
      
      {/* Style pour empêcher la sélection du texte */}
      <style jsx global>{`
        .select-none {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
      
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