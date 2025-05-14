'use client';

import React from 'react';
import Hero from '@/app/components/layout/hero';
import Features from '@/app/components/layout/features';
import Pricing from '@/app/components/layout/pricing';
import CTA from '@/app/components/layout/cta';
import FreeTrialBanner from '@/app/components/layout/free-trial-banner';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Features />
        <FreeTrialBanner />
        <Pricing />
        <CTA />
      </main>
    </div>
  );
} 