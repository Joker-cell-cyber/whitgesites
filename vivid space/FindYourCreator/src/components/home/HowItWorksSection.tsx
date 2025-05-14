"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Submit Your Brief",
      description: "Fill out our detailed brand questionnaire to help us understand your brand identity, target audience, and content goals."
    },
    {
      number: "02",
      title: "Creator Matching",
      description: "Our team carefully selects UGC creators who align with your brand values and have experience in your industry."
    },
    {
      number: "03",
      title: "Review & Approve",
      description: "Review creator profiles and portfolios. Choose the creators that best match your vision and requirements."
    },
    {
      number: "04",
      title: "Successful Connection",
      description: "We facilitate the introduction and help establish clear project guidelines between you and the selected creators."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-teal-950 to-emerald-950" id="how-it-works">
      {/* Decorative Elements */}
      <div className="absolute left-0 right-0 h-full max-w-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px]"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-[100px]"></div>
        <div className="absolute w-full h-full opacity-20 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-emerald-400 text-sm font-medium bg-emerald-950 border border-emerald-800/50 mb-4">The Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Works</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
            <p className="text-emerald-200/90 text-lg">
              Our simple 4-step process makes finding the perfect UGC creators for your brand effortless.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connection line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-600 hidden lg:block transform -translate-x-1/2 origin-top"
          ></motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:col-start-2"}`}
              >
                {/* Step circle with number */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.2 + 0.3 }}
                  className={`absolute z-20 ${
                    index % 2 === 0 
                      ? "lg:right-0 lg:translate-x-1/2" 
                      : "lg:left-0 lg:-translate-x-1/2"
                  } top-0 transform -translate-y-1/3`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 blur-md"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/30 border border-emerald-400/20">
                      {step.number}
                    </div>
                  </div>
                </motion.div>
                
                {/* Content card */}
                <div className="relative z-10 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl shadow-emerald-900/5 hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-emerald-200/90">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a 
            href="/pricing" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-medium shadow-lg shadow-emerald-900/30 hover:shadow-xl hover:shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-1"
          >
            View Our Packages
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 