import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | AceStrategy",
  description: "Have questions about our poker coaching services? Get in touch with our expert team for personalized assistance and coaching consultations.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Felt texture overlay */}
      <div className="absolute inset-0 z-0 felt-texture opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 font-playfair">
            <span className="block">Ready to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-poker-red-700 to-chip-gold-500">Elevate Your Poker Game?</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-300 font-raleway">
            Whether you&apos;re looking to fine-tune your strategy or completely transform your game, our team of poker experts is ready to help you achieve consistent profit.
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