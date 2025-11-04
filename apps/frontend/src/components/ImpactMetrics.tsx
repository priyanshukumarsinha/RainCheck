"use client";

import { motion } from "framer-motion";
import { Droplets, Leaf, Coins, BarChart3 } from "lucide-react";

const metrics = [
  {
    icon: <Droplets className="w-7 h-7 text-cyan-400" />,
    label: "Groundwater Recharge",
    value: "2,40,000 L / year",
    color: "from-cyan-400 to-blue-400",
  },
  {
    icon: <Coins className="w-7 h-7 text-amber-400" />,
    label: "Economic Benefit",
    value: "₹18,000 saved / year",
    color: "from-amber-400 to-yellow-300",
  },
  {
    icon: <Leaf className="w-7 h-7 text-emerald-400" />,
    label: "Carbon Savings",
    value: "320 kg CO₂ reduced",
    color: "from-emerald-400 to-teal-300",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-blue-400" />,
    label: "Reduced Dependency",
    value: "↓ 65% external water",
    color: "from-blue-400 to-cyan-300",
  },
];

export default function ImpactMetrics() {
  return (
    <section className="relative py-28 bg-[#0A0A0B] text-gray-100 overflow-hidden">
      {/* Subtle glowing background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/5 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 px-6"
      >
        <h2 className="text-4xl sm:text-5xl font-light mb-4">
          The{" "}
          <span className="bg-gradient-to-r from-amber-400 to-cyan-300 bg-clip-text text-transparent font-medium">
            Impact
          </span>{" "}
          of RainCheck
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Every RainCheck simulation saves water, money, and the planet — in one click.
        </p>
      </motion.div>

      {/* Metric Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300"
          >
            <div className="mb-4">{m.icon}</div>
            <h3 className="text-base font-semibold text-white mb-2">{m.label}</h3>
            <p
              className={`text-transparent bg-clip-text bg-gradient-to-r ${m.color} text-lg font-medium`}
            >
              {m.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Floating Stat */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center text-sm text-gray-400"
      >
        💧 On average, each{" "}
        <span className="text-amber-400 font-medium">RainCheck user</span> helps
        recharge over{" "}
        <span className="text-cyan-400 font-semibold">
          2,40,000 liters of groundwater
        </span>{" "}
        every year.
      </motion.div>
    </section>
  );
}
