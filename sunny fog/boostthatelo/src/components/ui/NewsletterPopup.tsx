"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { COMPANY } from "@/app/constants/company";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if the popup has been dismissed before
    const hasPopupBeenShown = localStorage.getItem("newsletterPopupShown");
    
    // If not, set a timer to show it after 30 seconds
    if (!hasPopupBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Remember that we've shown the popup to this user
    localStorage.setItem("newsletterPopupShown", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate a form submission
    setShowSuccess(true);
    
    // Close the popup after 2 seconds
    setTimeout(() => {
      closePopup();
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full relative">
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
            Boost Your Gaming Experience
          </h2>
          <p className="text-gray-300">
            Subscribe to our newsletter for exclusive boosting deals, gaming tips, and more!
          </p>
        </div>
        
        {showSuccess ? (
          <div className="text-center p-4 bg-green-900/30 border border-green-700 rounded-lg">
            <p className="text-green-400 font-medium">
              Thanks for subscribing! Check your inbox soon.
            </p>
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
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-white hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Subscribe Now
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              By subscribing, you agree to receive marketing emails from {COMPANY.serviceName}. 
              You can unsubscribe at any time. View our{" "}
              <a href="/legal/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 