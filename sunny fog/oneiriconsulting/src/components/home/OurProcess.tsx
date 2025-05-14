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
      icon: <CheckCircleIcon className="h-12 w-12 text-indigo-600" />,
      color: "from-blue-500 to-indigo-500",
      illustration: (
        <svg className="w-full h-32" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="30" width="220" height="90" rx="8" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" />
          <rect x="60" y="50" width="80" height="10" rx="3" fill="#6366F1" />
          <rect x="60" y="70" width="180" height="5" rx="2.5" fill="#A5B4FC" />
          <rect x="60" y="85" width="180" height="5" rx="2.5" fill="#A5B4FC" />
          <rect x="60" y="100" width="140" height="5" rx="2.5" fill="#A5B4FC" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Solution Development",
      description: "Our team of experts develops a customized action plan integrating industry best practices. Each strategy is designed to maximize your return on investment and create sustainable value.",
      icon: <CheckCircleIcon className="h-12 w-12 text-indigo-600" />,
      color: "from-indigo-500 to-purple-500",
      illustration: (
        <svg className="w-full h-32" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 75 H140 V120 H40 Z" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
          <path d="M160 30 H260 V75 H160 Z" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
          <path d="M160 120 H260 V75 H160 Z" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
          <path d="M140 75 L160 75" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="90" cy="97" r="15" fill="#C4B5FD" />
          <circle cx="210" cy="52" r="15" fill="#C4B5FD" />
          <circle cx="210" cy="97" r="15" fill="#C4B5FD" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Implementation & Monitoring",
      description: "We support you in implementing the defined strategy, ensuring knowledge transfer and rigorous monitoring of results to guarantee the achievement of your objectives.",
      icon: <CheckCircleIcon className="h-12 w-12 text-indigo-600" />,
      color: "from-purple-500 to-pink-500",
      illustration: (
        <svg className="w-full h-32" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="30" width="200" height="90" rx="8" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
          <path d="M60 100 L100 60 L140 90 L190 40 L240 70" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="100" r="5" fill="#EC4899" />
          <circle cx="100" cy="60" r="5" fill="#EC4899" />
          <circle cx="140" cy="90" r="5" fill="#EC4899" />
          <circle cx="190" cy="40" r="5" fill="#EC4899" />
          <circle cx="240" cy="70" r="5" fill="#EC4899" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Our Methodology</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A structured and proven approach to guide your company towards excellence
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-1 bg-gradient-to-b from-indigo-500 to-purple-500 h-16 mb-4 opacity-50"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ${
                  activeStep === step.id 
                    ? 'transform -translate-y-3 shadow-xl border-indigo-200 dark:border-indigo-800' 
                    : ''
                }`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full relative ${
                      activeStep === step.id 
                        ? 'animate-pulse' 
                        : ''
                    }`}>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-20`}></div>
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 z-10">
                        {step.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`text-base font-semibold transition-colors duration-300 ${
                        activeStep === step.id 
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400' 
                          : 'text-indigo-600 dark:text-indigo-400'
                      }`}>
                        Step {step.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                    </div>
                  </div>

                  <div className={`mb-6 transition-all duration-300 ${
                    activeStep === step.id 
                      ? 'transform scale-105' 
                      : ''
                  }`}>
                    {step.illustration}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess; 