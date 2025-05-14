import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Pricing Plans - Vivid Splice Video Editing Services",
  description: "Choose from our range of professional video editing packages for short-form, long-form, and advertising content. Transparent pricing with no hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTabs />
      <PricingFAQ />
      <CtaSection />
    </>
  );
} 