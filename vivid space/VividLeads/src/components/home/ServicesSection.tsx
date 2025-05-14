"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  
  const services = [
    {
      title: "B2B Leads",
      description: "Connect with decision-makers at companies that need your products and services right now.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: [
        "Verified business contacts",
        "Decision-maker information",
        "Company size and industry data",
        "Intent signals and buying triggers"
      ],
      illustration: "/images/b2b-leads-illustration.jpg",
      fallbackIllustration: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "B2C Consumer Leads",
      description: "Reach qualified consumers actively looking for products and services like yours.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        "Verified contact information",
        "Interest and intent data",
        "Demographics matching",
        "Purchase history indicators"
      ],
      illustration: "/images/b2c-leads-illustration.jpg",
      fallbackIllustration: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Industry-Specific Leads",
      description: "Target prospects in specialized industries with customized lead generation campaigns.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      features: [
        "Industry-specific data points",
        "Regulatory compliance verified",
        "Specialized qualification criteria",
        "Tailored contact approach"
      ],
      illustration: "/images/industry-leads-illustration.jpg",
      fallbackIllustration: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  return (
    <section className="py-24 relative" id="services">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-b from-vivid-purple-500/5 to-transparent"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-t from-vivid-amber-500/5 to-transparent"></div>
        
        <svg className="absolute bottom-0 left-0 text-vivid-purple-900/5 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,192C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-vivid-purple-900/20 text-vivid-purple-400 text-sm font-medium">
              Premium Services
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Our <span className="gradient-text">Premium</span> Lead Categories
          </h2>
          <p className="text-gray-400 text-lg">
            We deliver high-quality, verified leads that match your specific needs and convert at higher rates.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="flex flex-wrap justify-center space-x-2 sm:space-x-6">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative px-6 py-3 mb-4 rounded-full font-medium text-sm transition-all duration-300 
                    ${activeService === index 
                      ? 'bg-gradient-to-r from-vivid-purple-600 to-vivid-amber-500 text-white shadow-lg shadow-vivid-purple-900/20' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveService(index)}
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-5 h-5">{service.icon}</span>
                    <span>{service.title}</span>
                  </span>
                  {activeService === index && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-vivid-purple-600 to-vivid-amber-500 rounded-full -z-10"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="overflow-hidden">
            <div className="relative">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeService === index ? 1 : 0,
                    x: activeService === index ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${activeService === index ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2 order-2 md:order-1">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-vivid-purple-600 to-vivid-amber-500 rounded-2xl blur"></div>
                        <div className="relative h-full bg-gray-900 rounded-2xl p-6 overflow-hidden">
                          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-vivid-purple-600/10 rounded-full blur-2xl"></div>
                          <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vivid-purple-600 to-vivid-amber-500 flex items-center justify-center mb-6 text-white">
                              {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-6">{service.description}</p>
                            
                            <ul className="space-y-4">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-gray-300">
                                  <span className="w-6 h-6 mr-3 rounded-full bg-vivid-purple-500/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="h-4 w-4 text-vivid-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3 order-1 md:order-2">
                      <div className="relative h-full">
                        {/* New image illustration for each service */}
                        <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                          <div className="absolute inset-0 opacity-10 z-0">
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#serviceGradient)" />
                              <defs>
                                <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#9333ea" />
                                  <stop offset="100%" stopColor="#f59e0b" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          
                          {/* Main image with fallback */}
                          <div className="absolute inset-0 z-0">
                            <Image 
                              src={service.fallbackIllustration}
                              alt={service.title}
                              fill
                              className="object-cover"
                              style={{ opacity: 0.7 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                          </div>
                          
                          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                            {/* Top decorative element */}
                            <div className="mb-6">
                              <div className="w-20 h-1 bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-full"></div>
                            </div>
                            
                            {/* Service-specific visual */}
                            <div className="flex-grow flex items-center justify-center py-8">
                              {index === 0 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className="relative"
                                >
                                  <div className="absolute -inset-4 bg-vivid-purple-500/10 rounded-full blur-xl"></div>
                                  <div className="relative bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 max-w-md">
                                    <div className="flex items-center gap-4 mb-4">
                                      <div className="w-12 h-12 rounded-full bg-vivid-purple-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-vivid-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      </div>
                                      <div>
                                        <h4 className="text-lg font-medium text-white">B2B Lead Profile</h4>
                                        <p className="text-sm text-gray-400">Qualified business leads</p>
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Contact accuracy:</span>
                                        <span className="text-white font-medium">98%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-full" style={{width: "98%"}}></div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Decision-maker data:</span>
                                        <span className="text-white font-medium">94%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-full" style={{width: "94%"}}></div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Buying intent signals:</span>
                                        <span className="text-white font-medium">78%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-full" style={{width: "78%"}}></div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                              
                              {index === 1 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className="grid grid-cols-2 gap-4 w-full max-w-md"
                                >
                                  {[1, 2, 3, 4].map((item) => (
                                    <motion.div
                                      key={item}
                                      initial={{ y: 20, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      transition={{ duration: 0.3, delay: 0.1 * item }}
                                      className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50"
                                    >
                                      <div className="w-10 h-10 mb-3 rounded-full bg-vivid-amber-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vivid-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                      </div>
                                      <div className="text-sm text-white font-medium">Consumer {item}</div>
                                      <div className="text-xs text-gray-400">High intent score</div>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                              
                              {index === 2 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className="relative"
                                >
                                  <div className="absolute -inset-4 bg-vivid-amber-500/10 rounded-full blur-xl"></div>
                                  <div className="relative flex flex-col items-center">
                                    <div className="mb-4 text-center">
                                      <div className="inline-block p-3 rounded-xl bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-vivid-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                      </div>
                                      <h4 className="text-lg font-medium text-white">Industry-Specific</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                      {['Healthcare', 'Tech', 'Finance', 'Education'].map((industry, i) => (
                                        <motion.div
                                          key={industry}
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ duration: 0.3, delay: 0.1 * i }}
                                          className="bg-gradient-to-br from-gray-800/70 to-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center"
                                        >
                                          <div className="text-sm text-white font-medium">{industry}</div>
                                          <div className="text-xs text-gray-400">Specialized</div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Bottom info and CTA */}
                            <div className="mt-auto">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-400">
                                  Tailored to your specific needs
                                </div>
                                <div className="flex h-2 space-x-1">
                                  {[0, 1, 2].map(idx => (
                                    <div
                                      key={idx}
                                      className={`h-2 w-2 rounded-full ${
                                        index === idx
                                          ? 'bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500'
                                          : 'bg-gray-700'
                                      }`}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="#pricing" className="inline-flex items-center text-vivid-purple-400 hover:text-vivid-purple-300 transition-colors font-medium">
            <span>View our lead packages and pricing</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 