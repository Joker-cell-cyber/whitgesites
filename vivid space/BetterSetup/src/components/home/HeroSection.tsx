"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gradient-to-br from-black to-gray-900 text-white" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-20 blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2"></span>
              Professional Notion Workspace Setup
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Ideas</span> Into <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-500 to-orange-500">Organized</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-500 opacity-70" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 C20,8 50,12 80,8 L100,0" fill="none" stroke="currentColor" strokeWidth="3"></path>
                </svg>
              </span> Workspaces
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              From personal knowledge bases to team collaboration and project management - we build custom Notion workspaces that boost your productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link 
                href="/#pricing" 
                className="px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 text-center"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-indigo-500/10 backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-black/90">
              <div className="aspect-video relative overflow-hidden p-4">
                {/* Modern illustration of a Notion workspace */}
                <svg className="w-full h-full" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Page background */}
                  <rect x="10" y="10" width="480" height="260" rx="8" fill="#1E1E1E" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Notion header */}
                  <rect x="30" y="20" width="440" height="40" rx="4" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
                  <circle cx="50" cy="40" r="10" fill="#1A1A1A" stroke="#444" strokeWidth="1" />
                  <rect x="70" y="35" width="120" height="10" rx="2" fill="#333" />
                  <rect x="380" y="30" width="70" height="20" rx="4" fill="#333" stroke="#444" strokeWidth="1" />
                  <text x="395" y="45" fontFamily="Arial" fontSize="12" fill="#DDD">Share</text>
                  
                  {/* Sidebar */}
                  <rect x="30" y="70" width="100" height="180" rx="4" fill="#181818" stroke="#333" strokeWidth="1" />
                  <rect x="40" y="85" width="80" height="15" rx="2" fill="#333" />
                  <rect x="40" y="110" width="80" height="15" rx="2" fill="#333" />
                  <rect x="40" y="135" width="80" height="15" rx="2" fill="#333" />
                  <rect x="40" y="160" width="80" height="15" rx="2" fill="#333" />
                  <rect x="40" y="185" width="80" height="15" rx="2" fill="#333" />
                  
                  {/* Main content */}
                  <rect x="140" y="70" width="330" height="70" rx="4" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
                  <text x="155" y="100" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#FFF">My Workspace</text>
                  <text x="155" y="125" fontFamily="Arial" fontSize="12" fill="#AAA">Organized • Collaborative • Productive</text>
                  
                  {/* Content blocks */}
                  <rect x="140" y="150" width="155" height="100" rx="4" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
                  <rect x="150" y="165" width="135" height="10" rx="2" fill="#333" />
                  <rect x="150" y="185" width="135" height="10" rx="2" fill="#333" />
                  <rect x="150" y="205" width="80" height="10" rx="2" fill="#333" />
                  <path d="M160 165 L170 175 L180 160" stroke="#7C3AED" strokeWidth="2" fill="none" />
                  
                  {/* Database */}
                  <rect x="305" y="150" width="165" height="100" rx="4" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
                  <line x1="305" y1="175" x2="470" y2="175" stroke="#444" strokeWidth="1" />
                  <line x1="345" y1="150" x2="345" y2="250" stroke="#444" strokeWidth="1" />
                  <line x1="385" y1="150" x2="385" y2="250" stroke="#444" strokeWidth="1" />
                  <line x1="425" y1="150" x2="425" y2="250" stroke="#444" strokeWidth="1" />
                  <rect x="315" y="185" width="20" height="20" rx="2" fill="#272727" stroke="#444" strokeWidth="1" />
                  <rect x="315" y="215" width="20" height="20" rx="2" fill="#272727" stroke="#444" strokeWidth="1" />
                  <path d="M320 195 L325 200 L330 190" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
                  <path d="M320 225 L325 230 L330 220" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute right-0 top-1/4 transform translate-x-1/4 p-4 rounded-xl bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border border-indigo-500/30 shadow-xl rotate-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Quick Setup</div>
                  <div className="text-indigo-200 text-sm">48h Delivery</div>
                </div>
              </div>
            </div>
            
            <div className="absolute left-0 bottom-1/4 transform -translate-x-1/4 p-4 rounded-xl bg-gradient-to-br from-fuchsia-900/90 to-pink-900/90 border border-pink-500/30 shadow-xl -rotate-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-fuchsia-500 to-pink-600">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Customized</div>
                  <div className="text-pink-200 text-sm">For Your Needs</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 