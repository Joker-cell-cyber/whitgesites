"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with 3D perspective effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.15),transparent_50%)] z-0"></div>
      
      {/* Mesh grid pattern */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div 
          className="absolute w-full h-full"
          style={{
            backgroundImage: "url('/grid-pattern.svg')",
            backgroundSize: "40px 40px",
            backgroundPosition: "center",
            perspective: "1000px",
            transform: "rotateX(60deg) scale(3)",
            transformOrigin: "center bottom",
            opacity: 0.1
          }}
        ></div>
      </div>
      
      {/* Flying elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Left side - 3D card with call to action */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 relative"
            >
              <div className="relative perspective-1000">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-[2px] opacity-70"></div>
                <div className="relative bg-slate-900 backdrop-blur-xl rounded-2xl p-10 lg:p-14 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 transform hover:rotate-1 hover:scale-[1.01] transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-600/20 to-cyan-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Ready to Connect With a{" "}
                    <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                      Global Audience
                    </span>?
                  </h2>
                  
                  <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
                    Start your translation journey today and make your content accessible to millions around the world.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Link 
                      href="/pricing" 
                      className="relative group"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative px-8 py-4 bg-slate-900 rounded-full flex items-center justify-center font-medium text-white group-hover:bg-slate-800 transition-colors">
                        <span>Get Started</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </Link>
                    <Link 
                      href="/contact" 
                      className="relative px-8 py-4 rounded-full flex items-center justify-center text-slate-300 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Features & Benefits */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-1 relative"
            >
              <div className="relative z-10">
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-br from-indigo-500/10 via-blue-400/5 to-transparent rounded-full blur-2xl"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Fast Turnaround", description: "Get your translations delivered on schedule, every time." },
                    { title: "Certified Translators", description: "Native-speaking experts with subject matter knowledge." },
                    { title: "30+ Languages", description: "Support for all major languages across the globe." },
                    { title: "100% Satisfaction", description: "Committed to quality with revision guarantees." }
                  ].map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 group-hover:border-blue-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-slate-700/50 mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 