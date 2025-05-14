"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 opacity-50 rounded-xl blur-lg group-hover:opacity-80 transition-opacity duration-300"></div>
      <div className="relative backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 group-hover:translate-y-[-5px] transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
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
              <h3 className="text-lg font-medium text-white">Our Location</h3>
              <p className="mt-1 text-indigo-200">{COMPANY.address}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
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
              <h3 className="text-lg font-medium text-white">Email Us</h3>
              <p className="mt-1">
                <a 
                  href={`mailto:${COMPANY.email}`}
                  className="text-indigo-200 hover:text-pink-300 transition-colors duration-200"
                >
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
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
              <h3 className="text-lg font-medium text-white">Call Us</h3>
              <p className="mt-1">
                <a 
                  href={`tel:${COMPANY.phone}`} 
                  className="text-indigo-200 hover:text-pink-300 transition-colors duration-200"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p className="text-sm text-indigo-300 mt-1">
                Monday to Friday, 9AM to 6PM EST
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">Business Hours</h3>
          <div className="space-y-2 text-indigo-200">
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
      </div>
    </motion.div>
  );
} 