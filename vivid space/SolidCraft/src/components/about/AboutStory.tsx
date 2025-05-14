"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function AboutStory() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl transform -rotate-6"></div>
                <div className="relative bg-slate-800 border border-slate-700/50 rounded-2xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-10 bg-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                      alt="Our team collaborating" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Founded in</div>
                        <div className="text-xl font-bold text-white">2020</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-teal-600/20 to-cyan-600/10 rounded-full blur-2xl"></div>
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-950/50 border border-teal-800/50 text-teal-400 mb-6">
                <span className="text-sm font-medium">Our Journey</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              
              <div className="space-y-6 text-lg text-slate-300">
                <p>
                  {COMPANY.serviceName} was founded in 2020 with a simple mission: to help businesses convert more visitors 
                  into customers through thoughtfully designed landing pages.
                </p>
                
                <p>
                  Our founders, experienced designers and marketers, noticed that many businesses were 
                  struggling with the same problem — beautiful websites that failed to convert visitors into customers.
                </p>
                
                <p>
                  We started as a small team of three passionate individuals and have since grown to a team of 15+ 
                  designers, developers, and conversion specialists dedicated to creating high-performing landing pages.
                </p>
                
                <p>
                  Today, we've helped over 500 businesses increase their conversion rates by an average of 45%, 
                  generating millions in additional revenue for our clients.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-500 mb-2">500+</div>
                  <div className="text-sm text-slate-400">Happy Clients</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-500 mb-2">45%</div>
                  <div className="text-sm text-slate-400">Avg. Conversion Increase</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-500 mb-2">15+</div>
                  <div className="text-sm text-slate-400">Team Members</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 