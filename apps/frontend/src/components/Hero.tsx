"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Motion values (safe even before mount)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Defaults for parallax range — will update after mount
  const [screenSize, setScreenSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const rotateX = useSpring(
    useTransform(mouseY, [0, screenSize.height], [8, -8]),
    { stiffness: 60, damping: 15 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, screenSize.width], [-8, 8]),
    { stiffness: 60, damping: 15 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  if (!mounted) {
    // Prevent rendering on server to avoid window access issues
    return (
      <section className="min-h-[100vh] w-full flex items-center justify-center bg-[#0B0B0C] text-gray-300">
        <h1 className="text-2xl font-light">Loading...</h1>
      </section>
    );
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center min-h-[100vh] w-full overflow-hidden bg-[#0B0B0C] text-gray-200"
    >
      {/* Warm amber glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,77,0.08),transparent_60%)]"
        style={{ rotateX, rotateY }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Main Content */}
      <motion.div
        className="z-10 text-center px-6 sm:px-10 max-w-3xl"
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <h1 className="text-5xl sm:text-6xl font-light leading-tight tracking-tight text-white mb-6">
          Harness the Rain.  
          <span className="block text-amber-400 font-normal">
            Sustain the Future.
          </span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          RainCheck combines urban rainfall data, AI, and predictive design tools 
          to help you make smarter, greener water decisions — effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="#explore"
            className="group inline-flex items-center gap-2 bg-amber-400 text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-300 transition-all duration-300"
          >
            Explore RainCheck
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#learn"
            className="text-gray-400 hover:text-amber-400 transition-colors text-lg"
          >
            Learn More →
          </Link>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0B0B0C] to-transparent" />
    </section>
  );
}
