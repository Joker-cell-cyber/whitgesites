"use client";

import { motion } from "framer-motion";
import BoostPricingPackages from "../pricing/BoostPricingPackages";

export default function PricingSection() {
  return (
    <section className="py-20 bg-[#070b14]" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Boosting Plans</span>
            </h2>
          </motion.div>
        </div>

        {/* Show boost pricing packages component */}
        <BoostPricingPackages />
      </div>
    </section>
  );
} 