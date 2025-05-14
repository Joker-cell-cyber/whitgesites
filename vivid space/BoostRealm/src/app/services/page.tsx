import { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesTestimonials from "@/components/services/ServicesTestimonials";
import CtaSection from "@/components/home/CtaSection";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `Nos Services de Farming | ${COMPANY.serviceName}`,
  description: "Découvrez nos services premium de farming et de leveling pour World of Warcraft, Diablo 4, Final Fantasy XIV et plus encore. Services professionnels et sécurisés.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#070a12] min-h-screen">
      <ServicesHero />
      <ServicesList />
      <ServicesTestimonials />
      <CtaSection />
    </main>
  );
} 