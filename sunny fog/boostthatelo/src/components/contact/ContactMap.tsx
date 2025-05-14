"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactMap() {
  return (
    <section className="py-20 bg-[#070a14]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-10"
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Us</span>
        </h2>
        
        <div className="relative w-full h-80 md:h-96 bg-gray-900 rounded-2xl overflow-hidden">
          <iframe 
            title="Map"
            className="absolute inset-0 w-full h-full"
            frameBorder="0" 
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(COMPANY.address)}`}
            allowFullScreen
          />
          
          <div className="absolute left-4 bottom-4 bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 max-w-xs">
            <h3 className="font-bold text-white">{COMPANY.serviceName} Headquarters</h3>
            <p className="text-gray-300 text-sm mt-1">
              {COMPANY.address.split(',').map((line, i) => (
                <span key={i}>
                  {line.trim()}<br />
                </span>
              ))}
              United States
            </p>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center mt-3 text-sm text-blue-400 hover:text-blue-300"
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