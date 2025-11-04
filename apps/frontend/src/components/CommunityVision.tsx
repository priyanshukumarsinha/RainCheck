"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Globe2, BarChart3 } from "lucide-react";

export default function CommunityVision() {
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number; duration: number }[]>([]);

  // Generate random positions *only on client*
  useEffect(() => {
    const p = Array.from({ length: 15 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 6,
    }));
    setParticles(p);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B0B0C] via-[#101316] to-[#1A0F06] text-gray-200">
      {/* Soft amber gradient aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,184,77,0.08),transparent_60%)]" />

      {/* Flowing ambient dots (client-rendered only) */}
      <div className="absolute w-full h-full overflow-hidden">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{
              y: [p.y, p.y - 150],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-light text-white mb-6 leading-tight">
            Community & Policy <span className="text-amber-400 font-normal">Vision</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            RainCheck empowers citizens to make{" "}
            <span className="text-amber-400">data-driven sustainability</span> choices.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Aggregated simulations from households help{" "}
            <span className="text-amber-400">city planners</span> monitor recharge impacts and shape{" "}
            <span className="text-amber-400">effective water policies</span> for a sustainable future.
          </p>

          <div className="flex gap-4 mt-10">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="text-amber-400 w-5 h-5" /> 5000+ Citizens Joined
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Globe2 className="text-amber-400 w-5 h-5" /> 120+ Cities Analyzed
            </div>
          </div>
        </motion.div>

        {/* Right: Floating visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full flex items-center justify-center"
        >
          {/* Glowing orb */}
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl animate-pulse" />

          {/* Floating cluster */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[340px] h-[340px] flex items-center justify-center"
          >
            {/* Central policy card */}
            <div className="absolute bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg text-center">
              <BarChart3 className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm text-gray-300">Policy Insights</p>
            </div>

            {/* Citizen & city floating cards */}
            <motion.div
              className="absolute -left-28 -top-10 bg-white/[0.05] rounded-2xl p-4 border border-white/10 text-center shadow-md"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-xs text-gray-300">Community Data</p>
            </motion.div>

            <motion.div
              className="absolute -right-24 bottom-4 bg-white/[0.05] rounded-2xl p-4 border border-white/10 text-center shadow-md"
              animate={{ y: [10, 0, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Globe2 className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-xs text-gray-300">City Simulations</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0B0B0C] to-transparent" />
    </section>
  );
}
