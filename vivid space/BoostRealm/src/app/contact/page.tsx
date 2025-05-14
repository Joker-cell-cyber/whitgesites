import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.serviceName}`,
  description: `Connect with ${COMPANY.serviceName}'s elite team for professional MMO, MMORPG, and competitive game services. We offer power leveling, resource farming, raid carries and more with guaranteed results.`,
};

export default function Contact() {
  return (
    <main className="bg-[#020308] min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#0ff] rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#f0f] rounded-full filter blur-[100px]"></div>
        </div>
      </div>
      
      {/* Hexagon grid pattern */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="container mx-auto py-20 px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 mb-4 bg-[#120823] border border-[#f0f]/20 rounded-md text-[#f0f] text-xs uppercase tracking-widest font-bold">
            Connect With Elite Boosters
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white">
            <span className="text-[#0ff]">PLAYER</span> SUPPORT <span className="text-[#f0f]">{COMPANY.serviceName.toUpperCase()}</span>
          </h1>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#0ff] to-[#f0f] rounded mb-8"></div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Our elite team is ready to power level your gaming experience. Reach out through our secure channels for quick, professional boosting services.
          </p>
          
          <div className="flex justify-center items-center space-x-8 mb-10">
            <div className="flex flex-col items-center">
              <div className="mb-2 w-12 h-12 bg-[#120823] rounded-full flex items-center justify-center border border-[#0ff]/20">
                <svg className="w-6 h-6 text-[#0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm">Secure Orders</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-2 w-12 h-12 bg-[#120823] rounded-full flex items-center justify-center border border-[#f0f]/20">
                <svg className="w-6 h-6 text-[#f0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm">24/7 Support</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-2 w-12 h-12 bg-[#120823] rounded-full flex items-center justify-center border border-[#0ff]/20">
                <svg className="w-6 h-6 text-[#0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm">Guaranteed Results</span>
            </div>
          </div>
        </div>
        
        {/* Two-column layout for contact form and info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form (wider column) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-[#080c17]/80 backdrop-blur-sm rounded-xl border border-[#1a1c36] overflow-hidden relative p-1">
              <div className="absolute top-0 left-0 w-0 h-0" style={{ borderLeft: '80px solid transparent', borderBottom: '80px solid rgba(0, 255, 255, 0.05)' }}></div>
              <div className="absolute top-0 right-0 w-0 h-0" style={{ borderRight: '80px solid transparent', borderBottom: '80px solid rgba(240, 0, 255, 0.05)' }}></div>
              
              <div className="absolute top-0 left-0 px-3 py-1 bg-[#080c17] text-[#0ff] text-xs m-2 border-b border-r border-[#0ff]/20 rounded-br">
                NEW_MISSION.REQ
              </div>
              
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#080c17] text-[#f0f] text-xs m-2 border-b border-l border-[#f0f]/20 rounded-bl">
                <span className="inline-block w-2 h-2 bg-[#f0f] rounded-full animate-pulse mr-1"></span>
                ONLINE
              </div>
              
              <ContactForm />
            </div>
          </div>
          
          {/* Contact info (narrower column) */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col">
            <div className="bg-[#080c17]/80 backdrop-blur-sm rounded-xl border border-[#1a1c36] p-6 mb-6 relative">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block w-1.5 h-6 bg-[#0ff] mr-3"></span>
                DIRECT CHANNELS
              </h2>
              
              <ContactInfo />
            </div>
            
            <div className="bg-[#080c17]/80 backdrop-blur-sm rounded-xl border border-[#1a1c36] p-6 flex-grow">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block w-1.5 h-6 bg-[#f0f] mr-3"></span>
                BOOST PROCESS
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-[#120823] flex items-center justify-center text-[#0ff] mr-4 border border-[#0ff]/20">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Order Placement</h3>
                    <p className="text-gray-400 text-sm">Fill out our secure form with your boost requirements and preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-[#120823] flex items-center justify-center text-[#f0f] mr-4 border border-[#f0f]/20">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Booster Assignment</h3>
                    <p className="text-gray-400 text-sm">We'll match you with an expert specialized in your game and requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-[#120823] flex items-center justify-center text-[#0ff] mr-4 border border-[#0ff]/20">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Progress Tracking</h3>
                    <p className="text-gray-400 text-sm">Monitor real-time progress through our secure dashboard</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-[#120823] flex items-center justify-center text-[#f0f] mr-4 border border-[#f0f]/20">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Mission Complete</h3>
                    <p className="text-gray-400 text-sm">Receive your boosted account with all objectives accomplished</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 