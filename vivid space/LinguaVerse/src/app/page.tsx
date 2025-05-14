/**
 * Home page for ProTranslator - Professional Online Translation Services
 * This page showcases our translation services, including text translation
 * and video subtitling, with a modern professional design focused on
 * language and translation services.
 */

import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CtaSection />
    </>
  );
}
