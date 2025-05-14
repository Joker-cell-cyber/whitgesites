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
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ug-gray-900">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-ug-gray-600 text-lg">
              Our simple 4-step process makes finding the perfect UGC creators for your brand effortless.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-ug-blue-100 hidden lg:block transform -translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16 lg:col-start-2"}`}
              >
                <div className="bg-white rounded-xl p-8 shadow-md border border-ug-gray-200 relative z-10 hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-8 left-0 w-12 h-12 bg-gradient-to-r from-ug-blue-600 to-ug-blue-400 rounded-full flex items-center justify-center text-white font-bold -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-1/2">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-ug-gray-900">{step.title}</h3>
                  <p className="text-ug-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 text-white rounded-lg font-medium button-glow"
          >
            Start Your Project
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 