"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '@/app/constants/company';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      localStorage.setItem('hasSeenNewsletterPopup', 'true');
      
      // Close popup after showing success message
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-gradient-to-br from-[#1e293b] to-[#111827] border border-indigo-800/30 rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center text-white mb-2">
                Subscribe to Our Newsletter
              </h2>
              
              <p className="text-gray-300 text-center mb-6">
                Stay updated with our latest translation services, language tips, and special offers.
              </p>
              
              {isSuccess ? (
                <div className="bg-green-900/30 border border-green-800/30 rounded-lg p-4 text-center">
                  <p className="text-green-400">
                    Thank you for subscribing! We&apos;ll keep you updated with our latest news.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 bg-gray-900 border border-indigo-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 rounded-md font-medium text-white ${
                      isSubmitting
                        ? 'bg-blue-800/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    }`}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to our <a href="/legal/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 py-3 px-6 text-center">
              <p className="text-sm text-gray-400">
                Join {COMPANY.serviceName}&apos;s community of global communicators
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 