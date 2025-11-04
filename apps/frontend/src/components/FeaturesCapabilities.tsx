"use client";

import { motion, useAnimation } from "framer-motion";
import { CloudRain, Cpu, Globe2 } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: <CloudRain className="w-7 h-7 text-cyan-300" />,
    title: "Core Simulation",
    points: ["Real-time rainfall modeling", "Recharge analysis", "Feasibility scoring"],
    color: "from-cyan-400/60 to-blue-500/30",
  },
  {
    icon: <Cpu className="w-7 h-7 text-amber-300" />,
    title: "Smart Tools",
    points: ["Satellite mapping", "Tank optimization", "AI forecasting"],
    color: "from-yellow-400/60 to-amber-500/30",
  },
  {
    icon: <Globe2 className="w-7 h-7 text-emerald-300" />,
    title: "Sustainability",
    points: ["CO₂ savings", "Utilization ratio", "Impact scoring"],
    color: "from-emerald-400/60 to-teal-500/30",
  },
];

export default function FeaturesCapabilities() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 90, repeat: Infinity, ease: "linear" },
    });
  }, [controls]);

  return (
    <section className="relative py-44 bg-gradient-to-b from-[#040404] via-[#0A0A0C] to-[#0E0E10] text-gray-100 overflow-hidden">
      {/* 🌌 Ambient Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[15%] left-[5%] w-[600px] h-[600px] bg-cyan-400/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-amber-400/25 blur-[180px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-28 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-light mb-6"
        >
          RainCheck{" "}
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-300 bg-clip-text text-transparent font-medium">
            Capabilities
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          All intelligence flows from the{" "}
          <span className="text-cyan-400 font-medium">RainCheck AI Core</span> —  
          transforming data into insight, and rainfall into opportunity.
        </motion.p>
      </div>

      {/* 🌐 Central Core */}
      <div className="relative flex justify-center items-center h-[540px]">
        {/* Rotating Rings */}
        <motion.div
          animate={controls}
          className="absolute w-[440px] h-[440px] rounded-full border border-cyan-300/20 shadow-[0_0_80px_rgba(0,255,255,0.08)]"
        />
        <motion.div
          animate={controls}
          className="absolute w-[280px] h-[280px] rounded-full border border-amber-300/20 opacity-60"
        />
        <motion.div
          animate={controls}
          className="absolute w-[160px] h-[160px] rounded-full border border-emerald-300/20 opacity-50"
        />

        {/* Pulsing Core */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/40 via-amber-300/40 to-emerald-300/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.12)]"
        >
          <span className="text-sm tracking-wider text-white/90 text-center uppercase">
            RainCheck <br />
            <span className="font-semibold text-amber-300">AI Core</span>
          </span>

          {/* Ripple Effect */}
          <motion.div
            animate={{
              scale: [1, 1.9],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 border border-cyan-300/30 rounded-full"
          />
        </motion.div>

        {/* 🚀 Feature Boxes Expanding Smoothly */}
        {features.map((f, i) => {
          const radius = 250;
          const angle = (i / features.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, x, y, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: i * 0.25,
                type: "spring",
                stiffness: 80,
                damping: 15,
              }}
              whileHover={{
                scale: 1.1,
                y: y - 8,
              }}
              className={`absolute z-10 flex flex-col items-center text-center bg-gradient-to-br ${f.color} rounded-2xl px-8 py-7 backdrop-blur-lg transition-all duration-300 hover:brightness-110`}
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {f.title}
              </h3>
              <ul className="text-sm text-gray-100/90 space-y-1 font-light">
                {f.points.map((p, j) => (
                  <li key={j} className="hover:text-white transition-all duration-200">
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-24 text-center text-sm text-gray-300"
      >
        Powered by{" "}
        <span className="text-cyan-300 font-medium">data precision</span>,{" "}
        <span className="text-amber-300 font-medium">AI intelligence</span>, and{" "}
        <span className="text-emerald-300 font-medium">climate impact</span>.
      </motion.p>
    </section>
  );
}
