"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '@/app/constants/company';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if popup was shown in this session
    const hasShown = sessionStorage.getItem('newsletterShown');
    if (!hasShown) {
      // Show popup after user has spent some time on the site
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('newsletterShown', 'true');
      }, 45000); // 45 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close popup after success message is shown
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">Get Organized with Our Newsletter</h3>
              <p className="text-gray-600">
                Subscribe to our newsletter for organizational tips, productivity hacks, and exclusive offers.
              </p>
            </div>
            
            {isSuccess ? (
              <div className="text-center py-4">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg font-medium text-gray-800">Thank you for subscribing!</p>
                <p className="text-gray-600 mt-1">You&apos;ll receive updates from {COMPANY.serviceName} soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-notion-accent-500 focus:border-notion-accent-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-notion-accent-500 text-white rounded-md hover:bg-notion-accent-600 transition-colors font-medium ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  By subscribing, you agree to our <a href="#" className="underline" onClick={(e) => {
                    e.preventDefault();
                    window.open('/legal/privacy', '_blank');
                  }}>Privacy Policy</a>. You can unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 