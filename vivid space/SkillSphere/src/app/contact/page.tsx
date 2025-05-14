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
    <main className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full opacity-10 grid-pattern"></div>
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#27DECB]/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-[#9A4FFF]/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-20">
          <div className="w-16 h-1 bg-gradient-to-r from-[#27DECB] to-[#9A4FFF] mx-auto mb-6"></div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 font-['Montserrat']">
            <span className="block">Level Up Your</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#27DECB] to-[#9A4FFF]">Gaming Skills</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-300 font-['Space_Grotesk']">
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