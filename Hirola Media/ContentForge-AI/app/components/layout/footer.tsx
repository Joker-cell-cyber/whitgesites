'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import Link from 'next/link';
import { Mail, Phone, Clock, MessageCircle, Map, Sparkles, Building, CreditCard, Calendar, FileText, Palette, User, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (content: any) => (
    <div className="space-y-8">
      {content.content.map((section: any, index: number) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-ocrf-gold-300">{section.title}</h3>
          <p className="text-ocrf-brown-200 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  );

  // Informations de contact protégées
  const protectedCompanyName = obfuscateText("Hirola Media Ltd");
  const contactInfo = {
    address: "137 Fletcher Way, Hemel Hempstead, England, HP2 5RZ",
    phone: "(971) 315-8948",
    email: "contact@contentforge-ai.com"
  };
  const protectedRegistration = obfuscateText("Company Number: 16312592");
  const protectedVAT = obfuscateText("VAT: GB456789123");
  const protectedRegDate = obfuscateText("Registration Date: 27/02/2024");
  const protectedHours = obfuscateText("Lun-Ven: 9h-18h");

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  return (
    <>
    <footer className="relative overflow-hidden bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900 py-16 sm:py-20">
      {/* Effet de fond */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.02) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.02) 2%, transparent 0%)`,
        backgroundSize: '100px 100px'
      }}></div>
      
      {/* Ligne dorée en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocrf-gold-500/40 to-transparent"></div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => {
          const size = Math.random() * 6 + 2;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const rotation = Math.random() * 360;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animation: `float ${duration}s ease-in-out infinite alternate`
              }}
            >
              <div 
                className="w-full h-full bg-ocrf-gold-300" 
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  transform: `rotate(${rotation}deg)`,
                  opacity: 0.2
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Logo et slogan */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } }
          }}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocrf-gold-400 to-ocrf-copper-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-ocrf-anthracite-900" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-serif font-bold text-white">Content</span>
                <span className="text-2xl font-serif font-bold text-ocrf-gold-400">Forge AI</span>
              </div>
            </div>
          </div>
          <p className="text-ocrf-brown-300 max-w-2xl mx-auto italic font-serif">
            "L'art n'est pas ce que vous voyez, mais ce que vous faites voir aux autres."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="text-base font-serif text-ocrf-gold-400 mb-6 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-ocrf-gold-500 mr-2"></span>
              À propos
            </h3>
            <p className="text-ocrf-brown-200 text-sm leading-relaxed">
              ContentForge AI est une plateforme de génération de contenu propulsée par l'intelligence artificielle qui transforme vos idées en textes professionnels et optimisés. Nous aidons les entreprises et les créateurs à produire du contenu de qualité à grande échelle.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="text-base font-serif text-ocrf-gold-400 mb-6 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-ocrf-gold-500 mr-2"></span>
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3 mt-0.5">
                  <Mail className="h-4 w-4 text-ocrf-gold-400" />
                </div>
                <span 
                  className="text-ocrf-brown-200 select-none" 
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("contact@contentforgeai.com");
                  }}
                  data-value="contact@contentforgeai.com"
                >
                    {contactInfo.email}
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3 mt-0.5">
                  <Phone className="h-4 w-4 text-ocrf-copper-400" />
                </div>
                <span 
                  className="text-ocrf-brown-200 select-none" 
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("0000000000");
                  }}
                  data-value="0000000000"
                >
                    {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3 mt-0.5">
                  <Clock className="h-4 w-4 text-ocrf-gold-400" />
                </div>
                <span 
                  className="text-ocrf-brown-200 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("Horaires non disponibles");
                  }}
                  data-value="Horaires non disponibles"
                >
                  {protectedHours}
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3 mt-0.5">
                  <Map className="h-4 w-4 text-ocrf-copper-400" />
                </div>
                <span 
                  className="text-ocrf-brown-200 select-none"
                  onCopy={(e) => {
                    e.preventDefault();
                  }}
                >
                    {contactInfo.address}
                </span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="text-base font-serif text-ocrf-gold-400 mb-6 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-ocrf-gold-500 mr-2"></span>
              Pages légales
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button onClick={() => setActiveModal('terms')} className="flex items-center text-ocrf-brown-200 hover:text-ocrf-gold-300 transition-colors">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3">
                  <FileText className="h-4 w-4 text-ocrf-gold-400" />
                </div>
                <span className="text-sm">Conditions d'utilisation</span>
              </button>
              <button onClick={() => setActiveModal('privacy')} className="flex items-center text-ocrf-brown-200 hover:text-ocrf-gold-300 transition-colors">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3">
                  <FileText className="h-4 w-4 text-ocrf-copper-400" />
                </div>
                <span className="text-sm">Politique de confidentialité</span>
              </button>
              <button onClick={() => setActiveModal('refund')} className="flex items-center text-ocrf-brown-200 hover:text-ocrf-gold-300 transition-colors">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3">
                  <CreditCard className="h-4 w-4 text-ocrf-gold-400" />
                </div>
                <span className="text-sm">Politique de remboursement</span>
              </button>
              <button onClick={() => setActiveModal('legal')} className="flex items-center text-ocrf-brown-200 hover:text-ocrf-gold-300 transition-colors">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3">
                  <Building className="h-4 w-4 text-ocrf-copper-400" />
                </div>
                <span className="text-sm">Mentions légales</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="text-base font-serif text-ocrf-gold-400 mb-6 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-ocrf-gold-500 mr-2"></span>
              Société
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3 mt-0.5">
                  <Building className="h-4 w-4 text-ocrf-gold-400" />
                </div>
                <div>
                  <span 
                    className="text-ocrf-brown-200 select-none block"
                    onCopy={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {protectedCompanyName}
                  </span>
                  <span 
                    className="text-ocrf-brown-400 text-xs select-none block mt-1"
                    onCopy={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {protectedRegistration}
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-md bg-ocrf-anthracite-800/80 flex items-center justify-center border border-ocrf-gold-500/10 mr-3 mt-0.5">
                  <CreditCard className="h-4 w-4 text-ocrf-copper-400" />
                </div>
                <div>
                  <span 
                    className="text-ocrf-brown-200 select-none block"
                    onCopy={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {protectedVAT}
                  </span>
                  <span 
                    className="text-ocrf-brown-400 text-xs select-none block mt-1"
                    onCopy={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {protectedRegDate}
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <div className="text-center border-t border-ocrf-gold-500/10 pt-6">
          <p className="text-ocrf-brown-400 text-sm">
              © {currentYear} ContentForge AI. Tous droits réservés.
          </p>
        </div>
      </div>
      
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
    </footer>
    </>
  );
} 