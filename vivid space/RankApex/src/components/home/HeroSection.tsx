"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { COMPANY } from "@/app/constants/company";

export default function HeroSection() {
  const [currentRank, setCurrentRank] = useState(0);
  const ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Champion"];
  const rankColors = ["#CD7F32", "#C0C0C0", "#FFD700", "#36FFBA", "#9FE2FF", "#BB95FC", "#FF7A8A", "#16AD7D"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRank((prev) => (prev + 1) % ranks.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [ranks.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-grid">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rank-emerald-600/5 rounded-full filter blur-[150px] animate-pulse-subtle"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rank-orange-600/5 rounded-full filter blur-[120px] animate-pulse-subtle"></div>
        
        {/* Abstract shapes */}
        <svg className="absolute top-20 right-20 w-64 h-64 text-rank-emerald-500/5 animate-orbit" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.3,-51.2C58.3,-40.6,68.4,-25.1,71.3,-8.1C74.2,8.9,70,27.3,58.8,39C47.7,50.7,29.6,55.8,12.1,59.3C-5.5,62.8,-22.3,64.7,-35.9,58.1C-49.4,51.5,-59.6,36.3,-66.4,18.8C-73.2,1.3,-76.5,-18.5,-68.9,-32.5C-61.4,-46.4,-42.9,-54.4,-26.1,-63.5C-9.4,-72.6,5.5,-82.7,20.6,-78.4C35.8,-74,58.2,-55.2,45.3,-51.2Z" transform="translate(100 100)" />
        </svg>
        
        <svg className="absolute bottom-20 left-40 w-48 h-48 text-rank-orange-500/5 animate-orbit" style={{ animationDelay: "1s" }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M52.1,-51.4C66.2,-37.3,75.7,-17.6,75.2,1.3C74.7,20.2,64.2,38.3,49.6,50.8C35,63.3,16.3,70.1,-3.3,73.1C-22.9,76.1,-43.5,75.2,-56.7,63.7C-69.9,52.1,-75.8,29.7,-76.6,7.7C-77.4,-14.3,-73.2,-36,-60.3,-50.3C-47.4,-64.7,-25.9,-71.6,-3.9,-68.1C18.1,-64.6,38,-65.6,52.1,-51.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 lg:col-span-7"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rank-emerald-900/50 text-rank-emerald-200 backdrop-blur-sm border border-rank-emerald-800/50 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-rank-emerald-400 mr-2 animate-pulse"></span>
              <span className="font-medium text-sm">Pro Players Available Now</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-extrabold heading-apex">
              Level Up Your <br />
              <span className="gradient-text">Gaming Journey</span>
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-poppins font-bold pb-2">
              <span className="relative">
                <span className="text-white">Reach </span>
                <span className="relative inline-block transition-colors duration-300" style={{ color: rankColors[currentRank] }}>
                  {ranks[currentRank]}
                </span>
                <span className="text-white"> Faster</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="100%" 
                  height="8" 
                  className="absolute bottom-0 left-0"
                >
                  <line 
                    x1="0" 
                    y1="4" 
                    x2="100%" 
                    y2="4" 
                    stroke={rankColors[currentRank]} 
                    strokeWidth="2"
                    strokeDasharray="1,3"
                    className="animate-dash" 
                  />
                </svg>
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-light subheading-apex">
              Our team of elite gamers can help you reach your desired rank with 
              <span className="font-semibold text-rank-emerald-400"> guaranteed results </span> 
              and <span className="font-semibold text-rank-orange-400">complete account safety</span>.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-6">
              <Link 
                href="/#pricing" 
                className="px-8 py-4 rounded-lg font-medium text-lg text-white button-apex"
                aria-label="View service pricing plans"
              >
                Explore Services
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-rank-emerald-900/30 text-white rounded-lg font-medium text-lg border border-rank-emerald-700/30 hover:bg-rank-emerald-900/50 transition-colors"
                aria-label="Contact our team"
              >
                Talk to an Expert
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-2 border-t border-rank-emerald-900/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-rank-emerald-400">100%</div>
                <div className="text-gray-400 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rank-orange-400">150+</div>
                <div className="text-gray-400 text-sm">Expert Players</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Featured Content Display */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-card-bg border border-rank-emerald-900/40">
              {/* Header bar */}
              <div className="bg-card-accent px-5 py-3 flex justify-between items-center border-b border-rank-emerald-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rank-orange-500"></div>
                  <div className="w-3 h-3 rounded-full bg-rank-orange-300"></div>
                  <div className="w-3 h-3 rounded-full bg-rank-emerald-500"></div>
                </div>
                <div className="text-gray-300 text-sm font-medium">{COMPANY.serviceName} Dashboard</div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-rank-emerald-500 animate-pulse"></div>
                  <span className="text-rank-emerald-400 text-xs font-medium">ACTIVE</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="bg-card-bg p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="rank-icon">
                      <span>G3</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">CURRENT RANK</div>
                      <div className="text-white font-semibold">Gold III</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-rank-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="flex items-center gap-3">
                    <div className="rank-icon">
                      <span>P2</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">TARGET RANK</div>
                      <div className="text-white font-semibold">Platinum II</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card-accent p-4 rounded-xl mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Progress</span>
                    <span className="text-sm text-rank-emerald-400 font-medium">63%</span>
                  </div>
                  <div className="h-2 bg-rank-emerald-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rank-emerald-500 to-rank-orange-500 rounded-full" style={{ width: "63%" }}></div>
                  </div>
                </div>
                
                <div className="bg-card-accent p-4 rounded-xl mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-white">Latest Activity</div>
                    <div className="text-xs text-gray-400">Today, 14:32</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-rank-emerald-500/10 text-rank-emerald-400 rounded-full">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-white">Ranked Game Win</div>
                      <div className="text-xs text-gray-400">+24 LP • 12/3/7 KDA</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="px-4 py-3 bg-rank-emerald-500/10 text-rank-emerald-400 rounded-lg flex justify-between items-center">
                    <span className="text-sm font-medium">Estimated completion</span>
                    <span className="text-sm">2 days</span>
                  </div>
                  <div className="px-4 py-3 bg-rank-orange-500/10 text-rank-orange-400 rounded-lg flex justify-between items-center">
                    <span className="text-sm font-medium">Games remaining</span>
                    <span className="text-sm">~8 games</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative UI elements */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute -right-4 bottom-24 max-w-[220px] p-4 bg-card-bg/90 backdrop-blur-md rounded-xl shadow-xl border-l-4 border-rank-emerald-500 z-20 animate-rise"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rank-emerald-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-rank-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-rank-emerald-400 text-xs font-medium">MILESTONE REACHED</div>
                  <div className="text-white text-sm font-medium">Gold Division Complete</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -left-4 top-1/3 max-w-[180px] p-3 bg-card-bg rounded-xl shadow-xl border border-rank-orange-600/30 z-20 animate-rise"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-rank-orange-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-rank-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-rank-orange-400 text-xs font-medium">BOOSTING ACTIVE</div>
                </div>
                <div className="text-white text-sm">5 wins streak!</div>
                <div className="text-gray-400 text-xs mt-1">Winrate: 87%</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 