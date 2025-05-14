"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VerticalsSection() {
  const verticals = [
    {
      id: 1,
      title: "E-commerce",
      description: "Custom landing pages designed to showcase products and drive sales for your online store.",
      color: "from-blue-500 to-indigo-600",
      imageSrc: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "E-commerce landing page example",
    },
    {
      id: 2,
      title: "Finance",
      description: "Professional landing pages that inspire trust and convert visitors for financial services.",
      color: "from-emerald-500 to-teal-600",
      imageSrc: "https://images.unsplash.com/photo-1560472355-536de3962603?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Finance landing page example",
    },
    {
      id: 3,
      title: "Health & Wellness",
      description: "Engaging landing pages for health products and services that resonate with your audience.",
      color: "from-rose-500 to-pink-600",
      imageSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Health and wellness landing page example",
    },
    {
      id: 4,
      title: "Education",
      description: "Informative landing pages that showcase your courses and educational offerings effectively.",
      color: "from-amber-500 to-orange-600",
      imageSrc: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Education landing page example",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <section className="py-24 bg-[#0a0a0a] relative" id="verticals">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[rgba(37,99,235,0.03)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[rgba(124,58,237,0.03)] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[rgba(124,58,237,0.1)] text-[rgb(124,58,237)] mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Industry Expertise
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Specialized Landing Pages for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">Every Industry</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We create custom landing pages tailored to your specific industry needs and target audience
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {verticals.map((vertical) => (
            <motion.div
              key={vertical.id}
              variants={itemVariants}
              className="flex flex-col bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden hover:border-[rgba(124,58,237,0.3)] transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${vertical.color} opacity-10 z-10`}></div>
                <div className="relative h-full w-full">
                  <Image 
                    src={vertical.imageSrc}
                    alt={vertical.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3">{vertical.title}</h3>
                <p className="text-gray-400 mb-4">{vertical.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Don&apos;t see your industry?</h3>
            <p className="text-gray-400 mb-6">
              We specialize in creating custom landing pages for a wide range of industries. 
              Contact us to discuss your specific requirements.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)] text-white rounded-lg hover:shadow-lg hover:shadow-[rgba(124,58,237,0.3)] transition-all duration-300"
            >
              Get in touch
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 