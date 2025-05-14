"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function Mission() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden relative bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-1">
              <div className="absolute inset-0 bg-[url('/images/world-map-dots.svg')] bg-no-repeat bg-center bg-contain opacity-20"></div>
              <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-indigo-900/40 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Our Vision</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To create a more connected world where language barriers no longer limit communication, understanding, and growth.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full filter blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-28 h-28 bg-blue-600/10 rounded-full filter blur-xl"></div>
          </motion.div>
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our Mission
            </h2>
            
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              At {COMPANY.serviceName}, our mission is to provide exceptional translation services that not only convert words from one language to another but preserve the nuances, context, and cultural significance of the original content.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe that accurate translation is about more than just linguistic equivalence—it&apos;s about enabling true cross-cultural communication that feels natural and authentic to all audiences.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Our dedicated team works to ensure that every translation project, whether it&apos;s a technical document, marketing content, or video subtitling, maintains the integrity and impact of your message across linguistic boundaries.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 