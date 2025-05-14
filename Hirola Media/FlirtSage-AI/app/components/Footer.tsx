"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { useLegal } from "@/app/context/legal-context";
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Modal from './ui/Modal';
import { useState } from 'react';

const contactInfo = {
  address: "137 Fletcher Way, Hemel Hempstead, England, HP2 5RZ",
  phone: "(971) 315-8948",
  email: "support@flirtsageai"
};

export default function Footer() {
  const pathname = usePathname();
  const { openLegalModal } = useLegal();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: any) => (
    <div className="space-y-8">
      {content.content.map((section: any, index: number) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-yfc-gold-800">{section.title}</h3>
          <p className="text-yfc-gold-600 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <footer className="bg-yfc-cream-50 border-t border-yfc-cream-200 text-yfc-gold-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Colonne 1 - À propos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                <span className="font-medium text-xl text-yfc-gold-800">
                  Flirt<span className="text-pink-500">Sage</span>AI
                </span>
              </div>
              <p className="text-sm text-yfc-gold-600">
                Votre coach personnel pour améliorer votre vie amoureuse et sociale, 
                avec des conseils personnalisés et une approche moderne de la séduction.
              </p>
            </div>

            {/* Colonne 2 - Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">Contact</h3>
              <ul className="space-y-3">
                <li className="text-sm text-yfc-gold-600">
                  <span className="block">Email support:</span>
                  <a href={`mailto:${contactInfo.email}`} className="text-pink-300 hover:text-pink-400 transition-colors">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="text-sm text-yfc-gold-600">
                  <span className="block">Numéro SAV:</span>
                  <a href={`tel:${contactInfo.phone}`} className="text-pink-300 hover:text-pink-400 transition-colors">
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-pink-300 hover:text-pink-400 transition-colors"
                  >
                    Page de contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Liens légaux */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">Informations légales</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="text-sm text-yfc-gold-600 hover:text-pink-400 transition-colors cursor-pointer text-left"
                  >
                    Conditions d'utilisation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('legal')}
                    className="text-sm text-yfc-gold-600 hover:text-pink-400 transition-colors cursor-pointer text-left"
                  >
                    Mentions légales
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="text-sm text-yfc-gold-600 hover:text-pink-400 transition-colors cursor-pointer text-left"
                  >
                    Politique de confidentialité
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('refund')}
                    className="text-sm text-yfc-gold-600 hover:text-pink-400 transition-colors cursor-pointer text-left"
                  >
                    Politique de remboursement
                  </button>
                </li>
              </ul>
            </div>

            {/* Colonne 4 - Informations légales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">Entreprise</h3>
              <div className="text-sm text-yfc-gold-600 space-y-2">
                <p className="font-medium">Hirola Media Ltd</p>
                <p>Company Number: 16312592</p>
                <p>VAT: GB456789123</p>
                <p>{contactInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-yfc-cream-200 my-8"></div>

          {/* Bas de page */}
          <div className="text-center">
            <p className="text-sm text-yfc-gold-400">
              © {new Date().getFullYear()} FlirtSageAI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Modales */}
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
    </>
  );
} 