"use client";

import { motion } from "framer-motion";
import { Home, Building2, Ruler, Landmark } from "lucide-react";

const users = [
  {
    icon: <Home className="w-8 h-8 text-cyan-400" />,
    title: "Homeowners",
    desc: "Plan and estimate your savings before installing rainwater systems.",
  },
  {
    icon: <Building2 className="w-8 h-8 text-amber-400" />,
    title: "Societies & RWAs",
    desc: "Assess shared roofs and recharge capacity collectively.",
  },
  {
    icon: <Ruler className="w-8 h-8 text-emerald-400" />,
    title: "Architects & Planners",
    desc: "Embed RWH seamlessly into eco-friendly designs.",
  },
  {
    icon: <Landmark className="w-8 h-8 text-blue-400" />,
    title: "Government Agencies",
    desc: "Monitor adoption and plan data-driven water policies.",
  },
];

export default function TargetUsers() {
  return (
    <section className="relative py-28 text-gray-100 overflow-hidden bg-[#0A0A0B]">
      {/* 🌌 Animated Fluid Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,#00ffff15,#ffaa0015,#00ff8015,#00ffff15)] animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]" />
      </div>

      {/* 🧭 Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center px-6 mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-light mb-6">
          Who Can{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent font-medium">
            Use RainCheck
          </span>
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          RainCheck connects people, communities, and cities through actionable water intelligence.
        </p>
      </motion.div>

      {/* 🌍 Central Glow Core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-cyan-400/10 via-amber-400/10 to-emerald-400/10 blur-[120px]"
      />

      {/* 🧩 Cards */}
      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {users.map((user, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.05,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-md p-8 text-center transition-all duration-300"
          >
            {/* Glow hover animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 via-amber-400/0 to-emerald-400/0 opacity-0 group-hover:opacity-100 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 transition-all duration-500"
              layoutId={`hover-${i}`}
            />

            <motion.div
              whileHover={{ rotate: 6, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="mb-5 relative z-10"
            >
              {user.icon}
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-white relative z-10">
              {user.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
              {user.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 💬 Footer */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-sm text-gray-500 mt-20"
      >
        From homes to cities —{" "}
        <span className="text-amber-400">RainCheck makes water wisdom accessible to everyone.</span>
      </motion.p>
    </section>
  );
}
