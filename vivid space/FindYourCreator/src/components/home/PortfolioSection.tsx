"use client";

import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Tell us what you need",
      description: "Share your creator requirements, content goals, and brand guidelines with our team.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "We source relevant creators",
      description: "Our team finds and vets creators that match your brand's needs and audience demographics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "You review and select creators",
      description: "We present you with a curated list of creators - you choose who's right for your brand.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "We make the connection",
      description: "We facilitate introductions and help establish clear terms for your collaboration.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 relative" id="how-it-works">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our simple, efficient process helps you find the perfect UGC creators without the hassle
            </p>
          </motion.div>
        </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
          {steps.map((step, index) => (
                <motion.div
              key={index}
                  variants={itemVariants}
              className="relative"
            >
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%_-_10px)] w-full h-0.5 bg-gradient-to-r from-vid-red-500 to-vid-orange-500 transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="card-hover rounded-xl p-6 text-center relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-vid-red-600 to-vid-orange-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.number}
                      </div>
                
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-gray-700/20 flex items-center justify-center text-vid-red-500 mx-auto mb-4">
                  {step.icon}
                    </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 flex-grow">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <div className="card-hover rounded-xl p-6 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-sm border border-gray-700/20 shadow-lg shadow-vid-orange-900/5">
            <h3 className="text-xl font-bold mb-4 text-white">Time-Saving Efficiency</h3>
            <p className="text-gray-400">
              Our streamlined process takes the guesswork out of finding UGC creators. Instead of spending hours searching and vetting talent, you can focus on your core business while we handle the entire creator sourcing process.
            </p>
        </div>
        </motion.div>
      </div>
    </section>
  );
} 