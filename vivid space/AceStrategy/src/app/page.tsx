import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PricingTabs from "@/components/pricing/PricingTabs";
import FAQSection from "@/components/home/FAQSection";
import CtaSection from "@/components/home/CtaSection";
import CoachesSection from "@/components/home/CoachesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CoachesSection />
      <PricingTabs />
      <FAQSection />
      <CtaSection />
    </>
  );
}
