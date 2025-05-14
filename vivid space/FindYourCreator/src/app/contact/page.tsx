import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | FindYourCreator",
  description: "Get in touch with our team for questions about our UGC creator sourcing services.",
};

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">Connect with</span>
            <span className="block text-pink-400">UGC Creators Today</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-indigo-500 mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-xl text-indigo-200">
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