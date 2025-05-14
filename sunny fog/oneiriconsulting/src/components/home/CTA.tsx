"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setMousePosition({ x, y });
  };

  const getTransform = (factor: number) => {
    return `translate(${mousePosition.x * factor}px, ${mousePosition.y * factor}px)`;
  };

  return (
    <section 
      className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>
      
      {/* Animated background elements */}
      <div 
        className="absolute top-10 left-10 w-64 h-64 rounded-full mix-blend-overlay opacity-20 bg-pink-500"
        style={{ transform: getTransform(-15) }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full mix-blend-overlay opacity-20 bg-blue-500"
        style={{ transform: getTransform(-10) }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-3xl md:text-5xl font-bold text-white mb-8 leading-tight transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transform: `${isVisible ? getTransform(5) : 'translateY(10px)'}` }}
          >
            Looking for an Exceptional<br />Business Consultant?
          </h2>
        
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-600 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link 
              href="/pricing" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-purple-600 text-lg font-medium hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-700/20 transform-gpu"
            >
              View Our Services
            </Link>
            <Link 
              href="/checkout?plan=Professional Plan&price=29.9" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-purple-800/40 text-white text-lg font-medium hover:bg-purple-800/60 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-900/20 transform-gpu border border-white/20 backdrop-blur-sm"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 