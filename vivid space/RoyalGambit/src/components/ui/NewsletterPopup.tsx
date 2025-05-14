"use client";

import React, { useState } from 'react';
import { COMPANY } from '@/app/constants/company';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real application, you would submit to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Store in localStorage to remember that user has subscribed
      localStorage.setItem('newsletterSubscribed', 'true');
    } catch (_) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form state when closing
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 300);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-[#0c1d3d] to-[#081326] rounded-xl max-w-md w-full p-8 shadow-2xl border border-[#1e365a]">
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

        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full bg-[#081326] border ${
                  error ? 'border-red-500' : 'border-[#1e365a]'
                } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-chess-gold-500`}
                disabled={isSubmitting}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 hover:from-chess-blue-700 hover:to-chess-gold-600 text-white font-medium rounded-lg py-3 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chess-gold-500"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By subscribing, you agree to our <a href="/legal/privacy" className="text-chess-gold-400 hover:text-chess-gold-300">Privacy Policy</a>.
            </p>
          </form>
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
              You've been successfully subscribed to our newsletter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup; 