import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: "Have questions about our boosting services? Get in touch with our expert team for personalized assistance and boost consultations.",
};

export default function ContactPage() {
  return (
    <main className="pt-24 bg-[#080f0d] text-[#f9f9f9] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rank-emerald-600/5 rounded-full filter blur-[150px] animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rank-orange-600/5 rounded-full filter blur-[120px] animate-pulse-subtle"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 font-poppins">
            <span className="block">Ready to</span>
            <span className="block gradient-text">Reach New Heights?</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-300">
            Whether you need a quick rank boost or a full journey to the top tiers, our team of elite players is ready to help you dominate. Reach out today for personalized boosting options.
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