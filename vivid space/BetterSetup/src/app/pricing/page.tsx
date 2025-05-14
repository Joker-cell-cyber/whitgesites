import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Pricing Plans - bettersetup Notion Setup Services",
  description: "Choose the perfect Notion setup package for your needs. Our transparent pricing options make it easy to find the right solution for individuals, teams, and businesses.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTabs />
      <CtaSection />
    </>
  );
} 