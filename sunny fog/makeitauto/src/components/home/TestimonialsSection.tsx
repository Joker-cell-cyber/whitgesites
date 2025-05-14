"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const containerRef = useRef(null);

  const features = [
    {
      icon: "🔍",
      title: "In-depth Analysis",
      description: "We take the time to understand your current processes in detail to identify the best automation opportunities."
    },
    {
      icon: "⚙️",
      title: "Custom Solutions",
      description: "Each solution is specifically designed for your business, taking into account your unique objectives and existing workflow."
    },
    {
      icon: "🚀",
      title: "Technological Expertise",
      description: "Our team masters the most powerful automation platforms like Make.com and Zapier to create robust solutions."
    },
    {
      icon: "📚",
      title: "Complete Documentation",
      description: "We provide detailed documentation and training so you can easily understand and manage your automations."
    }
  ];

  const advantages = [
    {
      icon: "⏱️",
      title: "Significant Time Savings",
      description: "Automation frees your team from repetitive tasks, allowing them to focus on higher-value activities."
    },
    {
      icon: "📊",
      title: "Error Reduction",
      description: "Automated processes eliminate human errors and ensure consistent execution every time."
    },
    {
      icon: "💰",
      title: "Cost Savings",
      description: "Reduce operational costs by automating manual processes and optimizing resource utilization."
    },
    {
      icon: "📈",
      title: "Easy Scalability",
      description: "Automation solutions adapt easily to your business growth without requiring additional resources."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-make-purple-50/50 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-make-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-make-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-make-purple-100 to-make-blue-100 text-make-purple-800 text-sm font-medium mb-6">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Why <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">choose us</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-make-purple-100/70 -z-10 rounded-sm"></span>
              </span> ?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We combine technical expertise and a personalized approach to create automation solutions that transform your business
            </p>
          </motion.div>
        </div>

        {/* Features grid */}
        <div ref={containerRef} className="max-w-6xl mx-auto mb-20">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-make-purple-100 to-make-blue-100 rounded-2xl flex items-center justify-center text-4xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Central divider with heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6 inline-block relative">
            <span className="relative z-10">The benefits of automation</span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-make-purple-100/70 -z-10 rounded-sm"></span>
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here are the concrete benefits you can expect when implementing our automation solutions in your business
          </p>
        </motion.div>

        {/* Advantages grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-md card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4 text-center mx-auto">{advantage.icon}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h4>
              <p className="text-gray-600 text-sm">{advantage.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-make-purple-600 to-make-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Discuss your project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 