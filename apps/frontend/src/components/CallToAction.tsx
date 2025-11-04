"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden bg-[#0B0B0C] text-gray-200">
      {/* Soft amber gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,77,0.12),transparent_70%)]" />

      {/* Subtle animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-400/20 rounded-full"
            initial={{ x: Math.random() * 1200, y: Math.random() * 600, opacity: 0.3 }}
            animate={{
              y: [null, Math.random() * -40],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <h2 className="text-5xl sm:text-6xl font-light text-white mb-6 leading-tight">
          Ready to Discover Your Home’s{" "}
          <span className="text-amber-400 font-normal">Rainwater Potential?</span>
        </h2>

        <p className="text-gray-400 text-lg sm:text-xl mb-10 leading-relaxed">
          Run your free simulation now and see how much you can{" "}
          <span className="text-amber-400">save and sustain</span>.
        </p>

        <Link
          href="#analysis"
          className="inline-flex items-center gap-2 bg-amber-400 text-black px-10 py-4 rounded-full text-lg font-medium hover:bg-amber-300 transition-all duration-300 group shadow-[0_0_30px_rgba(255,184,77,0.15)]"
        >
          Start My Analysis
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0B0B0C] to-transparent" />
    </section>
  );
}
