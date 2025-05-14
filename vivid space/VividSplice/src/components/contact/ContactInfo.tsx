"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group h-full"
    >
      {/* Card glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-turquoise-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      
      {/* Main card */}
      <div className="relative bg-[#1a1a24] border border-gray-800/50 text-white rounded-xl shadow-xl p-8 backdrop-blur-sm h-full">
        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-turquoise-500 font-display">Contact Information</h2>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-turquoise-500/10 p-3 rounded-lg border border-gray-800/50">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-turquoise-400" 
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
              <h3 className="text-lg font-medium text-blue-400 font-display">Our Location</h3>
              <p className="mt-1 text-gray-300">{COMPANY.address}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-turquoise-500/10 p-3 rounded-lg border border-gray-800/50">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-turquoise-400" 
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
              <h3 className="text-lg font-medium text-blue-400 font-display">Email Us</h3>
              <p className="mt-1">
                <a 
                  href={`mailto:${COMPANY.email}`}
                  className="text-gray-300 hover:text-turquoise-400 transition-colors duration-200"
                >
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-turquoise-500/10 p-3 rounded-lg border border-gray-800/50">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-turquoise-400" 
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
              <h3 className="text-lg font-medium text-blue-400 font-display">Call Us</h3>
              <p className="mt-1">
                <a 
                  href={`tel:${COMPANY.phone}`}
                  className="text-gray-300 hover:text-turquoise-400 transition-colors duration-200"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Monday to Friday, 9AM to 6PM EST
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <h3 className="text-lg font-medium text-blue-400 font-display mb-4">Business Hours</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800/30">
              <span>Monday - Friday:</span>
              <span className="px-3 py-1 rounded-full bg-[#22222c] text-turquoise-400 text-sm font-accent">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800/30">
              <span>Saturday:</span>
              <span className="px-3 py-1 rounded-full bg-[#22222c] text-blue-400 text-sm font-accent">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sunday:</span>
              <span className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-sm font-accent">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 