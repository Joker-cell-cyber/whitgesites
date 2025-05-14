"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="card-apex p-8"
    >
      <h2 className="text-2xl font-bold gradient-text mb-6">Contact Information</h2>
      
      <p className="text-gray-300 mb-8">
        Our support team is ready to help with any questions you have about our boosting services.
        We aim to respond to all inquiries within 24 hours.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-rank-emerald-900/30 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-rank-emerald-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-rank-emerald-400">Address</h3>
            <p className="mt-1 text-gray-300">
              {COMPANY.address}
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-rank-orange-900/30 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-rank-orange-400" 
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
          <div>
            <h3 className="text-lg font-medium text-rank-orange-400">Email Us</h3>
            <p className="mt-1">
              <a 
                href={`mailto:${COMPANY.email}`}
                className="hover:text-rank-orange-400 transition-colors duration-200"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-rank-emerald-900/30 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-rank-emerald-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-rank-emerald-400">Call Us</h3>
            <p className="mt-1">
              <a 
                href={`tel:${COMPANY.phone}`} 
                className="hover:text-rank-emerald-400 transition-colors duration-200"
              >
                {COMPANY.phone}
              </a>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              24/7 Customer Support
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-rank-emerald-900/30">
        <h3 className="text-lg font-medium text-rank-orange-400 mb-4">Business Hours</h3>
        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Saturday:</span>
            <span>10:00 AM - 4:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Sunday:</span>
            <span>Closed</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
} 