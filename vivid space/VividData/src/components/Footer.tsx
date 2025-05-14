import Link from "next/link";
import { FooterClientWrapper } from "./FooterClientWrapper";
import { COMPANY } from "@/app/constants/company";

// Update to use the API endpoint - the component now needs to be a Client Component
export default async function Footer() {
  // The server component only needs to pass empty strings now
  // The actual fetching will happen in the client component
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                VD
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">{COMPANY.serviceName}</span>
            </div>
            <p className="text-gray-500 text-sm">
              Bringing data to life with clarity and insight.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {COMPANY.name}<br />
              {COMPANY.address}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900">Home</Link></li>
              <li><Link href="/packages" className="text-base text-gray-500 hover:text-gray-900">Packages</Link></li>
              <li><Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
              <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
            </ul>
          </div>

          {/* Legal Links - Render the client wrapper */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            {/* Pass empty strings and let the client component fetch the content */}
            <FooterClientWrapper termsMarkdown="" privacyMarkdown="" cookiesMarkdown="" />
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li><a href={`mailto:${COMPANY.email}`} className="text-base text-gray-500 hover:text-gray-900">{COMPANY.email}</a></li>
              <li><a href={`tel:${COMPANY.phone}`} className="text-base text-gray-500 hover:text-gray-900">{COMPANY.phone}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} {COMPANY.serviceName} ({COMPANY.name}). All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            {COMPANY.address}
          </p>
        </div>
      </div>
    </footer>
  );
} 