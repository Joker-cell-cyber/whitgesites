import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Book Your Music Coaching | GetMoreSkills",
  description: "Schedule personalized beatmaking and mixing coaching sessions with our expert producers. We'll help you develop your skills and create your own unique sound.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0f0f15] text-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">Ready to Transform</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500">Your Music Production Skills?</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-400">
            From beat-making fundamentals to advanced mixing techniques, our personalized coaching will help you develop your unique sound and reach your musical goals.
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