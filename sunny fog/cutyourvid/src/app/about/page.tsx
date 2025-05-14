import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission and vision at CutYourVid. Professional video editing services for content creators, businesses, and agencies.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#121212] text-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">About</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-vid-red-500 to-vid-orange-500">{COMPANY.serviceName}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Professional video editing services delivering high-quality content for creators, businesses, and agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <div className="bg-[#1d1d1d] rounded-xl p-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-vid-red-500 to-vid-orange-500">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              Our mission at {COMPANY.serviceName} is to empower content creators and businesses with high-quality video editing solutions that engage audiences and drive results.
            </p>
            <p className="text-gray-300">
              We believe that outstanding content should be accessible to everyone, which is why we provide professional video editing services at competitive prices, enabling creators and businesses of all sizes to share their stories effectively.
            </p>
          </div>

          <div className="bg-[#1d1d1d] rounded-xl p-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-vid-red-500 to-vid-orange-500">Our Vision</h2>
            <p className="text-gray-300 mb-4">
              We envision a digital landscape where high-quality video content is not limited by technical expertise or budget constraints. {COMPANY.serviceName} aims to be at the forefront of this transformation.
            </p>
            <p className="text-gray-300">
              By combining cutting-edge editing techniques with a deep understanding of digital platforms and audience engagement, we help our clients stand out in an increasingly competitive content ecosystem.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">What Sets Us Apart</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1d1d1d] rounded-xl p-6 border border-gray-800 shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-vid-red-600 to-vid-orange-500 flex items-center justify-center text-white mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Quick Turnaround</h3>
              <p className="text-gray-400">
                We understand the importance of timely delivery in the digital content world. Our streamlined workflow ensures you receive your edited videos promptly without compromising on quality.
              </p>
            </div>
            
            <div className="bg-[#1d1d1d] rounded-xl p-6 border border-gray-800 shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-vid-red-600 to-vid-orange-500 flex items-center justify-center text-white mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Customer-Centric Approach</h3>
              <p className="text-gray-400">
                Your vision comes first. We work closely with you to understand your goals and deliver results that align with your brand identity and content strategy.
              </p>
            </div>
            
            <div className="bg-[#1d1d1d] rounded-xl p-6 border border-gray-800 shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-vid-red-600 to-vid-orange-500 flex items-center justify-center text-white mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Platform Optimization</h3>
              <p className="text-gray-400">
                We optimize videos for the specific platforms they'll be shared on, ensuring maximum engagement and performance across social media, websites, and other digital channels.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Our Approach</h2>
          <p className="text-gray-400 text-lg text-center mb-8">
            We follow a proven process to deliver consistent, high-quality results for all our clients:
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Understanding Your Goals</h3>
                <p className="text-gray-400">
                  Before we start editing, we take the time to understand your objectives, target audience, and the message you want to convey through your videos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Crafting the Narrative</h3>
                <p className="text-gray-400">
                  Our editors analyze your footage and craft a compelling narrative that engages viewers and effectively communicates your message.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enhancing Visual Appeal</h3>
                <p className="text-gray-400">
                  We apply professional color grading, motion graphics, and visual effects to enhance the visual appeal of your videos and create a polished, professional look.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Perfecting Audio</h3>
                <p className="text-gray-400">
                  High-quality audio is essential for engagement. We enhance sound quality, add background music, and ensure clear dialogue to create a professional audio experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">5</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Refining Through Feedback</h3>
                <p className="text-gray-400">
                  We value your input and offer revision rounds to ensure the final product aligns perfectly with your vision and objectives.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Videos?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Let's create engaging content that resonates with your audience and helps you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/pricing" 
              className="px-6 py-3 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg font-medium button-glow text-center"
            >
              View Our Packages
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 