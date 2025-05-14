"use client";

import React from 'react';
import { COMPANY } from '../constants/company';

const TermsOfUse = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Terms of Use</h1>
      <div className="space-y-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the services provided by {COMPANY.name} ("Company", "we", "us", "our"), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of our services following the posting of changes constitutes your acceptance of such changes.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">3. Use of Services</h2>
        <p>
          Our services are intended for lawful use only. You agree not to use our services for any illegal or unauthorized purpose.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">4. Intellectual Property</h2>
        <p>
          All content included on our website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the website, is the property of {COMPANY.name} or its suppliers and protected by copyright and intellectual property laws.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">5. Limitation of Liability</h2>
        <p>
          {COMPANY.name} shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">6. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of Arizona, United States, without regard to its conflict of law provisions.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          <a href={`mailto:${COMPANY.email}`} className="text-purple-400 hover:text-purple-300">{COMPANY.email}</a>
        </p>
      </div>
    </>
  );
};

export default TermsOfUse; 