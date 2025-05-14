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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#44D62C]/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative group">
              <span className="text-xl md:text-2xl font-bold text-white uppercase font-['Saira_Condensed'] tracking-wider">
                DONT<span className="text-[#44D62C]">BE</span>NOOB
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#44D62C] transform origin-left transition-transform duration-300 group-hover:scale-x-110"></div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FFFF] transform origin-left transition-all duration-300 group-hover:w-full"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">HOME</NavLink>
            <NavLink href="/pricing">PRICING</NavLink>
            <NavLink href="/contact">CONTACT</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/pricing" 
              className="relative px-5 py-2.5 bg-transparent overflow-hidden border border-[#44D62C] text-white font-['Chakra_Petch'] uppercase text-sm tracking-wider font-medium transition-colors duration-300 hover:bg-[#44D62C]/10 group"
            >
              <span className="relative z-10">LEVEL UP NOW</span>
              <span className="absolute top-0 left-0 w-1 h-0 bg-[#44D62C] transition-all duration-300 group-hover:h-full"></span>
              <span className="absolute bottom-0 right-0 w-1 h-0 bg-[#44D62C] transition-all duration-300 group-hover:h-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute h-0.5 w-full bg-[#44D62C] transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 top-2' : 'top-0'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 w-full bg-[#00FFFF] top-2 transition-all duration-200 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 w-full bg-[#44D62C] transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 top-2' : 'top-4'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0A0A0A]/95 border-t border-[#44D62C]/20 backdrop-blur-lg"
        >
          <div className="px-4 py-5 space-y-4">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>HOME</MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>PRICING</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</MobileNavLink>
            
            <div className="pt-2">
              <Link 
                href="/pricing" 
                className="block w-full px-5 py-3 bg-[#0A0A0A] border border-[#44D62C] text-white font-['Chakra_Petch'] uppercase text-sm tracking-wider font-medium text-center hover:bg-[#44D62C]/10 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                LEVEL UP NOW
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
      className="text-gray-200 hover:text-white font-['Chakra_Petch'] text-sm uppercase tracking-wider transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#44D62C] to-[#00FFFF] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="block text-gray-200 hover:text-white py-2 transition-colors font-['Chakra_Petch'] text-sm uppercase tracking-wider"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 