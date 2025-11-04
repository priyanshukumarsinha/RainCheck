"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function DownloadableReports() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const rotateX = useSpring(useTransform(mouseY, [0, 800], [8, -8]), {
    stiffness: 60,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1200], [-8, 8]), {
    stiffness: 60,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleDownload = () => {
    toast.success("✨ Report is being generated...", {
      position: "bottom-right",
      style: {
        backgroundColor: "#fbbf24", // amber-400
        color: "#0B0B0C",
        borderRadius: "10px",
        fontWeight: 500,
        padding: "14px 20px",
        boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
      },
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  if (!mounted)
    return (
      <section className="flex items-center justify-center h-[60vh] bg-[#0B0B0C] text-gray-400">
        <p>Loading...</p>
      </section>
    );

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-20 relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#0B0B0C] text-gray-200"
    >
      {/* Soft amber glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,77,0.08),transparent_60%)]"
        style={{ rotateX, rotateY }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ rotateX, rotateY }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight"
        >
          Download Your Report  
          <span className="block text-amber-400 font-normal mt-2">
            Professional • Insightful • Instant
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Instantly receive a personalized PDF covering rainfall yield, tank
          sizing, ROI analysis, and environmental benefits — designed for
          sustainability submissions and RWH compliance.
        </motion.p>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleDownload}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-amber-400 text-black font-medium rounded-full text-lg hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300"
        >
          <FileDown className="w-5 h-5 group-hover:translate-y-[-1px] transition-transform" />
          Download Report
        </motion.button>

        {/* Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mt-20 text-left"
        >
          {[
            { title: "Catchment & Roof Analysis", color: "text-amber-400" },
            { title: "Rainfall & Yield Summary", color: "text-gray-300" },
            { title: "Tank Size Recommendation", color: "text-gray-300" },
            { title: "Financial ROI & Payback", color: "text-amber-400" },
            { title: "Environmental Benefits", color: "text-gray-300" },
            { title: "Policy & Sustainability Insights", color: "text-gray-300" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="bg-white/[0.04] backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-all duration-300"
            >
              <h4 className={`${item.color} font-semibold text-lg mb-2`}>
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Detailed evaluation and expert-backed recommendations to support
                your sustainable water strategy.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <ToastContainer />

      {/* Soft bottom fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0B0B0C] to-transparent" />
    </section>
  );
}
