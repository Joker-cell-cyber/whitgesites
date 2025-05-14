import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { COMPANY } from "@/app/constants/company";

export const metadata = {
  title: `Contact Us - ${COMPANY.serviceName}`,
  description: "Get in touch with our team to discuss your data extraction and visualization needs. We're here to help bring your data to life.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 mb-8">
              <div className="bg-slate-900 rounded-xl p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              Get In Touch
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Have questions about our services or ready to start your data project? 
              Our team is here to help bring your data to life with clarity and insight.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <div className="bg-slate-800 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left side: Form */}
                  <div className="p-8 lg:p-12">
                    <ContactForm />
                  </div>
                  
                  {/* Right side: Contact Info with decorative background */}
                  <div className="relative bg-gradient-to-br from-indigo-900 to-slate-900 p-8 lg:p-12 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                      <svg className="absolute top-0 right-0 w-full h-full text-indigo-600 opacity-10" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="circuit-board" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path fill="none" stroke="currentColor" strokeWidth="1" d="M20 20h60v60H20z"/>
                            <path fill="none" stroke="currentColor" strokeWidth="1" d="M50 10V0m0 100V90M10 50H0m100 0H90"/>
                            <circle cx="50" cy="50" r="5" fill="currentColor"/>
                            <circle cx="20" cy="20" r="2" fill="currentColor"/>
                            <circle cx="20" cy="80" r="2" fill="currentColor"/>
                            <circle cx="80" cy="20" r="2" fill="currentColor"/>
                            <circle cx="80" cy="80" r="2" fill="currentColor"/>
                          </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-board)"/>
                      </svg>
                      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-purple-700 opacity-10 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <ContactInfo />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 opacity-50"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-0 w-full h-[500px] opacity-20">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="b" gradientTransform="rotate(45 .5 .5)">
                  <stop offset="0%" stopColor="#4F46E5"/>
                  <stop offset="100%" stopColor="#9333EA"/>
                </linearGradient>
              </defs>
              <path fill="url(#b)" d="M-363.852 502.589c0 236.526 191.571 428.097 428.097 428.097s428.097-191.571 428.097-428.097S300.77 74.492 64.245 74.492-363.852 266.063-363.852 502.589z" opacity="0.3">
                <animate attributeName="d" dur="20s" repeatCount="indefinite" values="M-363.852 502.589c0 236.526 191.571 428.097 428.097 428.097s428.097-191.571 428.097-428.097S300.77 74.492 64.245 74.492-363.852 266.063-363.852 502.589z;M-363.852 402.589c0 336.526 291.571 528.097 528.097 528.097s328.097-191.571 328.097-428.097S364.77 74.492 164.245 74.492-363.852 66.063-363.852 402.589z;M-463.852 402.589c0 336.526 291.571 528.097 528.097 528.097s328.097-191.571 328.097-428.097S364.77 74.492 164.245 74.492-463.852 66.063-463.852 402.589z;M-363.852 502.589c0 236.526 191.571 428.097 428.097 428.097s428.097-191.571 428.097-428.097S300.77 74.492 64.245 74.492-363.852 266.063-363.852 502.589z" />
              </path>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
              Choose a package or request a custom solution tailored to your specific data visualization needs.
            </p>
            <a
              href="/packages"
              className="inline-flex items-center px-8 py-4 text-lg rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105"
            >
              View Packages
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 