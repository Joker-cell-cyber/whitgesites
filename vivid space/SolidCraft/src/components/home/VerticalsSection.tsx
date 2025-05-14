"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function VerticalsSection() {
  const [activeVertical, setActiveVertical] = useState<number>(0);
  
  const verticals = [
    {
      id: 1,
      title: "E-commerce",
      description: "Custom landing pages designed to showcase products and drive sales for your online store.",
      color: "#c35a38",
      imageSrc: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "E-commerce landing page example",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Finance",
      description: "Professional landing pages that inspire trust and convert visitors for financial services.",
      color: "#0d7682",
      imageSrc: "https://images.unsplash.com/photo-1560472355-536de3962603?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Finance landing page example",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Health & Wellness",
      description: "Engaging landing pages for health products and services that resonate with your audience.",
      color: "#ffb75e",
      imageSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Health and wellness landing page example",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Education",
      description: "Informative landing pages that showcase your courses and educational offerings effectively.",
      color: "#c35a38",
      imageSrc: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Education landing page example",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#fff8e9] relative overflow-hidden" id="verticals">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Background blobs */}
        <div className="absolute h-[600px] w-[600px] -top-40 -left-40 rounded-full bg-[#c35a38]/5"></div>
        <div className="absolute h-[500px] w-[500px] -bottom-40 -right-40 rounded-full bg-[#0d7682]/5"></div>
        
        {/* Decorative pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#c35a38" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto mb-16 md:mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-[#c35a38]/10 text-[#c35a38] mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Industry Expertise
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#3b332b] font-fraunces"
          >
            Specialized Landing Pages for <span className="text-[#c35a38]">Every Industry</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#3b332b]/70"
          >
            We create custom landing pages tailored to your specific industry needs and target audience
          </motion.p>
        </div>

        {/* New interactive verticals display */}
        <div className="max-w-6xl mx-auto">
          {/* Tabs navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center mb-10 gap-3"
          >
            {verticals.map((vertical, index) => (
              <button
                key={vertical.id}
                onClick={() => setActiveVertical(index)}
                className={`group flex items-center px-5 py-3 rounded-full border-2 transition-all duration-300 ${
                  activeVertical === index 
                    ? 'border-transparent shadow-lg'
                    : 'border-[#3b332b]/10 hover:border-[#3b332b]/20 bg-white/50 hover:bg-white'
                }`}
                style={{ 
                  backgroundColor: activeVertical === index ? vertical.color : undefined,
                  boxShadow: activeVertical === index ? `0 10px 15px -3px ${vertical.color}30` : undefined
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  activeVertical === index ? 'bg-white/20' : `bg-${vertical.color}/10`
                }`}>
                  <span className={activeVertical === index ? 'text-white' : `text-${vertical.color}`}>
                    {vertical.icon}
                  </span>
                </div>
                <span className={`font-medium ${activeVertical === index ? 'text-white' : 'text-[#3b332b]'}`}>
                  {vertical.title}
                </span>
              </button>
            ))}
          </motion.div>
          
          {/* Content panel */}
          <div className="relative">
            {verticals.map((vertical, index) => (
              <motion.div
                key={vertical.id}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeVertical === index ? 1 : 0,
                  x: activeVertical === index ? 0 : activeVertical > index ? -20 : 20
                }}
                transition={{ duration: 0.5 }}
                className={`${activeVertical === index ? 'block' : 'hidden'} bg-white rounded-3xl shadow-xl overflow-hidden`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left content */}
                  <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${vertical.color}20` }}
                      >
                        <div style={{ color: vertical.color }}>
                          {vertical.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-[#3b332b] mb-4 font-fraunces">{vertical.title}</h3>
                      <p className="text-[#3b332b]/80 mb-8 text-lg">{vertical.description}</p>
                      
                      {/* Features list with larger styling */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" 
                            style={{ backgroundColor: `${vertical.color}15` }}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: vertical.color }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[#3b332b]/70">Conversion-optimized designs</span>
                        </div>
                        <div className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" 
                            style={{ backgroundColor: `${vertical.color}15` }}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: vertical.color }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[#3b332b]/70">Industry-specific best practices</span>
                        </div>
                        <div className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" 
                            style={{ backgroundColor: `${vertical.color}15` }}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: vertical.color }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[#3b332b]/70">Tailored content and imagery</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <a 
                      href="#contact" 
                      className="inline-block px-8 py-4 rounded-xl text-white font-medium transition-all duration-300 hover:translate-y-[-2px] text-center hover:shadow-lg"
                      style={{ 
                        backgroundColor: vertical.color,
                        boxShadow: `0 5px 15px -3px ${vertical.color}30`
                      }}
                    >
                      Get Started
                      <svg className="ml-2 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                  
                  {/* Right image */}
                  <div className="md:w-1/2 relative h-72 md:h-auto">
                    <Image 
                      src={vertical.imageSrc}
                      alt={vertical.imageAlt}
                      fill
                      className="object-cover"
                    />
                    {/* Decorative overlay */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ 
                        background: `linear-gradient(135deg, ${vertical.color}99, transparent)` 
                      }}
                    ></div>
                    
                    {/* Border accent */}
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-1"
                      style={{ backgroundColor: vertical.color }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 rounded-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #fff, #f7f3ed)' }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c35a38] via-[#ffb75e] to-[#0d7682]"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#c35a38]/10"></div>
          <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-[#0d7682]/10"></div>
          
          <div className="relative z-10 p-8 md:p-12 max-w-3xl mx-auto text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#c35a38]/10 mb-6">
              <svg className="w-8 h-8 text-[#c35a38]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-[#3b332b] mb-4 font-fraunces">Don&apos;t see your industry?</h3>
            <p className="text-[#3b332b]/70 mb-8">
              We specialize in creating custom landing pages for a wide range of industries. 
              Contact us to discuss your specific requirements.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 bg-[#c35a38] hover:bg-[#a2482d] text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#c35a38]/20"
            >
              Get in touch
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 