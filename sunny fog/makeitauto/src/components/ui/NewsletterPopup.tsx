"use client";

import { useState, useEffect } from "react";
import { COMPANY } from "@/app/constants/company";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
    
    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that the user has seen the popup
    localStorage.setItem("newsletter-popup-seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsOpen(false);
      // Remember that the user has seen the popup
      localStorage.setItem("newsletter-popup-seen", "true");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Decorative header */}
        <div className="h-3 bg-gradient-to-r from-make-purple-500 to-make-blue-500"></div>
        
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-make-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-make-purple-500">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600">
                Your subscription has been confirmed. You'll hear from us soon!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Stay Updated with {COMPANY.serviceName}
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest automation tips, tutorials, and special offers.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                    placeholder="you@example.com"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-make-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-make-purple-700 transition-colors"
                >
                  Subscribe
                </button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By subscribing, you agree to our <button type="button" onClick={() => document.dispatchEvent(new CustomEvent('openPrivacyPolicy'))} className="text-make-purple-600 hover:underline">Privacy Policy</button>. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 