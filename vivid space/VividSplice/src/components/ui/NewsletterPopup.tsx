"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '@/app/constants/company';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user has dismissed the popup before
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    
    if (!hasSeenPopup) {
      // Show popup after user has been on the site for a while
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Set flag in localStorage
    localStorage.setItem('newsletterPopupSeen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Here you would typically send the email to your API
    // For this demo, we'll just simulate success
    setTimeout(() => {
      // Reset error if any
      setError('');
      setIsSubmitting(false);
      
      // Show success message
      setIsSubmitted(true);
      
      // Close popup after a delay
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => {
            // Close if background is clicked
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-md w-full glass-effect p-8 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold font-display text-white">
                {isSubmitted ? 'Thank You for Subscribing!' : 'Get Pro Editing Tips'}
              </h3>
              
              {!isSubmitted && (
                <p className="text-gray-300 mt-2">
                  Subscribe to our newsletter for exclusive video editing tips and special offers.
                </p>
              )}
            </div>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-turquoise-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-200">
                  We've sent a confirmation email to <span className="text-white font-medium">{email}</span>. 
                  We'll keep you updated with the latest video editing trends and exclusive deals!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                  {error && <p className="mt-2 text-sm text-violet-400">{error}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-turquoise-500 rounded-lg text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] font-accent ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
                
                <p className="text-gray-500 text-xs mt-4 text-center">
                  By subscribing, you agree to our <a href="/legal/privacy" className="text-turquoise-400 hover:underline">Privacy Policy</a>.
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
            
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-blue-600/30 to-turquoise-600/30 rounded-full filter blur-xl"></div>
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-full filter blur-xl"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 