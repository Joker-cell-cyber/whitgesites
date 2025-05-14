"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0f172a]/90 backdrop-blur-sm shadow-lg py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-white/10 w-10 h-10 flex items-center justify-center">
              <span className="text-xl md:text-2xl font-bold text-gradient-teal">L</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gradient-teal">
              LinguaVerse
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link 
              href="/contact" 
              className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-lg font-medium button-glow"
            >
              Contact
            </Link>
          </div>

          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1a1a1a] border-t border-teal-900/20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-300 py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-300 py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="block w-full px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-lg font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation indicators for desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center space-x-8">
            {["Home", "Pricing", "Contact"].map((item, index) => (
              <div key={index} className="relative group">
                <div className={`${
                  index === 0 ? "w-full" : "w-0"
                } h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300`}></div>
                <div className="absolute bottom-0 left-0 w-full">
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 