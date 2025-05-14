"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";
import LegalModal from "../ui/LegalModal";
import { termsContent, privacyContent, cookieContent } from "@/content/legal/index";

export default function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-turquoise-300 to-turquoise-500 bg-clip-text text-transparent">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="text-gray-400 mt-2 max-w-xs">
              SEO-optimized content to boost your online visibility and engage your audience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-turquoise-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-turquoise-300 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-turquoise-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-turquoise-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-turquoise-300 transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-turquoise-300 transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="pt-2">
                {COMPANY.name}
              </li>
              <li>
                EIN: {COMPANY.ein}
              </li>
              <li>
                {COMPANY.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap space-x-4 mt-4 md:mt-0">
            <Link 
              href="/legal/terms"
              className="text-gray-500 hover:text-turquoise-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/legal/privacy"
              className="text-gray-500 hover:text-turquoise-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/legal/cookie"
              className="text-gray-500 hover:text-turquoise-300 text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      <LegalModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms of Service"
        content={termsContent}
      />
      <LegalModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
        content={privacyContent}
      />
      <LegalModal
        isOpen={isCookieOpen}
        onClose={() => setIsCookieOpen(false)}
        title="Cookie Policy"
        content={cookieContent}
      />
    </footer>
  );
}