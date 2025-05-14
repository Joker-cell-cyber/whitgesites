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

type MealCategory = "all" | "keto" | "vegan" | "balanced" | "high-protein";

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
    <section className="py-24 bg-white" id="featured-meals">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Featured <span className="gradient-text">Meal Preps</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Browse our collection of nutritionist-designed meal preparations categorized by dietary preferences.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Meal Preps
          </button>
          <button
            onClick={() => handleCategoryChange("keto")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "keto" 
                ? "bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Keto
          </button>
          <button
            onClick={() => handleCategoryChange("vegan")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "vegan" 
                ? "bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Vegan
          </button>
          <button
            onClick={() => handleCategoryChange("balanced")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "balanced" 
                ? "bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Balanced
          </button>
          <button
            onClick={() => handleCategoryChange("high-protein")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "high-protein" 
                ? "bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            High Protein
          </button>
        </div>

        {/* Grid Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
            {getFilteredItems().map((item) => (
                <motion.div
                  key={item.id}
                className="card-hover rounded-xl overflow-hidden"
                  variants={itemVariants}
                >
                <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  <div className="absolute top-2 right-2 bg-white rounded-full py-1 px-2 text-xs font-medium text-nutrition-green-700">
                    {item.prepTime}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-center border-t pt-3">
                    <div>
                      <div className="text-xs text-gray-500">Calories</div>
                      <div className="font-semibold text-gray-800">{item.calories}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Protein</div>
                      <div className="font-semibold text-gray-800">{item.protein}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Carbs</div>
                      <div className="font-semibold text-gray-800">{item.carbs}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
      </div>
    </section>
  );
} 