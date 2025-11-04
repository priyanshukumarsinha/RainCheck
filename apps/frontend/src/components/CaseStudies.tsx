"use client";

import { motion } from "framer-motion";

export default function CaseStudies() {
  const cities = [
    { city: "Bengaluru", rainfall: "970 mm", feasibility: "88%", payback: "2.5 yrs", coverage: "68%" },
    { city: "Pune", rainfall: "720 mm", feasibility: "74%", payback: "3.2 yrs", coverage: "56%" },
    { city: "Delhi", rainfall: "750 mm", feasibility: "81%", payback: "2.8 yrs", coverage: "60%" },
  ];

  return (
    <section className="relative min-h-[100vh] bg-[#0B0B0C] flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-gray-200">
      {/* Subtle animated backdrop */}
      <div className="absolute inset-0 -z-10 bg-[#0B0B0C]">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.12),transparent_70%)]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
          Case Studies
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Simulated insights from Indian cities showing how RainCheck adapts to
          unique rainfall patterns and economic contexts.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {cities.map((c, i) => (
          <motion.div
            key={c.city}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#111112] to-[#0E0E10] shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:border-amber-400/30 transition-all duration-500"
          >
            {/* City header */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                {c.city}
              </h3>
              <p className="text-gray-500 text-sm">Rainfall & Feasibility Overview</p>
            </div>

            {/* Info rows */}
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Annual Rainfall</span>
                <span className="text-gray-300">{c.rainfall}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Feasibility</span>
                <span className="text-gray-300">{c.feasibility}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Payback Period</span>
                <span className="text-gray-300">{c.payback}</span>
              </div>
              <div className="flex justify-between">
                <span>Coverage Potential</span>
                <span className="text-gray-300">{c.coverage}</span>
              </div>
            </div>

            {/* Accent bar animation */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${parseInt(c.feasibility)}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: i * 0.3 }}
              className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-amber-400 to-cyan-400 rounded-tr-2xl"
            />
          </motion.div>
        ))}
      </div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 text-gray-500 text-sm text-center"
      >
        RainCheck’s adaptive models evolve for every region — merging local climate,
        infrastructure, and policy to ensure optimal results.
      </motion.p>
    </section>
  );
}
