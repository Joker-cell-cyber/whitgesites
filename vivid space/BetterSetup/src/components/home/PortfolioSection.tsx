"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

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

type VideoCategory = "all" | "business" | "lifestyle" | "education" | "entertainment";

interface VideoExample {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: VideoCategory[];
  industry: string;
  purpose: string;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("all");

  // Business videos
  const businessVideos: VideoExample[] = [
    {
      id: 101,
      title: "Corporate Overview",
      description: "Professional company presentations",
      thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "Corporate",
      purpose: "Brand showcase"
    },
    {
      id: 102,
      title: "Product Launch",
      description: "Introducing new products to the market",
      thumbnail: "https://images.unsplash.com/photo-1603575448360-153f093fd0b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "Retail",
      purpose: "Product marketing"
    },
    {
      id: 103,
      title: "Investor Pitch",
      description: "Compelling presentations for funding",
      thumbnail: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "Finance",
      purpose: "Fundraising"
    },
    {
      id: 104,
      title: "Company Culture",
      description: "Showcase workplace environment",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "HR",
      purpose: "Recruitment"
    },
    {
      id: 105,
      title: "Service Explainer",
      description: "Clarify complex services visually",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "B2B",
      purpose: "Lead generation"
    },
    {
      id: 106,
      title: "Annual Report",
      description: "Visual presentation of company performance",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "Finance",
      purpose: "Shareholder relations"
    },
    {
      id: 107,
      title: "Client Testimonial",
      description: "Success stories from satisfied customers",
      thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "Marketing",
      purpose: "Social proof"
    },
    {
      id: 108,
      title: "Trade Show Content",
      description: "Attract attention at industry events",
      thumbnail: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      industry: "Events",
      purpose: "Lead capture"
    }
  ];

  // Lifestyle videos
  const lifestyleVideos: VideoExample[] = [
    {
      id: 201,
      title: "Travel Vlog",
      description: "Document exciting journeys",
      thumbnail: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Travel",
      purpose: "Inspire adventure"
    },
    {
      id: 202,
      title: "Fitness Journey",
      description: "Document transformation and workouts",
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Fitness",
      purpose: "Motivate audience"
    },
    {
      id: 203,
      title: "Day in the Life",
      description: "Share personal daily routines",
      thumbnail: "https://images.unsplash.com/photo-1607872155422-478cdb8bc0e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Personal",
      purpose: "Build connection"
    },
    {
      id: 204,
      title: "Home Decor",
      description: "Interior design transformations",
      thumbnail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Interior Design",
      purpose: "Inspire creativity"
    },
    {
      id: 205,
      title: "Fashion Lookbook",
      description: "Seasonal style collections",
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Fashion",
      purpose: "Showcase trends"
    },
    {
      id: 206,
      title: "Food Journey",
      description: "Culinary adventures and recipes",
      thumbnail: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Food",
      purpose: "Cooking inspiration"
    },
    {
      id: 207,
      title: "Wellness Routine",
      description: "Self-care and mindfulness practices",
      thumbnail: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "Wellness",
      purpose: "Promote health"
    },
    {
      id: 208,
      title: "Urban Exploration",
      description: "Discovering hidden city gems",
      thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["lifestyle"],
      industry: "City Life",
      purpose: "Local discovery"
    }
  ];

