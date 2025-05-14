import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import UseCasesSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";
import CreationProcessSection from "@/components/home/CreationProcessSection";
import EducationalSection from "@/components/home/EducationalSection";
import BenefitsSection from "@/components/home/BenefitsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EducationalSection />
      <ServicesSection />
      <BenefitsSection />
      <CreationProcessSection />
      <UseCasesSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
