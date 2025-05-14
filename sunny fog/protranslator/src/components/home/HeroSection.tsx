"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  // Data for floating flags
  const flagData = [
    { code: "us", position: "top-20 left-[5%]", size: "w-14 h-14", rotate: 12, delay: 0, duration: 4 },
    { code: "fr", position: "top-40 right-[8%]", size: "w-12 h-12", rotate: -8, delay: 1.4, duration: 3.7 },
    { code: "es", position: "bottom-32 left-[12%]", size: "w-13 h-13", rotate: 5, delay: 0.7, duration: 4.3 },
    { code: "cn", position: "top-56 left-[25%]", size: "w-10 h-10", rotate: -15, delay: 1.9, duration: 4.5 },
    { code: "de", position: "bottom-40 right-[28%]", size: "w-14 h-14", rotate: 8, delay: 1.6, duration: 3.9 },
    { code: "jp", position: "top-28 right-[22%]", size: "w-11 h-11", rotate: -12, delay: 0.5, duration: 4.1 },
    { code: "ru", position: "bottom-24 right-[15%]", size: "w-12 h-12", rotate: 10, delay: 1.2, duration: 3.8 },
    { code: "it", position: "top-72 left-[15%]", size: "w-10 h-10", rotate: -5, delay: 0.8, duration: 4.2 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524] to-[#0f172a] z-0"></div>
      
      {/* SVG wave patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="absolute w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M153.62,301.59c94.34,9.79,108.98-89.51,64.17-150.78c-66.53-70.66-134.85,39.21-94.93,80.32c28.23,28.65,67.13,17.42,85.68-17.07" stroke="url(#home-grad1)" strokeWidth="0.8" fill="none"/>
            <path d="M151.37,99.88c-97.86,18.29-70.45,112.37-12.95,155.87c58.75,55.91,142.52-36.17,94.61-72.5c-31.22-23.79-66.62-2.08-70.52,35.29" stroke="url(#home-grad2)" strokeWidth="0.8" fill="none"/>
          </g>
          <defs>
            <linearGradient id="home-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="home-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>
      
      {/* Enhanced glow elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-indigo-500/15 rounded-full filter blur-3xl"></div>
      <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-1/4 right-[20%] w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      
      {/* Floating circles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/5 hidden md:block"
          style={{
            width: `${15 + Math.random() * 20}px`,
            height: `${15 + Math.random() * 20}px`,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            zIndex: 1
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, Math.random() * 10 - 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Enhanced floating flags */}
      {flagData.map((flag, index) => (
        <motion.div
          key={index}
          className={`absolute ${flag.position} ${flag.size} rounded-full overflow-hidden shadow-xl z-10 hidden md:block`}
          style={{
            backgroundImage: `url(https://flagcdn.com/w80/${flag.code}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0],
            x: [0, Math.random() > 0.5 ? 5 : -5, 0],
            rotate: [0, flag.rotate, 0] 
          }}
          transition={{
            scale: { duration: 0.5, delay: flag.delay },
            opacity: { duration: 0.5, delay: flag.delay },
            y: {
              duration: flag.duration,
              repeat: Infinity,
              delay: flag.delay,
              ease: "easeInOut"
            },
            x: {
              duration: flag.duration,
              repeat: Infinity,
              delay: flag.delay,
              ease: "easeInOut"
            },
            rotate: {
              duration: flag.duration,
              repeat: Infinity,
              delay: flag.delay,
              ease: "easeInOut"
            }
          }}
          whileHover={{ 
            scale: 1.2,
            transition: { duration: 0.3 }
          }}
        />
      ))}
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div 
              className="inline-block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-300 text-sm font-medium backdrop-blur-sm border border-indigo-800">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
                Professional Translation Services
            </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Accurate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">Translations</span>
              </motion.span>
              <motion.span 
                className="block relative mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                With <span className="relative">
                  <span className="relative z-10">Global</span>
                  <motion.svg 
                    className="absolute -bottom-2 left-0 w-full h-[0.6em] -z-10 text-indigo-500/20" 
                    viewBox="0 0 200 20"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <motion.path 
                      d="M0,20 Q50,0 100,20 Q150,40 200,20" 
                      fill="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.svg>
                </span> Reach
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl text-indigo-100/80 md:text-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              From critical business documents to video subtitling - we deliver precise translations in multiple languages.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link 
                href="/pricing"
                onClick={(e) => {
                  // Prevent any default or inherited behavior
                  e.preventDefault();
                  window.location.href = "/pricing";
                }}
                className="px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-1 text-center"
              >
                View Packages
              </Link>
              <Link 
                href="/services" 
                className="px-8 py-3 rounded-lg font-medium text-indigo-200 bg-indigo-900/30 border border-indigo-700/50 hover:bg-indigo-900/50 transition-all text-center"
              >
                Our Services
              </Link>
            </motion.div>
            
            {/* Feature badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { text: "Native Speakers", icon: "🌍" },
                { text: "Quick Turnaround", icon: "⚡" },
                { text: "30+ Languages", icon: "🗣️" },
                { text: "Quality Guaranteed", icon: "✓" }
              ].map((item, idx) => (
                <div key={idx} className="inline-flex items-center space-x-1 rounded-full bg-indigo-900/30 px-3 py-1 text-sm text-indigo-200 border border-indigo-700/20">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Card glow effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 blur-lg opacity-30 transform -rotate-3 animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 to-indigo-600/30 blur-lg opacity-20 transform rotate-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <motion.div 
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-indigo-800 bg-[#1e293b]/80 backdrop-blur-sm"
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px rgba(79, 70, 229, 0.2)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                  src="https://images.unsplash.com/photo-1546781913-94df2b555e56?q=80&w=1000&auto=format&fit=crop"
                  alt="Global communication and translation"
                  className="w-full h-full object-cover"
                />
                
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-transparent opacity-90"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center gap-4 mb-4"
                  >
                    <div className="flex -space-x-3">
                      {['fr', 'cn', 'us', 'es'].map((code, i) => (
                        <div 
                          key={code} 
                          className="w-10 h-10 rounded-full border-2 border-indigo-900 overflow-hidden"
                          style={{ zIndex: 4 - i }}
                        >
                          <Image 
                            src={`https://flagcdn.com/w80/${code}.png`} 
                            alt={code} 
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-indigo-200">
                      <span className="font-bold text-white">30+ languages</span> supported globally
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced floating elements with better animations */}
            <motion.div 
              className="absolute -right-6 top-1/4 p-3 bg-[#1e293b]/90 backdrop-blur-sm rounded-lg shadow-xl border border-indigo-800 z-20"
              initial={{ opacity: 0, x: 20, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ y: -5, x: -5, rotate: 0, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">30+ Languages</div>
                  <div className="text-blue-300 text-sm">Global Coverage</div>
                </div>
            </div>
            </motion.div>
            
            <motion.div 
              className="absolute -left-6 bottom-1/4 p-3 bg-[#1e293b]/90 backdrop-blur-sm rounded-lg shadow-xl border border-indigo-800 z-20"
              initial={{ opacity: 0, x: -20, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ y: 5, x: 5, rotate: 0, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Fast Delivery</div>
                  <div className="text-blue-300 text-sm">Quick Turnaround</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-3/4 right-1/4 p-3 bg-[#1e293b]/90 backdrop-blur-sm rounded-lg shadow-xl border border-indigo-800 z-20"
              initial={{ opacity: 0, y: 20, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              whileHover={{ y: -5, rotate: 0, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Quality First</div>
                  <div className="text-blue-300 text-sm">Certified Translators</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 