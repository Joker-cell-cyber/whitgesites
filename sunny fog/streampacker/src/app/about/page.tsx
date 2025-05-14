import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission to empower streamers and content creators with professional overlays and stream packages.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#121212] text-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">About</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6441A4] to-[#00FFFF]">StreamPacker</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-400">
            Empowering streamers and content creators with professional-grade visuals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6441A4] to-[#00FFFF] rounded-lg blur-lg opacity-25"></div>
              <div className="relative bg-[#0b0b1e]/80 backdrop-blur p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Our Vision</h2>
                <p className="text-gray-300 mb-4">
                  At {COMPANY.serviceName}, we envision a streaming ecosystem where every content creator has access to professional-quality visual assets that elevate their brand and engage their audience.
                </p>
                <p className="text-gray-300 mb-4">
                  We believe that exceptional visual presentation should not be limited to those with design experience or large budgets. Our vision is to democratize access to premium stream graphics, creating a more vibrant and professional streaming community.
                </p>
                <p className="text-gray-300">
                  We are committed to pushing the boundaries of stream design, constantly innovating to provide creators with cutting-edge visual solutions that help them stand out in an increasingly competitive landscape.
                </p>
              </div>
            </div>

            <div className="mt-12 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFFF] to-[#FF1493] rounded-lg blur-lg opacity-25"></div>
              <div className="relative bg-[#0b0b1e]/80 backdrop-blur p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#6441A4]/30 p-2 rounded-lg mr-4">
                      <svg className="h-5 w-5 text-[#00FFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Quality Excellence</h3>
                      <p className="text-gray-300">We never compromise on the quality of our designs, ensuring every product meets our high standards.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#6441A4]/30 p-2 rounded-lg mr-4">
                      <svg className="h-5 w-5 text-[#00FFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Creator-Focused</h3>
                      <p className="text-gray-300">Every design decision is made with the creator's needs and audience engagement in mind.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#6441A4]/30 p-2 rounded-lg mr-4">
                      <svg className="h-5 w-5 text-[#00FFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Innovation</h3>
                      <p className="text-gray-300">We continuously explore new design trends and technologies to keep our offerings fresh and impactful.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1493] to-[#6441A4] rounded-lg blur-lg opacity-25"></div>
              <div className="relative bg-[#0b0b1e]/80 backdrop-blur p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-gray-300 mb-4">
                  {COMPANY.serviceName}'s mission is to empower content creators of all sizes with professional-grade stream graphics that enhance their brand identity and viewer experience.
                </p>
                <p className="text-gray-300 mb-4">
                  We are dedicated to providing affordable, high-quality visual solutions that help streamers establish a consistent and memorable brand presence across all platforms.
                </p>
                <p className="text-gray-300 mb-4">
                  Through innovative design and exceptional customer service, we aim to be the trusted partner for content creators looking to elevate their visual presentation and grow their audience.
                </p>
              </div>
            </div>

            <div className="mt-12 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6441A4] to-[#00FFFF] rounded-lg blur-lg opacity-25"></div>
              <div className="relative bg-[#0b0b1e]/80 backdrop-blur p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Our Approach</h2>
                <p className="text-gray-300 mb-4">
                  At {COMPANY.serviceName}, we take a streamlined approach to creating professional stream graphics:
                </p>
                <ol className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-[#6441A4] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4">1</span>
                    <p><strong>Understand:</strong> We start by deeply understanding the streaming landscape and creator needs.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#00FFFF] w-8 h-8 rounded-full flex items-center justify-center text-[#121212] font-bold mr-4">2</span>
                    <p><strong>Design:</strong> Our professional designers create visually stunning assets that perfectly blend with your brand.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#FF1493] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4">3</span>
                    <p><strong>Deliver:</strong> We provide ready-to-use graphics packages with clear implementation instructions.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#6441A4] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4">4</span>
                    <p><strong>Support:</strong> Our team is always available to help with any questions or technical issues.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Ready to transform your stream?</h2>
          <a 
            href="/pricing" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#6441A4] to-[#00FFFF] text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all"
          >
            Explore Our Packages
          </a>
        </div>
      </div>
    </main>
  );
} 