"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProcessDetailsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-950 to-indigo-950 relative overflow-hidden" id="process">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-70 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      
      <div className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 blur-[120px] -z-10"></div>
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-purple-300 text-sm font-medium bg-purple-900/50 backdrop-blur-sm border border-purple-700/40 mb-4">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Selection</span> Process
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-indigo-200/90 text-lg">
              We use a rigorous vetting process to ensure you connect with only the highest quality UGC creators.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-1 divide-y divide-white/10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/30 text-xl">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white">Initial Assessment</h3>
                      <p className="text-indigo-200/90">
                        We evaluate content quality, engagement metrics, audience demographics, and past brand collaborations to identify promising creators.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/30 text-xl">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white">Technical Verification</h3>
                      <p className="text-indigo-200/90">
                        We analyze video quality, editing skills, storytelling ability, and production value to ensure technical competence.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/30 text-xl">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white">Brand Alignment Check</h3>
                      <p className="text-indigo-200/90">
                        We match creator style, values, and audience with your brand to ensure authentic content that resonates with your target market.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/30 text-xl">4</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white">Professional Evaluation</h3>
                      <p className="text-indigo-200/90">
                        We assess communication skills, professionalism, reliability, and deadline adherence to ensure a smooth collaboration process.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative">
              {/* Image glow effect */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-indigo-500/20 blur-xl"></div>
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="UGC content creation team" 
                  width={1000}
                  height={500}
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Quality Assurance</h3>
                        <p className="text-indigo-200/90">Only top 5% of applicants qualify</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 