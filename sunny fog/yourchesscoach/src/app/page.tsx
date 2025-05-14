import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";
import FloatingChessPieces from "@/components/layout/FloatingChessPieces";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingChessPieces />
      </div>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <CtaSection />
    </div>
  );
}
