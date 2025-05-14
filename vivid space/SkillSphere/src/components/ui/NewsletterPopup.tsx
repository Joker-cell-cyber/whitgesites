"use client";

import { useState, useEffect } from 'react';
import { COMPANY } from '@/app/constants/company';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupSeen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful submission
    setSubmitted(true);
    // Close popup after 2 seconds
    setTimeout(() => {
      closePopup();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md bg-[#14172c] rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44D62C] to-[#00FFFF]">
                Level Up Your Game
              </span>
            </h2>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for exclusive tips, coaching discounts, and gaming strategies!
            </p>
          </div>
          
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-400">Thanks for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#44D62C] to-[#00FFFF] text-white py-3 rounded-lg font-medium transition-transform hover:scale-105"
              >
                Subscribe Now
              </button>
            </form>
          )}
          
          <p className="text-xs text-gray-500 mt-6 text-center">
            By subscribing, you agree to our <a href="/legal/privacy" className="text-[#44D62C] hover:underline">Privacy Policy</a> and 
            consent to receive updates from {COMPANY.serviceName}.
          </p>
        </div>
      </div>
    </div>
  );
} 