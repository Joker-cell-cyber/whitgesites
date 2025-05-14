import { Metadata } from "next";
import PricingTabs from "@/components/pricing/PricingTabs";
import PricingHero from "@/components/pricing/PricingHero";
import { COMPANY } from "@/app/constants/company";

export const metadata: Metadata = {
  title: `Professional Sales Script Pricing - ${COMPANY.serviceName}`,
  description: "Clear and transparent pricing for our professional sales script packages. Choose from cold calling scripts, closing scripts, and follow-up sequences to boost your conversion rates.",
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingHero />
      <PricingTabs />
    </div>
  );
} 