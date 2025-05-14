import { Metadata } from "next";
import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `Pricing Plans | ${COMPANY.serviceName}`,
  description: "Choose from our elite service packages for professional gaming boosting, power leveling, resource farming, and more. Transparent pricing with guaranteed results.",
};

export default function PricingPage() {
  return (
    <main className="bg-[#070b14] min-h-screen relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-toxic-green-900/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-pink-900/20 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10">
        <PricingHero />
        <PricingTabs />
        <CtaSection />
      </div>
    </main>
  );
} 