import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: "Get in touch with our team for any questions about our gaming coaching services or to book a custom coaching session.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#121212] text-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">Level Up Your</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#44D62C] to-[#00FFFF]">Gaming Skills</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-400">
            Have questions about our coaching services? Need custom sessions tailored to your gaming needs? Reach out to our team today.
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