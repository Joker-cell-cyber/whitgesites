"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProcessDetailsSection() {
  return (
    <section className="py-20 bg-ug-gray-50" id="process">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ug-gray-900">
              Our <span className="gradient-text">Selection</span> Process
            </h2>
            <p className="text-ug-gray-600 text-lg">
              We use a rigorous vetting process to ensure you connect with only the highest quality UGC creators.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-md border border-ug-gray-200">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-ug-gray-900">Initial Assessment</h3>
                    <p className="text-ug-gray-600">
                      We evaluate content quality, engagement metrics, audience demographics, and past brand collaborations to identify promising creators.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-ug-gray-900">Technical Verification</h3>
                    <p className="text-ug-gray-600">
                      We analyze video quality, editing skills, storytelling ability, and production value to ensure technical competence.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-ug-gray-900">Brand Alignment Check</h3>
                    <p className="text-ug-gray-600">
                      We match creator style, values, and audience with your brand to ensure authentic content that resonates with your target market.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-ug-gray-900">Professional Evaluation</h3>
                    <p className="text-ug-gray-600">
                      We assess communication skills, professionalism, reliability, and deadline adherence to ensure a smooth collaboration process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-ug-gray-200">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="UGC content creation team" 
                width={1000}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ug-blue-900/30 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-ug-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ug-gray-900">Quality Assurance</h3>
                  <p className="text-ug-gray-600">Only top 5% of applicants qualify</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 