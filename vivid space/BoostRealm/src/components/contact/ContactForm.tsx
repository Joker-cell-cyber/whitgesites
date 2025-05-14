"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Codename must be at least 2 characters"),
  email: z.string().email("Valid email comms channel required"),
  game: z.string().min(1, "Target game must be selected"),
  platform: z.string().min(1, "Platform selection required"),
  service: z.string().min(1, "Mission type must be specified"),
  budget: z.string().min(1, "Resource allocation must be defined"),
  message: z.string().min(10, "Mission parameters must be at least 10 characters"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Operational terms must be accepted",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      game: "",
      platform: "",
      service: "",
      budget: "",
      message: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Mission submitted:", data);
      
      // Reset form on success
      reset();
      
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Mission submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0c1220] rounded-xl shadow-xl p-8 border border-gray-800 pixel-corners relative"
    >
      <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 text-toxic-green-500 text-xs font-mono m-2 border border-toxic-green-500/30 rounded">
        SECURE_TRANSMISSION
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-white flex items-center">
        <svg className="w-5 h-5 mr-2 text-neon-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        MISSION BRIEFING
      </h2>
      
      <div className="loading-bar mb-4"></div>
      
      <p className="text-gray-400 mb-8 font-mono text-sm border-l-2 border-toxic-green-500/30 pl-3">
        Complete the tactical parameters below with your gaming objectives. Our elite squad will deploy
        within 24 hours with a custom operation plan and extraction timeline.
      </p>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-toxic-green-900/20 border border-toxic-green-700 rounded-lg terminal-frame">
          <p className="text-toxic-green-400 font-mono flex items-center">
            <span className="w-3 h-3 bg-toxic-green-500 rounded-full mr-2 animate-pulse"></span>
            TRANSMISSION SUCCESSFUL. MISSION REQUEST RECEIVED. OUR OPERATORS WILL RESPOND WITHIN 24 HOURS.
          </p>
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 flex items-center">
              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                01
              </span>
              AGENT CODENAME
            </label>
            <input
              id="name"
              {...register("name")}
              className={`w-full px-4 py-3 bg-black/50 border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
              placeholder="AGENT_ALPHA"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 font-mono">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 flex items-center">
              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                02
              </span>
              COMMS CHANNEL
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 bg-black/50 border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
              placeholder="agent@domain.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-mono">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="game" className="block text-sm font-medium text-gray-300 flex items-center">
              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                03
              </span>
              TARGET GAME
            </label>
            <Controller
              name="game"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger 
                    id="game"
                    className={`w-full px-4 py-3 bg-black/50 border ${
                      errors.game ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
                  >
                    <SelectValue placeholder="SELECT TARGET" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0c1220] border border-gray-700">
                    <SelectItem value="wow">World of Warcraft</SelectItem>
                    <SelectItem value="diablo4">Diablo IV</SelectItem>
                    <SelectItem value="gta">GTA Online</SelectItem>
                    <SelectItem value="ffxiv">Final Fantasy XIV</SelectItem>
                    <SelectItem value="eso">Elder Scrolls Online</SelectItem>
                    <SelectItem value="other">Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.game && (
              <p className="mt-1 text-sm text-red-500 font-mono">{errors.game.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="platform" className="block text-sm font-medium text-gray-300 flex items-center">
              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                04
              </span>
              COMBAT PLATFORM
            </label>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger 
                    id="platform"
                    className={`w-full px-4 py-3 bg-black/50 border ${
                      errors.platform ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
                  >
                    <SelectValue placeholder="SELECT PLATFORM" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0c1220] border border-gray-700">
                    <SelectItem value="pc">PC</SelectItem>
                    <SelectItem value="playstation">PlayStation</SelectItem>
                    <SelectItem value="xbox">Xbox</SelectItem>
                    <SelectItem value="switch">Nintendo Switch</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.platform && (
              <p className="mt-1 text-sm text-red-500 font-mono">{errors.platform.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 flex items-center">
            <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
              05
            </span>
            MISSION TYPE
          </label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger 
                  id="service"
                  className={`w-full px-4 py-3 bg-black/50 border ${
                    errors.service ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
                >
                  <SelectValue placeholder="SELECT OPERATION" />
                </SelectTrigger>
                <SelectContent className="bg-[#0c1220] border border-gray-700">
                  <SelectItem value="leveling">Character Power Leveling</SelectItem>
                  <SelectItem value="resource">Resource Acquisition</SelectItem>
                  <SelectItem value="quests">Quest Line Completion</SelectItem>
                  <SelectItem value="raid">Raid Carries & Boosting</SelectItem>
                  <SelectItem value="tournament">Tournament Representation</SelectItem>
                  <SelectItem value="achievement">Achievement Hunting</SelectItem>
                  <SelectItem value="custom">Custom Combat Operation</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.service && (
            <p className="mt-1 text-sm text-red-500 font-mono">{errors.service.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-300 flex items-center">
            <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
              06
            </span>
            RESOURCE ALLOCATION
          </label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger 
                  id="budget"
                  className={`w-full px-4 py-3 bg-black/50 border ${
                    errors.budget ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
                >
                  <SelectValue placeholder="SELECT BUDGET RANGE" />
                </SelectTrigger>
                <SelectContent className="bg-[#0c1220] border border-gray-700">
                  <SelectItem value="tier1">TIER 1: $10-$50</SelectItem>
                  <SelectItem value="tier2">TIER 2: $50-$100</SelectItem>
                  <SelectItem value="tier3">TIER 3: $100-$250</SelectItem>
                  <SelectItem value="tier4">TIER 4: $250-$500</SelectItem>
                  <SelectItem value="tier5">TIER 5: $500+</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500 font-mono">{errors.budget.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 flex items-center">
            <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
              07
            </span>
            MISSION PARAMETERS
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            className={`w-full px-4 py-3 bg-black/50 border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono`}
            placeholder="Specify your tactical objectives, target resources, and timeline requirements..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500 font-mono">{errors.message.message}</p>
          )}
        </div>
        
        <div className="flex items-start mt-6">
          <div className="flex items-center h-5">
            <input
              id="termsAccepted"
              type="checkbox"
              {...register("termsAccepted")}
              className="w-4 h-4 bg-black/50 border-gray-700 rounded focus:ring-neon-pink-500 text-neon-pink-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="termsAccepted" className="text-gray-300">
              I accept the <a href="#" className="text-neon-pink-400 hover:text-neon-pink-300">operational terms</a> and <a href="#" className="text-neon-pink-400 hover:text-neon-pink-300">security protocols</a>
            </label>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-500 font-mono">{errors.termsAccepted.message}</p>
            )}
          </div>
        </div>
        
        <Button
          type="submit"
          variant="game"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 mt-4 rounded-lg bg-gradient-to-r from-plasma-purple-600 to-neon-pink-600 text-white font-medium button-glow transition-all ${
            isSubmitting ? "opacity-80" : "hover:shadow-neon-glow hover:-translate-y-0.5"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              DEPLOYING...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              DEPLOY ELITE SQUAD
            </span>
          )}
        </Button>
      </form>
    </motion.div>
  );
} 