import { Metadata } from 'next';
import { COMPANY } from '../constants/company';

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: 'Learn about our company vision, mission, and values.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0078D7] to-[#00B2A9]">
          About {COMPANY.serviceName}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-10">
            {COMPANY.serviceName} is a forward-thinking career preparation service dedicated to 
            empowering job seekers with the tools and resources they need to succeed in today&apos;s
            competitive job market.
          </p>
          
          <div className="glass-effect p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To become the leading platform that transforms how people prepare for and secure their
              dream careers, enabling everyone to reach their professional potential.
            </p>
          </div>
          
          <div className="glass-effect p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              We&apos;re on a mission to democratize access to high-quality career preparation resources,
              providing job seekers with the guidance and tools they need to present themselves
              confidently and professionally to potential employers.
            </p>
          </div>
          
          <div className="glass-effect p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Excellence:</strong> We are committed to providing the highest quality resources
                and services to help our clients succeed.
              </li>
              <li>
                <strong>Innovation:</strong> We continuously evolve our approach and services to reflect
                the changing dynamics of the job market.
              </li>
              <li>
                <strong>Accessibility:</strong> We believe career preparation should be accessible to
                everyone, regardless of their background or experience level.
              </li>
              <li>
                <strong>Integrity:</strong> We operate with honesty and transparency in all our interactions
                with clients and partners.
              </li>
              <li>
                <strong>Impact:</strong> We measure our success by the positive impact we have on our
                clients&apos; professional journeys.
              </li>
            </ul>
          </div>
          
          <div className="glass-effect p-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <p>
              {COMPANY.serviceName} provides comprehensive career preparation services including resume
              optimization, interview coaching, job application strategy, and more. Our platform is designed
              to give job seekers a competitive edge in their job search by focusing on the elements that
              make candidates stand out to employers.
            </p>
            <p className="mt-4">
              We combine innovative technology with expert guidance to deliver personalized, effective
              career preparation solutions that help our clients achieve their professional goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 