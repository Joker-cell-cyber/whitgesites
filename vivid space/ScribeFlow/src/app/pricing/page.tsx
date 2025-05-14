import PricingHero from "@/components/pricing/PricingHero";
import PricingTabs from "@/components/pricing/PricingTabs";
import CtaSection from "@/components/home/CtaSection";
import { COMPANY } from "../constants/company";

export const metadata = {
  title: `Pricing - ${COMPANY.serviceName} E-Book Writing Services`,
  description: "Choose from our range of professional e-book writing packages. Transparent pricing with no hidden fees.",
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