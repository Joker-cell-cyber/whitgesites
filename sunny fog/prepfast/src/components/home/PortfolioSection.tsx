"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Resource {
  id: number;
  title: string;
  description: string;
  icon: string;
  illustration: string;
  color: string;
  islandType: string;
}

export default function PortfolioSection() {
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Career Islands Data
  const resources: Resource[] = [
    {
      id: 1,
      title: "Basic CV Service",
      description: "Online CV review with formatting help and basic suggestions delivered via email",
      icon: "📄",
      illustration: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      color: "#3B82F6",
      islandType: "Resume/CV"
    },
    {
      id: 2,
      title: "Standard CV Service",
      description: "ATS-optimized resume rewrite with keyword optimization via online consultation",
      icon: "📝",
      illustration: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      color: "#10B981",
      islandType: "Resume/CV"
    },
    {
      id: 3,
      title: "Interview Coaching",
      description: "Online mock interviews and personalized feedback sessions via video call",
      icon: "🎯",
      illustration: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      color: "#8B5CF6",
      islandType: "Interview"
    },
    {
      id: 4,
      title: "Application Strategy",
      description: "Digital guidance for optimizing job applications with document review",
      icon: "📋",
      illustration: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      color: "#EC4899",
      islandType: "Application"
    },
    {
      id: 5,
      title: "Premium CV Package",
      description: "Complete CV & LinkedIn profile optimization with revision rounds via online service",
      icon: "💼",
      illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      color: "#F59E0B",
      islandType: "Resume/CV"
    },
    {
      id: 6,
      title: "Cover Letter Writing",
      description: "Custom cover letter creation that complements your resume, delivered digitally",
      icon: "✉️",
      illustration: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      color: "#EF4444",
      islandType: "Application"
    }
  ];

  const handleResourceClick = (resource: Resource) => {
    setActiveResource(resource === activeResource ? null : resource);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden" id="portfolio">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a1a2a] to-[#0a1a2a]"></div>
      
      {/* Subtle Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <div className="wave-1"></div>
        <div className="wave-2"></div>
      </div>
      
      {/* Stars Effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Online Career <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Explore our digital career preparation services delivered via chat and video
          </p>
          
          {/* Compass Icon */}
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-[#091525] mb-4 compass-pulse">
            <span className="text-3xl">🧭</span>
          </div>
        </motion.div>

        {/* Island Layout - Hexagonal Grid Pattern */}
        <div className="islands-container relative max-w-6xl mx-auto">
          {/* Connecting Lines - Decorative */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <path d="M300,200 L500,300 L700,200 L500,100 Z" 
                  stroke="rgba(0, 120, 215, 0.2)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="5,5" />
            <path d="M300,400 L500,300 L700,400" 
                  stroke="rgba(0, 178, 169, 0.2)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="5,5" />
          </svg>
          
          {/* Islands in a Pseudo-Hexagonal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24 relative">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className={`island-card relative z-10 ${
                  index === 0 ? "lg:col-start-2" : 
                  index === 1 ? "lg:col-start-3" : 
                  index === 2 ? "lg:col-start-1" : 
                  index === 3 ? "lg:col-start-3" : 
                  index === 4 ? "lg:col-start-1" : 
                  "lg:col-start-2"
                } ${
                  index === 0 ? "lg:row-start-1" : 
                  index === 1 ? "lg:row-start-2" : 
                  index === 2 ? "lg:row-start-2" : 
                  index === 3 ? "lg:row-start-3" : 
                  index === 4 ? "lg:row-start-3" : 
                  "lg:row-start-4"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.15,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 70
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
                onMouseEnter={() => setHoveredId(resource.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  y: hoveredId === resource.id ? -15 : 0,
                  scale: hoveredId === resource.id ? 1.05 : 1,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleResourceClick(resource)}
              >
                {/* Island floating effect - Shadow */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 rounded-full blur-md"
                  style={{ 
                    background: `radial-gradient(${resource.color}70, transparent 70%)`,
                    opacity: 0.6,
                    transform: `translateX(-50%) scaleX(${hoveredId === resource.id ? 1.1 : 1})`,
                    transition: "transform 0.3s ease"
                  }}
                />
                
                {/* Island Card */}
                <div 
                  className="rounded-2xl overflow-hidden cursor-pointer group island-float"
                  style={{
                    background: "#111111",
                    boxShadow: `0 10px 30px -5px ${resource.color}30, 0 0 0 1px ${resource.color}20`,
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* Island Terrain */}
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src={resource.illustration} 
                      alt={resource.title}
                      className="object-cover filter saturate-75"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                    
                    {/* Island Type Badge */}
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${resource.color}30`,
                        color: resource.color,
                        boxShadow: `0 0 15px ${resource.color}40`
                      }}
                    >
                      {resource.islandType}
                    </div>

                    {/* Icon */}
                    <div 
                      className="absolute right-5 top-4 transform group-hover:scale-110 transition-transform duration-500"
                      style={{ 
                        filter: `drop-shadow(0 0 8px ${resource.color}99)`,
                        fontSize: "2.5rem"
                      }}
                    >
                      {resource.icon}
                    </div>
                    
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="p-5 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <div 
                        className="inline-flex items-center text-sm font-medium rounded-full px-3 py-1 transition-all duration-300"
                        style={{
                          backgroundColor: `${resource.color}15`,
                          color: resource.color,
                        }}
                      >
                        <span>Explore</span>
                        <svg className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50">
                        <span className="text-sm">⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Detailed Island View Modal */}
        {activeResource && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveResource(null)}
          >
            <motion.div 
              className="bg-[#111111] max-w-4xl w-full rounded-2xl overflow-hidden relative"
              initial={{ y: 30, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Island Visualization */}
                <div className="relative aspect-video md:aspect-auto">
                  <Image 
                    src={activeResource.illustration} 
                    alt={activeResource.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div 
                    className="absolute inset-0 opacity-80" 
                    style={{ 
                      background: `linear-gradient(to right, rgba(0,0,0,0.7), transparent), linear-gradient(to top, rgba(0,0,0,0.7), transparent)`
                    }}
                  ></div>
                  
                  {/* Island Type & Icon */}
                  <div className="absolute top-6 left-6 flex flex-col items-start gap-3">
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `${activeResource.color}30`,
                        color: activeResource.color,
                      }}
                    >
                      {activeResource.islandType}
                    </div>
                    
                    <div 
                      className="w-16 h-16 flex items-center justify-center" 
                      style={{
                        filter: `drop-shadow(0 0 15px ${activeResource.color})`
                      }}
                    >
                      <span className="text-4xl">{activeResource.icon}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content Column */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {activeResource.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    {activeResource.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>100% online service</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Chat and video options</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Multiple service tiers</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-6">
                    <div 
                      className="flex-1 p-4 rounded-lg"
                      style={{ background: `${activeResource.color}15` }}
                    >
                      <div className="text-sm text-gray-400 mb-1">Service Type</div>
                      <div className="text-xl font-semibold" style={{ color: activeResource.color }}>{activeResource.islandType}</div>
                    </div>
                    <div 
                      className="flex-1 p-4 rounded-lg"
                      style={{ background: `${activeResource.color}15` }}
                    >
                      <div className="text-sm text-gray-400 mb-1">Availability</div>
                      <div className="text-xl font-semibold" style={{ color: activeResource.color }}>Contact us</div>
                    </div>
                  </div>
                  
                  <button
                    className="w-full px-6 py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                    style={{ 
                      background: `linear-gradient(90deg, ${activeResource.color}, ${activeResource.color}99)`,
                      boxShadow: `0 4px 14px ${activeResource.color}40`
                    }}
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        setActiveResource(null);
                        setTimeout(() => {
                          pricingSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                  >
                    <span>See Service Packages</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={() => setActiveResource(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-[#0078D7] to-[#00B2A9] hover:shadow-lg hover:shadow-[#00B2A9]/20"
          >
            <span>Book A Consultation</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </div>
      </div>
      
      {/* CSS pour les animations et effets */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #0078D7, #00B2A9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .island-float {
          transform: translateY(0px);
          transition: transform 0.5s ease-out;
        }
        
        .island-card:hover .island-float {
          transform: translateY(-10px);
        }
        
        .compass-pulse {
          animation: pulse 3s infinite;
          box-shadow: 0 0 20px rgba(0, 178, 169, 0.4);
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 178, 169, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(0, 178, 169, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 178, 169, 0); }
        }
        
        /* Ocean Waves Animation */
        .wave-1, .wave-2 {
          position: absolute;
          left: 0;
          width: 200%;
          height: 100%;
          background-repeat: repeat-x;
          background-position: 0 bottom;
          transform-origin: center bottom;
        }
        
        .wave-1 {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%230078D7' fill-opacity='0.06'/%3E%3C/svg%3E");
          background-size: 50% 100px;
          animation: wave 15s linear infinite;
        }
        
        .wave-2 {
          top: 10px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%2300B2A9' fill-opacity='0.06'/%3E%3C/svg%3E");
          background-size: 50% 100px;
          animation: wave 10s linear reverse infinite;
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Grid layout adjustments for different screen sizes */
        @media (max-width: 1024px) {
          .islands-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .islands-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}