"use client";

import { useState } from 'react';
import Link from "next/link";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";
import { COMPANY } from "@/app/constants/company";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  
  const openPopup = (type: 'terms' | 'privacy' | 'cookies') => {
    setActivePopup(type);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-flow-green-500 to-flow-teal-500 bg-clip-text text-transparent">
                {COMPANY.serviceName}
              </span>
            </Link>
            <p className="mt-4 text-gray-600">
              Automating your business with Make.com and Zapier
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-flow-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-flow-green-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-flow-green-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-flow-green-500 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => openPopup('privacy')}
                  className="text-gray-600 hover:text-flow-green-500 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('terms')}
                  className="text-gray-600 hover:text-flow-green-500 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('cookies')}
                  className="text-gray-600 hover:text-flow-green-500 transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                Email: <a href={`mailto:${COMPANY.email}`} className="hover:text-flow-green-500 transition-colors">{COMPANY.email}</a>
              </li>
              <li className="text-gray-600">
                Phone: <a href={`tel:${COMPANY.phone}`} className="hover:text-flow-green-500 transition-colors">{COMPANY.phone}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {COMPANY.serviceName}. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-2">
            {COMPANY.serviceName} is a service of {COMPANY.name}<br />
            EIN: {COMPANY.ein}<br />
            {COMPANY.address}
          </p>
        </div>
      </div>
      
      {/* Terms and Conditions Popup */}
      <LegalPopup 
        isOpen={activePopup === 'terms'} 
        onClose={closePopup} 
        title="Terms & Conditions"
      >
        <LegalContent type="terms" />
      </LegalPopup>
      
      {/* Privacy Policy Popup */}
      <LegalPopup 
        isOpen={activePopup === 'privacy'} 
        onClose={closePopup} 
        title="Privacy Policy"
      >
        <LegalContent type="privacy" />
      </LegalPopup>

      {/* Cookie Policy Popup */}
      <LegalPopup 
        isOpen={activePopup === 'cookies'} 
        onClose={closePopup} 
        title="Cookie Policy"
      >
        <div className="prose prose-lg max-w-none text-gray-600">
          <h2>Cookie Policy</h2>
          <p>Last updated: 25 February 2025</p>
          
          <p>This Cookie Policy explains how {COMPANY.serviceName} ("{COMPANY.serviceName}", "we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at {COMPANY.website} ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
          
          <h3>What are cookies?</h3>
          <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
          
          <p>Cookies set by the website owner (in this case, {COMPANY.serviceName}) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.</p>
          
          <h3>Why do we use cookies?</h3>
          <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for analytics and other purposes.</p>
          
          <h3>The specific types of cookies served through our Website and the purposes they perform:</h3>
          
          <h4>Essential website cookies:</h4>
          <p>These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
          
          <h4>Performance and functionality cookies:</h4>
          <p>These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
          
          <h4>Analytics and customization cookies:</h4>
          <p>These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>
          
          <h4>Advertising cookies:</h4>
          <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>
          
          <h3>How can you control cookies?</h3>
          <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
          
          <p>The Cookie Consent Manager can be found in the notification banner and on our website. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</p>
          
          <p>In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" target="_blank">http://www.youronlinechoices.com</a>.</p>
          
          <h3>How often will we update this Cookie Policy?</h3>
          <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
          
          <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
          
          <h3>Where can you get further information?</h3>
          <p>If you have any questions about our use of cookies or other technologies, please email us at {COMPANY.email} or call us at {COMPANY.phone}.</p>
        </div>
      </LegalPopup>
    </footer>
  );
} 