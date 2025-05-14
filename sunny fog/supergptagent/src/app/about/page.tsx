import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission, vision, and commitment to delivering innovative AI agent solutions.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#0c0c14] text-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-blue-500 to-ai-purple-500">SuperGPTAgent</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-[#13131e] rounded-xl p-8 border border-ai-blue-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-blue-500/5 to-ai-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ai-blue-400 to-ai-blue-600">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              At {COMPANY.serviceName}, our mission is to democratize access to cutting-edge AI technology by providing powerful, customizable AI agents that solve real business problems. We believe that artificial intelligence should be accessible, practical, and transformative for organizations of all sizes.
            </p>
          </div>
          
          <div className="bg-[#13131e] rounded-xl p-8 border border-ai-purple-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-purple-500/5 to-ai-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ai-purple-400 to-ai-purple-600">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              We envision a future where AI agents seamlessly integrate into every aspect of business operations, enhancing productivity, driving innovation, and creating competitive advantages. {COMPANY.serviceName} is committed to being at the forefront of this AI revolution, continuously pushing the boundaries of what&apos;s possible.
            </p>
          </div>
        </div>
        
        <div className="bg-[#13131e] rounded-xl p-10 border border-ai-blue-500/10 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-400">
                We&apos;re constantly exploring new approaches and technologies to enhance our AI agents and deliver more value to our customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-gray-400">
                We implement robust security measures to protect your data and ensure that your AI agents operate in a safe, controlled environment.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance</h3>
              <p className="text-gray-400">
                Our AI agents are designed for speed, efficiency, and reliability, ensuring they can handle even the most demanding tasks with ease.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#13131e] rounded-xl p-10 border border-ai-purple-500/10">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Commitment</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            As a new company in the AI space, we&apos;re committed to building long-term partnerships with our customers, continuously improving our technology, and maintaining the highest standards of ethics and responsibility in AI development. We believe that the true value of AI lies not just in what it can do, but in how it can empower people and organizations to achieve their goals.
          </p>
          
          <div className="mt-12 text-center">
            <a href="/contact" className="inline-block bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:from-ai-blue-600 hover:to-ai-purple-600 transition-all duration-300 shadow-lg hover:shadow-ai-blue-500/25">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 