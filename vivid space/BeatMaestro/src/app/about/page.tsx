import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: "About Us - BeatMaestro",
  description: "Learn more about BeatMaestro and our mission to help music producers develop their skills.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500">BeatMaestro</span>
        </h1>
        
        <div className="space-y-8 text-gray-300">
          <section className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
            <p>
              At {COMPANY.serviceName}, we believe that everyone has the potential to create amazing music. Our vision is to democratize music production education by making professional-level coaching accessible to producers of all levels and backgrounds.
            </p>
          </section>
          
          <section className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p>
              We&apos;re on a mission to empower the next generation of music producers with the skills, knowledge, and mentorship they need to bring their creative vision to life. Through personalized coaching, we help our clients overcome technical challenges, develop their unique sound, and prepare their music for the competitive industry landscape.
            </p>
          </section>
          
          <section className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">What Sets Us Apart</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-beat-purple-400">Personalized Approach</h3>
                <p>Unlike generic tutorials, our coaching sessions are tailored to your specific goals, skill level, and musical style. We meet you where you are and help you get where you want to be.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-beat-purple-400">Industry Experience</h3>
                <p>Our coaches have years of experience in professional music production across multiple genres. We bring real-world insights that go beyond what you&apos;ll find in standard educational resources.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-beat-purple-400">Practical Results</h3>
                <p>We focus on actionable techniques and workflows that you can immediately apply to your music. Our goal is to help you make tangible improvements to your productions right away.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Excellence:</strong> We&apos;re committed to the highest standards in music production education.</li>
              <li><strong>Accessibility:</strong> We believe quality coaching should be available to producers at all skill levels.</li>
              <li><strong>Innovation:</strong> We continuously update our methods to reflect the latest industry trends and technologies.</li>
              <li><strong>Community:</strong> We foster a supportive environment where producers can learn, grow, and connect.</li>
              <li><strong>Results:</strong> We measure our success by the improvements in our clients&apos; music.</li>
            </ul>
          </section>
          
          <section className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Get Started Today</h2>
            <p className="mb-6">
              Ready to take your music production to the next level? Explore our coaching packages and find the right fit for your goals and budget.
            </p>
            <div className="flex justify-center">
              <a 
                href="/pricing" 
                className="px-8 py-3 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 rounded-lg font-medium hover:from-beat-purple-700 hover:to-beat-gold-600 transition-colors button-glow"
              >
                View Coaching Packages
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 