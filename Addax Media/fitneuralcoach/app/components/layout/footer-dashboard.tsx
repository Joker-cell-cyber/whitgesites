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
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-purple-500/20 py-6 lg:ml-64">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-gray-400 text-xs">
            © {new Date().getFullYear()} FitNeuralCoach. Tous droits réservés.
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
          Propulsé par <span className="text-gradient-primary">FitNeuralCoach</span> - Coaching fitness IA
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