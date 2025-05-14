"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="relative flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-yellow-500">
            MyCréasLab
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="font-medium text-gray-700 hover:text-teal-600 transition"
          >
            Home
          </Link>
          <Link 
            href="/packages" 
            className="font-medium text-gray-700 hover:text-teal-600 transition"
          >
            Our Packages
          </Link>
          <Link 
            href="/contact" 
            className="font-medium text-gray-700 hover:text-teal-600 transition"
          >
            Contact
          </Link>
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-teal-600 to-yellow-500 text-white font-medium py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            Start a project
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center"
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 flex flex-col items-end space-y-1">
            <span 
              className={`block h-0.5 rounded transition transform ${
                isMobileMenuOpen 
                  ? "w-6 bg-gray-800 rotate-45 translate-y-1.5" 
                  : "w-6 bg-gray-600"
              }`} 
            />
            <span 
              className={`block h-0.5 rounded transition transform ${
                isMobileMenuOpen 
                  ? "w-6 bg-gray-800 -rotate-45" 
                  : "w-5 bg-gray-600"
              }`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800 hover:text-teal-600 transition"
          >
            Home
          </Link>
          <Link 
            href="/packages" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800 hover:text-teal-600 transition"
          >
            Our Packages
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800 hover:text-teal-600 transition"
          >
            Contact
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 bg-gradient-to-r from-teal-600 to-yellow-500 text-white font-medium px-4 rounded-lg shadow-md"
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
} 