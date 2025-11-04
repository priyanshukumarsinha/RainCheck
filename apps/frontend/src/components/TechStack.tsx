"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiVercel,
  SiGithubactions,
  SiOpenai,
  SiMapbox,
  SiJest,
  SiCypress,
  SiTurborepo,
  SiPnpm,
} from "react-icons/si";

const icons = [
  { icon: <SiNextdotjs />, color: "#ffffff" },
  { icon: <SiReact />, color: "#61dafb" },
  { icon: <SiTypescript />, color: "#3178c6" },
  { icon: <SiTailwindcss />, color: "#38bdf8" },
  { icon: <SiShadcnui />, color: "#a78bfa" },
  { icon: <SiFramer />, color: "#e11d48" },
  { icon: <SiNodedotjs />, color: "#68a063" },
  { icon: <SiExpress />, color: "#ffffff" },
  { icon: <SiPrisma />, color: "#0c344b" },
  { icon: <SiPostgresql />, color: "#0064a5" },
  { icon: <SiMongodb />, color: "#00ed64" },
  { icon: <SiVercel />, color: "#ffffff" },
  { icon: <SiGithubactions />, color: "#2088FF" },
  { icon: <SiOpenai />, color: "#10a37f" },
  { icon: <SiMapbox />, color: "#4264fb" },
  { icon: <SiJest />, color: "#C63D14" },
  { icon: <SiCypress />, color: "#58d68d" },
  { icon: <SiTurborepo />, color: "#ffffff" },
  { icon: <SiPnpm />, color: "#f9ad00" },
];

export default function TechStack() {
  return (
    <section className="py-20 relative w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#080808] via-[#0b0c0d] to-[#0f1012] text-gray-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-400/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-amber-300/10 blur-[160px] rounded-full" />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-20 px-6"
      >
        <h2 className="text-5xl font-light mb-4">
          The{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent font-semibold">
            Technology Core
          </span>
        </h2>
        <p className="text-gray-400 text-lg">
          Built with precision and simplicity — every layer powers RainCheck’s intelligence.
        </p>
      </motion.div>

      {/* Floating icons - smooth animation */}
      <div className="relative w-[90vw] h-[60vh] flex flex-wrap justify-center items-center gap-12 sm:gap-16 md:gap-20">
        {icons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier curve
              delay: i * 0.04,
            }}
            whileHover={{
              scale: 1.25,
              transition: {
                type: "spring",
                stiffness: 180,
                damping: 15,
              },
              filter: `drop-shadow(0 0 16px ${item.color})`,
            }}
            className="text-[3rem] md:text-[4rem] cursor-pointer transition-all duration-300"
            style={{ color: item.color }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="mt-20 text-sm text-gray-500"
      >
        Modern stack. Minimal design. Maximum performance ⚡
      </motion.p>
    </section>
  );
}
