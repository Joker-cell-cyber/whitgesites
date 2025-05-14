"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="cta">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#070d0b] z-0">
        <div className="absolute inset-0 bg-grid opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="absolute top-10 right-10 w-72 h-72 text-rank-emerald-500/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M46.5,-78.3C59.1,-70.9,67.7,-56.1,74.2,-41.3C80.8,-26.5,85.1,-11.7,83.2,2.1C81.2,16,72.9,28.8,64.4,41.2C55.9,53.7,47.1,65.8,35.3,71.7C23.6,77.7,8.9,77.5,-4.8,74.9C-18.5,72.3,-31.2,67.2,-42.9,59.8C-54.5,52.4,-65.1,42.7,-69.9,30.7C-74.7,18.7,-73.6,4.6,-71.8,-9.6C-70,-23.9,-67.5,-38.1,-59.4,-47.8C-51.3,-57.5,-37.7,-62.5,-24.6,-70.2C-11.5,-77.9,1.1,-88.3,14.7,-87.8C28.4,-87.3,43.9,-75.9,46.5,-78.3Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-10 left-10 w-96 h-96 text-rank-orange-500/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M39.9,-65.7C54.2,-61,70,-53.4,77.9,-41C85.8,-28.6,85.8,-11.6,82.1,3.5C78.5,18.7,71.2,32,62.4,43.6C53.6,55.3,43.3,65.4,30.7,71.4C18.2,77.5,3.5,79.6,-11.5,78.7C-26.5,77.8,-41.7,74.1,-54.4,66C-67,57.9,-77,45.6,-82.2,31.2C-87.4,16.8,-87.9,0.3,-83.9,-14.7C-79.9,-29.7,-71.5,-43.2,-59.9,-49.8C-48.3,-56.4,-33.6,-56,-20.7,-61.6C-7.9,-67.1,3.3,-78.6,15.1,-79.4C27,-80.3,39.4,-70.4,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-card-bg to-rank-emerald-900/10 border border-rank-emerald-500/10 shadow-2xl">
          {/* Main content */}
          <div className="py-16 px-6 md:py-20 md:px-10 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-3"
                >
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-rank-emerald-900/40 text-rank-emerald-300 backdrop-blur-sm border border-rank-emerald-700/20 mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-rank-emerald-400 animate-pulse mr-2.5"></span>
                    <span className="font-medium text-sm">New Player Special</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-poppins">
                    Ready to <span className="gradient-text">Elevate</span> Your Game?
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Join thousands of satisfied players who have reached their desired ranks with our professional boosting services. Get 15% off your first boost when you sign up today!
                  </p>
                
                  <div className="flex flex-wrap gap-5 mt-8">
                    <Link
                      href="/pricing"
                      className="px-8 py-4 rounded-lg text-white font-medium text-lg button-apex"
                    >
                      View Pricing
                    </Link>
                    <Link
                      href="/contact"
                      className="px-8 py-4 rounded-lg border border-rank-emerald-700/30 text-white hover:bg-rank-emerald-900/20 transition-colors font-medium text-lg"
                    >
                      Talk to an Expert
                    </Link>
                  </div>
                  
                  {/* Trust badges */}
                  <div className="mt-12 grid grid-cols-3 gap-4">
                    <div className="bg-card-accent rounded-xl p-4 border border-rank-emerald-900/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-rank-emerald-900/40 text-rank-emerald-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="font-medium">Secure Boosting</div>
                      </div>
                      <p className="text-sm text-gray-400">Account safety guaranteed with our VPN protection</p>
                    </div>
                    
                    <div className="bg-card-accent rounded-xl p-4 border border-rank-emerald-900/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-rank-emerald-900/40 text-rank-emerald-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="font-medium">Fast Delivery</div>
                      </div>
                      <p className="text-sm text-gray-400">Quick turnaround times with experienced boosters</p>
                    </div>
                    
                    <div className="bg-card-accent rounded-xl p-4 border border-rank-emerald-900/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-rank-emerald-900/40 text-rank-emerald-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="font-medium">Money-Back</div>
                      </div>
                      <p className="text-sm text-gray-400">100% satisfaction guarantee or your money back</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Stats card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-card-bg rounded-2xl overflow-hidden border border-rank-emerald-800/20 shadow-xl relative">
                    {/* Header */}
                    <div className="bg-card-accent p-4 border-b border-rank-emerald-900/20 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md overflow-hidden bg-gradient-to-br from-rank-emerald-500 to-rank-orange-500 flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">{COMPANY.serviceName.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{COMPANY.serviceName} Stats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-rank-emerald-500 animate-pulse"></div>
                        <span className="text-rank-emerald-400 text-xs">LIVE</span>
                      </div>
                    </div>
                    
                    {/* Body */}
                    <div className="p-6">
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <div className="text-gray-400 text-sm mb-1">Customers Served</div>
                          <div className="text-4xl font-bold gradient-text">5,000+</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm mb-1">Satisfaction Rate</div>
                          <div className="text-4xl font-bold text-rank-emerald-400">99.7%</div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Orders Completed</span>
                            <span className="text-sm text-rank-emerald-400">8,490</span>
                          </div>
                          <div className="h-2 bg-rank-emerald-900/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-rank-emerald-500 to-rank-orange-500 rounded-full" style={{ width: "96%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Active Boosters</span>
                            <span className="text-sm text-rank-emerald-400">150+</span>
                          </div>
                          <div className="h-2 bg-rank-emerald-900/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-rank-emerald-500 to-rank-orange-500 rounded-full" style={{ width: "82%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Average Delivery Time</span>
                            <span className="text-sm text-rank-emerald-400">4.3 days</span>
                          </div>
                          <div className="h-2 bg-rank-emerald-900/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-rank-emerald-500 to-rank-orange-500 rounded-full" style={{ width: "76%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 bg-rank-emerald-900/20 rounded-xl p-4 border border-rank-emerald-800/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-rank-emerald-900/40 text-rank-emerald-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold">100% Success Rate</div>
                            <div className="text-sm text-gray-400">All rank goals guaranteed or your money back</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 