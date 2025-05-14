"use client";

export default function OurApproachSection() {
  const principles = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Constant Innovation",
      description: "We stay constantly informed about the latest technological advances to offer you the most innovative and effective solutions."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: "Technical Excellence",
      description: "Our team consists of certified experts who perfectly master the most powerful automation platforms on the market."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "Quality Commitment",
      description: "We follow a rigorous methodology with thorough testing to ensure robust and reliable solutions that work perfectly."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: "Collaborative Approach",
      description: "We work closely with you throughout the project to ensure that the final solution perfectly meets your needs."
    }
  ];

  const vision = {
    title: "Our Vision",
    description: "We believe that intelligent automation is the engine of digital transformation. Our vision is to make automation accessible to all businesses, regardless of their size or industry. By freeing teams from repetitive tasks, we enable them to focus on what truly matters: innovation, creativity, and growth.",
    points: [
      "A human-centered approach, where technology serves people",
      "Scalable solutions that grow with your business",
      "A total commitment to customer satisfaction",
      "Continuous improvement of our methods and solutions"
    ]
  };

  return (
    <section className="py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Minimalist Design */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center mb-4 border-b border-flow-green-500 pb-1">
            <div className="w-2 h-2 bg-flow-green-500 mr-2"></div>
            <span className="text-flow-green-400 uppercase tracking-wider text-sm font-medium">Our Philosophy</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white">
            An <span className="relative inline-block">
              <span className="text-flow-green-400">Professional</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 100 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3C20 1 40 6 60 3C80 0 90 4 100 3V6H0V3Z" fill="#22C55E" fillOpacity="0.4"/>
              </svg>
            </span> Approach
          </h2>
          
          <p className="text-xl text-gray-300">
            We apply rigorous principles to offer you superior quality automation solutions
          </p>
        </div>
        
        {/* Principles Grid - Dark Tile Style */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {principles.map((principle, index) => (
              <div key={index} className="group relative bg-gray-900 p-8 overflow-hidden">
                {/* Animated border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-flow-green-500 transition-colors duration-300"></div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 bg-flow-green-500 group-hover:bg-flow-green-400 transition-colors"></div>
                </div>
                
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gray-800 group-hover:bg-gray-800/80 rounded flex items-center justify-center text-flow-green-400">
                    {principle.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-flow-green-400 transition-colors">
                  {principle.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section - Split Design */}
        <div className="flex flex-col md:flex-row bg-gray-900 rounded-none md:rounded-lg overflow-hidden">
          {/* Left panel with gradient overlay */}
          <div className="md:w-1/3 p-10 bg-gradient-to-br from-flow-green-900 to-black flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute w-16 h-16 border border-flow-green-500/30" 
                    style={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="text-4xl font-bold text-white relative z-10">
              {vision.title}
            </h3>
          </div>
          
          {/* Right panel with content */}
          <div className="md:w-2/3 p-10 md:p-12">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {vision.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vision.points.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#22C55E" fillOpacity="0.6"/>
                    </svg>
                  </div>
                  <p className="text-gray-300">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 