import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Pricing Plans - PrepFast Career Services",
  description: "Explore our range of online career preparation services including resume optimization, interview coaching and application guidance.",
};

export default function PricingPage() {
  return (
    <>
      <PricingSection />
      <CtaSection />
    </>
  );
} 