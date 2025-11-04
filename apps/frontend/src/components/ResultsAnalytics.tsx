"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const rainfallData = [
  { month: "Jan", rainfall: 60, demand: 120 },
  { month: "Mar", rainfall: 110, demand: 100 },
  { month: "May", rainfall: 220, demand: 160 },
  { month: "Jul", rainfall: 400, demand: 180 },
  { month: "Sep", rainfall: 360, demand: 140 },
  { month: "Nov", rainfall: 120, demand: 130 },
];

const rechargeData = [
  { name: "2021", recharge: 180, consumption: 250 },
  { name: "2022", recharge: 210, consumption: 260 },
  { name: "2023", recharge: 280, consumption: 240 },
  { name: "2024", recharge: 300, consumption: 230 },
  { name: "2025", recharge: 350, consumption: 220 },
];

const savingsData = [
  { year: "1", savings: 8 },
  { year: "2", savings: 14 },
  { year: "3", savings: 22 },
  { year: "4", savings: 31 },
  { year: "5", savings: 42 },
];

const tankData = [
  { size: "Small (2k L)", cost: "₹15k", coverage: "25%" },
  { size: "Medium (5k L)", cost: "₹30k", coverage: "55%" },
  { size: "Large (10k L)", cost: "₹55k", coverage: "90%" },
];

export default function ResultsAnalytics() {
  return (
    <section className="relative py-32 bg-[#080808] text-gray-100 overflow-hidden">
      {/* 🌌 Animated Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(34,211,238,0.15), transparent 70%)",
              "radial-gradient(circle at 80% 70%, rgba(251,191,36,0.15), transparent 70%)",
              "radial-gradient(circle at 40% 60%, rgba(16,185,129,0.15), transparent 70%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/70 via-[#0B0B0C]/80 to-[#0E0E10]/90 backdrop-blur-[2px]" />
      </div>

      {/* ✨ Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-20 max-w-3xl mx-auto px-6"
      >
        <h2 className="text-5xl font-light mb-6">
          Results &{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent font-medium">
            Visual Analytics
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          <span className="text-amber-400">See your water potential</span> — visually, instantly, and beautifully.
        </p>
      </motion.div>

      {/* 📊 Dashboard Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8">
        {/* Rainfall vs Demand */}
        <Card title="🌦️ Rainfall vs Demand" accent="text-cyan-300" hoverBorder="hover:border-cyan-400/30">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={rainfallData}>
              <XAxis dataKey="month" stroke="#777" />
              <YAxis stroke="#777" />
              <Tooltip contentStyle={{ backgroundColor: "#0C0E0F", border: "1px solid #333", color: "#fff" }} />
              <Line type="monotone" dataKey="rainfall" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 3, fill: "#22d3ee" }} />
              <Line type="monotone" dataKey="demand" stroke="#facc15" strokeWidth={2.5} dot={{ r: 3, fill: "#facc15" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recharge vs Consumption */}
        <Card title="💧 Recharge vs Consumption" accent="text-emerald-300" hoverBorder="hover:border-emerald-400/30">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={rechargeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
              <XAxis dataKey="name" stroke="#777" />
              <YAxis stroke="#777" />
              <Tooltip contentStyle={{ backgroundColor: "#0C0E0F", border: "1px solid #333", color: "#fff" }} />
              <Bar dataKey="recharge" fill="#22c55e" radius={6} />
              <Bar dataKey="consumption" fill="#facc15" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Savings Projection */}
        <Card title="📈 5-Year Savings Projection" accent="text-amber-300" hoverBorder="hover:border-amber-400/30">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={savingsData}>
              <XAxis dataKey="year" stroke="#777" />
              <YAxis stroke="#777" />
              <Tooltip contentStyle={{ backgroundColor: "#0C0E0F", border: "1px solid #333", color: "#fff" }} />
              <Line type="monotone" dataKey="savings" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 3, fill: "#facc15" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Tank Recommendation */}
        <Card title="🏠 Tank Size Recommendations" accent="text-blue-300" hoverBorder="hover:border-blue-400/30">
          <table className="w-full text-sm text-gray-200">
            <thead>
              <tr className="text-left border-b border-gray-700/50">
                <th className="pb-2">Size</th>
                <th className="pb-2">Cost</th>
                <th className="pb-2">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {tankData.map((t, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all duration-200">
                  <td className="py-2">{t.size}</td>
                  <td className="py-2 text-amber-300">{t.cost}</td>
                  <td className="py-2">{t.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-24 text-center text-sm text-gray-400"
      >
        “Every drop visualized — every insight amplified.”
      </motion.p>
    </section>
  );
}

/* 🎨 Reusable Card Component */
function Card({ children, title, accent, hoverBorder }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-500 ${hoverBorder}`}
    >
      <h3 className={`text-xl font-medium mb-4 ${accent}`}>{title}</h3>
      {children}
    </motion.div>
  );
}
