"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactMap() {
  return (
    <section className="py-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800 shadow-xl"
      >
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(COMPANY.address)}&zoom=14`}
        ></iframe>
        
        {/* Overlay to allow clicking on map */}
        <div className="absolute inset-0 bg-black opacity-0"></div>
        
        {/* Gradient overlay at the bottom */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"
          style={{ pointerEvents: 'none' }}
        ></div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-beat-purple-500/20 animate-pulse"></div>
        <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-beat-gold-500/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="absolute left-4 bottom-4 bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 max-w-xs">
          <h3 className="font-bold text-white">{COMPANY.serviceName} Studio</h3>
          <p className="text-gray-300 text-sm mt-1">
            {COMPANY.address.split(',').map((part, index) => (
              <span key={index}>
                {part.trim()}<br />
              </span>
            ))}
            United States
          </p>
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center mt-3 text-sm text-beat-purple-400 hover:text-beat-purple-300"
          >
            <span>Get Directions</span>
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
} 