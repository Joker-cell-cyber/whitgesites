import BoostPricingHero from "@/components/pricing/BoostPricingHero";
import BoostPricingPackages from "@/components/pricing/BoostPricingPackages";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Boost Packages & Pricing - BoostThatELO",
  description: "Find the perfect boosting package for your favorite competitive game. Choose from multiple games including League of Legends, Valorant, Overwatch 2, and more. Transparent pricing with no hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <BoostPricingHero />
      <BoostPricingPackages />
      <CtaSection />
    </>
  );
} 