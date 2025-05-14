import PricingHero from "@/components/pricing/PricingHero";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Pricing Plans - IGoYourLead Lead Generation Services",
  description: "Choose from our range of lead generation packages for B2B, B2C, and industry-specific needs. Transparent pricing with no hidden fees.",
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