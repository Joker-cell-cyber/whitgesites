"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 py-28">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-950/50 border border-teal-800/50 text-teal-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></span>
            <span className="text-sm font-medium">Our Story</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            We're {COMPANY.serviceName}
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            We build high-converting landing pages that help growing businesses capture more leads and drive more sales.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 