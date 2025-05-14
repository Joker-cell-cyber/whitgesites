import { Metadata } from "next";
import { COMPANY } from "../constants/company";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import AboutProcess from "@/components/about/AboutProcess";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission to make nutrition simple, delicious, and accessible to everyone through our meal planning service.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutProcess />
    </main>
  );
} 