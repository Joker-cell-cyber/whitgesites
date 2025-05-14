"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const processSteps = [
    {
      id: 1,
      title: "Share Your Vision",
      description: "Tell us about your e-book idea, target audience, and any specific requirements. Provide any research or content you already have that can help us understand your vision better.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "First Draft Creation",
      description: "Our expert writers craft the initial draft of your e-book, focusing on structure, content flow, and key messaging. We work to capture your unique voice and vision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Revision & Refinement",
      description: "Review the draft and provide feedback. Our team then refines the content, addressing your comments and making necessary adjustments to ensure your complete satisfaction.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Final Delivery",
      description: "Receive your polished e-book in your preferred format (PDF, EPUB, MOBI, etc.). For enhanced packages, we'll include professional formatting and cover design to make your book market-ready.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M19 13l-4 4M12 19l-7-7 7-7m7 7l-7 7-7-7" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-scribe-indigo-50/20 to-white"></div>
      <div className="hidden md:block absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-scribe-indigo-200/50 to-transparent"></div>
      
      {/* Animated dot pattern background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute w-full h-full opacity-[0.03]">
          <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-12 gap-4">
            {Array.from({ length: 120 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-scribe-indigo-900"></div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-scribe-indigo-100 text-scribe-indigo-800 mb-6">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
              </svg>
              <span>Simple Process</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-scribe-indigo-950">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">Works</span>
            </h2>
            
            <p className="text-scribe-indigo-700 text-lg mx-auto max-w-2xl">
              Our streamlined process makes it easy to transform your ideas into professionally written e-books.
            </p>
          </motion.div>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-scribe-indigo-100 via-scribe-indigo-200 to-scribe-turquoise-200 rounded-full"></div>
          
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-16 last:mb-0 relative"
            >
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-scribe-indigo-100 z-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-scribe-indigo-600 to-scribe-turquoise-500 flex items-center justify-center text-white font-bold text-lg">
                    {step.id}
                  </div>
                </div>
              </div>
              
              {/* Content Grid */}
              <div className={`grid md:grid-cols-2 gap-8 ${
                index % 2 === 0 ? "md:pr-16" : "md:pl-16"
              }`}>
                {/* For odd steps, image on left, content on right */}
                {index % 2 === 0 ? (
                  <>
                    <div className="flex md:justify-end">
                      <div className="relative max-w-md">
                        <div className="md:hidden flex items-center mb-4 space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-scribe-indigo-600 to-scribe-turquoise-500 flex items-center justify-center text-white font-bold">
                            {step.id}
                          </div>
                          <h3 className="text-xl font-bold text-scribe-indigo-900">
                            {step.title}
                          </h3>
                        </div>
                        <div className="rounded-2xl overflow-hidden group">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-scribe-indigo-900/60 to-scribe-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white">{step.icon}</div>
                            </div>
                            <Image
                              src={step.image}
                              alt={step.title}
                              width={600}
                              height={400}
                              className="w-full h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:pl-8">
                      <div className="hidden md:block">
                        <h3 className="text-2xl font-bold mb-4 text-scribe-indigo-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-scribe-indigo-700 leading-relaxed mb-6">
                        {step.description}
                      </p>
                      {step.id === 1 && (
                        <div className="bg-gradient-to-r from-scribe-indigo-50 to-scribe-turquoise-50 rounded-xl p-4 border-l-4 border-scribe-indigo-500">
                          <p className="text-scribe-indigo-800 font-medium">
                            Starting is easy! Simply choose a package and share your vision with us.
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // For even steps, content on left, image on right (in desktop)
                  <>
                    <div className="md:pr-8 md:order-1 order-2">
                      <div className="md:hidden flex items-center mb-4 space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-scribe-indigo-600 to-scribe-turquoise-500 flex items-center justify-center text-white font-bold">
                          {step.id}
                        </div>
                        <h3 className="text-xl font-bold text-scribe-indigo-900">
                          {step.title}
                        </h3>
                      </div>
                      <div className="hidden md:block">
                        <h3 className="text-2xl font-bold mb-4 text-scribe-indigo-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-scribe-indigo-700 leading-relaxed mb-6">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex md:justify-start order-1 md:order-2">
                      <div className="relative max-w-md">
                        <div className="rounded-2xl overflow-hidden group">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-scribe-indigo-900/60 to-scribe-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white">{step.icon}</div>
                            </div>
                            <Image
                              src={step.image}
                              alt={step.title}
                              width={600}
                              height={400}
                              className="w-full h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {step.id === 2 && (
                              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg border border-scribe-indigo-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-scribe-indigo-50 rounded-lg flex items-center justify-center text-scribe-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="text-scribe-indigo-900 font-medium">Quick Turnaround</div>
                                    <div className="text-scribe-indigo-600 text-sm">Efficient Process</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 text-white font-medium transition-transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            <span>See Our Packages</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 