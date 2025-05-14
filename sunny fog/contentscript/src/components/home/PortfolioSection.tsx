"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
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
    <section className="py-20" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Script Examples</span> For Every Platform
            </h2>
            <p className="text-gray-400 text-lg">
              Explore our script writing expertise across different content formats and platforms
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            Featured Scripts
          </button>
          <button
            onClick={() => handleCategoryChange("youtube")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "youtube"
                ? "bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            YouTube
          </button>
          <button
            onClick={() => handleCategoryChange("podcast")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "podcast"
                ? "bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            Podcast
          </button>
          <button
            onClick={() => handleCategoryChange("social")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "social"
                ? "bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => handleCategoryChange("business")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "business"
                ? "bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            Business
          </button>
        </div>

        {/* Examples Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="card-hover rounded-xl overflow-hidden relative group"
                  variants={itemVariants}
                  layout
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={400}
                      height={225}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                      <div className="flex items-center text-xs text-gray-300 mt-2">
                        <span className="bg-script-blue-500/30 text-script-blue-300 px-2 py-0.5 rounded">
                          {item.format}
                        </span>
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-500 mx-2"></span>
                        <span className="text-gray-400">
                          {item.focus}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white rounded-lg font-medium button-glow"
          >
            <span>Get Your Script Written</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 