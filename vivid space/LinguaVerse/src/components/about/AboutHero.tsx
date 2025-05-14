"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{COMPANY.serviceName}</span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Bridging language barriers with accurate, reliable, and culturally-sensitive translation services.
          </p>
          
          <div className="flex justify-center space-x-3">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <div className="h-1 w-4 bg-blue-500/40 rounded-full"></div>
            <div className="h-1 w-4 bg-indigo-500/40 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 