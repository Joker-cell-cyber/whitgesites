import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | SuperOrganized",
  description: "Have questions about our Notion workspace setup services? Get in touch with our expert team for personalized assistance and setup consultations.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl mb-6">
            <span className="block">Let&apos;s Create</span>
            <span className="block hand-drawn-accent">Something Amazing Together</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-600">
            Whether you need a simple Notion workspace or a complete business system, our team is ready to bring your vision to life. Reach out today for a personalized consultation.
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