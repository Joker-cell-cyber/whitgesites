'use client';

import Link from "next/link";
import { 
  Mail, 
  MapPin,
  Phone,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import { termsContent } from "../../legal-pages/terms";
import { privacyContent } from "../../legal-pages/privacy";
import { refundContent } from "../../legal-pages/refund";
import { legalContent } from "../../legal-pages/legal";

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: { title: string; text: string }[];
  } | null>(null);

  const openModal = (content: typeof modalContent) => {
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-16 px-4">
        {/* Top Section with main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">SEOForge</span>
                <span className="text-amber-500">AI</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Propulsez votre stratégie SEO avec notre plateforme d'IA qui génère des contenus optimisés, articles de blog et descriptions de produits parfaitement structurés pour les moteurs de recherche.
            </p>
          </div>

          {/* Legal Pages */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-6">Juridique</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => openModal(termsContent)}
                  className="hover:text-amber-500 transition-colors flex items-center w-full text-left"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Conditions d'utilisation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal(privacyContent)}
                  className="hover:text-amber-500 transition-colors flex items-center w-full text-left"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal(refundContent)}
                  className="hover:text-amber-500 transition-colors flex items-center w-full text-left"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Politique de remboursement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal(legalContent)}
                  className="hover:text-amber-500 transition-colors flex items-center w-full text-left"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Mentions légales
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4 text-amber-500" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Addax Media Ltd</p>
                  <p className="text-gray-400">Company Number: 16314045</p>
                  <p className="text-gray-400">Flat 5, 9 Langley Road, Watford, England, WD17 4PS</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <a href="mailto:support@seoforgeai.com" className="ml-3 hover:text-amber-500 transition-colors">
                  support@seoforgeai.com
                </a>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <a href="tel:+18038860993" className="ml-3 hover:text-amber-500 transition-colors">
                  (803) 886-0993
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SEOForgeAI. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">
              Conçu et développé avec ❤️ en France
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal pour les pages légales */}
      {modalContent && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalContent.title}
        >
          <div className="space-y-8">
            {modalContent.content.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
                <div className="text-gray-300 whitespace-pre-line">
                  {section.text}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </footer>
  );
}

export default Footer;