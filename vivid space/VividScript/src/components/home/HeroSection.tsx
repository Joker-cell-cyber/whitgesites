"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-tr from-vid-blue-900 via-vid-blue-800 to-accent/50" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1)_0%,rgba(56,189,248,0.05)_50%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-vid-blue-300/20 to-transparent"></div>
        <div className="absolute top-[60%] -left-40 w-80 h-80 bg-accent/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-[5%] right-[5%] w-72 h-72 bg-vid-blue-400/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-white/10 text-white backdrop-blur-sm font-medium border border-white/20 mb-8"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse mr-2"></span>
            Professional Scripts for Video Creators
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white heading-font leading-tight max-w-5xl mb-8"
          >
            Your videos deserve <br className="hidden md:block" />
            <span className="relative inline-block">
              professional 
              <span className="relative z-10 text-transparent bg-gradient-to-r from-vid-blue-400 to-accent bg-clip-text"> scripts</span>
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-accent" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,0 C25,12 75,12 100,0" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-vid-blue-100 leading-relaxed max-w-2xl mb-12"
          >
            We create video scripts that capture your audience&apos;s attention and transform your content.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/#pricing" 
              className="px-10 py-5 bg-gradient-to-r from-accent to-accent-hover text-white rounded-full font-medium transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:scale-105"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-300 p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-blue-400 to-accent"></div>
            <div className="absolute -right-10 -top-10 w-20 h-20 bg-vid-blue-400/20 rounded-full filter blur-lg group-hover:bg-accent/30 transition-all duration-500"></div>
            
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-vid-blue-400 group-hover:text-accent transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-white heading-font mb-2">Custom Scripts</h3>
                <p className="text-vid-blue-100 text-sm">For video creators</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-300 p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-blue-400 to-accent"></div>
            <div className="absolute -right-10 -top-10 w-20 h-20 bg-vid-blue-400/20 rounded-full filter blur-lg group-hover:bg-accent/30 transition-all duration-500"></div>
            
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-vid-blue-400 group-hover:text-accent transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-white heading-font mb-2">Short & Long Format</h3>
                <p className="text-vid-blue-100 text-sm">For any plateform</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-300 p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-blue-400 to-accent"></div>
            <div className="absolute -right-10 -top-10 w-20 h-20 bg-vid-blue-400/20 rounded-full filter blur-lg group-hover:bg-accent/30 transition-all duration-500"></div>
            
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-vid-blue-400 group-hover:text-accent transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-white heading-font mb-2">Professional Results</h3>
                <p className="text-vid-blue-100 text-sm">Guaranteed quality</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute -bottom-40 md:-bottom-[30%] left-1/2 -translate-x-1/2 w-[140%] max-w-[1400px] aspect-[16/6] rounded-full bg-gradient-to-b from-white/5 to-white/0 blur-xl"></div>
      </div>
    </section>
  );
} 