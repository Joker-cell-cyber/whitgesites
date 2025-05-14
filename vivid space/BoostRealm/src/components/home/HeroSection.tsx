"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import { COMPANY } from "@/lib/company";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20" id="home">
      {/* Dark angled background with pattern */}
      <div className="absolute inset-0 bg-midnight-blue-900 overflow-hidden">
        {/* Diagonal divider */}
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-midnight-blue-800 skew-x-[-10deg] origin-top-right transform translate-x-32"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
        
        {/* Accent elements */}
        <div className="absolute left-1/2 top-20 h-40 w-[1px] bg-gradient-to-b from-transparent via-teal-500/50 to-transparent"></div>
        <div className="absolute right-20 bottom-40 h-60 w-[1px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"></div>
        <div className="absolute left-20 bottom-1/4 w-40 h-40 rounded-full bg-teal-500/5 blur-3xl"></div>
        <div className="absolute right-40 top-1/4 w-60 h-60 rounded-full bg-amber-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Content layout with angular design */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left content - CTA and text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="bg-gradient-to-r from-midnight-blue-800 to-slate-900 p-8 border-l-4 border-teal-500 shadow-xl relative">
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500"></div>
                
                <span className="inline-block px-3 py-1 bg-teal-500/10 text-teal-500 text-xs uppercase tracking-wider font-bold mb-4">
                  Gaming Domination
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  We <span className="text-teal-500">DOMINATE</span> While You <span className="text-amber-500">CONQUER</span>
                </h1>
                
                <div className="h-1 w-32 bg-gradient-to-r from-teal-500 to-amber-500 my-6"></div>
                
                <p className="text-slate-300 text-lg max-w-xl">
                  Elite power leveling and farming services for hardcore gamers: WoW, Diablo 4, Runescape, Dofus, Genshin Impact, and EVE Online.
                </p>
                
                <div className="mt-8">
                  <Link 
                    href="/#pricing" 
                    className="inline-block px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md transition-colors duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                    <div className="flex items-center justify-center relative z-10">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      UNLOCK PRO SERVICES
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Status terminal */}
              <div className="bg-slate-900 border border-slate-800 p-4 shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                  <div className="ml-2 text-xs text-slate-500">system.monitor</div>
                </div>
                <div className="font-mono text-sm space-y-1">
                  <p><span className="text-amber-500">$</span> <span className="text-teal-500">{COMPANY.serviceName}</span> <span className="text-white">--status</span></p>
                  <p className="text-slate-300"><span className="text-teal-500">[✓]</span> ONLINE: Serving hardcore gamers since 2019</p>
                  <p className="text-slate-300"><span className="text-teal-500">[✓]</span> SECURE: 100% account protection guaranteed</p>
                  <p className="text-slate-300"><span className="text-teal-500">[✓]</span> ACTIVE: 24/7 operations across all time zones</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right content - Image with overlays */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                {/* Main image with frame */}
                <div className="relative z-10 border-4 border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-tr from-midnight-blue-900/80 via-transparent to-transparent z-10"></div>
                  
                  <Image
                    src="https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Professional gaming setup"
                    width={1000}
                    height={563}
                    className="w-full aspect-video object-cover"
                    priority
                  />
                  
                  {/* Core UI Elements */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Top stats bar */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 bg-gradient-to-b from-midnight-blue-900/90 to-transparent">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                        <span className="text-teal-500 text-xs font-bold uppercase">LIVE</span>
                      </div>
                      <div className="text-amber-500 text-xs font-bold bg-midnight-blue-900/70 px-2 py-1 rounded">
                        EXP: +500%
                      </div>
                    </div>
                    
                    {/* Bottom stat */}
                    <div className="absolute bottom-3 left-3 text-xs font-bold bg-midnight-blue-900/70 text-amber-400 px-2 py-1 rounded">
                      PRESTIGE: MAX
                    </div>
                    
                    {/* Corner notch */}
                    <div className="absolute top-0 right-0 border-l-[20px] border-b-[20px] border-l-transparent border-b-teal-500"></div>
                  </div>
                </div>
                
                {/* Background layers/elements */}
                <div className="absolute right-12 -bottom-6 w-full h-full border-4 border-amber-500 z-0"></div>
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-teal-900/20 z-0"></div>
                
                {/* Feature badges */}
                <div className="absolute -right-8 top-1/4 transform rotate-3 z-30">
                  <div className="bg-midnight-blue-800 p-3 rounded shadow-xl border-l-4 border-teal-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-900/50 flex items-center justify-center rounded">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-bold">24/7 BOOST</div>
                        <div className="text-teal-400 text-xs">Ultra Fast Leveling</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -left-8 bottom-1/3 transform -rotate-3 z-30">
                  <div className="bg-midnight-blue-800 p-3 rounded shadow-xl border-l-4 border-amber-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-900/50 flex items-center justify-center rounded">
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-bold">STEALTH MODE</div>
                        <div className="text-amber-400 text-xs">Maximum Security</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 