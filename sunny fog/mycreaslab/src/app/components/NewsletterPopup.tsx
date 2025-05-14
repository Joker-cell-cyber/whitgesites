"use client";

import { useState, useEffect } from 'react';
import { COMPANY } from '../constants/company';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    
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
    // Remember that the user has seen the popup
    localStorage.setItem('newsletter-popup-seen', 'true');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    localStorage.setItem('newsletter-subscribed', 'true');
    
    // Close popup after 2 seconds
    setTimeout(() => {
      closePopup();
    }, 2000);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-300">
                  Join our mailing list for the latest updates, exclusive offers, and creative inspiration.
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium rounded-lg ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-500 hover:to-teal-400'
                  } transition duration-200`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                By subscribing, you agree to receive marketing emails from {COMPANY.serviceName}. 
                You can unsubscribe at any time.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 mb-4">
                <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-300">
                You've successfully subscribed to our newsletter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 