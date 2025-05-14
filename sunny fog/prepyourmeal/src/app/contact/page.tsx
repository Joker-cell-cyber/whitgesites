import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us | PrepYourMeal",
  description: "Have questions about our meal planning services? Get in touch with our nutrition team for assistance with your meal plan purchases.",
};

export default function ContactPage() {
  return (
    <main className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Get in Touch</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-nutrition-green-500 to-carrot-500">For Any Questions</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-600">
            Whether you need help choosing the right meal plan or have questions about your purchase, our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      
      <ContactFAQ />
    </main>
  );
} 