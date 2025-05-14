import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CtaSection from "@/components/home/CtaSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iGotYourLead | Premium B2B & B2C Lead Generation Services",
  description: "Get high-quality, verified leads for your business with our premium lead generation services for B2B and B2C companies across all industries.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <FAQSection />
      <CtaSection />
    </>
  );
}
