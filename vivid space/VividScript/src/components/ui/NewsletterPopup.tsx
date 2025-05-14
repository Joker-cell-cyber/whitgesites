"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { COMPANY } from '@/app/constants/company';

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds if the user hasn't dismissed it before
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('newsletter-popup-seen', 'true');
    setShowPopup(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this to your API
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    
    // Close popup after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-vid-blue-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-vid-blue-900 rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden glass-effect">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-vid-blue-400 hover:text-vid-blue-600"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          {!submitted ? (
            <>
              <h3 className="text-2xl font-bold mb-2 gradient-text heading-font">
                Get Script Writing Tips
              </h3>
              <p className="text-vid-blue-700 mb-6">
                Join our newsletter to receive expert script writing tips, industry trends, and exclusive offers from {COMPANY.serviceName}.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-vid-blue-600 mb-1 heading-font">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-vid-white-100 border border-vid-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-vid-blue-400 text-vid-blue-900"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-accent hover:bg-accent-hover text-white rounded-md transition-colors font-medium button-glow heading-font"
                >
                  Subscribe Now
                </button>
              </form>
              
              <p className="text-xs text-vid-blue-500 mt-4">
                By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
                We respect your privacy and will never share your information.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 heading-font">Thanks for Subscribing!</h3>
              <p className="text-vid-blue-600">Check your inbox soon for script writing tips and exclusive offers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 