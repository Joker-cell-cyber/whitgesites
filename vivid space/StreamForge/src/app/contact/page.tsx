import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | StreamForge",
  description: "Have questions about our streaming overlay services? Get in touch with our expert team for personalized assistance and project consultations.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#121212] text-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">Level Up</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9D1D20] to-[#FF5757]">Your Stream Today</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-400">
            Whether you need a simple overlay or a complete stream rebrand, our team is ready to bring your vision to life. Reach out today for a personalized consultation.
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