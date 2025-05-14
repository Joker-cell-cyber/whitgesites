"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Sample text translation showcase
  const originalText = "Our company needs to expand into international markets. We need all our marketing materials translated to reach new audiences.";
  const translatedText = {
    chinese: "我们公司需要拓展国际市场。我们需要将所有营销材料翻译以接触新的受众。",
    spanish: "Nuestra empresa necesita expandirse a mercados internacionales. Necesitamos traducir todos nuestros materiales de marketing para llegar a nuevas audiencias.",
    french: "Notre entreprise doit s'étendre sur les marchés internationaux. Nous devons traduire tous nos supports marketing pour atteindre de nouveaux publics."
  };
  
  // Typing animation effect
  useEffect(() => {
    if (currentIndex < originalText.length && isTyping) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(prev => prev + originalText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 40);
      
      return () => clearTimeout(typingTimer);
    } else if (currentIndex >= originalText.length && isTyping) {
      setIsTyping(false);
      // Reset after a pause
      const resetTimer = setTimeout(() => {
        setDisplayedText("");
        setCurrentIndex(0);
        setIsTyping(true);
      }, 3000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, isTyping, originalText]);
  
  // Languages we support
  const supportedLanguages = [
    { code: "us", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "cn", name: "Chinese" },
    { code: "jp", name: "Japanese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" }
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900/30 min-h-screen flex items-center py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6 inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full border border-indigo-700/30 text-indigo-300 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Professional Translation Services
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-white">Breaking</span>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Language Barriers
                </span>
                <motion.div 
                  className="absolute -bottom-3 left-0 h-1 w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.3, duration: 1 }}
                />
              </motion.div>
              <span className="block text-white mt-2">Worldwide</span>
            </h1>

            <motion.p 
              className="text-xl text-slate-300 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Our expert translators deliver precise, culturally-relevant translations in 40+ languages, helping you communicate effectively on a global scale.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link 
                href="/pricing" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all"
              >
                See Pricing
              </Link>
            </motion.div>

            {/* Language selector pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {supportedLanguages.slice(0, 6).map((lang, index) => (
                <motion.div 
                  key={lang.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + (index * 0.1), duration: 0.5 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50"
                >
                  <Image 
                    src={`https://flagcdn.com/w20/${lang.code}.png`}
                    alt={lang.name}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <span className="text-sm text-slate-300">{lang.name}</span>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-900/30 rounded-full border border-indigo-700/50"
              >
                <span className="text-sm text-indigo-300">+30 more</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Document Translation Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Document Translation Process */}
            <div className="relative">
              {/* Original Document Card */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl p-5 mb-6 max-w-lg relative z-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">Original Document</div>
                    <div className="text-xs text-slate-400">Marketing_Materials_2023.docx</div>
                  </div>
                  <div className="ml-auto flex items-center justify-center h-6 w-16 rounded-full bg-blue-600/20 text-blue-400 text-xs">
                    <div className="flex items-center">
                      <Image 
                        src="https://flagcdn.com/w20/us.png"
                        alt="English"
                        width={16}
                        height={12}
                        className="mr-1.5 rounded-sm"
                      />
                      English
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4 mb-2 shadow-inner border border-slate-800/60">
                  <div className="text-slate-300 text-sm font-mono leading-relaxed">
                    {displayedText || originalText}
                    {isTyping && currentIndex < originalText.length && (
                      <span className="inline-block w-2 h-4 ml-0.5 bg-blue-400 animate-pulse"></span>
                    )}
                  </div>
                </div>
                
                {/* Document Controls */}
                <div className="flex justify-between items-center">
                  <div className="text-xs text-slate-500">245 words</div>
                  <div className="flex gap-1.5">
                    {['red', 'yellow', 'green'].map((color, i) => (
                      <div key={i} className={`h-2 w-2 rounded-full bg-${color}-500/70`}></div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Translation Arrows */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="text-sm text-indigo-300 mt-1 font-medium">Translation</div>
              </motion.div>
              
              {/* Translated Documents */}
              <div className="grid sm:grid-cols-2 gap-4 mt-16">
                {/* Chinese Translation */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.4 }}
                  className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700/50 p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center h-5 w-14 rounded-full bg-indigo-600/20 text-indigo-400 text-xs justify-center">
                      <Image 
                        src="https://flagcdn.com/w20/cn.png"
                        alt="Chinese"
                        width={16}
                        height={12}
                        className="mr-1 rounded-sm"
                      />
                      中文
                    </div>
                    <div className="ml-auto text-xs text-slate-500">245字</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 shadow-inner border border-slate-800/60">
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {translatedText.chinese}
                    </p>
                  </div>
                </motion.div>
                
                {/* Spanish Translation */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                  className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700/50 p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center h-5 w-18 rounded-full bg-indigo-600/20 text-indigo-400 text-xs justify-center">
                      <Image 
                        src="https://flagcdn.com/w20/es.png"
                        alt="Spanish"
                        width={16}
                        height={12}
                        className="mr-1 rounded-sm"
                      />
                      Español
                    </div>
                    <div className="ml-auto text-xs text-slate-500">245 palabras</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 shadow-inner border border-slate-800/60">
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {translatedText.spanish}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Flag Overlays */}
              <div className="absolute -right-8 top-10 flex flex-col gap-3">
                {['fr', 'de', 'jp'].map((code, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.7 + (i * 0.2) }}
                    className="h-10 w-10 rounded-full overflow-hidden border-2 border-slate-800 shadow-lg"
                  >
                    <Image 
                      src={`https://flagcdn.com/w80/${code}.png`}
                      alt={code}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Features badges */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Fast Delivery", desc: "Quick turnaround times" },
                { icon: "🔍", title: "Accuracy", desc: "Context-aware translations" },
                { icon: "🌐", title: "Any Language", desc: "Support for 40+ languages" },
                { icon: "👩‍💻", title: "Human Touch", desc: "Native-speaking experts" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + (index * 0.1), duration: 0.5 }}
                  className="flex items-center gap-3 p-3 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{feature.title}</p>
                    <p className="text-slate-400 text-xs">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 