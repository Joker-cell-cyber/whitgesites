"use client";

import { motion } from "framer-motion";
import React from "react";

// Language data with categories
const languageData = [
  // European Languages
  { code: 'en', name: 'English', category: 'European', fluency: 98 },
  { code: 'fr', name: 'French', category: 'European', fluency: 95 },
  { code: 'es', name: 'Spanish', category: 'European', fluency: 97 },
  { code: 'de', name: 'German', category: 'European', fluency: 94 },
  { code: 'it', name: 'Italian', category: 'European', fluency: 93 },
  { code: 'pt', name: 'Portuguese', category: 'European', fluency: 92 },
  { code: 'nl', name: 'Dutch', category: 'European', fluency: 90 },
  
  // Asian Languages
  { code: 'zh', name: 'Chinese', category: 'Asian', fluency: 96 },
  { code: 'th', name: 'Thai', category: 'Asian', fluency: 88 },
  { code: 'vi', name: 'Vietnamese', category: 'Asian', fluency: 87 },
  
  // Middle Eastern Languages
  { code: 'ar', name: 'Arabic', category: 'Middle Eastern', fluency: 94 },

  
  // Other Languages
  { code: 'ru', name: 'Russian', category: 'Other', fluency: 93 },
  { code: 'tr', name: 'Turkish', category: 'Other', fluency: 88 },
  { code: 'pl', name: 'Polish', category: 'Other', fluency: 89 },
  { code: 'sv', name: 'Swedish', category: 'Other', fluency: 87 }
];

// Language categories for filtering
const categories = ['All', 'European', 'Asian', 'Middle Eastern', 'Other'];

// Define the language type
interface Language {
  code: string;
  name: string;
  category: string;
  fluency: number;
}

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [hoveredLanguage, setHoveredLanguage] = React.useState<Language | null>(null);
  
  // Filter languages based on active category
  const filteredLanguages = activeCategory === 'All' 
    ? languageData 
    : languageData.filter(lang => lang.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Background design */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>
      </div>
      
      {/* Mesh grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-500">
              Our Translation Services
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-300 mt-4">
            Professional translations tailored to your specific needs - from business documents to creative content and video subtitling.
          </p>
        </motion.div>
        
        {/* Hexagonal service cards */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {/* Text Translation Service */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="flex-1 min-w-[300px] max-w-md relative group"
          >
            <div className="relative z-10 bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-800/30">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-emerald-600/20 to-cyan-600/10 rounded-full blur-2xl group-hover:from-emerald-600/30 group-hover:to-cyan-600/20 transition-all duration-700"></div>
              
              <div className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">Text Translation</h3>
                <p className="text-gray-300 mb-6">Professional translation services for all your written content needs, from business documents to marketing materials.</p>
                
                <div className="space-y-3">
                  {["Business Documents", "Website Content", "Marketing Materials", "Academic Papers", "Legal Documents"].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-900/50 border border-emerald-700/50 group-hover/item:bg-emerald-800/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            </div>
          </motion.div>
          
          {/* Video Translation Service */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="flex-1 min-w-[300px] max-w-md relative group"
          >
            <div className="relative z-10 bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-800/30">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-blue-600/20 to-violet-600/10 rounded-full blur-2xl group-hover:from-blue-600/30 group-hover:to-violet-600/20 transition-all duration-700"></div>
              
              <div className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 -rotate-3 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-blue-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">Video Translation</h3>
                <p className="text-gray-300 mb-6">Comprehensive video translation services including subtitling, closed captions, and voiceover options.</p>
                
                <div className="space-y-3">
                  {["Subtitle Creation", "Closed Caption Files", "Multiple Language Support", "Synchronized Timing", "Professional Voiceover Options"].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50 border border-blue-700/50 group-hover/item:bg-blue-800/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Languages We Support - New Design */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-800/50 text-indigo-300 text-sm font-medium mb-4">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2"></span>
                <span>Global Reach</span>
              </div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-300">
                Languages We Support
              </h3>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                Our team of professional translators provides high-quality translations in over 40 languages worldwide.
              </p>
            </motion.div>
            
            {/* Language Category Tabs */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-slate-900/70 backdrop-blur-md rounded-xl p-1.5 border border-slate-800/70">
                {categories.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Language Grid */}
            <div className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
              
              {/* Language grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredLanguages.map((language, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    onHoverStart={() => setHoveredLanguage(language)}
                    onHoverEnd={() => setHoveredLanguage(null)}
                    className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700/30 group"
                  >
                    {/* Fluency indicator bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/50">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.fluency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 mb-3 group-hover:border-indigo-500 transition-colors">
                        <img 
                          src={`https://flagcdn.com/w80/${language.code === 'en' ? 'us' : language.code === 'zh' ? 'cn' : language.code}.png`} 
                          alt={language.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-white mb-1">{language.name}</h4>
                      <div className="text-xs text-slate-400">{language.fluency}% Fluency</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Highlighted language detail on hover */}
              {hoveredLanguage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full bg-indigo-900/80 backdrop-blur-md border border-indigo-700/50 text-white text-sm font-medium shadow-xl z-30 flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-white/30">
                    <img 
                      src={`https://flagcdn.com/w40/${hoveredLanguage.code === 'en' ? 'us' : hoveredLanguage.code === 'zh' ? 'cn' : hoveredLanguage.code}.png`} 
                      alt={hoveredLanguage.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>Our {hoveredLanguage.name} translators have native-level fluency</span>
                </motion.div>
              )}
            </div>
            
            {/* Statistics Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 text-center"
              >
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">40+</div>
                <div className="text-slate-300">Languages Supported</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 text-center"
              >
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">100+</div>
                <div className="text-slate-300">Native Translators</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 text-center"
              >
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">99%</div>
                <div className="text-slate-300">Customer Satisfaction</div>
              </motion.div>
            </div>
            
            {/* Additional language info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 text-center"
            >
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 