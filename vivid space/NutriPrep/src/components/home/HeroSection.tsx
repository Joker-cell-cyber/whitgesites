"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 bg-neutral-900" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-60 h-60 bg-turquoise-600 right-0 top-0 rotate-45 -translate-x-20 -translate-y-20"></div>
        <div className="absolute w-72 h-72 border-8 border-purple-500 -bottom-20 left-20 rotate-12"></div>
        <div className="absolute w-40 h-40 bg-turquoise-600/20 rounded-full top-1/2 left-1/4"></div>
        <svg className="absolute top-1/4 right-1/3 text-purple-500/30 w-64 h-64" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="none" />
          <path d="M 20,50 L 80,50" stroke="currentColor" strokeWidth="6" />
          <path d="M 50,20 L 50,80" stroke="currentColor" strokeWidth="6" />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:pr-8 pt-12"
          >
            <div className="inline-flex items-center rounded-none px-4 py-2 text-sm bg-turquoise-500 text-black font-bold mb-6 transform -rotate-3">
              <span className="flex h-3 w-3 bg-black mr-2"></span>
              Nutrition & Meal Prep Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none">
              Healthy Eating Made <span className="text-turquoise-500 relative z-10 px-2 py-1 inline-block transform -rotate-2">Simple</span> with <span className="border-b-4 border-purple-500 pb-1">Meal Prep</span> Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-300 mb-10 font-medium">
              Customized nutrition plans, delicious recipes, and convenient meal prep guides delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link 
                href="/#pricing" 
                className="px-8 py-4 bg-turquoise-500 text-black font-bold rounded-none transform hover:translate-y-1 hover:-translate-x-1 transition-transform border-4 border-turquoise-700 text-center text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]"
              >
                Start Your Meal Plan
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 relative mt-12 lg:mt-0"
          >            
            <div className="relative z-10 transform rotate-2 border-8 border-white shadow-[16px_16px_0px_0px_rgba(0,0,0,0.8)]">
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
            
            {/* Food icons as geometric shapes */}
            <div className="absolute -left-8 -top-12 z-20">
              <div className="bg-white p-4 rounded-none rotate-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-turquoise-600" fill="currentColor">
                  <path d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
                </svg>
              </div>
            </div>
            
            <div className="absolute -right-4 top-1/3 z-20">
              <div className="bg-purple-500 p-4 rounded-none -rotate-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                  <path d="M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H9V7M12,17A2,2 0 0,0 10,19A2,2 0 0,0 12,21A2,2 0 0,0 14,19A2,2 0 0,0 12,17M17,4H7A2,2 0 0,0 5,6V18A2,2 0 0,0 7,20H17A2,2 0 0,0 19,18V6A2,2 0 0,0 17,4Z" />
                </svg>
              </div>
            </div>
            
            {/* Feature cards */}
            <div className="absolute -right-4 bottom-8 transform rotate-3 z-20">
              <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-turquoise-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-black font-bold">Time-Saving</div>
                    <div className="text-gray-700 text-sm">Ready in minutes</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-8 bottom-1/3 transform -rotate-6 z-20">
              <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-black font-bold">Nutrition-Focused</div>
                    <div className="text-gray-700 text-sm">Balanced Meals</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 