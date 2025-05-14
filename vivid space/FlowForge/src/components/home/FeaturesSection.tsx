"use client";

export default function FeaturesSection() {
  return (
    <section className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-flow-green-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-flow-teal-100 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with asymmetric design */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-flow-teal-900/10 border border-flow-teal-900/20 text-flow-teal-800 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-flow-teal-500 mr-2"></span>
              Perfectly Integrated
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span className="block">Automation</span>
              <span className="text-flow-teal-500">Expertise</span>
            </h2>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-xl text-gray-700 max-w-xl">
              Our unique approach to automation helps you save time, reduce errors, and propel your business forward.
            </p>
          </div>
        </div>
        
        {/* Features with horizontal layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Feature 1 - Card with frosted glass effect */}
          <div className="group relative rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-flow-green-400 to-flow-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-flow-green-100 text-flow-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Powerful Integrations
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Connect all your favorite applications. Our service supports over 1000+ integrations through Make.com and Zapier.
            </p>
            <div className="flex items-center mt-auto text-sm font-medium text-flow-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No coding required
            </div>
          </div>
          
          {/* Feature 2 - Card with frosted glass effect */}
          <div className="group relative rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-flow-green-400 to-flow-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-flow-green-100 text-flow-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Complete Customization
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Each automation is custom-designed to meet your specific needs, with tailored solutions for your unique workflow.
            </p>
            <div className="flex items-center mt-auto text-sm font-medium text-flow-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Personalized service
            </div>
          </div>
          
          {/* Feature 3 - Special feature with highlight */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-flow-green-600 to-flow-teal-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-20"></div>
            
            {/* Featured tag */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-xs font-semibold text-flow-green-800 border border-white/50 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1 text-yellow-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              Popular Service
            </div>
            
            <div className="relative p-8 text-white h-full flex flex-col">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/20 text-white mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                Monitoring & Support
              </h3>
              <p className="text-white/90 text-lg mb-8">
                We don't just set up your automations - we monitor and maintain them to ensure they continue to function optimally.
              </p>
              
              <ul className="space-y-4 mt-auto">
                {[
                  "24/7 Monitoring",
                  "Automated alerts",
                  "Dedicated technical support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 