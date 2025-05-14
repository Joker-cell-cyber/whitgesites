"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[--cyber-black]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl flex items-center gap-2 hover:text-[--neon-blue] transition-colors">
          <span className="text-[--neon-pink]">Stream</span>
          <span className="text-[--neon-blue]">Packer</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-[--neon-purple] transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/#pricing" className="text-white hover:text-[--neon-purple] transition-colors relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="text-white hover:text-[--neon-purple] transition-colors relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* CTA Button */}
          <Link 
            href="/#pricing" 
            className="bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] text-white px-6 py-2 rounded-md font-medium hover:shadow-[0_0_15px_rgba(111,0,255,0.5)] transition-all ml-4"
          >
            Boost Your Channel
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[--cyber-deep] border-t border-[--neon-purple]/20 p-4"
        >
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-white hover:text-[--neon-blue] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#pricing" 
              className="text-white hover:text-[--neon-blue] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className="text-white hover:text-[--neon-blue] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-2">
              <Link 
                href="/#pricing" 
                className="bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] text-white px-6 py-2 rounded-md font-medium hover:shadow-[0_0_15px_rgba(111,0,255,0.5)] transition-all block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Boost Your Channel
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 