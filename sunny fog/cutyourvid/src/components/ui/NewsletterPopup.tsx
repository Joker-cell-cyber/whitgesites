"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { COMPANY } from '@/app/constants/company';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already closed the popup
    const hasClosedPopup = localStorage.getItem('newsletterPopupClosed');
    
    // Show popup after 20 seconds if not dismissed before
    if (!hasClosedPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Remember that user has closed popup for 7 days
    localStorage.setItem('newsletterPopupClosed', 'true');
    // Set expiry for 7 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem('newsletterPopupExpiry', expiryDate.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Close popup after showing thank you message
      setTimeout(() => {
        closePopup();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div 
        className="relative bg-[#1a1a1a] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
        </button>
        
        <div className="p-6">
          {!submitted ? (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-vid-red-600 to-vid-orange-500 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Get Video Editing Tips
              </h2>
              
              <p className="text-gray-400 text-center mb-6">
                Subscribe to our newsletter for exclusive video editing tips, trends, and special offers.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-vid-red-500 focus:border-vid-red-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg font-medium transition-colors ${
                    isSubmitting ? 'opacity-70' : ''
                  }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By subscribing, you agree to our{' '}
                  <a href="/legal/privacy" className="text-vid-red-400 hover:underline">
                    Privacy Policy
                  </a>
                  . You can unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Thank You for Subscribing!</h3>
              
              <p className="text-gray-400">
                We've sent a confirmation email to <span className="text-white font-medium">{email}</span>. Please check your inbox to complete the subscription.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 