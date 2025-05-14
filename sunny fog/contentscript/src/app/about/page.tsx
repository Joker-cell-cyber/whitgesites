import { COMPANY } from "../constants/company";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission and values at ContentScript - Professional script writing services for content creators",
};

export default function AboutPage() {
  return (
    <main className="bg-[#121212] text-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-vid-blue-500 to-vid-white-100">ContentScript</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-400">
            Transforming ideas into compelling video scripts that captivate audiences across all platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-12">
            <section className="bg-[#1e1e1e] border border-gray-800/30 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-vid-blue-500 to-vid-white-100">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At {COMPANY.serviceName}, our mission is to empower content creators with professional scripts that elevate their messaging and maximize audience engagement.
              </p>
              <p className="text-gray-300">
                We strive to bridge the gap between ideas and execution by providing accessible, high-quality script writing services that help creators of all sizes achieve their communication goals.
              </p>
            </section>
            
            <section className="bg-[#1e1e1e] border border-gray-800/30 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-vid-blue-500 to-vid-white-100">Our Vision</h2>
              <p className="text-gray-300 mb-4">
                We envision a world where every content creator has access to professional script writing resources that bring their unique voice and message to life.
              </p>
              <p className="text-gray-300">
                Our goal is to become the leading script writing service that creators turn to when they need to transform their ideas into compelling, audience-focused content that drives results.
              </p>
            </section>
          </div>
          
          <div className="space-y-12">
            <section className="bg-[#1e1e1e] border border-gray-800/30 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-vid-blue-500 to-vid-white-100">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-vid-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Quality Excellence</h3>
                    <p className="text-gray-400">We never compromise on the quality of our scripts, ensuring each piece meets the highest standards of professionalism and effectiveness.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-vid-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Audience-Centered Approach</h3>
                    <p className="text-gray-400">We focus on understanding the target audience for every script, ensuring the message resonates and drives engagement.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-vid-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Innovation</h3>
                    <p className="text-gray-400">We continuously explore new storytelling techniques and formats to stay ahead of content trends and audience preferences.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-vid-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Client Partnership</h3>
                    <p className="text-gray-400">We view our relationship with clients as a partnership, working collaboratively to achieve their content goals.</p>
                  </div>
                </li>
              </ul>
            </section>
            
            <section className="bg-[#1e1e1e] border border-gray-800/30 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-vid-blue-500 to-vid-white-100">Our Story</h2>
              <p className="text-gray-300 mb-4">
                {COMPANY.serviceName} was founded on the belief that great content begins with a great script. As the digital content landscape rapidly expanded, we identified a growing need for professional script writing services that could help creators stand out in an increasingly competitive environment.
              </p>
              <p className="text-gray-300">
                Today, we serve content creators of all types - from marketing teams and video producers to social media influencers and educational channels - providing the script writing expertise they need to communicate effectively with their audiences.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 