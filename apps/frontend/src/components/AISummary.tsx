"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AISummary() {
  const [textIndex, setTextIndex] = useState(0);
  const summaryText =
    "Your water potential is excellent. With a 10kL tank, you can cover 65% of your household demand and recover costs within 3 years.";

  useEffect(() => {
    if (textIndex < summaryText.length) {
      const timer = setTimeout(() => setTextIndex(textIndex + 1), 25);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  const whatIfs = [
    "What if I increase my tank size?",
    "How would rainfall variation affect results?",
    "Does my roof type change collection potential?",
  ];

  return (
    <section className="relative min-h-[90vh] bg-[#0B0B0C] text-gray-200 flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      {/* Subtle amber glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,184,77,0.15),transparent_70%)] -z-10"
      />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
          AI Summary Assistant
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Powered by <span className="text-amber-400">Gemini</span> — delivering personalized,
          context-aware water insights with natural, human-like explanations.
        </p>
      </motion.div>

      {/* AI Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-3xl shadow-[0_0_60px_rgba(255,184,77,0.1)] border border-white/5 p-8 backdrop-blur-sm"
      >
        {/* Ambient orb glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(255,184,77,0.8)]"
        />

        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-light">
          {summaryText.slice(0, textIndex)}
          {textIndex < summaryText.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-amber-400 ml-1"
            />
          )}
        </p>
      </motion.div>

      {/* What-if options */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 grid gap-3 text-gray-400 text-sm sm:text-base max-w-lg w-full"
      >
        {whatIfs.map((w, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(255,184,77,0.4)",
              color: "#fbbf24",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="cursor-pointer border border-white/5 rounded-full px-6 py-3 text-center transition-all duration-300"
          >
            {w}
          </motion.div>
        ))}
      </motion.div>

      {/* Footer description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-16 text-gray-500 text-sm text-center max-w-xl"
      >
        The assistant continuously adapts to your data — offering precise, 
        explainable insights tailored to local rainfall, slope, and soil type.
      </motion.p>
    </section>
  );
}
