"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Submit Your Content",
      description: "Upload your documents or video files through our secure platform. We accept a wide range of file formats.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      title: "Select Your Options",
      description: "Choose your target languages, service level, and any specialized requirements for your translation project.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      )
    },
    {
      title: "Professional Translation",
      description: "Our expert linguists translate your content with precision, maintaining tone, context, and cultural nuances.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      )
    },
    {
      title: "Receive Your Translation",
      description: "Download your completed translations through our platform, ready to use in your business or creative projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b]/70" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-300">Our streamlined process makes it easy to get professional translations for all your content.</p>
        </div>

        <div className="relative mt-20">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 transform -translate-x-1/2 z-0"></div>
          
          <div className="space-y-20">
            {steps.map((step, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-[#1e293b]/80 p-6 rounded-xl border border-indigo-800/30 shadow-lg backdrop-blur-sm">
                      <h3 className="text-2xl font-bold mb-3 text-white flex items-center gap-2 justify-normal md:justify-end">
                        <span className="inline-block w-8 h-8 rounded-full bg-blue-500 text-white text-center leading-8 font-bold md:order-2">
                          {index + 1}
                        </span>
                        <span>{step.title}</span>
                      </h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 rounded-full bg-[#1e293b] border-4 border-indigo-600 flex items-center justify-center text-blue-400 shadow-lg z-20">
                    {step.icon}
                  </div>
                  
                  <div className="hidden md:block w-full md:w-1/2"></div>
                  </div>
                </motion.div>
              ))}
        </div>
        </div>
      </div>
    </section>
  );
} 