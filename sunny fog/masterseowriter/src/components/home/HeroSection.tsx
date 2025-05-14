"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(13,181,180,0.15),transparent)]" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-turquoise-500/10 ring-1 ring-turquoise-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <div className="container mx-auto px-4 md:px-6 transition-all duration-1000 opacity-100 translate-y-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-6">
              Professional SEO Content
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-turquoise-900 to-turquoise-700 bg-clip-text text-transparent">
              Content that <br className="hidden sm:block" />
              captivates and <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-turquoise-500 to-turquoise-700 bg-clip-text text-transparent">
                converts
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Boost your online visibility with expertly crafted SEO content. Stand out from competitors and attract more qualified visitors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/pricing" 
                className="py-3 px-6 bg-turquoise-500 text-white rounded-lg font-medium hover:bg-turquoise-600 transition-colors shadow-md shadow-turquoise-500/20"
              >
                See Pricing
              </Link>
              <Link 
                href="/contact" 
                className="py-3 px-6 bg-white text-turquoise-700 rounded-lg font-medium border border-turquoise-200 hover:bg-turquoise-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-turquoise-300 to-turquoise-600 opacity-90" />
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-white opacity-20"></div>
              <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white opacity-15"></div>
              <div className="absolute bottom-1/3 -left-12 w-32 h-32 rounded-full bg-white opacity-10"></div>
              <div className="absolute -bottom-8 right-1/4 w-20 h-20 rounded-full bg-white opacity-20"></div>
              
              {/* SEO Elements floating */}
              <div className="absolute top-10 right-8 px-3 py-1 bg-white/90 rounded-lg text-turquoise-600 font-medium shadow-lg rotate-6 animate-pulse">
                #1 Ranking
              </div>
              <div className="absolute bottom-20 left-6 px-3 py-1 bg-white/90 rounded-lg text-turquoise-600 font-medium shadow-lg -rotate-3 animate-pulse" style={{ animationDelay: '1s' }}>
                Keywords
              </div>
              <div className="absolute bottom-40 right-12 px-3 py-1 bg-white/90 rounded-lg text-turquoise-600 font-medium shadow-lg rotate-3 animate-pulse" style={{ animationDelay: '2s' }}>
                Backlinks
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {/* Main content document */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 rotate-[-1deg] shadow-lg transform transition-transform hover:scale-105 cursor-pointer z-10 w-full max-w-sm">
                {/* Document header */}
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-turquoise-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="h-8 ml-3 w-48 bg-gray-200 rounded-md"></div>
                </div>
                
                {/* Document title with SEO highlight */}
                <div className="w-full h-7 bg-turquoise-50 rounded-md mb-3 flex items-center px-2">
                  <div className="w-4 h-4 bg-turquoise-500 rounded-full mr-2"></div>
                  <div className="w-4/5 h-3 bg-turquoise-300 rounded-md"></div>
                </div>
                
                {/* Document content */}
                <div className="w-full h-4 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-full h-4 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded-md mb-2"></div>
                
                {/* Keywords section */}
                <div className="mt-4 mb-3 p-2 bg-gray-100 rounded-md">
                  <div className="text-xs text-gray-500 mb-2">Keywords</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-turquoise-100 rounded-md text-turquoise-700 text-xs">SEO</span>
                    <span className="px-2 py-1 bg-turquoise-100 rounded-md text-turquoise-700 text-xs">Content</span>
                    <span className="px-2 py-1 bg-turquoise-100 rounded-md text-turquoise-700 text-xs">Writing</span>
                  </div>
                </div>
                
                {/* Performance metrics */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-xs text-green-600">+64%</span>
                  </div>
                  <div className="text-xs text-gray-500">Rank: #3</div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-xs">2.4k</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements behind main document */}
              <div className="absolute w-64 h-72 bg-white/60 rounded-xl -z-10 rotate-6 -right-8 -bottom-10 shadow-lg"></div>
              <div className="absolute w-64 h-72 bg-white/60 rounded-xl -z-20 -rotate-6 -left-8 -top-10 shadow-lg"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
          <div className="flex items-center justify-center">
            <div className="h-16 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-16 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-16 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-16 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 