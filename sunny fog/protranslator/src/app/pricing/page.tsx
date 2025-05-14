import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Pricing Plans - ProTranslator",
  description: "Choose from our range of professional translation services for text documents and video subtitling. Transparent pricing with no hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <PricingTabs />
      <CtaSection />
    </>
  );
} 