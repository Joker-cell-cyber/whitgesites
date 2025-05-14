"use client";

export default function ServicesSection() {
  const services = [
    {
      title: "Blog Articles",
      description: "Engaging, SEO-optimized blog articles that establish authority in your industry.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25-2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      )
    },
    {
      title: "Website Copy",
      description: "Compelling website copy that converts visitors into customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      )
    },
    {
      title: "Product Descriptions",
      description: "Unique product descriptions that increase conversion rates and improve SEO.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Background decorative element */}
        <div className="absolute -top-16 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Section header */}
        <div className="relative mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="w-12 h-1 bg-indigo-300 rounded-full"></span>
            <span className="mx-2 px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
              Our Services
            </span>
            <span className="w-12 h-1 bg-indigo-300 rounded-full"></span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Complete SEO Content <span className="relative">
              <span className="relative z-10 text-indigo-600">Services</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-indigo-100 -rotate-1"></span>
            </span>
          </h2>
          
          <p className="text-lg text-black mx-auto max-w-2xl">
            We create optimized content for all your marketing needs, from blog articles to product descriptions. We focus exclusively on content creation and do not offer SEO tracking or continuous optimization services.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Service content */}
              <div className="relative p-8 z-10">
                <div className="flex items-center mb-6">
                  {/* Service icon with animated border */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div className="absolute inset-0 border-2 border-indigo-100 rounded-xl scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  
                  {/* Service title */}
                  <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                
                {/* Service description */}
                <p className="text-black leading-relaxed">
                  {service.description}
                </p>
                
                {/* Decorative corner element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden opacity-30">
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 w-16 h-16 bg-indigo-100 rotate-45"></div>
                </div>
                
                {/* Learn more link */}
                <div className="mt-6 flex items-center">
                  <a href="/pricing" className="text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    View pricing
                  </a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-indigo-600 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative dots pattern */}
        <div className="hidden md:block absolute -right-8 top-1/3 w-32 h-32 opacity-20">
          <div className="grid grid-cols-6 gap-2">
            {Array(36).fill(null).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block absolute -left-8 bottom-1/3 w-32 h-32 opacity-20">
          <div className="grid grid-cols-6 gap-2">
            {Array(36).fill(null).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 