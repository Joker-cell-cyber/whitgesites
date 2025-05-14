import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | SolidCraft",
  description: "Get in touch with our team for any questions about our website building services or AI capabilities.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#fff8e9] text-[#3b332b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-[#3b332b] sm:text-5xl md:text-6xl mb-6 font-fraunces">
            <span className="block">Let&apos;s Create</span>
            <span className="block text-[#c35a38]">Something Amazing Together</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-[#3b332b]/70">
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