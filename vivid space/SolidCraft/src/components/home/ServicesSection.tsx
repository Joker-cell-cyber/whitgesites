"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Service content
const services = [
  {
    title: "Pre-Lander Design",
    description: "Custom pre-landers that warm up cold traffic and prepare visitors for your main offer.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: [
      "Attention-grabbing design",
      "Fast-loading optimized pages",
      "Mobile-responsive layouts",
      "Complete source code delivery"
    ],
    accentColor: "#0d7682",
    bgColor: "#0d7682"
  },
  {
    title: "Sales Landing Pages",
    description: "Professional high-converting sales pages designed to showcase your product and drive conversions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      "Conversion-optimized design",
      "Compelling call-to-action elements",
      "Trust-building sections",
      "Payment integration ready"
    ],
    accentColor: "#c35a38",
    bgColor: "#c35a38"
  },
  {
    title: "Lead Generation Pages",
    description: "Custom pages designed to capture quality leads and grow your email list or customer database.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: [
      "Opt-in form optimization",
      "Multi-step form options",
      "Email service integration",
      "GDPR compliant design"
    ],
    accentColor: "#ffb75e", 
    bgColor: "#ffb75e"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#fff8e9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#c35a38]/0 via-[#c35a38]/10 to-[#c35a38]/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#c35a38]/0 via-[#c35a38]/10 to-[#c35a38]/0"></div>
        
        <svg className="absolute right-0 top-0 w-1/3 h-1/3 text-[#0d7682]/5" viewBox="0 0 200 200" fill="none">
          <defs>
            <pattern id="pattern1" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(2) rotate(0)">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern1)" />
        </svg>
        
        <svg className="absolute left-0 bottom-0 w-1/3 h-1/3 text-[#c35a38]/5" viewBox="0 0 200 200" fill="none">
          <defs>
            <pattern id="pattern2" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(2) rotate(0)">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern2)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center mb-4 px-4 py-1.5 rounded-full text-sm bg-[#0d7682]/10 text-[#0d7682]"
          >
            Our Expertise
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-fraunces text-[#3b332b]"
          >
            Our Landing Page Design <span className="text-[#c35a38]">Services</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#3b332b]/70"
          >
            We specialize in creating high-converting landing pages that drive real results for your business.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link 
              href="/pricing" 
              className="px-6 py-3 bg-[#c35a38] hover:bg-[#a2482d] text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#c35a38]/20"
            >
              View Pricing Options
            </Link>
          </motion.div>
        </div>

        {/* Services Cards - Redesigned with a more modern look */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group border border-[#c35a38]/5"
            >
              {/* Card header with accent color */}
              <div 
                className="h-2 w-full" 
                style={{ backgroundColor: service.bgColor }}
              ></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${service.accentColor}15` }}
                  >
                    <div style={{ color: service.accentColor }}>
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                {/* Title and description */}
                <h3 
                  className="text-xl font-bold mb-3 text-center font-fraunces"
                  style={{ color: service.accentColor }}
                >
                  {service.title}
                </h3>

                <p className="text-[#3b332b]/70 mb-6 text-center">{service.description}</p>
                
                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, fidx) => (
                    <div 
                      key={fidx} 
                      className="flex items-start group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <svg 
                        className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        style={{ color: service.accentColor }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#3b332b]/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Card footer */}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center text-sm font-medium transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: service.accentColor }}
                  >
                    Price
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Funnel Section */}
        <div className="mt-24 overflow-hidden rounded-3xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d7682]/10 via-[#ffb75e]/5 to-[#c35a38]/10 z-0"></div>
          
          <div className="relative z-10 p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-fraunces text-[#3b332b]">Complete Funnel Design Service</h3>
                <p className="text-[#3b332b]/80 mb-8 text-lg">
                  Need a complete sales funnel? We design and connect multiple landing pages to create a seamless customer journey from awareness to conversion.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-md">
                    <div className="w-10 h-10 rounded-full bg-[#0d7682]/10 flex items-center justify-center text-[#0d7682] mr-4 flex-shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#3b332b] mb-1">Cohesive design between pages</h4>
                      <p className="text-sm text-[#3b332b]/70">Maintain brand consistency across all touchpoints</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-md">
                    <div className="w-10 h-10 rounded-full bg-[#c35a38]/10 flex items-center justify-center text-[#c35a38] mr-4 flex-shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#3b332b] mb-1">Strategic conversion pathways</h4>
                      <p className="text-sm text-[#3b332b]/70">Guide visitors through an optimized journey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-md">
                    <div className="w-10 h-10 rounded-full bg-[#ffb75e]/10 flex items-center justify-center text-[#ffb75e] mr-4 flex-shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#3b332b] mb-1">Complete funnel implementation</h4>
                      <p className="text-sm text-[#3b332b]/70">End-to-end setup with all integrations included</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-6 py-3 bg-[#0d7682] text-white rounded-full shadow-lg shadow-[#0d7682]/20 hover:bg-[#095e6e] transition-all duration-300"
                >
                  View Pricing
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
              
              {/* Funnel Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-4 mb-5 relative z-30">
                    <div className="h-3 w-20 bg-[#c35a38]/20 rounded-full mb-2"></div>
                    <div className="h-4 w-32 bg-[#c35a38]/30 rounded-lg mb-3"></div>
                    <div className="flex space-x-2 mb-2">
                      <div className="h-16 w-1/2 bg-[#f5f5f5] rounded"></div>
                      <div className="h-16 w-1/2 bg-[#f5f5f5] rounded"></div>
                    </div>
                    <div className="h-8 w-24 bg-[#c35a38] rounded-full mx-auto"></div>
                  </div>
                  
                  <div className="h-16 w-2 bg-gradient-to-b from-[#c35a38] to-[#0d7682] relative z-20"></div>
                  
                  <div className="w-full max-w-xs bg-white rounded-xl shadow-xl p-4 mb-5 relative z-30">
                    <div className="h-3 w-16 bg-[#0d7682]/20 rounded-full mb-2"></div>
                    <div className="h-4 w-24 bg-[#0d7682]/30 rounded-lg mb-3"></div>
                    <div className="h-12 bg-[#f5f5f5] rounded mb-2"></div>
                    <div className="h-6 w-20 bg-[#0d7682] rounded-full mx-auto"></div>
                  </div>
                  
                  <div className="h-16 w-2 bg-gradient-to-b from-[#0d7682] to-[#ffb75e] relative z-20"></div>
                  
                  <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-4 relative z-30">
                    <div className="h-3 w-20 bg-[#ffb75e]/20 rounded-full mb-2"></div>
                    <div className="h-4 w-32 bg-[#ffb75e]/30 rounded-lg mb-3"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="h-10 bg-[#f5f5f5] rounded mb-2"></div>
                        <div className="h-6 w-full bg-[#ffb75e] rounded-lg"></div>
                      </div>
                      <div className="h-20 bg-[#f5f5f5] rounded"></div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-1/4 -right-4 w-8 h-8 rounded-full bg-[#c35a38]/20"></div>
                  <div className="absolute bottom-1/4 -left-4 w-8 h-8 rounded-full bg-[#0d7682]/20"></div>
                  <div className="absolute top-1/2 left-1/3 w-6 h-6 rounded-full bg-[#ffb75e]/20"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}