"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-vf-slate-800 to-vf-slate-900 py-24">
      {/* Background decorative elements */}
      <div className="absolute w-full h-full top-0 left-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-vf-amber-500 filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-vf-amber-300 filter blur-3xl"></div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left side - Company details with asymmetric positioning */}
          <div className="lg:col-span-5 lg:pr-12">
            <div className="bg-gradient-to-br from-vf-slate-700 to-vf-slate-800 rounded-2xl p-8 shadow-xl border border-vf-slate-700 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-vf-amber-500 rounded-xl flex items-center justify-center mr-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M15 4.20404C14.0736 3.43827 12.8871 3 11.6 3C8.5072 3 6 5.5072 6 8.6C6 10.8865 7.30745 12.8749 9.2 13.7266" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 5C18 7.76142 15.7614 10 13 10C10.2386 10 8 7.76142 8 5C8 2.23858 10.2386 0 13 0C15.7614 0 18 2.23858 18 5Z" fill="#1e293b"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-vf-slate-100">Script<span className="text-vf-amber-400">Craft</span></h2>
              </div>
              
              <div className="mb-6 text-vf-slate-300 prose prose-sm">
                <p className="leading-relaxed">
                  Professional sales scripts engineered to convert cold prospects into loyal customers. 
                  Our proven frameworks are trusted by top-performing sales teams worldwide.
                </p>
              </div>
              
              <div className="space-y-3 text-vf-slate-300">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vf-slate-700 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-vf-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-vf-amber-400 font-medium">Email</span>
                    <a href="mailto:support@scriptcraft.com" className="text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      support@scriptcraft.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vf-slate-700 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-vf-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-vf-amber-400 font-medium">Phone</span>
                    <a href="tel:+15132701792" className="text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      +1 513 270 1792
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vf-slate-700 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-vf-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-vf-amber-400 font-medium">Address</span>
                    <address className="not-italic">
                      Vivid Space LLC<br />
                      2620 EASTGATE RD APT 21<br />
                      TOLEDO, OH 43614
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Asymmetric navigation with card-based design */}
          <div className="lg:col-span-7 lg:pl-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Navigation block 1 */}
              <div className="bg-vf-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-vf-slate-700/50 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-vf-amber-400 font-semibold text-lg mb-4 pb-2 border-b border-vf-slate-700">Navigate</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Navigation block 2 */}
              <div className="bg-vf-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-vf-slate-700/50 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-vf-amber-400 font-semibold text-lg mb-4 pb-2 border-b border-vf-slate-700">Services</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/#cold-calling" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Cold Calling Scripts
                    </Link>
                  </li>
                  <li>
                    <Link href="/#follow-up" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Follow-up Sequences
                    </Link>
                  </li>
                  <li>
                    <Link href="/#closing" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Closing Scripts
                    </Link>
                  </li>
                  <li>
                    <Link href="/#custom" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Custom Solutions
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Navigation block 3 */}
              <div className="bg-vf-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-vf-slate-700/50 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-vf-amber-400 font-semibold text-lg mb-4 pb-2 border-b border-vf-slate-700">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/legal/terms" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/privacy" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/refund" className="group flex items-center text-vf-slate-300 hover:text-vf-amber-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-vf-amber-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom section with alternate approach */}
            <div className="mt-10 pt-6 border-t border-vf-slate-700/50">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-vf-slate-400 text-sm md:text-base mb-4 md:mb-0"
                >
                  © {currentYear} Vivid Space LLC (EIN: 33-3689892). All rights reserved.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center"
                >
                  <div className="bg-vf-slate-800 border border-vf-slate-700 rounded-lg py-1.5 px-3 text-xs text-vf-slate-400">
                    <span>Handcrafted in Ohio with <span className="text-vf-amber-400">♥</span></span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 