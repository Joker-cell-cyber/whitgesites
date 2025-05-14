"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Resource {
  id: number;
  title: string;
  description: string;
  icon: string;
  illustration: string;
  islandType: string;
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Career Services Data
  const resources: Resource[] = [
    {
      id: 1,
      title: "Basic CV Service",
      description: "Online CV review with formatting help and basic suggestions delivered via email",
      icon: "📄",
      illustration: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      islandType: "Resume/CV"
    },
    {
      id: 2,
      title: "Standard CV Service",
      description: "ATS-optimized resume rewrite with keyword optimization via online consultation",
      icon: "📝",
      illustration: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      islandType: "Resume/CV"
    },
    {
      id: 3,
      title: "Interview Coaching",
      description: "Online mock interviews and personalized feedback sessions via video call",
      icon: "🎯",
      illustration: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      islandType: "Interview"
    },
    {
      id: 4,
      title: "Application Strategy",
      description: "Digital guidance for optimizing job applications with document review",
      icon: "📋",
      illustration: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      islandType: "Application"
    },
    {
      id: 5,
      title: "Premium CV Package",
      description: "Complete CV & LinkedIn profile optimization with revision rounds via online service",
      icon: "💼",
      illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      islandType: "Resume/CV"
    },
    {
      id: 6,
      title: "Cover Letter Writing",
      description: "Custom cover letter creation that complements your resume, delivered digitally",
      icon: "✉️",
      illustration: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      islandType: "Application"
    }
  ];

  const filteredResources = activeFilter === "All" 
    ? resources 
    : resources.filter(resource => resource.islandType === activeFilter);

  return (
    <section className="py-20 bg-black" id="portfolio">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Online Career Services
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400">
            Explore our digital career preparation services delivered via chat and video
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "All" 
                ? "bg-blue-500 text-white" 
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            }`}
            onClick={() => setActiveFilter("All")}
          >
            All Services
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "Resume/CV" 
                ? "bg-blue-500 text-white" 
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            }`}
            onClick={() => setActiveFilter("Resume/CV")}
          >
            Resume Services
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "Interview" 
                ? "bg-blue-500 text-white" 
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            }`}
            onClick={() => setActiveFilter("Interview")}
          >
            Interview Prep
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "Application" 
                ? "bg-blue-500 text-white" 
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            }`}
            onClick={() => setActiveFilter("Application")}
          >
            Application Help
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="h-48 relative">
                  <Image
                    src={resource.illustration}
                    alt={resource.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {resource.islandType}
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xl">
                    {resource.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {resource.description}
                  </p>
                
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}