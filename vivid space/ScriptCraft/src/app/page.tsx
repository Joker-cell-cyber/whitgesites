import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CtaSection from "@/components/home/CtaSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <PricingSection />
      <FAQSection />
      <CtaSection />
    </>
  );
}
