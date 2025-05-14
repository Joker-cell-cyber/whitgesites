"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PokerChip from '../ui/PokerChip';

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
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-felt-800/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 mr-5">
              <PokerChip color="gold" size="sm" stacked={false} />
            </div>
            <span className="text-xl md:text-2xl font-bold font-playfair text-white">
              Poker<span className="text-chip-gold-500">Sharper</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/pricing" 
              className="px-5 py-2.5 bg-gradient-to-r from-poker-red-700 to-poker-red-800 text-white rounded-lg font-medium button-glow relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle styled as card */}
          <button 
            className="md:hidden text-white focus:outline-none bg-black/40 p-2 rounded border border-gray-700"
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
      </div>

      {/* Mobile Menu styled like poker table */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden felt-texture border-t border-gray-800"
        >
          <div className="px-4 py-5 space-y-3">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xs text-chip-gold-500 mr-2">♠</span> Home
            </MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xs text-chip-gold-500 mr-2">♣</span> Pricing
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xs text-chip-gold-500 mr-2">♥</span> Contact
            </MobileNavLink>
            
            <div className="pt-3">
              <Link 
                href="/pricing" 
                className="block w-full px-5 py-3 bg-gradient-to-r from-poker-red-700 to-poker-red-800 text-white rounded-lg font-medium text-center font-special-elite uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                ALL IN
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
      className="text-gray-200 hover:text-white transition-colors relative group font-raleway"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-chip-gold-400 to-chip-gold-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="block text-gray-200 hover:text-white py-2 transition-colors font-raleway"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 