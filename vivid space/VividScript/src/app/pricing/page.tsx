import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";
import { COMPANY } from "@/app/constants/company";

export const metadata = {
  title: `Pricing Plans - ${COMPANY.serviceName} Script Writing Services`,
  description: "Choose from our range of professional script writing packages for various content formats. Transparent pricing with no hidden fees.",
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