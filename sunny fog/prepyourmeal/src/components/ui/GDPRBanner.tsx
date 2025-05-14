"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function GDPRBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("gdpr-consent");
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdpr-consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200"
        >
          <div className="container mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0 sm:mr-8 text-gray-700">
                <p className="text-sm md:text-base">
                  We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                  By clicking &quot;Accept&quot;, you consent to our use of cookies. Read our{" "}
                  <Link href="/legal/cookies" className="text-nutrition-green-600 hover:underline">
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal/privacy" className="text-nutrition-green-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  to learn more.
                </p>
              </div>
              <div className="flex flex-shrink-0">
                <button
                  onClick={handleAccept}
                  className="mr-2 px-5 py-2 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white rounded-md font-medium"
                >
                  Accept
                </button>
                <Link
                  href="/legal/cookies"
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 