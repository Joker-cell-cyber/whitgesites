"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PricingHero() {
  const pricingFeatures = [
    { icon: "🌟", title: "Premium Quality", description: "Professional translators with industry expertise" },
    { icon: "⚡", title: "Fast Turnaround", description: "Get your translations when you need them" },
    { icon: "🔄", title: "Unlimited Revisions", description: "We work until you're completely satisfied" },
    { icon: "🌐", title: "Global Languages", description: "Support for 40+ languages worldwide" },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Abstract background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 rounded-tr-full"></div>
      </div>
      
      {/* Floating dots */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/20"
          >
            Transparent Pricing Plans
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Find the Perfect </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Translation Package
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-slate-300/80 max-w-2xl mx-auto"
          >
            We offer customized pricing options to meet your specific translation needs, 
            whether you need a single document or enterprise-level solutions.
          </motion.p>
        </div>

        {/* Main pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Standard Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Standard</h3>
                <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300 text-xs font-medium">Popular</span>
              </div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$0.10</span>
                <span className="text-slate-400 ml-2">/ word</span>
              </div>
              <p className="text-slate-400 mb-6 text-sm">Perfect for small projects and regular content translation needs.</p>

              <ul className="space-y-3 mb-8">
                {["Standard quality", "3-5 day delivery", "5 languages", "Basic revision"].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 transition-all">
                Choose Plan
              </button>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-900/30 to-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-2xl overflow-hidden relative z-20 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform md:-translate-y-4"
          >
            {/* Accent border */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 rounded-2xl"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Premium</h3>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">Recommended</span>
              </div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$0.18</span>
                <span className="text-slate-400 ml-2">/ word</span>
              </div>
              <p className="text-slate-400 mb-6 text-sm">Ideal for business documents, marketing materials, and technical content.</p>

              <ul className="space-y-3 mb-8">
                {["Premium quality", "1-2 day delivery", "20 languages", "Unlimited revisions", "Expert proofreading"].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all shadow-lg shadow-indigo-500/20">
                Choose Plan
              </button>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Enterprise</h3>
                <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-medium">Custom</span>
              </div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <p className="text-slate-400 mb-6 text-sm">For organizations with large-scale or ongoing translation projects.</p>

              <ul className="space-y-3 mb-8">
                {["Elite quality", "Custom delivery", "All 40+ languages", "Dedicated manager", "API integration"].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-lg font-medium text-white bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-all">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl transform -rotate-6"></div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
                alt="Global translation services" 
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              
              {/* Flag overlays */}
              <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full border-4 border-slate-900 overflow-hidden">
                <Image 
                  src="https://flagcdn.com/w80/us.png" 
                  alt="English" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-12 -left-4 w-12 h-12 rounded-full border-4 border-slate-900 overflow-hidden">
                <Image 
                  src="https://flagcdn.com/w80/cn.png" 
                  alt="Chinese" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-16 -right-4 w-16 h-16 rounded-full border-4 border-slate-900 overflow-hidden">
                <Image 
                  src="https://flagcdn.com/w80/fr.png" 
                  alt="French" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-12 w-10 h-10 rounded-full border-4 border-slate-900 overflow-hidden">
                <Image 
                  src="https://flagcdn.com/w80/jp.png" 
                  alt="Japanese" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Why Choose Our Translation Services?</h3>
            
            <div className="space-y-6">
              {pricingFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                  className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30 hover:bg-slate-800 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-900/50 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-8"
            >
              <button className="px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all shadow-lg shadow-indigo-500/20">
                Get Started Today
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 