'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import { Heart, Shield, HelpCircle, Mail, ExternalLink } from 'lucide-react';

export default function FooterDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: typeof termsContent) => (
    <div className="space-y-8">
      {content.content.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="text-nrln-slate-300 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <footer className="relative bg-nrln-slate-900/60 backdrop-blur-xl border-t border-nrln-slate-800/60 py-4 lg:ml-64">
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nrln-teal-500/40 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-nrln-slate-400 text-xs">
            © {new Date().getFullYear()} <span className="font-medium text-white">FitSage AI</span>. Tous droits réservés.
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={() => setActiveModal('terms')}
              className="text-nrln-slate-400 hover:text-white text-xs transition flex items-center"
            >
              <Shield className="h-3 w-3 mr-1 text-nrln-teal-500" />
              Conditions
            </button>
            <span className="text-nrln-slate-700">|</span>
            <button 
              onClick={() => setActiveModal('privacy')}
              className="text-nrln-slate-400 hover:text-white text-xs transition flex items-center"
            >
              <Shield className="h-3 w-3 mr-1 text-nrln-blue-500" />
              Confidentialité
            </button>
            <span className="text-nrln-slate-700">|</span>
            <Link 
              href="/dashboard/support" 
              className="text-nrln-slate-400 hover:text-white text-xs transition flex items-center"
            >
              <HelpCircle className="h-3 w-3 mr-1 text-nrln-purple-500" />
              Support
            </Link>
            <span className="hidden md:inline text-nrln-slate-700">|</span>
            <Link 
              href="mailto:contact@fitsage.ai" 
              className="hidden md:flex text-nrln-slate-400 hover:text-white text-xs transition items-center"
            >
              <Mail className="h-3 w-3 mr-1 text-nrln-teal-500" />
              contact@fitsage.ai
            </Link>
          </div>
        </div>
      </div>
      
      <div className="py-2 bg-nrln-slate-900/80 mt-3">
        <div className="container mx-auto px-4 text-center text-xs flex items-center justify-center">
          <span className="text-nrln-slate-500">Propulsé par</span> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nrln-teal-400 to-nrln-blue-500 font-semibold mx-1">FitSage AI</span> 
          <span className="text-nrln-slate-500">- Coaching fitness IA</span>
          <Heart className="h-3 w-3 ml-1 text-nrln-teal-500" />
        </div>
      </div>

      {/* Effet de lignes quadrillées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(20 184 166 / 20%) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(20 184 166 / 20%) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={termsContent.title}
        className="bg-nrln-slate-900 border border-nrln-slate-700"
      >
        {renderModalContent(termsContent)}
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={privacyContent.title}
        className="bg-nrln-slate-900 border border-nrln-slate-700"
      >
        {renderModalContent(privacyContent)}
      </Modal>

      <Modal
        isOpen={activeModal === 'refund'}
        onClose={() => setActiveModal(null)}
        title={refundContent.title}
        className="bg-nrln-slate-900 border border-nrln-slate-700"
      >
        {renderModalContent(refundContent)}
      </Modal>

      <Modal
        isOpen={activeModal === 'legal'}
        onClose={() => setActiveModal(null)}
        title={legalContent.title}
        className="bg-nrln-slate-900 border border-nrln-slate-700"
      >
        {renderModalContent(legalContent)}
      </Modal>
    </footer>
  );
} 