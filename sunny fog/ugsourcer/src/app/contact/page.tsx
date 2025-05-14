import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | UGSourcer",
  description: "Have questions about our UGC creator sourcing service? Get in touch with our expert team for personalized assistance and consultation.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-ug-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-ug-gray-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Connect with</span>
            <span className="block gradient-text">UGC Creators Today</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-ug-gray-600">
            Ready to enhance your brand with authentic user-generated content? Our team is here to find the perfect creators for your specific needs.
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