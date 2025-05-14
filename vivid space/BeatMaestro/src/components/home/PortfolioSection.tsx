"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type MusicStyle = "hip-hop" | "electronic" | "pop" | "rock";

interface StyleDetail {
  title: string;
  description: string;
  subGenres: {
    name: string;
    description: string;
    skills: string[];
  }[];
}

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<MusicStyle>("hip-hop");

  const musicStylesData: Record<MusicStyle, StyleDetail> = {
    "hip-hop": {
      title: "Hip-Hop & Trap",
      description: "Master the essential techniques of hip-hop, trap and other sub-genres, from 808s to impactful melodies.",
      subGenres: [
        {
          name: "Trap",
          description: "Modern trap production with impactful 808s and punchy rhythms.",
          skills: ["808 Programming", "Rolling hi-hats", "Trap sound design", "Percussive rhythms"]
        },
        {
          name: "Boom Bap",
          description: "Sampling techniques and creation of classic old-school grooves.",
          skills: ["Vinyl sampling", "Organic groove", "Chopping techniques", "Classic structures"]
        },
        {
          name: "Drill",
          description: "Drill production with its characteristic bass slides and dark atmospheres.",
          skills: ["Bass slides", "Syncopated rhythms", "Tense atmospheres", "Drill mixing"]
        },
        {
          name: "Lo-Fi",
          description: "Creating relaxing atmospheres with warm textures and controlled imperfections.",
          skills: ["Vintage textures", "Cassette effects", "Creative sampling", "Jazz harmonies"]
        }
      ]
    },
    "electronic": {
      title: "Electronic Music",
      description: "Explore the world of electronic music, from energetic house to atmospheric ambient.",
      subGenres: [
        {
          name: "House",
          description: "House production with 4/4 structures and effective harmonic progressions.",
          skills: ["4/4 Structure", "Chord progressions", "House groove", "Sound design"]
        },
        {
          name: "Techno",
          description: "Creating techno with hypnotic rhythms and industrial textures.",
          skills: ["Rhythmic sequences", "Sound synthesis", "Industrial textures", "Techno mixing"]
        },
        {
          name: "Ambient",
          description: "Designing atmospheres with atmospheric pads and immersive sound design.",
          skills: ["Sound textures", "Immersive design", "FM synthesis", "Spatial processing"]
        },
        {
          name: "Drum & Bass",
          description: "Programming fast breakbeats and characteristic deep basses.",
          skills: ["Fast breakbeats", "Deep basses", "Energetic sound design", "Complex structures"]
        }
      ]
    },
    "pop": {
      title: "Pop & R&B",
      description: "Develop the skills needed to create modern pop and impactful R&B productions.",
      subGenres: [
        {
          name: "Modern Pop",
          description: "Creating contemporary productions with radio-friendly arrangements.",
          skills: ["Effective structures", "Catchy hooks", "Clean productions", "Commercial arrangement"]
        },
        {
          name: "R&B",
          description: "R&B production with rich harmonies and characteristic subtle grooves.",
          skills: ["Complex harmonies", "Subtle grooves", "R&B sound design", "Vocal mixing"]
        },
        {
          name: "Urban Pop",
          description: "Fusion of urban and pop sounds for current productions.",
          skills: ["Style fusion", "Urban programming", "Hybrid arrangement", "Modern sound design"]
        },
        {
          name: "Indie Pop",
          description: "Creating authentic productions with distinctive organic textures.",
          skills: ["Sound authenticity", "Organic textures", "Artistic identity", "Natural mixing"]
        }
      ]
    },
    "rock": {
      title: "Rock & Metal",
      description: "Learn to produce rock and metal professionally, from recording to mixing.",
      subGenres: [
        {
          name: "Modern Rock",
          description: "Balance between acoustic and electronic instruments for a contemporary sound.",
          skills: ["Guitar recording", "Drum production", "Rock arrangement", "Balanced mixing"]
        },
        {
          name: "Metal",
          description: "Metal production with saturated guitars and powerful drums.",
          skills: ["Guitar walls", "Drum mixing", "Metal sound design", "Clarity in density"]
        },
        {
          name: "Indie Rock",
          description: "Creating alternative sounds with characteristic creative textures.",
          skills: ["Alternative textures", "Spatialization", "Creative production", "Sonic identity"]
        },
        {
          name: "Pop Rock",
          description: "Balanced production between rock energy and pop accessibility.",
          skills: ["Hybrid arrangements", "Instrument balance", "Controlled energy", "Commercial mixing"]
        }
      ]
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0e1c] to-[#090912]" id="music-styles">
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-10 w-72 h-72 bg-beat-purple-600/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-beat-gold-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative z-10"
        >
          <div className="text-center">
            <div className="inline-flex items-center p-1 px-3 rounded-full bg-beat-purple-500/10 border border-beat-purple-500/20 text-beat-purple-400 text-sm font-medium mb-4">
              Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Music Styles <span className="text-beat-gold-500">We Master</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover the different music genres we can help you with through personalized coaching
            </p>
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar with genre selector */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/4"
          >
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-6">
                Select your style
              </h3>
              
              <div className="flex flex-col space-y-3">
                {(Object.keys(musicStylesData) as MusicStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setActiveTab(style)}
                    className={`flex items-center text-left p-4 rounded-xl transition-all ${
                      activeTab === style
                        ? "bg-gradient-to-r from-beat-purple-900/30 to-beat-gold-900/20 border border-beat-purple-500/20 shadow-lg"
                        : "bg-black/20 border border-gray-800/50 hover:border-beat-purple-500/20"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      activeTab === style
                        ? "bg-beat-gold-500"
                        : "bg-gray-700"
                    }`}></div>
                    <div>
                      <div className={`font-medium ${
                        activeTab === style
                          ? "text-white"
                          : "text-gray-400"
                      }`}>
                        {musicStylesData[style].title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl">
                <p className="text-gray-400 text-sm mb-4">
                  Not sure which style fits your music? Book a session and we'll help you identify your sound.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-beat-purple-400 hover:text-beat-purple-300 transition-colors group"
                >
                  <span>Contact us</span>
                  <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Main content with genre details */}
          <div className="lg:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Genre Header */}
              <div className="relative mb-10 p-8 overflow-hidden rounded-2xl bg-gradient-to-br from-black/80 to-gray-900/40 border border-gray-800/50 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-beat-purple-500/10 to-beat-gold-500/5 mix-blend-overlay"></div>
                <div className="relative">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {musicStylesData[activeTab].title}
                  </h3>
                  <p className="text-lg text-gray-300 max-w-3xl">
                    {musicStylesData[activeTab].description}
                  </p>
                </div>
              </div>
              
              {/* Sub-genres */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {musicStylesData[activeTab].subGenres.map((subGenre, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="h-full flex flex-col backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden hover:border-beat-purple-500/30 transition-all group">
                      <div className="bg-black/40 p-5">
                        <h4 className="text-xl font-bold text-white group-hover:text-beat-gold-400 transition-colors">
                          {subGenre.name}
                        </h4>
                        <p className="text-gray-400 mt-2">
                          {subGenre.description}
                        </p>
                      </div>
                      
                      <div className="flex-grow bg-black/20 p-5 pt-4">
                        <p className="text-sm text-beat-purple-400 font-medium mb-3">Skills you'll develop:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {subGenre.skills.map((skill, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center"
                            >
                              <div className="w-2 h-2 rounded-full bg-beat-gold-500/50 mr-2"></div>
                              <span className="text-gray-300 text-sm">
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 flex justify-center"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/pricing"
                    className="px-6 py-3 bg-beat-purple-500 hover:bg-beat-purple-600 text-white rounded-lg shadow-lg shadow-beat-purple-500/20 font-medium transition-colors"
                  >
                    Book a Session
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-transparent border border-beat-gold-500/50 text-beat-gold-400 hover:bg-beat-gold-500/10 rounded-lg font-medium transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 
