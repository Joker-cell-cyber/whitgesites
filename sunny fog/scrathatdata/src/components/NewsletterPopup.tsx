'use client';

import { useState, useEffect } from 'react';
import { COMPANY } from '@/app/constants/company';

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupSeen', 'true');
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      localStorage.setItem('newsletterPopupSeen', 'true');
      
      // Close popup after showing success message
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated!</h3>
          
          {!hasSubmitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest news, updates, and special offers from {COMPANY.serviceName}!
              </p>
              
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {error && <p className="mt-1 text-sm text-red-600 text-left">{error}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-primary-dark transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              <p className="mt-4 text-xs text-gray-500">
                By subscribing, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to receive our newsletter emails.
              </p>
            </>
          ) : (
            <div className="py-4">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h4>
              <p className="text-gray-600">
                You've successfully subscribed to our newsletter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 