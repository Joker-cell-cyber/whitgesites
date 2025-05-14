"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COMPANY } from '../../app/constants/company';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if popup was shown in this session
    const hasShown = localStorage.getItem('newsletterShown');
    if (!hasShown) {
      // Show popup after user has spent some time on the site
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('newsletterShown', 'true');
      }, 30000); // 30 seconds
      
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-xl max-w-md w-full p-8 shadow-2xl border border-gray-800"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          <>
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0078D7] to-[#00B2A9] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white text-center">Join Our Newsletter</h2>
              <p className="text-gray-400 text-center mt-2">
                Get the latest {COMPANY.serviceName} updates, features and special offers delivered directly to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00B2A9] focus:border-transparent text-white"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-600'
                    : 'bg-gradient-to-r from-[#0078D7] to-[#00B2A9] hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400">
              You&apos;ve been successfully subscribed to our newsletter.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
} 