"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'enhanced' | 'enterprise'>('basic');
  
  // Animation controls
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Redémarrer l'animation quand la catégorie change
  useEffect(() => {
    controls.start("hidden");
    setTimeout(() => {
      controls.start("visible");
    }, 50);
  }, [selectedCategory, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  // Define pricing tiers
  const pricingCategories = {
    basic: [
      {
        name: "Starter Agent",
        price: 9.99,
        tier: "Basic",
        complexity: "Simple",
        description: "Essential conversational module for basic interactions",
        features: [
          "1 simple conversational module",
          "Pre-programmed responses (up to 20)",
          "1 theme of your choice",
          "Basic setup assistance"
        ],
        bestFor: "Personal projects"
      },
      {
        name: "Assistant Agent",
        price: 19.50,
        tier: "Basic",
        complexity: "Standard",
        description: "Improved agent with basic conversational abilities",
        features: [
          "2 conversational modules",
          "Basic response capabilities",
          "Name and avatar customization",
          "Setup and basic support"
        ],
        bestFor: "Basic customer support",
        popular: true
      },
      {
        name: "Task Agent",
        price: 29.90,
        tier: "Basic",
        complexity: "Advanced",
        description: "Functional agent capable of executing simple predefined tasks",
        features: [
          "3 functional modules",
          "Simple predefined task execution",
          "Message customization",
          "Implementation support"
        ],
        bestFor: "Simple process automation"
      },
      {
        name: "Professional Agent",
        price: 39.99,
        tier: "Basic",
        complexity: "Advanced+",
        description: "Adaptable agent for specific use cases with enhanced recognition",
        features: [
          "4 modules of your choice",
          "Adaptation to 1 specific use case",
          "Simple request recognition",
          "Enhanced setup support"
        ],
        bestFor: "Professional environments"
      }
    ],
    enhanced: [
      {
        name: "Interactive Agent",
        price: 49.90,
        tier: "Enhanced",
        complexity: "Multi-modal",
        description: "Versatile agent with advanced interaction capabilities",
        features: [
          "5 interaction modules",
          "Customizable user interface",
          "Adaptation to 2 use cases",
          "Implementation assistance"
        ],
        bestFor: "Interactive applications"
      },
      {
        name: "Analyst Agent",
        price: 59.50,
        tier: "Enhanced",
        complexity: "Data-driven",
        description: "Data-focused agent with analytical capabilities",
        features: [
          "Simple data analysis capabilities",
          "Basic text processing",
          "Structured information extraction",
          "Data integration support"
        ],
        bestFor: "Data analysis teams",
        popular: true
      },
      {
        name: "Workflow Agent",
        price: 69.99,
        tier: "Enhanced",
        complexity: "Process-focused",
        description: "Sequential workflow automation with conditional processing",
        features: [
          "Logical sequence of up to 3 steps",
          "1 simple external integration",
          "Basic conditional task management",
          "Workflow setup assistance"
        ],
        bestFor: "Business operations"
      },
      {
        name: "Advanced Agent",
        price: 79.90,
        tier: "Enhanced",
        complexity: "Knowledge-intensive",
        description: "Specialized knowledge system with contextual awareness",
        features: [
          "Specific knowledge base",
          "Basic contextual recognition",
          "Advanced response customization",
          "Knowledge setup support"
        ],
        bestFor: "Specialized domains"
      }
    ],
    enterprise: [
      {
        name: "Connected Agents",
        price: 89.50,
        tier: "Enterprise",
        complexity: "Collaborative",
        description: "Multiple coordinated agents that work together",
        features: [
          "2 complementary agents",
          "Inter-agent communication",
          "Simple information sharing",
          "Implementation with coordination"
        ],
        bestFor: "Enterprise teams"
      },
      {
        name: "Enterprise Assistant",
        price: 99.99,
        tier: "Enterprise",
        complexity: "Corporate",
        description: "Company-wide AI assistant with multi-user capabilities",
        features: [
          "Multi-user access",
          "Adaptation to 3 use cases",
          "Department-specific responses",
          "Enterprise setup support"
        ],
        bestFor: "Corporate environments",
        popular: true
      },
      {
        name: "Business Logic Agent",
        price: 109.90,
        tier: "Enterprise",
        complexity: "Specialized",
        description: "Conditional logic system for procedure automation",
        features: [
          "Conditional logic (up to 5 rules)",
          "Simple procedure tracking",
          "2 external integrations",
          "Logic implementation support"
        ],
        bestFor: "Business processes"
      },
      {
        name: "Tailored Agent Package",
        price: 119.50,
        tier: "Enterprise",
        complexity: "Bespoke",
        description: "Fully customized AI agent system built to specification",
        features: [
          "Personalized for your use case",
          "Configuration per your specific needs",
          "Up to 3 external integrations",
          "Complete implementation support"
        ],
        bestFor: "Mission-critical applications"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-[#050518] via-[#060626] to-[#050518]" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/images/grid.svg')] bg-repeat"></div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-xs tracking-wider text-indigo-400 uppercase bg-indigo-900/30 py-1 px-3 rounded-full">Pricing</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Agent Build Package</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg mb-12"
          >
            One-time service to build the AI agent system that fits your needs
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="inline-flex p-1.5 rounded-full bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 shadow-lg shadow-indigo-900/10 mb-8"
          >
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'basic' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
              onClick={() => setSelectedCategory('basic')}
            >
              Basic Agents
            </button>
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'enhanced' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
              onClick={() => setSelectedCategory('enhanced')}
            >
              Enhanced Agents
            </button>
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'enterprise' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
              onClick={() => setSelectedCategory('enterprise')}
            >
              Enterprise Agents
            </button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" key={selectedCategory}>
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
              className={`relative group bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1 ${plan.popular ? "border-indigo-600/30" : ""}`}
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/0 via-purple-600/0 to-indigo-600/0 group-hover:from-indigo-600/5 group-hover:via-purple-600/5 group-hover:to-indigo-600/5 transition-colors duration-500 pointer-events-none"></div>
              
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white text-xs font-medium py-1.5">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-800/30">
                      {plan.complexity} • {plan.tier}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline">
                      <span className="text-gray-400 text-lg mr-1">$</span>
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{plan.price}</div>
                    </div>
                    <div className="text-indigo-300/70 text-sm">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-8 min-h-[40px]">{plan.description}</p>
                
                <div className="mb-8">
                  <div className="text-sm font-medium text-white mb-4">Includes:</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm group-hover:translate-x-1 transition-transform duration-300">
                        <div className="p-1 rounded-full bg-indigo-900/50 mr-3 mt-0.5 border border-indigo-700/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm mb-6 pb-4 border-b border-indigo-900/30">
                  <span className="text-indigo-400">Best for:</span>{" "}
                  <span className="text-gray-300">{plan.bestFor}</span>
                </div>
              </div>
              
              <div className="mt-auto p-8 pt-0">
                <a 
                  href={`/checkout?package=${encodeURIComponent(plan.name)}&price=${plan.price}`}
                  className="block w-full py-3 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-full text-center transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-900/20 hover:shadow-indigo-700/30"
                >
                  Select Package
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <div className="bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 p-8 rounded-2xl shadow-lg shadow-indigo-900/10 relative overflow-hidden">
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-indigo-500/30 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-purple-500/30 rounded-br-2xl"></div>
            
            <h3 className="text-2xl font-bold mb-4">Need a custom AI agent solution?</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">For enterprise-grade deployments, multi-agent systems, or specialized industry requirements</p>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-indigo-500/30 hover:border-indigo-400/60 text-white rounded-full font-medium transition-all duration-300 hover:bg-indigo-900/20">
              Contact Sales Team
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
} 