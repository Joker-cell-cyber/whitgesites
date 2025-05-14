'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';

export default function FooterDashboard() {
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
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="text-gray-300 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  const currentYear = new Date().getFullYear();
  
  // Informations de l'entreprise
  const companyName = "Addax Media Ltd";
  const companyNumber = "Company Number: 16314045";
  const companyAddress = "Flat 5, 9 Langley Road, Watford, England, WD17 4PS";

  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-purple-500/20 py-6 lg:ml-64">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {companyName}. Tous droits réservés.
            </p>
            <p className="mt-1">{companyAddress} | {companyNumber}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button
              onClick={() => setActiveModal('terms')}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Conditions d'utilisation
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Confidentialité
            </button>
            <button
              onClick={() => setActiveModal('refund')}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Remboursement
            </button>
            <button
              onClick={() => setActiveModal('legal')}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Mentions légales
            </button>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Propulsé par <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AdPulseAI</span> - Analyse de données publicitaires
          </p>
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