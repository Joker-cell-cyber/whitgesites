"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Features data
const features = [
  {
    title: "Drag & Drop Builder",
    description: "Create stunning landing pages in minutes with our intuitive drag-and-drop interface. No coding required.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    title: "A/B Testing",
    description: "Test different versions of your landing pages to find what converts best. Easy setup and real-time results.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Conversion Optimization",
    description: "Built-in analytics and heatmaps to track user behavior and optimize for higher conversion rates.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: "Pre-built Templates",
    description: "Start with our professionally designed templates for different niches and customize to match your brand.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    title: "Mobile Optimization",
    description: "Every landing page automatically adapts to any device size for perfect mobile-first experiences.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Integrations",
    description: "Connect with your favorite marketing tools, CRMs, and email providers for seamless workflows.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#fff8e9] relative" id="features">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute h-[500px] w-[500px] -top-72 -left-72 rounded-full bg-[#c35a38]/5"></div>
        <div className="absolute h-[400px] w-[400px] -bottom-72 -right-72 rounded-full bg-[#0d7682]/5"></div>
        <div className="absolute w-full h-full">
          <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 C25,30 75,70 100,50 L100,100 L0,100 Z" fill="#ffb75e" fillOpacity="0.05"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-[#0d7682]/10 text-[#0d7682] mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Features
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#3b332b] font-fraunces"
          >
            Everything You Need to <span className="text-[#c35a38]">Convert Visitors</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#3b332b]/70"
          >
            Powerful tools designed specifically for affiliate marketers to create high-converting landing pages.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-center">
          {/* Features visual showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 relative"
          >
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl shadow-[#c35a38]/10 border border-[#c35a38]/5 overflow-hidden">
              {/* Platform window mockup */}
              <div className="bg-[#fafafa] rounded-xl overflow-hidden">
                <div className="h-10 bg-[#f2f2f2] border-b border-[#e5e5e5] flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#c35a38]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffb75e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#0d7682]"></div>
                  </div>
                  <div className="mx-auto px-4 py-1 bg-white rounded-full text-xs text-[#3b332b]/60 border border-[#e5e5e5]">
                    clickforge.io/dashboard
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1 space-y-3">
                      <div className="h-8 bg-[#c35a38]/10 rounded-lg"></div>
                      <div className="h-24 bg-[#0d7682]/5 rounded-lg"></div>
                      <div className="h-24 bg-[#ffb75e]/10 rounded-lg"></div>
                    </div>
                    <div className="col-span-2 bg-white border border-[#e5e5e5] rounded-lg p-3">
                      <div className="h-6 w-3/4 bg-[#f2f2f2] rounded mb-3"></div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="h-20 bg-[#f2f2f2] rounded"></div>
                        <div className="h-20 bg-[#f2f2f2] rounded"></div>
                      </div>
                      <div className="h-6 w-1/2 bg-[#f2f2f2] rounded mb-3"></div>
                      <div className="h-32 bg-[#f2f2f2] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/3 -right-4 transform w-8 h-8 rounded-full bg-[#c35a38]/20"></div>
                <div className="absolute bottom-1/4 -left-4 transform w-8 h-8 rounded-full bg-[#0d7682]/20"></div>
              </div>
            </div>
            
            {/* Floating stats element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-[#c35a38]/10"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#c35a38]/10 flex items-center justify-center text-[#c35a38]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-xs text-[#3b332b]/70">Drag & Drop</div>
                  <div className="text-sm font-medium text-[#3b332b]">No-code Builder</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Features grid */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white p-6 rounded-xl shadow-md border border-[#c35a38]/5 hover:shadow-lg hover:border-[#c35a38]/20 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-[#c35a38]/10 flex items-center justify-center text-[#c35a38]">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-[#3b332b]">{feature.title}</h3>
                      <p className="text-[#3b332b]/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 md:mt-24 bg-gradient-to-r from-[#c35a38]/10 to-[#0d7682]/10 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3b332b] mb-4 font-fraunces">Ready to create your landing page?</h3>
              <p className="text-[#3b332b]/70 mb-6">
                Start with our powerful platform and see the difference in your conversion rates.
              </p>
              <a 
                href="/pricing" 
                className="inline-flex items-center px-6 py-3 bg-[#c35a38] hover:bg-[#a2482d] text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#c35a38]/20"
              >
                View Pricing Options
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="flex justify-end">
              <div className="grid grid-cols-3 gap-3">
                <div className="w-12 h-12 rounded-full bg-[#c35a38]/10 flex items-center justify-center text-[#c35a38]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#0d7682]/10 flex items-center justify-center text-[#0d7682]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ffb75e]/10 flex items-center justify-center text-[#ffb75e]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 