"use client";

import { useState, useEffect } from 'react';
import { COMPANY } from '@/lib/company';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    if (!hasSeenPopup) {
      // Show the popup after a delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Remember that user has seen the popup
    localStorage.setItem('newsletterPopupSeen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setIsSuccess(true);
      setEmail('');
      
      // Close popup after success
      setTimeout(() => {
        closePopup();
      }, 3000);
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-md bg-[#0c1424] border border-gray-800 rounded-xl shadow-xl pixel-corners relative">
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          <div className="w-12 h-12 mb-4 mx-auto bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/20 rounded-full flex items-center justify-center border border-toxic-green-500/30">
            <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Join Our Elite Squad
          </h2>
          
          <p className="text-gray-400 text-center mb-6">
            Subscribe to receive exclusive offers, gaming tips, and tactical updates from {COMPANY.serviceName}.
          </p>
          
          {isSuccess ? (
            <div className="bg-toxic-green-900/20 border border-toxic-green-700 rounded-lg p-4 text-center">
              <p className="text-toxic-green-400 font-mono">
                SUBSCRIPTION SUCCESSFUL! WELCOME TO THE ELITE.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-toxic-green-500 focus:border-toxic-green-500 text-white font-mono"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gradient-to-r from-toxic-green-600 to-toxic-green-500 text-white font-medium rounded-lg hover:from-toxic-green-500 hover:to-toxic-green-400 transition-colors font-mono flex items-center justify-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                SUBSCRIBE NOW
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy and will never share your information.
                You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 