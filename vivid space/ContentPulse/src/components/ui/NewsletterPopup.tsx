"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const popupSeen = localStorage.getItem("newsletterPopupSeen");
    if (!popupSeen) {
      // If not, show the popup after a delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem("newsletterPopupSeen", "true");
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Simulate form submission
    setError("");
    setSuccess(true);
    localStorage.setItem("newsletterPopupSeen", "true");
    
    // Close popup after success message is shown
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full mx-4 relative">
        <button 
          onClick={closePopup} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="mb-5">
          <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center text-turquoise-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Join Our Newsletter</h3>
          <p className="text-gray-600">
            Subscribe to our newsletter to receive updates on our latest content, exclusive offers, and SEO tips.
          </p>
        </div>
        
        {success ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
            <p className="font-medium">Thank you for subscribing!</p>
            <p className="text-sm mt-1">We've sent a confirmation to your email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500"
                placeholder="you@example.com"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-turquoise-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-turquoise-700 transition-colors"
            >
              Subscribe
            </button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              By subscribing, you agree to our{" "}
              <a href="/legal/privacy" className="text-turquoise-600 hover:underline">
                Privacy Policy
              </a> and{" "}
              <a href="/legal/terms" className="text-turquoise-600 hover:underline">
                Terms of Service
              </a>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 