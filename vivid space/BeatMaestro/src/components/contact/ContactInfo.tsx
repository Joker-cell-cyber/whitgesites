"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#1a1a24] border border-gray-800/30 text-white rounded-lg shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500">Contact Information</h2>
      
      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="bg-beat-purple-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-beat-purple-400" 
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
            <h3 className="text-lg font-medium text-beat-gold-400">Our Location</h3>
            <p className="mt-1">{COMPANY.address}</p>
            <p className="text-sm text-gray-400 mt-1">In-person and online sessions available</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-beat-purple-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-beat-purple-400" 
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
            <h3 className="text-lg font-medium text-beat-gold-400">Email Us</h3>
            <p className="mt-1">
              <a 
                href={`mailto:${COMPANY.email}`} 
                className="hover:text-beat-purple-400 transition-colors duration-200"
              >
                {COMPANY.email}
              </a>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-beat-purple-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-beat-purple-400" 
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
            <h3 className="text-lg font-medium text-beat-gold-400">Call Us</h3>
            <p className="mt-1">
              <a 
                href={`tel:${COMPANY.phone}`} 
                className="hover:text-beat-purple-400 transition-colors duration-200"
              >
                {COMPANY.phone}
              </a>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Monday to Saturday, 10AM to 7PM EST
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-800">
        <h3 className="text-lg font-medium text-beat-gold-400 mb-4">Coaching Hours</h3>
        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>10:00 AM - 7:00 PM EST</span>
          </p>
          <p className="flex justify-between">
            <span>Saturday:</span>
            <span>11:00 AM - 5:00 PM EST</span>
          </p>
          <p className="flex justify-between">
            <span>Sunday:</span>
            <span>By appointment only</span>
          </p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-800">
        <h3 className="text-lg font-medium text-beat-gold-400 mb-4">Our Coaching Process</h3>
        <ol className="space-y-3 list-decimal pl-5">
          <li className="text-gray-300">
            <span className="font-medium text-white">Initial Consultation</span> - After booking, we&apos;ll have a 15-minute call to understand your goals
          </li>
          <li className="text-gray-300">
            <span className="font-medium text-white">Session Planning</span> - We&apos;ll create a customized coaching plan based on your needs
          </li>
          <li className="text-gray-300">
            <span className="font-medium text-white">Regular Sessions</span> - Weekly or bi-weekly coaching sessions via Zoom or in-person
          </li>
          <li className="text-gray-300">
            <span className="font-medium text-white">Follow-up Support</span> - Email support between sessions to answer your questions
          </li>
        </ol>
      </div>
    </motion.div>
  );
} 