"use client";

import { useState, useEffect } from "react";
import { COMPANY } from "@/app/constants/company";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem("newsletterPopupSeen");
    
    if (!hasSeenPopup) {
      // Show popup after user has been on the site for a while
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000); // 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const closePopup = () => {
    setIsOpen(false);
    // Mark that user has seen the popup
    localStorage.setItem("newsletterPopupSeen", "true");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Here you would typically send the email to your newsletter service
    // For this example, we'll just simulate a successful subscription
    setIsSubscribed(true);
    
    // Close the popup after a delay
    setTimeout(() => {
      closePopup();
    }, 2000);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
        {/* Accent line at top */}
        <div className="h-3 bg-gradient-to-r from-flow-green-500 to-flow-teal-500"></div>
        
        {/* Close button */}
        <button onClick={closePopup} className="absolute top-5 right-5 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-flow-green-500">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="p-8">
          {!isSubscribed ? (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Join our newsletter to receive the latest updates on automation trends, tips, and exclusive offers.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-flow-green-500 focus:border-flow-green-500 text-gray-900"
                  />
                  {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-flow-green-500 to-flow-teal-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to receive marketing emails from {COMPANY.serviceName}. 
                You can unsubscribe at any time.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Thank You!</h2>
              <p className="text-gray-600">
                You've been successfully subscribed to our newsletter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 