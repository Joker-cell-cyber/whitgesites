"use client";

import React, { useState } from 'react';

export function DataCards() {
  const dataTypes = [
    {
      title: "E-commerce Data",
      description: "Product details, prices, reviews, inventory, and competitor analysis from online stores.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#EFF6FF"/>
          <defs>
            <linearGradient id="ecommerce-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBEAFE"/>
              <stop offset="100%" stopColor="#93C5FD"/>
            </linearGradient>
          </defs>
          <rect x="50" y="50" width="300" height="200" rx="12" fill="white" stroke="#9CA3AF" strokeWidth="1"/>
          {/* Product Image Placeholder */}
          <rect x="75" y="75" width="120" height="120" rx="8" fill="url(#ecommerce-grad)"/>
          <path d="M95 155 L 115 130 L 135 150 L 155 120 L 175 145" stroke="#1E40AF" strokeWidth="2" fill="none"/>
          <circle cx="105" cy="105" r="8" fill="#60A5FA"/>
          {/* Product Title */}
          <rect x="215" y="75" width="110" height="24" rx="4" fill="#BFDBFE"/>
          {/* Product Description Lines */}
          <rect x="215" y="110" width="110" height="10" rx="2" fill="#DBEAFE"/>
          <rect x="215" y="130" width="90" height="10" rx="2" fill="#DBEAFE"/>
          <rect x="215" y="150" width="100" height="10" rx="2" fill="#DBEAFE"/>
          {/* Price Tag */}
          <rect x="215" y="175" width="60" height="20" rx="4" fill="#60A5FA"/>
          <rect x="285" y="175" width="40" height="20" rx="10" fill="#DBEAFE"/>
          {/* Cart Icon */}
          <path d="M75 215 h 250 M 75 215 l 10 -10 M 325 215 l -10 -10" stroke="#BFDBFE" strokeWidth="1"/>
          <circle cx="110" cy="230" r="8" fill="#BFDBFE" stroke="white" strokeWidth="2"/>
          <circle cx="290" cy="230" r="8" fill="#BFDBFE" stroke="white" strokeWidth="2"/>
          <rect x="100" y="210" width="200" height="15" rx="3" fill="#DBEAFE"/>
        </svg>
      ),
      examples: ["Product listings", "Price comparisons", "Customer reviews", "Inventory tracking"]
    },
    {
      title: "Business Listings",
      description: "Company information, contact details, services, and customer reviews from business directories.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "bg-green-500",
      lightColor: "bg-green-50",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#ECFDF5"/>
          <defs>
            <linearGradient id="building-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0"/>
              <stop offset="100%" stopColor="#6EE7B7"/>
            </linearGradient>
            <filter id="shadow-business" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
                </feComponentTransfer>
                <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          {/* Building Structure */}
          <path d="M120 240 V 90 C 120 80 130 70 140 70 H 260 C 270 70 280 80 280 90 V 240" fill="url(#building-grad)" stroke="#047857" strokeWidth="2"/>
          {/* Windows */}
          <rect x="145" y="95" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="185" y="95" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="225" y="95" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="145" y="135" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="185" y="135" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="225" y="135" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="145" y="175" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="185" y="175" width="30" height="30" rx="3" fill="#D1FAE5"/>
          <rect x="225" y="175" width="30" height="30" rx="3" fill="#D1FAE5"/>
          {/* Door */}
          <rect x="180" y="210" width="40" height="30" rx="3" fill="#34D399" stroke="#047857" strokeWidth="1"/>
          <circle cx="210" cy="225" r="2" fill="#047857"/>
          {/* Sign */}
          <rect x="150" y="55" width="100" height="25" rx="4" fill="white" stroke="#047857" strokeWidth="1.5" filter="url(#shadow-business)"/>
          <rect x="160" y="62" width="80" height="5" rx="1" fill="#A7F3D0"/>
          <rect x="160" y="70" width="50" height="5" rx="1" fill="#A7F3D0"/>
          {/* Ground Line */}
          <line x1="80" y1="240" x2="320" y2="240" stroke="#065F46" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
      examples: ["Company details", "Service offerings", "Contact information", "Customer feedback"]
    },
    {
      title: "Real Estate Data",
      description: "Property listings, prices, features, historical data, and market trends from real estate platforms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#FFFBEB"/>
          <defs>
            <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7"/>
              <stop offset="100%" stopColor="#FDE68A"/>
            </linearGradient>
            <filter id="shadow-house" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="3" dy="3" result="offsetblur"/>
                <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"/>
                </feComponentTransfer>
                <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          {/* Sky */}
          <rect x="0" y="0" width="400" height="250" fill="url(#sky-grad)"/>
          {/* Sun */}
          <circle cx="320" cy="70" r="30" fill="#FBBF24"/>
          {/* Ground */}
          <path d="M0 220 Q 200 190 400 220 V 300 H 0 Z" fill="#FCD34D"/>
          {/* House structure */}
          <g filter="url(#shadow-house)">
            <path d="M130 240 V 140 L 200 90 L 270 140 V 240 H 130 Z" fill="#FDBA74" stroke="#B45309" strokeWidth="2"/>
            {/* Roof */}
            <path d="M120 145 L 200 85 L 280 145" stroke="#B45309" strokeWidth="2" fill="#F97316"/>
            {/* Door */}
            <rect x="180" y="190" width="40" height="50" rx="3" fill="#FED7AA" stroke="#B45309" strokeWidth="1.5"/>
            <circle cx="210" cy="215" r="3" fill="#B45309"/>
            {/* Window */}
            <rect x="145" y="155" width="40" height="30" rx="3" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5"/>
            <line x1="165" y1="155" x2="165" y2="185" stroke="#B45309" strokeWidth="1.5"/>
            <line x1="145" y1="170" x2="185" y2="170" stroke="#B45309" strokeWidth="1.5"/>
          </g>
          {/* Tree */}
          <rect x="300" y="180" width="20" height="60" fill="#92400E"/>
          <circle cx="310" cy="160" r="40" fill="#34D399"/>
          <circle cx="290" cy="170" r="30" fill="#10B981"/>
          <circle cx="330" cy="175" r="25" fill="#059669"/>
        </svg>
      ),
      examples: ["Property prices", "Location details", "Amenities", "Market trends"]
    },
    {
      title: "Financial Data",
      description: "Stock prices, market indicators, company financials, and economic trends from financial websites.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#FAF5FF"/>
          <defs>
            <linearGradient id="chart-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C084FC"/>
              <stop offset="100%" stopColor="#A855F7"/>
            </linearGradient>
            <filter id="shadow-fin" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="1" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.6"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Background Grid */}
          <path d="M50 50 H 350 M50 100 H 350 M50 150 H 350 M50 200 H 350 M50 250 H 350 M 50 50 V 250 M 100 50 V 250 M 150 50 V 250 M 200 50 V 250 M 250 50 V 250 M 300 50 V 250 M 350 50 V 250" stroke="#E9D5FF" strokeWidth="1"/>
          {/* Chart Line */}
          <path d="M75 220 C 100 180, 125 190, 150 150 S 200 80, 225 100 S 275 150, 300 120 S 325 180 350 160" stroke="url(#chart-grad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow-fin)"/>
          {/* Data Points */}
          <circle cx="75" cy="220" r="5" fill="#9333EA"/>
          <circle cx="150" cy="150" r="5" fill="#9333EA"/>
          <circle cx="225" cy="100" r="5" fill="#9333EA"/>
          <circle cx="300" cy="120" r="5" fill="#9333EA"/>
          <circle cx="350" cy="160" r="5" fill="#9333EA"/>
          {/* Bar Chart Elements */}
          <rect x="55" y="180" width="30" height="70" rx="3" fill="#C084FC" opacity="0.6"/>
          <rect x="105" y="140" width="30" height="110" rx="3" fill="#C084FC" opacity="0.6"/>
          <rect x="155" y="200" width="30" height="50" rx="3" fill="#C084FC" opacity="0.6"/>
          <rect x="205" y="100" width="30" height="150" rx="3" fill="#C084FC" opacity="0.6"/>
          <rect x="255" y="160" width="30" height="90" rx="3" fill="#C084FC" opacity="0.6"/>
          <rect x="305" y="120" width="30" height="130" rx="3" fill="#C084FC" opacity="0.6"/>
          {/* Axis */}
          <path d="M50 250 H 370 M 50 250 V 30" stroke="#7E22CE" strokeWidth="2"/>
        </svg>
      ),
      examples: ["Stock prices", "Market trends", "Company financials", "Economic indicators"]
    },
    {
      title: "Social Media Data",
      description: "Profiles, posts, engagement metrics, and audience insights from social media platforms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#FFF1F2"/>
          <defs>
            <linearGradient id="social-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FECDD3"/>
              <stop offset="100%" stopColor="#FDA4AF"/>
            </linearGradient>
            <clipPath id="avatarClip">
                <circle cx="120" cy="110" r="40"/>
            </clipPath>
            <filter id="shadow-social" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          {/* Main Profile Card */}
          <rect x="60" y="60" width="280" height="180" rx="12" fill="white" stroke="#F472B6" strokeWidth="1" filter="url(#shadow-social)"/>
          {/* Profile Avatar Placeholder */}
          <circle cx="120" cy="110" r="40" fill="url(#social-grad)"/>
          {/* Placeholder lines inside avatar */}
          <g clipPath="url(#avatarClip)">
            <path d="M100 130 Q 120 115 140 130" stroke="#BE185D" strokeWidth="2" fill="none"/>
            <circle cx="110" cy="100" r="4" fill="#BE185D"/>
            <circle cx="130" cy="100" r="4" fill="#BE185D"/>
          </g>
          {/* Profile Name */}
          <rect x="180" y="85" width="120" height="20" rx="4" fill="#FECDD3"/>
          {/* Profile Handle */}
          <rect x="180" y="115" width="80" height="12" rx="3" fill="#FFE4E6"/>
          {/* Follow Button */}
          <rect x="180" y="140" width="70" height="25" rx="12" fill="#F9A8D4"/>
          {/* Stats */}
          <rect x="80" y="170" width="40" height="10" rx="2" fill="#FECDD3"/>
          <rect x="85" y="185" width="30" height="8" rx="2" fill="#FFE4E6"/>
          <rect x="150" y="170" width="40" height="10" rx="2" fill="#FECDD3"/>
          <rect x="155" y="185" width="30" height="8" rx="2" fill="#FFE4E6"/>
          <rect x="220" y="170" width="40" height="10" rx="2" fill="#FECDD3"/>
          <rect x="225" y="185" width="30" height="8" rx="2" fill="#FFE4E6"/>
          {/* Floating Icons */}
          {/* Like Icon */}
          <path d="M300 70 L 295 75 L 290 70 A 5 5 0 0 1 300 70 Z" fill="#FB7185"/>
          {/* Comment Icon */}
          <ellipse cx="280" cy="190" rx="15" ry="10" fill="#FBCFE8"/>
          <ellipse cx="280" cy="190" rx="12" ry="7" fill="white"/>
          {/* Share Icon */}
          <path d="M90 200 L 110 190 L 90 180 Z" fill="#F9A8D4"/>
        </svg>
      ),
      examples: ["User profiles", "Post engagement", "Follower metrics", "Content analysis"]
    },
    {
      title: "Travel Data",
      description: "Flight prices, hotel rates, availability, reviews, and destination information from travel sites.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#ECFEFF"/>
          <defs>
            <linearGradient id="water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A5F3FC"/>
              <stop offset="100%" stopColor="#67E8F9"/>
            </linearGradient>
            <linearGradient id="plane-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E0F2FE"/>
              <stop offset="100%" stopColor="#BFDBFE"/>
            </linearGradient>
            <filter id="shadow-travel" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
                <feOffset dx="3" dy="5" result="offsetblur"/>
                <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"/>
                </feComponentTransfer>
                <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          {/* Sky */}
          <rect x="0" y="0" width="400" height="200" fill="#CFFAFE"/>
          {/* Sun */}
          <circle cx="330" cy="70" r="25" fill="#FDE047"/>
          {/* Water/Sea */}
          <path d="M0 180 Q 100 220 200 200 T 400 190 V 300 H 0 Z" fill="url(#water-grad)"/>
          {/* Airplane */}
          <g transform="translate(100 80) rotate(-15)" filter="url(#shadow-travel)">
            <path d="M 0 0 L 60 10 L 70 0 L 100 10 L 110 5 L 70 15 L 60 25 L 0 15 Z" fill="url(#plane-grad)" stroke="#0E7490" strokeWidth="1.5"/>
            <path d="M 65 12.5 L 90 30 L 80 35 Z" fill="#E0F2FE" stroke="#0E7490" strokeWidth="1"/> { /* Tail */}
            <rect x="30" y="16" width="20" height="5" rx="2" fill="#A5F3FC"/> { /* Wing */}
          </g>
          {/* Island/Palm Tree */}
          <path d="M50 250 C 70 230 100 230 120 250 Q 100 260 80 260 Q 60 260 50 250 Z" fill="#FDE68A"/>
          <line x1="85" y1="240" x2="85" y2="190" stroke="#A16207" strokeWidth="4" strokeLinecap="round"/>
          <path d="M85 190 C 60 180 50 160 70 150" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M85 190 C 90 170 110 160 115 170" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M85 190 C 110 185 120 200 100 210" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round"/>
          {/* Compass Rose - Simple */}
          <circle cx="300" cy="240" r="30" fill="white" stroke="#0E7490" strokeWidth="1"/>
          <path d="M300 220 L 300 260 M 280 240 L 320 240" stroke="#0E7490" strokeWidth="1"/>
          <path d="M300 220 L 310 230 L 300 240 L 290 230 Z" fill="#06B6D4"/> { /* North */}
        </svg>
      ),
      examples: ["Flight prices", "Hotel availability", "Travel reviews", "Destination details"]
    },
  ];

  const [activeTab, setActiveTab] = useState("E-commerce Data");

  const activeData = dataTypes.find(data => data.title === activeTab);

  return (
    <section className="section py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-950">Data Types We Extract</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our web scraping services can extract a wide range of data types to meet your business needs
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-10 border-b border-gray-200 overflow-x-auto">
          <div className="flex whitespace-nowrap pb-1">
            {dataTypes.map((dataType) => (
              <button
                key={dataType.title}
                className={`px-5 py-3 font-medium text-sm transition-colors rounded-t-lg mr-2 
                  ${activeTab === dataType.title 
                    ? `${dataType.color} text-white` 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                onClick={() => setActiveTab(dataType.title)}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    activeTab === dataType.title ? 'bg-white/20' : dataType.lightColor
                  }`}>
                    <div className={`w-5 h-5 ${activeTab === dataType.title ? 'text-white' : dataType.color}`}>
                      {dataType.icon}
                    </div>
                  </div>
                  {dataType.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeData && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="aspect-video overflow-hidden flex items-center justify-center p-4">
                  {activeData.illustration}
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${activeData.lightColor} ${activeData.color.replace('bg-', 'text-')}`}>
                  {activeData.title}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-950">
                  Extract valuable {activeData.title.toLowerCase()}
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {activeData.description}
                </p>
                
                <h4 className="font-semibold text-gray-950 mb-3">Common data points we extract:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeData.examples.map((example, i) => (
                    <div key={i} className="flex items-start">
                      <div className={`flex-shrink-0 ${activeData.color} p-1 rounded-full`}>
                        <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-gray-700">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 