"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { COMPANY } from '@/lib/company';

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-midnight-blue-900/90 backdrop-blur-md border-b border-teal-600/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-amber-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <span className="relative text-xl md:text-2xl font-bold text-teal-600 font-sans">
              <span className="mr-1 text-white">_</span>{COMPANY.serviceName}<span className="animate-pulse">_</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/pricing" 
              className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-medium hover:shadow-md transition duration-300"
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                GET STARTED
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/30 to-teal-600/10 rounded-lg opacity-70 blur-sm"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 relative" 
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800 border-t border-teal-600/20"
        >
          <div className="px-4 py-5 space-y-4 mx-4 my-4 bg-slate-900 rounded-lg border border-slate-700">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse mr-2"></div>
              <span className="text-teal-500 text-xs uppercase tracking-widest font-medium">Navigation</span>
            </div>
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
            
            <div className="pt-2">
              <Link 
                href="/pricing" 
                className="block w-full px-5 py-3 bg-gradient-to-r from-teal-600 to-amber-500 text-white rounded-lg font-medium text-center transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  GET STARTED
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-200 hover:text-white transition-colors relative group font-medium"
    >
      <div className="flex flex-col items-center">
        <span className="tracking-wide">{children}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-amber-500 transition-all duration-300 group-hover:w-full"></span>
      </div>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="block text-teal-400 hover:text-teal-300 py-2 transition-colors text-sm"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 