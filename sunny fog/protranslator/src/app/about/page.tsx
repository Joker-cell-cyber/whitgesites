import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import Values from "@/components/about/Values";
import Expertise from "@/components/about/Expertise";

export const metadata: Metadata = {
  title: "About Us | ProTranslator",
  description: "Learn about ProTranslator's mission, values, and our commitment to providing exceptional translation services worldwide.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c1524] to-[#0f172a]">
      <AboutHero />
      <Mission />
      <Values />
      <Expertise />
    </main>
  );
} 