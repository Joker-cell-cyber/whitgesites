"use client";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      icon: "🔍",
      description: "We analyze your processes to identify the most beneficial automation opportunities for your business.",
      color: "from-make-purple-500 to-make-blue-500",
      lightColor: "from-make-purple-100 to-make-blue-100"
    },
    {
      number: "02",
      title: "Design",
      icon: "✏️",
      description: "We design your custom automation solution with a detailed workflow and implementation plan.",
      color: "from-make-blue-500 to-teal-500",
      lightColor: "from-make-blue-100 to-teal-100"
    },
    {
      number: "03",
      title: "Development",
      icon: "⚙️",
      description: "We build and test your automation with industry-leading tools like Make.com and Zapier.",
      color: "from-teal-500 to-green-500",
      lightColor: "from-teal-100 to-green-100"
    },
    {
      number: "04",
      title: "Delivery",
      icon: "🚀",
      description: "We deploy your solution, provide training, and offer ongoing support to ensure lasting success.",
      color: "from-green-500 to-make-purple-500",
      lightColor: "from-green-100 to-make-purple-100"
    },
  ];

  const benefits = [
    "100% customized solutions",
    "Transparent collaborations",
    "Measurable results",
    "Dedicated technical support"
  ];

  const keyFeatures = [
    {
      title: "In-depth technical expertise",
      description: "Our team masters the most advanced automation platforms with official certifications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
    {
      title: "Time and cost savings",
      description: "Our clients save an average of 15 hours per week by automating their repetitive tasks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Guaranteed scalability",
      description: "Our solutions adapt to your business growth, with continuous updates and improvements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
    }
  ];

  return (
    <section className="py-24 bg-gray-900 text-white relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center border-b border-flow-green-500 pb-2 mb-4">
            <div className="w-3 h-3 bg-flow-green-500 mr-2"></div>
            <span className="text-flow-green-400 uppercase tracking-widest text-sm font-semibold">Our Approach</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 text-white">
            How <span className="text-flow-green-400">it works</span>
          </h2>
          
          <p className="text-xl text-gray-300">
            Our proven 4-step process to create automations that transform your business
          </p>
        </div>

        {/* Process timeline */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-flow-green-800 to-flow-green-500"></div>
            
            {/* Timeline nodes */}
            <div className="flex flex-col space-y-24">
              {steps.map((step, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-800 border-4 border-flow-green-500 rounded-full flex items-center justify-center z-10">
                    <span className="text-flow-green-400 text-xl font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Content card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-flow-green-900/20 hover:border-flow-green-700/50">
                      <div className="flex items-center mb-6 justify-end">
                        <div className={`w-10 h-10 rounded flex items-center justify-center text-xl ${index % 2 === 0 ? 'order-1 ml-3' : 'order-0 mr-3'}`}>
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-flow-green-400">{step.title}</h3>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology and benefits section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left panel */}
          <div className="relative">
            <div className="absolute inset-0 border border-flow-green-500/30 rounded transform rotate-3"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded border border-gray-700">
              <h3 className="text-3xl font-bold mb-6 text-white">
                Why choose <br /><span className="text-flow-green-400">our methodology</span>
              </h3>
              
              <p className="text-gray-300 mb-10 leading-relaxed">
                Our methodical approach ensures robust, reliable automation solutions perfectly adapted to your specific needs.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded border border-gray-700 flex items-center hover:bg-gray-800 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-flow-green-900/50 border border-flow-green-500/50 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-flow-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-200 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right panel - stacked cards */}
          <div className="space-y-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="relative group">
                {/* Hover decoration */}
                <div className="absolute inset-0 bg-flow-green-500/10 rounded-lg transform -rotate-1 scale-105 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative bg-gray-800 rounded-lg p-6 border border-gray-700 overflow-hidden">
                  {/* Background accent */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-flow-green-500/5 rounded-full"></div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded flex items-center justify-center bg-gray-900 text-flow-green-400 border border-gray-700">
                      {feature.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 