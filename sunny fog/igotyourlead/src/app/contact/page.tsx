import { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | iGotYourLead",
  description: "Get in touch with our lead generation experts to discuss your business needs and how we can help you generate high-quality leads.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#111827] text-[#f2f2f2]">
      <ContactHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
} 