"use client";

import Link from "next/link";

export default function CTASection() {
  const benefits = [
    "Content optimized for search engines",
    "Writers specialized in various sectors",
    "Engaging content that converts your visitors",
    "Fast delivery and deadline compliance",
    "Expertise in SEO writing and current techniques"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-indigo-50"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-200 opacity-40 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto backdrop-blur-sm bg-white/70 rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-indigo-200/50 transition-shadow duration-500">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-full h-8 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600"></div>
          
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left Content */}
            <div className="lg:col-span-3 p-10 lg:p-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Ready to boost your <span className="relative inline-block">
                    <span className="relative z-10 text-indigo-600">online presence</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-indigo-100 -rotate-1"></span>
                  </span>?
                </h2>
                
                <p className="text-gray-600 mb-10 text-lg">
                  Our writers create quality SEO content that attracts your target audience and converts visitors into customers. Contact us today to get optimized texts that stand out.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="relative overflow-hidden group inline-flex items-center bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  
                  <Link
                    href="/pricing"
                    className="inline-flex items-center bg-white text-indigo-600 border border-indigo-200 py-3 px-8 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                  >
                    View Our Packages
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Content - Benefits */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-700 p-10 lg:p-12 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-1 bg-indigo-300 mr-3"></span>
                  Why Choose Our Writing Services
                </h3>
                
                <ul className="space-y-5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start transform hover:translate-x-2 transition-transform">
                      <div className="w-6 h-6 rounded-full border-2 border-indigo-300 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-indigo-50 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Decorative element */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-indigo-400 opacity-20"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full border border-indigo-400 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 