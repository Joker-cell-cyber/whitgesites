import Hero from "@/app/components/layout/hero";
import Features from "@/app/components/sections/features";
import Pricing from "@/app/components/sections/pricing";
import { FAQ } from "@/app/components/layout/faq";
import CTA from "@/app/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
} 