  // Education videos
  const educationVideos: VideoExample[] = [
    {
      id: 301,
      title: "Software Tutorial",
      description: "Step-by-step technical guides",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Technology",
      purpose: "Skills training"
    },
    {
      id: 302,
      title: "Academic Course",
      description: "Comprehensive educational content",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Higher Education",
      purpose: "Knowledge sharing"
    },
    {
      id: 303,
      title: "DIY Project",
      description: "Hands-on crafting tutorials",
      thumbnail: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Crafts",
      purpose: "Creative instruction"
    },
    {
      id: 304,
      title: "Language Lesson",
      description: "Learn new languages efficiently",
      thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Languages",
      purpose: "Communication skills"
    },
    {
      id: 305,
      title: "Science Explainer",
      description: "Making complex concepts accessible",
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Science",
      purpose: "Knowledge building"
    },
    {
      id: 306,
      title: "Professional Development",
      description: "Career growth and skill enhancement",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Career",
      purpose: "Professional growth"
    },
    {
      id: 307,
      title: "Financial Literacy",
      description: "Understanding personal finance",
      thumbnail: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "Finance",
      purpose: "Money management"
    },
    {
      id: 308,
      title: "Historical Documentary",
      description: "Exploring the past with depth",
      thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["education"],
      industry: "History",
      purpose: "Cultural awareness"
    }
  ];

  // Entertainment videos
  const entertainmentVideos: VideoExample[] = [
    {
      id: 401,
      title: "Short Film",
      description: "Compelling visual storytelling",
      thumbnail: "https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Film",
      purpose: "Artistic expression"
    },
    {
      id: 402,
      title: "Music Video",
      description: "Visual accompaniment to songs",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Music",
      purpose: "Artist promotion"
    },
    {
      id: 403,
      title: "Comedy Sketch",
      description: "Short-form humor content",
      thumbnail: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Comedy",
      purpose: "Entertain audience"
    },
    {
      id: 404,
      title: "Animation",
      description: "Bringing imaginative worlds to life",
      thumbnail: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Animation",
      purpose: "Creative storytelling"
    },
    {
      id: 405,
      title: "Gaming Content",
      description: "Gameplay, reviews and walkthroughs",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Gaming",
      purpose: "Community building"
    },
    {
      id: 406,
      title: "Reality Show",
      description: "Unscripted life events",
      thumbnail: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Television",
      purpose: "Reality documentation"
    },
    {
      id: 407,
      title: "Reaction Video",
      description: "Authentic responses to content",
      thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Social Media",
      purpose: "Engagement boost"
    },
    {
      id: 408,
      title: "Sports Highlight",
      description: "Best moments from sporting events",
      thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["entertainment"],
      industry: "Sports",
      purpose: "Fan engagement"
    }
  ];

  // Combine all examples for "all" category
  const allVideos = [
    ...businessVideos,
    ...lifestyleVideos,
    ...educationVideos,
    ...entertainmentVideos
  ];

  // Filter videos based on active category
  const getFilteredItems = () => {
    switch (activeCategory) {
      case "business":
        return businessVideos;
      case "lifestyle":
        return lifestyleVideos;
      case "education":
        return educationVideos;
      case "entertainment":
        return entertainmentVideos;
      default:
        // For "all", show a selection of 8 videos from different categories
        return allVideos.filter((_, index) => index % 4 === 0).slice(0, 8);
    }
  };

  const filteredItems = getFilteredItems();

  const handleCategoryChange = (category: VideoCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Video Solutions</span> For Every Need
            </h2>
            <p className="text-gray-300 text-lg">
              Discover the range of video styles and formats we can create for your specific industry and goals
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Featured Projects
          </button>
          <button
            onClick={() => handleCategoryChange("business")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "business"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => handleCategoryChange("lifestyle")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "lifestyle"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Lifestyle
          </button>
          <button
            onClick={() => handleCategoryChange("education")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "education"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Education
          </button>
          <button
            onClick={() => handleCategoryChange("entertainment")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "entertainment"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Entertainment
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
                  className="rounded-2xl overflow-hidden relative group border border-gray-800 shadow-xl shadow-indigo-500/5"
                  variants={itemVariants}
                  layout
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                      <div className="flex items-center text-xs text-gray-300 mt-2">
                        <span className="bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded">
                          {item.industry}
                        </span>
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-500 mx-2"></span>
                        <span className="text-gray-400">
                          {item.purpose}
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
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
          >
            <span>Start Your Project</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 