"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function OurSolutions() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('strategy');
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const solutions = [
    {
      id: 'strategy',
      title: 'Business Strategy',
      shortTitle: 'Strategy',
      description: 'Develop a clear vision and action plan to achieve your business goals and stay ahead of competition.',
      color: 'from-teal-600 to-emerald-600',
      lightColor: 'bg-teal-50',
      darkColor: 'bg-teal-900',
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      features: [
        'Comprehensive market analysis',
        'Strategic planning development',
        'Competitive positioning',
        'Sustainable growth strategies'
      ]
    },
    {
      id: 'optimization',
      title: 'Process Optimization',
      shortTitle: 'Process',
      description: 'Improve operational efficiency by streamlining workflows and eliminating bottlenecks.',
      color: 'from-emerald-600 to-green-600',
      lightColor: 'bg-emerald-50',
      darkColor: 'bg-emerald-900',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      features: [
        'Current process mapping',
        'Inefficiency identification',
        'Lean solution implementation',
        'Repetitive task automation'
      ]
    },
    {
      id: 'financial',
      title: 'Financial Planning',
      shortTitle: 'Finance',
      description: 'Maximize your company\'s financial health with customized capital management strategies.',
      color: 'from-cyan-600 to-teal-600',
      lightColor: 'bg-cyan-50',
      darkColor: 'bg-cyan-900',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      features: [
        'Cash flow analysis',
        'Cost reduction strategies',
        'Investment planning',
        'Financial risk management'
      ]
    },
    {
      id: 'digital',
      title: 'Digital Transformation',
      shortTitle: 'Digital',
      description: 'Adopt modern technologies to stay competitive in the digital economy.',
      color: 'from-green-600 to-emerald-600',
      lightColor: 'bg-green-50',
      darkColor: 'bg-green-900',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      features: [
        'Digital maturity assessment',
        'Transformation strategy',
        'Technology integration',
        'Training and support'
      ]
    },
    {
      id: 'marketing',
      title: 'Strategic Marketing',
      shortTitle: 'Marketing',
      description: 'Develop your market presence with targeted and effective marketing strategies.',
      color: 'from-teal-600 to-cyan-600',
      lightColor: 'bg-teal-50',
      darkColor: 'bg-teal-900',
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      features: [
        'Brand positioning',
        'Content strategy',
        'Marketing channel optimization',
        'Performance analysis'
      ]
    }
  ];

  const renderIcon = (solutionId: string) => {
    switch(solutionId) {
      case 'strategy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'optimization':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'financial':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'digital':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'marketing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const activeSolution = solutions.find(s => s.id === activeTab) || solutions[0];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-black"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
      
      <div className="container relative z-10 px-4 mx-auto">
        {/* Section heading */}
        <div className={cn(
          "mb-16 text-center transition-all duration-1000 ease-in-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-teal-400 uppercase bg-teal-900/30 rounded-full">
            Our Expertise
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Discover how our expertise can transform your business through our specialized services.
          </p>
        </div>
        
        {/* Interactive 3D-style tabs */}
        <div className="relative mb-16">
          <div className="flex flex-wrap justify-center mb-10">
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                onMouseEnter={() => setHoverTab(solution.id)}
                onMouseLeave={() => setHoverTab(null)}
                className={cn(
                  "relative mx-1 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 z-10",
                  activeTab === solution.id 
                    ? "text-white" 
                    : "text-gray-400 hover:text-gray-200"
                )}
                style={{
                  transform: activeTab === solution.id ? 'translateY(-4px)' : 
                             hoverTab === solution.id ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {/* Active/hover background */}
                <div className={cn(
                  "absolute inset-0 transition-opacity duration-300 rounded-lg -z-10 shadow-lg",
                  activeTab === solution.id ? 'opacity-100' : 
                  hoverTab === solution.id ? 'opacity-60' : 'opacity-0',
                  `bg-gradient-to-r ${solution.color}`
                )}></div>
                
                {/* Default background */}
                <div className={cn(
                  "absolute inset-0 bg-gray-800 rounded-lg -z-20",
                  activeTab === solution.id || hoverTab === solution.id ? 'opacity-0' : 'opacity-100',
                  "transition-opacity duration-300"
                )}></div>
                
                {solution.shortTitle}
              </button>
            ))}
          </div>
          
          {/* Content display area with 3D perspective */}
          <div className="relative perspective-1000">
            <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
              {/* Left side: Solution details */}
              <div className={cn(
                "transition-all duration-500 ease-out transform",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}>
                <div className="mb-6">
                  <div className={cn(
                    "inline-flex items-center justify-center p-3 mb-4 rounded-xl",
                    activeSolution.iconBg,
                    activeSolution.iconColor
                  )}>
                    {renderIcon(activeSolution.id)}
                  </div>
                  <h3 className={cn(
                    "mb-3 text-3xl font-bold bg-clip-text text-transparent",
                    `bg-gradient-to-r ${activeSolution.color}`
                  )}>
                    {activeSolution.title}
                  </h3>
                  <p className="mb-8 text-lg text-gray-300">
                    {activeSolution.description}
                  </p>
                </div>
                
                {/* Features with enhanced animation */}
                <div className="space-y-4">
                  {activeSolution.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start transition-all duration-500"
                      style={{ 
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                        transitionDelay: `${300 + idx * 100}ms`
                      }}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 mr-4 rounded-lg shrink-0",
                        `bg-gradient-to-br ${activeSolution.color}`
                      )}>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              
              {/* Right side: Visual representation */}
              <div 
                className={cn(
                  "transition-all duration-700 delay-200 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 rotate-2"
                )}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className={cn(
                    "absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20",
                    `bg-gradient-to-r ${activeSolution.color}`
                  )}></div>
                  
                  <div className={cn(
                    "absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20",
                    `bg-gradient-to-r ${activeSolution.color}`
                  )}></div>
                  
                  {/* Main display frame */}
                  <div className="relative p-1 overflow-hidden border rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                    <div className="p-6 rounded-xl bg-gray-900">
                      {/* Mock display content */}
                      <div className="flex items-center mb-6 space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-40 h-5 ml-2 bg-gray-800 rounded-md"></div>
                      </div>
                      
                      {/* Content based on active solution */}
                      <div className="space-y-6">
                        <div className={cn(
                          "w-full h-60 rounded-xl flex items-center justify-center",
                          activeSolution.darkColor
                        )}>
                          <div className={cn(
                            "text-6xl",
                            activeSolution.iconColor
                          )}>
                            {renderIcon(activeSolution.id)}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="w-3/4 h-4 bg-gray-800 rounded-md"></div>
                          <div className="w-full h-4 bg-gray-800 rounded-md"></div>
                          <div className="w-5/6 h-4 bg-gray-800 rounded-md"></div>
                          <div className="w-2/3 h-4 bg-gray-800 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative dots */}
                  <div className="absolute top-1/4 -right-5 w-10 h-40">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-2 h-2 rounded-full mb-2",
                          `bg-gradient-to-r ${activeSolution.color}`
                        )}
                        style={{opacity: 0.5 + (i * 0.05)}}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Decorative lines */}
                  <div className="absolute -left-4 bottom-1/3 w-8 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
                  <div className="absolute -left-8 bottom-1/3 mt-2 w-12 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
                  <div className="absolute -left-6 bottom-1/3 mt-4 w-10 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 