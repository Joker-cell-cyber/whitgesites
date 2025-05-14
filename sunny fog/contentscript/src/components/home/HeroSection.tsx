"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-white" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-100 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-blue-50 rounded-full filter blur-3xl"></div>
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
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-100 text-blue-700 border border-blue-200">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Professional Scripts for Video Creators
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Your videos deserve professional <span className="text-blue-600">scripts</span>
            </h1>
            
            <p className="text-xl text-gray-600 md:text-2xl leading-relaxed">
              We create video scripts that capture your audience&apos;s attention and transform your content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
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
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
              <div className="aspect-video relative overflow-hidden p-6">
                {/* Script Writing SVG Illustration */}
                <svg 
                  viewBox="0 0 800 500" 
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background gradient */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="scriptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#f1f5f9" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Background shape */}
                  <rect x="0" y="0" width="800" height="500" fill="url(#bgGradient)" rx="20" />
                  
                  {/* Main script document */}
                  <g transform="translate(100, 50)">
                    {/* Script page shadow */}
                    <rect x="5" y="5" width="400" height="400" rx="10" fill="#e2e8f0" />
                    
                    {/* Script page */}
                    <rect x="0" y="0" width="400" height="400" rx="10" fill="url(#pageGradient)" />
                    
                    {/* Script content */}
                    <rect x="40" y="60" width="320" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="90" width="280" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="120" width="320" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="150" width="200" height="12" rx="6" fill="#94a3b8" />
                    
                    <rect x="40" y="190" width="320" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="220" width="280" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="250" width="320" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="280" width="240" height="12" rx="6" fill="#94a3b8" />
                    
                    <rect x="40" y="320" width="320" height="12" rx="6" fill="#94a3b8" />
                    <rect x="40" y="350" width="280" height="12" rx="6" fill="#94a3b8" />
                    
                    {/* Title area */}
                    <rect x="40" y="20" width="200" height="20" rx="6" fill="url(#scriptGradient)" />
                    
                    {/* Scene number */}
                    <circle cx="25" cy="25" r="15" fill="url(#scriptGradient)" />
                    <text x="25" y="30" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">1</text>
                  </g>
                  
                  {/* Pen/pencil */}
                  <g transform="translate(550, 150) rotate(45)">
                    <rect x="-15" y="-120" width="30" height="240" rx="6" fill="#475569" />
                    <polygon points="0,-140 -15,-120 15,-120" fill="#1d4ed8" />
                    <rect x="-15" y="100" width="30" height="20" rx="2" fill="#334155" />
                  </g>
                  
                  {/* Animated cursor */}
                  <rect 
                    x="370" 
                    y="152" 
                    width="3" 
                    height="16" 
                    fill="#1d4ed8">
                    <animate 
                      attributeName="opacity" 
                      values="0;1;0" 
                      dur="1.5s" 
                      repeatCount="indefinite" 
                    />
                  </rect>
                  
                  {/* Script tag */}
                  <g transform="translate(580, 120) rotate(-15)">
                    <rect x="-40" y="-20" width="80" height="40" rx="5" fill="url(#scriptGradient)" />
                    <text x="0" y="5" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">SCRIPT</text>
                  </g>
                    </svg>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-white rounded-lg shadow-md border border-gray-200 rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-medium">Custom Scripts</div>
                  <div className="text-gray-600 text-sm">For video creators</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-white rounded-lg shadow-md border border-gray-200 -rotate-6 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-medium">Script Writing</div>
                  <div className="text-gray-600 text-sm">Our specialty</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 