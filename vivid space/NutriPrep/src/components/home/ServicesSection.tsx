"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const benefits = [
    {
      title: "Time Savings",
      description: "Save hours each week with efficient meal prepping. Prepare once, enjoy nutritious meals all week long.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Batch cooking saves up to 5 hours weekly",
        "Quick grab-and-go healthy options",
        "Streamlined grocery shopping",
        "Less daily kitchen cleanup"
      ]
    },
    {
      title: "Portion Control",
      description: "Take the guesswork out of portion sizes with pre-measured, perfectly balanced meals that support your nutrition goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      features: [
        "Perfectly sized meal containers",
        "Calorie-controlled servings",
        "Balanced macronutrient ratios",
        "Prevents mindless overeating"
      ]
    },
    {
      title: "Budget-Friendly",
      description: "Reduce food costs with planned purchasing, bulk preparation, and minimized food waste through strategic meal planning.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Cost-effective bulk purchasing",
        "Less takeout and impulse buying",
        "Strategic use of seasonal ingredients",
        "Reduced food waste through planning"
      ]
    },
    {
      title: "Nutritionally Balanced",
      description: "Enjoy consistently nutritious meals with perfectly balanced macros and controlled ingredients for optimal health.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      features: [
        "Optimized macronutrient balance",
        "Consistent daily nutrition",
        "Proper micronutrient intake",
        "Strategic nutrient timing"
      ]
    },
    {
      title: "Reduced Food Waste",
      description: "Plan your meals intelligently to minimize food waste with proper portioning and strategic ingredient usage.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      features: [
        "Complete ingredient utilization",
        "Smart leftover repurposing",
        "Precise grocery purchasing",
        "Environmentally responsible eating"
      ]
    },
    {
      title: "Customizable Plans",
      description: "Meal prep can be tailored to any dietary preference or restriction, making healthy eating accessible for everyone.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      features: [
        "Diet-specific meal plans (keto, vegan, etc.)",
        "Allergy-friendly options",
        "Adjustable portion sizing",
        "Personalized taste preferences"
      ]
    }
  ];

  return (
    <section className="py-24 bg-white" id="benefits" ref={containerRef}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 max-w-md">
              Meal Prep <span className="text-turquoise-500">Benefits</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mt-6 md:mt-0 font-light md:text-right">
              Discover how meal prepping can transform your nutrition, save time, and make healthy eating effortless.
            </p>
          </div>
          <div className="h-0.5 w-full bg-gradient-to-r from-turquoise-500 to-purple-500 mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`md:col-span-${index % 3 === 0 ? '7' : '5'} relative group`}
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-turquoise-500/5 to-purple-500/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-12 h-12 rounded-none bg-transparent border-2 ${index % 2 === 0 ? 'border-turquoise-500' : 'border-purple-500'} flex items-center justify-center text-gray-800`}>
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold text-gray-900">{benefit.title}</h3>
                      <div className={`h-px w-12 ${index % 2 === 0 ? 'bg-turquoise-500' : 'bg-purple-500'} ml-3`}></div>
                    </div>
                    <p className="text-gray-600 mt-3 mb-5">{benefit.description}</p>
                    
                    <ul className="space-y-3">
                      {benefit.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start group/item">
                          <div className={`w-5 h-0.5 ${index % 2 === 0 ? 'bg-turquoise-500' : 'bg-purple-500'} mt-3 mr-3 transition-all duration-300 group-hover/item:w-8`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="#pricing" 
            className="inline-flex items-center text-lg group"
          >
            <span className="relative px-1">
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-turquoise-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              <span className="relative font-medium">View our meal plan packages</span>
            </span>
            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 