"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-indigo-200 mix-blend-multiply opacity-70 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-indigo-100 mix-blend-multiply opacity-60 animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-indigo-300 mix-blend-multiply opacity-50"></div>
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-indigo-50 opacity-30 rotate-45"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Column */}
          <div className="w-full lg:w-5/12 relative">
            <div className="absolute -left-8 -top-8 w-20 h-20 border-l-4 border-t-4 border-indigo-500 opacity-60"></div>
            
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Professional SEO Content
            </span>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
              <span className="text-black">Content that captivates and</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-indigo-600">converts</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-200 -rotate-1"></span>
              </span>
            </h1>
            
            <p className="text-xl text-black mb-10 max-w-lg">
              Boost your online visibility with expertly crafted SEO content. Stand out from competitors and attract more qualified visitors.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/pricing" className="relative overflow-hidden group px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-300/30 transition-all hover:shadow-indigo-500/50">
                <span className="relative z-10">See Pricing</span>
                <span className="absolute top-0 left-0 w-full h-full bg-indigo-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              
              <Link href="/contact" className="px-8 py-4 bg-white text-indigo-700 rounded-lg font-semibold shadow-md border border-indigo-100 hover:border-indigo-300 transition-colors">
                Contact Us
              </Link>
            </div>
            
            <div className="absolute -right-8 -bottom-8 w-20 h-20 border-r-4 border-b-4 border-indigo-500 opacity-60"></div>
          </div>
          
          {/* Visual Column */}
          <div className="w-full lg:w-7/12 relative">
            <div className="relative backdrop-blur-sm bg-white/70 border border-indigo-100 rounded-xl shadow-2xl p-8 z-10">
              {/* Document header */}
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="h-2.5 w-32 bg-indigo-200 rounded-full"></div>
                  <div className="h-2 w-20 bg-gray-200 rounded-full mt-2"></div>
                </div>
              </div>
              
              {/* Document content visualization */}
              <div className="p-4 border border-indigo-100 rounded-lg bg-white mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                  <div className="h-2.5 w-3/4 bg-indigo-100 rounded-full"></div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                  <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                  <div className="h-2 w-4/6 bg-gray-100 rounded-full"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-md">SEO</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-md">Content</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-md">Writing</span>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-white shadow-lg rounded-lg text-indigo-600 text-sm font-bold transform rotate-3 border border-indigo-100">
                #1 Ranking
              </div>
              
              <div className="absolute -bottom-3 -left-3 px-4 py-2 bg-white shadow-lg rounded-lg text-indigo-600 text-sm font-bold transform -rotate-2 border border-indigo-100">
                Keywords
              </div>
              
              {/* Analytics visualization */}
              <div className="flex justify-between items-center mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-xs font-medium text-green-600">+64%</span>
                </div>
                
                <div className="text-xs font-medium text-black">Rank: #3</div>
                
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-indigo-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-xs font-medium">2.4k</span>
                </div>
              </div>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-lg">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-indigo-200 opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-indigo-300 opacity-40"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-indigo-400 opacity-30"></div>
            </div>
          </div>
        </div>
        
        {/* Partner logos */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 