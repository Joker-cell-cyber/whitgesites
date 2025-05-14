import { Metadata } from 'next';
import { COMPANY } from '../constants/company';

export const metadata: Metadata = {
  title: `About Us - ${COMPANY.serviceName}`,
  description: 'Learn about our vision, mission and values at Oneiric Consulting.',
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            About {COMPANY.serviceName}
          </h1>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At {COMPANY.serviceName}, we envision a world where businesses can harness the full potential of their data and technology investments. Our vision is to be the catalyst that transforms organizations through strategic consulting that bridges the gap between business challenges and technological solutions.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our mission is to deliver exceptional consulting services that enable our clients to thrive in an increasingly complex digital landscape. We&apos;re committed to providing actionable insights, innovative strategies, and practical solutions that drive sustainable growth and competitive advantage.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">Excellence</h3>
                <p>We&apos;re committed to delivering the highest quality in everything we do, exceeding expectations through meticulous attention to detail and continuous improvement.</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">Integrity</h3>
                <p>We operate with transparency, honesty, and ethical standards that build trust and foster long-term relationships with our clients and partners.</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">Innovation</h3>
                <p>We&apos;re constantly exploring new ideas, approaches, and technologies to solve complex problems and create unique value for our clients.</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">Client-Centric</h3>
                <p>We put our clients&apos; needs at the center of everything we do, tailoring our approach to address their specific challenges and objectives.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Our Approach</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We believe that effective consulting is a collaborative process. Our approach combines deep industry knowledge, technical expertise, and a genuine commitment to understanding your business objectives. We don&apos;t just provide generic recommendations &ndash; we work closely with you to develop customized solutions that align with your strategic goals and organizational culture.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              As a relatively new consulting firm, we bring fresh perspectives and innovative methodologies to the table, unburdened by outdated practices. Our agility allows us to adapt quickly to changing business environments and emerging trends, providing our clients with cutting-edge solutions that drive success in today&apos;s dynamic marketplace.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
} 