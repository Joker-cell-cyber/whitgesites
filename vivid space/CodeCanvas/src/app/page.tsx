"use client";

import React from "react";
import { Hero } from "./components/sections/Hero";
import { ContactForm } from "./components/sections/ContactForm";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePagePricingSection } from "./components/sections/PricingSection";
import { WhatWeDo } from "./components/sections/WhatWeDo";
import { AboutSection } from "./components/sections/AboutSection";
import { DetailedServices } from "./components/sections/DetailedServices";
import NewsletterPopupWrapper from "./components/NewsletterPopupWrapper";
import GDPRWrapper from "./components/GDPRWrapper";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <DetailedServices />
        <HomePagePricingSection />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
      <NewsletterPopupWrapper />
      <GDPRWrapper />
    </>
  );
}
