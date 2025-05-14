import { Metadata } from 'next';
import { COMPANY } from '../../constants/company';

export const metadata: Metadata = {
  title: `Cookie Policy - ${COMPANY.name}`,
  description: `Learn about how ${COMPANY.name} uses cookies and similar technologies.`,
};

export default function CookiesPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-white">
            <p>Last updated: February 25, 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Introduction</h2>
            <p className="mb-6">
              This Cookie Policy explains how {COMPANY.name} ("we", "us", or "our") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. What Are Cookies</h2>
            <p className="mb-6">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners. Cookies can be "persistent" or "session" cookies, and can be first-party or third-party cookies.
            </p>
            <ul className="list-disc pl-8 mb-6">
              <li className="mb-2"><strong>Persistent cookies</strong> remain on your device for a set period of time or until you delete them.</li>
              <li className="mb-2"><strong>Session cookies</strong> are temporary and are deleted from your device when you close your browser.</li>
              <li className="mb-2"><strong>First-party cookies</strong> are set by the website you are visiting.</li>
              <li className="mb-2"><strong>Third-party cookies</strong> are set by a domain different from the website you are visiting.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. How We Use Cookies</h2>
            <p className="mb-6">
              We use cookies for several purposes, including:
            </p>
            <ul className="list-disc pl-8 mb-6">
              <li className="mb-2"><strong>Essential cookies:</strong> These are necessary for the website to function properly and cannot be turned off in our systems.</li>
              <li className="mb-2"><strong>Performance and analytics cookies:</strong> These help us to understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li className="mb-2"><strong>Functional cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
              <li className="mb-2"><strong>Targeting cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Cookies We Use</h2>
            <p className="mb-6">
              The specific cookies we use may include:
            </p>
            <ul className="list-disc pl-8 mb-6">
              <li className="mb-2"><strong>Consent cookie:</strong> Stores your cookie consent preferences</li>
              <li className="mb-2"><strong>Authentication cookies:</strong> Used to recognize you when you log in to our services</li>
              <li className="mb-2"><strong>Analytics cookies:</strong> Used to understand how visitors interact with our website</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Managing Cookies</h2>
            <p className="mb-6">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
            </p>
            <p className="mb-6">
              You can usually find these settings in the 'options' or 'preferences' menu of your browser. To understand these settings, the following links may be helpful:
            </p>
            <ul className="list-disc pl-8 mb-6">
              <li className="mb-2"><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Chrome</a></li>
              <li className="mb-2"><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Firefox</a></li>
              <li className="mb-2"><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Internet Explorer</a></li>
              <li className="mb-2"><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Safari</a></li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Changes to This Cookie Policy</h2>
            <p className="mb-6">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this Cookie Policy.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about our use of cookies, please contact us at {COMPANY.email}.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 