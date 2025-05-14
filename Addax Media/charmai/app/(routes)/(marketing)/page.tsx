'use client';

import React from 'react';
import Hero from '@/app/components/layout/hero';
import Features from '@/app/components/layout/features';
import Pricing from '@/app/components/layout/pricing';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
      </main>
    </div>
  );
} 