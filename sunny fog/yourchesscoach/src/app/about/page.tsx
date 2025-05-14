import { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY } from '../constants/company';

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: 'Learn about our mission to revolutionize chess coaching through personalized learning and advanced strategic training.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0a1628] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="gradient-text">Us</span>
          </h1>
          
          <div className="bg-[#0c1d3d] border border-[#1e365a] rounded-xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-chess-blue-600 to-chess-gold-500">
              Our Mission
            </h2>
            <p className="text-gray-300 mb-6">
              At {COMPANY.serviceName}, our mission is to democratize access to high-quality chess instruction. 
              We believe that strategic thinking and analytical skills developed through chess can benefit people 
              of all ages and backgrounds. Our platform connects dedicated chess enthusiasts with personalized 
              coaching that adapts to individual learning styles and goals.
            </p>
            <p className="text-gray-300">
              Through innovative training methods and accessibility, we aim to grow the chess community while 
              preserving the rich traditions and intellectual depth that make chess one of the world's most 
              enduring games of strategy.
            </p>
          </div>
          
          <div className="bg-[#0c1d3d] border border-[#1e365a] rounded-xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-chess-blue-600 to-chess-gold-500">
              Our Vision
            </h2>
            <p className="text-gray-300 mb-6">
              We envision a world where chess is recognized not just as a game, but as a powerful educational 
              tool that enhances critical thinking, patience, and strategic planning. {COMPANY.serviceName} strives 
              to be at the forefront of chess education innovation, leveraging technology to bring personalized 
              coaching to players worldwide.
            </p>
            <p className="text-gray-300">
              By 2025, we aim to help 100,000 players improve their rating by at least 200 points through our 
              specialized training programs and coaching methodologies.
            </p>
          </div>
          
          <div className="bg-[#0c1d3d] border border-[#1e365a] rounded-xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-chess-blue-600 to-chess-gold-500">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-chess-gold-400">Personalized Learning</h3>
                <p className="text-gray-300">
                  We believe every chess player has unique strengths, weaknesses, and learning styles. 
                  Our coaching is tailored to individual needs, focusing on targeted improvement rather 
                  than one-size-fits-all instruction.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-chess-gold-400">Data-Driven Methods</h3>
                <p className="text-gray-300">
                  Our training programs utilize advanced analytics to identify patterns in your games, 
                  pinpoint improvement areas, and measure progress objectively. This scientific approach 
                  ensures efficient skill development.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-chess-gold-400">Balanced Technique</h3>
                <p className="text-gray-300">
                  We emphasize both tactical sharpness and strategic understanding, creating well-rounded 
                  players who excel in all phases of the game, from opening preparation to endgame mastery.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-chess-gold-400">Continuous Innovation</h3>
                <p className="text-gray-300">
                  Chess theory evolves constantly. Our curriculum incorporates the latest strategic 
                  concepts and technological tools to keep our students at the cutting edge of modern chess.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-6">Ready to elevate your chess game?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/pricing" 
                className="px-6 py-3 bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 text-white rounded-lg font-medium hover:from-chess-blue-700 hover:to-chess-gold-600 transition-colors"
              >
                Explore Our Programs
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-[#1a2e4f] text-white rounded-lg font-medium hover:bg-[#253a5e] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 