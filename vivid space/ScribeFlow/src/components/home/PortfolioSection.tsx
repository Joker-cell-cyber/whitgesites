"use client";

import { useState, useRef } from "react";
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

// Ajouté pour les styles CSS personnalisés
const bookStyles = `
  .perspective {
    perspective: 1000px;
  }
  
  .transform-3d {
    transform-style: preserve-3d;
  }
  
  .preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-10 {
    transform: rotateY(10deg);
  }
  
  .rotate-y-90 {
    transform: rotateY(90deg);
  }
  
  .origin-left {
    transform-origin: left;
  }
`;

type BookCategory = "all" | "business" | "educational" | "fiction" | "memoir";

interface BookExample {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  category: BookCategory[];
  format: string;
  pages: string;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<BookCategory>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  // Business books
  const businessBooks: BookExample[] = [
    {
      id: 101,
      title: "Business Leadership Principles",
      description: "Executive strategies for modern management",
      coverImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "PDF & Print",
      pages: "240 pages"
    },
    {
      id: 102,
      title: "Marketing Fundamentals",
      description: "Essential strategies for digital growth",
      coverImage: "https://images.unsplash.com/photo-1603575448360-153f093fd0b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "EPUB",
      pages: "185 pages"
    },
    {
      id: 103,
      title: "Financial Independence",
      description: "Personal wealth growth strategies",
      coverImage: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "All formats",
      pages: "320 pages"
    },
    {
      id: 104,
      title: "Startup Growth Handbook",
      description: "Scale your business efficiently",
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "PDF",
      pages: "210 pages"
    },
    {
      id: 105,
      title: "Productivity Masters",
      description: "Work less, achieve more",
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "EPUB & MOBI",
      pages: "175 pages"
    },
    {
      id: 106,
      title: "Corporate Innovation",
      description: "Disrupt from within",
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["business"],
      format: "PDF & EPUB",
      pages: "265 pages"
    }
  ];

  // Educational books
  const educationalBooks: BookExample[] = [
    {
      id: 201,
      title: "Complete Guide to Python",
      description: "Programming from basics to advanced",
      coverImage: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["educational"],
      format: "PDF & Print",
      pages: "520 pages"
    },
    {
      id: 202,
      title: "History of Civilizations",
      description: "From ancient times to modernity",
      coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["educational"],
      format: "All formats",
      pages: "480 pages"
    },
    {
      id: 203,
      title: "The Science of Nutrition",
      description: "Evidence-based dietary guidelines",
      coverImage: "https://images.unsplash.com/photo-1607872155422-478cdb8bc0e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["educational"],
      format: "EPUB",
      pages: "290 pages"
    },
    {
      id: 204,
      title: "Physics Fundamentals",
      description: "Clear explanations of complex theories",
      coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["educational"],
      format: "PDF & EPUB",
      pages: "310 pages"
    },
    {
      id: 205,
      title: "Foreign Language Made Easy",
      description: "Accelerated language acquisition",
      coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["educational"],
      format: "All formats",
      pages: "220 pages"
    },
    {
      id: 206,
      title: "Art & Design Principles",
      description: "Visual creativity fundamentals",
      coverImage: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["educational"],
      format: "PDF & Print",
      pages: "245 pages"
    }
  ];

  // Fiction books
  const fictionBooks: BookExample[] = [
    {
      id: 301,
      title: "The Hidden Prophecy",
      description: "Epic fantasy adventure",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["fiction"],
      format: "All formats",
      pages: "420 pages"
    },
    {
      id: 302,
      title: "City of Whispers",
      description: "Mystery thriller",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["fiction"],
      format: "EPUB & MOBI",
      pages: "380 pages"
    },
    {
      id: 303,
      title: "Love Across Time",
      description: "Historical romance",
      coverImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["fiction"],
      format: "PDF & EPUB",
      pages: "340 pages"
    },
    {
      id: 304,
      title: "Star Boundaries",
      description: "Science fiction adventure",
      coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["fiction"],
      format: "All formats",
      pages: "460 pages"
    },
    {
      id: 305,
      title: "The Shadow Protocol",
      description: "Espionage thriller",
      coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["fiction"],
      format: "EPUB & MOBI",
      pages: "370 pages"
    },
    {
      id: 306,
      title: "Echoes of the Past",
      description: "Literary drama",
      coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["fiction"],
      format: "PDF & EPUB",
      pages: "295 pages"
    }
  ];

  // Memoir books
  const memoirBooks: BookExample[] = [
    {
      id: 401,
      title: "Mountain Journey",
      description: "Adventure and self-discovery",
      coverImage: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["memoir"],
      format: "All formats",
      pages: "265 pages"
    },
    {
      id: 402,
      title: "My Entrepreneurial Path",
      description: "Building a business empire",
      coverImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["memoir"],
      format: "PDF & Print",
      pages: "290 pages"
    },
    {
      id: 403,
      title: "Life in Medicine",
      description: "Tales from a surgeon's career",
      coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["memoir"],
      format: "EPUB & MOBI",
      pages: "320 pages"
    },
    {
      id: 404,
      title: "From War to Peace",
      description: "A veteran's story",
      coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["memoir"],
      format: "All formats",
      pages: "310 pages"
    },
    {
      id: 405,
      title: "Cultural Roots",
      description: "Heritage and identity",
      coverImage: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["memoir"],
      format: "PDF & EPUB",
      pages: "240 pages"
    },
    {
      id: 406,
      title: "Recovery Journey",
      description: "Overcoming addiction",
      coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["memoir"],
      format: "EPUB & MOBI",
      pages: "230 pages"
    }
  ];

