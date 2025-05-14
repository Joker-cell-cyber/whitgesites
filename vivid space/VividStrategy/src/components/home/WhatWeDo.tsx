"use client";

import { useEffect, useRef, useState } from 'react';
import {
  CurrencyDollarIcon,
  CogIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Link from 'next/link';

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
      color: "from-teal-500 to-emerald-400",
      items: [
        "Audit and mapping of existing processes",
        "Elimination of redundancies and inefficiencies",
        "Implementation of quality management systems",
        "Automation of low-value tasks"
      ],
      pricingLink: "/pricing#process-optimization"
    },
    {
      id: 2,
      title: "Market Analysis",
      description: "Identify new opportunities and anticipate developments in your industry.",
      icon: <MagnifyingGlassIcon className="h-8 w-8" />,
      color: "from-emerald-500 to-green-400",
      items: [
        "In-depth market research and segmentation",
        "Competitive analysis and strategic positioning",
        "Identification of emerging trends",
        "Exploration of new markets and distribution channels"
      ],
      pricingLink: "/pricing#market-analysis"
    },
    {
      id: 3,
      title: "Financial Planning",
      description: "Optimize your financial resources and secure your company&apos;s growth.",
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      color: "from-cyan-500 to-teal-400",
      items: [
        "Development of financial forecasts",
        "Cost structure optimization",
        "Tailored financing strategies",
        "Financial risk management"
      ],
      pricingLink: "/pricing#financial-planning"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-emerald-50 rounded-br-[80px] opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-teal-50 rounded-tl-[80px] opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm uppercase tracking-widest bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent font-semibold">Our Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
            Our Expertise
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to address your company&apos;s complex challenges and drive growth
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex-1 transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className={`h-full bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl ${
                activeService === service.id ? 'scale-105' : 'scale-100'
              }`}>
                {/* Header with gradient */}
                <div className={`w-full h-2 bg-gradient-to-r ${service.color}`}></div>
                
                <div className="p-8">
                  {/* Icon with improved styling */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
                    activeService === service.id 
                      ? 'bg-gradient-to-r ' + service.color + ' text-white' 
                      : 'bg-gray-100 text-teal-600'
                  }`}>
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  {/* Feature list with improved styling */}
                  <ul className="space-y-3 mb-8">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start group">
                        <div className={`flex-shrink-0 mr-3 transition-all duration-300 ${
                          activeService === service.id ? 'text-teal-600' : 'text-emerald-400'
                        }`}>
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* View Pricing link */}
                  <div className="mt-auto">
                    <Link 
                      href={service.pricingLink}
                      className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                        activeService === service.id
                          ? 'bg-gradient-to-r ' + service.color + ' text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>View Pricing</span>
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
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