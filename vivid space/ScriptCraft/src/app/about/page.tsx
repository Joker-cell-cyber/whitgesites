import { Metadata } from "next";
import { COMPANY } from "@/app/constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission and vision to provide professional sales script services that increase conversion rates and boost sales performance.",
};

export default function AboutPage() {
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
              About Us
            </div>
            
            <h1 className="text-4xl font-bold text-cs-navy-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Our Mission to</span>
              <span className="block gradient-text">Transform Your Sales Process</span>
            </h1>
            <p className="max-w-xl mx-auto text-xl text-cs-navy-700">
              Empowering sales teams with professionally crafted scripts that convert more prospects into customers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-cs-navy-900 mb-4">Our Vision</h2>
                  <p className="text-cs-navy-700 mb-6">
                    At {COMPANY.serviceName}, we envision a world where every sales conversation leads to meaningful connections and successful outcomes. We believe that with the right words and approach, sales professionals can achieve remarkable results.
                  </p>
                  <p className="text-cs-navy-700">
                    We're committed to providing sales teams with scripts that not only sound natural and engaging but are strategically designed to address customer pain points and highlight solutions effectively.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cs-blue-600 to-cs-navy-700 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                  <p className="text-cs-blue-100 mb-6">
                    Our mission is to empower businesses with exceptional sales scripts that boost conversion rates and transform the way they connect with customers.
                  </p>
                  <p className="text-cs-blue-100">
                    Through our expert crafted scripts, we aim to eliminate the uncertainty and anxiety often associated with sales calls, replacing them with confidence and consistency.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-cs-navy-900 text-center mb-8">Our Core Values</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-cs-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cs-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900 mb-2">Integrity</h3>
                  <p className="text-cs-navy-700">
                    We believe in creating scripts that are honest, ethical, and focused on delivering real value to both sales teams and their customers.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-cs-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cs-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900 mb-2">Innovation</h3>
                  <p className="text-cs-navy-700">
                    We continuously research and implement cutting-edge sales techniques to ensure our scripts reflect the latest industry best practices.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-cs-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cs-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900 mb-2">Customer Focus</h3>
                  <p className="text-cs-navy-700">
                    Every script we create is tailored to the specific needs of the business, their target audience, and their unique value proposition.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-cs-navy-900 mb-6">Our Commitment</h2>
              <p className="text-lg text-cs-navy-700 mb-10">
                As a new company, we're dedicated to establishing ourselves as the premier provider of sales script solutions. We understand the challenges businesses face in today's competitive market, and we're here to provide the tools needed for success.
              </p>
              <div className="inline-block">
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-white border border-gray-200 text-cs-navy-900 rounded-xl font-semibold button-glow transition-transform hover:-translate-y-1"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 