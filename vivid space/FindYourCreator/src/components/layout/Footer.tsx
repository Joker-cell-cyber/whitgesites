"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

export default function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  return (
    <footer className="bg-ug-gray-50 text-ug-gray-700 border-t border-ug-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-90">
              {COMPANY.serviceName}
            </Link>
            <p className="text-ug-gray-600 mt-2 max-w-md">
              Connecting brands with authentic UGC creators to elevate your marketing strategy with high-quality user-generated content.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
              <h3 className="text-lg font-semibold text-ug-gray-900 mb-4">Navigation</h3>
              <ul className="space-y-3">
              <li>
                  <Link href="/" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">Home</Link>
              </li>
              <li>
                  <Link href="/about" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">About Us</Link>
              </li>
              <li>
                  <Link href="/pricing" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">Pricing</Link>
              </li>
              <li>
                  <Link href="/contact" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
              <h3 className="text-lg font-semibold text-ug-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/legal/privacy" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-ug-gray-600 hover:text-vivid-600 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
          </div>
          
          <div>
              <h3 className="text-lg font-semibold text-ug-gray-900 mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-vivid-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${COMPANY.email}`} className="text-ug-gray-600 hover:text-vivid-600 transition-colors">{COMPANY.email}</a>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-vivid-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${COMPANY.phone}`} className="text-ug-gray-600 hover:text-vivid-600 transition-colors">{COMPANY.phone}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-ug-gray-200 mt-12 pt-8 text-center">
          <p className="text-ug-gray-600">© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-ug-gray-500 text-sm mt-2">
            {COMPANY.serviceName} is a service of {COMPANY.name}<br />
            EIN: {COMPANY.ein}<br />
            {COMPANY.address}
          </p>
        </div>
      </div>
      
      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-ug-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-ug-gray-900">Privacy Policy</h2>
              <button 
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-ug-gray-500 hover:text-ug-gray-900"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-ug-gray-700">
              <p>Last updated: August 1, 2023</p>
              <p>This Privacy Policy describes how FindYourCreator (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses your personal information when you visit our website findyourcreator (the &quot;Site&quot;).</p>
              
              <h3>Information We Collect</h3>
              <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your requests. We may also collect additional information if you contact us for customer support.</p>
              
              <h3>How We Use Your Information</h3>
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you to provide customer support</li>
                <li>Send you information and updates</li>
              </ul>
              
              <h3>Contact Us</h3>
              <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at privacy@findyourcreator.</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-ug-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-ug-gray-900">Terms of Service</h2>
              <button 
                onClick={() => setShowTerms(false)}
                className="text-ug-gray-500 hover:text-ug-gray-900"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-ug-gray-700">
              <p>Last updated: August 1, 2023</p>
              <p>Please read these terms of service carefully before using the FindYourCreator website.</p>
              
              <h3>Use License</h3>
              <p>Permission is granted to temporarily view the materials on FindYourCreator&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on FindYourCreator&apos;s website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              </ul>
              
              <h3>Disclaimer</h3>
              <p>The materials on FindYourCreator&apos;s website are provided on an &apos;as is&apos; basis. FindYourCreator makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              
              <h3>Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us at legal@findyourcreator.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
} 