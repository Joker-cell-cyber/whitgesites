"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section 
      className="relative py-24 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background pattern with split design */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-teal-500/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-40 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
      
      {/* Floating element */}
      <div className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-teal-600/20 to-emerald-600/20 blur-3xl"></div>
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-teal-600/20 to-emerald-600/20 blur-3xl"></div>
      
      {/* Content container */}
      <div className="container relative z-10 px-4 mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          {/* Main heading with animated underline */}
          <div className="mb-8 relative inline-block">
            <h2 
              className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none md:leading-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Looking for an Exceptional<br />Business Consultant?
            </h2>
            
            {/* Animated underline */}
            <div 
              className={`h-1 bg-gradient-to-r from-teal-500 to-emerald-500 absolute -bottom-3 transition-all duration-1000 ease-out ${
                isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            ></div>
          </div>
          
          {/* CTA buttons in a card-like container */}
          <div 
            className={`mt-12 w-full max-w-2xl transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="relative p-0.5 rounded-2xl overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 shadow-xl">
              {/* Animated highlight */}
              <div className="absolute -top-1/2 left-1/2 w-24 h-48 bg-white/10 blur-xl rounded-full transform -translate-x-1/2 animate-spotlight"></div>
              
              {/* Content background */}
              <div className="relative bg-gray-900 rounded-2xl p-8 md:py-10 md:px-12">
                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
                  <Link 
                    href="/pricing" 
                    className="text-center text-teal-900 font-bold px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-1 flex-1"
                  >
                    View Our Services
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="text-center text-white font-bold px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-teal-500/30 shadow-lg shadow-teal-500/5 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 flex-1"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 right-10 w-20 h-20 border-4 border-teal-500/20 rounded-full"></div>
          <div className="absolute bottom-1/4 left-10 w-12 h-12 border-4 border-emerald-500/20 rounded-lg rotate-45"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spotlight {
          0%, 100% {
            opacity: 0.2;
            transform: translateX(-150%) rotate(20deg);
          }
          50% {
            opacity: 0.5;
            transform: translateX(150%) rotate(20deg);
          }
        }
        
        .animate-spotlight {
          animation: spotlight 6s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default CTA; 