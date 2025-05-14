import { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "About Us | FarmersJack",
  description: "Learn about FarmersJack's mission, vision, and approach to professional gaming services.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#070b14] min-h-screen relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-toxic-green-900/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-pink-900/20 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-black/30 border border-toxic-green-500/30 rounded text-toxic-green-500 text-xs font-mono">
              MISSION_PROFILE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ABOUT <span className="text-toxic-green-500">FARMERSJACK</span>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto font-mono leading-relaxed">
              Established in 2025, {COMPANY.serviceName} provides elite virtual farming and in-game resource acquisition services. 
              Our mission is to empower gamers when time constraints prevent them from achieving their in-game goals.
            </p>
          </div>
          
          {/* Vision, Mission, Values Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#0d1424] border border-gray-800 rounded-xl p-6 pixel-corners">
              <div className="w-12 h-12 rounded-lg bg-toxic-green-900/30 flex items-center justify-center mb-4 border border-toxic-green-500/30">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-gray-400">
                To become the leading platform for professional gaming services, recognized for reliability, efficiency, and unmatched expertise in virtual resource acquisition.
              </p>
            </div>
            
            <div className="bg-[#0d1424] border border-gray-800 rounded-xl p-6 pixel-corners">
              <div className="w-12 h-12 rounded-lg bg-toxic-green-900/30 flex items-center justify-center mb-4 border border-toxic-green-500/30">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-gray-400">
                To provide exceptional gaming services that save our clients time while delivering maximum in-game value, using advanced strategies and secure methodologies.
              </p>
            </div>
            
            <div className="bg-[#0d1424] border border-gray-800 rounded-xl p-6 pixel-corners">
              <div className="w-12 h-12 rounded-lg bg-toxic-green-900/30 flex items-center justify-center mb-4 border border-toxic-green-500/30">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Our Values</h2>
              <p className="text-gray-400">
                Excellence, security, efficiency, and client satisfaction form the core of our operational philosophy and guide every service we deliver.
              </p>
            </div>
          </div>
          
          {/* Approach Section */}
          <div className="bg-[#0d1424] border border-gray-800 rounded-xl p-8 mb-16 pixel-corners">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-6 h-6 rounded bg-toxic-green-900/50 flex items-center justify-center mr-3 text-toxic-green-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Our Approach
            </h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-toxic-green-900/20 flex items-center justify-center mr-4 border border-toxic-green-500/20">
                  <span className="text-toxic-green-500 font-bold">01</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced Farming Technologies</h3>
                  <p className="text-gray-400">
                    We employ cutting-edge techniques and proprietary methodologies to maximize efficiency in resource acquisition across all supported games.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-toxic-green-900/20 flex items-center justify-center mr-4 border border-toxic-green-500/20">
                  <span className="text-toxic-green-500 font-bold">02</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Security-First Operations</h3>
                  <p className="text-gray-400">
                    Client account security is paramount. We utilize secure VPN protocols, advanced encryption, and strict handling procedures to ensure complete safety.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-toxic-green-900/20 flex items-center justify-center mr-4 border border-toxic-green-500/20">
                  <span className="text-toxic-green-500 font-bold">03</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Result-Driven Methodology</h3>
                  <p className="text-gray-400">
                    Our service model focuses on delivering measurable results with clear tracking, regular updates, and guaranteed outcomes for every service package.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Info Section */}
          <div className="bg-[#0d1424] border border-gray-800 rounded-xl p-8 pixel-corners">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-6 h-6 rounded bg-toxic-green-900/50 flex items-center justify-center mr-3 text-toxic-green-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Corporate Information
            </h2>
            
            <div className="text-gray-400 space-y-2">
              <p>
                <span className="text-toxic-green-500 font-semibold">Company:</span> {COMPANY.name}
              </p>
              <p>
                <span className="text-toxic-green-500 font-semibold">EIN:</span> {COMPANY.ein}
              </p>
              <p>
                <span className="text-toxic-green-500 font-semibold">Address:</span> {COMPANY.address}
              </p>
              <p>
                <span className="text-toxic-green-500 font-semibold">Contact:</span> {COMPANY.email}
              </p>
              <p>
                <span className="text-toxic-green-500 font-semibold">Established:</span> 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 