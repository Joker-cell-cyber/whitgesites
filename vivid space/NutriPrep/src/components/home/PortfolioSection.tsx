"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type MealCategory = "all" | "keto" | "vegan" | "balanced" | "high-protein" | "breakfast" | "lunch" | "dinner" | "snacks";

interface MealPrepExample {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: MealCategory[];
  prepTime: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<MealCategory>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  // Keto Meal Preps
  const ketoMealPreps: MealPrepExample[] = [
    {
      id: 101,
      title: "Salmon Poke Bowl",
      description: "Fresh salmon with rice and vegetables",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["keto"],
      prepTime: "25 mins",
      calories: "410",
      protein: "28g",
      carbs: "12g",
      fat: "24g"
    },
    {
      id: 102,
      title: "Stuffed Avocado Halves",
      description: "Protein-packed stuffed avocados",
      thumbnail: "https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["keto"],
      prepTime: "15 mins",
      calories: "320",
      protein: "12g",
      carbs: "8g",
      fat: "28g"
    },
    {
      id: 103,
      title: "Spinach Feta Egg Muffins",
      description: "Perfect grab-and-go breakfast option",
      thumbnail: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["keto"],
      prepTime: "20 mins",
      calories: "280",
      protein: "16g",
      carbs: "3g",
      fat: "22g"
    },
    {
      id: 104,
      title: "Baked Salmon & Asparagus",
      description: "Omega-rich dinner prep for the week",
      thumbnail: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["keto"],
      prepTime: "35 mins",
      calories: "410",
      protein: "32g",
      carbs: "6g",
      fat: "28g"
    }
  ];

  // Vegan Meal Preps
  const veganMealPreps: MealPrepExample[] = [
    {
      id: 201,
      title: "Buddha Bowls",
      description: "Nutrient-dense plant-based meal",
      thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["vegan"],
      prepTime: "30 mins",
      calories: "380",
      protein: "14g",
      carbs: "52g",
      fat: "12g"
    },
    {
      id: 202,
      title: "Lentil & Vegetable Stew",
      description: "Protein-packed comfort food",
      thumbnail: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["vegan"],
      prepTime: "40 mins",
      calories: "320",
      protein: "16g",
      carbs: "48g",
      fat: "6g"
    },
    {
      id: 203,
      title: "Overnight Chia Pudding",
      description: "Omega-rich breakfast option",
      thumbnail: "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["vegan"],
      prepTime: "10 mins",
      calories: "290",
      protein: "9g",
      carbs: "32g",
      fat: "15g"
    }
  ];

  // Balanced Meal Preps
  const balancedMealPreps: MealPrepExample[] = [
    {
      id: 301,
      title: "Grilled Chicken & Roasted Veggies",
      description: "Classic balanced meal prep combo",
      thumbnail: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["balanced"],
      prepTime: "35 mins",
      calories: "420",
      protein: "35g",
      carbs: "30g",
      fat: "14g"
    },
    {
      id: 302,
      title: "Glazed Salmon",
      description: "Salmon with orange honey glaze",
      thumbnail: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["balanced"],
      prepTime: "25 mins",
      calories: "380",
      protein: "32g",
      carbs: "18g",
      fat: "16g"
    },
    {
      id: 303,
      title: "Mediterranean Pasta Salad",
      description: "Nutrient-rich lunch option",
      thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["balanced"],
      prepTime: "25 mins",
      calories: "360",
      protein: "18g",
      carbs: "42g",
      fat: "16g"
    }
  ];

