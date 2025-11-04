"use client";

import { motion } from "framer-motion";
import { Satellite, Droplets, Gauge, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: <Satellite className="w-8 h-8 text-cyan-400" />,
    title: "Collect & Analyze Data",
    desc: "RainCheck gathers regional rainfall, soil, and satellite data to build precise hydrological insights.",
    glow: "from-cyan-400/10 to-transparent",
  },
  {
    icon: <Droplets className="w-8 h-8 text-amber-400" />,
    title: "Model Catchment Potential",
    desc: "It simulates rainfall patterns, urban runoff, and roof-water capture efficiency for your location.",
    glow: "from-amber-400/10 to-transparent",
  },
  {
    icon: <Gauge className="w-8 h-8 text-emerald-400" />,
    title: "Evaluate Feasibility",
    desc: "Analyzes recharge capacity, cost efficiency, and storage potential for sustainable adoption.",
    glow: "from-emerald-400/10 to-transparent",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
    title: "Deliver Smart Insights",
    desc: "Generates rich visuals — demand coverage, ROI, and environmental impact tailored to your home.",
    glow: "from-blue-400/10 to-transparent",
  },
];

export default function WhatRainCheckDoes() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#0A0A0B] via-[#0B0B0C] to-[#0E0E10] text-gray-100 overflow-hidden">
      {/* 🌌 Ambient Lighting */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[10%] w-[600px] h-[600px] bg-amber-500/10 blur-[160px] rounded-full" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center px-6"
      >
        <h2 className="text-4xl sm:text-5xl font-light mb-6">
          How{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent font-medium">
            RainCheck
          </span>{" "}
          Works
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          A premium 4-step system that transforms rainfall data into meaningful, actionable insights.
        </p>
      </motion.div>

      {/* Step Flow */}
      <div className="relative mt-20 max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-stretch gap-10 md:gap-6">
        {/* connecting line (desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-400/5 via-amber-400/10 to-emerald-400/5" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.03,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              mass: 0.5,
              delay: i * 0.12,
            }}
            className="relative z-10 group flex flex-col justify-between items-center text-center bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full md:w-[22%] min-h-[320px] shadow-[0_0_25px_rgba(0,0,0,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] transition-all duration-500 will-change-transform"
          >
            {/* smooth inner glow */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${step.glow} rounded-2xl blur-lg`}
            />

            <motion.div
              whileHover={{ rotate: 4, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="mb-5 relative z-10"
            >
              {step.icon}
            </motion.div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <h3 className="text-lg font-semibold mb-2 text-white">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>

            {/* connecting dot (desktop only) */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 right-[-14px] w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-amber-400 rounded-full opacity-80" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center text-sm text-gray-500"
      >
        Each stage powered by{" "}
        <span className="text-amber-400">geospatial intelligence</span> and{" "}
        <span className="text-cyan-400">AI-driven rainfall modeling</span>.
      </motion.div>
    </section>
  );
}
