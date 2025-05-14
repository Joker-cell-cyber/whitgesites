"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  const filteredUseCases = activeCategory === "all" 
    ? useCases 
    : useCases.filter(project => project.category.includes(activeCategory));

  return (
    <section id="use-cases" className="py-24 relative">
      {/* Cyber grid background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0, 195, 245, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>
      
      {/* Digital connections in background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.15] pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute bg-ai-blue-500" 
            style={{
              height: '1px',
              width: `${Math.random() * 200 + 100}px`, 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          ></div>
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i + 8} className="absolute rounded-full bg-ai-blue-500"
            style={{
              height: '4px',
              width: '4px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Real-World <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Discover how organizations are leveraging custom AI agents to transform their operations
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white"
                  : "bg-[#14141e] text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUseCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover rounded-xl overflow-hidden bg-[#14141e]"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0c14] z-10"></div>
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={200}
                />
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-[#14141e]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-ai-blue-500/30">
                    {useCase.tags[0]}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 tech-gradient-text">{useCase.title}</h3>
                <p className="text-gray-400 mb-4">{useCase.description}</p>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ai-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex gap-1">
                    {useCase.tags.slice(1).map((tag, idx) => (
                      <span key={idx} className="bg-ai-blue-500/10 text-ai-blue-400 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a href="#" className="text-ai-blue-500 hover:text-ai-blue-400 text-sm font-medium">
                    Case Study
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-px rounded-lg cyber-border">
            <a
              href="#pricing"
              className="inline-block px-6 py-3 bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white rounded-lg font-medium button-glow"
            >
              Start Building Your Agent
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 