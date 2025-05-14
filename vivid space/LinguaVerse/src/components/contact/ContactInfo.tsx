"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mb-4">Get in Touch</h2>
        <p className="text-gray-300">
          Have questions about our translation services? Need a quote for your project? 
          Our team is ready to assist you.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-blue-400" 
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
            <h3 className="text-lg font-medium text-indigo-400">Our Location</h3>
            <p className="mt-1 text-gray-300">
              {COMPANY.address}
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-blue-400" 
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
            <h3 className="text-lg font-medium text-indigo-400">Email Us</h3>
            <p className="mt-1">
              <a 
                href={`mailto:info@${COMPANY.website}`}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                info@{COMPANY.website}
              </a>
            </p>
            <p className="mt-1">
              <a 
                href={`mailto:${COMPANY.email}`}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-blue-400" 
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
            <h3 className="text-lg font-medium text-indigo-400">Call Us</h3>
            <p className="mt-1">
              <a 
                href={`tel:${COMPANY.phone}`}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {COMPANY.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-lg font-medium text-indigo-400 mb-4">Languages We Support</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">English</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">Spanish</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">French</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">German</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">Chinese</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">Japanese</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50">+ 24 more</span>
        </div>
      </div>
    </motion.div>
  );
} 