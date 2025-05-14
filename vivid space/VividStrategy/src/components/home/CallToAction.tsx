"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export const CallToAction = () => {
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
    <section className="py-20 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900 opacity-90"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              We guide your organization towards operational excellence and sustainable growth. Our team of experts is ready to develop tailored solutions for your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">+35%</div>
              <p className="text-indigo-100">Average Productivity Increase</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <p className="text-indigo-100">Client Satisfaction Rate</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/pricing" 
              className="px-8 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium transition-colors duration-300 text-center flex-1 sm:flex-none min-w-[200px]"
            >
              Our Services
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-transparent hover:bg-white/10 border-2 border-white text-white rounded-lg font-medium transition-colors duration-300 text-center flex-1 sm:flex-none min-w-[200px]"
            >
              Schedule a Meeting
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 