  // Combine all examples for "all" category
  const allBooks = [
    ...businessBooks.slice(0, 2),
    ...educationalBooks.slice(0, 2),
    ...fictionBooks.slice(0, 2),
    ...memoirBooks.slice(0, 2)
  ];

  // Filter books based on active category
  const getFilteredItems = () => {
    switch (activeCategory) {
      case "business":
        return businessBooks;
      case "educational":
        return educationalBooks;
      case "fiction":
        return fictionBooks;
      case "memoir":
        return memoirBooks;
      default:
        return allBooks;
    }
  };

  const filteredItems = getFilteredItems();

  const handleCategoryChange = (category: BookCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <section className="py-28 relative overflow-hidden" id="portfolio">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-scribe-amber-50/20 to-white"></div>
      <div className="absolute top-0 -right-48 w-96 h-96 bg-gradient-to-br from-scribe-indigo-200/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-48 w-96 h-96 bg-gradient-to-tr from-scribe-turquoise-200/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-scribe-indigo-100 text-scribe-indigo-800 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Our Portfolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-scribe-indigo-950">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">E-Books</span> We've Written
          </h2>
          
          <p className="text-scribe-indigo-700 text-lg">
            Explore examples of our work across different categories and industries
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" ref={containerRef}>
          <button
            onClick={() => handleCategoryChange("all")}
            className={`group relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-scribe-indigo-600 text-white shadow-md"
                : "bg-white/80 text-scribe-indigo-800 hover:bg-white hover:shadow-md border border-scribe-indigo-100"
            }`}
          >
            <span className="relative z-10">Featured</span>
            {activeCategory === "all" && (
              <motion.span
                layoutId="activeCategoryHighlight"
                className="absolute inset-0 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 rounded-full"
                initial={false}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </button>
          
          <button
            onClick={() => handleCategoryChange("business")}
            className={`group relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "business"
                ? "bg-scribe-indigo-600 text-white shadow-md"
                : "bg-white/80 text-scribe-indigo-800 hover:bg-white hover:shadow-md border border-scribe-indigo-100"
            }`}
          >
            <span className="relative z-10">Business</span>
            {activeCategory === "business" && (
              <motion.span
                layoutId="activeCategoryHighlight"
                className="absolute inset-0 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 rounded-full"
                initial={false}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </button>
          
          <button
            onClick={() => handleCategoryChange("educational")}
            className={`group relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "educational"
                ? "bg-scribe-indigo-600 text-white shadow-md"
                : "bg-white/80 text-scribe-indigo-800 hover:bg-white hover:shadow-md border border-scribe-indigo-100"
            }`}
          >
            <span className="relative z-10">Educational</span>
            {activeCategory === "educational" && (
              <motion.span
                layoutId="activeCategoryHighlight"
                className="absolute inset-0 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 rounded-full"
                initial={false}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </button>
          
          <button
            onClick={() => handleCategoryChange("fiction")}
            className={`group relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "fiction"
                ? "bg-scribe-indigo-600 text-white shadow-md"
                : "bg-white/80 text-scribe-indigo-800 hover:bg-white hover:shadow-md border border-scribe-indigo-100"
            }`}
          >
            <span className="relative z-10">Fiction</span>
            {activeCategory === "fiction" && (
              <motion.span
                layoutId="activeCategoryHighlight"
                className="absolute inset-0 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 rounded-full"
                initial={false}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </button>
          
          <button
            onClick={() => handleCategoryChange("memoir")}
            className={`group relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "memoir"
                ? "bg-scribe-indigo-600 text-white shadow-md" 
                : "bg-white/80 text-scribe-indigo-800 hover:bg-white hover:shadow-md border border-scribe-indigo-100"
            }`}
          >
            <span className="relative z-10">Memoir</span>
            {activeCategory === "memoir" && (
              <motion.span
                layoutId="activeCategoryHighlight"
                className="absolute inset-0 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 rounded-full"
                initial={false}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </button>
        </div>

        {/* Books Grid */}
        <div className="relative min-h-[400px] pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredItems.map((book) => (
                <motion.div
                  key={book.id}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Book cover with 3D effect */}
                  <div className="relative h-[320px] perspective">
                    <div className="absolute inset-0 transform-3d preserve-3d transition-transform duration-500 ease-out group-hover:rotate-y-10 shadow-2xl rounded-lg">
                      <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Book spine */}
                      <div className="absolute left-0 top-0 bottom-0 w-[10px] transform-3d origin-left rotate-y-90 bg-gradient-to-r from-scribe-indigo-800 to-scribe-indigo-900"></div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-scribe-indigo-900/80 via-scribe-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                      <div className="p-5 text-white">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-scribe-indigo-500/30 backdrop-blur-sm mb-2 inline-block">
                          {book.format}
                        </span>
                        <h3 className="text-lg font-bold mt-1">{book.title}</h3>
                        <p className="text-white/80 text-sm">{book.description}</p>
                        <div className="text-xs text-white/60 mt-2">{book.pages}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Book info (visible on mobile) */}
                  <div className="mt-4 md:hidden">
                    <h3 className="font-bold text-scribe-indigo-900">{book.title}</h3>
                    <p className="text-scribe-indigo-700 text-sm">{book.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 text-white font-medium transition-transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            <span>Start Your E-Book</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 