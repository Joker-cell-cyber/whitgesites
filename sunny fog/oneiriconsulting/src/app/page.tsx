import { Hero, WhatWeDo, OurProcess, OurSolutions, CTA } from '@/components/home';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <WhatWeDo />
      <OurProcess />
      <OurSolutions />
      <CTA />
    </div>
  );
}


