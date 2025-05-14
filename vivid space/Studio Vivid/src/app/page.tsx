"use client";

import React, { Suspense } from "react";
import dynamic from 'next/dynamic';

// Dynamic component loading to improve performance
const ParallaxHero = dynamic(() => import('./components/home/ParallaxHero'), { ssr: true });
const ServicesSection = dynamic(() => import('./components/home/ServicesSection'), { ssr: true });
const ProcessSection = dynamic(() => import('./components/home/ProcessSection'), { ssr: true });
const WhyChooseUsSection = dynamic(() => import('./components/home/WhyChooseUsSection'), { ssr: true });
const AnimationStyles = dynamic(() => import('./components/home/AnimationStyles'), { ssr: true });

export default function Home() {
  return (
    <div className="overflow-hidden">
      <AnimationStyles />
      
      {/* Hero Section with Parallax - wow effect */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-400"></div>
      </div>}>
        <ParallaxHero />
      </Suspense>
      
      {/* Services */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-900"></div>}>
        <ServicesSection />
      </Suspense>
      
      {/* Our process */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50 dark:bg-gray-800"></div>}>
        <ProcessSection />
      </Suspense>
      
      {/* Why choose us */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50 dark:bg-gray-800"></div>}>
        <WhyChooseUsSection />
      </Suspense>
     
    </div>
  );
}
