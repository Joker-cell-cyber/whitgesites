import Hero from "@/app/components/layout/hero";
import Features from "@/app/components/layout/features";
import Stats from "@/app/components/layout/stats";
import Pricing from "@/app/components/layout/pricing";
import FAQ from "@/app/components/layout/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Pricing />
      <FAQ />
    </>
  );
} 