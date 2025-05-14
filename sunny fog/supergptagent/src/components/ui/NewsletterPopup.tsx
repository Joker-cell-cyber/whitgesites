"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '../../app/constants/company';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
  useEffect(() => {
    // Wait 10 seconds before showing the popup
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      localStorage.setItem('newsletterPopupSeen', 'true');
      
      // Close popup after success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupSeen', 'true');
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#121218] rounded-xl shadow-2xl border border-ai-blue-500/30 overflow-hidden"
          >
            {/* Top decorative element */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-blue-500 to-ai-purple-500"></div>
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 rounded-lg bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
                <p className="text-gray-400">
                  Subscribe to our newsletter to receive updates about new AI agent features and industry insights.
                </p>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-900/20 text-green-400 p-4 rounded-lg border border-green-800">
                  <p className="text-center">Thanks for subscribing! We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 bg-[#1a1a24] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-ai-blue-500"
                    />
                  </div>
                  
                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-sm">
                      There was an error subscribing. Please try again.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-lg font-medium ${
                      isSubmitting 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white hover:from-ai-blue-700 hover:to-ai-purple-700'
                    } transition-colors duration-200`}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to our <a href="/legal/privacy" className="text-ai-blue-400 hover:underline">Privacy Policy</a> and to receive marketing emails from {COMPANY.serviceName}. You can opt out anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 