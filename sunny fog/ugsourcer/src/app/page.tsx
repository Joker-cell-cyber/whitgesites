import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ProcessDetailsSection from "@/components/home/ProcessDetailsSection";
import PricingSection from "@/components/home/PricingSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <ProcessDetailsSection />
      <PricingSection />
      <BenefitsSection />
      <CtaSection />
    </>
  );
}
