"use client";

import { motion } from "framer-motion";
import { LeafletSafeMap } from "./LeafletSafeMap";

export default function ProblemStatement() {
  return (
    <section className="relative w-full py-20 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#0f0f0f] text-gray-100 overflow-hidden">
      {/* 🔮 Ambient Gradient Lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full" />
      </div>

      {/* 🧠 Headline Section */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6"
        >
          India’s Urban{" "}
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent font-medium">
            Water Challenge
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-gray-400 text-lg sm:text-xl leading-relaxed"
        >
          By 2030, <span className="text-amber-400">21 Indian cities</span> could run
          out of usable water. Urban homes rely on costly groundwater and tankers — 
          even though <span className="text-white">60–70% of rainfall</span> could meet
          this demand if sustainably harvested.
        </motion.p>
      </div>

      {/* 💧 Interactive Map Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-6xl mt-16 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
      >
        <LeafletSafeMap />

        {/* 🫧 Subtle Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none"
        />
      </motion.div>

      {/* 🧊 Floating Glass Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-sm text-gray-300 shadow-md"
      >
        🌧️ Rainfall Density & Water Stress Zones (Data Layer Preview)
      </motion.div>
    </section>
  );
}
