import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn more about our mission, vision, and approach to lead generation. We're dedicated to delivering high-quality leads that help businesses grow.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#111827] text-[#f2f2f2]">
      <div className="relative">
        {/* Hero section */}
        <div className="absolute inset-0 bg-gradient-to-b from-lead-blue-900/80 to-transparent opacity-60 z-0"></div>
        <div className="bg-[url('/images/about-hero.jpg')] bg-cover bg-center h-80">
          <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Us</h1>
              <p className="text-xl text-gray-200">
                Delivering quality leads to help businesses succeed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {/* Mission Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                At {COMPANY.serviceName}, our mission is to revolutionize lead generation by providing businesses with highly qualified, actionable leads that drive growth and success. We believe that quality leads are the foundation of effective marketing strategies, and we&apos;re committed to delivering excellence in every lead we provide.
              </p>
              <p className="text-lg text-gray-300">
                We strive to be more than just a lead provider—we aim to be a trusted partner in your business journey, understanding your unique needs and tailoring our solutions to match your specific goals and target audience.
              </p>
            </section>

            {/* Vision Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
                Our Vision
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                We envision a business landscape where companies of all sizes have access to high-quality lead generation services that were once only available to large corporations. By democratizing access to premium leads, we aim to level the playing field and empower businesses to reach their full potential.
              </p>
              <p className="text-lg text-gray-300">
                Our vision extends beyond just providing leads—we aim to create a comprehensive ecosystem that supports businesses throughout their entire customer acquisition journey, from initial lead generation to successful conversion.
              </p>
            </section>

            {/* Approach Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
                Our Approach
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-lead-green-400">Quality Over Quantity</h3>
                  <p className="text-gray-300">
                    We prioritize delivering high-quality, verified leads rather than focusing purely on numbers. Each lead undergoes a rigorous verification process to ensure accuracy and relevance to your business needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-lead-green-400">Data-Driven Strategies</h3>
                  <p className="text-gray-300">
                    Our approach is grounded in data analytics and market research. We continuously refine our methods based on performance metrics, industry trends, and client feedback.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-lead-green-400">Ethical Practices</h3>
                  <p className="text-gray-300">
                    We adhere to the highest ethical standards in lead generation, ensuring compliance with privacy regulations and respecting consumer preferences. We believe that ethical practices lead to better quality leads and more successful business relationships.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-lead-green-400">Continuous Innovation</h3>
                  <p className="text-gray-300">
                    The digital landscape is constantly evolving, and so are we. We invest in innovative technologies and methodologies to stay ahead of industry changes and provide our clients with cutting-edge lead generation solutions.
                  </p>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
                Our Values
              </h2>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start">
                  <span className="text-lead-blue-400 mr-2">•</span>
                  <span><strong>Integrity:</strong> We conduct our business with honesty and transparency, building trust with our clients and leads alike.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lead-blue-400 mr-2">•</span>
                  <span><strong>Excellence:</strong> We strive for excellence in every aspect of our service, from lead generation to customer support.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lead-blue-400 mr-2">•</span>
                  <span><strong>Innovation:</strong> We embrace change and continuously seek new ways to improve our processes and services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lead-blue-400 mr-2">•</span>
                  <span><strong>Customer Focus:</strong> We prioritize our clients&apos; needs and tailor our solutions to help them achieve their business goals.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lead-blue-400 mr-2">•</span>
                  <span><strong>Responsibility:</strong> We take responsibility for our actions and are committed to making a positive impact on the business community.</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 