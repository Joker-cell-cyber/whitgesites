"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function AboutHero() {
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-gray-900">About</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-500 to-purple-500">
              {COMPANY.serviceName}
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transforming the way people approach meal planning and nutrition through science-backed, chef-crafted meal plans for every lifestyle.
          </motion.p>
        </div>
      </div>
      
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-turquoise-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -top-8 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
} 