"use client";

import { motion } from "framer-motion";

export default function ContactMap() {
  return (
    <div className="relative rounded-lg overflow-hidden h-[500px] w-full">
      <iframe
        className="w-full h-full border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047564215!2d2.3298984000000003!3d48.8738776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e38f817b0a5%3A0xcfc3870abe570cd1!2sPro%20Translator!5e0!3m2!1sen!2sfr!4v1636554245844!5m2!1sen!2sfr"
        style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
        loading="lazy"
      ></iframe>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none"></div>
      
      {/* Map pin with animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="h-5 w-5 bg-blue-500 rounded-full animate-ping absolute"></div>
          <div className="h-5 w-5 bg-blue-500 rounded-full relative"></div>
          <div className="h-12 w-12 bg-indigo-600/20 backdrop-blur rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </div>
      
      {/* Contact info card */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-3xl mx-auto px-4 md:px-0 mb-6">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1a1a1a]/90 backdrop-blur-sm p-6 rounded-lg border border-indigo-800/20 glass-effect"
          >
            <h3 className="text-xl font-bold mb-4">ProTranslator Paris Office</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300">123 Boulevard Haussmann</p>
                <p className="text-gray-300">75008 Paris, France</p>
                <a 
                  href="https://goo.gl/maps/JgCkRxWkjfZB8TmK8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  <span>Get directions</span>
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              <div>
                <p className="text-gray-300">Email: contact@protranslator.com</p>
                <p className="text-gray-300">Phone: +33 (0)1 XX XX XX XX</p>
                <p className="text-gray-300 mt-2">Monday-Friday: 9am - 6pm</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 