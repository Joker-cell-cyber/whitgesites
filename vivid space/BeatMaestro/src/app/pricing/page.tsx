import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "Coaching Packages - BeatMaestro Beatmaking & Mixing",
  description: "Choose from our range of beatmaking and mixing coaching packages designed to elevate your production skills. Transparent pricing with personalized sessions.",
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