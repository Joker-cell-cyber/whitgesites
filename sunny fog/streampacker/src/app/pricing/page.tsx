import PricingHero from "@/components/pricing/PricingHero";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import CtaSection from "@/components/home/CtaSection";
import { PricingSection } from "@/components/home/PricingSection";

export const metadata = {
  title: "Stream Overlay Packages - StreamPacker",
  description: "Choose from our range of professional stream overlay packages. From simple overlays to complete channel branding solutions with transparent pricing.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingSection />
      <ComparisonTable />
      <PricingFAQ />
      <CtaSection />
    </>
  );
} 