import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | Vivid Splice",
  description: "Have questions about our video editing services? Get in touch with our expert team for personalized assistance and project consultations.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#1A1A22] text-[#F7F8FC]">
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-turquoise-600/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
              <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 font-display">
              <span className="block">Let&apos;s Create</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-turquoise-500">Something Amazing Together</span>
            </h1>
            <p className="max-w-xl mx-auto text-xl text-gray-300">
              Whether you need a quick edit or a complete production overhaul, our team is ready to bring your vision to life. Reach out today for a personalized consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </main>
  );
} 