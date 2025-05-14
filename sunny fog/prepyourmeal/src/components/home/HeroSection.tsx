"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-nutrition-green-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-carrot-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-nutrition-green-600/10 to-carrot-600/10 rounded-full filter blur-2xl animate-float"></div>
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
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-nutrition-green-100 text-nutrition-green-700 backdrop-blur-sm border border-nutrition-green-200">
              <span className="flex h-2 w-2 rounded-full bg-nutrition-green-500 mr-2"></span>
              Nutrition & Meal Prep Solutions
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold text-gray-800">
              Healthy Eating Made <span className="gradient-text">Simple</span> with <span className="relative">
                <span className="relative z-10">Meal Prep</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-nutrition-green-600/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> Solutions
            </h1>
            
            <p className="text-xl text-gray-600 md:text-2xl leading-relaxed">
              Customized nutrition plans, delicious recipes, and convenient meal prep guides delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white rounded-lg font-medium button-glow text-center"
              >
                Start Your Meal Plan
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Food illustration - top left */}
            <div className="absolute -left-12 -top-12 w-20 h-20 z-20 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="bg-white p-3 rounded-full shadow-lg">
                <svg viewBox="0 0 24 24" className="w-full h-full text-nutrition-green-600" fill="currentColor">
                  <path d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
                </svg>
              </div>
            </div>
            
            {/* Food illustration - top right */}
            <div className="absolute -right-10 top-10 w-16 h-16 z-20 animate-float" style={{ animationDelay: "0.8s" }}>
              <div className="bg-white p-3 rounded-full shadow-lg">
                <svg viewBox="0 0 24 24" className="w-full h-full text-carrot-500" fill="currentColor">
                  <path d="M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H9V7M12,17A2,2 0 0,0 10,19A2,2 0 0,0 12,21A2,2 0 0,0 14,19A2,2 0 0,0 12,17M17,4H7A2,2 0 0,0 5,6V18A2,2 0 0,0 7,20H17A2,2 0 0,0 19,18V6A2,2 0 0,0 17,4Z" />
                </svg>
              </div>
            </div>
            
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Healthy meal prep containers"
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            
            {/* Food illustration - bottom right */}
            <div className="absolute -right-8 bottom-16 w-18 h-18 z-20 animate-float" style={{ animationDelay: "1.2s" }}>
              <div className="bg-white p-3 rounded-full shadow-lg">
                <svg viewBox="0 0 24 24" className="w-full h-full text-nutrition-green-600" fill="currentColor">
                  <path d="M15,11V17H18V11H15M13,11A1,1 0 0,1 14,12V16A1,1 0 0,1 13,17H10A1,1 0 0,1 9,16V12A1,1 0 0,1 10,11H13M12,1A11,11 0 0,0 1,12A11,11 0 0,0 12,23A11,11 0 0,0 23,12A11,11 0 0,0 12,1Z" />
                </svg>
              </div>
            </div>
            
            {/* Food illustration - bottom left */}
            <div className="absolute -left-10 bottom-10 w-16 h-16 z-20 animate-float" style={{ animationDelay: "0.3s" }}>
              <div className="bg-white p-3 rounded-full shadow-lg">
                <svg viewBox="0 0 24 24" className="w-full h-full text-carrot-500" fill="currentColor">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M7 7H9V9H7V7M7 11H9V13H7V11M7 15H9V17H7V15M17 17H11V15H17V17M17 13H11V11H17V13M17 9H11V7H17V9Z" />
                </svg>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-white rounded-lg shadow-lg border border-gray-100 rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-nutrition-green-500 to-carrot-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-800 font-medium">Time-Saving</div>
                  <div className="text-gray-500 text-sm">Ready in minutes</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-white rounded-lg shadow-lg border border-gray-100 -rotate-6 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-nutrition-green-500 to-carrot-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-800 font-medium">Nutrition-Focused</div>
                  <div className="text-gray-500 text-sm">Balanced Meals</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 