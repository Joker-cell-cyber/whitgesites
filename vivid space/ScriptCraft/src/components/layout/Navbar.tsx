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
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-vf-amber-500 to-vf-amber-600 rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-vf-slate-900" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M15 4.20404C14.0736 3.43827 12.8871 3 11.6 3C8.5072 3 6 5.5072 6 8.6C6 10.8865 7.30745 12.8749 9.2 13.7266" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 5C18 7.76142 15.7614 10 13 10C10.2386 10 8 7.76142 8 5C8 2.23858 10.2386 0 13 0C15.7614 0 18 2.23858 18 5Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-xl md:text-2xl tracking-tight text-vf-slate-900">Script<span className="text-vf-amber-600">Craft</span></span>
              <span className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-vf-amber-500 to-vf-amber-600 transition-all duration-300"></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/#services">Services</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/pricing" 
              className="px-6 py-3 bg-vf-amber-600 hover:bg-vf-amber-700 text-vf-slate-900 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <span>Get Started</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-10 text-vf-slate-700 focus:outline-none p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-6 h-0.5 bg-vf-slate-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-vf-slate-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-vf-slate-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Simple Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</MobileNavLink>
              <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
              
              <div className="pt-4 border-t border-vf-slate-100">
                <Link 
                  href="/pricing" 
                  className="block text-center px-6 py-3 bg-vf-amber-600 hover:bg-vf-amber-700 text-vf-slate-900 font-medium rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="gradient-border text-vf-slate-700 hover:text-vf-slate-900 transition-colors py-1.5 font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-lg font-medium text-vf-slate-900 hover:text-vf-amber-600 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 