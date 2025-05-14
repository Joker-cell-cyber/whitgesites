"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { useLegal } from "@/app/context/legal-context";

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

const Footer = () => {
  const { openLegalModal } = useLegal();

  // Informations de contact protégées
  const protectedCompanyName = obfuscateText("Jastro Limited");
  const protectedAddress = obfuscateText("Suite 10 12 Durie Street, Leven, Fife, United Kingdom, KY8 4HE");
  const protectedEmail = obfuscateText("info@jastroltd.com");
  const protectedPhone = obfuscateText("(850) 783-4170");
  const protectedRegistration = obfuscateText("Company Number: 836841");
  const protectedIncorporation = obfuscateText("Date d'incorporation: 07/02/2025");

  return (
    <footer className="relative bg-gradient-to-br from-[#FFEFE8] to-[#FFF6E8] pt-16 pb-8 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5C3E] to-[#FFA728]"></div>
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-gradient-to-r from-[#FF5C3E]/10 to-[#FFA728]/10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#FF5C3E]/15 to-[#FFA728]/15 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo et description */}
          <div className="md:col-span-6">
            <div className="flex items-center mb-6">
              <span className="text-xl font-bold text-[#2D1811]">SeducIA</span>
            </div>
            <p className="text-[#664D45] mb-8 leading-relaxed">
              Votre coach de rencontres personnel alimenté par l'IA qui vous aide à développer vos compétences relationnelles.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[#2D1811] font-bold mb-5 text-base">Juridique</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => openLegalModal('terms')} 
                  className="text-[#664D45] hover:text-[#FF5C3E] transition-colors duration-300 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1 text-[#FF5C3E]" />
                  <span>Conditions d'utilisation</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('privacy')} 
                  className="text-[#664D45] hover:text-[#FF5C3E] transition-colors duration-300 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1 text-[#FF5C3E]" />
                  <span>Politique de confidentialité</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('refund')} 
                  className="text-[#664D45] hover:text-[#FF5C3E] transition-colors duration-300 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1 text-[#FF5C3E]" />
                  <span>Politique de remboursement</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('legal')} 
                  className="text-[#664D45] hover:text-[#FF5C3E] transition-colors duration-300 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1 text-[#FF5C3E]" />
                  <span>Mentions légales</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-[#2D1811] font-bold mb-5 text-base">Contact</h3>
            <ul className="space-y-4 text-[#664D45]">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#FF5C3E] shrink-0 mt-0.5" />
                <span>
                  Suite 10 12 Durie Street<br />
                  Leven, Fife<br />
                  United Kingdom, KY8 4HE
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#FF5C3E] shrink-0" />
                <span>(850) 783-4170</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#FF5C3E] shrink-0" />
                <span>support@seduc-ia.com</span>
              </li>
              <li className="text-[#664D45]">
                <span>Company No. 836841</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright et liens légaux */}
        <div className="border-t border-[#FFDECF] pt-8 mt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#664D45] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Jastro Limited. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <span className="text-[#664D45] text-sm">
              Suite 10 12 Durie Street, Leven, Fife, United Kingdom, KY8 4HE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 