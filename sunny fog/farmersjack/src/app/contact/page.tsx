import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | FarmersJack",
  description: "Connect with FarmersJack's elite team for professional MMO, MMORPG, and competitive game services. We offer power leveling, resource farming, raid carries and more with guaranteed results.",
};

export default function Contact() {
  return (
    <main className="bg-[#070b14] min-h-screen relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-toxic-green-900/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-pink-900/20 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 bg-black/30 border border-toxic-green-500/30 rounded text-toxic-green-500 text-xs font-mono">
            ESTABLISH_COMMS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 glitch-text">
            TACTICAL <span className="text-toxic-green-500">COMMUNICATIONS</span>
          </h1>
          <div className="mx-auto max-w-2xl">
            <p className="text-gray-400 mb-8 leading-relaxed font-mono border-l-2 border-toxic-green-500/20 pl-4">
              Submit your mission parameters via our secure channel or connect directly with our 
              operations team. Our elite agents are standing by 24/7 to enhance your digital battlefield presence.
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 font-mono">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-toxic-green-500 rounded-full mr-2 animate-pulse"></span>
                OPERATORS ONLINE
              </div>
              <div className="h-4 border-l border-gray-700"></div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-neon-pink-500 rounded-full mr-2"></span>
                SECURE CHANNEL
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1 bg-gradient-to-br from-black/60 to-gray-900/20 rounded-xl shadow-xl border border-gray-800 p-1 pixel-corners relative">
            <div className="absolute top-0 left-0 px-2 py-1 bg-black/50 text-toxic-green-500 text-xs font-mono m-2 border border-toxic-green-500/30 rounded">
              COMMS_MODULE
            </div>
            <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 text-gray-500 text-xs font-mono m-2 border border-gray-800 rounded">
              v1.0.4
            </div>
            <ContactForm />
          </div>
          
          <div className="order-1 lg:order-2">
            <ContactInfo />
          </div>
        </div>
        
        <div className="mt-20 pt-12 border-t border-gray-800/50 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">RAPID DEPLOYMENT PROTOCOL</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/30 rounded-lg p-6 border border-gray-800 pixel-corners">
              <div className="w-12 h-12 bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/10 rounded-lg flex items-center justify-center mx-auto mb-4 border border-toxic-green-500/20">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-toxic-green-500 font-medium mb-2 font-mono">01. SUBMIT REQUEST</h4>
              <p className="text-gray-400 text-sm">
                Complete the mission parameters form with your game specs, objectives, and timeframe.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-gray-800 pixel-corners">
              <div className="w-12 h-12 bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/10 rounded-lg flex items-center justify-center mx-auto mb-4 border border-toxic-green-500/20">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-toxic-green-500 font-medium mb-2 font-mono">02. TACTICAL BRIEFING</h4>
              <p className="text-gray-400 text-sm">
                Our team will contact you within 24 hours to confirm details and assign elite operators.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-gray-800 pixel-corners">
              <div className="w-12 h-12 bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/10 rounded-lg flex items-center justify-center mx-auto mb-4 border border-toxic-green-500/20">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-toxic-green-500 font-medium mb-2 font-mono">03. MISSION EXECUTION</h4>
              <p className="text-gray-400 text-sm">
                Our operators begin the mission with regular status updates through your preferred channel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 