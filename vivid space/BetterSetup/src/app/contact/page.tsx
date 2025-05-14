import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: "Get in touch with our team for questions about our Notion workspace setup services or custom inquiries. We're here to help!",
};

export default function ContactPage() {
  return (
    <main className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Let&apos;s Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Something Amazing</span> Together
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
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