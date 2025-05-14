"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '../../app/constants/company';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    // Check if user has already seen and closed the popup
    const hasSeenPopup = localStorage.getItem('newsletterPopupClosed');
    
    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Remember that user has closed the popup
    localStorage.setItem('newsletterPopupClosed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to add subscriber
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      
      // Close popup after successful submission
      setTimeout(() => {
        closePopup();
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50"
            onClick={closePopup}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close popup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header */}
              <div className="bg-gradient-to-r from-book-blue-600 to-book-green-500 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
                <p className="text-white text-opacity-90">
                  Get expert writing tips and exclusive offers delivered to your inbox.
                </p>
              </div>
              
              {/* Form */}
              <div className="p-6">
                {submitStatus === 'success' ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      You&apos;ve been successfully subscribed to our newsletter.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="newsletter-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-book-blue-500 focus:border-book-blue-500"
                        placeholder={COMPANY.email}
                      />
                    </div>
                    
                    {submitStatus === 'error' && (
                      <div className="text-red-600 text-sm">
                        There was an error subscribing you to the newsletter. Please try again.
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                        isSubmitting ? 'bg-book-blue-400' : 'bg-gradient-to-r from-book-blue-600 to-book-green-500 hover:from-book-blue-700 hover:to-book-green-600'
                      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-book-blue-500`}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By subscribing, you agree to our {' '}
                      <a href="/legal/privacy" className="text-book-blue-600 hover:underline">Privacy Policy</a>
                      {' '} and {' '}
                      <a href="/legal/terms" className="text-book-blue-600 hover:underline">Terms of Service</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 