"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { COMPANY } from "../constants/company";

// Modales pour les pages légales
interface LegalModalProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function LegalModal({ title, content, isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [termsContent, setTermsContent] = useState<string>('Loading terms...');
  const [privacyContent, setPrivacyContent] = useState<string>('Loading privacy policy...');

  useEffect(() => {
    // Fetch terms content
    const fetchTerms = async () => {
      try {
        const response = await fetch('/api/legal?type=terms');
        const data = await response.json();
        setTermsContent(data.content);
      } catch (error) {
        console.error('Error loading terms:', error);
        setTermsContent('Failed to load terms. Please try again later.');
      }
    };

    // Fetch privacy content
    const fetchPrivacy = async () => {
      try {
        const response = await fetch('/api/legal?type=privacy');
        const data = await response.json();
        setPrivacyContent(data.content);
      } catch (error) {
        console.error('Error loading privacy policy:', error);
        setPrivacyContent('Failed to load privacy policy. Please try again later.');
      }
    };

    fetchTerms();
    fetchPrivacy();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              {COMPANY.serviceName}
            </h3>
            <p className="text-gray-400 mb-4">
              Modern creative solutions for all your graphic needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              <a href={`mailto:${COMPANY.email}`} className="hover:text-teal-400 transition">
                {COMPANY.email}
              </a>
            </p>
            <p className="text-gray-400 mb-2">
              <a href={`tel:${COMPANY.phone}`} className="hover:text-teal-400 transition">
                {COMPANY.phone}
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-teal-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-teal-400 transition">
                  Our Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-teal-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-teal-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="hover:text-teal-400 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>© {currentYear} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-2">
            {COMPANY.serviceName} is a service of {COMPANY.name}<br />
            EIN: {COMPANY.ein}<br />
            {COMPANY.address}
          </p>
        </div>
      </div>

      {/* Modals */}
      <LegalModal 
        title="Terms of Service" 
        content={
          <div dangerouslySetInnerHTML={{ __html: termsContent }} />
        } 
        isOpen={isTocOpen} 
        onClose={() => setIsTocOpen(false)} 
      />
      
      <LegalModal 
        title="Privacy Policy" 
        content={
          <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
        } 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </footer>
  );
} 