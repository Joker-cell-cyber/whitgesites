"use client";

import { useEffect, useRef, useState } from 'react';
import {
  CurrencyDollarIcon,
  CogIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

const WhatWeDo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
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

  const services = [
    {
      id: 1,
      title: "Process Optimization",
      description: "Enhance your company&apos;s operational efficiency with customized solutions.",
      icon: <CogIcon className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-400",
      items: [
        "Audit and mapping of existing processes",
        "Elimination of redundancies and inefficiencies",
        "Implementation of quality management systems",
        "Automation of low-value tasks"
      ]
    },
    {
      id: 2,
      title: "Market Analysis",
      description: "Identify new opportunities and anticipate developments in your industry.",
      icon: <MagnifyingGlassIcon className="h-8 w-8" />,
      color: "from-indigo-500 to-purple-400",
      items: [
        "In-depth market research and segmentation",
        "Competitive analysis and strategic positioning",
        "Identification of emerging trends",
        "Exploration of new markets and distribution channels"
      ]
    },
    {
      id: 3,
      title: "Financial Planning",
      description: "Optimize your financial resources and secure your company&apos;s growth.",
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      color: "from-emerald-500 to-teal-400",
      items: [
        "Development of financial forecasts",
        "Cost structure optimization",
        "Tailored financing strategies",
        "Financial risk management"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="relative">
              Our Expertise
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 transition-transform duration-500 ease-out" style={{transform: isVisible ? 'scaleX(1)' : 'scaleX(0)'}}></span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions to address your company&apos;s complex challenges and drive growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full transform ${
                  activeService === service.id ? 'scale-105 shadow-xl' : ''
                }`}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-8">
                  <div className={`flex items-center mb-6 ${
                    activeService === service.id ? 'animate-pulse' : ''
                  }`}>
                    <div className={`p-4 rounded-full mr-4 transition-all duration-300 ${
                      activeService === service.id 
                        ? `bg-gradient-to-r ${service.color} text-white`
                        : 'bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li 
                        key={i} 
                        className={`flex items-start transition-all duration-300 ${
                          activeService === service.id ? 'transform translate-x-2' : ''
                        }`} 
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <div className={`mr-2 mt-1 transition-colors duration-300 ${
                          activeService === service.id 
                            ? 'text-indigo-600 dark:text-indigo-400' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo; 