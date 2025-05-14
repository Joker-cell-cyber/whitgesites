"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const PopularProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
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

  const solutions = [
    {
      id: 1,
      title: "Business Strategy",
      shortTitle: "Strategy",
      description: "Develop a clear vision and action plan to achieve your business goals and stay ahead of the competition.",
      color: "from-blue-600 to-indigo-600",
      lightColor: "bg-blue-50 dark:bg-blue-900/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      features: [
        "Market analysis and strategic positioning",
        "Short and long-term planning",
        "New market development",
        "Organizational alignment",
        "Strategic performance monitoring"
      ],
      illustration: (
        <svg className="w-full h-52" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect x="50" y="30" width="300" height="140" rx="10" fill="#EBF4FF" stroke="#3B82F6" strokeWidth="2" />
          <rect x="50" y="30" width="300" height="140" fill="url(#blueGradient)" />
          
          {/* Grid lines */}
          <g stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="2 2">
            <line x1="50" y1="60" x2="350" y2="60" />
            <line x1="50" y1="90" x2="350" y2="90" />
            <line x1="50" y1="120" x2="350" y2="120" />
            <line x1="50" y1="150" x2="350" y2="150" />
            
            <line x1="80" y1="30" x2="80" y2="170" />
            <line x1="120" y1="30" x2="120" y2="170" />
            <line x1="160" y1="30" x2="160" y2="170" />
            <line x1="200" y1="30" x2="200" y2="170" />
            <line x1="240" y1="30" x2="240" y2="170" />
            <line x1="280" y1="30" x2="280" y2="170" />
            <line x1="320" y1="30" x2="320" y2="170" />
          </g>
          
          {/* Chart area */}
          <path d="M80 120 L120 80 L160 110 L200 60 L240 90 L280 50 L320 80" 
                stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Area under the line */}
          <path d="M80 120 L120 80 L160 110 L200 60 L240 90 L280 50 L320 80 L320 170 L80 170 Z" 
                fill="#3B82F6" fillOpacity="0.1" />
          
          {/* Data points with animation and glow */}
          <circle cx="80" cy="120" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="80" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="0.2s" />
          </circle>
          <circle cx="160" cy="110" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="0.4s" />
          </circle>
          <circle cx="200" cy="60" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="0.6s" />
          </circle>
          <circle cx="240" cy="90" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="0.8s" />
          </circle>
          <circle cx="280" cy="50" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="320" cy="80" r="6" fill="#2563EB" filter="url(#glow1)">
            <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="1.2s" />
          </circle>
          
          {/* Chart annotations */}
          <text x="200" y="45" textAnchor="middle" fill="#2563EB" fontWeight="bold" fontSize="12">Strategic Growth</text>
          <text x="70" y="45" textAnchor="end" fill="#2563EB" fontSize="10" transform="rotate(-90, 70, 45)">Performance</text>
          <text x="330" y="175" textAnchor="end" fill="#2563EB" fontSize="10">Time</text>
        </svg>
      )
    },
    {
      id: 2,
      title: "Process Optimization",
      shortTitle: "Process",
      description: "Streamline your operations to increase efficiency, reduce costs, and improve overall productivity.",
      color: "from-indigo-600 to-purple-600",
      lightColor: "bg-indigo-50 dark:bg-indigo-900/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      features: [
        "Process mapping and optimization",
        "Bottleneck elimination",
        "Automation of repetitive tasks",
        "Implementation of Lean practices",
        "Continuous quality improvement"
      ],
      illustration: (
        <svg className="w-full h-52" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <rect width="400" height="200" fill="#EDE9FE" opacity="0.3" />
          
          {/* Flow diagram background */}
          <rect x="60" y="40" width="80" height="120" rx="5" fill="#EDE9FE" stroke="#6366F1" strokeWidth="2" />
          <rect x="160" y="40" width="80" height="120" rx="5" fill="#EDE9FE" stroke="#6366F1" strokeWidth="2" />
          <rect x="260" y="40" width="80" height="120" rx="5" fill="#EDE9FE" stroke="#6366F1" strokeWidth="2" />
          
          {/* Connect the boxes */}
          <path d="M140 100 L160 100" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M240 100 L260 100" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Process nodes */}
          <g filter="url(#glow2)">
            <circle cx="100" cy="70" r="10" fill="#6366F1">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="100" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
          </g>
          
          <g filter="url(#glow2)">
            <circle cx="100" cy="130" r="10" fill="#6366F1">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <text x="100" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
          </g>
          
          <g filter="url(#glow2)">
            <circle cx="200" cy="70" r="10" fill="#6366F1">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>
            <text x="200" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
          </g>
          
          <g filter="url(#glow2)">
            <circle cx="200" cy="130" r="10" fill="#6366F1">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="1.5s" />
            </circle>
            <text x="200" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
          </g>
          
          <g filter="url(#glow2)">
            <circle cx="300" cy="70" r="10" fill="#6366F1">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="2s" />
            </circle>
            <text x="300" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
          </g>
          
          <g filter="url(#glow2)">
            <circle cx="300" cy="130" r="10" fill="#6366F1">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="2.5s" />
            </circle>
            <text x="300" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">6</text>
          </g>
          
          {/* Connection lines */}
          <path d="M100 80 L100 120" stroke="#6366F1" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" />
          </path>
          <path d="M200 80 L200 120" stroke="#6366F1" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" begin="0.5s" />
          </path>
          <path d="M300 80 L300 120" stroke="#6366F1" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" begin="1s" />
          </path>
          
          {/* Labels */}
          <text x="100" y="35" textAnchor="middle" fill="#6366F1" fontWeight="bold" fontSize="10">Analysis</text>
          <text x="200" y="35" textAnchor="middle" fill="#6366F1" fontWeight="bold" fontSize="10">Optimization</text>
          <text x="300" y="35" textAnchor="middle" fill="#6366F1" fontWeight="bold" fontSize="10">Improvement</text>
        </svg>
      )
    },
    {
      id: 3,
      title: "Financial Management",
      shortTitle: "Finance",
      description: "Optimize your company's financial performance through expert budgeting, forecasting, and cash flow management.",
      color: "from-emerald-600 to-teal-600",
      lightColor: "bg-emerald-50 dark:bg-emerald-900/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      features: [
        "Strategic financial planning",
        "Cost structure optimization",
        "Cash flow management",
        "Investment analysis",
        "Tax and compliance strategies"
      ],
      illustration: (
        <svg className="w-full h-52" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <rect x="80" y="40" width="240" height="120" rx="10" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
          <rect x="80" y="40" width="240" height="120" rx="10" fill="url(#greenGradient)" />
          
          {/* Background grid */}
          <g stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="2 2">
            <line x1="90" y1="140" x2="310" y2="140" />
            <line x1="90" y1="120" x2="310" y2="120" />
            <line x1="90" y1="100" x2="310" y2="100" />
            <line x1="90" y1="80" x2="310" y2="80" />
            <line x1="90" y1="60" x2="310" y2="60" />
            
            <line x1="120" y1="50" x2="120" y2="150" />
            <line x1="160" y1="50" x2="160" y2="150" />
            <line x1="200" y1="50" x2="200" y2="150" />
            <line x1="240" y1="50" x2="240" y2="150" />
            <line x1="280" y1="50" x2="280" y2="150" />
          </g>
          
          {/* Chart bars with animations */}
          <g filter="url(#glow3)">
            <rect x="100" y="70" width="40" height="70" rx="3" fill="#10B981" opacity="0.9">
              <animate attributeName="height" from="0" to="70" dur="1s" />
              <animate attributeName="y" from="140" to="70" dur="1s" />
            </rect>
            <rect x="150" y="90" width="40" height="50" rx="3" fill="#10B981" opacity="0.9">
              <animate attributeName="height" from="0" to="50" dur="1s" begin="0.2s" />
              <animate attributeName="y" from="140" to="90" dur="1s" begin="0.2s" />
            </rect>
            <rect x="200" y="60" width="40" height="80" rx="3" fill="#10B981" opacity="0.9">
              <animate attributeName="height" from="0" to="80" dur="1s" begin="0.4s" />
              <animate attributeName="y" from="140" to="60" dur="1s" begin="0.4s" />
            </rect>
            <rect x="250" y="80" width="40" height="60" rx="3" fill="#10B981" opacity="0.9">
              <animate attributeName="height" from="0" to="60" dur="1s" begin="0.6s" />
              <animate attributeName="y" from="140" to="80" dur="1s" begin="0.6s" />
            </rect>
          </g>
          
          {/* Axis */}
          <path d="M90 140 L310 140" stroke="#10B981" strokeWidth="2" />
          
          {/* Value markers */}
          <text x="120" y="65" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Q1</text>
          <text x="170" y="85" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Q2</text>
          <text x="220" y="55" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Q3</text>
          <text x="270" y="75" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Q4</text>
          
          {/* Annotations */}
          <text x="200" y="160" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Quarterly Financial Performance</text>
          
          {/* Trend line */}
          <path d="M120 70 C 140 95, 160 75, 170 90 C 190 100, 220 40, 240 60 C 255 70, 270 80, 270 80" 
                stroke="#065F46" strokeWidth="2" fill="none" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Digital Transformation",
      shortTitle: "Digital",
      description: "Harness the power of technology to modernize your business processes and remain competitive in the digital age.",
      color: "from-purple-600 to-pink-600",
      lightColor: "bg-purple-50 dark:bg-purple-900/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      ),
      features: [
        "Digital maturity assessment",
        "Transformation strategy design",
        "Integration of innovative technologies",
        "Automation and artificial intelligence",
        "Customer experience optimization"
      ],
      illustration: (
        <svg className="w-full h-52" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="purpleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <rect x="80" y="40" width="240" height="120" rx="5" fill="#F3E8FF" stroke="#9333EA" strokeWidth="2" />
          <rect x="80" y="40" width="240" height="120" rx="5" fill="url(#purpleGradient2)" />
          
          {/* Digital systems */}
          <rect x="100" y="60" width="80" height="60" rx="3" fill="#9333EA" opacity="0.8">
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="220" y="60" width="80" height="60" rx="3" fill="#9333EA" opacity="0.8">
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" begin="1.5s" />
          </rect>
          
          {/* System icons */}
          <circle cx="140" cy="80" r="12" fill="white" filter="url(#glow4)" />
          <path d="M132 80 H148" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
          <path d="M140 72 V88" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
          <text x="140" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">CLOUD</text>

          <circle cx="260" cy="80" r="12" fill="white" filter="url(#glow4)" />
          <path d="M252 80 H268" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
          <path d="M260 72 V88" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
          <text x="260" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">API</text>
          
          {/* Connection lines with animations */}
          <path d="M180 90 L220 90" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" values="24;0;24" dur="5s" repeatCount="indefinite" />
          </path>
          
          <path d="M190 130 L100 170" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" values="30;0;30" dur="5s" repeatCount="indefinite" begin="0.6s" />
          </path>
          
          <path d="M210 130 L300 170" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" values="30;0;30" dur="5s" repeatCount="indefinite" begin="1.2s" />
          </path>
          
          {/* Mobile devices */}
          <rect x="90" y="170" width="20" height="30" rx="2" fill="#9333EA" filter="url(#glow4)" />
          <rect x="290" y="170" width="20" height="30" rx="2" fill="#9333EA" filter="url(#glow4)" />
          <rect x="95" y="175" width="10" height="15" rx="1" fill="white" />
          <rect x="295" y="175" width="10" height="15" rx="1" fill="white" />
          
          {/* Small data points with animation */}
          <g>
            <circle cx="180" cy="90" r="3" fill="#C084FC">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="90;85;90" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="90" r="3" fill="#C084FC">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.2s" />
              <animate attributeName="cy" values="90;85;90" dur="2s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle cx="200" cy="90" r="3" fill="#C084FC">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.4s" />
              <animate attributeName="cy" values="90;85;90" dur="2s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle cx="210" cy="90" r="3" fill="#C084FC">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="cy" values="90;85;90" dur="2s" repeatCount="indefinite" begin="0.6s" />
            </circle>
          </g>
          
          <text x="200" y="35" textAnchor="middle" fill="#7E22CE" fontSize="11" fontWeight="bold">DIGITAL TRANSFORMATION</text>
        </svg>
      )
    },
    {
      id: 5,
      title: "Marketing and Development",
      shortTitle: "Marketing",
      description: "Gain valuable insights into your industry landscape through comprehensive market research and competitive analysis.",
      color: "from-red-600 to-orange-600",
      lightColor: "bg-red-50 dark:bg-red-900/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 0 1.014-.24l.139-.045a23.35 23.35 0 0 0 .64-.215l.164-.06a23.856 23.856 0 0 0 4.032-1.95A8.955 8.955 0 0 1 18 10c0 .266.013.53.038.79a17.87 17.87 0 0 0-1.4 7.48c0 2.004.358 3.93 1.01 5.71" />
        </svg>
      ),
      features: [
        "Market analysis and segmentation",
        "Brand positioning strategy",
        "Optimized marketing campaigns",
        "Digital marketing and social media",
        "Performance measurement and analysis"
      ],
      illustration: (
        <svg className="w-full h-52" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow5" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FEE2E2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FEE2E2" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <rect x="50" y="30" width="300" height="140" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <rect x="50" y="30" width="300" height="140" rx="10" fill="url(#redGradient)" />
          
          {/* Marketing network visualization */}
          <circle cx="200" cy="100" r="50" fill="url(#centerGlow)" stroke="#EF4444" strokeWidth="2" filter="url(#glow5)">
            <animate attributeName="r" values="48;52;48" dur="5s" repeatCount="indefinite" />
          </circle>
          
          {/* Central icon */}
          <circle cx="200" cy="100" r="15" fill="#EF4444" />
          <path d="M193 100 H207" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M200 93 V107" stroke="white" strokeWidth="2" strokeLinecap="round" />
          
          {/* Connection lines */}
          <path d="M200 50 L200 85" stroke="#EF4444" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="35;0;35" dur="5s" repeatCount="indefinite" />
          </path>
          <path d="M200 115 L200 150" stroke="#EF4444" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="35;0;35" dur="5s" repeatCount="indefinite" begin="1.5s" />
          </path>
          <path d="M150 100 L185 100" stroke="#EF4444" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="35;0;35" dur="5s" repeatCount="indefinite" begin="0.5s" />
          </path>
          <path d="M215 100 L250 100" stroke="#EF4444" strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="35;0;35" dur="5s" repeatCount="indefinite" begin="1s" />
          </path>
          
          {/* Satellite nodes with pulsing animation */}
          <g filter="url(#glow5)">
            <circle cx="120" cy="60" r="15" fill="#FECACA" stroke="#EF4444" strokeWidth="2">
              <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <text x="120" y="63" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="bold">SEO</text>
          </g>
          
          <g filter="url(#glow5)">
            <circle cx="280" cy="60" r="15" fill="#FECACA" stroke="#EF4444" strokeWidth="2">
              <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <text x="280" y="63" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="bold">SEM</text>
          </g>
          
          <g filter="url(#glow5)">
            <circle cx="120" cy="140" r="15" fill="#FECACA" stroke="#EF4444" strokeWidth="2">
              <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>
            <text x="120" y="143" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="bold">SOCIAL</text>
          </g>
          
          <g filter="url(#glow5)">
            <circle cx="280" cy="140" r="15" fill="#FECACA" stroke="#EF4444" strokeWidth="2">
              <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite" begin="1.4s" />
            </circle>
            <text x="280" y="143" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="bold">EMAIL</text>
          </g>
          
          {/* Dotted connection paths */}
          <path d="M135 60 L185 60" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="50;0;50" dur="10s" repeatCount="indefinite" />
          </path>
          <path d="M215 60 L265 60" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="50;0;50" dur="10s" repeatCount="indefinite" begin="2s" />
          </path>
          <path d="M135 140 L185 140" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="50;0;50" dur="10s" repeatCount="indefinite" begin="1s" />
          </path>
          <path d="M215 140 L265 140" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="50;0;50" dur="10s" repeatCount="indefinite" begin="3s" />
          </path>
          
          <text x="200" y="180" textAnchor="middle" fill="#B91C1C" fontSize="11" fontWeight="bold">INTEGRATED MARKETING</text>
        </svg>
      )
    },
    {
      id: 6,
      title: "Startup Development",
      shortTitle: "Startup",
      description: "Specialized support for startups to help them launch, grow, and thrive in a competitive environment.",
      color: "from-amber-600 to-yellow-500",
      lightColor: "bg-amber-50 dark:bg-amber-900/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      features: [
        "Business plan development",
        "Launch strategy and positioning",
        "Fundraising advisory",
        "MVP development",
        "Ecosystem networking"
      ],
      illustration: (
        <svg className="w-full h-52" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow6" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <rect x="50" y="30" width="300" height="140" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <rect x="50" y="30" width="300" height="140" rx="10" fill="url(#amberGradient)" />
          
          {/* Startup growth visualization */}
          <g transform="translate(200, 100) scale(0.9)">
            {/* Growth curve with animation */}
            <path d="M-150 0 C -100 -20, -50 -80, 0 -50 C 50 -20, 100 -70, 150 -80" 
                  stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round"
                  filter="url(#glow6)">
              <animate attributeName="stroke-dasharray" from="350" to="0" dur="3s" />
            </path>
            
            {/* Area under the curve */}
            <path d="M-150 0 C -100 -20, -50 -80, 0 -50 C 50 -20, 100 -70, 150 -80 L 150 0 Z" 
                  fill="#F59E0B" fillOpacity="0.2" />
            
            {/* Milestone markers */}
            <g filter="url(#glow6)">
              <circle cx="-120" cy="-10" r="8" fill="#F59E0B">
                <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="-120" y="10" textAnchor="middle" fill="#D97706" fontSize="8" fontWeight="bold">IDEA</text>
            </g>
            
            <g filter="url(#glow6)">
              <circle cx="-60" cy="-60" r="8" fill="#F59E0B">
                <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <text x="-60" y="-40" textAnchor="middle" fill="#D97706" fontSize="8" fontWeight="bold">MVP</text>
            </g>
            
            <g filter="url(#glow6)">
              <circle cx="0" cy="-50" r="8" fill="#F59E0B">
                <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" begin="1s" />
              </circle>
              <text x="0" y="-30" textAnchor="middle" fill="#D97706" fontSize="8" fontWeight="bold">SEED</text>
            </g>
            
            <g filter="url(#glow6)">
              <circle cx="60" cy="-20" r="8" fill="#F59E0B">
                <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </circle>
              <text x="60" y="-0" textAnchor="middle" fill="#D97706" fontSize="8" fontWeight="bold">SERIES A</text>
            </g>
            
            <g filter="url(#glow6)">
              <circle cx="120" cy="-70" r="8" fill="#F59E0B">
                <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" begin="2s" />
              </circle>
              <text x="120" y="-50" textAnchor="middle" fill="#D97706" fontSize="8" fontWeight="bold">SCALE</text>
            </g>
            
            {/* Graph axes */}
            <line x1="-150" y1="0" x2="150" y2="0" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5 3" />
            <line x1="-150" y1="-80" x2="-150" y2="0" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5 3" />
            
            {/* Rocket animation */}
            <g transform="translate(140, -90) rotate(-30)" filter="url(#glow6)">
              <path d="M0,0 L5,15 L0,12 L-5,15 Z" fill="#D97706">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M0,12 L0,20" stroke="#F59E0B" strokeWidth="1">
                <animate attributeName="d" values="M0,12 L0,15; M0,12 L0,22; M0,12 L0,15" dur="0.5s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
          
          <text x="200" y="180" textAnchor="middle" fill="#D97706" fontSize="11" fontWeight="bold">STARTUP GROWTH</text>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">Our Solutions</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Tailored solutions to transform your business challenges into sustainable growth opportunities
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === solution.id
                    ? `bg-gradient-to-r ${solution.color} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className={activeTab === solution.id ? 'text-white' : ''}>{solution.icon}</span>
                <span>{solution.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className={`transition-opacity duration-500 ${
                  activeTab === solution.id ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-10">
                    <div className={`inline-flex items-center justify-center p-3 rounded-lg mb-6 bg-gradient-to-r ${solution.color} text-white`}>
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                      {solution.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r ${solution.color} text-white mr-3 mt-0.5`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href="/pricing" 
                      className={`inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r ${solution.color} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                    >
                      Explore Our Offerings
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>

                  <div className={`flex items-center justify-center p-6 ${solution.lightColor}`}>
                    {solution.illustration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProjects; 