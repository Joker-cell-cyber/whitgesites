import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import { PricingSection } from "@/components/home/PricingSection";
import FeaturedStreamers from "@/components/home/FeaturedStreamers";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedStreamers />
      <PortfolioSection />
      <PricingSection />
    </>
  );
}
