import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: `Questions about our e-book writing services? Contact our expert team at ${COMPANY.serviceName} for personalized assistance and project consultations.`,
};

export default function ContactPage() {
  return (
    <main className="bg-book-blue-50 text-book-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-book-blue-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Let&apos;s Create</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-book-blue-600 to-book-green-500">Your Quality E-Book</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-book-blue-700">
            Whether you need a short guide or a complete book, our team is ready to bring your vision to life. Contact us today for a personalized consultation.
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