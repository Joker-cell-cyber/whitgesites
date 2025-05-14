"use client";

import { motion } from "framer-motion";
import { COMPANY } from "../../app/constants/company";

export default function ContactMap() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Our Location</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visit our office or send your inquiries via mail to our physical address.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-96 bg-gray-800"
      >
        {/* This would normally be a real map, but here's a placeholder with styling */}
        <div className="absolute inset-0 bg-[#1a1a1a] overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-111.789,33.353,13,0/1200x400?access_token=pk.placeholder')] bg-no-repeat bg-cover"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 bg-vid-red-500 rounded-full animate-ping absolute"></div>
            <div className="h-5 w-5 bg-vid-red-500 rounded-full relative"></div>
          </div>
        </div>
        
        <div className="absolute left-4 bottom-4 bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 max-w-xs">
          <h3 className="font-bold text-white">{COMPANY.serviceName} Headquarters</h3>
          <p className="text-gray-300 text-sm mt-1">
            {COMPANY.address}<br />
            United States
          </p>
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center mt-3 text-sm text-vid-red-400 hover:text-vid-red-300"
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