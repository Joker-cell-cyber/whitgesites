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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-20 bg-[#0a0a14]" id="music-styles">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Music Styles</span> We Master
            </h2>
            <p className="text-gray-400 text-lg">
              Discover the different music genres we can help you with through personalized coaching
            </p>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center border-b border-gray-800 mb-8">
          {(Object.keys(musicStylesData) as MusicStyle[]).map((style) => (
          <button
              key={style}
              onClick={() => setActiveTab(style)}
              className={`px-6 py-3 font-medium text-sm transition-all relative ${
                activeTab === style
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {musicStylesData[style].title}
              {activeTab === style && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
          </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {musicStylesData[activeTab].title}
                  </h3>
                  <p className="text-gray-400">
                    {musicStylesData[activeTab].description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-beat-purple-300 font-medium mb-2">Key coaching points:</p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-gray-300">
                        <span className="mr-2 text-beat-gold-500">✓</span>
                        Style-specific production techniques
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="mr-2 text-beat-gold-500">✓</span>
                        Characteristic sound design
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="mr-2 text-beat-gold-500">✓</span>
                        Arrangement and structure
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="mr-2 text-beat-gold-500">✓</span>
                        Genre-appropriate mixing
                      </li>
                    </ul>
                  </div>
                </div>
        </div>

              <div className="md:w-2/3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                  {musicStylesData[activeTab].subGenres.map((subGenre, index) => (
                <motion.div
                      key={index}
                  variants={itemVariants}
                      className="p-5 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-beat-purple-500/50 transition-all group"
                    >
                      <h4 className="text-xl font-bold text-white group-hover:text-beat-purple-300 transition-colors">
                        {subGenre.name}
                      </h4>
                      <p className="text-gray-400 mt-2 text-sm">
                        {subGenre.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {subGenre.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block text-xs px-3 py-1 rounded-full bg-gray-800/70 text-gray-300 border border-gray-700"
                          >
                            {skill}
                        </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                    </div>
                  </div>
                </motion.div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white rounded-lg font-medium button-glow"
          >
            <span>Book a Session</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 
