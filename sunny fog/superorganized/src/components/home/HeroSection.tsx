"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-white" id="home">
      {/* Background elements - subtle hand-drawn elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-notion-accent-100 opacity-30"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-notion-accent-50 opacity-30"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 rounded-full bg-notion-accent-200 opacity-20 animate-float"></div>
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
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-white hand-drawn-border text-black">
              <span className="flex h-2 w-2 rounded-full bg-notion-accent-500 mr-2"></span>
              Professional Notion Workspace Setup
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold text-black">
              Transform Your <span className="hand-drawn-accent">Ideas</span> Into <span className="squiggle-underline">Organized</span> Workspaces
            </h1>
            
            <p className="text-xl text-gray-700 md:text-2xl leading-relaxed">
              From personal knowledge bases to team collaboration and project management - we build custom Notion workspaces that boost your productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 text-black font-medium text-center button-hand-drawn animate-wiggle"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden hand-drawn">
              <div className="aspect-video relative overflow-hidden bg-white p-4">
                {/* Hand-drawn illustration of a Notion workspace */}
                <svg className="w-full h-full" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Page background */}
                  <rect x="10" y="10" width="480" height="260" rx="8" fill="white" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 0" />
                  
                  {/* Notion header */}
                  <rect x="30" y="20" width="440" height="40" rx="4" fill="white" stroke="black" strokeWidth="2" />
                  <circle cx="50" cy="40" r="10" fill="white" stroke="black" strokeWidth="2" />
                  <rect x="70" y="35" width="120" height="10" rx="2" fill="#e0e0e0" stroke="black" strokeWidth="1" />
                  <rect x="380" y="30" width="70" height="20" rx="4" fill="white" stroke="black" strokeWidth="1.5" />
                  <text x="395" y="45" fontFamily="Arial" fontSize="12" fill="black">Share</text>
                  
                  {/* Sidebar */}
                  <rect x="30" y="70" width="100" height="180" rx="4" fill="#f7f7f7" stroke="black" strokeWidth="2" />
                  <rect x="40" y="85" width="80" height="15" rx="2" fill="#e0e0e0" stroke="black" strokeWidth="1" />
                  <rect x="40" y="110" width="80" height="15" rx="2" fill="#e0e0e0" stroke="black" strokeWidth="1" />
                  <rect x="40" y="135" width="80" height="15" rx="2" fill="#e0e0e0" stroke="black" strokeWidth="1" />
                  <rect x="40" y="160" width="80" height="15" rx="2" fill="#e0e0e0" stroke="black" strokeWidth="1" />
                  <rect x="40" y="185" width="80" height="15" rx="2" fill="#e0e0e0" stroke="black" strokeWidth="1" />
                  
                  {/* Main content */}
                  <rect x="140" y="70" width="330" height="70" rx="4" fill="white" stroke="black" strokeWidth="2" />
                  <text x="155" y="100" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="black">My Workspace</text>
                  <text x="155" y="125" fontFamily="Arial" fontSize="12" fill="#666">Organized • Collaborative • Productive</text>
                  
                  {/* Content blocks */}
                  <rect x="140" y="150" width="155" height="100" rx="4" fill="white" stroke="black" strokeWidth="2" />
                  <rect x="150" y="165" width="135" height="10" rx="2" fill="#e0e0e0" />
                  <rect x="150" y="185" width="135" height="10" rx="2" fill="#e0e0e0" />
                  <rect x="150" y="205" width="80" height="10" rx="2" fill="#e0e0e0" />
                  <path d="M160 165 L170 175 L180 160" stroke="#5c7cff" strokeWidth="2" fill="none" />
                  
                  {/* Database */}
                  <rect x="305" y="150" width="165" height="100" rx="4" fill="white" stroke="black" strokeWidth="2" />
                  <line x1="305" y1="175" x2="470" y2="175" stroke="black" strokeWidth="1.5" />
                  <line x1="345" y1="150" x2="345" y2="250" stroke="black" strokeWidth="1.5" />
                  <line x1="385" y1="150" x2="385" y2="250" stroke="black" strokeWidth="1.5" />
                  <line x1="425" y1="150" x2="425" y2="250" stroke="black" strokeWidth="1.5" />
                  <rect x="315" y="185" width="20" height="20" rx="2" fill="#f0f4ff" stroke="black" strokeWidth="1" />
                  <rect x="315" y="215" width="20" height="20" rx="2" fill="#f0f4ff" stroke="black" strokeWidth="1" />
                  <path d="M320 195 L325 200 L330 190" stroke="#5c7cff" strokeWidth="1.5" fill="none" />
                  <path d="M320 225 L325 230 L330 220" stroke="#5c7cff" strokeWidth="1.5" fill="none" />
                  
                  {/* Decorative elements - right "hand" holding a drawing pen */}
                  <path d="M450 40 C455 35, 460 30, 465 40 C470 50, 475 45, 480 50" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Small Notion icons */}
                  <rect x="420" y="90" width="20" height="20" rx="4" fill="white" stroke="black" strokeWidth="1.5" />
                  <path d="M425 95 L435 95 M425 100 L435 100 M425 105 L430 105" stroke="black" strokeWidth="1" />
                  
                  <rect x="445" y="90" width="20" height="20" rx="4" fill="white" stroke="black" strokeWidth="1.5" />
                  <circle cx="455" cy="100" r="5" fill="none" stroke="black" strokeWidth="1" />
                </svg>
              </div>
            </div>
            
            {/* Floating elements with hand-drawn style */}
            <div className="absolute -right-6 top-1/4 p-3 bg-white hand-drawn-light rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-notion-accent-100 border-2 border-black rounded-lg flex items-center justify-center text-black">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-black font-medium">Quick Setup</div>
                  <div className="text-gray-600 text-sm">48h Delivery</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-white hand-drawn-light -rotate-6 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-notion-accent-100 border-2 border-black rounded-lg flex items-center justify-center text-black">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-black font-medium">Customized</div>
                  <div className="text-gray-600 text-sm">For Your Needs</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 