import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Meal Plan Pricing - Nutrition Services",
  description: "Choose from our range of nutritionist-designed meal plans to fit your lifestyle, dietary needs, and budget. One-time payment with no hidden fees.",
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