import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata = {
  title: "Contact Us - ScrapThatData",
  description: "Get in touch with our team to discuss your web scraping and data extraction needs. We're here to help you get the data you need.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-800 mb-8">
              Have questions about our services or ready to start your data extraction project? 
              Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Choose a package or request a custom solution tailored to your specific data extraction needs.
          </p>
          <a
            href="/packages"
            className="btn px-8 py-4 text-lg bg-white text-primary hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            View Packages
          </a>
        </div>
      </section>
      
      {/* Spacer */}
      <div className="bg-white py-8"></div>
    </div>
  );
} 