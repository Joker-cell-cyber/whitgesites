"use client";

import { motion } from "framer-motion";

export default function ContactMap() {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-ug-gray-900">Our Location</h2>
          <p className="text-ug-gray-600 max-w-2xl mx-auto">
            Visit our office or send your inquiries via mail to our physical address.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-96 bg-ug-gray-100"
      >
        {/* This would normally be a real map, but here's a placeholder with styling */}
        <div className="absolute inset-0 bg-ug-gray-100 overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-73.9866,40.7306,13,0/1200x400?access_token=pk.placeholder')] bg-no-repeat bg-cover"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 bg-vivid-500 rounded-full animate-ping absolute"></div>
            <div className="h-5 w-5 bg-vivid-500 rounded-full relative"></div>
          </div>
        </div>
        
        <div className="absolute left-4 bottom-4 bg-white p-4 rounded-lg shadow-md border border-ug-gray-200 max-w-xs">
          <div className="flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-vivid-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-vivid-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-ug-gray-900">FindYourCreator Headquarters</h3>
            <p className="text-ug-gray-700 text-sm mt-1">
              123 Business Avenue<br />
              New York, NY 10001<br />
              United States
            </p>
            <a 
              href="https://maps.google.com/?q=123+Business+Avenue+New+York+NY+10001" 
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center mt-3 text-sm text-vivid-600 hover:text-vivid-800"
            >
              <span>Get Directions</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 