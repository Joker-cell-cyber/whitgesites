"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  // Flags data with positions for floating animation
  const flagData = [
    { code: "us", position: "top-20 left-[5%]", size: "w-16 h-16", rotate: 12, delay: 0, duration: 4 },
    { code: "fr", position: "top-40 right-[8%]", size: "w-12 h-12", rotate: -8, delay: 1.4, duration: 3.7 },
    { code: "es", position: "bottom-32 left-[12%]", size: "w-14 h-14", rotate: 5, delay: 0.7, duration: 4.3 },
    { code: "cn", position: "top-56 left-[25%]", size: "w-10 h-10", rotate: -15, delay: 1.9, duration: 4.5 },
    { code: "ru", position: "bottom-24 right-[15%]", size: "w-12 h-12", rotate: 10, delay: 1.2, duration: 3.8 },
    { code: "jp", position: "top-28 right-[20%]", size: "w-11 h-11", rotate: -12, delay: 0.5, duration: 4.1 },
    { code: "de", position: "bottom-40 right-[28%]", size: "w-14 h-14", rotate: 8, delay: 1.6, duration: 3.9 },
    { code: "it", position: "top-72 left-[15%]", size: "w-10 h-10", rotate: -5, delay: 0.8, duration: 4.2 },
    { code: "br", position: "bottom-52 left-[30%]", size: "w-12 h-12", rotate: 7, delay: 2.1, duration: 4.4 },
    { code: "kr", position: "top-32 left-[35%]", size: "w-11 h-11", rotate: -9, delay: 1.0, duration: 4.0 },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Enhanced background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524] to-[#0f172a] z-0"></div>
      
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
      
      {/* SVG wave patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="absolute w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M153.62,301.59c94.34,9.79,108.98-89.51,64.17-150.78c-66.53-70.66-134.85,39.21-94.93,80.32c28.23,28.65,67.13,17.42,85.68-17.07" stroke="url(#hero-grad1)" strokeWidth="0.8" fill="none"/>
            <path d="M151.37,99.88c-97.86,18.29-70.45,112.37-12.95,155.87c58.75,55.91,142.52-36.17,94.61-72.5c-31.22-23.79-66.62-2.08-70.52,35.29" stroke="url(#hero-grad2)" strokeWidth="0.8" fill="none"/>
          </g>
          <defs>
            <linearGradient id="hero-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="hero-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute -top-10 -right-20 w-64 h-64 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute -bottom-10 right-20 w-80 h-80 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      
      {/* Floating circles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/5 hidden md:block"
          style={{
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
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
      
      {/* Enhanced floating flags with improved visual style */}
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
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-block">
        <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-300 text-sm font-medium inline-flex items-center space-x-1"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="ml-2">Fast & Accurate Translations</span>
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block mb-2">Professional</span>
              <span className="block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                  Translation Pricing
                </span>
                <motion.svg 
                  className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-[0.6em] -z-10 text-indigo-500/20" 
                  viewBox="0 0 200 20"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <motion.path 
                    d="M0,20 Q50,0 100,20 Q150,40 200,20" 
                    fill="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </motion.svg>
              </span>
          </h1>
          
            <p className="mt-6 text-xl text-indigo-100/80 leading-relaxed">
              Clear and transparent pricing packages designed to meet all your language needs, from simple text to professional document translation.
          </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a 
              href="/pricing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-1"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
            >
              View Packages
              </motion.a>
              <motion.a 
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 }} 
                className="px-8 py-3 rounded-lg font-medium text-indigo-200 bg-indigo-900/30 border border-indigo-700/50 hover:bg-indigo-900/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Custom Quote
              </motion.a>
            </div>
            
            {/* Added feature highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-10 flex flex-wrap gap-3"
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
          
          {/* Right Content - Enhanced Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-sm"
          >
            {/* Card glow effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 blur-lg opacity-30 transform -rotate-3 animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 to-indigo-600/30 blur-lg opacity-20 transform rotate-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Card content */}
            <motion.div 
              className="relative bg-[#1e293b]/80 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-6 shadow-xl"
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px rgba(79, 70, 229, 0.2)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center z-20">
                <motion.img 
                  src="https://flagcdn.com/w80/gb.png" 
                  alt="English" 
                  className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center z-20">
                <motion.img 
                  src="https://flagcdn.com/w80/fr.png" 
                  alt="French" 
                  className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center z-20">
                <motion.img 
                  src="https://flagcdn.com/w80/cn.png" 
                  alt="Chinese" 
                  className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center z-20">
                <motion.img 
                  src="https://flagcdn.com/w80/es.png" 
                  alt="Spanish" 
                  className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                />
            </div>
            
              <div className="flex items-center justify-between mb-6">
                <motion.h3 
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Translation Benefits
                </motion.h3>
                <motion.div 
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600/30 to-blue-600/30 flex items-center justify-center"
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                </motion.div>
              </div>
              
              <ul className="space-y-4">
                {[
                  {
                    title: "Native Speakers",
                    description: "Expert translators who are native speakers in your target language"
                  },
                  {
                    title: "Fast Turnaround",
                    description: "Quick delivery options starting from just 48 hours"
                  },
                  {
                    title: "Quality Guarantee",
                    description: "100% satisfaction or your money back"
                  },
                  {
                    title: "30+ Languages",
                    description: "Support for all major global languages"
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-300">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
            </div>
                  </motion.li>
                ))}
              </ul>
              
              {/* Added decorative elements to card */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="30" stroke="url(#paint0_linear)" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="15" stroke="url(#paint0_linear)" strokeWidth="0.5" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </motion.div>
          </div>
      </div>
    </section>
  );
} 