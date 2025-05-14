'use client';

import { useState } from 'react';
import Link from 'next/link';
import LegalModal from './legal-modal';
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const navigation = {
  main: [
    { name: "À propos", href: "#" },
    { name: "Fonctionnalités", href: "#" },
    { name: "Témoignages", href: "#" },
    { name: "Contact", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'refund'>('privacy');

  const openLegalModal = (type: 'privacy' | 'terms' | 'refund') => {
    setLegalModalType(type);
    setIsLegalModalOpen(true);
  };

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <button
            onClick={() => openLegalModal('privacy')}
            className="text-gray-400 hover:text-gray-500"
          >
            Politique de confidentialité
          </button>
          <button
            onClick={() => openLegalModal('terms')}
            className="text-gray-400 hover:text-gray-500"
          >
            Conditions d'utilisation
          </button>
          <button
            onClick={() => openLegalModal('refund')}
            className="text-gray-400 hover:text-gray-500"
          >
            Politique de remboursement
          </button>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Addax Media Ltd. Tous droits réservés.
          </p>
        </div>
      </div>

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        type={legalModalType}
      />
    </footer>
  );
} 