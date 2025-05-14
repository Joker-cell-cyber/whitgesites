"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user has already seen and closed the popup
    const popupClosed = localStorage.getItem("newsletterPopupClosed");
    
    if (!popupClosed) {
      // Show popup after a delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem("newsletterPopupClosed", "true");
    setIsVisible(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Here you would normally send this to your newsletter API
    // For now, we'll just simulate success
    setSubscribed(true);
    setError("");
    
    // Close popup after success message is shown
    setTimeout(() => {
      closePopup();
    }, 3000);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-[#1F2937] to-[#111827] border border-gray-800 rounded-xl shadow-xl max-w-md w-full relative overflow-hidden"
          >
            {/* Close button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
                  Get Lead Generation Tips
                </h2>
                <p className="text-gray-300">
                  Subscribe to our newsletter for exclusive insights and strategies to generate better leads.
                </p>
              </div>
              
              {subscribed ? (
                <div className="text-center py-4">
                  <svg className="h-16 w-16 text-lead-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300">You&apos;ve been successfully subscribed to our newsletter.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lead-blue-500"
                      placeholder="your@email.com"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-lead-blue-600 to-lead-green-500 hover:from-lead-blue-700 hover:to-lead-green-600 transition-all"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By subscribing, you agree to our <a href="/legal/privacy" className="text-lead-blue-400 hover:underline">Privacy Policy</a>. We&apos;ll never share your information.
              </p>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 flex items-center justify-center">
                  <span className="mr-1">Powered by</span> 
                  <span className="font-medium">{COMPANY.serviceName}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 