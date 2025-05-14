import AboutContent from "../../components/about/AboutContent";
import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission, vision, and values at Super-Organized",
};

export default function AboutPage() {
  return <AboutContent />;
} 