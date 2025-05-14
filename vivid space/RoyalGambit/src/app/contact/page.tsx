import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: `Have questions about our chess coaching services? Get in touch with our team for personalized assistance and training information.`,
};

export default function ContactPage() {
  return (
    <main className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">Ready to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-chess-blue-600 to-chess-gold-500">Improve Your Game?</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-300">
            Whether you&apos;re a beginner looking to learn the basics or an advanced player aiming to refine your strategy, we&apos;re here to help you reach your chess goals.
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