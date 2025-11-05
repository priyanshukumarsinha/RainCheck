"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import PlanningLayout for better performance
const PlanningLayout = dynamic(() => import("./components/PlanningLayout"), {
  loading: () => (
    <div className="flex flex-col items-center justify-center h-screen text-gray-400 font-[Geist]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="h-10 w-10 border-4 border-emerald-400 border-t-transparent rounded-full mb-4"
      />
      <p className="text-emerald-300">Preparing your planning workspace...</p>
    </div>
  ),
});

export default function PlanningClient() {
  return <PlanningLayout />;
}
