"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function OurSolutions() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('strategy');
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
      color: 'from-blue-600 to-indigo-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
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
      color: 'from-amber-600 to-orange-600',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
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
      color: 'from-emerald-600 to-green-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
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
      color: 'from-purple-600 to-fuchsia-600',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
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
      color: 'from-pink-600 to-rose-600',
      iconBg: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
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

  return (
    <section 
      ref={sectionRef}
      className="w-full py-20 bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className={cn(
          "opacity-0 transition-all duration-1000 ease-in-out",
          isVisible ? "opacity-100 translate-y-0" : "translate-y-10"
        )}>
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
                Our Solutions
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] mb-12">
              Discover how our expertise can transform your business through our specialized services.
            </p>
            
            {/* Tabs - Desktop */}
            <div className="hidden md:flex p-1 bg-white dark:bg-gray-800 rounded-full shadow-md mb-12">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution.id)}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                    activeTab === solution.id 
                      ? `bg-gradient-to-r ${solution.color} text-white shadow-md` 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {solution.shortTitle}
                </button>
              ))}
            </div>

            {/* Tabs - Mobile */}
            <div className="flex md:hidden flex-wrap gap-2 justify-center mb-8">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeTab === solution.id 
                      ? `bg-gradient-to-r ${solution.color} text-white shadow-md` 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {solution.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[500px]">
            {solutions.map((solution) => (
              <div 
                key={solution.id}
                className={cn(
                  "transition-all duration-500 ease-in-out",
                  activeTab === solution.id ? "block" : "hidden"
                )}
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300",
                    solution.color
                  )} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left side content (text) */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className={cn(
                          "p-4 rounded-full mr-4",
                          solution.iconBg,
                          solution.iconColor
                        )}>
                          {renderIcon(solution.id)}
                        </div>
                        <h3 className={cn(
                          "text-2xl md:text-3xl font-bold bg-clip-text text-transparent",
                          `bg-gradient-to-r ${solution.color}`
                        )}>
                          {solution.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                        {solution.description}
                      </p>
                      
                      <ul className="space-y-4 mb-8">
                        {solution.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className={cn(
                              "mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                              `bg-gradient-to-r ${solution.color}`
                            )}>
                              <svg
                                className="h-3 w-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Right side content (illustrations) */}
                    <div className="flex justify-center">
                      <div className="relative w-full max-w-xs mx-auto">
                        {/* Decorative elements */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r ${solution.color} opacity-10 blur-2xl`}></div>
                        <div className={`absolute bottom-0 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r ${solution.color} opacity-10 blur-xl`}></div>
                        
                        {/* Solution Illustration container */}
                        <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                          {/* Illustration placeholder - to be improved */}
                          <div className="w-full h-full">
                            {/* These are simplified illustrations that will be replaced */}
                            {solution.id === 'strategy' && (
                              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="strategyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#4F46E5" />
                                  </linearGradient>
                                </defs>
                                <path d="M100 20v160M30 100h140" stroke="#E5E7EB" strokeWidth="1" />
                                <path d="M40 130l30-50 40 20 50-60" stroke="url(#strategyGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <circle cx="40" cy="130" r="6" fill="url(#strategyGradient)" />
                                <circle cx="70" cy="80" r="6" fill="url(#strategyGradient)" />
                                <circle cx="110" cy="100" r="6" fill="url(#strategyGradient)" />
                                <circle cx="160" cy="40" r="6" fill="url(#strategyGradient)" />
                                <circle cx="100" cy="100" r="30" stroke="url(#strategyGradient)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                              </svg>
                            )}
                            
                            {solution.id === 'optimization' && (
                              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#F59E0B" />
                                    <stop offset="100%" stopColor="#EA580C" />
                                  </linearGradient>
                                </defs>
                                <path d="M50 40v120M150 40v120M50 70h100M50 130h100" stroke="#E5E7EB" strokeWidth="1" />
                                <circle cx="50" cy="70" r="15" stroke="url(#processGradient)" strokeWidth="3" fill="none" />
                                <circle cx="100" cy="70" r="15" stroke="url(#processGradient)" strokeWidth="3" fill="none" />
                                <circle cx="150" cy="70" r="15" stroke="url(#processGradient)" strokeWidth="3" fill="none" />
                                <circle cx="50" cy="130" r="15" stroke="url(#processGradient)" strokeWidth="3" fill="none" />
                                <circle cx="100" cy="130" r="15" stroke="url(#processGradient)" strokeWidth="3" fill="none" />
                                <circle cx="150" cy="130" r="15" stroke="url(#processGradient)" strokeWidth="3" fill="none" />
                                <path d="M65 70l20 0M115 70l20 0M50 85v30M100 85v30M150 85v30M65 130l20 0M115 130l20 0" stroke="url(#processGradient)" strokeWidth="2" strokeDasharray="5 3" />
                              </svg>
                            )}
                            
                            {solution.id === 'financial' && (
                              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="financeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#16A34A" />
                                  </linearGradient>
                                </defs>
                                <circle cx="100" cy="100" r="70" stroke="#E5E7EB" strokeWidth="1" fill="none" />
                                <circle cx="100" cy="100" r="50" stroke="url(#financeGradient)" strokeWidth="3" fill="none" />
                                <path d="M100 60v80M60 100h80" stroke="url(#financeGradient)" strokeWidth="3" />
                                <path d="M70 130l60-60" stroke="url(#financeGradient)" strokeWidth="2" strokeDasharray="5 3" />
                                <circle cx="100" cy="100" r="8" fill="url(#financeGradient)" />
                                <circle cx="100" cy="60" r="6" fill="url(#financeGradient)" />
                                <circle cx="100" cy="140" r="6" fill="url(#financeGradient)" />
                                <circle cx="60" cy="100" r="6" fill="url(#financeGradient)" />
                                <circle cx="140" cy="100" r="6" fill="url(#financeGradient)" />
                              </svg>
                            )}
                            
                            {solution.id === 'digital' && (
                              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="digitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#9333EA" />
                                    <stop offset="100%" stopColor="#C026D3" />
                                  </linearGradient>
                                </defs>
                                <rect x="40" y="40" width="120" height="80" rx="5" stroke="url(#digitalGradient)" strokeWidth="3" fill="none" />
                                <line x1="40" y1="60" x2="160" y2="60" stroke="url(#digitalGradient)" strokeWidth="2" />
                                <circle cx="50" cy="50" r="4" fill="url(#digitalGradient)" />
                                <circle cx="65" cy="50" r="4" fill="url(#digitalGradient)" />
                                <circle cx="80" cy="50" r="4" fill="url(#digitalGradient)" />
                                <rect x="60" y="80" width="80" height="20" rx="3" stroke="url(#digitalGradient)" strokeWidth="2" fill="none" />
                                <line x1="100" y1="120" x2="100" y2="140" stroke="url(#digitalGradient)" strokeWidth="3" />
                                <rect x="70" y="140" width="60" height="20" rx="3" stroke="url(#digitalGradient)" strokeWidth="3" fill="none" />
                              </svg>
                            )}
                            
                            {solution.id === 'marketing' && (
                              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="marketingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#DB2777" />
                                    <stop offset="100%" stopColor="#E11D48" />
                                  </linearGradient>
                                </defs>
                                <circle cx="100" cy="70" r="30" stroke="url(#marketingGradient)" strokeWidth="3" fill="none" />
                                <path d="M85 70l10 10 20-20" stroke="url(#marketingGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <line x1="100" y1="100" x2="100" y2="140" stroke="url(#marketingGradient)" strokeWidth="3" />
                                <path d="M70 140h60M60 150h80M50 160h100" stroke="url(#marketingGradient)" strokeWidth="3" strokeLinecap="round" />
                                <path d="M30 100c10 0 20-20 40-20s30 20 40 20 30-20 50-20 10 20 10 20" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
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