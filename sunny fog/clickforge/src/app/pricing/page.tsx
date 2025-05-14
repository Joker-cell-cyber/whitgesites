import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Pricing Plans - ClickForge Website Builder",
  description: "Choose from our range of website building packages. Transparent pricing with no hidden fees.",
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