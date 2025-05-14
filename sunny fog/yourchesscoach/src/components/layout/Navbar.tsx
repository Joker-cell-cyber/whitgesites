"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { KingIcon, HomeIcon, PricingIcon, ContactIcon } from '@/components/ui/ChessIcons';
import { COMPANY } from '@/app/constants/company';

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
        scrolled ? 'bg-[#0c1d3d]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <KingIcon size={28} className="mr-2 text-chess-gold-500" />
            <span className="text-xl md:text-2xl font-bold gradient-text">
              {COMPANY.serviceName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/"><HomeIcon size={18} className="inline-block mr-1 mb-0.5" />Home</NavLink>
            <NavLink href="/pricing"><PricingIcon size={18} className="inline-block mr-1 mb-0.5" />Pricing</NavLink>
            <NavLink href="/contact"><ContactIcon size={18} className="inline-block mr-1 mb-0.5" />Contact</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/contact" 
              className="chess-button"
            >
              Get Started
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0d1b30] border-t border-chess-gold-900/20"
        >
          <div className="px-4 py-5 space-y-4">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              <HomeIcon size={18} className="inline-block mr-2" />Home
            </MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <PricingIcon size={18} className="inline-block mr-2" />Pricing
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <ContactIcon size={18} className="inline-block mr-2" />Contact
            </MobileNavLink>
            
            <div className="pt-2">
              <Link 
                href="/contact" 
                className="chess-button block w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="text-gray-300 hover:text-chess-gold-400 transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="block text-gray-300 hover:text-chess-gold-400 transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 