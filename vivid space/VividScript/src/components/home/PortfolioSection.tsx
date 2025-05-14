"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { COMPANY } from "@/app/constants/company";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

type ScriptCategory = "all" | "youtube" | "podcast" | "social" | "business";

interface ScriptExample {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: ScriptCategory[];
  format: string;
  focus: string;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<ScriptCategory>("all");

  // YouTube scripts
  const youtubeScripts: ScriptExample[] = [
    {
      id: 101,
      title: "Educational Tutorial",
      description: "Structured step-by-step learning scripts",
      thumbnail: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube"],
      format: "Long-form",
      focus: "Education"
    },
    {
      id: 102,
      title: "Product Review",
      description: "Balanced and informative assessments",
      thumbnail: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube"],
      format: "Medium-form",
      focus: "Consumer guidance"
    },
    {
      id: 103,
      title: "Commentary Video",
      description: "Insightful opinions on trending topics",
      thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube"],
      format: "Long-form",
      focus: "Analysis"
    },
    {
      id: 104,
      title: "Short-form Story",
      description: "Compelling narratives under 60 seconds",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube", "social"],
      format: "Short-form",
      focus: "Entertainment"
    },
    {
      id: 105,
      title: "Interview Preparation",
      description: "Structured questions and talking points",
      thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube", "podcast"],
      format: "Interview",
      focus: "Conversation"
    },
    {
      id: 106,
      title: "Channel Intro",
      description: "Memorable channel branding scripts",
      thumbnail: "https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube"],
      format: "Very short",
      focus: "Branding"
    },
    {
      id: 107,
      title: "Video Essay",
      description: "Deep-dive analytical content",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube"],
      format: "Long-form",
      focus: "In-depth analysis"
    },
    {
      id: 108,
      title: "Content Series",
      description: "Multi-episode narrative arcs",
      thumbnail: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["youtube"],
      format: "Series",
      focus: "Audience retention"
    }
  ];

  // Podcast scripts
  const podcastScripts: ScriptExample[] = [
    {
      id: 201,
      title: "Solo Show Format",
      description: "Engaging monologue structures",
      thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Monologue",
      focus: "Personal expertise"
    },
    {
      id: 202,
      title: "Interview Guide",
      description: "Thoughtful questions and conversation flows",
      thumbnail: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Interview",
      focus: "Guest expertise"
    },
    {
      id: 203,
      title: "Co-hosted Discussion",
      description: "Balanced dialogue between hosts",
      thumbnail: "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Dialogue",
      focus: "Chemistry"
    },
    {
      id: 204,
      title: "Educational Series",
      description: "Multi-episode learning content",
      thumbnail: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Series",
      focus: "Education"
    },
    {
      id: 205,
      title: "Story Narrative",
      description: "Immersive storytelling episodes",
      thumbnail: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Narrative",
      focus: "Storytelling"
    },
    {
      id: 206,
      title: "News Analysis",
      description: "Current events discussion structure",
      thumbnail: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Topical",
      focus: "Analysis"
    },
    {
      id: 207,
      title: "Show Intro & Outro",
      description: "Professional show bookends",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Branding",
      focus: "Consistency"
    },
    {
      id: 208,
      title: "Expert Roundtable",
      description: "Multi-guest discussion frameworks",
      thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["podcast"],
      format: "Panel",
      focus: "Multiple perspectives"
    }
  ];

  // Social media scripts
  const socialScripts: ScriptExample[] = [
    {
      id: 301,
      title: "TikTok / Reels",
      description: "Attention-grabbing short-form scripts",
      thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social"],
      format: "Vertical video",
      focus: "Viral potential"
    },
    {
      id: 302,
      title: "Story Series",
      description: "Multi-segment narrative arcs",
      thumbnail: "https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social"],
      format: "Sequential",
      focus: "Engagement"
    },
    {
      id: 303,
      title: "Product Showcase",
      description: "Concise benefit-focused pitches",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social", "business"],
      format: "Commercial",
      focus: "Conversion"
    },
    {
      id: 304,
      title: "Tutorial Clips",
      description: "Digestible how-to content",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social"],
      format: "Educational",
      focus: "Value-first"
    },
    {
      id: 305,
      title: "Content Hook",
      description: "Scroll-stopping opening lines",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social", "youtube"],
      format: "Intro",
      focus: "Attention"
    },
    {
      id: 306,
      title: "Trending Format",
      description: "Scripts for popular platform challenges",
      thumbnail: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social"],
      format: "Trend-based",
      focus: "Relevance"
    },
    {
      id: 307,
      title: "Platform-specific Campaign",
      description: "Multi-content coordinated messaging",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social", "business"],
      format: "Campaign",
      focus: "Cross-platform"
    },
    {
      id: 308,
      title: "Social Testimonial",
      description: "Authentic customer story frameworks",
      thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["social", "business"],
      format: "Testimonial",
      focus: "Trust-building"
    }
  ];

  // Business scripts
  const businessScripts: ScriptExample[] = [
    {
      id: 401,
      title: "Explainer Video",
      description: "Clear, compelling service overviews",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Educational",
      focus: "Clarity"
    },
    {
      id: 402,
      title: "Product Launch",
      description: "Excitement-building announcements",
      thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Promotional",
      focus: "Anticipation"
    },
    {
      id: 403,
      title: "Corporate Training",
      description: "Internal educational content",
      thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Instructional",
      focus: "Knowledge transfer"
    },
    {
      id: 404,
      title: "Investor Pitch",
      description: "Persuasive funding presentations",
      thumbnail: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Presentation",
      focus: "Persuasion"
    },
    {
      id: 405,
      title: "Customer Case Study",
      description: "Results-focused success stories",
      thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Testimonial",
      focus: "Proof"
    },
    {
      id: 406,
      title: "Trade Show Video",
      description: "Attention-grabbing booth content",
      thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Event",
      focus: "Impact"
    },
    {
      id: 407,
      title: "Recruitment Video",
      description: "Culture-highlighting talent attraction",
      thumbnail: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Employer branding",
      focus: "Culture"
    },
    {
      id: 408,
      title: "Annual Report",
      description: "Engaging stakeholder updates",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "Corporate",
      focus: "Transparency"
    }
  ];

  // Combine all examples for "all" category
  const allScripts = [
    ...youtubeScripts,
    ...podcastScripts,
    ...socialScripts,
    ...businessScripts
  ];

  // Filter scripts based on active category
  const getFilteredItems = () => {
    switch (activeCategory) {
      case "youtube":
        return youtubeScripts;
      case "podcast":
        return podcastScripts;
      case "social":
        return socialScripts;
      case "business":
        return businessScripts;
      default:
        // For "all", show a selection of scripts from different categories
        return allScripts.filter((_, index) => index % 4 === 0).slice(0, 8);
    }
  };

  const filteredItems = getFilteredItems();

  const handleCategoryChange = (category: ScriptCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-start mb-12 lg:mb-20">
          <div className="lg:w-1/3 mb-10 lg:mb-0 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-vid-blue-100 text-vid-blue-700 font-medium border border-vid-blue-200 mb-5"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-accent mr-2"></span>
              Script Examples
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-vid-blue-900 gradient-text mb-6 heading-font"
            >
              For Every Platform
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-vid-blue-700 text-lg mb-10"
            >
              Explore our script writing expertise across different content formats and platforms
            </motion.p>
            
            {/* Category tabs - vertical orientation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col space-y-3 mb-8"
            >
              {[
                { id: "all", label: "Featured Scripts" },
                { id: "youtube", label: "YouTube" },
                { id: "podcast", label: "Podcast" },
                { id: "social", label: "Social Media" },
                { id: "business", label: "Business" }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id as ScriptCategory)}
                  className={`text-left px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 heading-font flex items-center ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-vid-blue-50 to-white text-vid-blue-900 shadow-md border-l-4 border-accent"
                      : "bg-white text-vid-blue-700 hover:bg-vid-blue-50"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    activeCategory === category.id
                      ? "bg-accent"
                      : "bg-vid-blue-300"
                  }`}></span>
                  {category.label}
                </button>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden lg:block mt-12"
            >
              <a
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-accent-hover text-white rounded-xl font-medium shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Get Your Script Written</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
          
          {/* Script examples - masonry layout */}
          <div className="lg:w-2/3 lg:pl-16">
            <div className="mb-6 pb-6 border-b border-vid-blue-100 lg:hidden">
              <div className="text-vid-blue-800 font-medium mb-3">Filter by platform:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "Featured" },
                  { id: "youtube", label: "YouTube" },
                  { id: "podcast", label: "Podcast" },
                  { id: "social", label: "Social" },
                  { id: "business", label: "Business" }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id as ScriptCategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-accent text-white"
                        : "bg-vid-blue-50 text-vid-blue-700"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="columns-1 md:columns-2 gap-6 space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredItems.map((item, index) => {
                  // Alternate larger items for visual interest (first and every fourth)
                  const isLarge = index === 0 || index % 4 === 0;
                  
                  return (
                    <motion.div
                      key={item.id}
                      className={`break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-lg border border-vid-blue-100 hover:shadow-xl transition-all duration-300 group ${isLarge ? 'md:col-span-2' : ''}`}
                      variants={itemVariants}
                    >
                      <div className="relative">
                        <div className="aspect-video md:aspect-auto md:h-48 relative overflow-hidden">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            width={400}
                            height={225}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-vid-blue-900/80 to-transparent opacity-60"></div>
                          
                          <div className="absolute bottom-0 left-0 w-full p-4">
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-accent/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                {item.format}
                              </span>
                              <span className="bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                {item.focus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-vid-blue-900 heading-font mb-2">{item.title}</h3>
                        <p className="text-vid-blue-700 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center lg:hidden"
            >
              <a
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-accent-hover text-white rounded-xl font-medium shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Get Your Script Written</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 