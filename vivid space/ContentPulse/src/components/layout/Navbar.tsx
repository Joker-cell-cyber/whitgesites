"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
              ContentPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-800 hover:text-indigo-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-800 hover:text-indigo-500 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-800 hover:text-indigo-500 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white py-2 rounded-lg shadow-lg">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="block mx-4 mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 