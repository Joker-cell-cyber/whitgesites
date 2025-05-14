"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="cta">
      {/* Full-width background overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-cs-navy-800 to-cs-navy-900 z-0">
        {/* Animated dot pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '30px 30px'
          }}>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-cs-blue-500/20 filter blur-[100px] animate-slow-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-cs-blue-700/20 filter blur-[120px] animate-slow-float-delay"></div>
      </div>

      {/* Wave decorations */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
        <svg className="w-full h-16 text-white" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 100L48 87.5C96 75 192 50 288 54.2C384 58.3 480 91.7 576 95.8C672 100 768 75 864 62.5C960 50 1056 50 1152 54.2C1248 58.3 1344 66.7 1392 70.8L1440 75V0H0V100Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
                <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
            transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cs-navy-900">
                      Ready to <span className="gradient-text">Boost Your Sales</span> with Professional Scripts?
                </h2>
                    <p className="text-lg text-cs-navy-700 mb-8">
                      Start converting more prospects into customers today with scientifically engineered sales scripts created specifically for your business.
                </p>
                
                    <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center">
                        <svg className="w-5 h-5 text-cs-blue-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                        <span className="text-cs-navy-800">Multiple Script Options</span>
                    </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-cs-blue-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span className="text-cs-navy-800">Fast 24-Hour Delivery</span>
                  </div>
                  <div className="flex items-center">
                        <svg className="w-5 h-5 text-cs-blue-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                        <span className="text-cs-navy-800">Industry-Specific Content</span>
                    </div>
                    </div>
                    
                    <Link 
                      href="/#pricing" 
                      className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-cs-navy-900 rounded-xl font-bold button-glow text-center text-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                      Get Your Script Now
                      <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </motion.div>
              </div>
              
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    {/* Custom illustration for CTA section */}
                    <svg width="100%" height="auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background elements */}
                      <circle cx="200" cy="200" r="180" fill="#F0F5FF" />
                      
                      {/* Phone with script effect */}
                      <rect x="135" y="70" width="130" height="260" rx="15" fill="#2E3560" />
                      <rect x="145" y="90" width="110" height="200" rx="5" fill="white" />
                      
                      {/* Screen content */}
                      <rect x="155" y="110" width="90" height="15" rx="3" fill="#E0EAFF" />
                      <rect x="155" y="135" width="90" height="10" rx="3" fill="#E0EAFF" />
                      <rect x="155" y="155" width="60" height="10" rx="3" fill="#E0EAFF" />
                      <rect x="155" y="175" width="90" height="10" rx="3" fill="#E0EAFF" />
                      <rect x="155" y="195" width="40" height="10" rx="3" fill="#E0EAFF" />
                      <rect x="155" y="215" width="70" height="10" rx="3" fill="#E0EAFF" />
                      <rect x="155" y="235" width="50" height="25" rx="5" fill="#3A6FFF" />
                      <text x="165" y="251" fill="white" fontSize="10" fontFamily="sans-serif">SCRIPT</text>
                      
                      {/* Graph showing increasing conversion */}
                      <path d="M275 310L310 250L345 210L380 160" stroke="#3A6FFF" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="275" cy="310" r="5" fill="#3A6FFF" />
                      <circle cx="310" cy="250" r="5" fill="#3A6FFF" />
                      <circle cx="345" cy="210" r="5" fill="#3A6FFF" />
                      <circle cx="380" cy="160" r="5" fill="#3A6FFF" />
                      
                      {/* Dollar signs */}
                      <text x="290" cy="240" fill="#4F66A3" fontSize="20" fontFamily="sans-serif" fontWeight="bold">$</text>
                      <text x="330" cy="200" fill="#4F66A3" fontSize="25" fontFamily="sans-serif" fontWeight="bold">$</text>
                      <text x="370" cy="150" fill="#4F66A3" fontSize="30" fontFamily="sans-serif" fontWeight="bold">$</text>
                      
                      {/* Center button */}
                      <circle cx="200" cy="320" r="10" fill="#3A6FFF" />
                        </svg>
                      </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden rotate-180">
        <svg className="w-full h-16 text-white" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 100L48 87.5C96 75 192 50 288 54.2C384 58.3 480 91.7 576 95.8C672 100 768 75 864 62.5C960 50 1056 50 1152 54.2C1248 58.3 1344 66.7 1392 70.8L1440 75V0H0V100Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
} 