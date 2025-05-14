"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-white" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-ug-blue-100/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-ug-blue-50/50 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-ug-blue-100/30 to-ug-blue-200/30 rounded-full filter blur-2xl animate-float"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-ug-blue-50 text-ug-blue-700 border border-ug-blue-100">
              <span className="flex h-2 w-2 rounded-full bg-ug-blue-500 mr-2"></span>
              UGC Creator Sourcing Platform
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold text-ug-gray-900">
              Connect with the <span className="gradient-text">Perfect UGC Creators</span> for Your <span className="relative">
                <span className="relative z-10">Brand</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-ug-blue-200" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-ug-gray-600 md:text-2xl leading-relaxed">
              Find authentic creators who understand your audience and scale your content production efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 text-white rounded-lg font-medium button-glow text-center"
              >
                View Packages
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg border border-ug-gray-200 bg-white">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="UGC creator filming content"
                  width={1000}
                  height={562}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-ug-blue-400 to-ug-blue-300 rounded-full filter blur-xl opacity-30"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-white rounded-lg shadow-md border border-ug-gray-200 rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-ug-gray-900 font-medium">Pre-Vetted</div>
                  <div className="text-ug-gray-600 text-sm">Quality Creators</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-white rounded-lg shadow-md border border-ug-gray-200 -rotate-6 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-ug-gray-900 font-medium">Quick Match</div>
                  <div className="text-ug-gray-600 text-sm">Fast Turnaround</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 