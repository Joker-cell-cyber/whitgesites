'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import ObfuscatedText from '../legal/ObfuscatedText';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

// Protection contre la copie
const preventCopy = (e: React.ClipboardEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export default function FooterDashboard() {
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

  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-purple-500/20 py-6 lg:ml-64" onCopy={preventCopy}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} <ObfuscatedText text="Jastro Limited" className="text-gray-400" />. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              <ObfuscatedText text="Suite 10 12 Durie Street, Leven, Fife, United Kingdom, KY8 4HE" className="text-gray-500" />
            </p>
            <p className="text-gray-500 text-xs mt-1">
              <ObfuscatedText text="Company No. 836841" className="text-gray-500" /> | <a href="mailto:support@fitnessbrainai.com" className="hover:text-gray-400"><ObfuscatedText text="support@fitnessbrainai.com" className="text-gray-500 hover:text-gray-400" /></a>
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-white text-xs transition">
              Conditions
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-xs transition">
              Confidentialité
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-xs transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
      
      <div className="py-3 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          Propulsé par <span className="text-gradient-primary">FitnessBrainAI</span> - Coaching fitness IA
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