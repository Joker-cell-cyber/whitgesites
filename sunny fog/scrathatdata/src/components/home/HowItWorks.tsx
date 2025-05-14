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
    <section className="section py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-64 top-0 w-96 h-96 bg-primary/5 rounded-full"></div>
        <div className="absolute -right-64 bottom-0 w-96 h-96 bg-primary/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-4">How Our Process Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined approach ensures you get the data you need with minimal hassle
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative pb-10">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20 rounded-full"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10">
              <div className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content box */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${index % 2 === 0 ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                    <h3 className="text-xl font-bold text-gray-950 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {/* Center point with icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-primary/20 flex items-center justify-center text-primary z-20">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mt-2">
                    {index + 1}
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-1/2"></div>
              </div>
            </div>
          ))}
          
          {/* Final point */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary/20 border-4 border-white shadow-lg z-10"></div>
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/contact" 
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition-colors"
          >
            Get Started
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 