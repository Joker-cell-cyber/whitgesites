"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function Expertise() {
  const expertiseAreas = [
    {
      title: "Document Translation",
      description: "Legal documents, technical manuals, academic papers, business contracts, and more.",
    },
    {
      title: "Website & App Localization",
      description: "Complete localization services to make your digital presence effective in new markets.",
    },
    {
      title: "Video Subtitling",
      description: "Professional subtitling and captioning services for all video formats.",
    },
    {
      title: "Marketing Content",
      description: "Creative translation of marketing materials that maintains your brand voice.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Our Expertise
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            At {COMPANY.serviceName}, we specialize in a wide range of translation services to meet diverse client needs.
          </p>
          
          <div className="flex justify-center mt-6 space-x-3">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <div className="h-1 w-4 bg-blue-500/40 rounded-full"></div>
            <div className="h-1 w-4 bg-indigo-500/40 rounded-full"></div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/10 to-indigo-900/10 backdrop-blur-sm p-8 rounded-xl border border-indigo-900/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                {area.title}
              </h3>
              
              <p className="text-gray-400">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6 text-indigo-300">
            Ready to break language barriers?
          </h3>
          
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-1"
          >
            Contact Us Today
          </a>
        </motion.div>
      </div>
    </section>
  );
} 