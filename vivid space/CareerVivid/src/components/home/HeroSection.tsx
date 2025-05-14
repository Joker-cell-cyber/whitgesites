"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen" id="home">
      {/* Brutalist background with grid and noise */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#111111]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.12\'%3E%3Cpath opacity=\'.5\' d=\'M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Colored shape accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[15vh] bg-[#FF1493] clip-diagonal opacity-80"></div>
      <div className="absolute top-1/4 left-0 w-[30vw] h-[10vh] bg-[#8A2BE2] clip-diagonal-reverse opacity-50"></div>
      <div className="absolute bottom-0 right-10 w-[40vw] h-[12vh] bg-[#FF1493] clip-diagonal-reverse opacity-60"></div>

      <div className="container mx-auto relative z-10 px-4 md:px-6 h-screen flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content - Brutalist Typography */}
          <div className="lg:col-span-6 lg:pr-8">
            <div className="py-1 px-3 bg-white text-black inline-flex items-center mb-6 font-mono text-sm border-2 border-black shadow-solid-sm">
              <div className="w-2 h-2 bg-[#FF1493] mr-2"></div>
              Professional Career Preparation
            </div>
            
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] font-black uppercase mb-8 tracking-tight mix-blend-difference">
              <div className="block">Transform</div>
              <div className="block relative">
                Your <span className="text-[#FF1493] relative">Career
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF1493]"></span>
                </span>
              </div>
              <div className="block">
                Potential Into <span className="text-[#8A2BE2] relative">
                  Success
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#8A2BE2]"></span>
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 bg-black/80 p-4 border-l-4 border-[#FF1493] max-w-2xl">
              From standout resumes to confident interviews and winning applications - we prepare you for professional excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/pricing" 
                className="neo-brutalism-button bg-[#FF1493] hover:bg-[#FF1493]/90 text-white font-bold py-4 px-8 text-lg hover:-translate-y-1 hover:translate-x-1 transition-transform"
              >
                See Services
              </Link>
              <Link
                href="/contact"
                className="neo-brutalism-white-button bg-white hover:bg-gray-100 text-black border-2 border-black font-bold py-4 px-8 text-lg hover:-translate-y-1 hover:translate-x-1 transition-transform"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Right Content - Brutalist Image Treatment */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div className="aspect-[4/3] relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 border-t-8 border-l-8 border-[#8A2BE2]"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border-b-8 border-r-8 border-[#FF1493]"></div>
              
              {/* Glitched image container */}
              <div className="relative w-full h-full bg-black overflow-hidden neo-brutalism-image">
                {/* Main image */}
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional preparing for interview"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Image pseudo-glitch effects */}
                <div className="absolute inset-0 bg-[#FF1493] mix-blend-screen opacity-20"></div>
                <div className="absolute inset-0 bg-[#8A2BE2] mix-blend-multiply opacity-20"></div>
                
                {/* Scanlines effect */}
                <div className="scanlines absolute inset-0 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Feature badges */}
            <div className="absolute -right-4 top-6 rotate-6 bg-white border-2 border-black shadow-solid-sm p-2 font-bold text-sm">
              24-Hour Reviews
            </div>
            
            <div className="absolute -left-4 bottom-12 -rotate-3 bg-white border-2 border-black shadow-solid-sm p-2 font-bold text-sm">
              Expert Coaches
            </div>
          </div>
        </div>
        
        {/* Simple Services Section */}
        <div className="w-full mt-20 lg:mt-0 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 border-b-4 border-[#FF1493] pb-2 inline-block">Online Career Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 neo-brutalism-card border-2 border-white/30">
                <div className="text-[#FF1493] text-4xl mb-4">01</div>
                <h3 className="text-xl font-bold mb-2">Resume Reviews</h3>
                <p className="text-white/80">Professional feedback on your resume with actionable improvements.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 neo-brutalism-card border-2 border-white/30">
                <div className="text-[#8A2BE2] text-4xl mb-4">02</div>
                <h3 className="text-xl font-bold mb-2">Interview Prep</h3>
                <p className="text-white/80">Practice sessions and feedback to boost your interview confidence.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 neo-brutalism-card border-2 border-white/30">
                <div className="text-[#FF1493] text-4xl mb-4">03</div>
                <h3 className="text-xl font-bold mb-2">Career Coaching</h3>
                <p className="text-white/80">Personalized guidance to help you reach your professional goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for brutalist effects */}
      <style jsx global>{`
        .neo-brutalism-button {
          box-shadow: 5px 5px 0px rgba(0, 0, 0, 1);
          position: relative;
          isolation: isolate;
        }
        
        .neo-brutalism-white-button {
          box-shadow: 5px 5px 0px rgba(0, 0, 0, 1);
        }
        
        .neo-brutalism-image {
          box-shadow: 12px 12px 0px rgba(0, 0, 0, 1);
          border: 3px solid black;
        }

        .neo-brutalism-card {
          box-shadow: 5px 5px 0px rgba(0, 0, 0, 1);
          transition: transform 0.2s ease;
        }

        .neo-brutalism-card:hover {
          transform: translateY(-5px);
        }
        
        .shadow-solid-sm {
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 1);
        }
        
        .shadow-solid-md {
          box-shadow: 6px 6px 0px rgba(0, 0, 0, 1);
        }
        
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 100%);
        }
        
        .clip-diagonal-reverse {
          clip-path: polygon(0 0, 100% 65%, 100% 100%, 0 100%);
        }
        
        .scanlines::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.05) 0.5%,
            transparent 1%
          );
          background-size: 100% 4px;
          z-index: 1;
        }
      `}</style>
    </section>
  );
} 