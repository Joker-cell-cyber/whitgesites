import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: "Have questions about our script writing services? Get in touch with our expert team for personalized assistance and project consultations.",
};

export default function ContactPage() {
  return (
    <main className="bg-vid-white-100 text-vid-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-font">
            Let&apos;s Create <br />
            <span className="block gradient-text">Something Amazing Together</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-vid-blue-700">
            Whether you need a quick edit or a complete production overhaul, our team is ready to bring your vision to life. Reach out today for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
} 