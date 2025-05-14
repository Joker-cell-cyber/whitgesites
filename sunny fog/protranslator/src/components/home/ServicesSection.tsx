"use client";

import { motion } from "framer-motion";
import React from "react";

// Language data for floating elements
const languageData = [
  { code: 'en', name: 'English', position: { top: '10%', left: '15%' }, size: 1, rotation: 5, delay: 0, duration: 5 },
  { code: 'fr', name: 'French', position: { top: '20%', right: '10%' }, size: 0.8, rotation: -5, delay: 1.2, duration: 6 },
  { code: 'es', name: 'Spanish', position: { top: '60%', left: '5%' }, size: 0.9, rotation: 8, delay: 0.5, duration: 5.5 },
  { code: 'de', name: 'German', position: { bottom: '15%', right: '20%' }, size: 0.75, rotation: -10, delay: 0.8, duration: 7 },
  { code: 'zh', name: 'Chinese', position: { top: '35%', left: '10%' }, size: 0.85, rotation: 12, delay: 2, duration: 6.5 },
  { code: 'ja', name: 'Japanese', position: { bottom: '30%', left: '25%' }, size: 0.7, rotation: -8, delay: 1.5, duration: 5.2 },
  { code: 'ru', name: 'Russian', position: { top: '25%', right: '15%' }, size: 0.8, rotation: 5, delay: 2.5, duration: 6.8 },
  { code: 'it', name: 'Italian', position: { bottom: '20%', right: '5%' }, size: 0.7, rotation: -6, delay: 0.3, duration: 7.2 }
];

