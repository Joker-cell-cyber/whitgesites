'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import { Mail, Phone, Heart, ExternalLink, Shield, Book } from "lucide-react";

export default function FooterDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-white border-t border-adfi-slate-200">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Liens de support */}
          <div>
            <h3 className="text-sm font-semibold text-adfi-slate-800 mb-3">Support</h3>
            <div className="space-y-2.5">
              <Link 
                href="/help-center" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <Book className="h-4 w-4 mr-2" />
                Centre d'aide
              </Link>
              
              <Link 
                href="mailto:support@adinsight-ai.com" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                support@adinsight-ai.com
              </Link>
              
              <Link 
                href="tel:+3312345678" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <Phone className="h-4 w-4 mr-2" />
                +33 1 23 45 67 89
              </Link>
            </div>
          </div>
          
          {/* Liens utiles */}
          <div>
            <h3 className="text-sm font-semibold text-adfi-slate-800 mb-3">Liens utiles</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <Link 
                href="/changelog" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Nouveautés
              </Link>
              
              <Link 
                href="/roadmap" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Feuille de route
              </Link>
              
              <Link 
                href="/tutorials" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Tutoriels
              </Link>
              
              <Link 
                href="/api-docs" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                API
              </Link>
              
              <Link 
                href="/status" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Statut système
              </Link>
              
              <Link 
                href="/feedback" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Feedback
              </Link>
              
              <Link 
                href="/tokens/buy" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Acheter des tokens
              </Link>
              
              <Link 
                href="/subscriptions" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-adfi-blue-500 mr-2"></span>
                Abonnements
              </Link>
            </div>
          </div>
          
          {/* Légal */}
          <div>
            <h3 className="text-sm font-semibold text-adfi-slate-800 mb-3">Légal</h3>
            <div className="space-y-2.5">
              <Link 
                href="/privacy-policy" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <Shield className="h-4 w-4 mr-2" />
                Politique de confidentialité
              </Link>
              
              <Link 
                href="/terms-of-service" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Conditions d'utilisation
              </Link>
              
              <Link 
                href="/cookie-policy" 
                className="flex items-center text-sm text-adfi-slate-600 hover:text-adfi-blue-600 transition-colors duration-200"
              >
                <Shield className="h-4 w-4 mr-2" />
                Politique de cookies
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-adfi-slate-200 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-adfi-slate-500 mb-4 md:mb-0">
            © {currentYear} AdInsight AI. Tous droits réservés.
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-adfi-slate-500">
            <span>Fait avec</span>
            <Heart className="h-3 w-3 text-red-500" fill="currentColor" />
            <span>en France</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 