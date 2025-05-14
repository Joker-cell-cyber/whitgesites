import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      title: "Request Consultation",
      description: "Tell us about your data needs and we'll discuss the best approach for your project.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: "Custom Solution Development",
      description: "We develop a tailored scraping solution specific to your target websites and data requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Data Extraction",
      description: "We run our scraping tools to collect the data you need, handling any website complexities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
    {
      title: "Data Cleaning & Formatting",
      description: "We process and structure the data according to your specifications, ensuring it's ready for use.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Delivery & Support",
      description: "We deliver your data in your preferred format and provide ongoing support for any questions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-emerald-900 to-teal-950 text-white">
      {/* Hexagon background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(5) rotate(5)">
              <polygon points="24.8,22 37.3,14.4 37.3,0 24.8,7.6 12.3,0 0,7.6 0,22 12.3,29.4 24.8,22" fill="none" stroke="currentColor" strokeWidth="0.5"></polygon>
              <polygon points="24.8,22 12.3,29.4 12.3,43.4 24.8,36 37.3,43.4 37.3,29.4 24.8,22" fill="none" stroke="currentColor" strokeWidth="0.5"></polygon>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"></rect>
        </svg>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-500 to-teal-300 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="bg-gradient-to-r from-emerald-400 to-teal-400 inline-block p-px rounded-2xl mb-4">
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 p-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white">How Our Process Works</h2>
          <p className="text-xl text-emerald-100">
            Our streamlined approach ensures you get the data you need with minimal hassle
          </p>
        </div>

        <div className="relative">
          {/* Steps cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connecting lines between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-2 z-0 transform -translate-y-1/2">
                    <svg className="w-full h-8" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
                      <path d="M0 12 L 100 12" className="stroke-emerald-500 stroke-2 stroke-dashed" strokeDasharray="4 4" />
                      {/* Arrow */}
                      <path d="M90 6 L 100 12 L 90 18" className="stroke-emerald-500 stroke-2" />
                    </svg>
                  </div>
                )}

                {/* Card */}
                <div className="relative h-full z-10 p-0.5 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg group-hover:from-emerald-300 group-hover:to-teal-400 transition-all duration-300">
                  <div className="h-full bg-gradient-to-br from-emerald-900 to-teal-900 backdrop-blur-sm rounded-2xl p-6 hover:bg-gradient-to-br hover:from-emerald-800 hover:to-teal-800 transition-all">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-emerald-500 to-teal-500 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-4 border-emerald-900 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl font-bold">{index + 1}</span>
                    </div>
                    
                    <div className="mt-8 mb-6 flex justify-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-700/60 to-teal-700/60 p-4 text-emerald-300">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-center mb-4 text-white group-hover:text-emerald-300 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-center text-emerald-200">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile indicators */}
          <div className="flex justify-center mt-8 md:hidden">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === 0 ? 'bg-emerald-400' : 'bg-emerald-800'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/packages" 
            className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-700/30 transition-all transform hover:scale-105"
          >
            Get Started
            <svg className="ml-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 