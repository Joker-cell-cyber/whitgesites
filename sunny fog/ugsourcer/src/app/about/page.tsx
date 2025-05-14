import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: "About Us | UGSourcer",
  description: "Learn about UGSourcer, our mission, vision, and values.",
};

export default function AboutPage() {
  return (
    <div className="py-20 min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About {COMPANY.serviceName}</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Revolutionizing how brands connect with authentic content creators
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Mission Section */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800/30 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ug-blue-500 to-ug-blue-300 mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At {COMPANY.serviceName}, our mission is to bridge the gap between brands and authentic content creators, facilitating meaningful collaborations that resonate with audiences and drive genuine engagement.
              </p>
              <p className="text-gray-300">
                We believe in the power of authentic user-generated content to transform marketing strategies, build trust with consumers, and create lasting brand impressions that traditional advertising cannot achieve.
              </p>
            </div>
            
            {/* Vision Section */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800/30 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ug-blue-500 to-ug-blue-300 mb-6">Our Vision</h2>
              <p className="text-gray-300 mb-4">
                We envision a marketing landscape where authentic, creator-driven content is at the forefront of brand communication strategies, replacing outdated and ineffective traditional advertising methods.
              </p>
              <p className="text-gray-300">
                {COMPANY.serviceName} aims to be the industry-leading platform that makes finding and collaborating with the perfect content creators seamless, efficient, and accessible for businesses of all sizes.
              </p>
            </div>
            
            {/* Values Section */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800/30 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ug-blue-500 to-ug-blue-300 mb-6">Our Core Values</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Authenticity</h3>
                  <p className="text-gray-300">
                    We believe in the power of genuine content and real connections. We prioritize authentic storytelling that resonates with audiences over perfectly polished but disconnected messaging.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                  <p className="text-gray-300">
                    We stay at the forefront of digital marketing trends and technologies, continuously evolving our platform to meet the changing needs of both brands and creators.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Quality</h3>
                  <p className="text-gray-300">
                    We maintain rigorous standards in our creator vetting process, ensuring that brands are connected only with creators who can deliver exceptional content.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Transparency</h3>
                  <p className="text-gray-300">
                    We operate with complete openness in all aspects of our business, from pricing to creator selection, fostering trust with all our partners.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Approach Section */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800/30 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ug-blue-500 to-ug-blue-300 mb-6">Our Approach</h2>
              <p className="text-gray-300 mb-4">
                {COMPANY.serviceName} takes a data-driven approach to creator matching, utilizing advanced algorithms and human expertise to find the perfect fit between brands and content creators.
              </p>
              <p className="text-gray-300 mb-4">
                We carefully assess each creator's audience demographics, engagement metrics, content quality, and brand alignment to ensure every match is set up for success from the beginning.
              </p>
              <p className="text-gray-300">
                Our platform streamlines the entire process from initial sourcing to final content delivery, making it easier than ever for brands to harness the power of authentic user-generated content.
              </p>
            </div>
            
            {/* Join Us CTA */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Join the UGC Revolution</h2>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
                Whether you're a brand looking to elevate your marketing strategy or a creator seeking meaningful collaborations, {COMPANY.serviceName} is building the future of authentic content marketing.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Get Started
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 