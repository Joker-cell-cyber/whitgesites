"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" id="home">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-vf-amber-50/50 z-0"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      {/* Visual elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute top-0 left-0 right-0 h-[70%] dot-pattern opacity-50"></div>
        
        {/* Decorative circles */}
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-vf-amber-200/30 blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-vf-teal-500/10 blur-3xl opacity-70"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-white border border-vf-amber-200 text-vf-slate-700 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-vf-amber-500 mr-2"></span>
              Sales Script Engineering
            </div>
            
            <h1 className="heading-xl mb-8">
              Transform <span className="text-vf-amber-600 italic">Cold Calls</span> Into <span className="relative inline-block">
                Revenue
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 C50,0 150,0 200,5" stroke="#F59E0B" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="body-lg text-vf-slate-700 mb-10">
              Scientifically engineered sales scripts that break through objections and <span className="font-semibold text-vf-slate-900">double your closing rates</span>. Crafted by elite sales copywriters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/#pricing" 
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>Get Your Script</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/#services" 
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>Explore Services</span>
                </Link>
              </motion.div>
            </div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 py-6 px-8 bg-white/80 backdrop-blur-sm border border-vf-slate-200 rounded-xl shadow-sm"
            >
              <div className="grid grid-cols-3 divide-x divide-vf-slate-200">
                <div className="px-4 text-center">
                  <div className="text-3xl font-bold text-vf-slate-900">24hr</div>
                  <div className="text-vf-slate-600 text-sm mt-1">Fast Delivery</div>
                </div>
                <div className="px-4 text-center">
                  <div className="text-3xl font-bold text-vf-amber-600">12</div>
                  <div className="text-vf-slate-600 text-sm mt-1">Script Options</div>
                </div>
                <div className="px-4 text-center">
                  <div className="text-3xl font-bold text-vf-slate-900">100%</div>
                  <div className="text-vf-slate-600 text-sm mt-1">Customized</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10">
              {/* Main illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-vf-amber-600/5 to-vf-amber-400/10 rounded-2xl transform rotate-3"></div>
                <div className="card relative transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <svg viewBox="0 0 800 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {/* Paper/Document Background */}
                      <rect x="100" y="50" width="600" height="450" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                      
                      {/* Top headline */}
                      <rect x="130" y="80" width="540" height="60" rx="4" fill="#F8FAFC" />
                      <rect x="150" y="95" width="180" height="12" rx="2" fill="#F59E0B" />
                      <rect x="150" y="115" width="400" height="10" rx="2" fill="#CBD5E1" />
                      
                      {/* Script body */}
                      <rect x="130" y="160" width="540" height="320" rx="4" fill="#F8FAFC" />
                      
                      {/* Script lines */}
                      <rect x="150" y="180" width="500" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="200" width="480" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="220" width="460" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="240" width="500" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="260" width="400" height="8" rx="2" fill="#E2E8F0" />
                      
                      <rect x="150" y="290" width="500" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="310" width="480" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="330" width="460" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="350" width="500" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="370" width="400" height="8" rx="2" fill="#E2E8F0" />
                      
                      <rect x="150" y="400" width="500" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="420" width="480" height="8" rx="2" fill="#E2E8F0" />
                      <rect x="150" y="440" width="460" height="8" rx="2" fill="#E2E8F0" />
                      
                      {/* Highlighted segment */}
                      <rect x="150" y="330" width="120" height="8" rx="2" fill="#F59E0B" />
                      
                      {/* Chart/Graph */}
                      <path d="M600 490L650 420L700 370L750 280" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                      <path d="M600 490L650 470L700 455L750 445" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
                      <circle cx="650" cy="420" r="6" fill="#F59E0B" />
                      <circle cx="700" cy="370" r="6" fill="#F59E0B" />
                      <circle cx="750" cy="280" r="6" fill="#F59E0B" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 z-20"
              >
                <div className="card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-vf-amber-500 rounded-lg flex items-center justify-center text-vf-slate-900">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M18 10L12 4L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-vf-slate-900 font-semibold text-sm">Increase Sales</div>
                      <div className="text-vf-slate-600 text-xs">2x Conversion Rate</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [5, -5, 5] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -left-6 bottom-1/4 z-20"
              >
                <div className="card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-vf-slate-800 rounded-lg flex items-center justify-center text-vf-slate-200">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 10V3L4 14H7V21L16 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-vf-slate-900 font-semibold text-sm">Ready to Deploy</div>
                      <div className="text-vf-slate-600 text-xs">Start Using Today</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 