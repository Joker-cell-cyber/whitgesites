"use client";

import React from 'react';
import { FlexibleFormatsIllustration } from './test/FlexibleFormatsIllustration';

export function Features() {
  const features = [
    {
      title: "Advanced Scraping Technology",
      description: "Our proprietary scraping tools can handle complex websites with anti-bot measures, ensuring reliable data extraction.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "blue",
      illustration: (
        <svg viewBox="0 0 400 250" className="w-full h-full">
          <defs>
            <linearGradient id="advanced-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <filter id="shadow-1" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.2" />
            </filter>
          </defs>
          {/* Background */}
          <rect x="0" y="0" width="400" height="250" fill="url(#advanced-gradient)" rx="10" />
          
          {/* Advanced tech elements */}
          <g transform="translate(200, 125)" filter="url(#shadow-1)">
            {/* Central hub */}
            <circle cx="0" cy="0" r="45" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
            
            {/* Network connections */}
            <g>
              {/* Connection lines */}
              <path d="M-40,-30 L-90,-70" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M40,-30 L90,-70" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M-40,30 L-90,70" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M40,30 L90,70" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
              
              {/* Data nodes */}
              <circle cx="-90" cy="-70" r="15" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" />
              <circle cx="90" cy="-70" r="15" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" />
              <circle cx="-90" cy="70" r="15" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" />
              <circle cx="90" cy="70" r="15" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" />
              
              {/* Animated pulses */}
              <circle cx="-65" cy="-50" r="4" fill="#3b82f6">
                <animate attributeName="cx" from="-90" to="-40" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" from="-70" to="-30" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="65" cy="-50" r="4" fill="#3b82f6">
                <animate attributeName="cx" from="90" to="40" dur="1.7s" repeatCount="indefinite" />
                <animate attributeName="cy" from="-70" to="-30" dur="1.7s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="1.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="-65" cy="50" r="4" fill="#3b82f6">
                <animate attributeName="cx" from="-90" to="-40" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="cy" from="70" to="30" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="65" cy="50" r="4" fill="#3b82f6">
                <animate attributeName="cx" from="90" to="40" dur="1.9s" repeatCount="indefinite" />
                <animate attributeName="cy" from="70" to="30" dur="1.9s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="1.9s" repeatCount="indefinite" />
              </circle>
            </g>
            
            {/* Central bot/shield icon */}
            <g>
              <path d="M0,-25 C15,-25 25,-15 25,0 C25,15 15,25 0,25 C-15,25 -25,15 -25,0 C-25,-15 -15,-25 0,-25" 
                   fill="#3b82f6" opacity="0.8" />
              <path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="5" fill="white" />
            </g>
          </g>
          
          {/* Website representation */}
          <g transform="translate(70, 80)">
            <rect x="0" y="0" width="80" height="110" rx="5" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
            <rect x="0" y="0" width="80" height="20" rx="5" fill="#3b82f6" opacity="0.2" />
            <circle cx="10" cy="10" r="3" fill="#3b82f6" opacity="0.6" />
            <circle cx="20" cy="10" r="3" fill="#3b82f6" opacity="0.6" />
            <circle cx="30" cy="10" r="3" fill="#3b82f6" opacity="0.6" />
            
            {/* Website content */}
            <rect x="10" y="30" width="60" height="6" rx="2" fill="#3b82f6" opacity="0.4" />
            <rect x="10" y="42" width="40" height="6" rx="2" fill="#3b82f6" opacity="0.3" />
            <rect x="10" y="54" width="60" height="6" rx="2" fill="#3b82f6" opacity="0.4" />
            <rect x="10" y="66" width="50" height="6" rx="2" fill="#3b82f6" opacity="0.3" />
            <rect x="10" y="78" width="60" height="6" rx="2" fill="#3b82f6" opacity="0.4" />
            <rect x="10" y="90" width="40" height="6" rx="2" fill="#3b82f6" opacity="0.3" />
          </g>
          
          {/* Processed data output */}
          <g transform="translate(330, 80)">
            <rect x="0" y="0" width="80" height="110" rx="5" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
            <rect x="0" y="0" width="80" height="20" rx="5" fill="#3b82f6" opacity="0.2" />
            <text x="40" y="14" textAnchor="middle" fontSize="10" fill="#3b82f6">DATA</text>
            
            {/* JSON-like content */}
            <g transform="translate(10, 30)">
              <text fontSize="8" fill="#3b82f6" opacity="0.8">
                <tspan x="0" y="0">{"{"}</tspan>
                <tspan x="5" y="10">{'"data": ['}</tspan>
                <tspan x="10" y="20">{"{"}</tspan>
                <tspan x="15" y="30">{'"id": "001",'}</tspan>
                <tspan x="15" y="40">{'"title": "Product",'}</tspan>
                <tspan x="15" y="50">{'"price": "$99.99"'}</tspan>
                <tspan x="10" y="60">{"}"}, ...</tspan>
                <tspan x="5" y="70">]</tspan>
                <tspan x="0" y="80">{"}"}</tspan>
              </text>
            </g>
          </g>
          
          {/* Caption */}
          <text x="200" y="225" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3b82f6">Advanced Web Scraping Technology</text>
        </svg>
      )
    },
    {
      title: "Ethical Data Collection",
      description: "We follow ethical scraping practices, respecting website terms of service and data privacy regulations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "green",
      illustration: (
        <svg viewBox="0 0 400 250" className="w-full h-full">
          <defs>
            <linearGradient id="ethical-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
            <filter id="shadow-2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10b981" floodOpacity="0.2" />
            </filter>
          </defs>
          {/* Background */}
          <rect x="0" y="0" width="400" height="250" fill="url(#ethical-gradient)" rx="10" />
          
          {/* Shield */}
          <g transform="translate(200, 125)" filter="url(#shadow-2)">
            <path d="M0,-80 C50,-75 80,-70 80,-30 C80,40 0,80 0,80 C0,80 -80,40 -80,-30 C-80,-70 -50,-75 0,-80Z" 
                  fill="white" stroke="#10b981" strokeWidth="2" />
                  
            {/* Inner shield decoration */}
            <path d="M0,-65 C40,-60 65,-55 65,-25 C65,30 0,65 0,65 C0,65 -65,30 -65,-25 C-65,-55 -40,-60 0,-65Z" 
                  fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                  
            {/* Check mark inside shield */}
            <path d="M-25,0 L-8,20 L25,-20" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Pulse animation */}
            <circle cx="0" cy="0" r="0" fill="#10b981" opacity="0.3">
              <animate attributeName="r" from="0" to="65" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Legal document 1 */}
          <g transform="translate(80, 110)">
            <rect x="0" y="0" width="60" height="80" rx="4" fill="white" stroke="#10b981" strokeWidth="1.5" />
            <rect x="5" y="5" width="50" height="10" rx="2" fill="#10b981" opacity="0.2" />
            <text x="30" y="13" fontSize="9" textAnchor="middle" fill="#10b981">TERMS OF SERVICE</text>
            
            {/* Document content */}
            <g transform="translate(10, 25)">
              <rect width="40" height="3" rx="1" fill="#10b981" opacity="0.4" />
              <rect y="7" width="35" height="3" rx="1" fill="#10b981" opacity="0.3" />
              <rect y="14" width="40" height="3" rx="1" fill="#10b981" opacity="0.4" />
              <rect y="21" width="30" height="3" rx="1" fill="#10b981" opacity="0.3" />
              <rect y="28" width="40" height="3" rx="1" fill="#10b981" opacity="0.4" />
              <rect y="35" width="35" height="3" rx="1" fill="#10b981" opacity="0.3" />
              <rect y="42" width="25" height="3" rx="1" fill="#10b981" opacity="0.4" />
            </g>
            
            {/* GDPR seal */}
            <circle cx="30" cy="65" r="10" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1" />
            <text x="30" y="68" fontSize="6" textAnchor="middle" fill="#10b981" fontWeight="bold">GDPR</text>
          </g>
          
          {/* Legal document 2 */}
          <g transform="translate(320, 110)">
            <rect x="0" y="0" width="60" height="80" rx="4" fill="white" stroke="#10b981" strokeWidth="1.5" />
            <rect x="5" y="5" width="50" height="10" rx="2" fill="#10b981" opacity="0.2" />
            <text x="30" y="13" fontSize="9" textAnchor="middle" fill="#10b981">PRIVACY POLICY</text>
            
            {/* Document content */}
            <g transform="translate(10, 25)">
              <rect width="40" height="3" rx="1" fill="#10b981" opacity="0.4" />
              <rect y="7" width="35" height="3" rx="1" fill="#10b981" opacity="0.3" />
              <rect y="14" width="40" height="3" rx="1" fill="#10b981" opacity="0.4" />
              <rect y="21" width="30" height="3" rx="1" fill="#10b981" opacity="0.3" />
              <rect y="28" width="40" height="3" rx="1" fill="#10b981" opacity="0.4" />
              <rect y="35" width="35" height="3" rx="1" fill="#10b981" opacity="0.3" />
              <rect y="42" width="25" height="3" rx="1" fill="#10b981" opacity="0.4" />
            </g>
            
            {/* Lock icon */}
            <g transform="translate(30, 65)">
              <rect x="-8" y="-5" width="16" height="12" rx="2" fill="#10b981" opacity="0.6" />
              <path d="M-4,-5 L-4,-8 C-4,-12 4,-12 4,-8 L4,-5" stroke="#10b981" strokeWidth="1.5" fill="none" />
              <circle cx="0" cy="0" r="2" fill="#10b981" />
            </g>
          </g>
          
          {/* Connecting lines to shield */}
          <path d="M140,120 C160,120 170,125 180,125" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
          <path d="M320,120 C300,120 290,125 280,125" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
          
          {/* Caption */}
          <text x="200" y="225" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10b981">Ethical Data Collection Practices</text>
        </svg>
      )
    },
    {
      title: "Fast Delivery",
      description: "Quick turnaround times for data delivery, with options for real-time data streaming for time-sensitive projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "amber",
      illustration: (
        <svg viewBox="0 0 400 250" className="w-full h-full">
          <defs>
            <linearGradient id="fast-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
            </linearGradient>
            <filter id="shadow-3" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.2" />
            </filter>
          </defs>
          {/* Background */}
          <rect x="0" y="0" width="400" height="250" fill="url(#fast-gradient)" rx="10" />
          
          {/* Central connection hub */}
          <g transform="translate(200, 125)">
            <circle cx="0" cy="0" r="50" fill="white" filter="url(#shadow-3)" />
            
            {/* Lightning bolt */}
            <path d="M0,-30 L-15,0 L0,0 L0,30" 
                  stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  
            {/* Circular progress/clock face */}
            <circle cx="0" cy="0" r="40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* Animated progress indicator */}
            <circle cx="0" cy="-40" r="5" fill="#f59e0b">
              <animateTransform 
                attributeName="transform" 
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="2s"
                repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Source data visualization */}
          <g transform="translate(80, 125)">
            <rect x="-40" y="-50" width="80" height="100" rx="5" fill="white" stroke="#f59e0b" strokeWidth="1.5" filter="url(#shadow-3)" />
            
            {/* Source device visual */}
            <rect x="-30" y="-40" width="60" height="10" rx="2" fill="#f59e0b" opacity="0.2" />
            <text x="0" y="-32" textAnchor="middle" fontSize="8" fill="#f59e0b">SOURCE</text>
            
            {/* Content bars */}
            <rect x="-30" y="-20" width="60" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            <rect x="-30" y="-10" width="45" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            <rect x="-30" y="0" width="60" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            <rect x="-30" y="10" width="40" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            <rect x="-30" y="20" width="55" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            <rect x="-30" y="30" width="60" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            
            {/* Data flow animation */}
            <g>
              <circle cx="45" cy="0" r="4" fill="#f59e0b">
                <animate attributeName="cx" from="40" to="120" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="45" cy="0" r="4" fill="#f59e0b">
                <animate attributeName="cx" from="40" to="120" dur="1s" begin="0.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="45" cy="0" r="4" fill="#f59e0b">
                <animate attributeName="cx" from="40" to="120" dur="1s" begin="0.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
          
          {/* Destination data visualization */}
          <g transform="translate(320, 125)">
            <rect x="-40" y="-50" width="80" height="100" rx="5" fill="white" stroke="#f59e0b" strokeWidth="1.5" filter="url(#shadow-3)" />
            
            {/* Destination device UI */}
            <rect x="-30" y="-40" width="60" height="10" rx="2" fill="#f59e0b" opacity="0.2" />
            <text x="0" y="-32" textAnchor="middle" fontSize="8" fill="#f59e0b">DESTINATION</text>
            
            {/* Content being received */}
            <rect x="-30" y="-20" width="60" height="5" rx="1" fill="#f59e0b" opacity="0.7" />
            <rect x="-30" y="-10" width="45" height="5" rx="1" fill="#f59e0b" opacity="0.6" />
            <rect x="-30" y="0" width="60" height="5" rx="1" fill="#f59e0b" opacity="0.5" />
            <rect x="-30" y="10" width="40" height="5" rx="1" fill="#f59e0b" opacity="0.4" />
            <rect x="-30" y="20" width="55" height="5" rx="1" fill="#f59e0b" opacity="0.3" />
            <rect x="-30" y="30" width="60" height="5" rx="1" fill="#f59e0b" opacity="0.2" />
            
            {/* Data reception animation */}
            <g>
              <circle cx="-45" cy="0" r="4" fill="#f59e0b">
                <animate attributeName="cx" from="-120" to="-40" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0" to="1" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="-45" cy="0" r="4" fill="#f59e0b">
                <animate attributeName="cx" from="-120" to="-40" dur="1s" begin="0.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="-45" cy="0" r="4" fill="#f59e0b">
                <animate attributeName="cx" from="-120" to="-40" dur="1s" begin="0.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.6s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
          
          {/* Caption */}
          <text x="200" y="225" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b">Fast Data Delivery</text>
        </svg>
      )
    },
    {
      title: "Flexible Data Formats",
      description:
        "Receive your data in your preferred format: CSV, Excel, JSON, XML, API integration, or database storage.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      color: "purple",
      illustration: <FlexibleFormatsIllustration />
    }
  ];

  return (
    <section className="section relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute h-96 w-96 -left-48 -top-48 rounded-full bg-primary/5"></div>
        <div className="absolute h-96 w-96 -right-48 -bottom-48 rounded-full bg-primary/5"></div>
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-950">Why Choose ScrapThatData</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We provide high-quality data extraction services with a focus on accuracy, reliability, and customer satisfaction.
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Illustration Side */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-100 aspect-video bg-white">
                  {feature.illustration}
                </div>
              </div>
              
              {/* Text Side */}
              <div className="w-full md:w-1/2">
                <div className="p-6 md:p-10">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-950">{feature.title}</h3>
                  <p className="text-gray-700 text-lg mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((_, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">
                          {feature.title === "Advanced Scraping Technology" && bulletIndex === 0 && "Bypasses most anti-scraping protections"}
                          {feature.title === "Advanced Scraping Technology" && bulletIndex === 1 && "Handles JavaScript-heavy websites"}
                          {feature.title === "Advanced Scraping Technology" && bulletIndex === 2 && "Scales to millions of data points"}
                          
                          {feature.title === "Ethical Data Collection" && bulletIndex === 0 && "Follows robots.txt rules"}
                          {feature.title === "Ethical Data Collection" && bulletIndex === 1 && "Respects rate limiting"}
                          {feature.title === "Ethical Data Collection" && bulletIndex === 2 && "Only extracts public data"}
                          
                          {feature.title === "Fast Delivery" && bulletIndex === 0 && "Quick turnaround on projects"}
                          {feature.title === "Fast Delivery" && bulletIndex === 1 && "Real-time data streaming options"}
                          {feature.title === "Fast Delivery" && bulletIndex === 2 && "Scheduled recurring deliveries"}
                          
                          {feature.title === "Flexible Data Formats" && bulletIndex === 0 && "CSV, Excel, JSON, XML exports"}
                          {feature.title === "Flexible Data Formats" && bulletIndex === 1 && "API integration capabilities"}
                          {feature.title === "Flexible Data Formats" && bulletIndex === 2 && "Database direct connections"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a 
            href="/contact" 
            className="btn btn-primary px-8 py-3 text-lg inline-flex items-center"
          >
            Get Started
            <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}