"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

export default function UseCasesSection() {
  const categories = [
    { id: "all", name: "All Use Cases" },
    { id: "business", name: "Business" },
    { id: "developer", name: "Developer" },
    { id: "customer", name: "Customer Service" },
    { id: "data", name: "Data Analysis" },
  ];

  const useCases = [
    {
      id: 1,
      title: "Financial Analysis Assistant",
      description: "AI agent that analyzes financial reports, identifies trends, and generates insights for investment decisions.",
      category: ["business", "data"],
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Finance", "Market Analysis", "Investment"],
      features: ["Real-time market data integration", "Personalized risk analysis", "Regulatory compliance support"]
    },
    {
      id: 2,
      title: "Code Documentation Helper",
      description: "Automatically generates comprehensive documentation from codebases including functions, classes, and APIs.",
      category: ["developer"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Development", "Documentation", "API"],
      features: ["Multi-language support", "Docstring generation", "README creation"]
    },
    {
      id: 3,
      title: "Customer Support Automation",
      description: "Intelligent agent that handles customer inquiries, troubleshoots issues, and escalates to human agents when necessary.",
      category: ["business", "customer"],
      image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Customer Service", "Support", "Automation"],
      features: ["24/7 availability", "Knowledge base integration", "Sentiment analysis"]
    },
    {
      id: 4,
      title: "Supply Chain Optimizer",
      description: "AI-powered system that predicts supply chain disruptions and recommends mitigation strategies.",
      category: ["business", "data"],
      image: "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Logistics", "Optimization", "Forecasting"],
      features: ["Route optimization", "Demand forecasting", "Inventory management"]
    },
    {
      id: 5,
      title: "Database Query Assistant",
      description: "Convert natural language questions into optimized SQL or NoSQL queries for database interaction.",
      category: ["developer", "data"],
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Database", "SQL", "Query Optimization"],
      features: ["Query validation", "Performance suggestions", "Schema understanding"]
    },
    {
      id: 6,
      title: "Multilingual Customer Chatbot",
      description: "Engage with global customers in their native language with real-time translation and cultural context awareness.",
      category: ["customer", "business"],
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Multilingual", "Customer Engagement", "Translation"],
      features: ["50+ languages supported", "Cultural context adaptation", "Custom brand voice"]
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  
  // Animation controls
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const filteredUseCases = activeCategory === "all" 
    ? useCases 
    : useCases.filter(project => project.category.includes(activeCategory));

  return (
    <section ref={sectionRef} id="use-cases" className="py-28 relative bg-gradient-to-b from-[#050518] to-[#070721]">
      {/* Abstract background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/images/grid.svg')] bg-repeat"></div>
        
        {/* Animated gradient blobs */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-600/5 blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Particle effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-indigo-500/30 rounded-full animate-pulse" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Flowing lines effect */}
        <svg className="absolute w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M${-200 + Math.random() * 200},${Math.random() * 1000} C${Math.random() * 500},${Math.random() * 1000} ${600 + Math.random() * 300},${Math.random() * 1000} ${1200 + Math.random() * 300},${Math.random() * 1000}`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-3">
            <span className="text-xs tracking-wider text-indigo-400 uppercase bg-indigo-900/30 py-1 px-3 rounded-full">Solutions</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Real-World <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Use Cases</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg text-center max-w-3xl mx-auto"
          >
            Discover how organizations are leveraging custom AI agents to transform their operations
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center mt-12 gap-3"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30"
                    : "bg-[rgba(15,15,35,0.5)] text-gray-300 hover:text-white hover:bg-indigo-900/30 border border-indigo-800/20"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUseCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 shadow-xl shadow-indigo-900/10 hover:shadow-indigo-900/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                {/* Overlay gradient with animated opacity */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050518]/70 to-[#070721] z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={600}
                  height={400}
                />
                
                {/* Main tag with glow effect */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-indigo-500/20 rounded-full blur-sm group-hover:bg-indigo-500/30 transition-colors duration-300"></div>
                    <div className="relative bg-[rgba(15,15,40,0.9)] px-4 py-1.5 rounded-full text-xs font-medium border border-indigo-500/30 text-indigo-300">
                      {useCase.tags[0]}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:from-indigo-300 group-hover:to-purple-300 transition-colors duration-300">
                  {useCase.title}
                </h3>
                
                <p className="text-gray-400 mb-6">{useCase.description}</p>
                
                <div className="border-t border-indigo-900/30 pt-6 mt-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        <div className="p-1 rounded-full bg-indigo-900/50 mr-3 mt-0.5 border border-indigo-700/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 flex justify-start items-center">
                  <div className="flex gap-2">
                    {useCase.tags.slice(1).map((tag, idx) => (
                      <span key={idx} className="bg-indigo-900/30 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-800/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-700/30"
          >
            Start Building Your Agent
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 