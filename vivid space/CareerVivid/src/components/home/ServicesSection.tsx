"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  const services = [
    {
      title: "Resume/CV Mastery",
      description: "Create standout resumes that get you noticed by recruiters and pass through applicant tracking systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        "Professional resume writing and optimization",
        "ATS-friendly formatting",
        "Achievement-focused content",
        "Industry-specific keywords"
      ],
      color: "#8A2BE2"
    },
    {
      title: "Interview Preparation",
      description: "Build confidence and master the art of interviewing with personalized coaching from industry experts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        "Mock interviews with field experts",
        "Personalized feedback",
        "Confidence building techniques",
        "Question preparation"
      ],
      color: "#FF1493"
    },
    {
      title: "Application Coaching",
      description: "Develop winning applications for jobs, schools, and professional opportunities with strategic guidance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      features: [
        "School/job application strategy",
        "Personal statement refinement",
        "Portfolio development",
        "Follow-up guidance"
      ],
      color: "#00BFFF"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-full bg-gradient-to-b from-black via-[#070711] to-[#0a0a12]"></div>
        <div className="absolute w-full h-full opacity-25">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[70%] h-80 rounded-full bg-gradient-to-r from-[#8A2BE2]/20 via-[#FF1493]/20 to-[#00BFFF]/20 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-r from-[#8A2BE2] to-[#FF1493] h-1 w-20 mx-auto mb-8 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] to-[#FF1493]">Professional</span> Career Services
          </h2>
          <p className="text-gray-400 text-lg">
            We specialize in preparing you for career success with tailored services that help you stand out and achieve your professional goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative perspective-1000"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Card container with 3D effect */}
              <div 
                className={`relative transition-all duration-300 transform preserve-3d ${
                  hoveredService === index ? 'rotate-y-10 translate-y-[-10px]' : ''
                }`}
              >
                {/* Background glow effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[${service.color}] to-[#FF1493] opacity-0 transition-opacity duration-300 blur-xl ${
                    hoveredService === index ? 'opacity-30' : ''
                  }`}
                ></div>
                
                {/* Main card */}
                <div className="relative z-10 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl rounded-2xl p-8 h-full isolation">
                  {/* Corner detail */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div 
                      className="absolute top-0 right-0 w-[140%] h-[140%] bg-gradient-to-br from-transparent to-white/5 backdrop-blur-sm rotate-45 transform translate-x-1/2 -translate-y-1/2"
                    ></div>
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className="flex items-center justify-center w-16 h-16 rounded-xl mb-6 relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}, #FF1493)` 
                    }}
                  >
                    <div className="text-white">
                      {service.icon}
                    </div>
                    {/* Abstract shine effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 w-full h-full bg-white/20 transform rotate-45 translate-x-full ${
                          hoveredService === index ? 'animate-shine' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <div 
                          className="flex-shrink-0 w-5 h-5 rounded-full mr-2 mt-0.5 flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${service.color}, #FF1493)` }}
                        >
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover effect elements */}
                  <div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${
                      hoveredService === index ? 'opacity-100' : ''
                    }`}
                  ></div>
                  
                  {/* Hidden elements that appear on hover - removed "Learn more" links as requested */}
                  <div 
                    className={`absolute bottom-8 left-8 right-8 transition-all duration-300 transform ${
                      hoveredService === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-3"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            href="/pricing" 
            className="group inline-flex items-center relative overflow-hidden py-3 px-6 rounded-full bg-gradient-to-r from-[#8A2BE2]/10 to-[#FF1493]/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
          >
            <span className="relative z-10 text-white group-hover:text-white transition-colors">
              View our pricing packages
            </span>
            <span className="ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              <svg className="w-5 h-5 text-[#8A2BE2] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8A2BE2] to-[#FF1493] opacity-0 group-hover:opacity-80 transition-opacity rounded-full -z-0"></span>
          </Link>
        </motion.div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-10 {
          transform: rotateY(3deg);
        }
        @keyframes shine {
          0% {
            transform: rotate(45deg) translateX(-100%);
          }
          100% {
            transform: rotate(45deg) translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </section>
  );
} 