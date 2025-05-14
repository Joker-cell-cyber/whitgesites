import { SITE_NAME, SITE_DESCRIPTION } from '@/app/lib/constants';
import Hero from '@/app/components/layout/hero';
import Features from '@/app/components/layout/features';
import Pricing from '@/app/components/layout/pricing';
import Stats from '@/app/components/layout/stats';
import FAQ from '@/app/components/layout/faq';
import CTA from '@/app/components/layout/cta';

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Features />
      <Stats />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
} 