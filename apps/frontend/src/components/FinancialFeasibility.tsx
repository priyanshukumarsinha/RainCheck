"use client";

import { motion } from "framer-motion";

export default function FinancialFeasibility() {
  return (
    <section className="relative min-h-[100vh] w-full flex flex-col items-center justify-center bg-[#0B0B0C] text-gray-200 overflow-hidden px-6">
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-[10%] w-[600px] h-[600px] bg-amber-400/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-150px] right-[10%] w-[700px] h-[700px] bg-cyan-400/10 blur-[160px] rounded-full" />
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
          Financial Feasibility Simulation
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-16">
          A clear view of RainCheck’s economic impact — balancing installation
          cost, maintenance, available subsidies, and long-term savings.
        </p>

        {/* Financial summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "CAPEX", value: "₹80,000", desc: "System + installation" },
            { title: "OPEX", value: "₹10,000/yr", desc: "Maintenance cost" },
            { title: "Subsidy", value: "Up to 25%", desc: "City-wise incentives" },
            { title: "ROI", value: "3.5 yrs", desc: "Estimated payback period" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#101012]/60 border border-white/5 backdrop-blur-md rounded-2xl p-6 text-left hover:border-amber-400/40 transition-all duration-300"
            >
              <h3 className="text-lg text-gray-300 font-medium mb-2">
                {item.title}
              </h3>
              <p className="text-3xl font-semibold text-amber-400 mb-1">
                {item.value}
              </p>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-gray-400 text-sm"
        >
          RainCheck ensures your sustainability decisions make both environmental
          and financial sense.
        </motion.p>
      </motion.div>
    </section>
  );
}
