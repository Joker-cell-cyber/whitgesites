import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | CallScriptX",
  description: "Have questions about our sales script services? Contact our expert team for personalized assistance and get the perfect scripts for your sales team.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cs-blue-50 rounded-bl-[100px] opacity-50"></div>
          <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-cs-blue-100 mix-blend-multiply filter blur-[120px] opacity-60 animate-slow-float"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-cs-navy-100 mix-blend-multiply filter blur-[100px] opacity-50 animate-slow-float-delay"></div>
          
          {/* Animated dot pattern */}
          <div className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: 'radial-gradient(circle, #3a6fff 1px, transparent 1px)', 
              backgroundSize: '30px 30px'
            }}>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-cs-blue-50 text-cs-navy-700 border border-cs-blue-200 mb-4 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cs-blue-500 mr-2"></span>
              Get In Touch
            </div>
            
            <h1 className="text-4xl font-bold text-cs-navy-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Let&apos;s Create</span>
              <span className="block gradient-text">Powerful Sales Scripts Together</span>
            </h1>
            <p className="max-w-xl mx-auto text-xl text-cs-navy-700">
              Whether you need a basic cold calling script or a comprehensive sales system, our expert copywriters are ready to boost your conversion rates. Reach out today.
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