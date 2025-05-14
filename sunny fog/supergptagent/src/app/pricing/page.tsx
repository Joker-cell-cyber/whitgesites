import PricingHero from "@/components/pricing/PricingHero";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "AI Agent Packages | SuperGPTAgent",
  description: "Choose from our range of AI agent packages: Basic, Enhanced, and Enterprise solutions. One-time service to build the AI agent system that fits your needs.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingSection />
      <CtaSection />
    </>
  );
} 