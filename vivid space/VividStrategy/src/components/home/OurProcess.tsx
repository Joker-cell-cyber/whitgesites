"use client";

import { useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const OurProcess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "Strategic Diagnosis",
      description: "We begin with an in-depth analysis of your organization, market, and business objectives. This phase allows us to identify opportunities and challenges specific to your situation.",
      icon: <CheckCircleIcon className="h-12 w-12 text-teal-600" />,
      color: "from-teal-500 to-cyan-500",
      illustration: (
        <svg className="w-full h-32" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="30" width="220" height="90" rx="8" fill="#ECFDF5" stroke="#0D9488" strokeWidth="2" />
          <rect x="60" y="50" width="80" height="10" rx="3" fill="#0D9488" />
          <rect x="60" y="70" width="180" height="5" rx="2.5" fill="#5EEAD4" />
          <rect x="60" y="85" width="180" height="5" rx="2.5" fill="#5EEAD4" />
          <rect x="60" y="100" width="140" height="5" rx="2.5" fill="#5EEAD4" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Solution Development",
      description: "Our team of experts develops a customized action plan integrating industry best practices. Each strategy is designed to maximize your return on investment and create sustainable value.",
      icon: <CheckCircleIcon className="h-12 w-12 text-teal-600" />,
      color: "from-emerald-500 to-teal-500",
      illustration: (
        <svg className="w-full h-32" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 75 H140 V120 H40 Z" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <path d="M160 30 H260 V75 H160 Z" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <path d="M160 120 H260 V75 H160 Z" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <path d="M140 75 L160 75" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="90" cy="97" r="15" fill="#A7F3D0" />
          <circle cx="210" cy="52" r="15" fill="#A7F3D0" />
          <circle cx="210" cy="97" r="15" fill="#A7F3D0" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Implementation & Monitoring",
      description: "We support you in implementing the defined strategy, ensuring knowledge transfer and rigorous monitoring of results to guarantee the achievement of your objectives.",
      icon: <CheckCircleIcon className="h-12 w-12 text-teal-600" />,
      color: "from-green-500 to-emerald-500",
      illustration: (
        <svg className="w-full h-32" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="30" width="200" height="90" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
          <path d="M60 100 L100 60 L140 90 L190 40 L240 70" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="100" r="5" fill="#10B981" />
          <circle cx="100" cy="60" r="5" fill="#10B981" />
          <circle cx="140" cy="90" r="5" fill="#10B981" />
          <circle cx="190" cy="40" r="5" fill="#10B981" />
          <circle cx="240" cy="70" r="5" fill="#10B981" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-24 relative" ref={sectionRef}>
      {/* Background with split design */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-teal-900 clip-path-slant"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 max-w-xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-teal-900">Our</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">Methodology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured and proven approach to guide your company towards excellence
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline with connected steps */}
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Timeline connector */}
            <div className="absolute top-0 left-1/2 md:left-0 h-full md:w-full -ml-px md:ml-0 border-l-2 md:border-l-0 md:border-t-2 border-dashed border-teal-300 z-0 md:top-28"></div>
            
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative md:flex-1 transition-all duration-700 z-10 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step number */}
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border-2 border-teal-500 text-teal-600 font-bold text-xl mx-auto mb-4 z-20 relative transition-all duration-300 hover:scale-110">
                  {step.id}
                </div>
                
                {/* Content card */}
                <div className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  activeStep === step.id 
                    ? 'shadow-xl translate-y-1' 
                    : 'shadow border border-gray-100'
                }`}>
                  {/* Gradient header */}
                  <div className={`bg-gradient-to-r ${step.color} h-2`}></div>
                  
                  <div className="p-6 md:p-8">
                    {/* Card content */}
                    <div className="flex flex-col mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <div className="mb-6">
                        {step.illustration}
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Learn more button that appears on hover */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      activeStep === step.id 
                        ? 'opacity-100 max-h-20' 
                        : 'opacity-0 max-h-0'
                    }`}>
                      <button className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg font-medium hover:bg-teal-100 transition-all text-sm">
                        <span>View Pricing</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Only show this for the last step on mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 -ml-px bottom-0 h-8 border-l-2 border-dashed border-teal-300 z-0 md:hidden"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="hidden lg:block">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full border-4 border-teal-100 opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full border-8 border-emerald-100 opacity-30"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 rounded-md bg-emerald-500/10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-md bg-teal-500/10 rotate-45"></div>
      </div>
      
      <style jsx>{`
        .clip-path-slant {
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 20% 0);
        }
      `}</style>
    </section>
  );
};

export default OurProcess;