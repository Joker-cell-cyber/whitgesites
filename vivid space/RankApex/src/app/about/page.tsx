import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission to help gamers achieve their rank goals with professional boosting services.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 bg-[#080f0d] text-[#f9f9f9] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rank-emerald-600/5 rounded-full filter blur-[150px] animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rank-orange-600/5 rounded-full filter blur-[120px] animate-pulse-subtle"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 font-poppins">
            <span className="block">About</span>
            <span className="block gradient-text">{COMPANY.serviceName}</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-300">
            Your trusted partner for professional competitive gaming services
          </p>
        </div>
        
        <div className="space-y-12">
          <section className="card-apex p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h2>
            <p className="text-gray-300">
              At {COMPANY.serviceName}, our mission is to help gamers reach their desired rank in competitive games by providing professional, reliable, and secure boosting services. We believe that every player deserves to experience the game at their true skill level, without being held back by matchmaking algorithms or inconsistent teammates.
            </p>
          </section>
          
          <section className="card-apex p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Our Vision</h2>
            <p className="text-gray-300">
              We envision a gaming community where players can enjoy competitive games at the rank they deserve. Our goal is to become the most trusted name in boosting services, known for our professionalism, security, and results-driven approach.
            </p>
          </section>
          
          <section className="card-apex p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-rank-emerald-400">Excellence</h3>
                <p className="text-gray-300">
                  We maintain the highest standards in our boosting operations, employing only top-tier players who consistently demonstrate exceptional skill and professionalism.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-rank-orange-400">Security</h3>
                <p className="text-gray-300">
                  Account safety is our top priority. We implement robust security measures and strict privacy policies to ensure your gaming accounts are always protected.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-rank-emerald-400">Reliability</h3>
                <p className="text-gray-300">
                  We deliver results within promised timeframes, maintaining transparency throughout the boosting process with regular updates and clear communication.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-rank-orange-400">Integrity</h3>
                <p className="text-gray-300">
                  We operate with honesty and fairness in all our dealings, offering competitive pricing without hidden fees and honoring all guarantees we provide.
                </p>
              </div>
            </div>
          </section>
          
          <section className="card-apex p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Our Approach</h2>
            <p className="text-gray-300 mb-4">
              {COMPANY.serviceName} takes a methodical approach to boosting, focusing on sustainable skill progression rather than quick fixes. Our services are designed to ensure that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Accounts are boosted efficiently without raising red flags in game systems</li>
              <li>Playing patterns match the region and typical behavior of the account owner</li>
              <li>Security protocols are followed to protect account integrity</li>
              <li>Progress is tracked and reported transparently</li>
            </ul>
          </section>
          
          <section className="card-apex p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Looking Forward</h2>
            <p className="text-gray-300">
              As competitive gaming continues to evolve, so does {COMPANY.serviceName}. We&apos;re constantly expanding our service offerings to include new games, implementing improved security measures, and refining our boosting methods to deliver the best possible results for our clients.
            </p>
            <p className="text-gray-300 mt-4">
              Thank you for considering {COMPANY.serviceName} for your boosting needs. We look forward to helping you achieve your ranking goals and enhancing your gaming experience.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 