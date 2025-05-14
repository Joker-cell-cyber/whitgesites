"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Full-width background with gradient overlay */}
      <div className="absolute inset-0 w-full bg-gradient-to-b from-white via-white to-cs-blue-50 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Large circles */}
        <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-cs-blue-100 mix-blend-multiply filter blur-[120px] opacity-60 animate-slow-float"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-cs-navy-100 mix-blend-multiply filter blur-[100px] opacity-50 animate-slow-float-delay"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 w-full h-full opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(to right, #3a6fff 1px, transparent 1px), linear-gradient(to bottom, #3a6fff 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}>
        </div>
        
        {/* Flowing lines */}
        <svg className="absolute bottom-0 left-0 w-full h-[20vh] opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="none"
            stroke="#3A6FFF"
            strokeWidth="2"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,170.7C960,139,1056,85,1152,85.3C1248,85,1344,139,1392,165.3L1440,192"
            strokeDasharray="10,15"
            className="animate-pulse-slow"
          ></path>
          <path 
            fill="none"
            stroke="#4F66A3"
            strokeWidth="2"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,218.7C672,224,768,224,864,208C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160"
            strokeDasharray="10,15"
            className="animate-pulse-slow-delay"
          ></path>
        </svg>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-white text-cs-navy-700 border border-cs-blue-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cs-blue-500 mr-2"></span>
              Sales Script Engineering
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-6xl font-bold text-cs-navy-900 leading-tight">
              Transform <span className="gradient-text font-extrabold">Cold Calls</span> Into <span className="relative">
                <span className="relative z-10">Revenue</span>
                <svg className="absolute bottom-1 -left-2 w-[calc(100%+1rem)] h-[0.3em] text-cs-blue-500/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="5" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-cs-navy-700 md:text-2xl leading-relaxed">
              Scientifically engineered sales scripts that break through objections and <span className="font-semibold">double your closing rates</span>. Crafted by elite sales copywriters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-8 py-4 bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 text-white rounded-xl font-bold button-glow text-center text-lg shadow-lg shadow-cs-blue-600/20 hover:shadow-xl hover:shadow-cs-blue-600/30 transition-all transform hover:-translate-y-1"
              >
                Get Your Script
              </Link>
              <Link 
                href="/#services" 
                className="px-8 py-4 bg-white border border-cs-blue-200 text-cs-navy-700 hover:bg-cs-blue-50 hover:text-cs-navy-800 hover:border-cs-blue-300 rounded-xl font-medium text-center transition-all transform hover:-translate-y-1"
              >
                Explore Services
              </Link>
            </div>
            
            {/* Stats row */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-cs-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-cs-navy-900">24hr</div>
                <div className="text-cs-navy-600 text-sm">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">12</div>
                <div className="text-cs-navy-600 text-sm">Script Options</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cs-navy-900">100%</div>
                <div className="text-cs-navy-600 text-sm">Customized</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Custom Illustration */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-cs-blue-200 bg-white p-6">
              <div className="custom-illustration">
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background shapes */}
                  <rect x="100" y="100" width="600" height="400" rx="20" fill="#F0F5FF" />
                  <circle cx="400" cy="300" r="180" fill="#E0EAFF" />
                  
                  {/* Sales script document */}
                  <rect x="250" y="150" width="300" height="380" rx="8" fill="white" stroke="#3A6FFF" strokeWidth="2" />
                  <line x1="280" y1="190" x2="520" y2="190" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="220" x2="520" y2="220" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="250" x2="480" y2="250" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="280" x2="520" y2="280" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="310" x2="420" y2="310" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="340" x2="520" y2="340" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="370" x2="460" y2="370" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="400" x2="520" y2="400" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="430" x2="480" y2="430" stroke="#B8C7E0" strokeWidth="2" />
                  <line x1="280" y1="460" x2="420" y2="460" stroke="#B8C7E0" strokeWidth="2" />
                  
                  {/* Sales script title */}
                  <rect x="270" y="120" width="260" height="40" rx="6" fill="#3A6FFF" />
                  <text x="290" y="147" fontFamily="Arial" fontSize="18" fill="white">HIGH-CONVERSION SCRIPT</text>
                  
                  {/* Pen */}
                  <rect x="460" y="180" width="120" height="14" rx="7" transform="rotate(45 460 180)" fill="#4F66A3" />
                  <rect x="516" y="124" width="14" height="50" rx="7" transform="rotate(45 516 124)" fill="#4F66A3" />
                  <path d="M553 87L561 95L516 140L508 132L553 87Z" fill="#2E3560" />
                  <path d="M507 133L500 150L516 140L507 133Z" fill="#162F80" />
                  
                  {/* Decorative elements */}
                  <circle cx="160" cy="180" r="40" fill="#3A6FFF" fillOpacity="0.1" />
                  <circle cx="640" cy="400" r="60" fill="#4F66A3" fillOpacity="0.1" />
                  
                  {/* Chart/Graph showing conversions */}
                  <path d="M150 440L200 410L250 430L300 400L350 370L400 340L450 300L500 260L550 240L600 210" 
                        stroke="#3A6FFF" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M150 440L200 435L250 425L300 430L350 420L400 415L450 400L500 395L550 380L600 350" 
                        stroke="#4F66A3" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5"/>
                  <circle cx="300" cy="400" r="6" fill="#3A6FFF" />
                  <circle cx="450" cy="300" r="6" fill="#3A6FFF" />
                  <circle cx="550" cy="240" r="6" fill="#3A6FFF" />
                    </svg>
              </div>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-cs-blue-500 to-cs-navy-500 rounded-full filter blur-xl opacity-20"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-4 bg-white rounded-xl shadow-lg border border-cs-blue-100 rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cs-blue-500 to-cs-navy-500 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-cs-navy-800 font-semibold">Increase Sales</div>
                  <div className="text-cs-navy-500">2x Conversion Rate</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-4 bg-white rounded-xl shadow-lg border border-cs-blue-100 -rotate-6 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cs-blue-500 to-cs-navy-500 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-cs-navy-800 font-semibold">Ready to Deploy</div>
                  <div className="text-cs-navy-500">Start Using Today</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 