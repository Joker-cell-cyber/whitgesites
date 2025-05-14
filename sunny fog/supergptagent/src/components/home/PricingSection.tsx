"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'enhanced' | 'enterprise'>('basic');

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
    <section className="py-20 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 code-background opacity-30"></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-ai-blue-500/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: "15s" }}></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-ai-purple-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: "20s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Choose Your <span className="gradient-text">Agent Build Package</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            One-time service to build the AI agent system that fits your needs
          </p>

          <div className="inline-flex p-1 rounded-xl bg-[#14141e] mb-8">
            <button
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'basic' ? 'bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('basic')}
            >
              Basic Agents
            </button>
            <button
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'enhanced' ? 'bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('enhanced')}
            >
              Enhanced Agents
            </button>
            <button
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'enterprise' ? 'bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('enterprise')}
            >
              Enterprise Agents
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-[#14141e] border border-gray-800 rounded-xl overflow-hidden flex flex-col h-full hover:border-ai-blue-500/50 hover:shadow-lg hover:shadow-ai-blue-500/10 transition-all duration-300 ${plan.popular ? "relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-center text-white text-xs font-medium py-1">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-[#1d1d2b] text-gray-400 mt-2">
                      {plan.complexity} • {plan.tier}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${plan.price}</div>
                    <div className="text-gray-500 text-sm">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-300 mb-2">Includes:</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-400 mr-2 mt-0.5">✓</span>
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm mb-6">
                  <span className="text-gray-500">Best for:</span>{" "}
                  <span className="text-gray-300">{plan.bestFor}</span>
                </div>
              </div>
              
              <div className="mt-auto p-6 pt-0">
                <a 
                  href={`/checkout?package=${encodeURIComponent(plan.name)}&price=${plan.price}`}
                  className="block w-full py-2 px-4 bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 hover:from-ai-blue-700 hover:to-ai-purple-700 text-white font-medium rounded-lg text-center transition-colors"
                >
                  Select Package
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#14141e] p-6 rounded-xl glass-effect">
            <h3 className="text-xl font-bold mb-2">Need a custom AI agent solution?</h3>
            <p className="text-gray-400 mb-4">For enterprise-grade deployments, multi-agent systems, or specialized industry requirements</p>
            <a href="/contact" className="inline-block px-6 py-3 bg-[#0f0f17] hover:bg-[#1a1a24] text-white rounded-lg font-medium border border-ai-blue-500/30 hover:border-ai-blue-500/60 transition-colors">
              Contact Sales Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 