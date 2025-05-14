import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission, vision, and values at ReadyBook. We're dedicated to providing high-quality e-book writing services.",
};

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-book-blue-950 to-book-blue-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">About ReadyBook</h1>
          
          <div className="bg-book-blue-800/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-book-gold-400">Our Story</h2>
            <p className="mb-6 text-gray-100">
              Founded in 2025, ReadyBook was born from a simple yet powerful idea: everyone has a story to tell, knowledge to share, or expertise to pass on. We recognized that while many individuals and businesses have valuable content to share, they often lack the time, skills, or resources to transform their ideas into polished e-books.
            </p>
            <p className="text-gray-100">
              We assembled a team of experienced writers, editors, and publishing experts passionate about helping others bring their written works to life. Since our inception, we&apos;ve been dedicated to making professional e-book writing services accessible to entrepreneurs, educators, thought leaders, and creative minds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-book-blue-800/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-book-gold-400">Our Mission</h2>
              <p className="text-gray-100">
                To empower individuals and organizations to share their knowledge, stories, and expertise through professionally crafted e-books that engage, educate, and inspire readers around the world.
              </p>
            </div>
            
            <div className="bg-book-blue-800/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-book-gold-400">Our Vision</h2>
              <p className="text-gray-100">
                To become the leading e-book writing service that transforms ideas into impactful digital publications, making knowledge sharing accessible to everyone regardless of their writing experience.
              </p>
            </div>
          </div>
          
          <div className="bg-book-blue-800/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-book-gold-400">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-2 text-book-gold-300">Excellence</h3>
                <p className="text-gray-100">
                  We are committed to delivering e-books of exceptional quality that exceed our clients&apos; expectations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 text-book-gold-300">Integrity</h3>
                <p className="text-gray-100">
                  We maintain the highest ethical standards in all our business practices and client relationships.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 text-book-gold-300">Innovation</h3>
                <p className="text-gray-100">
                  We continuously explore new ways to improve our services and adapt to the evolving digital publishing landscape.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 text-book-gold-300">Collaboration</h3>
                <p className="text-gray-100">
                  We believe in working closely with our clients to ensure their vision and voice shine through in every project.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-book-blue-800/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-book-gold-400">Our Approach</h2>
            <p className="mb-4 text-gray-100">
              At ReadyBook, we follow a comprehensive, client-centered approach to e-book writing:
            </p>
            
            <ol className="list-decimal list-inside space-y-3 text-gray-100 pl-4">
              <li><span className="font-medium text-white">Discovery</span> - We start by understanding your goals, target audience, and key messages.</li>
              <li><span className="font-medium text-white">Content Strategy</span> - We develop a detailed outline and content plan tailored to your objectives.</li>
              <li><span className="font-medium text-white">Professional Writing</span> - Our experienced writers craft engaging, well-researched content.</li>
              <li><span className="font-medium text-white">Review & Refinement</span> - We collaborate with you through revisions until the manuscript meets your vision.</li>
              <li><span className="font-medium text-white">Polishing</span> - Professional editing and formatting transforms your manuscript into a publication-ready e-book.</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
} 