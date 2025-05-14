"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already interacted with the popup
    const hasInteracted = localStorage.getItem("newsletter-popup-shown");
    
    if (!hasInteracted) {
      // Show popup after 15 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    // Mark popup as shown in local storage
    localStorage.setItem("newsletter-popup-shown", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      // Close popup after success message
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden relative"
          >
            {/* Close button - repositioned and styled */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
              aria-label="Close newsletter popup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-gradient-to-r from-turquoise-600 to-purple-500 p-1">
              {/* Close button moved out of this div */}
            </div>
            
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-turquoise-600 to-purple-500">
                Get Exclusive Meal Plans
              </h3>
              
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter and receive exclusive meal planning tips, seasonal recipes, and special offers!
              </p>
              
              {submitted ? (
                <div className="bg-turquoise-50 text-turquoise-700 p-4 rounded-lg border border-turquoise-200 text-center">
                  <p className="font-medium">Thank you for subscribing!</p>
                  <p className="text-sm mt-1">Check your inbox for a welcome email.</p>
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
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-turquoise-600 to-purple-500 text-white rounded-lg transition-colors hover:from-turquoise-700 hover:to-purple-600 font-medium"
                  >
                    Subscribe Now
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to receive marketing emails from {COMPANY.serviceName}. You can unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 