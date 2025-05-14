import { Metadata } from 'next';
import { COMPANY } from '../constants/company';
import AboutHero from "@/components/about/AboutHero";
import AboutTeam from "@/components/about/AboutTeam";
import AboutMission from "@/components/about/AboutMission";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: 'Learn about our mission, vision, and values at SolidCraft - the leading landing page design service.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <CtaSection />
    </>
  );
} 