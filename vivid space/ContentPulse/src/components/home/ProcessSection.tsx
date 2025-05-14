"use client";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      title: "Initial Briefing",
      description: "We start by understanding your specific needs: the type of content, target audience, main keywords, and the tone you want for your texts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      )
    },
    {
      number: 2,
      title: "Keyword Research",
      description: "Our writers conduct targeted research to identify the most relevant terms for your content, based on your industry and your audience's search intent.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )
    },
    {
      number: 3,
      title: "Content Writing",
      description: "Our expert writers create your content by naturally integrating the identified keywords. Each text is written to be both engaging for readers and optimized for search engines.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      )
    },
    {
      number: 4,
      title: "Proofreading and Optimization",
      description: "Each text undergoes a thorough review to ensure its quality. We check spelling, grammar, style consistency, and optimal keyword integration.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: 5,
      title: "Content Delivery",
      description: "We deliver the final content in your preferred format, ready to be published on your website or blog. Each delivery includes an optimized title and meta-description suggestions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 relative bg-indigo-50/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 opacity-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 opacity-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="relative z-10 mb-20">
          <div className="flex flex-col items-center">
            <div className="bg-indigo-100 bg-opacity-50 backdrop-blur-sm rounded-xl p-10 text-center max-w-3xl shadow-lg border border-indigo-100">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </span>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                How we <span className="relative inline-block">
                  <span className="relative z-10 text-indigo-600">write your content</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-indigo-200 -rotate-1"></span>
                </span>
              </h2>
              
              <p className="text-lg text-black mx-auto max-w-2xl">
                A simple and efficient process to provide you with high-quality optimized texts.
              </p>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="relative flex flex-col items-center">
            {steps.map((step, index) => (
              <div key={index} className="w-full mb-8 last:mb-0">
                <div className="flex flex-col items-center md:items-start md:flex-row md:even:flex-row-reverse group perspective">
                  {/* Step Number */}
                  <div className="relative flex-shrink-0 mb-8 md:mb-0 transform transition-transform duration-500 md:group-even:-scale-x-100">
                    <div className="w-20 h-20 flex items-center justify-center bg-indigo-600 text-white text-3xl font-bold rounded-2xl relative transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">{step.number}</span>
                    </div>
                    
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-indigo-500 to-transparent"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-[calc(100%-5rem)] md:px-10 md:group-even:text-right perspective">
                    <div className="bg-white rounded-lg p-8 shadow-lg md:ml-4 md:group-even:ml-0 md:group-even:mr-4 transform transition-transform duration-500 group-hover:rotate-y-12">
                      {/* Icon & Title */}
                      <div className="flex items-center mb-4 md:group-even:justify-end">
                        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 md:group-even:mr-0 md:group-even:ml-4 md:group-even:order-2">
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-black leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final Call-to-action */}
            <div className="mt-16 text-center transform hover:scale-105 transition-transform duration-300">
              <a 
                href="/services" 
                className="inline-flex items-center bg-indigo-600 text-white py-4 px-8 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30"
              >
                <span>Discover our writing services</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 