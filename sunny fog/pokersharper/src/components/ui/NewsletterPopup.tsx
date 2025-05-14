"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COMPANY } from '../../app/constants/company';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = sessionStorage.getItem('newsletter-popup-seen');
    if (!hasSeenPopup) {
      // Show popup after 30 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('newsletter-popup-seen', 'true');
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here would normally be the code to submit to an API
    // Instead we'll just simulate success
    setTimeout(() => {
      setSubmitted(true);
      // Auto close after successful submission
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <div className="absolute inset-0 backdrop-blur-sm" onClick={handleClose}></div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-felt-800 to-felt-900 border border-gray-700 rounded-xl shadow-2xl p-6 max-w-md w-full relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-poker-red-500 to-chip-gold-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-felt-900 rounded-full flex items-center justify-center">
                  <span className="text-3xl">♠</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2 font-playfair">Join Our Poker Strategy Newsletter</h2>
              <p className="text-gray-300 font-raleway">
                Get weekly tips, strategies, and exclusive offers to improve your poker game.
              </p>
            </div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-chip-gold-500 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-poker-red-600 to-poker-red-700 hover:from-poker-red-500 hover:to-poker-red-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Subscribe Now
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-white font-medium text-lg">Thanks for subscribing!</p>
                <p className="text-gray-400 mt-1">You'll receive our next newsletter soon.</p>
              </div>
            )}
            
            <p className="text-xs text-gray-400 mt-6 text-center font-raleway">
              By subscribing, you agree to our{' '}
              <a href="/legal/privacy" className="text-chip-gold-400 hover:underline">Privacy Policy</a>. 
              You can unsubscribe at any time.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 