  // High Protein Meal Preps
  const highProteinMealPreps: MealPrepExample[] = [
    {
      id: 401,
      title: "Raspberry Protein Cake",
      description: "Sweet high-protein dessert option",
      thumbnail: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["high-protein"],
      prepTime: "40 mins",
      calories: "320",
      protein: "24g",
      carbs: "28g",
      fat: "12g"
    },
    {
      id: 402,
      title: "Greek Yogurt Protein Parfait",
      description: "Protein-packed breakfast or snack",
      thumbnail: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["high-protein"],
      prepTime: "10 mins",
      calories: "320",
      protein: "26g",
      carbs: "32g",
      fat: "10g"
    },
    {
      id: 403,
      title: "Shrimp & Quinoa Bowl",
      description: "Lean protein with complex carbs",
      thumbnail: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["high-protein"],
      prepTime: "35 mins",
      calories: "410",
      protein: "38g",
      carbs: "36g",
      fat: "8g"
    },
    {
      id: 404,
      title: "Protein Pancake Meal Prep",
      description: "Sweet & satisfying high-protein breakfast",
      thumbnail: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: ["high-protein"],
      prepTime: "20 mins",
      calories: "370",
      protein: "28g",
      carbs: "40g",
      fat: "12g"
    }
  ];

  const getFilteredItems = () => {
    const allItems = [...ketoMealPreps, ...veganMealPreps, ...balancedMealPreps, ...highProteinMealPreps];
    
    if (activeCategory === "all") {
      return allItems;
    }
    
    return allItems.filter(item => item.category.includes(activeCategory));
  };

  const handleCategoryChange = (category: MealCategory) => {
      setActiveCategory(category);
  };

  return (
    <section className="py-24 bg-neutral-50" id="featured-meals" ref={containerRef}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Header Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-6">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4 md:mb-0 max-w-xl">
                Featured <span className="text-turquoise-500">Meal</span> Preps
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Browse our most popular meal prep ideas categorized by dietary preferences and nutritional profiles.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3"
          >
            <button
              onClick={() => handleCategoryChange("all")}
              className={`py-3 px-4 text-center font-medium transition-all border-b-2 ${
                activeCategory === "all"
                  ? "text-turquoise-600 border-turquoise-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              All Meals
            </button>
            <button
              onClick={() => handleCategoryChange("keto")}
              className={`py-3 px-4 text-center font-medium transition-all border-b-2 ${
                activeCategory === "keto"
                  ? "text-turquoise-600 border-turquoise-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Keto
            </button>
            <button
              onClick={() => handleCategoryChange("vegan")}
              className={`py-3 px-4 text-center font-medium transition-all border-b-2 ${
                activeCategory === "vegan"
                  ? "text-turquoise-600 border-turquoise-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Vegan
            </button>
            <button
              onClick={() => handleCategoryChange("balanced")}
              className={`py-3 px-4 text-center font-medium transition-all border-b-2 ${
                activeCategory === "balanced"
                  ? "text-turquoise-600 border-turquoise-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Balanced
            </button>
            <button
              onClick={() => handleCategoryChange("high-protein")}
              className={`py-3 px-4 text-center font-medium transition-all border-b-2 ${
                activeCategory === "high-protein"
                  ? "text-turquoise-600 border-turquoise-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              High-Protein
            </button>
          </motion.div>
        </div>

        {/* Meal Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto"
            >
              {getFilteredItems().map((item, index) => {
                const isHighlighted = index === 0 || index === 5;
                const colSpan = isHighlighted ? 'md:col-span-6' : 'md:col-span-4';
                const rowSpan = isHighlighted ? 'md:row-span-2' : '';
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`${colSpan} ${rowSpan} group cursor-pointer`}
                  >
                    <div className="h-full rounded-xl bg-white overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-turquoise-200 flex flex-col">
                      <div className="relative overflow-hidden">
                        <div className="aspect-video md:aspect-square relative">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-xs uppercase tracking-wider rounded-full">
                            {item.category[0]}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-turquoise-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-turquoise-50 text-turquoise-600 mr-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700">{item.prepTime}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-50 text-purple-600 mr-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700">{item.calories} cal</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 mr-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700">P: {item.protein}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <a href="#pricing" className="inline-block py-3 px-8 bg-turquoise-500 text-white font-medium rounded-lg shadow-sm hover:bg-turquoise-600 transition-colors duration-300">
            Get More Meal Prep Ideas
          </a>
        </motion.div>
      </div>
    </section>
  );
} 