export default function ServicesSection() {
  const sizeClasses: {[key: string]: string} = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <section className="py-20 relative" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-[20%] w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Translation Services</h2>
          <p className="text-lg text-gray-300">Professional translations tailored to your specific needs - from business documents to creative content and video subtitling.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Text Translation Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-hover rounded-xl p-6 relative flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-[40px] rounded-tr-xl"></div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-3">Text Translation</h3>
            <p className="text-gray-300 mb-5">Professional translation services for all your written content needs, from business documents to marketing materials.</p>
            
            <div className="mt-auto space-y-3">
              <div className="flex gap-2 items-start">
                <div className="text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Business Documents</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Website Content</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Marketing Materials</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Academic Papers</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Legal Documents</span>
              </div>
            </div>
          </motion.div>
          
          {/* Video Translation Service */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-hover rounded-xl p-6 relative flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-[40px] rounded-tr-xl"></div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-purple-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
        </div>

            <h3 className="text-2xl font-bold mb-3">Video Translation</h3>
            <p className="text-gray-300 mb-5">Comprehensive video translation services including subtitling, closed captions, and voiceover options.</p>
            
            <div className="mt-auto space-y-3">
              <div className="flex gap-2 items-start">
                <div className="text-indigo-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Subtitle Creation</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-indigo-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Closed Caption Files</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-indigo-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Multiple Language Support</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-indigo-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Synchronized Timing</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-indigo-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <span className="text-gray-200">Professional Voiceover Options</span>
              </div>
            </div>
            </motion.div>
        </div>
        
        {/* Languages Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 relative"
        >
          <h3 className="text-2xl font-bold mb-12 text-center">Languages We Support</h3>
          
          {/* Floating language elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {languageData.map((language, index) => (
              <motion.div
                key={`float-lang-${index}`}
                className="absolute flex flex-col items-center justify-center z-10"
                style={{
                  ...language.position,
                  transform: `rotate(${language.rotation}deg) scale(${language.size})`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 15, 0],
                  rotate: [language.rotation, language.rotation + 5, language.rotation],
                }}
                transition={{
                  duration: language.duration,
                  repeat: Infinity,
                  delay: language.delay,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className="rounded-lg bg-gradient-to-r from-blue-600/80 to-indigo-600/80 px-4 py-2 backdrop-blur-sm shadow-lg"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  <span className="text-white font-medium">{language.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="relative h-[500px] max-w-5xl mx-auto overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 transform -translate-x-1/2 -translate-y-1/2 filter blur-xl"></div>
            <div className="absolute bottom-0 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 filter blur-xl"></div>
            
            {/* Enhanced background */}
            <div className="absolute inset-0 z-0">
              <svg className="absolute w-full h-full opacity-5" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M153.62,301.59c94.34,9.79,108.98-89.51,64.17-150.78c-66.53-70.66-134.85,39.21-94.93,80.32c28.23,28.65,67.13,17.42,85.68-17.07" stroke="url(#grad1)" strokeWidth="0.8" fill="none"/>
                  <path d="M151.37,99.88c-97.86,18.29-70.45,112.37-12.95,155.87c58.75,55.91,142.52-36.17,94.61-72.5c-31.22-23.79-66.62-2.08-70.52,35.29" stroke="url(#grad2)" strokeWidth="0.8" fill="none"/>
                </g>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </div>
            
            {/* Floating circles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/10"
                style={{
                  width: `${20 + Math.random() * 30}px`,
                  height: `${20 + Math.random() * 30}px`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
            
            {/* Language flag bubbles - positioned asymmetrically */}
            {[
              { language: "English", code: "gb", size: "lg", position: "top-10 left-[15%]", delay: 0 },
              { language: "Spanish", code: "es", size: "md", position: "top-24 left-[45%]", delay: 1.5 },
              { language: "French", code: "fr", size: "lg", position: "top-32 right-[20%]", delay: 0.8 },
              { language: "German", code: "de", size: "md", position: "top-60 left-[25%]", delay: 2.2 },
              { language: "Chinese", code: "cn", size: "xl", position: "top-72 right-[30%]", delay: 1.2 },
              { language: "Japanese", code: "jp", size: "lg", position: "bottom-20 left-[10%]", delay: 1.7 },
              { language: "Russian", code: "ru", size: "md", position: "bottom-40 right-[15%]", delay: 0.5 },
              { language: "Arabic", code: "sa", size: "lg", position: "bottom-10 right-[25%]", delay: 2.4 },
              { language: "Italian", code: "it", size: "sm", position: "top-40 left-[5%]", delay: 1.9 },
              { language: "Portuguese", code: "pt", size: "md", position: "bottom-60 left-[40%]", delay: 0.3 },
              { language: "Korean", code: "kr", size: "lg", position: "top-[300px] right-[5%]", delay: 1.1 },
              { language: "Dutch", code: "nl", size: "md", position: "bottom-20 left-[50%]", delay: 2.7 },
              { language: "Polish", code: "pl", size: "sm", position: "top-24 right-[45%]", delay: 1.4 },
              { language: "Turkish", code: "tr", size: "md", position: "bottom-[230px] left-[30%]", delay: 0.7 },
              { language: "Swedish", code: "se", size: "sm", position: "top-[220px] left-[35%]", delay: 2.1 },
              { language: "Greek", code: "gr", size: "md", position: "bottom-80 right-[40%]", delay: 0.9 }
            ].map((item, index) => {
              // Animation variants for each bubble
              const bobAnimation = {
                y: [0, -10, 0],
                x: [0, Math.random() > 0.5 ? 5 : -5, 0],
                rotate: [0, Math.random() > 0.5 ? 3 : -3, 0],
                transition: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: item.delay
                }
              };
              
              return (
                <motion.div 
                  key={index}
                  className={`absolute ${item.position} ${sizeClasses[item.size]} rounded-full flex flex-col items-center justify-center shadow-lg z-10 cursor-pointer transform hover:scale-110 transition-transform`}
                  style={{
                    background: `url(https://flagcdn.com/w80/${item.code}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                  }}
                  animate={bobAnimation}
                  whileHover={{ scale: 1.2, rotate: 5, transition: { duration: 0.3 } }}
                >
                  <div className="absolute bottom-[-30px] bg-gradient-to-r from-indigo-600 to-blue-600 backdrop-blur-sm rounded-full px-3 py-1 text-white whitespace-nowrap shadow-lg">
                    {item.language}
                  </div>
                </motion.div>
              );
            })}
            
            {/* Center feature */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center z-20 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}
            >
              <div className="text-white text-center">
                <div className="text-4xl font-bold">30+</div>
                <div className="text-sm font-medium">Languages</div>
                <div className="text-xs mt-2 bg-white/20 rounded-full px-3 py-1">Worldwide</div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-10 max-w-2xl mx-auto">
            <p className="text-indigo-300 mb-4">Our team of professional translators covers all major global languages</p>
            <div className="flex justify-center">
              <a href="/contact" className="inline-flex items-center space-x-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-shadow">
                <span>Ask about your language</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 