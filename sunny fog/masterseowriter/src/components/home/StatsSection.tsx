"use client";

import { useEffect, useState, useRef } from "react";

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Proven <span className="text-turquoise-600">Results</span> That Speak for Themselves
          </h2>
          <p className="text-xl text-gray-600">
            Our content consistently delivers measurable impacts for businesses across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StatCard 
            value="87" 
            symbol="%" 
            label="Increase in organic traffic" 
            description="Average improvement for our clients within 6 months"
          />
          <StatCard 
            value="65" 
            symbol="%" 
            label="Higher conversion rates"
            description="When using our optimized content strategies"
          />
          <StatCard 
            value="93" 
            symbol="%" 
            label="Client satisfaction"
            description="Our clients are happy with the results we deliver"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, symbol, label, description }: { 
  value: string;
  symbol: string;
  label: string;
  description: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");

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

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const end = parseInt(value);
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const current = Math.floor(progress * end);
        
        setDisplayValue(current.toString());
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, value]);

  return (
    <div 
      ref={statRef}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center transform transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="mb-4">
        <span className="text-5xl font-bold text-gray-900">{displayValue}</span>
        <span className="text-3xl font-bold text-turquoise-600">{symbol}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{label}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}