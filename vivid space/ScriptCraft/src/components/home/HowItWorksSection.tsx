"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      number: "01",
      title: "Select Your Script Package",
      description: "Choose the script type that fits your sales needs and target audience. From cold calls to closing techniques.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: "02",
      title: "Provide Your Requirements",
      description: "Tell us about your product, target market, and specific sales challenges you want the script to address.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19L17 13M17 13L11 7M17 13H3M21 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: "03",
      title: "Our Experts Create Your Script",
      description: "Our sales copywriting team crafts a customized script designed to overcome objections and boost conversions.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: "04",
      title: "Implement & Start Closing Deals",
      description: "Receive your ready-to-use script and start implementing it immediately to increase your sales success rate.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18V15M7 15H17V9C17 6.79086 14.7614 5 12 5C9.23858 5 7 6.79086 7 9V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 15H5C3.89543 15 3 15.8954 3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17C21 15.8954 20.1046 15 19 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="18" r="0.5" stroke="currentColor" strokeWidth="3"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-cs-navy-50 to-white text-cs-navy-900" id="how-it-works">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-orange-300 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-200 opacity-5 blur-3xl"></div>
        <svg viewBox="0 0 1000 1000" className="absolute top-0 left-0 w-full h-full opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="orange" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-lg bg-orange-50 text-orange-700 font-medium text-sm tracking-wide mb-4 border border-orange-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 inline-block align-middle"></span>
              Simple 4-Step Process
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cs-navy-900">
              How <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">ScriptCraft</span> Works
            </h2>
            
            <p className="text-lg text-cs-navy-700 mb-8 max-w-2xl mx-auto">
              From selecting your script type to closing deals, our streamlined process makes it easy to get the sales scripts you need.
            </p>
          </motion.div>
        </div>
        
        {/* Interactive Process Viewer */}
        <div className="max-w-5xl mx-auto">
          {/* Step Navigator */}
          <div className="flex justify-between mb-12 relative">
            {/* Progress Bar */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-orange-100 w-full -z-10 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 ease-out animate-pulse"
                style={{ width: `${(activeStep / (steps.length-1)) * 100}%` }}
              ></div>
            </div>
            
            {steps.map((step, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative z-10 flex flex-col items-center group`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2
                  transition-all duration-300
                  ${index <= activeStep 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-400/20' 
                    : 'bg-orange-50 text-orange-300 border border-orange-100'}
                `}>
                  {step.number}
                </div>
                <span className={`text-sm font-medium transition-all duration-300 
                  ${index === activeStep ? 'text-cs-navy-900' : 'text-cs-navy-500'}
                  hidden md:inline-block
                `}>
                  {step.title}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Step Content */}
          <div className="bg-white rounded-2xl p-1 shadow-xl border border-orange-100 overflow-hidden">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeStep === index ? 1 : 0,
                  x: activeStep === index ? 0 : activeStep > index ? -20 : 20
                }}
                transition={{ duration: 0.5 }}
                className={`p-8 ${activeStep === index ? 'block' : 'hidden'}`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-orange-500 opacity-10 animate-ping"></div>
                    <div className="text-orange-500">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-cs-navy-900">{step.title}</h3>
                    <p className="text-cs-navy-700 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${activeStep === 0 
                  ? 'opacity-50 cursor-not-allowed text-cs-navy-400' 
                  : 'hover:bg-orange-50 text-cs-navy-700'}
              `}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>
            
            <button 
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${activeStep === steps.length - 1 
                  ? 'opacity-50 cursor-not-allowed text-cs-navy-400' 
                  : 'hover:bg-orange-50 text-cs-navy-700'}
              `}
            >
              Next
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* CTA Section - Completely Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-32 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-cs-navy-900 to-cs-navy-800 rounded-3xl overflow-hidden border border-cs-navy-700/30 shadow-2xl">
            <div className="relative p-8 md:p-12">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="text-center relative z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Rapid 24-hour turnaround available
                </span>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                  Ready to transform your sales conversations?
                </h3>
                
                <a 
                  href="#pricing" 
                  className="inline-block relative group overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-orange-600 group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative z-10 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-center text-lg shadow-lg group-hover:shadow-orange-400/20 transition-all duration-300 transform group-hover:-translate-y-1 flex items-center justify-center gap-2">
                    Get Your Script Now
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 